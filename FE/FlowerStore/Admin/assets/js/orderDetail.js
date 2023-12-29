$(document).ready(function() {
    const urlParams = new URLSearchParams(window.location.search);
    // const orderId = urlParams.get("orderId");
    const orderDetail = $("#orderDetail");

    var orderId = localStorage.getItem('orderId');
    if (orderId) {
    //console.log(orderId)
    //localStorage.removeItem('orderId');
  
    function displayOrderDetail() {
      orderDetail.empty();
      $.get("https://localhost:7126/api/Orders/" + orderId, function(orderDetails) {
        $("#orderStoreId").text(orderDetails.storeName);
        $("#orderId").text(orderDetails.orderId);
        $("#orderCusId").text(orderDetails.customerId);
        $("#orderDate").text(orderDetails.formattedOrderDate);
        $("#orderCusName").text(orderDetails.customerName);
        $("#orderPhone").text(orderDetails.customerPhone);
        $("#orderAddress").text(orderDetails.customerAddress);
        $("#orderStatus").text(orderDetails.orderStatusName);
        $("#orderMethod").text(orderDetails.orderMethodName);
        $("#totalQuantity").text(orderDetails.totalQuantity);
        $("#totalPrice").text(formatNumberWithCommas(orderDetails.totalPrice));
  
        //Display product list of order
        const orderDetailTable = $("#orderDetailTable");
        orderDetailTable.empty();
        $.each(orderDetails.orderDetail, function(index, product) {
          const tr = $("<tr></tr>");
          const tdProductName = $("<td></td>").text(product.productName);
          const tdQuantity = $("<td></td>").text(product.quantity);
          const tdPrice = $("<td></td>").text(formatNumberWithCommas(product.price));
         // console.log(tdProductName, tdQuantity, tdPrice);
  
          tr.append(tdProductName, tdQuantity, tdPrice);
          orderDetailTable.append(tr);
        });

        //console.log(orderDetails.orderStatusId)
        
        if(orderDetails.orderStatusId == 2 ){
          $('#btnConfirm').remove()
          $('#btnCancelOrder').remove()
        }
        if(orderDetails.orderStatusId == 1 ){
          $('#btnDelivering').remove()
        }
        if(orderDetails.orderStatusId == 3 ||
          orderDetails.orderStatusId == 4 ||
          orderDetails.orderStatusId == 5  ){
          $('#btnConfirm').remove()
          $('#btnCancelOrder').remove()
          $('#btnDelivering').remove()
        }
      })
        //.fail(function(error) {
        //    console.error("Lỗi khi lấy thông tin đơn hàng:", error);
        // });
    }
    displayOrderDetail();
  }
  
    //PUT: confirm order
    $('#btnConfirm').on("click", function() {
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
          $('#btnConfirm').remove()
          $('#btnCancel').remove()
          displayOrderDetail();
        },
        error: function(error) {
          alert("Lỗi xác nhận đơn hàng", error);
        }
      });
    });

    //PUT: cancel order
    $('#btnCancelOrder').on("click", function() {
      const updateOrderStatus = {
        "orderId": orderId,
        "orderStatusId": 5
      };
      
      $.ajax({
        url: "https://localhost:7126/api/Orders/" + orderId,
        type: "PUT",
        contentType: "application/json",
        data: JSON.stringify(updateOrderStatus),
        success: function(data) {
          alert("Đã hủy đơn");
          $('#btnConfirm').remove()
          $('#btnCancelOrder').remove()
          displayOrderDetail();
        },
        error: function(error) {
          alert("Lỗi hủy đơn", error);
        }
      });
    });

    //PUT: delivering order
    $('#btnDelivering').on("click", function() {
      const updateOrderStatus = {
        "orderId": orderId,
        "orderStatusId": 3
      };
      
      $.ajax({
        url: "https://localhost:7126/api/Orders/" + orderId,
        type: "PUT",
        contentType: "application/json",
        data: JSON.stringify(updateOrderStatus),
        success: function(data) {
          alert("Đã cập nhật trạng thái đơn");
          $('#btnDelivering').remove()
          displayOrderDetail();
        },
        error: function(error) {
          alert("Lỗi", error);
        }
      });
    });

});
//End

//Format number
function formatNumberWithCommas(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}



///////////
//Statistic Product
$(document).ready(function() {
  function getStatisticByCustomerOrder(month, year) {
    $.ajax({
      url: `https://localhost:7126/api/OrderDetails/statisticProduct?month=${month}&year=${year}`,
      type: 'GET',
      dataType: 'json',
      success: function(data) {
        if (data.length > 0) {
          $('#statisticProductTable').empty();
          
          data.forEach(function(OrderDetails) {
            var row = `<tr>
                          <td>${OrderDetails.productId}</td>
                          <td>${OrderDetails.productName}</td>
                          <td>${OrderDetails.price}</td>
                          <td>${OrderDetails.totalQuantity}</td>
                          <td>${OrderDetails.totalPrice}</td>
                       </tr>`;
            $('#statisticProductTable').append(row);
          });
        } else {
          $('#statisticProductTable').html('<tr><td colspan="4">Không có dữ liệu</td></tr>');
        }
      },
      error: function(xhr, status, error) {
        console.log(error);
      }
    });
  }

  $('#btnGetStatisticProduct').click(function() {
    var month = $('#inputMonthOfStatisticProduct').val();
    var year = $('#inputYearOfStatisticProduct').val();

    getStatisticByCustomerOrder(month, year);
  });
});
// End Statistic Product