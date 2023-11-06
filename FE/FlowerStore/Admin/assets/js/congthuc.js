$(document).ready( () => {
    const toke = localStorage.getItem("token");
    const decodedToken = parseJwt(toke);
    const userRole = decodedToken.role;
    const userId = parseInt(decodedToken.UserId);
    console.log("token: "+userRole,userId,decodedToken)

    displayRecipeList();
    DisplaySelectOption();
    AddRecipeAndRecipeDetail()
    CheckRoleIsNotAdmin();
    
    function displayRecipeList()
    {
        $("#Recipe-list").empty();
        $.get("https://localhost:7126/api/Recipes",(data)=>{

            $.each(data,(index,recipe)=>{

                if(userRole != "Company" || userId !== 1)
                {
                    const tr = $("<tr></tr>").addClass("text-center");
                    const td_recipeId = $("<td></td>").text(recipe.recipeId).attr("scope","col");
                    const td_recipeName = $("<td></td>").text(recipe.recipeName).attr("scope","col");
                    const td_action = $("<td></td>");
                        const icon_detail = $("<i></i>").addClass("bx bx-info-circle fs-4 text-center custom-cursor-on-hover").attr({"style":"cursor: pointer", "data-bs-toggle":"modal", "data-bs-target":"#detailModal"});
                        
                    // hadnle click
                    icon_detail.click(()=>{
                        handleclickDetailRecipe(recipe.recipeId,recipe.recipeName)
                    })
                    // end handle click
    
                    td_action.append(icon_detail);
                    tr.append(td_recipeId,td_recipeName,td_action);
                    $("#Recipe-list").append(tr);
                    
                }else
                {

                    const tr = $("<tr></tr>").addClass("text-center");
                    const td_recipeId = $("<td></td>").text(recipe.recipeId).attr("scope","col");
                    const td_recipeName = $("<td></td>").text(recipe.recipeName).attr("scope","col");
                    const td_action = $("<td></td>");
                        const icon_detail = $("<i></i>").addClass("bx bx-info-circle fs-4 text-center custom-cursor-on-hover").attr({"style":"cursor: pointer", "data-bs-toggle":"modal", "data-bs-target":"#detailModal"});
                        
                        const icon_edit = $("<i></i>").addClass("bx bx-edit fs-4 ms-3 text-center iBtnEditForm").attr({"id":"btnEditForm","data-bs-target":"#EditModal","style":"cursor: pointer","data-bs-toggle":"modal"});
                       
    
                    // hadnle click
                    icon_detail.click(()=>{
                        handleclickDetailRecipe(recipe.recipeId,recipe.recipeName)
                    })
                    icon_edit.click(()=>{
                        handleclickEditRecipe(recipe.recipeId,recipe.recipeName)
                    })
                    // end handle click
    
                    td_action.append(icon_detail,icon_edit);
                    tr.append(td_recipeId,td_recipeName,td_action);
                    $("#Recipe-list").append(tr);

                }
            })
        })

    } 

    
    

    // handle handleclickDetailRecipe(recipeId)
    function handleclickDetailRecipe(recipeId,recipeName)
    {
        $("#recipeIdDetail").text(recipeId);
        $("#recipeNameDetail").text(recipeName);
        $('#detailInfo').empty();

        $.get("https://localhost:7126/api/RecipeDetails/getRecipeDetailAll/"+recipeId,(data)=>{
            $.each(data,(index,recipeDetail)=>{
            const divParent = $(`<div></div>`).addClass('w-50 my-2');
              const div = $(`<div></div>`).addClass('d-flex justify-content-evenly align-item-center');
              const label = $(`<label>Tên nguyên liệu: </label>`).addClass('form-label ms-4 ps-3');
              const input1 = $(`<input value='${recipeDetail.materialName}' readonly></input>`).addClass('form-control w-50');
              const input2 = $(`<input style='width: 15%' value='${recipeDetail.quantity}' readonly></input>`)
              .addClass('form-control mx-2 text-center');

              div.append(input1,input2)
              divParent.append(label,div);
              $('#detailInfo').append(divParent)
            })
        })
    }
    // end handle handleclickDetailRecipe(recipeId)

    // handle handleclickEditRecipe(recipeId)
    function handleclickEditRecipe(recipeId,recipeName)
    {
        $("#recipeIdEdit").text(recipeId);
        $("#recipeNameEdit").attr("value",recipeName);
        $('#EditInfo').empty();

        $.get("https://localhost:7126/api/RecipeDetails/getRecipeDetailAll/"+recipeId,(data)=>{
            $.each(data,(index,recipeDetail)=>{
                const div = $("<div></div>").addClass("py-2 col-lg-6 col-sm-12 d-flex align-items-center option-item");
                const labelNo = $("<label></label>").text(`${index + 1 }: `).addClass("mx-2");
              const selectMaterial = $("<select></select>")
              .addClass("form-select select-material-edit")
              .attr({"name":"materialId","style":"width: 60%;"});
              handleLoadMaterialOptEdit(recipeDetail.materialId,recipeDetail.materialName)
              
              const inputQuantity = $("<input />")
                                    .addClass("form-control mx-auto text-center quantityMaterial")        
                                    .attr({"name":"quantity","style":"width:20%;", "type":"text", "value":recipeDetail.quantity, "maxlength":"2"});

                div.append(labelNo,selectMaterial,inputQuantity);
              $('#EditInfo').append(div)
            })
        })

        HandleEditRecipeAndRecipeDetail(recipeId)
    }
    //end handle handleclickEditRecipe(recipeId)

    //Begin handle select option
    function DisplaySelectOption()
    {
        $("#selectQuantity").empty();
        $("#changeForm").empty();
            const opt = $("<option></option").text(0).attr("value",0);
            $("#selectQuantity").append(opt);
        for(let i = 0; i < 10 ; i++)
        {
            const opt = $("<option></option").text(i+1).attr("value",i+1);
            $("#selectQuantity").append(opt);
            
        }
        

        $("#selectQuantity").change((e)=>{
            let value = parseInt(e.target.value);
            console.log(value);
            $("#changeForm").empty();
            for(let i = 0; i< value;i++)
            {
                const div = $("<div></div>").addClass("py-2 col-lg-6 col-sm-12 d-flex align-items-center option-item");
                const labelNo = $("<label></label>").text(`${i + 1}: `).addClass("mx-2");
                const selectMaterial = $("<select></select>")
                                    .addClass("form-select select-material")
                                    .attr({"name":"materialId","style":"width: 60%;"});
                handleLoadMaterialOpt()

                const inputQuantity = $("<input />")
                                    .addClass("form-control mx-auto text-center quantityMaterial")        
                                    .attr({"name":"quantity","style":"width:20%;", "type":"text", "value":"1", "maxlength":"2"});
                
                div.append(labelNo,selectMaterial,inputQuantity);
                $("#changeForm").append(div);                 
            }

            // check select same
            CheckSelectSame();
            // end check select same
        })
    }
    // End handle select option

    // Begin handle load material
    function handleLoadMaterialOpt()
    {
        $.get("https://localhost:7126/api/Materials",(data)=>{
            $(".select-material").empty();
            const optMaterial = $("<option></option>")
            .text("Tên nguyên liệu")
            .attr("value",0);
            $(".select-material").append(optMaterial);
            $.each(data,(index,material)=>{
                const optMaterial = $("<option></option>")
                                    .text(material.materialName)
                                    .attr("value",material.materialId);
                $(".select-material").append(optMaterial);
            })
        })
    }
    // end handle load material

    // Begin handle load material Edit
    function handleLoadMaterialOptEdit(materialId,materialName)
    {
        $.get("https://localhost:7126/api/Materials",(data)=>{
            $(".select-material-edit").empty();
                const optMaterial = $("<option></option>")
                .text("Nhập nguyên liệu mới")
                .attr("value",0);
                $(".select-material-edit").append(optMaterial);
            $.each(data,(index,material)=>{
                const optMaterial = $("<option></option>")
                                    .text(material.materialName)
                                    .attr("value",material.materialId);
                $(".select-material-edit").append(optMaterial);
            })
        })
        // CheckSelectSame();
    }
    // end handle load material Edit

      // check select same
      function CheckSelectSame()
      {
          let arrCheck = [];    
          $(".select-material").change((e) => {
            let curVal = e.target.options[e.target.selectedIndex].value;
            console.log(curVal)
            if(!arrCheck.includes(curVal))
            {
                arrCheck.push(curVal);
                console.log("đã thêm vào arr")
            }else
            {
                alert("Trùng nguyên liệu");
                e.target.selectedIndex = 0;
            }
          });
        
      }
      // end check select same

    //Begin Add recipe and recipeDetail
    function AddRecipeAndRecipeDetail()
    {
        $("#btnAddRecipeAndRecipeDetail").click(()=>{
            const RecipeName = $("#inputAddRecipeName").val();
            const dataJ = {"recipeName": RecipeName}
            $.ajax({
                type: "POST",
                url: "https://localhost:7126/api/Recipes",
                contentType: "application/json",
                dataType: "json",
                data: JSON.stringify(dataJ),
                success: (data)=>{
                    console.log(data)
                    handlePostRecipeDetail(data);
                },
                error: (error)=>{
                    console.error("Lỗi thêm công thức",error)
                }
            })

        })
    }

    function handlePostRecipeDetail(data)
    {
        const recipeId = parseInt(data.recipeId);
        let materialData = [];
        let quantityData = [];

        $.each($(".select-material"),(index,item)=>{
            materialData.push(parseInt(item.value));
            quantityData.push(parseInt($(".quantityMaterial")[index].value))
        })

        let dataJson = {
            "recipeId" : recipeId,
            "materialID": materialData,
            "quantity" : quantityData
        };

        $.ajax({
            type: "POST",
            url: "https://localhost:7126/PostRecipeAndRecipeDetail",
            contentType: "application/json",
            dataType: "json",
            data: JSON.stringify(dataJson),
            success: (response)=>{
                console.log(response);
                alert("Thêm thành công");
                displayRecipeList();
            },
            error: (error)=>{
                console.error("Lỗi thêm công thức chi tiết",error)
            }

        })

    }
    //End Add recipe and recipeDetail

     //Begin Edit recipe and recipeDetail
        function HandleEditRecipeAndRecipeDetail(recipeId)
        {
            $("#btnEditRecipeAndRecipeDetail").click(()=>{

                const recipeName = $("#recipeNameEdit").val();
                dataJson = {"recipeName" : recipeName};
    
                $.ajax({
                    type: "PUT",
                    url: "https://localhost:7126/api/Recipes/"+ recipeId,
                    contentType: "application/json",
                    dataType: "json",
                    data: JSON.stringify(dataJson),
                    success: (response)=>{
                        console.log(response);
                        handleEditRecipeDetail(response);
                    },
                    error: (error)=>{
                        console.error("Lỗi update recipe name",error);
                    }
                })

            });
        }
      //End Add recipe and recipeDetail

       //Begin Edit recipeDetail
      function handleEditRecipeDetail(data)
      {     
        const recipeId = parseInt(data.recipeId);
        let materialDataEdit = [];
        let quantityDataEdit = [];

        $.each($(".select-material-edit"),(index,item)=>{
            materialDataEdit.push(parseInt(item.value));
            quantityDataEdit.push(parseInt($(".quantityMaterial")[index].value))
        })

        let dataJson = {
            "recipeId" : recipeId,
            "materialID": materialDataEdit,
            "quantity" : quantityDataEdit
        };

        $.ajax({
            type: "PUT",
            url: "https://localhost:7126/PutRecipeAndRecipeDetail/"+data.recipeId,
            contentType:"application/json",
            dataType: "json",
            data: JSON.stringify(dataJson),
            success: (response)=>{
                console.log(response);
                alert("Sửa thành công với mã công thức: " + data.recipeId)
                displayRecipeList();
                location.reload();

            },
            error: (error)=>{
                console.error("Lỗi update recipeDetail",error);
            }
        })
      }
       //End Edit recipeDetail

    //Begin check role is not admin
    function CheckRoleIsNotAdmin()
    {
        
       
        if(userRole != "Company" || userId !== 1)
        {
            $("#btnAddForm").hide();
        }
    }

    function parseJwt(token) {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace('-', '+').replace('_', '/');
        return JSON.parse(atob(base64));
    }
    //End check role is not admin
})