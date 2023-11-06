$(document).ready(function() {
    const urlParams = new URLSearchParams(window.location.search);
    const orderId = urlParams.get("orderId");
    const orderDetail = $("#orderDetail");
    console.log(orderId);
  
    function displayOrderDetail() {
      orderDetail.empty();
      $.get("https://localhost:7126/api/Orders/" + orderId, function(orderDetails) {
        $("#orderId").text(orderDetails.orderId);
        $("#orderDate").text(orderDetails.formattedOrderDate);
        $("#orderCusName").text(orderDetails.customerName);
        $("#orderPhone").text(orderDetails.customerPhone);
        $("#orderAddress").text(orderDetails.customerAddress);
        $("#orderStatus").text(orderDetails.orderStatusName);
        $("#orderMethod").text(orderDetails.orderMethodName);
        $("#totalQuantity").text(orderDetails.totalQuantity);
        $("#totalPrice").text(orderDetails.totalPrice);
  
        // Hiển thị danh sách sản phẩm
        const orderDetailTable = $("#orderDetailTable");
        orderDetailTable.empty();
  
        $.each(orderDetails.orderDetail, function(index, product) {
          const tr = $("<tr></tr>");
          const tdProductName = $("<td></td>").text(product.productName);
          const tdQuantity = $("<td></td>").text(product.quantity);
          const tdPrice = $("<td></td>").text(product.price);
          console.log(tdProductName, tdQuantity, tdPrice);
  
          tr.append(tdProductName, tdQuantity, tdPrice);
          orderDetailTable.append(tr);
        });
        })
        //.fail(function(error) {
        //    console.error("Lỗi khi lấy thông tin đơn hàng:", error);
        // });
    }
    displayOrderDetail();
  });

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