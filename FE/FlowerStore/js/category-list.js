// Get category

$.get("https://localhost:7126/api/Categories", (response) => {
  renderCate(response);
}).fail((status, error) => {
  $("#cate-line").remove();
});

function renderCate(response) {
  $.each(response, function (index, item) {
    $(".cate-list ul").append(
      `<li class=cate-item><a href='./categories.html?id=${item.categoryId}'>${item.categoryName}</a></li>`
    );
  });

  slideBar();
}

// SlideBar animation
function slideBar() {
  var items = document.querySelectorAll(".cate-item");
  items.forEach((item) => {
    item.onmouseover = function (e) {
      var line = document.querySelector("#cate-line");
      line.style.width = e.target.offsetWidth + "px";
      line.style.left = e.target.offsetLeft + "px";
    };
  });
}
// End SlideBar animation


// Login account like
if (localStorage.getItem("token") != null) {

  const token = localStorage.getItem("token");
  const decodedToken = parseJwt(token);
  const userId = parseInt(decodedToken.UserId);

  var productIds = [];
  
  getFavoriteProductIds(renderProduct);

  function getFavoriteProductIds(callback) {
    $.get(`https://localhost:7126/api/Likes/List/${userId}`, (data) => {
      productIds = data.map((item) => item.productId);
      // callback();
    }).fail((error) => {});
  } 

  function renderProduct(response) {
    
    $(".cate-products").empty();
    $.each(response, function (index, item) {
      const checkLike = productIds.includes(item.productId);

      const img = $(`<div class='card-img'></div>`);
      img.append(`<img src='https://localhost:7126${item.image1}' alt='' />`);
      const name = $(`<div class='card-name'></div>`).append(
      `<a href='./detail.html?id=${item.productId}'>${item.productName}</a>`);
      const price = $(`<div class='card-price'></div>`).append(`<p>$${item.price}</p>`);
      if (checkLike) {
        const heart =$(`<div class="card-heart"><i class="fas fa-heart fa-lg btnLike" 
        data-id="${item.productId}" data-status="true"></i></div>`).css("color","#ff2e4d");
        const body = $(`<div class='card-body'></div>`).append(price, heart);
        const content = $(`<div class='card-content'></div>`).append(name,body);
        const card = $(`<div class='products-card'></div>`).append(img,content);
        $(".cate-products").append(card);
      } else {
        const heart =
        $(`<div class="card-heart"><i class="far fa-heart fa-lg btnLike" 
        data-id="${item.productId}" ></i></div>`);
        const body = $(`<div class='card-body'></div>`).append(price, heart);
        const content = $(`<div class='card-content'></div>`).append(name,body);
        const card = $(`<div class='products-card'></div>`).append(img,content);
        $(".cate-products").append(card);
      }
    });

    // Handle click to add like list
    $(".btnLike").click((e) => {
      $(e.target).toggleClass("far fa-heart fa-lg fas fa-heart fa-lg");
      if ($(e.target).hasClass("fas fa-heart fa-lg"))
        $(e.target).css("color", "#ff2e4d");
      else $(e.target).css("color", "black");

      if ($(e.target).data("status") == null) {
        var data = {
          customerId: userId,
          productId: $(e.target).data("id"),
          likeStatus: true,
        };

        $.ajax({
          url: `https://localhost:7126/api/Likes`,
          type: "POST",
          data: JSON.stringify(data),
          contentType: "application/json",
          dataType: "json",
          success: (response) => {
            getFavoriteProductIds();
          },
          error: function (error) {},
        });
        return;
      }

      if ($(e.target).data("status") != null) {
        var data = {
          customerId: userId,
          productId: $(e.target).data("id"),
        };

        $.ajax({
          url: `https://localhost:7126/api/Likes`,
          type: "PUT",
          data: JSON.stringify(data),
          contentType: "application/json",
          dataType: "json",
          success: (response) => {
            getFavoriteProductIds();
          },
          error: (error) => {
            console.log(error);
          },
        });
      }
    });

    // End handle
  }
}

