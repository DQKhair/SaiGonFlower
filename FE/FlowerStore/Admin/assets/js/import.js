var token = localStorage.getItem("token");
var decodedToken = parseJwt(token);
var userRole = decodedToken.role;
var userId = decodedToken.UserId;

if (userRole === "Store") {
  $("#select-quantity").change((e) => {
    let value = e.target.value;
    let length = $(".option-item").length;

    // Handle when decrease amount input
    if (length > value) {
      let newValue = length - value;
      for (let i = 1; i <= newValue; i++) {
        $(".option-item")[length - i].remove();
      }
      // Handle when increase amount input
    } else {
      for (let i = length + 1; i <= value; i++) {
        const select = $(
          `<select name='materialId' style='width: 60%;'></select>`
        ).addClass("form-select select-material");
        select.append(
          `<option class='material-item' value='0'>Nguyên liệu</option>`
        );
        const label = $(`<label style='width:10%;'>${i}:</label>`);
        const input = $(
          `<input name='quantity' style='width:20%;' type='text' value='10' maxlength='2'/>`
        ).addClass("form-control mx-auto text-center quantity");
        const div = $(`<div></div>`).addClass(
          "py-2 col-lg-6 col-sm-12 d-flex align-items-center option-item"
        );
        div.append(label, select, input);
        $("#changeForm").append(div);
      }
    }

    // Get material in select tag
    $.get(`https://localhost:7126/api/Materials`, function (response) {
      getMaterials(response);
    }).fail(function (status, error) {
      console.log(error);
    });

    function getMaterials(response) {
      $(".select-material").empty();
      $(".select-material").append(
        `<option class='material-item' value='0'>Nguyên liệu</option>`
      );
      $.each(response, (index, item) => {
        $(".select-material").append(
          `<option class='material-item' value='${item.materialId}'>${item.materialName}</option>`
        );
      });
    }

    // End get

    $("#btnAddImport").click(() => {
      // Add import table
      var postForm = [];
      $.each($(".quantity"), (index, item) => {
        postForm.push(parseInt(item.value));
      });

      function handleSum(total, num) {
        return total + num;
      }
      var sum = postForm.reduce(handleSum);

      var postData = {
        totalQuantity: sum,
        storeId: parseInt(userId),
      };

      $.ajax({
        url: `https://localhost:7126/api/Imports`,
        type: "POST",
        data: JSON.stringify(postData),
        contentType: "application/json",
        dataType: "json",
        success: (response) => {
          getNewImport(response);
          // Click save to reset form
          $("#importForm")[0].reset();
          $(".option-item").remove();
          // End click
        },
        error: function (status, error) {
          alert("Lỗi vui lòng kiểm tra lại");
        },
      });

      // End import table

      // Add import details table
      function getNewImport(response) {
        let newImportId = response.importId;

        var data = {};
        var materialData = [];
        var quantityData = [];

        $.each($(".select-material"), (index, item) => {
          materialData.push(parseInt(item.value));
          quantityData.push(parseInt($(".quantity")[index].value));
        });

        data = {
          importId: newImportId,
          materialId: materialData,
          quantity: quantityData,
        };

        $.ajax({
          url: `https://localhost:7126/api/ImportDetails`,
          type: "POST",
          data: JSON.stringify(data),
          contentType: "application/json",
          dataType: "json",
          success: (res) => {
            list();
          },
          error: function (status, error) {
            alert("Lỗi vui lòng kiểm tra lại");
          },
        });
      }
      // End import details table
    });
    // End click event

    // Check is same
    $(".select-material").change((e) => {
      let select = $(".select-material");
      for (let i = 0; i < select.length; i++) {
        let curVal = select[i].options[select[i].selectedIndex].value;
        for (let j = 0; j < select.length; j++) {
          if (i !== j) {
            let otherVal = select[j].options[select[j].selectedIndex].value;

            if (curVal === otherVal && !(curVal == 0 && otherVal == 0)) {
              alert("Trùng nguyên liệu");
              e.target.selectedIndex = 0;
              return;
            }
          }
        }
      }
    });
    // End check

    //Check is numeric input
    $(".quantity").keypress((e) => {
      let input = e.target.value + e.key;
      if (input > 50 || input == 0) e.preventDefault();

      if (!(e.charCode >= 48 && e.charCode <= 57)) e.preventDefault();
    });

    // Chek not empty
    $(".quantity").blur((e) => {
      if (e.target.value == "") e.target.value = 1;
    });
    //End check

    // Click cancel to reset form
    $("#btnCancel").click(() => {
      $("#importForm")[0].reset();
      $(".option-item").remove();
    });
    // End click
  });

  // Select amount to import
  for (let i = 0; i <= 15; i++) {
    $("#select-quantity").append(`<option value='${i}'>${i}</option>`);
  }
  // End select

  //--------------------------------------------------------------------

  const w = document.getElementById("waitImport");
  const d = document.getElementById("doneImport");
  const accept = document.getElementById("acceptImport");

  function list() {
    $("#import-pagination").pagination({
      dataSource: function (done) {
        if (w.checked)
          $.get(
            `https://localhost:7126/api/Imports/GetImportByStatus/${$(
              "#waitImport"
            ).val()}`,
            (data) => {
              done(data);
            }
          ).fail({});
        else if (accept.checked)
          $.get(
            `https://localhost:7126/api/Imports/GetImportByStatus/${$(
              "#acceptImport"
            ).val()}`,
            (data) => {
              done(data);
            }
          ).fail({});
        else if (d.checked)
          $.get(
            `https://localhost:7126/api/Imports/GetImportByStatus/${$(
              "#doneImport"
            ).val()}`,
            (data) => {
              done(data);
            }
          ).fail({});
        else
          $.get(`https://localhost:7126/api/Imports`, (data) => {
            done(data);
          }).fail({});
      },
      pageSize: 10,
      pageRange: 2,
      pageNumber: 1,
      autoHidePrevious: true,
      autoHideNext: true,

      // Need to fix for more effective
      callback: function (data, pagination) {
        if ($("#import-pagination")[0].childElementCount > 1)
          $("#import-pagination")[0].children[1].remove();

        renderList(data);
      },
      className: "paginationjs-theme-blue",
    });

    function renderList(data) {
      $("#import-list").empty();
      $.each(data, function (index, item) {
        var row = $(`<tr class='text-center'>`);
        row.append(`<td class='id'> ${item.importId} </td>`);
        row.append(`<td> ${item.formatCreatedDate} </td>`);
        row.append(`<td >${item.totalQuantity}</td>`);
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

      $(".bx-info-circle").on("click", (e) => {
        $("#importIdInput").val($(e.target).data("import-id"));
        $("#createdDate").text($(e.target).data("created-date"));
        $("#iestatusId").val($(e.target).data("iestatus-id"));
        if ($("#iestatusId").val() != 2) {
          if($("#btnAccept").length)
            $("#btnAccept").remove();
          $('#detailClose').parent().removeClass('justify-content-between').addClass('justify-content-center')
        }
        if ($("#iestatusId").val() == 2) {
          if($("#btnAccept").length)
            return;
          else{
            $('#detailClose').parent().append(`<button id='btnAccept' class='btn btn-primary'
            data-bs-toggle="modal" data-bs-target='#acceptForm' >Xác nhận</button>`)
            $('#detailClose').parent().removeClass('justify-content-center').addClass('justify-content-between')
  
            // Get id of import
            $("#btnAccept").click(() => {
                $("#acceptIdInput").val($("#importIdInput").val());
            });
            // End get value
          }
        }

        $.get(
          `https://localhost:7126/api/ImportDetails/${$(e.target).data(
            "import-id"
          )}`,
          (res) => {
            renderDetail(res);
          }
        ).fail({});

        function renderDetail(res) {
          $("#detailInfo").empty();
          $.each(res, (index, item) => {
            const divParent = $(`<div></div>`).addClass("w-50 my-2");
            const div = $(`<div></div>`).addClass(
              "d-flex justify-content-evenly align-item-center"
            );
            const label = $(`<label>Tên nguyên liệu: </label>`).addClass(
              "form-label ms-4 ps-3"
            );
            const input1 = $(
              `<input id='${item.materialId}' value='${item.materialName}' readonly></input>`
            ).addClass("form-control w-50 material-id");
            const input2 = $(
              `<input style='width: 15%' value='${item.quantity}' readonly></input>`
            ).addClass("form-control mx-2 text-center detailQuantity");
            div.append(input1, input2);
            divParent.append(label, div);
            $("#detailInfo").append(divParent);
          });
        }
      });

    }
  }
  // Run function to initial pagination list
  list();
  // End

  // Handle checked import status
  $("#waitImport").click((e) => {
    d.checked = false;
    accept.checked = false;
    list();
  });

  $("#doneImport").click((e) => {
    w.checked = false;
    accept.checked = false;
    list();
  });
  $("#acceptImport").click(() => {
    w.checked = false;
    d.checked = false;
    list();
  });
  // End handle checked import status
}


// Change import status

$("#exportBtn").click(() => {
  let importId = $("#exportIdInput").val();
  let materialIds = [];
  let quantitys = [];

    const materialDetail = $(".mate-id");
    const quantityDetail = $(".mate-quan");

    for (let i = 0; i < materialDetail.length; i++) {
      materialIds.push(parseInt(materialDetail[i].id));
      quantitys.push(parseInt(quantityDetail[i].value));
    }

    let putStatus = {
      importId: parseInt(importId),
      iestatusId: 2,
      quantity: quantitys,
      materialId: materialIds,
    };
  
  updateStatus(putStatus,importId);
  
});

// End change


$('#acceptBtn').click(() => {
  let importId = $("#acceptIdInput").val();
  let materialIds = [];
  let quantitys = [];
    const arr = $(".material-id");
    const quantityTag = $(".detailQuantity");

    for (let i = 0; i < arr.length; i++) {
      materialIds.push(parseInt(arr[i].id));
      quantitys.push(parseInt(quantityTag[i].value));
    }

    let putQuantity = {
      storeId: parseInt(userId),
      quantity: quantitys,
      materialId: materialIds,
    };

    let putStatus = {
        importId: parseInt(importId),
        iestatusId: 3,
    };

    updateStatus(putStatus,importId)


    $.ajax({
      url: `https://localhost:7126/api/StockDetails`,
      type: "POST",
      data: JSON.stringify(putQuantity),
      contentType: "application/json",
      dataType: "json",
      success: (response) => {
        list();
      },
      error: function (status, error) {
        alert("Lỗi vui lòng kiểm tra lại");
      },
    });
})


function updateStatus(putStatus,importId){
  $.ajax({
    url: `https://localhost:7126/api/Imports/${importId}`,
    type: 'PUT',
    data: JSON.stringify(putStatus),
    contentType: "application/json",
    dataType: "json",
    success: (response) => {
        list();
    },
    error: function (status, error) {
        alert("Lỗi vui lòng kiểm tra lại");
    },
  })    
}

// ----------------------------------
