$(document).ready(function() {
    //lay the 
    const productTable =  $("#productTable");
    
    //ham load du lieu
    function displaylistcate(){
        productTable.empty();
        //goi api
        $.get(  "https://localhost:7126/api/Categories", function(data){
            $.each(data, function(index,cate){
                const tr = $("<tr></tr>");
                const tdId = $("<td></td>").text(cate.categoryId);
                const tdName = $("<td></td>").text(cate.categoryName);
                const tdBtnDelete = $("<td></td>");
                const btnDelete = $("<button></button>").text("Xóa");
                btnDelete.addClass("btn btn-outline-secondary");
                const btnEdit = $("<button></button>").text("Sửa");
                btnEdit.addClass("btn btn-outline-primary mx-3");

                //xu ly xoa     
                btnDelete.click(function(){
                    deleteCate(cate.categoryId);
                    }) 
                //xu ly sua
                btnEdit.click(function(){
                    editCate(cate.categoryId)
                })

                tdBtnDelete.append(btnDelete, btnEdit);

                tr.append(tdId, tdName, tdBtnDelete);
                
                productTable.append(tr);
            })

        })
    }
    displaylistcate();

    //xoa
    function deleteCate(categoryId)
    {
        $.ajax({
            url: 'https://localhost:7126/api/Categories/' + categoryId,
            type: 'DELETE',
            success: function () {
                alert('Xóa thành công!');
                displaylistcate();
            },
            error: function (error) {
                console.error('Lỗi khi xóa sản phẩm: ' + error);
            }
        });
    }
    //end xoa

    //them loai
    $("#addCategory").click(()=>{
        $("#addCate-form").show();

        $("#addCategory_form").click(function(){
            const categoryName = $("#cateName").val();
            const data = {
             "categoryName": categoryName
            }
 
            $.ajax({
              type:"POST",
              url: "https://localhost:7126/api/Categories",
              contentType: "application/json",
              dataType: "json",
              data: JSON.stringify(data),
                 success: function(data) {
                     console.log(data);
                     displaylistcate();
                 },
                 error: function(error) {
                     console.error("loi them cate",error);
                 }
            })
        }) 
    })
    
       //edit
        function editCate(categoryId){
            $("#editCate-form").show();

            $("#editCategory_form").click(function(){
                 const categoryName = $("#editCateName").val();
                 console.log(categoryId)
                 const data = {
                     "categoryName": categoryName
                 }
                 $.ajax({
                     type:"PUT",
                     url: "https://localhost:7126/api/Categories/" + categoryId ,
                     contentType: "application/json",
                     dataType: "json",
                     data: JSON.stringify(data),
                        success: function(data) {
                            console.log(data);
                            displaylistcate();
                        },
                        error: function(error) {
                            console.error("loi sua cate",error);
                        }
                   })
            })
        }

        $("#editCate-form").hide();
        $("#addCate-form").hide();

})