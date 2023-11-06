///////////////
//Statistic By Customer Order
$(document).ready(function() {
    function getStatisticByCustomerOrder(month, year) {
      $.ajax({
        url: `https://localhost:7126/api/Orders/statisticOrderOfCus?month=${month}&year=${year}`,
        type: 'GET',
        dataType: 'json',
        success: function(data) {
          if (data.length > 0) {
            $('#statisticByCustomerOrderTable').empty();
            
            data.forEach(function(customer) {
              var row = `<tr>
                            <td>${customer.customerId}</td>
                            <td>${customer.customerName}</td>
                            <td>${customer.totalOrder}</td>
                            <td>${customer.totalPrice}</td>
                            <td>${"<button class='btn btn-outline-primary'>Chi tiết</button>"}</td>
                         </tr>`;
              $('#statisticByCustomerOrderTable').append(row);
            });
          } else {
            $('#statisticByCustomerOrderTable').html('<tr><td colspan="4">Không có dữ liệu</td></tr>');
          }
        },
        error: function(xhr, status, error) {
          console.log(error);
        }
      });
    }
  
    $('#btnGetStatisticCusOrder').click(function() {
      var month = $('#inputMonthOfCusOrder').val();
      var year = $('#inputYearOfCusOrder').val();
  
      getStatisticByCustomerOrder(month, year);
    });
  });
  // End Statistic By Customer Order