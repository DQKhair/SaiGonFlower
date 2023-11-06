$(document).ready(function () {
    var productTable = $("#productTable tbody");

    function reFreshDisplay() {
        // Hàm hiển thị sản phẩm trong bảng
        function displayProduct(data) {
            productTable.empty();
            $.each(data, (index, product) => {
                var actions =
                    '<div class="actions">' +
                    '<span class="delete-button btn btn-outline-primary mx-2" data-productid="' +
                    product.productId +
                    '">Xóa</span>' +
                    "</div>";

                var image = product.image1
                    ? '<img src="https://localhost:7126' +
                    product.image1 +
                    '" alt="' +
                    product.productName +
                    '" style="max-width: 100px; max-height: 100px;" />'
                    : "N/A";

                productTable.append(
                    "<tr>" +
                    "<td>" +
                    product.productId +
                    "</td>" +
                    "<td>" +
                    product.productName +
                    "</td>" +
                    "<td>" +
                    product.price +
                    " $ </td>" +
                    " <td>" + 
                    product.categoryName +
                    "</td>" +
                    "<td>" +
                    image +
                    "</td>" +
                    "<td>" +
                    product.quantity +
                    "</td>" +
                    "<td>" +
                    product.storeName +
                    "</td>" +
                    "<td>" +
                    actions +
                    "</td>" +
                    "</tr>"
                );
            });
        }

        // Gọi API để lấy danh sách sản phẩm và hiển thị trên bảng
        var token = localStorage.getItem("token");
        var decodedToken = parseJwt(token);
        var userRole = decodedToken.role;
        var userId = decodedToken.UserId;
        console.log(userRole);

        var apiUrl = "";
        if (userRole === "Company") {
            apiUrl = "https://localhost:7126/api/Products/GetProductsForCompany";
        } else if (userRole === "Store") {
            apiUrl = "https://localhost:7126/api/Products/GetProductsForStore/" + userId;
        }

        if (apiUrl) {
            $.ajax({
                url: apiUrl,
                type: "GET",
                headers: {
                    Authorization: "Bearer " + token,
                },
                success: function (data) {
                    console.log(data);
                    // Hiển thị dữ liệu sản phẩm tương ứng
                    displayProduct(data);
                },
                error: function (xhr, status, error) {
                    console.error("Lỗi khi tải dữ liệu sản phẩm: " + error);
                },
            });
        }
    }
    reFreshDisplay();

    document.getElementById("addProduct").addEventListener("click", function () {
        const productName = document.getElementById("productName").value;
        const price = parseFloat(document.getElementById("price").value);
        const discount = parseFloat(document.getElementById("discount").value);
        const categoryId = document.getElementById("categoryId").value;
        const recipeId = document.getElementById("recipeId").value;
        const QuantityToProduce =
            document.getElementById("QuantityToProduce").value;
        const StoreId = document.getElementById("StoreId").value;
        const image = document.getElementById("image").files[0];
        console.log(image);

        const formData = new FormData();
        formData.append("ProductName", productName);
        formData.append("Price", price);
        const d = discount == 1 ? true : false;
        formData.append("Discount", d);
        formData.append("CategoryId", categoryId);
        formData.append("RecipeId", recipeId);
        formData.append("QuantityToProduce", QuantityToProduce);
        formData.append("StoreId", StoreId);
        formData.append("Images", image);
        // Gửi yêu cầu AJAX để thêm sản phẩm
        fetch("https://localhost:7126/api/Products/uploadfile", {
            method: "POST",
            body: formData,
        })
            .then((response) => response.json())
            .then((data) => {
                // Xử lý dữ liệu phản hồi (có thể cập nhật danh sách sản phẩm trên trang)
                alert("Thêm thành công sản phẩm: " + data.productName);
                reFreshDisplay();
                console.log("Sản phẩm đã được thêm:", data);
                // $("#staticBackdrop").hide();
            })
            .catch((error) => {
                console.error("Lỗi khi thêm sản phẩm:", error);
            });
    });
    var token = localStorage.getItem("token");
    var decodedToken = parseJwt(token);
    var userId = decodedToken.UserId;
    console.log(userId);
    $("#StoreId").attr("value", userId);

    //end xử lý thêm

    // Xử lý sự kiện khi nút xóa được nhấn
    productTable.on("click", ".delete-button", function () {
        var productId = $(this).data("productid");
        $.ajax({
            url: "https://localhost:7126/api/Products/" + productId, // Điều chỉnh URL dựa trên API của bạn
            type: "DELETE",
            success: function () {
                // Xóa thành công, cập nhật bảng bằng cách loại bỏ sản phẩm đã xóa
                $(this).closest("tr").remove();
                reFreshDisplay();
                alert("Xóa thành công!");
            },
            error: function (xhr, status, error) {
                console.error("Lỗi khi xóa sản phẩm: " + error);
            },
        });
    });

    // Xử lý sự kiện khi nút sửa được nhấn
    productTable.on("click", ".edit-button", function () {
        var productId = $(this).data("productid");
        var productName = $(this).closest("tr").find("td:eq(0)").text();
        var productPrice = $(this).closest("tr").find("td:eq(1)").text();

        // Hiển thị form chỉnh sửa
        $("#editProductId").val(productId);
        $("#editProductName").val(productName);
        $("#editProductPrice").val(productPrice);
        $("#editForm").show();
    });

    // Xử lý sự kiện khi nút "Save" trên form chỉnh sửa được nhấn
    $("#saveEditButton").on("click", function () {
        var productId = $("#editProductId").val();
        var productName = $("#editProductName").val();
        var productPrice = $("#editProductPrice").val();

        // Gửi thông tin chỉnh sửa sản phẩm đến API và xử lý kết quả ở đây
        // Sau khi chỉnh sửa thành công, cập nhật lại bảng và ẩn form chỉnh sửa
    });

    // Xử lý sự kiện khi nút "Cancel" trên form chỉnh sửa được nhấn
    $("#cancelEditButton").on("click", function () {
        // Ẩn form chỉnh sửa
        $("#editForm").hide();
    });
});

//Form thêm sản phẩm

const QLSP_Form_product = $("#QLSP__product-form").hide();

$(document).ready(() => {
    $("#QLSP__create_product").click(function () {
        const QLSP_Form_product = $("#QLSP__product-form").show();
    });
});