if (localStorage.getItem("token") == null) {


  function renderProduct(response) {
    $(".cate-products").empty();
    $.each(response, function (index, item) {

      const img = $(`<div class='card-img'></div>`);
      img.append(`<img src='https://localhost:7126${item.image1}' alt='' />`);
      const name = $(`<div class='card-name'></div>`)
      .append(`<a href='./detail.html?id=${item.productId}'>${item.productName}</a>`);
      const price = $(`<div class='card-price'></div>`).append(`<p>$${item.price}</p>`);
      const heart =$(`<div class="card-heart"><i class="far fa-heart fa-lg btnLike" 
      data-id="${item.productId}"></i></div>`);     
      const body = $(`<div class='card-body'></div>`).append(price, heart);
      const content = $(`<div class='card-content'></div>`).append(name,body);
      const card = $(`<div class='products-card'></div>`).append(img,content);
      $(".cate-products").append(card);
      
    });
  }
}

const url = new URL(window.location.href);
const id = url.searchParams.get("id");
checkId(id);

function checkId(id) {
  if(id == null)
    id = 0;
    // Get Products By Category
    setTimeout(() => {
      $.get(
        `https://localhost:7126/api/Products/getByCategory/${id}`,
        (response) => {
          renderProduct(response);
        }
      ).fail((status, error) => {
        console.log(error);
      });
    },500)
  

}



//GetProductsByPriceRange
const selectPrice = document.getElementById('selectPrice');

selectPrice.addEventListener('change', () => {
  const priceFilter = selectPrice.value;

  if (priceFilter === '1') {
    const maxPrice = 150000;
    $.get(`https://localhost:7126/api/Products/getProductByPriceRange/minPrice=0&&maxPrice=${maxPrice}`, (response) => {
      renderProduct(response);
      console.log(response);
      if (response.length === 0) {
            $(".cate-products").append("<p class='notice-products'>No products found.</p>");
            return;
          }
    }).fail((status, error) => {
      console.log(error);
    });
  } else if (priceFilter === '2') {
    const minPrice = 151000;
    const maxPrice = 250000;

    $.get(`https://localhost:7126/api/Products/getProductByPriceRange/minPrice=${minPrice}&&maxPrice=${maxPrice}`, (response) => {
      renderProduct(response);
      console.log(response);
      if (response.length === 0) {
        $(".cate-products").append("<p class='notice-products'>No products found.</p>");
        return;
      }
    }).fail((status, error) => {
      console.log(error);
    });
  } else if (priceFilter === '3') {
    const minPrice = 251000;
    const maxPrice = 399000;

    $.get(`https://localhost:7126/api/Products/getProductByPriceRange/minPrice=${minPrice}&&maxPrice=${maxPrice}`, (response) => {
      renderProduct(response);
      console.log(response);
      if (response.length === 0) {
        $(".cate-products").append("<p class='notice-products'>No products found.</p>");
        return;
      }
    }).fail((status, error) => {
      console.log(error);
    });
  } else if (priceFilter === '4') {
    const minPrice = 400000;

    $.get(`https://localhost:7126/api/Products/getProductByPriceRange/minPrice=${minPrice}&&maxPrice=99999999`, (response) => {
      renderProduct(response);
      console.log(response);
      if (response.length === 0) {
        $(".cate-products").append("<p class='notice-products'>No products found.</p>");
        return;
      }
    }).fail((status, error) => {
      console.log(error);
    });
  } else {
    $.get('https://localhost:7126/api/Products', (response) => {
      renderProduct(response);
    }).fail((status, error) => {
      console.log(error);
    });
  }
});
//End GetProductsByPriceRange

//GetProductsByMaterial
$.get(`https://localhost:7126/api/Materials`, function(response){
  getMaterialName(response);
}).fail(function (status, error) {
  console.log(error);
});

