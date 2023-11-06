$(document).ready(()=>{
    const containerCardVoucher = $("#containerCardVoucher");

    function displayVoucherList()
    {
        containerCardVoucher.empty();
        $.get("https://localhost:7126/api/Vouchers",(data)=>{
    
        $.each(data, (index,voucher)=>{
            
            const divCardVoucher = $("<div></div>").addClass("cardVoucher");
                const divImgVoucher = $("<div></div>").addClass("imgVoucher");
                    const imgVoucher = $("<img />").attr({"src":"https://www.insparations.com.au/wp-content/uploads/2021/03/gift-img.jpg","alt":"ảnh voucher"});
                const divContentVoucher = $("<div></div>").addClass("contentVoucher");
                    const divNameVoucher = $("<div></div>").addClass("nameVoucher").text(`${voucher.voucherName}`);
                    const divPointVoucher = $("<div></div>").addClass("pointVoucher").text(`Point: ${voucher.voucherPoint} pts`);
                const divBtnVoucher = $("<div></div>").addClass("btnVoucher");
                    const btnVoucher = $("<button></button>").text("Exchange").addClass("btnVoucher");;
            
                    // handle click btn
                    btnVoucher.click(()=>{
                        handleOnClickBtnVoucher(voucher.voucherId,voucher);
                    })
                    // end handle click btn

            divBtnVoucher.append(btnVoucher);
            divContentVoucher.append(divNameVoucher,divPointVoucher);
            divImgVoucher.append(imgVoucher);        
            divCardVoucher.append(divImgVoucher,divContentVoucher,divBtnVoucher);
            containerCardVoucher.append(divCardVoucher);
        });
        })
    }
    displayVoucherList();

    function handleOnClickBtnVoucher(voucherId,voucher)
    {
        console.log(voucherId,voucher);

        const token = localStorage.getItem('token');
        
        
        if(token == null || token == '{}')
        {
            alert('Vui lòng đăng nhập để có thể đổi')
        }
        else 
        {
            const decodedToken = parseJwt(token);
            console.log(decodedToken)

            const role = decodedToken.role;
            const userId = decodedToken.UserId;

            if(role == "Customer")
            {

                $.get("https://localhost:7126/api/Customers/"+userId,(data)=>{
                        if(data.customerPoint < voucher.voucherPoint)
                        {
                            alert("Không đủ điểm")
                        }
                        if(data.customerPoint >= voucher.voucherPoint)
                        {
                            console.log("data user:"+data.customerPoint);
                            handlePointChange(voucher,data);
                        }
                })

            }else
            {
                alert("Bạn không có quyền");
            }


        }
    }
    function handlePointChange(voucherData,customerData)
    {
        const handleMinus = parseInt(customerData.customerPoint) - parseInt(voucherData.voucherPoint);
        console.log(handleMinus)
        const data = {"customerPoint": handleMinus}
        $.ajax({
            type: "PUT",
            url: "https://localhost:7126/api/Customers/ChangePoint/"+customerData.customerId,
            contentType: "application/json",
            dataType: "json",
            data: JSON.stringify(data),
            success: (data)=>{
                console.log(data)
                console.log(voucherData,customerData);

                handleFunctionDetailVoucher(voucherData,customerData)
            },
            error: (error)=>{
                console.error("Lỗi đổi điểm",error);
            }
        })
    }

    function handleFunctionDetailVoucher(voucherData,customerData)
    {
        $.get(`https://localhost:7126/api/DetailVouchers/${voucherData.voucherId}/${customerData.customerId}`,(data)=>{

                if(data == null)
                {
                    handleAddDetailVoucher(voucherData,customerData);
                }else
                {
                    handleUpdateDetailVoucher(voucherData,customerData,data.quantity);
                }
            
        })
    }

    function handleUpdateDetailVoucher(voucherData,customerData,quantityDetail)
    {
        const quantityVoucher = parseInt(quantityDetail) + 1;
        const data = {"quantity": quantityVoucher}
        $.ajax({
            type: "PUT",
            url: `https://localhost:7126/api/DetailVouchers/${voucherData.voucherId}/${customerData.customerId}`,
            contentType: "application/json",
            dataType: "json",
            data: JSON.stringify(data),
            success: (data)=>{
                console.log(data)
                HandleMinusQuantityVoucher(voucherData.voucherId);
            },
            error: (error)=>{
                console.error("Lỗi update vào detail",error);
            }
        })
    }

    function handleAddDetailVoucher(voucherData,customerData)
    {
        const data = {"quantity": 1, "customerId": customerData.customerId,"voucherId":voucherData.voucherId}
        $.ajax({
            type: "POST",
            url: "https://localhost:7126/api/DetailVouchers",
            contentType: "application/json",
            dataType: "json",
            data: JSON.stringify(data),
            success: (data)=>{
                console.log("dữ liệu trả về khi thêm"+data)
                HandleMinusQuantityVoucher(voucherData.voucherId);
            },
            error: (error)=>{
                console.error("Lỗi thêm vào detail",error);
            }
        })
    }

    // Begin handle minus quantity voucher
    function HandleMinusQuantityVoucher(voucherId)
    {
        const dataJson = { "voucherQuantity": 1};
        $.ajax({
            type: "PUT",
            url: "https://localhost:7126/UpdateQuantityVoucher/"+voucherId,
            contentType: "application/json",
            dataType: "json",
            data: JSON.stringify(dataJson),
            success: (response)=>{
                console.log(response)
                alert("Đổi điểm thành công");
            },
            error: (error)=>{
                console.error("Lỗi trừ số lượng voucher",error);
            }
        })
    }
    // End handle minus quantity voucher

    function parseJwt(token) {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace('-', '+').replace('_', '/');
        return JSON.parse(atob(base64));
    }

})
