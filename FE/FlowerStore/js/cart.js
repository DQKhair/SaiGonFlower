$(document).ready(()=>{

    //Begin add product vào local storage
    
    $("#btn_addToCart").click(()=>{
        //get id
        const url = new URL(window.location.href);
        const id = url.searchParams.get('id');
        let quantity = $("#quantity_cart_item").val();

        console.log(typeof(quantity))

        $.get("https://localhost:7126/api/Products/"+id,(data)=>{
            console.log(data);
            
            var retrievedObject = localStorage.getItem("cart");
            var parsedObject = JSON.parse(retrievedObject);
            var productId = data.productId;
            

            if(!parsedObject)
            {
                var dataLocalStorage = { [productId]: { productName: data.productName, Price: data.price, image1: data.image1, categoryId: data.categoryId, quantity: quantity } };
                var jsonString = JSON.stringify(dataLocalStorage);
                localStorage.setItem("cart", jsonString);
            }

            if(parsedObject.hasOwnProperty(productId))
            {
                console.log(typeof(parsedObject[productId].quantity ))
                
                let quantityExists = parseInt(parsedObject[productId].quantity) + parseInt(quantity)

                console.log(quantityExists);

                parsedObject[productId] = { productName: data.productName, Price: data.price, image1: data.image1, categoryId: data.categoryId, quantity: quantityExists };

            }else
            {
                parsedObject[productId] = { productName: data.productName, Price: data.price, image1: data.image1, categoryId: data.categoryId, quantity: quantity };
            }
            var jsonString = JSON.stringify(parsedObject);
            localStorage.setItem("cart", jsonString);
            alert("Thêm thành công sản phẩm "+ data.productName);
            reFreshDisplay()
        })
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
                div_cartItem_img.append(img_cartItem_img);
                div_cartItem_productName.append(p_cartItem_productName);
                div_cart_product.append(div_cartItem_img,div_cartItem_productName);
                div_container_cartItem.append(div_cart_product,div_cart_productPrice,div_cart_productQuantity,div_cart_productTotalMoney,div_cart_productAction);
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

                //Show Total Pay
                TotalMoneyPay.text(`Tổng tiền đơn hàng: ${totalMoneyMethodPay.toLocaleString("vi-VN")} VNĐ`).attr("style","color:red");
                TotalQuantityPay.text(`Tổng thanh toán ( ${countQuantityItemCart} sản phẩm )`);
                
            })

    }
    reFreshDisplay();
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

    
})