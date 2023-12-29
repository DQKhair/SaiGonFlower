
//GET Order By Status
const confirm = document.getElementById('waitConfirm');
const processing = document.getElementById('orderProcessing');
const delivering = document.getElementById('orderDelivering');
const success = document.getElementById('orderSuccess');
const cancel = document.getElementById('orderCancel');

function list(){

$('#order-pagination').pagination({
  dataSource: function(done){
    if(confirm.checked)
      $.get(`https://localhost:7126/api/Orders/GetOrderByStatus/StatusId=${$('#waitConfirm').val()}&&StoreId=${userId}`, (data) => {
        done(data)
      }).fail({})
    else if(processing.checked)
      $.get(`https://localhost:7126/api/Orders/GetOrderByStatus/StatusId=${$('#orderProcessing').val()}&&StoreId=${userId}`, (data) => {
        done(data)
      }).fail({})
    else if(delivering.checked)
      $.get(`https://localhost:7126/api/Orders/GetOrderByStatus/StatusId=${$('#orderDelivering').val()}&&StoreId=${userId}`, (data) => {
        done(data)
    }).fail({})  
    else if(success.checked)
    $.get(`https://localhost:7126/api/Orders/GetOrderByStatus/StatusId=${$('#orderSuccess').val()}&&StoreId=${userId}`, (data) => {
      done(data)
    }).fail({})  
     else if(cancel.checked)
    $.get(`https://localhost:7126/api/Orders/GetOrderByStatus/StatusId=${$('#orderCancel').val()}&&StoreId=${userId}`, (data) => {
      done(data)
    }).fail({})  
    else                
      $.get(`https://localhost:7126/api/Orders/GetListOrder/${userId}`,(data) => {
        done(data)        
      }).fail({})
  },  
  pageSize: 20,
  pageRange: 2,
  pageNumber: 1,
  autoHidePrevious: true,
  autoHideNext: true,

  // Need to fix for more effective
  callback: function(data, pagination) {
    if($('#order-pagination')[0].childElementCount > 1)
      $('#order-pagination')[0].children[1].remove();
      
    renderList(data)
  },
  className: 'paginationjs-theme-blue'
});

function renderList(data){
  $("#order-list").empty();
  $.each(data, function (index, item) {
    var row = $(`<tr class='text-center'>`);
    row.append(`<td class='id'> ${item.orderId} </td>`);
    row.append(`<td> ${item.formattedOrderDate} </td>`);
    row.append(`<td >${item.customerName}</td>`)
    row.append(`<td> ${item.customerPhone} </td>`);
    row.append(`<td> ${item.orderStatus} </td>`);
    row.append(`<td><i class='bx bx-info-circle fs-4 text-center' style='cursor: pointer'></i> </td>`);
    $("#order-list").append(row);
    
     //GET OrderDetail
    $('.bx-info-circle').on("click", function() {
      var orderId = $(this).closest('tr').find('.id').text().trim();
      localStorage.setItem('orderId', orderId);
      window.location.href = "quanlydonhang_chitiet.html?orderId=" + item.orderId;
    });

  });

  };
}

// Run function to initial pagination list
list()
// End

// Handle checked order status
$('#waitConfirm').click((e) => {
processing.checked = false;
delivering.checked = false;
success.checked = false;
cancel.checked = false;
list()                  
})

$('#orderProcessing').click((e) => {
  confirm.checked = false;
  delivering.checked = false;
  success.checked = false;
  cancel.checked = false;
  list()                  
})


$('#orderDelivering').click((e) => {
  confirm.checked = false;
  processing.checked = false;
  success.checked = false;
  cancel.checked = false;
  list()                  
})

$('#orderSuccess').click((e) => {
  confirm.checked = false;
  processing.checked = false;
  delivering.checked = false;
  cancel.checked = false;
  list()                  
})

$('#orderCancel').click((e) => {
  confirm.checked = false;
  processing.checked = false;
  delivering.checked = false;
  success.checked = false;
  list()                  
})
// End handle checked order status


