$(document).ready(() => {
  //call func
  handleHideShow();
  DisplayDetailProduct();
  DisplaySelectOpt();
  DisplayQuantityInStore();
  DisplayReviewsList();
  //End call func

  function DisplayDetailProduct() {
    // const url = $(location).attr('href');
    // Get Id by web url
    const url = new URL(window.location.href);
    const id = url.searchParams.get("id");

    $.get(`https://localhost:7126/api/Products/${id}`, (response) => {
      renderProduct(response);
      updateViewCount();
    }).fail((status, error) => {
      $(".body-top").remove();
      $(".body-bottom").remove();
    });

    function renderProduct(response) {
      $("#top-left").append(
        `<img src="https://localhost:7126${response.image1}" alt="" />`
      );
      const title = $(".content-title").append(
        `<h1 id="productNameH1">${response.productName}</h1>`
      );
      const price = $(".content-price").append(`<div>${response.price}</div>`);
      const detail = $(".content-detail").append(
        `<span>Design details:</span>`
      );
      const info = $(".content-info").append("<p>");
      DisplayOtherProduct(response.categoryId);
    }

    $(".btn-increase").click((e) => {
      // get input
      let input = $(e.target).parent().children()[0];
      // (int)
      let value = input.value;
      //convert to int
      let newValue = parseInt(value) + 1;
      input.value = newValue;
    });

    $(".btn-decrease").click((e) => {
      var input = $(e.target).parent().children()[0];

      var value = input.value;

      var newValue = parseInt(value);
      // check value not 0
      if (value > 1) {
        var newValue = parseInt(value) - 1;
      }
      input.value = newValue;
    });

    ////Cap nhat luot xem san pham
    function updateViewCount() {
      if (localStorage.getItem("token") != null) {
        const token = localStorage.getItem("token");
        const decodedToken = parseJwt(token);
        const userId = parseInt(decodedToken.UserId);

        const url = new URL(window.location.href);
        const productId = url.searchParams.get("id");

        // Cập nhật view count với customerId và productId
        $.ajax({
          url: `https://localhost:7126/api/ProductViews/UpdateViewCount/customerId=${userId}&&productId=${productId}`,
          type: "PUT",
          data: JSON.stringify(),
          contentType: "application/json",
          dataType: "json",
          success: function (response) {
            console.error("update success");
          },
          error: function (status, error) {
            console.error(error);
            ///
            const dataJson = {
              "productId": productId,
              "customerId":  userId,
              "viewCount": 1,
              "purchaseCount": 0
            }
            $.ajax({
                url: "https://localhost:7126/api/ProductViews",
                type: "POST",
                contentType: "application/json",
                dataType: "json",
                data: JSON.stringify(dataJson),
                success: function (response) {
                    // Xử lý khi POST thành công
                    console.log("POST thành công");
                },
                error: function (error) {
                    // Xử lý khi có lỗi trong quá trình POST
                    console.error("Lỗi khi gọi API POST", error);
                }
            });
            ///
          }
        });
      }
    }
    ////
  }

  function DisplaySelectOpt() {
    const url = new URL(window.location.href);
    const id = url.searchParams.get("id");

    $.get(
      "https://localhost:7126/api/Products/GetNameStoreForDetailProduct/" + id,
      (res) => {
        $.each(res, (index, data) => {
          const opt = $("<option></option>")
            .attr({ value: data.storeId })
            .text(data.storeName);
          $("#SelectStoreName").append(opt);
        });
      }
    );
  }
  function handleHideShow() {
    $(".container_seeReviewProduct").hide();
    $("#SeeReviewsProduct").click(() => {
      $(".container_seeReviewProduct").show();
    });
    $("#closeButton").click(() => {
      $(".container_seeReviewProduct").hide();
    });
  }

  function DisplayReviewsList() {
    const url = new URL(window.location.href);
    const productId = url.searchParams.get("id");
    $("#body_seeReviewsProduct").empty();
    $.get(
      `https://localhost:7126/api/Reviews/GetListReviewsByProductId/${productId}`,
      (res) => {
        $.each(res, (index, data) => {
          const container_divCard = ` <div class="cart_reviewer" style="border: 1px solid #ccc; padding: 20px; border-radius: 5px; margin: 10px;">
              <div style="display: flex; justify-content: space-between;">
                <div><p>Customer: <span>${data.customerName}</span></p></div>
                <div><p>Date: <span>${data.reviewsDate}</span></p></div>
              </div>
              <div><p>Product quality: <span>${data.star} <i class="fa-regular fa-star"></i></span></p></div>
              <div>Reviews: <span>${data.contentReviews}</span></div>
            </div>`;

          $("#body_seeReviewsProduct").append(container_divCard);
        });
      }
    );
  }
  // Hien thi cac san pham lien quan den san pham dang xem
  function DisplayOtherProduct(categoryId) {
    $("#bottom-content").empty();
    $.get(
      `https://localhost:7126/api/Products/getOtherProduct/categoryId=${categoryId}`,
      (res) => {
        $.each(res, (index, data) => {
          $("#bottom-content").append(`<div class="card">
            <div class="card-img">
              <img src="https://localhost:7126/${data.image1}" alt="Image">
            </div>
            <div class="card-body">
            <div class="card-title">
              <h4>${data.productName}</h4>
            </div>
            <div class="card-content">
              <div class="card-price">${data.price} VND</div>
              <div class="card-heart">
                <img src="imgs/icons/heart.svg" alt="">
              </div>
            </div>
            </div>
          </div>`);
        });
      }
    );
  }
  //end

  // hiep
  $("#container_search").hide();

  // Hiển thị form khi nhấn vào liên kết
  $(".re-link.store").click(function (e) {
    e.preventDefault(); // Ngăn chặn chuyển hướng đến href
    $("#container_search").show();
  });
  $("#close_form").click(function (e) {
    e.preventDefault(); // Ngăn chặn chuyển hướng đến href
    $("#container_search").hide();
  });

  // Hàm xử lý tìm kiếm sản phẩm

  // Hàm lấy thông tin quận của người dùng từ form

  $("#userDistrict").change(function () {
    // Lấy giá trị của tên sản phẩm từ input
    var productName = $("#productNameH1").text();

    // Lấy giá trị của quận đang chọn
    var userDistrict = $(this).val();
    console.log(productName, userDistrict);

    // Gọi API để lấy danh sách sản phẩm theo quận
    $.ajax({
      url: "https://localhost:7126/api/Products/search",
      type: "GET",
      contentType: "application/json",
      data: {
        productName: productName,
        userDistrict: userDistrict,
      },
      success: function (data) {
        console.log(data);
        // Hiển thị kết quả tìm kiếm
        displayProduct(data);
      },
      error: function (error) {
        alert("Lỗi khi tìm kiếm sản phẩm: " + error.responseText);
      },
    });
  });

  // Hàm hiển thị kết quả tìm kiếm
  function displayProduct(data) {
    var productsList = $(".cate-products");
    productsList.empty();
    if (data.length === 0) {
      // Nếu danh sách sản phẩm rỗng, hiển thị thông báo
      var anext = $(
        '<span  class="re-link2" id="re-link2" style="color: #9a2b41;;cursor: pointer; position: relative; display: inline-block; text-decoration: none;">show all stores.</span>'
      );
      productsList.append(
        "<h3 class='text-center font-weight-bold'>There are currently no stores or products nearby in this area. Please choose another area or " +
          anext[0].outerHTML +
          ".</h3>"
      );
      $("#re-link2").click(function (event) {
        event.preventDefault();
        var productName = $("#productNameH1").text();

        console.log(productName);

        // Gọi API để lấy danh sách sản phẩm theo tên
        $.ajax({
          url: "https://localhost:7126/api/Products/searchFull",
          type: "GET",
          contentType: "application/json",
          data: {
            productName: productName,
          },
          success: function (data) {
            // Hiển thị kết quả tìm kiếm
            displayProduct(data);
          },
          error: function (error) {
            alert("Lỗi khi tìm kiếm sản phẩm: " + error.responseText);
          },
        });
      });
    } else {
      $.each(data, function (index, product) {
        var productCard = $(
          '<div class="products-card" style="border-bottom: 1px solid #ccc;"></div>'
        );
        var cardstoreName = $(
          '<h3 class="font-weight-bold" > ' +
            product.storeName +
            " , " +
            product.storeDistrict +
            " </h3>"
        );
        var cardquantity = $(
          '<span class="" style="color: #9a2b41;"><p> Số lượng: ' +
            product.quantity +
            " </p></span>"
        );

        productCard.append(cardstoreName, cardquantity);
        productsList.append(productCard);
      });
    }
  }

  ///khai
  function DisplayQuantityInStore() {
    const url = new URL(window.location.href);
    const productId = url.searchParams.get("id");

    $("#SelectStoreName").on("change", () => {
      const storeId = $("#SelectStoreName").val();
      $("#quantityWithStore").empty();
      $.get(
        `https://localhost:7126/api/Products/GetQuantityProductWithStore/storeId=${storeId}&&productId=${productId}`,
        (res) => {
          $("#quantityWithStore").text(res.quantity);
        }
      );
    });
  }
  //end khai
});
