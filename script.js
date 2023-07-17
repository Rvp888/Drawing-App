
$(function() {

    $("#slider").slider({
        min: 3,
        max: 30,
        slide: function(event, ui) {
            $("#circle").height(ui.value);
            $("#circle").width(ui.value);
        }
    });


    // Declare variables
    let paint = false; // paintingORerasing or not
    let paint_erase = "paint"; // painting or erasing
    // get the canvas and context
    let canvas = document.getElementById("paint");
    let context = canvas.getContext("2d");
    // get the canvas container
    let container = $("#container");
    // mouse position
    let mouse = {x: 0, y: 0};

    // Onload, load the saved work from local storage

    // set drawing parameters (lineWidth, lineJoin, lineCap)
    context.lineWidth = 3;
    context.lineJoin = "round";
    context.lineCap = "round";

    // click inside container
    container.mousedown(function(e) {
        paint = true;
        context.beginPath();
        mouse.x = e.pageX - this.offsetLeft;
        mouse.y = e.pageY - this.offsetTop;
        context.moveTo(mouse.x, mouse.y);
    });

    // move the mouse while holding mouse key
    container.mousemove(function(e) {
        mouse.x = e.pageX - this.offsetLeft;
        mouse.y = e.pageY - this.offsetTop;
        if (paint == true) {
            if(paint_erase == "paint") {
                // get color input
                context.strokeStyle = "red";
            }
            else { //paint_erase == "erase"
                // color input = white
                context.strokeStyle = "white";
            }
            context.lineTo(mouse.x, mouse.y);
            context.stroke();
        }
    });

    // mouse up => we are not painting or erasing 
    container.mouseup(function() {
        paint = false;
    });

    // if we leave the container, then also we are not painting or erasing
    container.mouseleave(function() {
        paint = false;
    });

    // click on the erase button
    $("#erase").click(function() {
        if (paint_erase == "paint") {
            paint_erase = "erase";
        }
        else {
            paint_erase = "paint";
        }
    });


});