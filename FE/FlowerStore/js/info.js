
    // Handle if login
    if(localStorage.getItem("token") != null){
        var token = localStorage.getItem("token");
        var decodedToken = parseJwt(token);
        var userRole = decodedToken.role;
        var userId = decodedToken.UserId;
        if(userRole == "Company" || userRole == "Store"){
            window.location.href="./Admin/index.html"
        }
        else{
            $('#btnLogin').attr('id','btnAccount').text('Account');
            $('#btnSignup').attr('id','btnLogout').text('Logout');
            $('#btnAccount').attr('href','./info.html');
            $('#btnLogout').attr('href','./login.html');
            $('.profile-icon').click(e => {
                $('#info-block').slideToggle(200);
            })

            $('#btnLogout').click(e => {
                localStorage.removeItem('token');
            })
        }
    }
    // Handle if not login
    else{
        $('.profile-icon').click(e => {
            $('#info-block').slideToggle();
        })
    }

    function parseJwt(token) {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace('-', '+').replace('_', '/');
        return JSON.parse(atob(base64));
    }



    
