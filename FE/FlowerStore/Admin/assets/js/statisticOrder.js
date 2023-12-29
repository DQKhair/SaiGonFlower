///////////////
//Statistic By Customer Order - page index
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


//////////
// Get Revenue By Month - page index
$(document).ready(function() {
  function getRevenueByMonth() {
    $.ajax({
      url: 'https://localhost:7126/api/Orders/revenueByMonth',
      type: 'GET',
      dataType: 'json',
      success: function(data) {
        var revenue = data;

        var revenueElement = $('#revenueByMonth');
        revenueElement.text(formatCurrency(revenue) + ' VND');
      },
      error: function(xhr, status, error) {
        console.log(error);
      }
    });
  }

  function formatCurrency(value) {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  getRevenueByMonth();
});
// End Get Revenue By Month - page index
  
////////
//Get Order Count Today - page index
$(document).ready(function() {
  function getOrderCountToday() {
    $.ajax({
      url: 'https://localhost:7126/api/Orders/orderCountToday',
      type: 'GET',
      dataType: 'json',
      success: function(data) {
        var orderCount = data;

        var orderCountElement = $('#orderCountToday');
        orderCountElement.text(orderCount);
      },
      error: function(xhr, status, error) {
        console.log(error);
      }
    });
  }
  getOrderCountToday();
});
//End Get Order Count Today - page index


////////////////////
//Get Revenue By Day In Month - page Quanlydoanhthu
$(document).ready(function() {

  function formatNumber(number) {
    return number.toLocaleString('en-US');
  }

  function getRevenueByDay(startDate, endDate) {
    $.ajax({
        url: `https://localhost:7126/api/Orders/revenueByDay?startDate=${startDate}&endDate=${endDate}`,
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            var revenueMonth = $('#revenueMonthTable');
            revenueMonth.empty();

            var totalRevenue = 0;
            var totalOrderCount = 0;

            for (var i = 0; i < data.length; i++) {
                var row = `<tr class="text-center">
                    <td>${i + 1}</td>
                    <td>${data[i].formattedDate}</td>
                    <td>${data[i].orderCount}</td>
                    <td>${formatNumber(data[i].totalRevenue)}</td>
                    <td>${formatNumber(data[i].totalRevenue)} (100%)</td>
                    <td><i class='bx bx-info-circle fs-4 text-center' style='cursor: pointer'></i> </td>
                </tr>`;
                revenueMonth.append(row);

                totalRevenue += data[i].totalRevenue;
                totalOrderCount += data[i].orderCount;
            }

            $('#totalCountRevenueMonth').text(`${totalOrderCount}`);
            $('#totalRevenueMonth').text(`${formatNumber(totalRevenue)}`);
            $('#totalProfitMonth').text(`${formatNumber(totalRevenue)} (100%)`);
        },
        error: function (xhr, status, error) {
            alert("Không tìm thấy dữ liệu");
        }
    });
  }

  $('#btnShowRevenueByDay').click(function () {
    var startDate = new Date($('#inputStartDate').val());
    var endDate = new Date($('#inputEndDate').val());

    var timeDiff = Math.abs(endDate.getTime() - startDate.getTime());
    var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

    if (diffDays > 30) {
        alert("Khoảng thời gian không được vượt quá 30 ngày");
        return;
    }

    var formattedStartDate = formatDate(startDate);
    var formattedEndDate = formatDate(endDate);

    getRevenueByDay(formattedStartDate, formattedEndDate);
});

function formatDate(date) {
    var year = date.getFullYear();
    var month = ("0" + (date.getMonth() + 1)).slice(-2);
    var day = ("0" + date.getDate()).slice(-2);

    return year + "-" + month + "-" + day;
}

});
