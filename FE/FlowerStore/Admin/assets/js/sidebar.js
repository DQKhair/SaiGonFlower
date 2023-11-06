$(document).ready(function() {
    function displayRole() {
  
      var token = localStorage.getItem('token');
      var decodedToken = parseJwt(token);
      var userRole = decodedToken.role;
      // Ẩn tất cả các liên kết chức năng
     
      let useId_role;
      if(userRole == "Company")
      {
        useId_role = 1;
      }else if(userRole == "Store")
      {
        useId_role = 2
      }
      $.get("https://localhost:7126/api/Functions/" + useId_role,(data)=>{
  
        const ul_sidebar_nav = $("#sidebar-nav");
  
        
        $.each(data,(index,functions)=>{
  
          const li_sidebar = $("<li></li>").addClass("nav-item");
          const a_sidebar = $("<a></a>").addClass("nav-link").attr("href",functions.route);
          const i_sidebar = $(`<i class="${functions.icon}"></i>`);
          const span_sidebar = $("<span></span>").text(functions.functionName);
    
          a_sidebar.append(i_sidebar,span_sidebar);
          li_sidebar.append(a_sidebar);
    
          ul_sidebar_nav.append(li_sidebar); 
  
        })
  
      })
  
  
    }
    displayRole();
    
  });