function getMaterialName(response){
  $("#selectMaterial").empty();
  $("#selectMaterial").append(
    `<option class='materialName' value='0' disable>Materials</option>`
  );
  $.each(response, (index, item) => {
    $("#selectMaterial").append(
      `<option class='materialName' value='${item.materialName}'>${item.materialName}</option>`
    );
  });

}

$("#selectMaterial").change(function() {
  var selectedMaterial = $(this).val();
  $.get(`https://localhost:7126/api/Products/getProductByMaterial/materialName=${selectedMaterial}`, function(response) {
    renderProduct(response);
    if (response.length === 0) {
      $(".cate-products").append("<p class='notice-products'>No products found.</p>");
      return;
    }
  }).fail(function(status, error) {
    console.log(error);
  });
});
//End GetProductsByMaterial


function parseJwt(token) {
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace("-", "+").replace("_", "/");
  return JSON.parse(atob(base64));
}



    // Sự kiện khi thay đổi giá trị trong dropdown
    $('#districtSelect').change(function () {
      var selectedDistrict = $(this).val();
      console.log(selectedDistrict)

      // Gọi API để lấy danh sách sản phẩm theo quận
      $.ajax({
          url: 'https://localhost:7126/api/Products/searchByArea?area=' + selectedDistrict,
          type: 'GET',
          contentType: 'application/json',
          success: function (data) {
              // Hiển thị dữ liệu sản phẩm tương ứng
              displayProduct(data);
              
          },
          error: function (error) {
              alert('Error searching products: ' + error.responseText);
          }
      });
  });

  
// hiep
// Hàm lấy thông tin quận của người dùng từ form
function getUserDistrict() {
return $("#userDistrict").val();
}

// Hàm xử lý tìm kiếm sản phẩm
function searchProducts() {
var productName = document.getElementById("productName2").value;
var userDistrict = getUserDistrict();
console.log(productName,userDistrict)

$.ajax({
    url: 'https://localhost:7126/api/Products/search',
    type: 'GET',
    contentType: 'application/json',
    data: {
        productName: productName,
        userDistrict: userDistrict
    },
    success: function (data) {
        // Hiển thị kết quả tìm kiếm
        displayProduct(data);
    },
    error: function (error) {
        alert('Lỗi khi tìm kiếm sản phẩm: ' + error.responseText);
    }
});
}

// Hàm hiển thị kết quả tìm kiếm
function displayProduct(data) {
var productsList = $(".cate-products");
    productsList.empty();

    if (data.length === 0) {
        // Nếu danh sách sản phẩm rỗng, hiển thị thông báo
        productsList.append("<h3 class='text-center font-weight-bold'>This area currently has no stores or products.</h3>");
    } else {
        $.each(data, function (index, product) {

            var productCard = $('<div class="products-card"></div>');
            var cardImg = $(`<div class="card-img"><a href='./detail.html?id=${product.productId}'>
                <img src="https://localhost:7126${product.image1}" alt="" /></a></div>`);
            var cardContent = $('<div class="card-content"></div>');
            var cardName = $(`<div class="card-name"><a href='./detail.html?id=${product.productId}' 
                class="detail-link" data-id='${product.productId}'>${product.productName}</a></div>`);
            var cardBody = $('<div class="card-body"></div>');
            var cardPrice = $('<div class="card-price"><p> ' + product.price + " VND</p></div>");
            var cardBody2 = $('<div class="card-body2"></div>');
            var cardstoreName = $('<div class=""><p> ' + product.storeName + " </p></div>");
            var cardquantity = $('<div class=""><p> SL ' + product.quantity + " </p></div>");
            var cardstoreDistrict = $('<div class=""><p> ' + product.storeDistrict + " </p></div>");
            

            cardBody.append(cardPrice);
            cardBody2.append(cardstoreName, cardquantity, cardstoreDistrict);
            cardContent.append(cardName, cardBody2, cardBody);
            productCard.append(cardImg, cardContent);
            productsList.append(productCard);
        });
      }
}