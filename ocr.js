function recognizeText(){
    //var image_data = canvasContext.getImageData(0, 0,canvasContext.canvas.width,canvasContext.canvas.height);
    var image_data = canvasContext.getImageData(0, 0, canvas.width, canvas.height);
    document.getElementById("debug-image").src=canvas.toDataURL();
    console.log(OCRAD(canvas));
    
}

function finishedDrawingLine(){
    recognizeText();
}


document.getElementById("ocr-button").onclick=recognizeText;
