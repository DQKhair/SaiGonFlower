$(document).ready(()=>{
    const token = localStorage.getItem("token");
    const decodedToken = parseJwt(token);
    const userRole = decodedToken.role;
    const userId = parseInt(decodedToken.UserId);
    console.log("Token send: "+userId,userRole)

    if(userRole == "Store")
    {

        $.get("https://localhost:7126/api/Stores/GetProfileStore/"+userId,(res)=>{

            $("#idProfileDetail").text(res.storeId)
            $("#nameProfileDetail").text(res.storeName)
            $("#phoneProfileDetail").text(res.storePhone)
            $("#addressProfileDetail").text(`${res.storeStreet} ${res.storeWard} ${res.storeDistrict}`)
            $("#usernameProfileDetail").text(res.storeUserName)
        })

    }else if(userRole == "Company")
    {

    }


    function parseJwt(token) {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace('-', '+').replace('_', '/');
        return JSON.parse(atob(base64));1
    }
})