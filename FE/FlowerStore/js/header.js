// header click animate
var navItems = document.querySelectorAll('.item-title');

navItems.forEach((navItem) => {
    navItem.onmouseover = function (e) {
        var line = document.querySelector('.line');
        line.style.width = e.target.offsetWidth + "px";
        line.style.left = e.target.offsetLeft + "px";
    }
})

var backGround = document.querySelector('.header-bgTitle');
backGround.onclick= function(){
    $('#check').prop('checked',false);
}

$(function () {
    $(".dropdown-btn").click(function () {
        $(this).parent().next().slideToggle();
        $(this).toggleClass('rotate');
    });
});

