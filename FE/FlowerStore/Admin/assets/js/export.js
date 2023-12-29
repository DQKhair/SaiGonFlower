var token = localStorage.getItem("token");
var decodedToken = parseJwt(token);
var userRole = decodedToken.role;
var userId = decodedToken.UserId;

if(userRole === "Company"){

    // Handle checkbox display and button import

    $('#btn-import').parent().remove();
    $('#importForm').remove();
    $('#btnAccept').remove() 


    // End handle

    // Get checkbox
    const wait = document.getElementById('waitImport');
    const accept = document.getElementById('acceptImport');
    const doneIm = document.getElementById('doneImport');
    // End get checkbox
    

    function list(){

        $('#import-pagination').pagination({
          dataSource: function(done){
            if(wait.checked)
              $.get(`https://localhost:7126/api/Imports/GetImportByStatus/${$('#waitImport').val()}`, (data) => {
                done(data)
              }).fail({})
            else if(accept.checked)
              $.get(`https://localhost:7126/api/Imports/GetImportByStatus/${$('#acceptImport').val()}`, (data) => {
                done(data)
            }).fail({}) 
            else if(doneIm.checked)
              $.get(`https://localhost:7126/api/Imports/GetImportByStatus/${$('#doneImport').val()}`, (data) => {
                done(data)
            }).fail({})  
            else                
              $.get(`https://localhost:7126/api/Imports`,(data) => {
                done(data)        
              }).fail({})
          },  
          pageSize: 10,
          pageRange: 2,
          pageNumber: 1,
          autoHidePrevious: true,
          autoHideNext: true,
        
          // Need to fix for more effective
          callback: function(data, pagination) {
            if($('#import-pagination')[0].childElementCount > 1)
              $('#import-pagination')[0].children[1].remove();
            renderList(data)
          },
          className: 'paginationjs-theme-blue'
        })
        
          function renderList(data){
                $("#import-list").empty();
                $.each(data, function (index, item) {
                  var row = $(`<tr class='text-center'>`);
                  row.append(`<td class='id'> ${item.importId} </td>`);
                  row.append(`<td> ${item.formatCreatedDate} </td>`);
                  row.append(`<td >${item.totalQuantity}</td>`)
                  row.append(`<td> ${item.iestatusName} </td>`);
                  row.append(`<td><i class='bx bx-info-circle fs-4 text-center' 
                                        style='cursor: pointer' 
                                        data-bs-toggle='modal' 
                                        data-bs-target='#detailModal'
                                        data-import-id='${item.importId}'
                                        data-created-date='${item.formatCreatedDate}'
                                        data-iestatus-id = '${item.iestatusId}'>
                                  </i>
                              </td>`);
                  $("#import-list").append(row);
                });

                $('.bx-info-circle').on("click", (e) => {
                  $("#importIdInput").val($(e.target).data("import-id"));
                  $("#createdDate").text($(e.target).data("created-date"));
                  $('#iestatusId').val($(e.target).data("iestatus-id"));
                    if($('#iestatusId').val() <= 3){
                        $('#btnValid').remove()   
                        $('#detailClose').parent().removeClass('justify-content-between');
                        $('#detailClose').parent().addClass('justify-content-center');
                    }
                    if ($('#iestatusId').val() == 1){
                        if($('#btnValid').length == 1){
                            return
                        }else{
                            $('#detailClose').parent().append(`<button id='btnValid' class='btn btn-primary'
                            data-bs-toggle="modal" data-bs-target='#exportForm' >Xuất hàng</button>`)
                            $('#detailClose').parent().addClass('d-flex justify-content-around');
                            
                            // Valid export
                            $('#btnValid').click( (e) =>{
                                $('#exportIdInput').val($('#importIdInput').val())
                            })
                            // End valid
                        } 
                        
                    }

        
                  $.get(`https://localhost:7126/api/ImportDetails/${$(e.target).data("import-id")}`, (res) =>{
                      renderDetail(res)
                  }).fail({ })
        
                  function renderDetail(res){
                    $('#detailInfo').empty()
                    $.each(res, (index,item) => {
                      const divParent = $(`<div></div>`).addClass('w-50 my-2');
                      const div = $(`<div></div>`).addClass('d-flex justify-content-evenly align-item-center');
                      const label = $(`<label>Tên nguyên liệu: </label>`).addClass('form-label ms-4 ps-3');
                      const input1 = $(`<input id='${item.materialId}' value='${item.materialName}' readonly></input>`)
                      .addClass('form-control w-50 mate-id');
                      const input2 = $(`<input style='width: 15%' value='${item.quantity}' readonly></input>`)
                      .addClass('form-control mx-2 text-center mate-quan');
                        
                      div.append(input1,input2)
                      divParent.append(label,div);
                      $('#detailInfo').append(divParent)
                    })
                  }
        
                });
          }
        }
          // Run function to initial pagination list
          list()
          // End
        
          // Handle checked import status
          $('#waitImport').click(() => {
                accept.checked = false;
                doneIm.checked = false;
                list()                  
            })
                
          $('#doneImport').click(() => {
                wait.checked = false;
                accept.checked = false;
                list() 
          }) 
          
          $('#acceptImport').click(() => {
                wait.checked = false;
                doneIm.checked = false;
                list() 
          }) 
          // End handle checked import status

        
}