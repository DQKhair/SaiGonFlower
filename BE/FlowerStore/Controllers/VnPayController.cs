using FlowerStore.Models;
using FlowerStore.Payments;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Specialized;
using System.Net;
using System.Transactions;
using System.Web;

namespace FlowerStore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VnPayController : ControllerBase
    {
        private readonly FlowerStoreContext _context;

        public VnPayController( FlowerStoreContext context)
        {
            _context = context;
        }

        [HttpGet("GetOrderVnPay/typePayment={typePayment}&&locale_VN={locale_VN}&&orderId={orderId}")]
        public async Task<IActionResult> GetOrderVnPay(int typePayment, int locale_VN, int orderId)
        {
            var userIP = HttpContext.Connection.RemoteIpAddress!.ToString();
            try
            {
                Payments.Payments payments = new Payments.Payments();

                string url = await Task.Run(() => payments.UrlPayment(typePayment, locale_VN, orderId, userIP));

                return Ok( url);
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        [HttpDelete("rollbackOrder/{orderId}")]
        public async Task<IActionResult> RollbackOrder(int orderId)
        {
          var transaction = await _context.Database.BeginTransactionAsync();
            try
            {
                var _order = await _context.Orders.FindAsync(orderId);
                if(_order != null)
                {
                    //xóa orderDetail
                    var _orderDetail = _context.OrderDetails.Where(od => od.OrderId == orderId);
                    _context.OrderDetails.RemoveRange(_orderDetail);
                    // xóa order
                    _context.Orders.Remove(_order);
                    await _context.SaveChangesAsync();
                    await transaction.CommitAsync();
                    return Ok("Delete success");
                }else
                {
                    return NotFound();
                }    
            }catch (Exception ex)
            {
                // Nếu có lỗi, rollback
                transaction.Rollback();
                return StatusCode(500, $"Lỗi xóa đơn hàng: {ex.Message}");
            }
        }

        [HttpPut("rollbackVoucher/customerId={customerId}&&voucherId={voucherId}")]
        public async Task<IActionResult> rollbackVoucher(int customerId,int voucherId, DetailVoucher detailVoucher)
        {
            var _orderDetail = await _context.DetailVouchers.SingleOrDefaultAsync(dv => dv.CustomerId == customerId && dv.VoucherId == voucherId);
            try
            {
                if(_orderDetail == null)
                {
                    return NotFound();
                }
                _orderDetail.Quantity += 1;
                 await _context.SaveChangesAsync();
                return Ok("Refund voucher success");
            }catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("VnPayReturn")]
        public async Task<IActionResult> VnPayReturn(MyConfiguration.UrlMV url)
        {
            string urlRes = url.urlName;
            if (urlRes.Length > 0)
            {
                MyConfiguration.MyConfiguration myConfiguration = new MyConfiguration.MyConfiguration();

                string vnp_HashSecret = myConfiguration.Vnp_HashSecret; // Chuỗi bí mật
                // Phân tích URL để lấy tham số truy vấn
                //Uri uri = new Uri(urlRes);
                //NameValueCollection queryString = HttpUtility.ParseQueryString(uri.Query);

                UriBuilder uriBuilder = new UriBuilder
                {
                    Scheme = "http",
                    Host = "127.0.0.1",
                    Port = 5501,
                    Path = "/checkoutSuccess.html",
                    Query = urlRes
                };

                Uri uri = uriBuilder.Uri;
                NameValueCollection queryString = HttpUtility.ParseQueryString(uri.Query);

                var vnpayData = HttpContext.Request.Query;

                VnPayLibrary vnpay = new VnPayLibrary();

                int orderId = Convert.ToInt32(queryString["vnp_TxnRef"]);
                vnpay.AddResponseData("vnp_TxnRef", orderId.ToString());
                long vnpayTranId = Convert.ToInt64(queryString["vnp_TransactionNo"]);
                vnpay.AddResponseData("vnp_TransactionNo", vnpayTranId.ToString());
                string vnp_ResponseCode = queryString["vnp_ResponseCode"]!;
                vnpay.AddResponseData("vnp_ResponseCode", vnp_ResponseCode);
                string vnp_TransactionStatus = queryString["vnp_TransactionStatus"]!;
                vnpay.AddResponseData("vnp_TransactionStatus", vnp_TransactionStatus);
                string vnp_SecureHash = queryString["vnp_SecureHash"]!;
                vnpay.AddResponseData("vnp_SecureHash", vnp_SecureHash);
                string terminalID = queryString["vnp_TmnCode"]!;
                vnpay.AddResponseData("vnp_TmnCode", terminalID);
                long vnp_Amount = Convert.ToInt64(queryString["vnp_Amount"]!) / 100;
                vnpay.AddResponseData("vnp_Amount", (vnp_Amount * 100).ToString());
                string bankCode = queryString["vnp_BankCode"]!;
                vnpay.AddResponseData("vnp_BankCode", bankCode);

                //int orderId = Convert.ToInt32(vnpay.GetResponseData("vnp_TxnRef"));
                //long vnpayTranId = Convert.ToInt64(vnpay.GetResponseData("vnp_TransactionNo"));
                //string vnp_ResponseCode = vnpay.GetResponseData("vnp_ResponseCode");
                //string vnp_TransactionStatus = vnpay.GetResponseData("vnp_TransactionStatus");
                //string vnp_SecureHash = queryParameters["vnp_SecureHash"];
                //string terminalID = queryParameters["vnp_TmnCode"];
                //long vnp_Amount = Convert.ToInt64(vnpay.GetResponseData("vnp_Amount")) / 100;
                //string bankCode = queryParameters["vnp_BankCode"];

                bool checkSignature = vnpay.ValidateSignature(vnp_SecureHash, vnp_HashSecret);

                if (!checkSignature)
                {
                    if (vnp_ResponseCode == "00" && vnp_TransactionStatus == "00")
                    {
                        var _order = await _context.Orders.FirstOrDefaultAsync(x => x.OrderId == orderId);

                        if (_order != null)
                        {
                            _order.OrderStatusId = 2; // Đã thanh toán
                            await _context.SaveChangesAsync();
                            return Ok(_order);
                        }
                        // Xử lý khi giao dịch thành công
                    }
                    else
                    {
                        // Xử lý khi giao dịch không thành công
                        return BadRequest();
                    }
                    // Xử lý khi giao dịch thành công với ViewBag, nếu cần
                }
            }

            // Trả về lỗi nếu không có dữ liệu query hoặc chữ ký không hợp lệ
            return StatusCode(StatusCodes.Status500InternalServerError);
        }
    }
}
