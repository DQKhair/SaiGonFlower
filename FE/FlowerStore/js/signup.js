$(document).ready(function() {
    $('#registerButton').on('click', function() {
        var customerData = {
            CustomerName: $('#CustomerName').val(),
            CustomerPhone: $('#CustomerPhone').val(),
            CustomerUserName: $('#CustomerUserName').val(),
            CustomerPassword: $('#CustomerPassword').val()
        };

        $.ajax({
            url: 'https://localhost:7126/api/Customers', // Điều chỉnh URL dựa trên đường dẫn của API của bạn
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(customerData),
            success: function(data) {
                alert('Đăng ký thành công!');
                window.location.href = '/login.html'; // Điều chỉnh URL theo đường dẫn thực tế của trang đăng nhập
            },
            error: function(xhr, status, error) {
                var errorMessage = xhr.responseText;
                alert('Lỗi đăng ký: ' + errorMessage);
            }
        });
    });
});