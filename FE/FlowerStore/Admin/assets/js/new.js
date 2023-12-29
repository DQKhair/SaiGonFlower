var token = localStorage.getItem("token");
var decodedToken = parseJwt(token);
var userRole = decodedToken.role;
var userId = decodedToken.UserId;

list();

// Validate expire date
const currentDate = new Date().toISOString().split("T")[0];
document.getElementById("newsExpire").min = currentDate;
// End validate

var editor = CKEDITOR.replace("editor", {
  exportPdf_tokenUrl: "./assets/vendor/ckeditor/plugins/exportpdf/plugin.js",
});

var content = "";
editor.on("change", (e) => {
  content = e.editor.getData();
});

$("#btnAddNew").click(() => {
  if($('#newsTitle').val().trim() === "" || $('#newsExpire').val().trim() === "" || content.trim() === ""){
    alert("Vui lòng nhập đủ thông tin")
  }else
    postNews();
});

function postNews() {
  const title = $("#newsTitle").val();
  const date = $("#newsExpire").val();

  let data = {
    companyId: userId,
    content: content,
    title: title,
    expireDate: date,
  };

  $.ajax({
    url: `https://localhost:7126/api/News`,
    type: "POST",
    data: JSON.stringify(data),
    contentType: "application/json",
    dataType: "json",
    success: (res) => {
      CKEDITOR.instances["editor"].setData("");
      list();
      $('#newsTitle').val('');
      $('#newsExpire').val('')
    },
    error: function (status, error) {
      alert("Lỗi vui lòng kiểm tra lại");
    },
  });
}

function list() {
  $("#news-pagination").pagination({
    dataSource: function (done) {
        $.get(
          `https://localhost:7126/api/News`,
          (data) => {
            done(data);
          }
        ).fail(error => {});
    },
    pageSize: 5,
    pageRange: 2,
    pageNumber: 1,
    autoHidePrevious: true,
    autoHideNext: true,

    // Need to fix for more effective
    callback: function (data, pagination) {
      if ($("#news-pagination")[0].childElementCount > 1)
        $("#news-pagination")[0].children[1].remove();

      renderList(data);
    },
    className: "paginationjs-theme-blue",
  });

  function renderList(data) {
    $("#new-list").empty();
    $.each(data, (index, item) => {
      var row = $("<tr>");
      row.append(`<td > ${index +1} </td>`);
      row.append(`<td > ${item.title} </td>`);
      row.append(`<td> ${item.formatNewsDate} </td>`);
      row.append(`<td> ${item.formatExpireDate} </td>`);
      if (item.status == true) row.append(`<td> Đang hiển thị </td>`);
      else row.append(`<td> Hết hạn </td>`);
      row.append(`<td class='text-center'><i class='bx bx-edit fs-4' 
                          style='cursor: pointer' 
                          data-news-id='${item.newsId}'
                          ></i>
                          <i class='bx bx-trash fs-4 ms-3 text-center' style='cursor: pointer'
                           data-delid='${item.newsId} '></i>
                          </td>`);
      $("#new-list").append(row);
    });

    $(".bx-edit").click((e) => {
      
      let id = $(e.target).data("news-id");
      var dataId;
      $.get(`https://localhost:7126/api/News/${id}`, (data) => {
        CKEDITOR.instances["editor"].setData(data.content);
        dataId = data.newsId;
        renderData(data)        
      }).fail((error) => {});


      // Handle button 
      if (!$("#btnCancel").length && !$("#btnEditNew").length) {
        $("#btnAddNew")
          .parent()
          .append(
            `<button id="btnCancel" class="btn btn-light border border-primary me-3">Hủy</button>`
          );
        $("#btnAddNew")
          .parent()
          .append(
            `<button id="btnEditNew" class="btn btn-primary"  >Cập nhật tin tức</button>`
          );
      }
      $("#btnAddNew").remove();

      // End handle button

      $("#btnCancel").click(() => {
        CKEDITOR.instances["editor"].setData("");
        $("#btnCancel")
          .parent()
          .append(
            `<button id="btnAddNew" class="btn btn-primary">Thêm tin tức</button>`
          );
        $("#btnCancel").remove();
        $("#btnEditNew").remove();
        $('#newsTitle').val('');
        $('#newsExpire').val('')
      });

      $("#btnEditNew").click(() => {
        if($('#newsTitle').val().trim() === "" || $('#newsExpire').val().trim() === "" || content.trim() === ""){
          alert("Vui lòng nhập đủ thông tin")
        }else{
        $("#btnCancel")
          .parent()
          .append(
            `<button id="btnAddNew" class="btn btn-primary">Thêm tin tức</button>`
          );
        $("#btnCancel").remove();
        $("#btnEditNew").remove();
        editNews(dataId);
        $('#newsTitle').val('');
        $('#newsExpire').val('')
        }
      });

    });

    $('.bx-trash').click((e) => {
      let id = $(e.target).data("delid");
      console.log(id)
      $.ajax({
        url: `https://localhost:7126/api/News/${id}`,
        type: "DELETE",
        data: JSON.stringify(data),
        contentType: "application/json",
        dataType: "json",
        success: (res) => {
          list()
        },
        error: function (status, error) {
          alert("Lỗi vui lòng kiểm tra lại");
        },
      });
    });
  }
}    

function editNews(id) {
  let data = {
    newsId: id,
    companyId: parseInt(userId),
    content: content,
    title: $('#newsTitle').val(),
    expireDate: $('#newsExpire').val()
  };


  $.ajax({
    url: `https://localhost:7126/api/News/${id}`,
    type: "PUT",
    data: JSON.stringify(data),
    contentType: "application/json",
    dataType: "json",
    success: (res) => {
      CKEDITOR.instances["editor"].setData("");
      list()
    },
    error: function (status, error) {
      alert("Lỗi vui lòng kiểm tra lại");
    },
  });
}


// Get news by id
function renderData(data){
  $('#newsTitle').val(data.title)
  const formatDate = data.expireDate.split('T')[0];
  $('#newsExpire').val(formatDate)
}
// End get



