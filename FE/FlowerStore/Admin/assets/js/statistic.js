//lấy bảng
$(document).ready(function () {
    // Lấy dữ liệu từ API
    $.get("https://localhost:7126/api/CountIndexes/full", function (data) {
        var countData = data; // Đảm bảo dữ liệu trả về từ API phù hợp với định dạng bạn cần
        console.log(countData);
        // Tạo mảng chứa các tháng
        var labels = [];
        // Tạo mảng chứa số liệu tương ứng với mỗi tháng
        var dataValues = [];
  
        for (var i = 0; i < countData.length; i++) {
            var date = new Date(countData[i].date);
            var month = date.getMonth() + 1; // Sử dụng getMonth() và cộng thêm 1 vì tháng bắt đầu từ 0
            var year = date.getFullYear();
            var label = month + " - " + year; // Kết hợp tháng và năm
            labels.push(label);
            dataValues.push(countData[i].countMonth); 
            // Thay thế bằng trường Date trong dữ liệu của bạn
        }
        
        // Vẽ biểu đồ cột bằng Chart.js
        var ctx = document.getElementById('myChart').getContext('2d');
        var chart = new Chart(ctx, {
            type: 'bar',
            
            data: {
                
                labels: labels,
                datasets: [{
                    label: 'Số lượng truy cập',
                    data: dataValues,
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgb(54, 162, 235)',
                    Path2D,
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                        suggestedMax: Math.max(...dataValues)+5,
                    }
                }
            }
        });
    });
  });
  
  // tổng truy cập
  $(document).ready(() => {
  
    $.ajax({
      url: "https://localhost:7126/api/CountIndexes", // Thay đổi URL của API của bạn
      type: "GET",
      success: function (data) {
          if (data === null) {
              // Xử lý trường hợp không có dữ liệu
              $("#totalCountMonth").text("Không có dữ liệu để tính tổng.");
          } else {
              // Hiển thị tổng lên trang HTML
              $("#totalCountMonth").text("Tổng lượt truy cập: " + data);
          }
      },
      error: function (error) {
          console.error("Lỗi khi gọi API: " + error);
      }
  });
  });