$(document).ready(function() {
    $('#registerButton').on('click', function() {
        var customerData = {
            CustomerName: $('#CustomerName').val(),
            CustomerPhone: $('#CustomerPhone').val(),
            CustomerUserName: $('#CustomerUserName').val(),
            CustomerPassword: $('#CustomerPassword').val()
        };

        // Validate password format
        if (!isValidPassword(customerData.CustomerPassword)) {
            alert('Password does not meet the requirements. Password must have at least 8 characters, including uppercase letters, lowercase letters, numbers and special characters.');
            return;
        }

        // Validate phone number format
        if (!isValidPhoneNumber(customerData.CustomerPhone)) {
            alert('The phone number is not in the correct format. The phone number must have 10 to 11 digits.');
            return;
        }

        $.ajax({
            url: 'https://localhost:7126/api/Customers', // Điều chỉnh URL dựa trên đường dẫn của API của bạn
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(customerData),
            success: function(data) {
                alert('Sign Up Success!');
                window.location.href = '/login.html'; // Điều chỉnh URL theo đường dẫn thực tế của trang đăng nhập
            },
            error: function(xhr, status, error) {
                var errorMessage = xhr.responseText;
                alert('Registration error: ' + errorMessage);
            }
        });
    });
    // Function to validate password format
    function isValidPassword(password) {
        // Use a regular expression to check the password format
        var passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return passwordRegex.test(password);
    }

    //Function to validate phone number format
    function isValidPhoneNumber(phoneNumber) {
        // Remove non-numeric characters from the string
        var numericPhoneNumber = phoneNumber.replace(/\D/g, '');

        // Check if the numeric phone number has a length between 10 and 11
        return numericPhoneNumber.length >= 10 && numericPhoneNumber.length <= 11;
    }
});