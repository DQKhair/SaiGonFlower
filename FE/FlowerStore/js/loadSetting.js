// $(document).on('click', function(e) {
//     if ($(e.target).hasClass('item-title')) {
//       e.preventDefault(); 
//       e.stopPropagation();
  
//       const url = e.target.href; 
//       history.pushState(null, '',url)
//       loadContent(url);
//     }
//   });

//   function loadContent(url) {
//     fetch(url)
//       .then(response => response.text())
//       .then(data => {
//         const contentElement = document.getElementById('body');
//         contentElement.innerHTML = data;
//       })
//       .catch(error => console.log(error));
//   }
