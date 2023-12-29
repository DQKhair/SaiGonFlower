$(document).ready(function () {
    function reFreshDisplay() {
        // Replace 'YOUR_API_URL' with the actual URL of your API endpoint
        var apiUrl = 'https://localhost:7126/api/Customers';

        // Gọi API để lấy danh sách khách hàng
        $.get(apiUrl, function (data) {
            // Xử lý dữ liệu trả về từ API
            displayCustomers(data);
        })
        .fail(function () {
            // Xử lý trường hợp lỗi
            $('#customerTable').html('<tr><td colspan="8">Không thể tải danh sách khách hàng.</td></tr>');
        });


        // Hàm hiển thị danh sách khách hàng
        function displayCustomers(customers) {
            var tableHtml = '';

            // Duyệt qua từng khách hàng và tạo dòng trong bảng
            customers.forEach(function (customer) {
                tableHtml += '<tr>';
                tableHtml += '<td>' + customer.customerId + '</td>';
                tableHtml += '<td>' + customer.customerName + '</td>';
                tableHtml += '<td>' + customer.customerPhone + '</td>';
                tableHtml += '<td>' + customer.customerAddress + '</td>';
                if(customer.customerStatus == "1"){
                    tableHtml += '<td>' + 'Đang hoạt động' + '</td>';
                }else{
                    tableHtml += '<td>' + 'Tạm dừng hoạt động' + '</td>';
                }
                tableHtml += '<td>' + customer.customerPoint + '</td>';
                tableHtml += '<td>' + customer.customerUserName + '</td>';
                tableHtml += '<td><button class="btn btn-outline-primary mx-3" data-bs-toggle="modal" data-bs-target="#ModalEditVoucher" data-customerid="' + customer.customerId + '">Sửa</button></td>';
                tableHtml += '<td><button class="btn btn-outline-primary mx-3" data-bs-toggle="modal" data-bs-target="#ModalEditVoucher1" data-customerid="' + customer.customerId + '">Sửa pass</button></td>';
                
                tableHtml += '</tr>';

            
            });

            
            

            // Hiển thị bảng trong phần tử có id 'customerTable'
            $('#customerTable').html(tableHtml);


        }
    }
    reFreshDisplay();

//thêm
$('#add_voucher').on('click', function () {
    var apiUrl = 'https://localhost:7126/api/Customers';

    
        // Get form data
        var formData = {
            customerName: $('#customerName').val(),
            customerPhone: $('#customerPhone').val(),
            customerAddress: $('#customerAddress').val(),
            customerUserName: $('#customerUserName1').val(),
            customerPassword: $('#customerPassword1').val()
        };

        // Make the AJAX request to add the customer
        $.ajax({
            url: apiUrl,
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(formData),
            success: function (data) {
                // Handle success, for example, show a success message
                alert('Khách hàng đã được thêm thành công:', data);
                reFreshDisplay();
            },
            error: function (error) {
                // Handle error, for example, show an error message
                alert('Lỗi khi thêm khách hàng:', error.responseText);
            }
        });
    
});

    // sửa

    // Xử lý sự kiện khi nút "Sửa" được nhấp
    $(document).on('click', '[data-customerid]', function () {
        // Lấy customer ID từ thuộc tính data-customerid
        var customerId = $(this).data('customerid');

        // Gọi API để lấy thông tin khách hàng dựa trên customerId (nếu cần)
        // Sau đó, điền thông tin khách hàng vào form sửa

        // Ví dụ gọi API bằng jQuery AJAX
        $.ajax({
            url: 'https://localhost:7126/api/Customers/' + customerId, // Thay đổi đúng đường dẫn tới API của bạn
            type: 'GET',
            success: function (data) {
                // Điền thông tin khách hàng vào form sửa
                $('#customerName2').val(data.customerName);
                $('#customerPhone2').val(data.customerPhone);
                $('#customerAddress2').val(data.customerAddress);

                // Lưu customerId để sử dụng khi nhấn nút "Lưu"
                $('#Edit_voucher').data('customerid', customerId);
            },
            error: function () {
                // Xử lý lỗi khi gọi API
                alert('Failed to fetch customer information');
            }
        });
    });

    // Xử lý sự kiện khi nút "Lưu" được nhấp
    $('#Edit_voucher').on('click', function () {
        // Lấy customerId từ data-customerid đã lưu trước đó
        var customerId = $(this).data('customerid');

        // Lấy thông tin từ form sửa
        var customerName = $('#customerName2').val();
        var customerPhone = $('#customerPhone2').val();
        var customerAddress = $('#customerAddress2').val();

        // Gọi API để cập nhật thông tin khách hàng
        $.ajax({
            url: 'https://localhost:7126/api/Customers/' + customerId, // Thay đổi đúng đường dẫn tới API của bạn
            type: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify({
                customerName: customerName,
                customerPhone: customerPhone,
                customerAddress: customerAddress
            }),
            success: function () {
                // Xử lý khi cập nhật thành công (có thể làm refresh hoặc hiển thị thông báo)
                alert('Customer information updated successfully');
                reFreshDisplay();
            },
            error: function () {
                // Xử lý lỗi khi gọi API
                alert('Failed to update customer information');
            }
        });
    });

    // pass

    $(document).on('click', '[data-customerid]', function () {
        // Lấy customer ID từ thuộc tính data-customerid
        var customerId = $(this).data('customerid');

        // Lưu customerId để sử dụng khi nhấn nút "Lưu"
        $('#Edit_voucher1').data('customerid', customerId);
    });

    // Xử lý sự kiện khi nút "Lưu" được nhấp
    $('#Edit_voucher1').on('click', function () {
        // Lấy customerId từ data-customerid đã lưu trước đó
        var customerId = $(this).data('customerid');
        const dataJson = {};
        $.ajax({
            type: "PUT",
            url: "https://localhost:7126/api/Customers/ResetPasswordCustomer/"+customerId,
            contentType: "application/json",
            dataType: "json",
            data:JSON.stringify(dataJson),
            success: (response)=>{
                console.log(response);
                //alert(`Mật khẩu cửa hàng ${storeId} và tên là ${storeName} đã được khôi phục với mật khẩu là: sgf@123`)
                alert(`Khách hàng đã khôi phục lại mật khẩu: kh@123`)
                reFreshDisplay();

            },
            error: (error)=>{
                console.error("Khôi phục mật khẩu thất bại",error);
            }
        })
    });
});