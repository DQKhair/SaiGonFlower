$(document).ready(()=>{

    // Begin Call func
    DisplayCheckout()
    reFreshDisplay()
    //End call Func 

    function DisplayCheckout()
    {
        const dataLocalStorage = localStorage.getItem("userCheckout");
        const userData = JSON.parse(dataLocalStorage);
        console.log("DataUer"+userData);

        const valueMethod = parseInt(userData.methodPayNonAccount);

        $("#nameInfCus").text(userData.customerNameNonAccount);
        $("#phoneInfCus").text(userData.customerPhoneNonAccount);
        $("#addressInfCus").text(userData.customerAddressNonAccount);
        $("#actionChangeInfo").click(()=>{
        
        })
        $("#methodPay").text(valueMethod==1? "Thanh toán khi nhận hàng" : "Thanh toán VNPay")
        $("#totalMoneyCheckout").text(`${userData.totalMoney.toLocaleString("vi-VN")} VNĐ`);
        $("#totalMoneyPayCheckout").text(`${(parseInt(userData.totalMoney) - 32000).toLocaleString("vi-VN")} VNĐ`);
    }

    function reFreshDisplay()
    {
        $("#tableCartCheckout").empty();

        let retrievedObject = localStorage.getItem("cart");
        let parsedObject = JSON.parse(retrievedObject);

        
        if (retrievedObject === '{}' || retrievedObject == null || retrievedObject === null || retrievedObject == '{}') {
            $("#cover_cartContent").empty();

            const h5Empty = $("<h5></h5>").text("Hiện không có sản phẩm vui lòng mua sản phẩm").attr("style","color: red; text-align: center");

            console.log("cart is empty");

            $("#cover_cartContent").append(h5Empty);

            $("#totalItemCart").text("0");
        }

        $.each(parsedObject,(index,product)=>{
            console.log(index,product);
            const productId = index;

            const div_container_cartItem = $("<div></div>").addClass("container_cartItem");
                const div_cart_product = $("<div><div>").addClass("cart_product");
                    const div_cartItem_productName = $("<div></div>").addClass("cartItem_productName");
                        const p_cartItem_productName = $("<p></p>").text(product.productName);
                    const div_cartItem_img = $("<div></div>").addClass("cartItem_img");
                        const img_cartItem_img = $("<img />").attr({"src":"https://localhost:7126"+product.image1,"alt":"hình ảnh sản phẩm trong giỏ hàng"});
                const div_cart_productPrice = $("<div></div>").addClass("cart_productPrice");
                    const p_cart_productPrice = $("<p></p>").text(product.Price.toLocaleString("vi-VN") + " VNĐ");
                const div_cart_productQuantity = $("<div></div>").addClass("cart_productQuantity");
                    const input_quantity = $("<input />").attr({"value": product.quantity,"type": "number","min":"1","max":"10","style": "width: 30%;text-align: center","readonly":"true"});
                const div_cart_productTotalMoney = $("<div></div>").addClass("cart_productTotalMoney");
                    const p_MoneyTotal = $("<p></p>").text(`${(product.quantity * product.Price).toLocaleString("vi-VN")} VNĐ`).attr("style","color:red;font-weight: 900").addClass("p_moneyTotal");
                const br = $("<br/>");
                div_cart_productTotalMoney.append(p_MoneyTotal);
                div_cart_productQuantity.append(input_quantity);
                div_cart_productPrice.append(p_cart_productPrice);
                div_cartItem_img.append(img_cartItem_img);
                div_cartItem_productName.append(p_cartItem_productName);
                div_cart_product.append(div_cartItem_img,div_cartItem_productName);
                div_container_cartItem.append(div_cart_product,div_cart_productPrice,div_cart_productQuantity,div_cart_productTotalMoney);
                $("#tableCartCheckout").append(div_container_cartItem,br);
                
        })

    }

})