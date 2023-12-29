$(document).ready(()=>{
  //variable
      const token = localStorage.getItem("token");
      const decodedToken = parseJwt(token);
      const userRole = decodedToken.role;
      const userId = parseInt(decodedToken.UserId);
      console.log("Token send: "+userId,userRole)
  //end variable

  // Call func
  DisplayOrderForCus()
  DisplayOrderTracking();
  SubmitReviews();
  //end call

  function DisplayOrderForCus() {
    $.get(
      "https://localhost:7126/api/Customers/GetOrderCusById/" + userId,
      (res) => {
        $("#listHistoryOrder").empty();
        $.each(res, (index, data) => {
          const dateTimeOrder = data.orderDate;
          const dateObject = new Date(dateTimeOrder);
          const day = dateObject.getDate();
          const month = dateObject.getMonth() + 1;
          const year = dateObject.getFullYear();
          const formattedDate = `${day}-${month}-${year} `;

          const tr = $("<tr></tr>");
          const td_orderId = $("<td></td>").text(data.orderId);
          const td_orderDate = $("<td></td>").text(formattedDate);
          const td_orderQuantity = $("<td></td>").text(data.totalQuantity);
          const td_orderMoney = $("<td></td>").text(data.totalPrice);
          const td_Action = $("<td></td>");
          const p_detail = $("<p></p>")
            .text("Detail")
            .addClass("btn btn-outline-secondary mx-2")
            .attr({
              "data-bs-toggle": "modal",
              "data-bs-target": "#OrderDetailForCus",
            });
          p_detail.click(() => {
            DetailOrderHistory(data.orderId);
          });
          const p_Reviews = $("<p></p>")
            .text("Reviews")
            .addClass("btn btn-outline-secondary mx-2")
            .attr({
              "data-bs-toggle": "modal",
              "data-bs-target": "#OrderReviewsForCus",
            });
          p_Reviews.click(() => {
            ReviewsOrderHistory(data.orderId);
          });
          const actionEmpty = $("<button></button>")
          .text("Reviews")
          .addClass("btn btn-outline-secondary mx-2")
          .attr("disabled","true");
        
          if(data.orderStatusId == 6)
          {
            td_Action.append(actionEmpty,p_detail);

          }else{
            td_Action.append(p_Reviews, p_detail);
          }
          
          $("#listHistoryOrder").append(tr);
          tr.append(
            td_orderId,
            td_orderDate,
            td_orderQuantity,
            td_orderMoney,
            td_Action
          );
        });
      }
    );
  }

  function DisplayOrderTracking() {
    $.get(
      "https://localhost:7126/api/Customers/GetOrderTrackingCusById/" + userId,
      (res) => {
        $("#listOrderTracking").empty();
        $.each(res, (index, data) => {
          const dateTimeOrder = data.orderDate;
          const dateObject = new Date(dateTimeOrder);
          const day = dateObject.getDate();
          const month = dateObject.getMonth() + 1;
          const year = dateObject.getFullYear();
          const formattedDate = `${day}-${month}-${year} `;

          const tr = $("<tr></tr>");
          const td_orderId = $("<td></td>").text(data.orderId);
          const td_orderDate = $("<td></td>").text(formattedDate);
          const td_orderStatus = $("<td></td>").text(data.statusName);
          const td_orderMethod = $("<td></td>").text(data.methodName);
          const td_Detail = $("<td></td>");
          const p_detail = $("<p></p>")
            .text("Detail")
            .addClass("btn btn-outline-primary")
            .attr({
              "data-bs-toggle": "modal",
              "data-bs-target": "#OrderTrackingForCus",
            });
          p_detail.click(() => {
            DetailOrderTracking(data.orderId);
          });
          const td_confirm = $("<td></td>");
          const p_Confirm = $("<p></p>")
            .text("Confirm Order")
            .addClass("btn btn-primary");
          p_Confirm.click(() => {
            ConfirmOrderTracking(data.orderId);
          });
          const td_CancelOrder = $("<td></td>");
          const p_CancelOrder = $("<p></p>")
            .text("Cancel Order")
            .addClass("btn btn-outline-secondary");
          p_CancelOrder.click(() => {
            CancelOrderTracking(data.orderId);
          });
          const td_empty = $("<td></td>");
          td_CancelOrder.append(p_CancelOrder);
          td_Detail.append(p_detail);
          td_confirm.append(p_Confirm);
          if (data.orderStatusId == 1) {
            tr.append(
              td_orderId,
              td_orderDate,
              td_orderStatus,
              td_orderMethod,
              td_CancelOrder,
              td_Detail
            );
          } else if (data.orderStatusId == 3) {
            tr.append(
              td_orderId,
              td_orderDate,
              td_orderStatus,
              td_orderMethod,
              td_confirm,
              td_Detail
            );
          } else {
            tr.append(
              td_orderId,
              td_orderDate,
              td_orderStatus,
              td_orderMethod,
              td_empty,
              td_Detail
            );
          }
          $("#listOrderTracking").append(tr);
        });
      }
    );
  }

  function DetailOrderHistory(orderId) {
    $.get(
      "https://localhost:7126/api/Customers/GetOrderDetailCusById/" + orderId,
      (res) => {
        $("#container_detailHistory").empty();
        $.each(res, (index, data) => {
          const tr = $("<tr></tr>");
          const td_productName = $("<td></td>").text(data.productName);
          const td_quantity = $("<td></td>").text(data.quantity);
          const td_price = $("<td></td>").text(data.price);
          $("#orderIdDetail").text(data.orderId);
          $("#customerNameDetail").text(data.customerName);
          $("#addressDetail").text(data.customerAddress);
          $("#phoneDetail").text(data.customerPhone);
          $("#customerIdDetail").text(data.customerId);

          $("#container_detailHistory").append(tr);
          tr.append(td_productName, td_quantity, td_price);
        });
      }
    );
  }
  function ReviewsOrderHistory(orderId) {
    //call func
    DisplayReviewsOrderHistory();
    DisplayFormReview();
    //end call func

    function DisplayReviewsOrderHistory() {
      $.get(
        "https://localhost:7126/api/Customers/GetOrderDetailCusById/" + orderId,
        (res) => {
          $("#container_ReviewsHistory").empty();
          $.each(res, (index, data) => {
            const tr = $("<tr></tr>");
            const td_productName = $("<td></td>").text(data.productName);
            const td_quantity = $("<td></td>").text(data.quantity);
            const td_price = $("<td></td>").text(data.price);
            $("#orderIdReviews").text(data.orderId);
            $("#customerNameReviews").text(data.customerName);
            $("#addressReviews").text(data.customerAddress);
            $("#phoneReviews").text(data.customerPhone);
            $("#customerIdReviews").text(data.customerId);

            $("#container_ReviewsHistory").append(tr);
            tr.append(td_productName, td_quantity, td_price);
          });
        }
      );
    }
    function DisplayFormReview() {
      $.get(
        "https://localhost:7126/api/Customers/GetOrderDetailCusById/" + orderId,
        (res) => {
          $(".container_reviewsPro").empty();
          $.each(res, (index, data) => {
            const div_card_Reviews = $("<div></div>").addClass(
              "card_Reviews border border-1 p-5 mb-2"
            );
            const content_div_card = `<div class="row">
            <div class="mb-3">
            <input type="text" class="form-control" id="proId${index}" value="${data.productId}" readonly hidden>
            </div>
            <div class="col"> 
            <div class="mb-3">
            <label for="proName${index}" class="form-label">Product</label>
            <input type="text" class="form-control" id="proName${index}" value="${data.productName}" readonly>
          </div>
        </div>
        <div class="col">
          <div class="mb-3">
            <label for="reviewsStar${index}" class="form-label">Vote star</label>
            <select id="reviewsStar${index}" class="form-select" aria-label="Default select example" required>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option selected value="5">5</option>
          </select>
          </div>
        </div>
        </div>

       <div class="col-12">
        <div class="mb-3">
          <label for="contentReviews${index}" class="form-label">Content reviews</label>
          <textarea class="form-control" id="contentReviews${index}" rows="3" required></textarea>
        </div>
       </div>`;

            div_card_Reviews.append(content_div_card);
            $(".container_reviewsPro").append(div_card_Reviews);
          });
        }
      );
    }
  }

  function DetailOrderTracking(orderId) {
    $.get(
      "https://localhost:7126/api/Customers/GetOrderTracking/" + orderId,
      (res) => {
        const orderStatus = parseInt(res.orderStatusId);
        $("#content_timelineForCus").empty();
        console.log("xxx" + orderStatus);
        if (orderStatus == 1) {
          const htmlTimeline = `<div class="single-timeline d-flex-2">
              <div class="timeline-blank"></div>
              <div class="timeline-text d-flex-2">
                <span>
                  <h6 >Order success</h6>
                </span>
                <div class="t-square"></div>
              </div>
            </div>`;
          const htmlTimeline2 = `<div class="single-timeline d-flex-2">
              <div class="timeline-blank"></div>
              <div class="timeline-text d-flex-2">
                <span>
                  <h6 class="text-danger">Waiting for processing</h6>
                </span>
                <div class="t-square"></div>
              </div>
            </div>`;
          const htmlTimeline3 = `<div class="single-timeline d-flex-2">
              <div class="timeline-blank"></div>
              <div class="timeline-text d-flex-2">
                <span>
                <h6 class="text-danger">Waiting for processing</h6>
                </span>
                <div class="t-square"></div>
              </div>
            </div>`;
          const htmlTimeline4 = `<div class="single-timeline d-flex-2">
              <div class="timeline-blank"></div>
              <div class="timeline-text d-flex-2">
                <span>
                <h6 class="text-danger">Waiting for processing</h6>
                </span>
                <div class="t-square"></div>
              </div>
            </div>`;
          $("#content_timelineForCus").append(
            htmlTimeline,
            htmlTimeline2,
            htmlTimeline3,
            htmlTimeline4
          );
        }
        if (orderStatus == 2) {
          const htmlTimeline = `<div class="single-timeline d-flex-2">
              <div class="timeline-blank"></div>
              <div class="timeline-text d-flex-2">
                <span>
                  <h6>Order success</h6>
                </span>
                <div class="t-square"></div>
              </div>
            </div>`;
          const htmlTimeline2 = `<div class="single-timeline d-flex-2">
              <div class="timeline-blank"></div>
              <div class="timeline-text d-flex-2">
                <span>
                  <h6>Confirmed</h6>
                </span>
                <div class="t-square"></div>
              </div>
            </div>`;
          const htmlTimeline3 = `<div class="single-timeline d-flex-2">
              <div class="timeline-blank"></div>
              <div class="timeline-text d-flex-2">
                <span>
                <h6 class="text-danger">Waiting for processing</h6>
                </span>
                <div class="t-square"></div>
              </div>
            </div>`;
          const htmlTimeline4 = `<div class="single-timeline d-flex-2">
              <div class="timeline-blank"></div>
              <div class="timeline-text d-flex-2">
                <span>
                <h6 class="text-danger">Waiting for processing</h6>
                </span>
                <div class="t-square"></div>
              </div>
            </div>`;
          $("#content_timelineForCus").append(
            htmlTimeline,
            htmlTimeline2,
            htmlTimeline3,
            htmlTimeline4
          );
        }
        if (orderStatus == 3) {
          const htmlTimeline = `<div class="single-timeline d-flex-2">
              <div class="timeline-blank"></div>
              <div class="timeline-text d-flex-2">
                <span>
                  <h6>Order success</h6>
                </span>
                <div class="t-square"></div>
              </div>
            </div>`;
          const htmlTimeline2 = `<div class="single-timeline d-flex-2">
              <div class="timeline-blank"></div>
              <div class="timeline-text d-flex-2">
                <span>
                  <h6>Confirmed</h6>
                </span>
                <div class="t-square"></div>
              </div>
            </div>`;
          const htmlTimeline3 = `<div class="single-timeline d-flex-2">
              <div class="timeline-blank"></div>
              <div class="timeline-text d-flex-2">
                <span>
                  <h6>Delivering</h6>
                </span>
                <div class="t-square"></div>
              </div>
            </div>`;
          const htmlTimeline4 = `<div class="single-timeline d-flex-2">
              <div class="timeline-blank"></div>
              <div class="timeline-text d-flex-2">
                <span>
                <h6 class="text-danger">Waiting for processing</h6>
                </span>
                <div class="t-square"></div>
              </div>
            </div>`;
          $("#content_timelineForCus").append(
            htmlTimeline,
            htmlTimeline2,
            htmlTimeline3,
            htmlTimeline4
          );
        }
        if (orderStatus == 4) {
          const htmlTimeline = `<div class="single-timeline d-flex-2">
              <div class="timeline-blank"></div>
              <div class="timeline-text d-flex-2">
                <span>
                  <h6>Order success</h6>
                </span>
                <div class="t-square"></div>
              </div>
            </div>`;
          const htmlTimeline2 = `<div class="single-timeline d-flex-2">
              <div class="timeline-blank"></div>
              <div class="timeline-text d-flex-2">
                <span>
                  <h6>Confirmed</h6>
                </span>
                <div class="t-square"></div>
              </div>
            </div>`;
          const htmlTimeline3 = `<div class="single-timeline d-flex-2">
              <div class="timeline-blank"></div>
              <div class="timeline-text d-flex-2">
                <span>
                  <h6>Delivering</h6>
                </span>
                <div class="t-square"></div>
              </div>
            </div>`;
          const htmlTimeline4 = `<div class="single-timeline d-flex-2">
              <div class="timeline-blank"></div>
              <div class="timeline-text d-flex-2">
                <span>
                  <h6>Giao hàng thành công</h6>
                </span>
                <div class="t-square"></div>
              </div>
            </div>`;
          $("#content_timelineForCus").append(
            htmlTimeline,
            htmlTimeline2,
            htmlTimeline3,
            htmlTimeline4
          );
        }
      }
    );
  }

  function CancelOrderTracking(orderId) {
    $.ajax({
      url: "https://localhost:7126/api/Orders/PutCancelOrderForCus/" + orderId,
      type: "PUT",
      contentType: "application/json",
      dataType: "json",
      data: JSON.stringify({}),
      success: (res) => {
        console.log(res);
        alert("Order cancel");
        location.reload();
      },
      error: (error) => {
        console.error("Error", error);
      },
    });
  }
  function ConfirmOrderTracking(orderId) {
    $.ajax({
      url: "https://localhost:7126/api/Orders/PutCancelOrderForCus/" + orderId,
      type: "PUT",
      contentType: "application/json",
      dataType: "json",
      data: JSON.stringify({}),
      success: (res) => {
        console.log(res);
        alert("Order confirm");
        location.reload();
      },
      error: (error) => {
        console.error("Error", error);
      },
    });
  }

  function SubmitReviews() {
    $("#submitReviews").submit((e) => {
      e.preventDefault();
      const customerIdReviews = $("#customerIdReviews").text();
      const orderIdReviews = $("#orderIdReviews").text();
      let dataProductId = [];
      let dataStar = [];
      let dataContent = [];
      $(".card_Reviews").each((index) => {
        dataProductId.push(parseInt($(`#proId${index}`).val()));
        dataStar.push(parseInt($(`#reviewsStar${index}`).val()));
        dataContent.push($(`#contentReviews${index}`).val());
      });
      var dataJson ={
        "orderId": parseInt(orderIdReviews),
        "customerId": parseInt(customerIdReviews),
        "dataProductId" : dataProductId,
        "dataStar": dataStar,
        "dataContent": dataContent
      }
      $.ajax({
        url:"https://localhost:7126/api/Reviews",
        type:"POST",
        dataType:"json",
        contentType:"application/json",
        data: JSON.stringify(dataJson),
        success: (res)=>{
          console.log(res);
          location.reload();
        },
        error: (err)=>{
          console.error("Error reviews product",err);
        }
      })
      console.log(dataStar);
      alert("submit success");
    });
  }



  function parseJwt(token) {
      var base64Url = token.split('.')[1];
      var base64 = base64Url.replace('-', '+').replace('_', '/');
      return JSON.parse(atob(base64));1
  }
})