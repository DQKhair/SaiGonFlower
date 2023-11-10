$(document).ready(()=>{

    // Begin Call func
    DisplayCheckout()
    reFreshDisplay()
    HandleSubmitOrder()
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
        $("#codeVoucher_p").text(`Mã: 0${userData.codeVoucher}`)
        $("#methodPay").text(valueMethod==1? "Thanh toán khi nhận hàng" : "Thanh toán VNPay")
        $("#totalMoneyCheckout").text(`${userData.totalMoney.toLocaleString("vi-VN")} VNĐ`);
        $("#ValueVoucher").text(`${(userData.valueVoucher).toLocaleString("vi-VN")} VNĐ`)
        $("#totalMoneyPayCheckout").text(`${(parseInt(userData.totalMoney) - 32000 - parseInt(userData.valueVoucher)).toLocaleString("vi-VN")} VNĐ`);
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

    // Handle Submit order
    function HandleSubmitOrder()
    {
        const token = localStorage.getItem('token');
        const dataLocalStorage = localStorage.getItem("userCheckout");
        const userData = JSON.parse(dataLocalStorage);
        const typePayments = parseInt(userData.methodPayNonAccount);
        
        if(typePayments == 1)
        {
            $("#listTypePayment").remove();
        }
        $("#SubmitOrder").click(()=>{
            
            if(typePayments == 1)
            {
                if(token == null || token == {})
                {
                    HandlePostNonAccount();
                }else
                {
                    HandlePostIsAccount(token);
                }
            }else if(typePayments == 2)
            {
                const typePayment = $("input[name='typePayments']:checked").val();
                const typeLanguage = $("input[name='typeLanguage']:checked").val();
                if(token == null || token == {})
                {
                    HandlePostPaymentNonAccount(typePayment,typeLanguage);
                }else
                {
                    HandlePostPaymentIsAccount(token,typePayment,typeLanguage);
                }
                
            }else
            {
                alert("Phương thức thanh toán không hợp lệ")
            }
           
        })
    }
    // end handle submit order

    // Begin Payment
    function HandlePostPaymentNonAccount(typePayment,typeLanguage)
    {
        const dataLocalStorage = localStorage.getItem("userCheckout");
                const userData = JSON.parse(dataLocalStorage);
                
                const totalMoneyPayCheckoutNotMatch = $("#totalMoneyPayCheckout").text();
                const totalMoneyPayCheckout = MatchesMethod(totalMoneyPayCheckoutNotMatch);

                console.log(userData)
                const dataJson = {
                    "totalQuantity":userData.totalQuantity,
                    "totalPrice": totalMoneyPayCheckout,
                    "nameCusNonAccount": userData.customerNameNonAccount,
                    "phoneCusNonAccount": userData.customerPhoneNonAccount,
                    "addressCusNonAccount": userData.customerAddressNonAccount,
                    "customerId": null,
                    "orderMethodId": userData.methodPayNonAccount
                };
                
                createOrder();
                async function createOrder()
                {
                    try
                    {
                        const response1 = await $.ajax({
                            type:"POST",
                            url:"https://localhost:7126/api/Orders/PostOrderForCus",
                            contentType: "application/json",
                            dataType:"json",
                            data: JSON.stringify(dataJson)
                        });

                        const orderId = response1.orderId;
                        // add localstorage
                        localStorage.setItem("orderId",JSON.stringify({"orderId":orderId}));
                        // end add localstorage
                        let retrievedObject = localStorage.getItem("cart");
                        let parsedObject = JSON.parse(retrievedObject);

                        let listCartItem = [];
                        $.each(parsedObject,(index,cartItem)=>{
                            var CartItem = {
                                "quantity": parseInt(cartItem.quantity),
                                "price": cartItem.Price,
                                "productId": index,
                            }
                            listCartItem.push(CartItem);
                        })
                        
                        const dataJson2 = {
                            "orderId": orderId,
                            "listCartItem": listCartItem
                         };

                        const response2 = await $.ajax({
                            type:"POST",
                            url:"https://localhost:7126/api/Orders/PostOrderDetailForCus",
                            contentType:"application/json",
                            dataType: "json",
                            data: JSON.stringify(dataJson2)
                        });
                        console.log(response2);
                        
                       const response3 =  await $.get(`https://localhost:7126/api/VnPay/GetOrderVnPay/typePayment=${typePayment}&&locale_VN=${typeLanguage}&&orderId=${orderId}`,(data)=>{})
                        
                            console.log("Address:"+response3);
                            // localStorage.removeItem('cart');
                            // localStorage.removeItem('userCheckout');
                            window.location.href = response3;
                    }catch(error)
                    {
                        console.error("Lỗi thanh toánh",error);
                    }
                }
    }
    function HandlePostPaymentIsAccount(token,typePayment,typeLanguage)
    {
        const decodedToken = parseJwt(token);
        const role = decodedToken.role;
        const userId = decodedToken.UserId;

        const dataLocalStorage = localStorage.getItem("userCheckout");
        const userData = JSON.parse(dataLocalStorage);
                
        const totalMoneyPayCheckoutNotMatch = $("#totalMoneyPayCheckout").text();
        const totalMoneyPayCheckout = MatchesMethod(totalMoneyPayCheckoutNotMatch);

        console.log(userData)
        const dataJson = {
            "totalQuantity":userData.totalQuantity,
            "totalPrice": totalMoneyPayCheckout,
            "nameCusNonAccount": userData.customerNameNonAccount,
            "phoneCusNonAccount": userData.customerPhoneNonAccount,
            "addressCusNonAccount": userData.customerAddressNonAccount,
            "customerId": userId,
            "orderMethodId": userData.methodPayNonAccount
        };

        createOrder();
                async function createOrder()
                {
                    try
                    {
                        const response1 = await $.ajax({
                            type:"POST",
                            url:"https://localhost:7126/api/Orders/PostOrderForCus",
                            contentType: "application/json",
                            dataType:"json",
                            data: JSON.stringify(dataJson)
                        });

                        const orderId = response1.orderId;
                        // add localstorage
                        localStorage.setItem("orderId",JSON.stringify({"orderId":orderId}));
                        // end add localstorage
                        let retrievedObject = localStorage.getItem("cart");
                        let parsedObject = JSON.parse(retrievedObject);

                        let listCartItem = [];
                        $.each(parsedObject,(index,cartItem)=>{
                            var CartItem = {
                                "quantity": parseInt(cartItem.quantity),
                                "price": cartItem.Price,
                                "productId": index,
                            }
                            listCartItem.push(CartItem);
                        })
                        
                        const dataJson2 = {
                            "orderId": orderId,
                            "listCartItem": listCartItem
                         };

                        const response2 = await $.ajax({
                            type:"POST",
                            url:"https://localhost:7126/api/Orders/PostOrderDetailForCus",
                            contentType:"application/json",
                            dataType: "json",
                            data: JSON.stringify(dataJson2)
                        });

                        const codeVoucher = parseInt(userData.codeVoucher);
                        console.log("codevc"+codeVoucher)
                        if(codeVoucher != null && codeVoucher != "" && codeVoucher != NaN && codeVoucher && "NaN")
                        {
                            const customerId = parseInt(userId);
                            const dataJson3 = {
                                
                             };
                            const response3 = await $.ajax({
                                type:"PUT",
                                url: `https://localhost:7126/UpdateVoucherForCus/voucherId=${codeVoucher}&&customerId=${customerId}`,
                                contentType:"application/json",
                                dataType: "json",
                                data: JSON.stringify(dataJson3)
                            });
                        }
                            console.log(response2);
                            const response4 =  await $.get(`https://localhost:7126/api/VnPay/GetOrderVnPay/typePayment=${typePayment}&&locale_VN=${typeLanguage}&&orderId=${orderId}`,(data)=>{})
                        
                            console.log("Address:"+response4);
                            window.location.href = response4;
                    }catch(error)
                    {
                        console.error("Lỗi thanh toánh",error);
                    }
                }
    }
    // End Payment

    // Begin Not Payment
    function HandlePostNonAccount()
    {
                const dataLocalStorage = localStorage.getItem("userCheckout");
                const userData = JSON.parse(dataLocalStorage);
                
                const totalMoneyPayCheckoutNotMatch = $("#totalMoneyPayCheckout").text();
                const totalMoneyPayCheckout = MatchesMethod(totalMoneyPayCheckoutNotMatch);

                console.log(userData)
                const dataJson = {
                    "totalQuantity":userData.totalQuantity,
                    "totalPrice": totalMoneyPayCheckout,
                    "nameCusNonAccount": userData.customerNameNonAccount,
                    "phoneCusNonAccount": userData.customerPhoneNonAccount,
                    "addressCusNonAccount": userData.customerAddressNonAccount,
                    "customerId": null,
                    "orderMethodId": userData.methodPayNonAccount
                };

                
                
                
                createOrder();
                async function createOrder()
                {
                    try
                    {
                        const response1 = await $.ajax({
                            type:"POST",
                            url:"https://localhost:7126/api/Orders/PostOrderForCus",
                            contentType: "application/json",
                            dataType:"json",
                            data: JSON.stringify(dataJson)
                        });

                        const orderId = response1.orderId;
                        let retrievedObject = localStorage.getItem("cart");
                        let parsedObject = JSON.parse(retrievedObject);

                        let listCartItem = [];
                        $.each(parsedObject,(index,cartItem)=>{
                            var CartItem = {
                                "quantity": parseInt(cartItem.quantity),
                                "price": cartItem.Price,
                                "productId": index,
                            }
                            listCartItem.push(CartItem);
                        })
                        
                        const dataJson2 = {
                            "orderId": orderId,
                            "listCartItem": listCartItem
                         };

                        const response2 = await $.ajax({
                            type:"POST",
                            url:"https://localhost:7126/api/Orders/PostOrderDetailForCus",
                            contentType:"application/json",
                            dataType: "json",
                            data: JSON.stringify(dataJson2)
                        });
                            console.log(response2);
                            alert("Đặt hàng thành công");
                            localStorage.removeItem('cart');
                            localStorage.removeItem('userCheckout');
                            window.location.href="../checkoutSuccess.html";
                    }catch(error)
                    {
                        console.error("Lỗi thanh toánh",error);
                    }
                }
    }

    function HandlePostIsAccount(token)
    {
        const decodedToken = parseJwt(token);
        const role = decodedToken.role;
        const userId = decodedToken.UserId;

        const dataLocalStorage = localStorage.getItem("userCheckout");
        const userData = JSON.parse(dataLocalStorage);
                
        const totalMoneyPayCheckoutNotMatch = $("#totalMoneyPayCheckout").text();
        const totalMoneyPayCheckout = MatchesMethod(totalMoneyPayCheckoutNotMatch);

        console.log(userData)
        const dataJson = {
            "totalQuantity":userData.totalQuantity,
            "totalPrice": totalMoneyPayCheckout,
            "nameCusNonAccount": userData.customerNameNonAccount,
            "phoneCusNonAccount": userData.customerPhoneNonAccount,
            "addressCusNonAccount": userData.customerAddressNonAccount,
            "customerId": userId,
            "orderMethodId": userData.methodPayNonAccount
        };

        createOrder();
                async function createOrder()
                {
                    try
                    {
                        const response1 = await $.ajax({
                            type:"POST",
                            url:"https://localhost:7126/api/Orders/PostOrderForCus",
                            contentType: "application/json",
                            dataType:"json",
                            data: JSON.stringify(dataJson)
                        });

                        const orderId = response1.orderId;
                        let retrievedObject = localStorage.getItem("cart");
                        let parsedObject = JSON.parse(retrievedObject);

                        let listCartItem = [];
                        $.each(parsedObject,(index,cartItem)=>{
                            var CartItem = {
                                "quantity": parseInt(cartItem.quantity),
                                "price": cartItem.Price,
                                "productId": index,
                            }
                            listCartItem.push(CartItem);
                        })
                        
                        const dataJson2 = {
                            "orderId": orderId,
                            "listCartItem": listCartItem
                         };

                        const response2 = await $.ajax({
                            type:"POST",
                            url:"https://localhost:7126/api/Orders/PostOrderDetailForCus",
                            contentType:"application/json",
                            dataType: "json",
                            data: JSON.stringify(dataJson2)
                        });

                        const codeVoucher = parseInt(userData.codeVoucher);
                        console.log("codevc"+codeVoucher)
                        if(codeVoucher != null && codeVoucher != "" && codeVoucher != NaN && codeVoucher && "NaN")
                        {
                            const customerId = parseInt(userId);
                            const dataJson3 = {
                                
                             };
                            const response3 = await $.ajax({
                                type:"PUT",
                                url: `https://localhost:7126/UpdateVoucherForCus/voucherId=${codeVoucher}&&customerId=${customerId}`,
                                contentType:"application/json",
                                dataType: "json",
                                data: JSON.stringify(dataJson3)
                            });
                        }
                            console.log(response2);
                            alert("Đặt hàng thành công");
                            localStorage.removeItem('cart');
                            localStorage.removeItem('userCheckout');
                            window.location.href="../checkoutSuccess.html";
                    }catch(error)
                    {
                        console.error("Lỗi thanh toánh",error);
                    }
                }
    }
    // End Not Payment

    function parseJwt(token) {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace('-', '+').replace('_', '/');
        return JSON.parse(atob(base64));
    }

    function MatchesMethod(valueMatch)
    {
        // Sử dụng biểu thức chính quy để tìm số trong chuỗi
        const matches = valueMatch.match(/\d{1,3}(?:\.\d{3})*(?:,\d+)?/);

            // Lấy số từ kết quả tìm được và chuyển đổi thành số
            // Loại bỏ dấu chấm ngăn cách và thay thế dấu phẩy bằng dấu chấm
        const valueReturn = parseFloat(matches[0].replace(/\./g, '').replace(',', '.')); 
        return parseInt(valueReturn);
    }

})