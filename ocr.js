var GRID=[];
for(var i=0;i<1000;i++){
    GRID.push([]);
}


function recognizeText(){
    //var image_data = canvasContext.getImageData(0, 0,canvasContext.canvas.width,canvasContext.canvas.height);
    // var image_data = canvasContext.getImageData(0, 0, canvas.width, canvas.height);
    // document.getElementById("debug-image").src=canvas.toDataURL();
    // console.log(OCRAD(image_data));
    var parsedText=parseText(extractTextByCanvas());
    document.getElementById("parsed-text").innerHTML=parsedText;
    
    return extractTextByCell(LAST_UPDATED_POSITION.x,LAST_UPDATED_POSITION.y);

    return extractTextByCanvas();

}


function extractTextByCanvas(){
    var image_data = canvasContext.getImageData(0,0,canvas.width,canvas.height);
    return OCRAD(image_data);
}


function extractTextByCell(x,y){
    var gridSize=SETTINGS.gridSize;
    var i=Math.floor(x/gridSize);
    var j=Math.floor(y/gridSize);
    var image_data = canvasContext.getImageData(gridSize*i,gridSize*j,gridSize,gridSize);
    var result=OCRAD(image_data);
    console.log(result);
    drawTextGrid(result,i,j+1);
    GRID[i][j]=result;
    return GRID[i][j];
}


function drawGridSquare(i,j){
    var gridSize=SETTINGS.gridSize;
    canvasContext.strokeStyle = "#ff0000";
    
    canvasContext.strokeRect(gridSize*i,gridSize*j,gridSize,gridSize);
}


function extractTextByCells(){
    var arr=[];

    for(var i=0;i<canvas.width/SETTINGS.gridSize;i++){
        var temp=[];
        for(var j=0;j<canvas.height/SETTINGS.gridSize;j++){
            var image_data = canvasContext.getImageData(i*SETTINGS.gridSize,j*SETTINGS.gridSize, (i+1)*SETTINGS.gridSize,(j+1)*SETTINGS.gridSize);
            temp.push(OCRAD(image_data));
        }
        arr.push(temp);
    }
    return arr;
}

function extractTextByLines(){
    var arr=[];

    for(var i=0;i<canvas.width/SETTINGS.gridSize;i++){
        var image_data = canvasContext.getImageData(i*SETTINGS.gridSize+1, 0+1, (i+1)*SETTINGS.gridSize-1,canvas.width-1);
      
        arr.push(OCRAD(image_data));
    }
    return arr;
}



function finishedDrawingLine(){
    recognizeText();
    //console.log(recognizeText());
}


//document.getElementById("ocr-button").onclick=recognizeText;
