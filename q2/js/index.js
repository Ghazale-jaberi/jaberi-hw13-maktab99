function blink_text() {
    $('.blink').fadeOut(500);
    $('.blink').fadeIn(500);
}
setInterval(blink_text, 2000);

//
$(document).ready(function(){
    // 
    let myElement = $("#myElement");
    let spanElement = $("span.blink");
    // 
    myElement.addClass("my-element");

    spanElement.css({
        "display": "flex",
        "margin": "15px 45px",
        "font-weight": "900",
        "font-size": "2rem",
        "color": "#666465"
    });



});




   