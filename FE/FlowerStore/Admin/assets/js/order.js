$(document).ready(function(){
    const orderTable = $("#orderTable");

    function displayOrderList(){
        orderTable.empty();
        //GET
        $.get("https://localhost:7126/api/Orders", function(data){
            $.each(data, function(index, order){
                const tr = $("<tr></tr>");
                const tdId = $("<td></td>").text(order.orderId);
                const tdOrderDate = $("<td></td>").text(order.formattedOrderDate);
                const tdCustomer = $("<td></td>").text(order.customerName);
                const tdPhone = $("<td></td>").text(order.customerPhone);
                const tdOrderStatus = $("<td></td>").text(order.orderStatus);
                const tdAction = $("<td></td>");

                const btnDetail = $("<button></button>").text("Chi tiết");
                const btnAccept = $("<button></button>").text("Xác nhận");
                btnDetail.addClass("btn btn-outline-primary");
                btnAccept.addClass("btn btn-primary mx-2");

                //GET OrderDetail
                btnDetail.on("click", function() {
                    const orderId = order.orderId;
                    window.location.href = "quanlydonhang_chitiet.html?orderId=" + orderId;
                });

                // PUT
                btnAccept.on("click", function() {
                    const orderId = order.orderId;
                    const updateOrderStatus = {
                        "orderId": orderId,
                        "orderStatusId": 2
                };

                $.ajax({
                    url: "https://localhost:7126/api/Orders/" + orderId,
                    type: "PUT",
                    contentType: "application/json",
                    data: JSON.stringify(updateOrderStatus),
                    success: function(data) {
                        alert("Xác nhận đơn hàng thành công");
                        displayOrderList();
                    },
                    error: function(error) {
                        alert("Lỗi xác nhận đơn hàng", error);
                    }
                });

                });

                tdAction.append(btnDetail, btnAccept);
                tr.append(tdId, tdOrderDate, tdCustomer, tdPhone, tdOrderStatus, tdAction);
                orderTable.append(tr);
            })
        })
    }
    displayOrderList();

})

/////////////
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
        // Hiển thị thông tin khách hàng đã có tài khoản
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
for (let i = 0; i <= 5; i++) {
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
    const select = $(`<select name='productId' style='width: 40%;'></select>`)
    .addClass("form-select select-product");
    select.append(`<option class='product-item' value='0'>Sản phẩm</option>`);

    const label = $(`<label style='width:5%;'>${i}:</label>`);
    const inputQuantity = $(`<input id='quantity${i}' style='width:10%;' type='text' placeholder="SL" maxlength='2'/>`)
    .addClass("form-control mx-auto text-center quantity");

    const inputPrice = $(`<input id='price${i}' style='width:20%;' type='text' placeholder="Đơn giá" />`)
    .addClass("form-control mx-auto text-center price");

    const totalPrice = $(`<input id='totalPrice${i}' style='width:20%;' type='text' placeholder="Tổng tiền" />`)
    .addClass("form-control mx-auto text-center totalPrice");
    
    const div = $(`<div></div>`)
    .addClass("py-2 col-lg-12 col-sm-12 d-flex align-items-center option-item");

    div.append(label, select, inputQuantity, inputPrice, totalPrice);
    $("#changeForm").append(div);

    $(`#quantity${i}`).change(() => {
      // sum = 0;
      // for (let j = length; j <= value; j++) {
      //   sum += parseInt($(`#quantity${j}`).val()) || 0;
      // }
      // console.log(sum)
      // $("#totalQuantity").text(sum)

      sumQuantity = 0;
      sumPrice = 0;
      for (let j = length; j <= value; j++) {
        const quantity = parseInt($(`#quantity${j}`).val()) || 0;
        const price = parseFloat($(`#price${j}`).val()) || 0;
        const productTotalPrice = quantity * price;
    
        sumQuantity += quantity;
        sumPrice += productTotalPrice;

        //$(`#totalPrice${j}`).val(productTotalPrice);
        $(`#totalPrice${j}`).val(formatNumberWithCommas(productTotalPrice));
      }
    
      $("#totalQuantity").text(sumQuantity); 
      //$("#totalPrice").text(sumPrice);

      $("#totalPrice").text(formatNumberWithCommas(sumPrice)+ " VND");
      
    }) 
  }
}

 //Show price of product
 $(".select-product").change((e) => {
  const selectedProductId = e.target.value;
  const correspondingPriceInput = $(e.target).closest('.option-item').find('.price');
  if (selectedProductId !== '0') {
    $.get(`https://localhost:7126/api/Products/${selectedProductId}`, function (response) {
      const productPrice = response.price;
      correspondingPriceInput.val(productPrice);
    }).fail(function (status, error) {
      console.log(error);
    });
  } else {
    //Clear if product null
    correspondingPriceInput.val(''); 
  }
  });

//Get product list 
$.get(`https://localhost:7126/api/Products`, function (response) {
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
/////
//Start click
$("#btnAddImport").click(() => {
        
  //Add order table
    const odMethod = $("#selectOrderMethod").val();
    
    var postData = {
      totalQuantity: sumQuantity,
      totalPrice: sumPrice,
      customerId: cusId,
      orderMethodId: odMethod,
      storeId: parseInt(userId),
    }

    // const nameCus = $("#inputCusName").val();
    // console.log(nameCus)
    // const phoneCus = $("#inputPhoneNumber").val();
    // const addressCus = $("#inputAddress").val();
    // var postData = {
    //   totalQuantity: 1,
    //   totalPrice: 0,
    //   nameCusNonAccount: nameCus,
    //   phoneCusNonAccount: phoneCus,
    //   addressCusNonAccount: addressCus, 
    //   orderMethodId: 1,
    //   storeId: parseInt(userId),


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
          //alert("Tạo đơn hàng thành công")
          //console.log(response);
        },
        error: function (status, error) {
          alert("Lỗi OrderDetail")
          console.log(error);
        }
      });
    });

  }
  alert("Tạo đơn hàng thành công")
   
  // End  order details table
});


//Check is same
let prevVal = null;
$(".select-product").change((e) => {
  let curVal = e.target.options[e.target.selectedIndex].value;
  console.log(curVal)
  if (curVal == prevVal) {
    alert("Trùng sản phẩm");
    e.target.selectedIndex = 0;
  }else{
    prevVal = curVal;
  }
});
// End check

//Check is numeric input
$(".quantity").keypress((e) => {
  let input = e.target.value + e.key
  if(input > 50 || input == 0)
    e.preventDefault()

  if (!(e.charCode >= 48 && e.charCode <= 57)) e.preventDefault();
});

// Chek not empty
$(".quantity").blur((e) => {
  if(e.target.value == '')
    e.target.value = 1;
});
//End check

// Click cancel to reset form
$("#btnCancel").click(() => {
  $("#importForm")[0].reset();
  $(".option-item").remove();
});
// End click
});


