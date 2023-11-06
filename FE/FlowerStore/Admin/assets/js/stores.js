$(document).ready(()=>{

    DisplayStoreList()
    HandleAddStoreNew()

    function DisplayStoreList()
    {
        $("#Stores-list").empty();
        $.get("https://localhost:7126/api/Stores",(data)=>{
            $.each(data,(index,store)=>{

                const tr = $("<tr></tr>");
                const td_storeId = $("<td></td>").text(store.storeId);
                const td_storeName = $("<td></td>").text(store.storeName);
                const td_storePhone = $("<td></td>").text(store.storePhone);
                const td_storeDistrict = $("<td></td>").text(store.storeDistrict);
                const td_storeStatus = $("<td></td>").text(store.storeStatus? "Đang hoạt động":"Ngừng hoạt động");
                const td_StatusOff = $("<td></td>"); 
               
                    const div_CheckStatus = $("<div></div>").addClass("form-check form-switch d-flex justify-content-center")
                let switchCheckStatus;
                if(td_storeStatus.text() != "Đang hoạt động")
                {
                    td_storeStatus.css("color","red")
                    switchCheckStatus = $("<input />").attr({"type":"checkbox","role":"switch","data-bs-id":index}).addClass("form-check-input switchCheckBox").attr("checked","true");
                }
                else 
                {
                    td_storeStatus.css("color","blue")
                     switchCheckStatus = $("<input />").attr({"type":"checkbox","role":"switch","data-bs-id":index}).addClass("form-check-input switchCheckBox");
                } 
                    // Begin handle change
                    switchCheckStatus.change(()=>{
                        HandleSwitchCheck(store.storeId,index);
                    })
                    // end handle change
                    const td_storeAction = $("<td></td>");
                    const btn_actionDetail = $("<button></button>").text("Chi tiết").addClass("btn btn-outline-secondary mx-2").attr({"data-bs-toggle":"modal", "data-bs-target":"#storeDetailModal"});
                    const btn_actionReset = $("<button></button>").text("Đặt lại mật khẩu").addClass("btn btn-outline-primary mx-2");
                            
                    //Begin handle event
                    btn_actionDetail.click(()=>{
                        HandleBtnStoreDetail(store.storeId);
                    })
                    btn_actionReset.click(()=>{
                        HandleBtnResetPassStore(store.storeId,store.storeName);
                    })
                    //End handle event
                    
                        div_CheckStatus.append(switchCheckStatus);
                        td_StatusOff.append(div_CheckStatus)
                        td_storeAction.append(btn_actionDetail,btn_actionReset);
                        tr.append(td_storeId,td_storeName,td_storePhone,td_storeDistrict,td_storeStatus,td_StatusOff,td_storeAction)
                        $("#Stores-list").append(tr);

            })
        })
    }

    // Begin handle add store
    function HandleAddStoreNew()
    {
        $("#btnAddStore").click(()=>{
            const storeName = $("#inputAddStoreName").val();
            const storePhone = $("#inputAddStorePhone").val();
            const storeStreet = $("#inputAddStoreStreet").val();
            const storeWard = $("#inputAddStoreWard").val();
            const storeDistrict = $("#inputAddStoreDistrict").val();
            const storeUserName = $("#inputAddStoreUserName").val();
            const storePassword = $("#inputAddStorePassword").val();
            const storeRePassword = $("#inputAddStoreRePassword").val();

            console.log(storePassword,storeRePassword)
            if(storePassword != storeRePassword)
            {
                alert("Mật khẩu không trùng khớp.Vui lòng thử lại");
            }
            else
            {

                const dataJson = {
                    "storeName": storeName,
                    "storePhone": storePhone,
                    "storeStreet": storeStreet,
                    "storeWard": storeWard,
                    "storeDistrict": storeDistrict,
                    "storeUserName": storeUserName,
                    "storePassword": storePassword
                }
                $.ajax({
                    type: "POST",
                    url: "https://localhost:7126/api/Stores",
                    contentType: "application/json",
                    dataType: "json",
                    data: JSON.stringify(dataJson),
                    success: (response)=>{
                        console.log(response);
                        DisplayStoreList();
                    },
                    error: (error)=>{
                        console.error("Lỗi thêm store", error);
                    }
                })
            }
            
        })
    }
    // End handle add store


    // handle Change Switch
    function HandleSwitchCheck(storeId,index)
    {
        const checkTrueSwitch = document.getElementsByClassName("switchCheckBox")[index];
        if(checkTrueSwitch.checked == true)
        {
            const dataJson = {};
            $.ajax({
                type: "PUT",
                url: "https://localhost:7126/api/Stores/StatusStoreOff/"+storeId,
                contentType: "application/json",
                dataType: "json",
                data:JSON.stringify(dataJson),
                success: (response)=>{
                    console.log(response);
                    alert(`Cửa hàng ${storeId} đã ngừng hoạt động`);
                    DisplayStoreList();
                },
                error: (error)=>{
                    console.error("Khôi phục mật khẩu thất bại",error);
                }
            })
        }
        else
        {
            const dataJson = {};
            $.ajax({
                type: "PUT",
                url: "https://localhost:7126/api/Stores/StatusStoreOn/"+storeId,
                contentType: "application/json",
                dataType: "json",
                data:JSON.stringify(dataJson),
                success: (response)=>{
                    console.log(response);
                    alert(`Cửa hàng ${storeId} đã hoạt động`);
                    DisplayStoreList();
                },
                error: (error)=>{
                    console.error("Khôi phục mật khẩu thất bại",error);
                }
            })
        }
    }
    // End handle change Switch

    // Begin handle click BtnDetailStore
    function HandleBtnStoreDetail(storeId)
    {
        $.get("https://localhost:7126/api/Stores/"+storeId,(data)=>{
            
        $("#inputDetailStoreName").attr("value",data.storeName);
        $("#inputDetailStorePhone").attr("value",data.storePhone);
        $("#inputDetailStoreStreet").attr("value",data.storeStreet);
        $("#inputDetailStoreWard").attr("value",data.storeWard);
        $("#inputDetailStoreDistrict").attr("value",data.storeDistrict);
        $("#inputDetailStoreUserName").attr("value",data.storeUserName);
        $("#inputDetailStoreStatus").attr("value",data.storeStatus?"Đang hoạt động": "Ngừng hoạt động");

        })
    }
    // End handle click BtnDetailStore

    // Begin handle click BtnResetPassStore
    function HandleBtnResetPassStore(storeId,storeName)
    {
        const dataJson = {};
        $.ajax({
            type: "PUT",
            url: "https://localhost:7126/api/Stores/ResetPasswordStore/"+storeId,
            contentType: "application/json",
            dataType: "json",
            data:JSON.stringify(dataJson),
            success: (response)=>{
                console.log(response);
                //alert(`Mật khẩu cửa hàng ${storeId} và tên là ${storeName} đã được khôi phục với mật khẩu là: sgf@123`)
                alert(`Cửa hàng  ${storeName} (mã: ${storeId}) đã khôi phục lại mật khẩu: sgf@123`)

            },
            error: (error)=>{
                console.error("Khôi phục mật khẩu thất bại",error);
            }
        })
    }
    // End handle click BtnResetPassStore

})