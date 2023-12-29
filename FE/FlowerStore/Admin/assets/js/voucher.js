$(document).ready(()=>{
    const voucherTable = $("#voucherTable");

    function displayVoucherList()
    {
        voucherTable.empty();

        $.get("https://localhost:7126/api/Vouchers",(data)=>{
        voucherTable.empty();

            $.each(data, (index,voucher) =>{
                const dataString = voucher.dateExpire;
                const dateObject = new Date(dataString)
                const day = dateObject.getDate();
                const month = dateObject.getMonth() + 1;
                const year = dateObject.getFullYear();
                const formattedDate = `${day}-${month}-${year} `;

                const tr = $("<tr></tr>");
                const td_VoucherId = $("<td></td>").text(voucher.voucherId);
                const td_VoucherName = $("<td></td>").text(voucher.voucherName);
                const td_VoucherPoint = $("<td></td>").text(voucher.voucherPoint);
                const td_VoucherValue = $("<td></td>").text(voucher.voucherValue);
                const td_VoucherQuantity = $("<td></td>").text(voucher.voucherQuantity);
                const td_VoucherDateExpire = $("<td></td>").text(formattedDate);
                const tdAction = $("<td></td>");
                const btn_editVoucher = $("<button></button>").text("Sửa").addClass("btn btn-outline-primary mx-3").attr({"data-bs-toggle":"modal","data-bs-target":"#ModalEditVoucher"});
                const btn_delete = $("<button></button>").text("Xóa").addClass("btn btn-outline-secondary");
                btn_editVoucher.click(()=>{
                    EditVoucher(voucher.voucherId);
                })
                btn_delete.click(()=>{
                  DeleteVoucher(voucher.voucherId);
                })


                tdAction.append(btn_editVoucher,btn_delete)
                tr.append(td_VoucherId,td_VoucherName,td_VoucherPoint,td_VoucherValue,td_VoucherQuantity,td_VoucherDateExpire,tdAction);
                voucherTable.append(tr);
            })
        })
    }
    displayVoucherList();

    $("#add_voucher").click(()=>{
        
        const InputVoucherName = $("#InputVoucherName").val(); 
        const InputVoucherPoint = $("#InputVoucherPoint").val(); 
        const InputVoucherValue = $("#InputVoucherValue").val(); 
        const InputVoucherQuantity = $("#InputVoucherQuantity").val(); 
        const InputVoucherExpire = $("#InputVoucherExpire").val(); 

        const data = {voucherName: InputVoucherName,voucherPoint: InputVoucherPoint, voucherValue: InputVoucherValue, voucherQuantity: InputVoucherQuantity,dateExpire: InputVoucherExpire,companyId: 1};
        
        $.ajax({
            type: "POST",
            url: "https://localhost:7126/api/Vouchers",
            contentType: "application/json",
            dataType: "json",
            data: JSON.stringify(data),
            success: (data)=>{
                console.log(data);
                displayVoucherList();
            },
            error: (error)=>{
                console.log("Lỗi thêm voucher",error);
            }
        })
    })

    function EditVoucher(voucherId) 
    {
        $("#Edit_voucher").click(()=>{

            const InputVoucherName = $("#InputVoucherNameEdit").val(); 
            const InputVoucherPoint = $("#InputVoucherPointEdit").val(); 
            const InputVoucherValue = $("#InputVoucherValueEdit").val(); 
            const InputVoucherQuantity = $("#InputVoucherQuantityEdit").val(); 
            const InputVoucherExpire = $("#InputVoucherExpireEdit").val(); 
    
            const data = {voucherName: InputVoucherName,voucherPoint: InputVoucherPoint, voucherValue: InputVoucherValue, voucherQuantity: InputVoucherQuantity,dateExpire: InputVoucherExpire,companyId: 1};
    
            $.ajax({
                type: "PUT",
                url: "https://localhost:7126/api/Vouchers/" + voucherId,
                contentType: "application/json",
                dataType: "json",
                data: JSON.stringify(data),
                success: (data)=>{
                    console.log(data);
                    displayVoucherList();
                },
                error: (error)=>{
                    console.error("Lỗi sửa voucher",error);
                }
            })

        })
    }

    //delete voucher
    function DeleteVoucher(voucherId)
    {
        $.ajax({
            type: "DELETE",
            url: "https://localhost:7126/api/Vouchers/" +voucherId,
            success: (data)=>{
                console.log(data);
                displayVoucherList();
            },
            error: (error)=>{
                console.error("Lỗi xóa voucher",error);
            }
        })
    }
})