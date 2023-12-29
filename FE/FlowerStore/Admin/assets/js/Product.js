$(document).ready(function () {
    var productTable = $("#productTable tbody");

    function reFreshDisplay() {
        
    
        // Hàm hiển thị sản phẩm trong bảng
        function displayProduct(data) {
            
            productTable.empty();
            $.each(data, (index, product) => {
                
                var actions =
                    '<div class="actions">' +
                    '<i class="bx bx-edit fs-4 text-center"'+
                          'style="cursor: pointer"' +
                          'data-bs-toggle="modal"' +
                          'data-bs-target="#sua-form"'+
                          'data-product-id="'+ product.productId +
                          '"data-product-name="'+product.productName+'"></i> '
                    "</div>";
    
                var image = product.image1
                    ? '<img src="https://localhost:7126' +
                    product.image1 +
                    '" alt="' +
                    product.productName +
                    '" style="max-width: 100px; max-height: 100px;" />'
                    : "N/A";

                    var quantity = product.quantity !== null ? product.quantity : 'Xem chi tiết tại cửa hàng';
                    var storeInfo = product.storeName !== null
                        ? product.storeName + ' - ' + (product.storeDistrict !== null ? product.storeDistrict : 'Xem chi tiết tại cửa hàng')
                        : 'Xem chi tiết tại cửa hàng';
    
                productTable.append(
                    "<tr>" +
                    "<td>" +
                    product.productId +
                    "</td>" +
                    "<td>" +
                    product.productName +
                    "</td>" +
                    "<td>" +
                    product.price +
                    " $ </td>" +
                    " <td>" +
                    product.categoryName +
                    "</td>" +
                    "<td>" +
                    image +
                    "</td>" +
                    "<td>" +
                    quantity +
                    "</td>" +
                    "<td>" +
                    product.recipeName +
                    "</td>" +
                    "<td>" +
                    storeInfo  +
                    "</td>" +
                    "<td>" +
                    actions +
                    "</td>" +
                    "</tr>"
                );
            });
        }
    
        

        // Gọi API để lấy danh sách sản phẩm và hiển thị trên bảng
        var token = localStorage.getItem("token");
        var decodedToken = parseJwt(token);
        var userRole = decodedToken.role;
        var userId = decodedToken.UserId;

        var apiUrl = "";
        if (userRole === "Company") {
            apiUrl = "https://localhost:7126/api/Products/GetProductsForCompany";
        } else if (userRole === "Store") {
            apiUrl = "https://localhost:7126/api/Products/GetProductsForStore/" + userId;
        }

        if (apiUrl) {
            $.ajax({
                url: apiUrl,
                type: "GET",
                headers: {
                    Authorization: "Bearer " + token,
                },
                success: function (data) {
                    console.log(data);
                    // Hiển thị dữ liệu sản phẩm tương ứng
                    displayProduct(data);
                },
                error: function (xhr, status, error) {
                    console.error("Lỗi khi tải dữ liệu sản phẩm: " + error);
                },
            });
        }
    }
    reFreshDisplay()

    




    var token = localStorage.getItem("token");
    var decodedToken = parseJwt(token);
    var userId = decodedToken.UserId;
    $("#StoreId").attr("value", userId);

    //end xử lý thêm

    // sửa sp


    
   
    $(this).on("click", ".bx-edit", function (){
        let productId  = $(this).data('product-id');
        
        if (userRole === "Company") {
            $("#sua__product-form").show();
            $("#sua__product-form1").hide();

            $.ajax({
                url: 'https://localhost:7126/api/Products/' + productId, // Thay đổi đường dẫn API của bạn
                type: 'GET',
                success: function (data) {
                    // Cập nhật giá trị của các trường input và phần tử khác trong modal
                    
                    $('#productName-sua').val(data.productName);
                    $('#price-sua').val(data.price);
                    $('#productid-sua').val(data.productId);
                    $.get('https://localhost:7126/api/Categories',data => {
                        getcate(data)
        
                    })
        
                    function getcate(data){
                        $('#categoryId').empty();
                        $.each(data, (index, product) => {
                            $('#categoryId-sua').append(`<option value="${product.categoryId}">${product.categoryName}</option>`)
                            
                        });
        
                    };
                    
                    if (data.image1) {
                        $('.modal-body img').attr('src', 'https://localhost:7126' + data.image1);
                    } else {
                        $('.modal-body img').attr('src', ''); // Nếu không có hình ảnh, xóa ảnh trống
                    }
        
                    // Mở modal chỉnh sửa
                    $('#sua-form').modal('show');
                },
                error: function () {
                    alert('Lỗi khi tải thông tin sản phẩm.');
                }
            });
        
        
            $("#saveEditButton").click( function () {
                const formData = new FormData();
                const name = $("#productName-sua").val();
                const gia = $("#price-sua").val();
                const cate = $("#categoryId-sua").val();
                // const image = $("#image-sua").val();
                const image = document.getElementById("image-sua").files[0];
                formData.append("productName", name);
                formData.append("price", gia);
                formData.append("CategoryId", cate);
                formData.append("Images", image);
                console.log(productId,name,gia,cate,image)
            
                $.ajax({
                    url: 'https://localhost:7126/api/Products/' + productId,
                    type: 'PUT',
                    data: formData,
                    contentType: false,
                    processData: false,
                    success: function (data) {
                        alert('Sửa thành công: ' + data);
                        $('#sua-form').modal('hide');
                        reFreshDisplay();
                    },
                    error: function () {
                        alert('Lỗi khi cập nhật sản phẩm.');
                    }
                });
            });
        } else if (userRole === "Store") {
        
            $("#sua__product-form1").show();
            $("#sua__product-form").hide();

            $.ajax({
                url: 'https://localhost:7126/api/Products/' + productId, // Thay đổi đường dẫn API của bạn
                type: 'GET',
                success: function (data) {
                    // Cập nhật giá trị của các trường input và phần tử khác trong modal
                    
                    $('#productName-sua1').val(data.productName);
                    
                    
                    if (data.image1) {
                        $('.modal-body img').attr('src', 'https://localhost:7126' + data.image1);
                    } else {
                        $('.modal-body img').attr('src', ''); // Nếu không có hình ảnh, xóa ảnh trống
                    }
        
                    // Mở modal chỉnh sửa
                    $('#sua-form').modal('show');
                },
                error: function () {
                    alert('Lỗi khi tải thông tin sản phẩm.');
                }
            });

            $("#saveEditButton").click( function () {
                const formData = new FormData();
                const productId1 = productId;
                console.log(productId1)
                const storeId = userId;
                const quantity = $("#quantity-sua").val();
                // const image = $("#image-sua").val();
                
                
                var postData = {
                    storeId: parseInt(storeId),
                    productId: parseInt(productId1),
                    quantity: parseInt(quantity)
                  };
                  console.log(postData)
            
                $.ajax({
                    url: 'https://localhost:7126/api/Products/UpdateQuantity' ,
                    type: 'PUT',
                    data: JSON.stringify(postData),
                    contentType: "application/json",
                    dataType: "json",
                    success: function (data) {
                        alert('Sửa thành công! ' );
                        $('#sua-form').modal('hide');
                        reFreshDisplay();
                    },
                    error: function () {
                        alert('Lỗi khi cập nhật sản phẩm.');
                    }
                });
            });
        }


        
});

    
//Form thêm sản phẩm
var token = localStorage.getItem("token");
var decodedToken = parseJwt(token);
var userRole = decodedToken.role;
var userId = decodedToken.UserId;

if (userRole === "Company") {
    $("#QLSP__product-form").show();
    $("#QLSP__product-form1").hide();

    document.getElementById("addProduct").addEventListener("click", function () {
        const productName = document.getElementById("productName1").value;
        const price = parseFloat(document.getElementById("price").value);
        const discount = parseFloat(document.getElementById("discount").value);
        const image = document.getElementById("image").files[0];
        
        const formData = new FormData();
        formData.append("ProductName", productName);
        formData.append("Price", price);
        const d = discount == 1 ? true : false;
        formData.append("Discount", d);
        formData.append("CategoryId", categoryId.value);
        formData.append("RecipeId", recipeId.value);
        formData.append("Images", image);
        // Gửi yêu cầu AJAX để thêm sản phẩm
        fetch("https://localhost:7126/api/Products/uploadfile", {
            method: "POST",
            body: formData,
            
        })
        
        .then((response) => {
            
            return response.json(); 
        })
        .then((data) => {
            if (data.error) {
                alert("Lỗi: " + data.error);
            } else {
                // Xử lý dữ liệu phản hồi thành công
                reFreshDisplay();
                alert("Thêm thành công sản phẩm: " + data.productName);
                
                console.log("Sản phẩm đã được thêm:", data);
            }
        })
        .catch((error) => {
            alert("Lỗi khi thêm sản phẩm:" + error);
        });
        
    });
  } else if (userRole === "Store") {
    
    $("#QLSP__product-form1").show();
    $("#QLSP__product-form").hide();

    $("#addProduct").click(function () {

    
        // Lấy thông tin từ các trường input
        var productId = $("#productIdc").val();
        var storeId = userId;
        var quantity = $("#quantityc").val();
  
        // Dữ liệu gửi đi
        var data = {
          storeId: storeId,
          quantity: quantity,
        };
  
        // Gửi yêu cầu POST đến API
        $.ajax({
          url: 'https://localhost:7126/api/Products/AddQuantityAndStoreId/' + productId,
          type: 'POST',
          contentType: 'application/json',
          data: JSON.stringify(data),
          success: function (response) {
            // Xử lý khi yêu cầu thành công
            alert("Thêm sản phẩm thành công!");
            reFreshDisplay();
          },
          error: function (error) {
            // Xử lý khi yêu cầu gặp lỗi
        if (error.responseJSON && error.responseJSON.length > 0) {
            // Hiển thị thông báo chi tiết từ danh sách nguyên liệu thiếu
            alert("Lỗi khi thêm sản phẩm:\n" + error.responseJSON.join("\n"));
        } else {
            // Hiển thị thông báo lỗi chung
            alert("Lỗi khi thêm sản phẩm: " + error.responseText);
        }
          }
        });
        
    });
      
  } else {
    // Xử lý khi không xác định được role hoặc role không hợp lệ
    alert("Không xác định được role hoặc role không hợp lệ");
  }
  $.get('https://localhost:7126/api/Products',data => {
    getProduct(data)
    

})

function getProduct(data){
    $('#categoryIdc').empty();
    $.each(data, (index, product) => {
        
        $('#productIdc').append(`<option value="${product.productId}">${product.productName}</option>`)
        if (product.image1) {
            $('.modal-body img').attr('src', 'https://localhost:7126' + product.image1);
          } else {
            $('.modal-body img').attr('src', ''); // Nếu không có hình ảnh, xóa ảnh trống
          }
    });

};
  //thêm sto



      //thêm com
    $("#QLSP__create_product").click(function () {

        

        $.get('https://localhost:7126/api/Stores',data => {
            getStore(data)

        })

        function getStore(data){
            $('#StoreId').empty();

            $.each(data, (index, product) => {
                $('#StoreId').append(`<option value="${product.storeId}">${product.storeName}</option>`)
                
            });

        };

        $.get('https://localhost:7126/api/Recipes',data => {

            getRecip(data)

        })

        function getRecip(data){
            $('#recipeId').empty();
            $.each(data, (index, product) => {
                $('#recipeId').append(`<option value="${product.recipeId}">${product.recipeName}</option>`)
                
            });

        };

        $.get('https://localhost:7126/api/Categories',data => {
            getcate(data)

        })

        function getcate(data){
            $('#categoryId').empty();
            $.each(data, (index, product) => {
                $('#categoryId').append(`<option value="${product.categoryId}">${product.categoryName}</option>`)
                
            });

        };
    });


});



 
  

