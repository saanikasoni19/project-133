img = "";
status = "";

function preload() {
    img = loadImage('TV&AC.jpg');
}

function setup() {
    canvas = createCanvas(800, 580);
    canvas.center();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}

function draw() {
    image(img, 0, 0, 800, 580);
    
    if (status != "") {
        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status : Objects Detected";

            fill("#FF0000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
    /*fill("#FF0000");
    text("TV", 240, 185);
    noFill();
    stroke("#FF0000");
    rect(235, 165, 315, 220);

    fill("#FF0000");
    text("AC", 275, 15);
    noFill();
    stroke("#FF0000");
    rect(270, 0, 270, 110);*/


}

function modelLoaded() {
    console.log("Model Loaded!");
    status = true;
    objectDetector.detect(img, gotResult);
}

function gotResult(error, results) {
    if (error) {
        console.log(error);
    }
    console.log(results);
}
