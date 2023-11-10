$(document).ready(()=>{
    HandleDisplay();

    function HandleDisplay()
    {
      const currentURL = window.location.href;

    // Tìm vị trí của "html" trong chuỗi URL
    const indexHtml = currentURL.indexOf("html");

    // Kiểm tra xem "html" có tồn tại trong chuỗi không
    if (indexHtml !== -1) {
    // Lấy phần query string sau "html"
    var queryString = currentURL.substring(indexHtml + 4);
    
  }
  const dataJson = {
        "urlId": 0,
        "urlName": queryString
  };
  console.log("Value:"+queryString);

    $.ajax({
      type:"PUT",
      url:"https://localhost:7126/api/VnPay/VnPayReturn",
      contentType: "application/json",
      dataType: "json",
      data: JSON.stringify(dataJson),
      success: (res)=>{
        console.log(res)
        alert("Thanh toán thành công")
        localStorage.removeItem('cart');
        localStorage.removeItem('userCheckout');
        localStorage.removeItem('orderId');
      },
      error: (error)=>{
        console.error("Lỗi thanh toán vnpay",error);
        alert("Thanh toán không thành công")
        RollbackOrderFail();
      }
    })
  }

  function RollbackOrderFail()
  {
    const token = localStorage.getItem('token');
    const dataLocalStorage = localStorage.getItem("userCheckout");
    const dataOrderIdJson = localStorage.getItem("orderId");

    const dataOrder = JSON.parse(dataOrderIdJson);
        const orderId =  dataOrder.orderId;
    const userData = JSON.parse(dataLocalStorage);
        const codeVoucher = parseInt(userData.codeVoucher);
    
   if(codeVoucher != null && codeVoucher != "" && codeVoucher != NaN && codeVoucher && "NaN")
   {

        const decodedToken = parseJwt(token);
        const userId = decodedToken.UserId;

    $.ajax({
        url:`https://localhost:7126/api/VnPay/rollbackVoucher/customerId=${userId}&&voucherId=${codeVoucher}`,
        type:"PUT",
        dataType:"json",
        contentType: "application/json",
        data: JSON.stringify({}),
        success: (res)=>{
            console.log(res);
        },
        error: (error)=>{
            console.error("Lỗi refund quantity voucher",error);
        }
    })
   }

    $.ajax({
        url:"https://localhost:7126/api/VnPay/rollbackOrder/"+orderId,
        type:"DELETE",
        success: (res)=>{
            console.log(res);
        },
        error: (error)=>{
            console.error("Lỗi xóa order",error);
        }
    })
  }

  function parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(atob(base64));
}
})