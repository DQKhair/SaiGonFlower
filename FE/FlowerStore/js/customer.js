$(document).ready(function () {
    $.ajax({
        url: 'https://localhost:7126/api/Customers', // Đường dẫn đến API của bạn
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            // Xóa dữ liệu cũ trong bảng
            $('#customerTable tbody').empty();

            // Lặp qua danh sách khách hàng và thêm chúng vào bảng
            $.each(data, function (index, customer) {
                $('#customerTable tbody').append('<tr>' +
                    '<td>' + customer.customerId + '</td>' +
                    '<td>' + customer.customerName + '</td>' +
                    '<td>' + customer.customerEmail + '</td>' +
                    '</tr>');
            });
        },
        error: function () {
            // Xử lý lỗi nếu có
            console.error('Lỗi khi lấy dữ liệu từ API');
        }
    });
});