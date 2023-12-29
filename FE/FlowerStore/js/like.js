function parseJwt(token) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace('-', '+').replace('_', '/');
  return JSON.parse(atob(base64));
}


if(localStorage.getItem("token") != null){
  const token = localStorage.getItem("token");
  const decodedToken = parseJwt(token);
  const userId = parseInt(decodedToken.UserId);
  // $.get(`https://localhost:7126/api/Likes/List/${userId}`, data =>{
  //     getList()
  // }).fail( error => {

  // })

  getList()

  function getList(){
      $.get(`https://localhost:7126/api/Likes/List/${userId}`, data =>{
          renderList(data)
      }).fail( error => {
  
      })

  function renderList(data){
      $('#bodyContent').empty()
      $.each( data , (index, item) => {
          const img = $(`<div class='card-img'></div>`);
          img.append(`<a href="./detail.html?id=${item.productId}">
          <img src='https://localhost:7126${item.image1}' alt='' /></a>`);
          const name = $(`<div class='card-name'></div>`)
          .append(`<a href='./detail.html?id=${item.productId}'>${item.productName}</a>`);
          const price = $(`<div class='card-price'></div>`).append(`<p>$${item.price}</p>`);
          const heart = $(`<div class='card-heart'></div>`)
          .append(`<i class="fas fa-heart fa-lg iconHeart" data-id="${item.productId}" 
          style="color: #ff2e4d; cursor: pointer"></i>`);
          const body = $(`<div class='card-body'></div>`).append(price,heart);
          const content = $(`<div class='card-content'></div>`).append(name,body);
          const card = $(`<div class='like-card'></div>`).append(img,content);  
          $('#bodyContent').append(card);
      })

      $('.iconHeart').click(e => {
          console.log($(e.target).data("id"))
          var data = {
              customerId: userId,
              productId: $(e.target).data("id"),
            }

            $.ajax({
              url: `https://localhost:7126/api/Likes`,
              type: "PUT",
              data: JSON.stringify(data),
              contentType: "application/json",
              dataType: "json",
              success: (response) => {
                getList()
              },
              error: function (error) {
                console.log(error)
              },
            });
            return;
      })
  }
  }
}