/////////////////////////////
//Form add order
var token = localStorage.getItem("token");
var decodedToken = parseJwt(token);
var userRole = decodedToken.role;
var userId = decodedToken.UserId;
let sumQuantity = 0;
let sumPrice = 0;
let cusId;
 //search phonenumber => info customer
 $("#searchPhoneNumber").click(()=>{
  const searchPhone = $("#inputPhoneNumber").val()
  $.get(`https://localhost:7126/api/Orders/CheckExists/${searchPhone}`, function(data){
    displayCustomerInfo(data);
      console.log(data);
  }).fail((error) => {
      alert("Không tìm thấy tài khoản")
  })

  function displayCustomerInfo(data){
      if (data) {
        //Show customer info
        cusId = data.customerId;
        console.log(cusId);
        $("#inputCusName").val(data.customerName);
        $("#inputPhoneNumber").val(data.customerPhone);
        $("#inputAddress").val(data.customerAddress);
        // $("#inputCusName").prop("readonly", true);
        // $("#inputPhoneNumber").prop("readonly", true);
        // $("#inputAddress").prop("readonly", true);
      }     
  }
})

//Get OrderMethod 
$.get(`https://localhost:7126/api/OrderMethods`, function(response){
  getOrderMethod(response);
}).fail(function (status, error) {
  console.log(error);
});

function getOrderMethod(response){
  $("#selectOrderMethod").empty();
  $("#selectOrderMethod").append(
    `<option class='orderMethod' value='0' disable>Phương thức thanh toán</option>`
  );
  $.each(response, (index, item) => {
    $("#selectOrderMethod").append(
      `<option class='orderMethod' value='${item.orderMethodId}'>${item.orderMethodName}</option>`
    );
  });
}

//Select total quantity of product 
for (let i = 0; i <= 10; i++) {
 $("#select-quantity").append(`<option value='${i}'>${i}</option>`);
}

