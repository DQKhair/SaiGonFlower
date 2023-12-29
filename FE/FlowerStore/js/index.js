$(document).ready(function () { 

  if(localStorage.getItem("token") == null){
    $.get(`https://localhost:7126/api/Products`, data=>{
      displayProducts(data);
    }).fail(error =>{console.log("Lỗi khi gửi yêu cầu đến API: ", error);})

    
    function displayProducts(data) {
      $(".products-list").empty();

      $.each(data, function (index, product) {
        var productCard = $('<div class="products-card"></div>');
        var cardImg = $(`<div class="card-img"><a href='./detail.html?id=${product.productId}'>
        <img src="https://localhost:7126${product.image1}" alt="" /></a></div>`);
        var cardContent = $('<div class="card-content"></div>');
        var cardName = $(`<div class="card-name"><a href='./detail.html?id=${product.productId}' 
        class="detail-link" data-id='${product.productId}'>${product.productName}</a></div>`);
        var cardBody = $('<div class="card-body"></div>');
        var cardPrice = $('<div class="card-price"><p> ' + product.price + " VND</p></div>");
        var cardHeart = $(`<div class="card-heart"><i class="far fa-heart fa-lg btnLike" 
        data-id="${product.productId}"></i></div>`);
    
        cardBody.append(cardPrice,cardHeart);
        cardContent.append(cardName,cardBody);
        productCard.append(cardImg,cardContent);
        $(".products-list").append(productCard);
   
      })

      $('.btnLike').click(e => {
          window.location.href="./login.html"
      })
    };
  }

  if(localStorage.getItem("token") != null){
    const token = localStorage.getItem("token");
    const decodedToken = parseJwt(token);
    const userId = parseInt(decodedToken.UserId);
    console.log("id ne" + userId)

    var productIds =[];

    getFavoriteProductIds(displayProducts)

    function getFavoriteProductIds(callback){
      $.get(`https://localhost:7126/api/Likes/List/${userId}`, data=>{
        productIds = data.map(item => item.productId);
        callback();
      }).fail(error =>{})
    }
    
    $.get(`https://localhost:7126/api/Products`, data=>{
      displayProducts(data);
    }).fail(error =>{console.log("Lỗi khi gửi yêu cầu đến API: ", error);})

    
    function displayProducts(data) {
      $(".products-list").empty();
  
      if($(".products-list").empty()){
      $.each(data, function (index, product) {
        const checkLike = productIds.includes(product.productId);

  
        var productCard = $('<div class="products-card"></div>');
        var cardImg = $(`<div class="card-img"><a href='./detail.html?id=${product.productId}'>
        <img src="https://localhost:7126${product.image1}" alt="" /></a></div>`);
        var cardContent = $('<div class="card-content"></div>');
        var cardName = $(`<div class="card-name"><a href='./detail.html?id=${product.productId}' 
        class="detail-link" data-id='${product.productId}'>${product.productName}</a></div>`);
        var cardBody = $('<div class="card-body"></div>');
        var cardPrice = $('<div class="card-price"><p> ' + product.price + " VND</p></div>");
        if(checkLike){
          var cardHeart = $(`<div class="card-heart"><i class="fas fa-heart fa-lg btnLike" 
          data-id="${product.productId}" data-status="true"></i></div>`).css('color', '#ff2e4d');
        }
        else{
          var cardHeart = $(`<div class="card-heart"><i class="far fa-heart fa-lg btnLike" 
          data-id="${product.productId}" ></i></div>`);
        }
    
        cardBody.append(cardPrice,cardHeart);
        cardContent.append(cardName,cardBody);
        productCard.append(cardImg,cardContent);
        $(".products-list").append(productCard);
   
      })
  
      $('.btnLike').click(e => {
        $(e.target).toggleClass('far fa-heart fa-lg fas fa-heart fa-lg')
        if($(e.target).hasClass('fas fa-heart fa-lg'))
          $(e.target).css('color', '#ff2e4d');
        else
          $(e.target).css('color', 'black');
  
          if($(e.target).data("status") == null){
            var data = {
              customerId: userId,
              productId: $(e.target).data("id"),
              likeStatus: true
            }

            $.ajax({
              url: `https://localhost:7126/api/Likes`,
              type: "POST",
              data: JSON.stringify(data),
              contentType: "application/json",
              dataType: "json",
              success: (response) => {

              },
              error: function (error) {
                
              },
            });
            return;
          }
          
          if($(e.target).data("status") != null){

            var data = {
              customerId: userId,
              productId: $(e.target).data("id"),
            }

            $.ajax({
              url: `https://localhost:7126/api/Likes`,
              type: "PUT",
              data: JSON.stringify(data),
              contentType: "application/json",
              dataType: "json",
              success: (response) => {
                
              },
              error: error => {
                console.log(error)
              },
            });
            
          }
        })
      };
    
  }
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


function parseJwt(token) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace('-', '+').replace('_', '/');
  return JSON.parse(atob(base64));
}




// -------------------------------------------------------------------------------------



