
// Get category

$.get('https://localhost:7126/api/Categories',(response) => {
    renderCate(response)
}).fail( (status, error) => {
  console.log(error)
  $('#cate-line').remove()
});

function renderCate(response){
  $.each(response, function (index, item) {
    $('.cate-list ul').append
    (`<li class=cate-item><a href='./categories.html?id=${item.categoryId}'>${item.categoryName}</a></li>`)
  });

  // $('.cate-item a').click((e) => {
  //     e.preventDefault();
  //     const url = e.target.href;
  //     history.pushState(null,'',url)

  //     const curUrl = new URL(window.location.href);
  //     const id = curUrl.searchParams.get('id');
  //     checkId(id)
  // })
    
    slideBar() 
}

const url = new URL(window.location.href);
const id = url.searchParams.get('id');
checkId(id)

function checkId(id){
  if(id > 0){

    // Get Products By Category
    $.get(`https://localhost:7126/api/Products/getByCategory/${id}`,(response) => {
      renderProduct(response);
      console.log(response)
     }).fail( (status, error) => {
     console.log(error)
     });
  
  }else{
  
    // Get Products
    $.get('https://localhost:7126/api/Products',(response) => {
      renderProduct(response)
    }).fail( (status, error) => {
      console.log(error)
    });
  
  }
}

function renderProduct(response){
  $('.cate-products').empty();
  $.each(response, function(index,item){
    const img = $(`<div class='card-img'></div>`);
    img.append(`<img src='https://localhost:7126${item.image1}' alt='' />`);
    const name = $(`<div class='card-name'></div>`)
    .append(`<a href='./detail.html?id=${item.productId}'>${item.productName}</a>`);
    const price = $(`<div class='card-price'></div>`).append(`<p>$${item.price}</p>`);
    const heart = $(`<div class='card-heart'></div>`).append(`<img src="./imgs/icons/heart.svg" alt="" />`);
    const body = $(`<div class='card-body'></div>`).append(price,heart);
    const content = $(`<div class='card-content'></div>`).append(name,body);
    const card = $(`<div class='products-card'></div>`).append(img,content);  
    $('.cate-products').append(card);
  })
}


 function slideBar(){
    var items = document.querySelectorAll('.cate-item');
    items.forEach((item) => {
    item.onmouseover = function (e) {
      var line = document.querySelector('#cate-line');
      line.style.width = e.target.offsetWidth + "px";
      line.style.left = e.target.offsetLeft + "px";
  }
  })
}