var token = localStorage.getItem("token");
var decodedToken = parseJwt(token);
var userRole = decodedToken.role;
var userId = decodedToken.UserId;

if (userRole === "Store") {
  $.get(
    `https://localhost:7126/api/StockDetails/GetStockDetailByStore/${userId}`,
    function (response) {
      listStore();
      renderList(response);
    }
  ).fail(function (status, error) {
    console.log(error);
  });
}else if(userRole === "Company"){
  listCompany();
  $.get("https://localhost:7126/api/Materials", function (response) {
      renderMaterials(response);
  }).fail(function (status, error) {
      console.log(error);
});
}

$("#edit").on("click", () => {

  var data = {};
  var formData = $('#editForm form').serializeArray();
  
  $.each(formData, (index,item) =>{
      data[""+item.name+""] = item.value;
  })

  let id = $('#materialIdInput').val();

  $.ajax({
    url: `https://localhost:7126/api/Materials/${id}`,
    type: "PUT",
    data: JSON.stringify(data),
    contentType: "application/json",
    dataType: 'json',
    success: (response) => {
      renderMaterials(response);
    },
    error: function (status, error) {
      console.error(error);
    },
  });
});

$(document).ready(function () {
  $(this).on("click", ".bx-edit", function () {
    $("#materialNameInput").val($(this).data("material-name"));
    $("#materialIdInput").val($(this).data("material-id"));
  });
});


function renderList(response) {
  $("#material-list").empty();

  $.each(response, function (index, item) {
    var row = $(`<tr class='text-start'></tr>`);
    row.append(`<td> ${item.stockDetailId} </td>`);
    row.append(`<td> ${item.materialName} </td>`);
    row.append(`<td> ${item.quantity} </td>`);
    $("#material-list").append(row);
  });
}


function renderMaterials(response) {
  
  $("#material-list").empty();
  $.each(response, function (index, item) {
    var row = $('<tr>');
    row.append(`<td class='id'> ${item.materialId} </td>`);
    row.append(`<td> ${item.materialName} </td>`);
    row.append(`<td> ${item.supplier} </td>`);
    row.append(`<td> ${item.quantity} </td>`);
    row.append(`<td><i class='bx bx-edit fs-4 text-center' 
                          style='cursor: pointer' 
                          data-bs-toggle='modal' 
                          data-bs-target='#editForm'
                          data-material-id='${item.materialId}'
                          data-material-name='${item.materialName}'></i></td>`);
    $("#material-list").append(row);
  });
}

function listStore() {
  $('#list-table thead tr').append(`<th scope="col">#</th>`)
  $('#list-table thead tr').append(`<th scope="col">Tên nguyên liệu</th>`)
  $('#list-table thead tr').append(`<th scope="col">Số lượng</th>`)
}

function listCompany() {
  $('#list-table thead tr').append(`<th scope="col">#</th>`)
  $('#list-table thead tr').append(`<th scope="col">Tên nguyên liệu</th>`)
  $('#list-table thead tr').append(`<th scope="col">Nhà cung cấp</th>`)
  $('#list-table thead tr').append(`<th scope="col">Số lượng</th>`)
  $('#list-table thead tr').append(`<th scope="col">Tùy chọn</th>`)
}