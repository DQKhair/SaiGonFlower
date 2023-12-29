$(document).ready(()=>{
    // call function
    DisplayListReviews();
    //end call function

    function DisplayListReviews()
    {
        $("#Reviews-list").empty();
        $.get("https://localhost:7126/api/Reviews",(data)=>{
            $.each(data,(idx,reviews)=>{
                const tr = $("<tr></tr>");
                const index = $("<td></td>").text(parseInt(idx+1));
                const td_reviewsProductName = $("<td></td>").text(reviews.productName);
                const td_reviewsStar = $("<td></td>").text(reviews.star);
                const td_reviewsContent = $("<td></td>").text(reviews.contentReviews);
                const td_reviewsDate = $("<td></td>").text(reviews.reviewsDate);
                const td_reviewsCustomerName = $("<td></td>").text(reviews.customerName);
                const td_Detail = $("<td></td>");
                const iconDelete = $("<i></i>").addClass("fa-solid fa-trash").attr("style","Cursor: pointer")
                iconDelete.click(()=>{
                    HandleDeleteReviews(reviews.reviewId);
                })
                td_Detail.append(iconDelete);
                tr.append(index,td_reviewsProductName,td_reviewsStar,td_reviewsContent,td_reviewsDate,td_reviewsCustomerName,td_Detail)
                $("#Reviews-list").append(tr);
            })
        })
    }

    function HandleDeleteReviews(reviewId)
    {
        $.ajax({
            type: "DELETE",
            url: `https://localhost:7126/api/Reviews/${reviewId}`,
            dataType: "json",
            success: (response)=>{
                console.log(response);
                alert("Xóa thành công");
                DisplayListReviews();
            },
            error: (error)=>{
                console.error("Lỗi xóa đánh giá",error)
            }

        })
    }
})