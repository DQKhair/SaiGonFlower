$(document).ready(function () {
// hiep tim kiem
reFreshDisplay();
var productTable = $("#productTable tbody");
function reFreshDisplay() {
        
    
    // Hàm hiển thị sản phẩm trong bảng
    function displayProduct(data) {
        
        productTable.empty();
        $.each(data, (index, product) => {
            
            var actions =
                '<div class="actions">' +
                '<i class="bx bx-edit fs-4 text-center"'+
                      'style="cursor: pointer"' +
                      'data-bs-toggle="modal"' +
                      'data-bs-target="#sua-form"'+
                      'data-product-id="'+ product.productId +
                      '"data-product-name="'+product.productName+'"></i> '
                "</div>";

            var image = product.image1
                ? '<img src="https://localhost:7126' +
                product.image1 +
                '" alt="' +
                product.productName +
                '" style="max-width: 100px; max-height: 100px;" />'
                : "N/A";

                var quantity = product.quantity !== null ? product.quantity : 'Xem chi tiết tại cửa hàng';
                var storeInfo = product.storeName !== null
                    ? product.storeName + ' - ' + (product.storeDistrict !== null ? product.storeDistrict : 'Xem chi tiết tại cửa hàng')
                    : 'Xem chi tiết tại cửa hàng';
            
            
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
                quantity +
                "</td>" +
                "<td>" +
                product.recipeName +
                "</td>" +
                "<td>" +
                storeInfo  +
                "</td>" +
               
                "<td>" +
                actions +
                "</td>" +
                "</tr>"
            );
        });
    }

    $("#searchForm").submit(function (event) {
        event.preventDefault(); // Prevent the form from submitting normally

        var productName = $("#productName").val();
        console.log(productName)

        // Make the AJAX request to the API
        $.ajax({
            url: 'https://localhost:7126/api/Products/searchfull?productName=' + productName,
            type: 'GET',
            contentType: 'application/json',
            success: function (data) {
                // Display the search results in the table
                console.log(data)
                displayProduct(data);
            },
            error: function (error) {
                alert('Lỗi khi tìm kiếm sản phẩm: ' + error.responseText);
            }
        });
    });
    
} 
})