//Format number
function formatNumberWithCommas(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

//Add order new
$("#select-quantity").change((e) => {
let value = e.target.value;
let length = $(".option-item").length;

// Handle when decrease amount input
if (length > value) {
  let newValue = length - value;
  for (let i = 1; i <= newValue; i++) {
    $(".option-item")[length - i].remove();
  }
  // Handle when increase amount input
} else {
  for (let i = length + 1; i <= value; i++) {
    const select = $(`<select name='productId' style='width: 30%;'></select>`)
    .addClass("form-select select-product");
    select.append(`<option class='product-item' value='0'>Sản phẩm</option>`);

    const label = $(`<label style='width:5%;'>${i}:</label>`);
    const quantityProduct = $(`<input id='quantityProduct${i}' style='width:10%;' type='text'  placeholder="SLHT" readonly/>`)
    .addClass("form-control mx-auto text-center quantityProduct");

    const inputQuantity = $(`<input id='quantity${i}' style='width:10%;' type='text' placeholder="SL" maxlength='3'/>`)
    .addClass("form-control mx-auto text-center quantity");

    const inputPrice = $(`<input id='price${i}' style='width:20%;' type='text' placeholder="Đơn giá" />`)
    .addClass("form-control mx-auto text-center price");

    const totalPrice = $(`<input id='totalPrice${i}' style='width:20%;' type='text' placeholder="Tổng tiền" />`)
    .addClass("form-control mx-auto text-center totalPrice");
    
    const div = $(`<div></div>`)
    .addClass("py-2 col-lg-12 col-sm-12 d-flex align-items-center option-item");

    div.append(label, select,quantityProduct, inputQuantity, inputPrice, totalPrice);
    $("#changeForm").append(div);

    $(`#quantity${i}`).change(() => {
      sumQuantity = 0;
      sumPrice = 0;
      for (let j = length; j <= value; j++) {
        const quantity = parseInt($(`#quantity${j}`).val()) || 0;
        const price = parseFloat($(`#price${j}`).val()) || 0;
        const productTotalPrice = quantity * price;
    
        sumQuantity += quantity;
        sumPrice += productTotalPrice;

        $(`#totalPrice${j}`).val(formatNumberWithCommas(productTotalPrice));
      }
    
      $("#totalQuantity").text(sumQuantity); 
      $("#totalPrice").text(formatNumberWithCommas(sumPrice)+ " VND");
      
    }) 
  }
}

//Show price of product
let prevValues = [];

$(".select-product").change((e) => {
  const selectedProductId = e.target.value;
  const correspondingPriceInput = $(e.target).closest('.option-item').find('.price');
  const correspondingQuantityProduct = $(e.target).closest('.option-item').find('.quantityProduct');


  if (prevValues.includes(selectedProductId)) {
    alert("Trùng sản phẩm! Vui lòng chọn sản phẩm khác");
    e.target.selectedIndex = 0;
    correspondingPriceInput.val('');
  } 
  else if (selectedProductId !== '0') {
    prevValues.push(selectedProductId);

    $.get(`https://localhost:7126/api/Products/GetQuantityProductOfStore/StoreId=${userId}&&ProductId=${selectedProductId}`, function (response) {
      const productPrice = response.price;
      correspondingPriceInput.val(productPrice);
      const quantityProduct = response.quantity;
      correspondingQuantityProduct.val(quantityProduct);
    }).fail(function (status, error) {
      console.log(error);
    });
  } else {
    // Clear if product null
    correspondingPriceInput.val('');
  }
});

//Get product list 
$.get(`https://localhost:7126/api/Products/GetProductsForStore/${userId}`, function (response) {
  getProducts(response);
}).fail(function (status, error) {
  console.log(error);
});

function getProducts(response) {
  $(".select-product").empty();
  $(".select-product").append(
    `<option class='product-item' value='0'>Sản phẩm</option>`
  );
  $.each(response, (index, item) => {
    $(".select-product").append(
      `<option class='product-item' value='${item.productId}'>${item.productName}</option>`
    );
  });
}

///////////////
//Add New Order
$("#btnAddImport").click(() => {
  const odMethod = $("#selectOrderMethod").val();

  const nameCus = $("#inputCusName").val();
  const phoneCus = $("#inputPhoneNumber").val();
  const addressCus = $("#inputAddress").val();
  if(cusId != null){
    var postData = {
      totalQuantity: sumQuantity,
      totalPrice: sumPrice,
      customerId: cusId,
      nameCusNonAccount: nameCus,
      phoneCusNonAccount: phoneCus,
      addressCusNonAccount: addressCus, 
      orderMethodId: odMethod,
      storeId: parseInt(userId),
    }
      //Add order table
      $.ajax({
        url: `https://localhost:7126/api/Orders`,
        type: "POST",
        data: JSON.stringify(postData),
        contentType: "application/json",
        dataType: "json",
        success: (response) => {
          getNewOrder(response);
          // Click save to reset form
          $("#importForm")[0].reset();
          $(".option-item").remove();
          // End click
        },
        error: function (status, error) {
          alert("Lỗi vui lòng kiểm tra lại");
        },
      });
      // End order table
    
      // Add order details table
      function getNewOrder(response) {
        const orderId = response.orderId;
        $(".select-product").each((index, item) => {
          const quantity = parseInt($(`#quantity${index + 1}`).val()) || 0;
          const price = parseFloat($(`#price${index + 1}`).val()) || 0;
          const productId = parseInt($(item).val());
      
          const orderDetailData = {
            quantity: quantity,
            price: price,
            orderId: orderId,
            productId: productId
          };
      
          $.ajax({
            url: "https://localhost:7126/api/OrderDetails",
            type: "POST",
            data: JSON.stringify(orderDetailData),
            contentType: "application/json",
            dataType: "json",
            success: (response) => {
              updateProductQuantity(productId, quantity); 
              updatePurchaseCount(productId) 
            },
            error: function (status, error) {
              alert("Lỗi OrderDetail")
              console.log(error);
            }
          });
        });
      }
      // End  order details table
   
    }
    //CustomerNonAccount
    if(cusId == null){
      const nameCus = $("#inputCusName").val();
      const phoneCus = $("#inputPhoneNumber").val();
      const addressCus = $("#inputAddress").val();
      var postData = {
        totalQuantity: sumQuantity,
        totalPrice: sumPrice,
        nameCusNonAccount: nameCus,
        phoneCusNonAccount: phoneCus,
        addressCusNonAccount: addressCus, 
        orderMethodId: odMethod,
        storeId: parseInt(userId),
      }
      //Add order table
      $.ajax({
        url: `https://localhost:7126/api/Orders`,
        type: "POST",
        data: JSON.stringify(postData),
        contentType: "application/json",
        dataType: "json",
        success: (response) => {
          getNewOrder(response);
          // Click save to reset form
          $("#importForm")[0].reset();
          $(".option-item").remove();
          // End click
        },
        error: function (status, error) {
          alert("Lỗi vui lòng kiểm tra lại");
        },
      });
      // End order table
    
      // Add order details table
      function getNewOrder(response) {
        const orderId = response.orderId;
        $(".select-product").each((index, item) => {
          const quantity = parseInt($(`#quantity${index + 1}`).val()) || 0;
          const price = parseFloat($(`#price${index + 1}`).val()) || 0;
          const productId = parseInt($(item).val());
      
          const orderDetailData = {
            quantity: quantity,
            price: price,
            orderId: orderId,
            productId: productId
          };
      
          $.ajax({
            url: "https://localhost:7126/api/OrderDetails",
            type: "POST",
            data: JSON.stringify(orderDetailData),
            contentType: "application/json",
            dataType: "json",
            success: (response) => {
              //console.log(productId, quantity)
              updateProductQuantity(productId, quantity, orderId); 
              updatePurchaseCount(productId) 
            },
            error: function (status, error) {
              alert("Lỗi OrderDetail")
              console.log(error);
            }
          });
        });
      }
      // End  order details table
    }

  list();

});


 ////Cap nhat luot mua san pham
 function updatePurchaseCount(productId) {
  if (localStorage.getItem("token") != null) {
    const token = localStorage.getItem("token");
    const decodedToken = parseJwt(token);
    const userId = parseInt(decodedToken.UserId);

    // Cập nhật purchase count với customerId và productId
    $.ajax({
      url: `https://localhost:7126/api/ProductViews/UpdatePurchaseCount/customerId=${userId}&&productId=${productId}`,
      type: "PUT",
      data: JSON.stringify(),
      contentType: "application/json",
      dataType: "json",
      success: function (response) {
        // console.error("update success");
      },
      error: function (status, error) {
        //console.error(error);
        ///
        const dataJson = {
          "productId": productId,
          "customerId": userId,
          "viewCount": 0,
          "purchaseCount": 1
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
      },
    });
  }
}
////


// //////////////
//Hàm để gửi yêu cầu PUT cập nhật số lượng sản phẩm
function updateProductQuantity(productId, quantity, orderId) {
  const updateData = {
    "quantityProduct": parseInt(quantity)
  };

  $.ajax({
    url: `https://localhost:7126/api/Stores/UpdateProductQuantity/StoreId=${userId}&&ProductId=${productId}`,
    type: "PUT",
    data: JSON.stringify(updateData),
    contentType: "application/json",
    dataType: "json",
    success: (response) => {
      alert("Tạo đơn hàng thành công")
    },
    error: function (error) {
      alert(error.responseText);
      HandleRefund(productId,quantity);
      HandleOrderDelete(orderId);
    },
  });
}

function HandleRefund(productId,quantity)
{
  const updateData = {
    "quantityProduct": parseInt(quantity)
  };
  $.ajax({
    url:`https://localhost:7126/api/Stores/RefundProductQuantity/StoreId=${userId}&&ProductId=${productId}`,
    type: "PUT",
    data: JSON.stringify(updateData),
    contentType: "application/json",
    dataType: "json",
    success: (response) => {
      console.log(response);
    },
    error: function (error) {
      console.error("Error Refund:",error);
    },
  })
}

function HandleOrderDelete(orderId)
{
  $.ajax({
    url: `https://localhost:7126/api/Stores/DeleteOrder/${orderId}`,
    type: "DELETE",
    success: function (response) {
      alert(response);
    },
    error: function (error) {
      alert("Lỗi xóa chi tiết đơn hàng!");
    },
  });
}

//////
//Check is numeric input
$(".quantity").keypress((e) => {
  let input = e.target.value + e.key
  if(input > 50 || input == 0)
    e.preventDefault()

  if (!(e.charCode >= 48 && e.charCode <= 57)) 
    e.preventDefault();
});


// Chek not empty
$(".quantity").blur((e) => {
  if(e.target.value == '')
    e.target.value = 1;
  //alert("Nhập số lượng sản phẩm");
});


// Click cancel to reset form
$("#btnCancel").click(() => {
  $("#importForm")[0].reset();
  $(".option-item").remove();
});

});



