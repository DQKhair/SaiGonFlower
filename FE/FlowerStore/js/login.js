function parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(atob(base64));
}
var globalUserName;

$(document).ready(function () {
    $('#loginButton').on('click', function () {
        var userName = $('#UserName').val();
        var password = $('#Password').val();

        $.ajax({
            url: 'https://localhost:7126/api/Login',
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify({ UserName: userName, Password: password }),

            
            success: function (data) {
                if (data.token) { // Sửa thành data.token
                    // Lưu token vào Local Storage để sử dụng sau này
                    localStorage.setItem('token', data.token);

                    // Giải mã JWT để trích xuất vai trò
                    var decodedToken = parseJwt(data.token);
                    var userRole = decodedToken.role;
                    var userName = decodedToken.name;
                    globalUserName = userName;
                    

                    // Kiểm tra vai trò và điều hướng người dùng tương ứng
                    if (userRole === "Company" || userRole === "Store") {
                        // Chuyển hướng người dùng đến trang Company
                        window.location.href = './Admin/index.html'; // Điều chỉnh URL tương ứng
                    } else if (userRole === "Customer") {
                        // Chuyển hướng người dùng đến trang Customer
                        window.location.href = './index.html'; // Điều chỉnh URL tương ứng
                    } else {
                        alert('Vai trò không hợp lệ.');
                    }
                } else {
                    alert('Lỗi đăng nhập: Không có token được trả về.');
                }
            },
            error: function (xhr, status, error) {
                console.log(xhr);
                alert('Lỗi đăng nhập: ' + error);
            }
        });
    });
});

//logout
$("#logout").click(()=>{
    alert("logout");
    localStorage.removeItem('token');
})
//end logout