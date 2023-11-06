$(document).ready(function () {
  // Khi trang web tải xong, gửi yêu cầu GET đến API của bạn
  $.ajax({
    url: "https://localhost:7126/api/Products", // Thay thế bằng đúng URL API của bạn
    type: "GET",
    dataType: "json",
    success: function (data) {
      // Xử lý dữ liệu từ API ở đây
      displayProducts(data);
    },
    error: function (error) {
      console.log("Lỗi khi gửi yêu cầu đến API: ", error);
    },
  });
  
  function displayProducts(data) {
    $(".products-list").empty();
    if($(".products-list").empty()){
    $.each(data, function (index, product) {
      var productCard = $('<div class="products-card"></div>');
      var cardImg = $(
        `<div class="card-img"><a href='./detail.html?id=${product.productId}'>
        <img src="https://localhost:7126${product.image1}" alt="" /></a></div>`
      );
      var cardContent = $('<div class="card-content"></div>');
      var cardName = $(
        `<div class="card-name"><a href='./detail.html?id=${product.productId}' class="detail-link" 
        data-id='${product.productId}'>${product.productName}</a></div>`
      );
      var cardBody = $('<div class="card-body"></div>');
      var cardPrice = $(
        '<div class="card-price"><p> ' + product.price + " VND</p></div>"
      );
      var cardHeart = $(
        '<div class="card-heart"><img src="imgs/icons/heart.svg" alt="" /></div>'
      );
  
      cardContent.append(cardName);
      cardBody.append(cardPrice);
      cardBody.append(cardHeart);
      cardContent.append(cardBody);
      productCard.append(cardImg);
      productCard.append(cardContent);
      $(".products-list").append(productCard);
  
    })
  };
  }

});




// đếm số lượng
$(document).ready(() => {
  const dateNow = new Date();
  const dateMonth = dateNow.getMonth() +1;
  const dateYear = dateNow.getFullYear();
  console.log(dateMonth,dateYear);

  $.ajax({
url: "https://localhost:7126/api/CountIndexes/month?month="+dateMonth + "&year="+dateYear,
type: "GET",
success: function (data) {
  
      // Nếu có dữ liệu, thực hiện API PUT
      $.ajax({
          url: "https://localhost:7126/api/CountIndexes/month?month="+dateMonth + "&year="+dateYear,
          type: "PUT",
          contentType: "application/json",
          dataType: "json",
          data: JSON.stringify(data),
          success: function (response) {
              // Xử lý khi PUT thành công
              console.log("API PUT thành công");
              displaycount();
          },
          error: function (error) {
              // Xử lý khi có lỗi trong quá trình PUT
              console.error("Lỗi khi gọi API PUT", error);
          }
      });
  
},
error: function (error1) {
      // Nếu dữ liệu là null, thực hiện API POST
      const dataJson = {"countMonth":1,"date":dateNow}
      $.ajax({
          url: "https://localhost:7126/api/CountIndexes",
          type: "POST",
          contentType: "application/json",
          dataType: "json",
          data: JSON.stringify(dataJson),
          success: function (response) {
              // Xử lý khi POST thành công
              console.log("API POST thành công");
              displaycount();
          },
          error: function (error) {
              // Xử lý khi có lỗi trong quá trình POST
              console.error("Lỗi khi gọi API POST", error);
              displaycount();
          }
      });
  // Xử lý khi có lỗi trong quá trình gọi API GET
  
}
});

});

function displaycount(){
$.ajax({
      url: "https://localhost:7126/api/CountIndexes", // Thay đổi URL của API của bạn
      type: "GET",
      success: function (data) {
          if (data === null) {
              // Xử lý trường hợp không có dữ liệu
              $("#totalCountMonth").text("Không có dữ liệu để tính tổng.");
          } else {
              // Hiển thị tổng lên trang HTML
              $("#totalCountMonth").text("Lượt truy cập: " + data);
          }
      },
      error: function (error) {
          console.error("Lỗi khi gọi API: " + error);
      }
  });

}




// -------------------------------------------------------------------------------------



