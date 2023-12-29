$(document).ready(()=>{

    // Begin call Func
    reFreshDisplay();
    ClickBtnCheckOut();
    HandleClickShowAndHide()
    // End call Func

    //Begin add product vào local storage
    
    $("#btn_addToCart").click(()=>{
        //get id
        const url = new URL(window.location.href);
        const id = url.searchParams.get('id');
        let quantity = $("#quantity_cart_item").val();
        const selectValue = $("#SelectStoreName").val();
        if(selectValue == "" || selectValue == null || selectValue == undefined || selectValue == "undefined")
        {
            alert("Vui lòng chọn cửa hàng");
        }else
        {
            $.get("https://localhost:7126/api/Products/"+id,(data)=>{
                console.log(data);
                
                var retrievedObject = localStorage.getItem("cart");
                
                var parsedObject = JSON.parse(retrievedObject);
                var productId = data.productId;
                
    
                if(retrievedObject == null || retrievedObject == undefined || retrievedObject == "null" || retrievedObject == "undefined")
                {
                    var dataLocalStorage = { [productId]: { productName: data.productName, Price: data.price, image1: data.image1, categoryId: data.categoryId, quantity: quantity,storeId: selectValue } };
                    var jsonString = JSON.stringify(dataLocalStorage);
                    localStorage.setItem("cart", jsonString);
                    alert("Thêm thành công sản phẩm "+ data.productName);
                }else
                {
    
                    if(parsedObject && parsedObject.hasOwnProperty(productId))
                    {
                        console.log(typeof(parsedObject[productId].quantity ))
                        
                        let quantityExists = parseInt(parsedObject[productId].quantity) + parseInt(quantity)
        
                        console.log(quantityExists);
        
                        parsedObject[productId] = { productName: data.productName, Price: data.price, image1: data.image1, categoryId: data.categoryId, quantity: quantityExists,storeId: selectValue };
        
                    }else
                    { 
                        parsedObject[productId] = { productName: data.productName, Price: data.price, image1: data.image1, categoryId: data.categoryId, quantity: quantity,storeId: selectValue };
                    }
                    var jsonString = JSON.stringify(parsedObject);
                    localStorage.setItem("cart", jsonString);
                    alert("Thêm thành công sản phẩm "+ data.productName);
                    reFreshDisplay()
                }
                
            })
        }

    })

    //End add product vào local storage

    //Begin show cart

    function reFreshDisplay()
    {
        $("#tableCart").empty();

        let retrievedObject = localStorage.getItem("cart");
        let parsedObject = JSON.parse(retrievedObject);

        var countQuantityItemCart = 0;
        var totalMoneyMethodPay = 0;

        //Show Total Pay
        let TotalMoneyPay = $("#TotalMoneyPay");
        let TotalQuantityPay = $("#TotalQuantityPay");

        console.log(retrievedObject,parsedObject)
        
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
                    const div_cartItem_storeId = $("<div></div>").addClass("cartItem_storeId")
                        const p_cartItem_storeId = $("<p></p>").text(product.storeId)
                const div_cart_productPrice = $("<div></div>").addClass("cart_productPrice");
                    const p_cart_productPrice = $("<p></p>").text(product.Price.toLocaleString("vi-VN") + " VNĐ");
                const div_cart_productQuantity = $("<div></div>").addClass("cart_productQuantity");
                    const input_quantity = $("<input />").attr({"value": product.quantity,"type": "number","min":"1","max":"10","style": "width: 30%;text-align: center"});
                const div_cart_productTotalMoney = $("<div></div>").addClass("cart_productTotalMoney");
                    const p_MoneyTotal = $("<p></p>").text(`${(product.quantity * product.Price).toLocaleString("vi-VN")} VNĐ`).attr("style","color:red;font-weight: 900").addClass("p_moneyTotal");
                const div_cart_productAction = $("<div></div>").addClass("cart_productAction");
                    const i_icon = $("<i></i>").addClass("fa-solid fa-trash-can").attr("id","icon_trash").attr("onmouseover","this.style.color='#9a2b41'").attr("onmouseout","this.style.color='#000'");
                const br = $("<br/>");
                div_cart_productAction.append(i_icon);
                div_cart_productTotalMoney.append(p_MoneyTotal);
                div_cart_productQuantity.append(input_quantity);
                div_cart_productPrice.append(p_cart_productPrice);
                div_cartItem_storeId.append(p_cartItem_storeId);
                div_cartItem_img.append(img_cartItem_img);
                div_cartItem_productName.append(p_cartItem_productName);
                div_cart_product.append(div_cartItem_img,div_cartItem_productName);
                div_container_cartItem.append(div_cart_product,div_cartItem_storeId,div_cart_productPrice,div_cart_productQuantity,div_cart_productTotalMoney,div_cart_productAction);
                $("#tableCart").append(div_container_cartItem,br);
                
                //handle update giá trị
                input_quantity.on("input", function () {
                    let quantity_ss = parseInt($(this).val());
                    if(quantity_ss<=10 && quantity_ss >0)
                    {
    
                        parsedObject[productId].quantity = quantity_ss;

                        console.log( parsedObject[productId].quantity )
    
                        let jsonString = JSON.stringify(parsedObject);
    
                        localStorage.setItem("cart", jsonString);
                        reFreshDisplay();
                    }
                    if(quantity_ss > 99 || quantity_ss < 0)
                    {
                        input_quantity.attr({"readonly":"true","value":"1"})
                        p_MoneyTotal.text("Muốn gian lận à cưng ^_^")
                    }
                });
               
                i_icon.click(()=>{
                    deleteCart(productId);
                })
        })

            $.each(parsedObject,(index,product)=>{

                $("#totalItemCart").text("");
                TotalQuantityPay.text("");

                
                totalMoneyMethodPay += parseInt(product.quantity * product.Price);
                //Begin handle all quantity item cart
                countQuantityItemCart+= parseInt(product.quantity);
                console.log("quantity all: "+countQuantityItemCart);
                console.log("total money: ")

                $("#totalItemCart").text(countQuantityItemCart);

                //End handle all quantity item cart

                
                
            })
            //Show Total Pay

            TotalMoneyPay.text(`Total amount of the order: ${(totalMoneyMethodPay).toLocaleString("vi-VN")} VNĐ`).attr("style","color:red");
            TotalQuantityPay.text(`Total number of payment orders ( ${countQuantityItemCart} Product )`);

    }

    //End show cart

    //Begin delete item cart
    function deleteCart(productId)
    {

        let retrievedObject = localStorage.getItem("cart");
        let parsedObject = JSON.parse(retrievedObject);
        if(parsedObject[productId])
        {
            delete parsedObject[productId];

            // cập nhật
            localStorage.setItem("cart", JSON.stringify(parsedObject));

            // gọi lại danh sách
            reFreshDisplay();
        }

    }
    //End delete item cart

  
        // click btn checkout
        function ClickBtnCheckOut()
        {
            $("#btnLoadCheckOut").click((e)=>{
               
                e.preventDefault();

                let retrievedObject = localStorage.getItem("cart");
                let parsedObject = JSON.parse(retrievedObject);
                const checkStoreId = [];
                var valueStoreId = 0;
                
                $.each(parsedObject,(index,cartItem)=>{
                        checkStoreId.push(parseInt(cartItem.storeId))
                })
                const firstValue = checkStoreId[0];
                let allSame = true;
                for (let i = 1; i < checkStoreId.length; i++) {
                    if (checkStoreId[i] !== firstValue) {
                        allSame = false;
                        break;
                    }
                }
                
                if (allSame) {
                    valueStoreId = parseInt(checkStoreId[0]);

                    //Begin add vào localStorage
                    const nameCus = $("#inputName").val();
                    const phoneCus = $("#inputPhoneNumber").val();
                    const addressCus = $("#inputAddress").val();
                    const methodPay = $("input[name='PaymentMethod']:checked").val();
                    const totalMoneyPay = $("#TotalMoneyPay").text();
                    const codeVoucherSpan = $("#codeVoucherSpan").text();
                    const valueVoucherNotMathch = $("#codeVoucherValue").text();
                    const valueVoucher = MatchesMethod(valueVoucherNotMathch)
                    const totalQuantityProductNotMatch = $("#TotalQuantityPay").text();
                    const totalQuantityProduct = MatchesMethod(totalQuantityProductNotMatch);
                    // Sử dụng biểu thức chính quy để tìm số trong chuỗi
                    var matches = totalMoneyPay.match(/\d{1,3}(?:\.\d{3})*(?:,\d+)?/);

                        // Lấy số từ kết quả tìm được và chuyển đổi thành số
                        // Loại bỏ dấu chấm ngăn cách và thay thế dấu phẩy bằng dấu chấm
                    var totalPrice = parseFloat(matches[0].replace(/\./g, '').replace(',', '.')); 
              
                    if(nameCus == "" || phoneCus == "" || addressCus == "")
                    {
                        $("#alert_error").text("Vui lòng điền đủ thông tin!")
                    }else
                    {
                        console.log(nameCus)
                        const dataLocalStorageUserCheckout = {
                        "customerNameNonAccount": nameCus,
                        "customerPhoneNonAccount": phoneCus,
                        "customerAddressNonAccount": addressCus,
                        "methodPayNonAccount": methodPay,
                        "totalMoney": totalPrice,
                        "codeVoucher": codeVoucherSpan,
                        "valueVoucher": valueVoucher,
                        "totalQuantity":totalQuantityProduct,
                        "storeId" : valueStoreId
                        }
                    const checkLocalStorage = localStorage.getItem("userCheckout");
                    if(checkLocalStorage == null || !checkLocalStorage)
                    {
                        dataJson = JSON.stringify(dataLocalStorageUserCheckout);
                        localStorage.setItem("userCheckout",dataJson)
                    }else
                    {
                        localStorage.removeItem("userCheckout");
                        dataJson = JSON.stringify(dataLocalStorageUserCheckout);
                        localStorage.setItem("userCheckout",dataJson)
                    }
                    //End add vào localStorage
                    window.location.href = "../checkout.html";
                    }
                } else {
                    alert("Store codes do not match");
                }
            })
        }
        // end click btn checkout

        // handle Click Show Hide
        function HandleClickShowAndHide()
        {
            const token = localStorage.getItem('token');
            
                $("#closeFormVoucher").click(()=>{
                    $(".containerFormChooseVoucher").hide();
                })
                $("#AddVoucherApply").click(()=>{

                    if(token == null || token == {})
                    {
                        alert("Bạn cần đăng nhập để có thể lấy voucher");
                    }else
                    {
                        const decodedToken = parseJwt(token);
                        const role = decodedToken.role;
                        const userId = decodedToken.UserId;
                        $(".containerFormChooseVoucher").show();
                        LoadListVoucherForCustomer(role,userId)
                        HandleApplyCodeVoucher();
                    }

                })
                
        }
        // End handle click show hide
        // load list voucher for customer
        function LoadListVoucherForCustomer(role,userId)
        {
            $("#listMyVoucher").empty();
            $.get("https://localhost:7126/api/DetailVouchers/"+userId,(data)=>{
                $.each(data,(index,detailVoucher)=>{
                    const div_cartVoucher = $("<div></div>").addClass("cartVoucher");
                        const div_imgVoucher = $("<div></div>").addClass("imgVoucher");
                            const img_imgVoucher = $("<img />").attr({"src":"https://www.insparations.com.au/wp-content/uploads/2021/03/gift-img.jpg","alt":"ảnh voucher"})
                        const div_infVoucher = $("<div></div>").addClass("infVoucher");
                            const p1_infVoucher =$("<p></p>").text(detailVoucher.voucherName);
                            const p2_infVoucher = $("<p></p>").text(`Giảm ${detailVoucher.voucherValue.toLocaleString("vi-VN")} VNĐ`);
                        const div_getCodeVoucher = $("<div></div>").addClass("getCodeVoucher");
                            const btn_btnGetCodeVoucher = $("<button></button>").addClass("btnGetCodeVoucher").text("Lấy mã");
                            
                            // handle click get code
                            btn_btnGetCodeVoucher.click(()=>{
                                HandleClickGetCodeVoucher(detailVoucher.voucherId,detailVoucher);
                            })
                            // end handle click get code

                            div_imgVoucher.append(img_imgVoucher);
                            div_infVoucher.append(p1_infVoucher,p2_infVoucher);
                            div_getCodeVoucher.append(btn_btnGetCodeVoucher);
                            div_cartVoucher.append(div_imgVoucher,div_infVoucher,div_getCodeVoucher);
                            $("#listMyVoucher").append(div_cartVoucher);
                })
            })
        }
        // end load list voucher for customer

        // get code voucher
        function HandleClickGetCodeVoucher(voucherId,voucherData){
            $("#codeVoucher").val(voucherId)
            $("#codeVoucherValue").text((voucherData.voucherValue).toLocaleString("vi-VN"));
        }
        // get code voucher

        // handle apply code voucher
        function HandleApplyCodeVoucher()
        {
            $("#btnApplyVoucher").click(()=>{
                const inputCodeVoucher = $("#codeVoucher").val();
                $("#codeVoucherSpan").text(inputCodeVoucher)
                $(".containerFormChooseVoucher").hide();
            })
        }
        // end handle apply code voucher

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