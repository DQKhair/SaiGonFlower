using FlowerStore.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using FlowerStore.MyConfiguration;

namespace FlowerStore.Payments
{
    public class Payments
    {
        private IConfiguration _configuration;
        private FlowerStoreContext _context = new FlowerStoreContext();
        public MyConfiguration.MyConfiguration myConfiguration = new MyConfiguration.MyConfiguration();

        public string UrlPayment(int typePaymentVN, int locale_Vn, int orderId, string IPaddress)
        {
            
            var urlPayment = "";
            var _order = _context.Orders.FirstOrDefault(o => o.OrderId == orderId);

            //Get Config Info
            string vnp_Returnurl = myConfiguration.Vnp_Returnurl;
            string vnp_Url =myConfiguration.Vnp_Url;
            string vnp_TmnCode = myConfiguration.Vnp_TmnCode;
            string vnp_HashSecret = myConfiguration.Vnp_HashSecret;

            //Build URL for VNPay
            VnPayLibrary vnPay = new VnPayLibrary();

            vnPay.AddRequestData("vnp_Version", VnPayLibrary.VERSION);
            vnPay.AddRequestData("vnp_Command", "pay");
            vnPay.AddRequestData("vnp_TmnCode", vnp_TmnCode);
            vnPay.AddRequestData("vnp_Amount", Convert.ToInt64(_order!.TotalPrice * 100).ToString());
            if (typePaymentVN == 1)
            {
                vnPay.AddRequestData("vnp_BankCode", "VNPAYQR");
            }
            else if (typePaymentVN == 2)
            {
                vnPay.AddRequestData("vnp_BankCode", "VNBANK");
            }
            else if (typePaymentVN == 3)
            {
                vnPay.AddRequestData("vnp_BankCode", "INTCARD");
            }

            vnPay.AddRequestData("vnp_CreateDate", _order.OrderDate!.Value.ToString("yyyyMMddHHmmss"));
            vnPay.AddRequestData("vnp_CurrCode", "VND");
            vnPay.AddRequestData("vnp_IpAddr", IPaddress);
            if (locale_Vn == 1)
            {
                vnPay.AddRequestData("vnp_Locale", "vn");
            }
            else if (locale_Vn == 2)
            {
                vnPay.AddRequestData("vnp_Locale", "en");
            }
            vnPay.AddRequestData("vnp_OrderInfo", "Thanh toán đơn hàng:" + _order.OrderId);
            vnPay.AddRequestData("vnp_OrderType", "other"); //default value: other

            vnPay.AddRequestData("vnp_ReturnUrl", vnp_Returnurl);
            vnPay.AddRequestData("vnp_TxnRef", _order.OrderId.ToString());

            urlPayment = vnPay.CreateRequestUrl(vnp_Url, vnp_HashSecret);

            return urlPayment;
        }
    }
}
