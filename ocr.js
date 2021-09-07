

function recognizeText(){
    //var image_data = canvasContext.getImageData(0, 0,canvasContext.canvas.width,canvasContext.canvas.height);
    // var image_data = canvasContext.getImageData(0, 0, canvas.width, canvas.height);
    // document.getElementById("debug-image").src=canvas.toDataURL();
    
    var parsedText=extractTextByCell(LAST_UPDATED_POSITION.x,LAST_UPDATED_POSITION.y)
   
    return parsedText;
}


function extractTextByCanvas(){
    var image_data = canvasContext.getImageData(0,0,canvas.width,canvas.height);
    return OCRAD(image_data);
}


function extractTextByCell(x,y){
    var gridSize=SETTINGS.gridSize;
    var i=Math.floor(x/SETTINGS.gridSize);
    var j=Math.floor(y/SETTINGS.gridSize);
   
    var image_data = canvasContext.getImageData(gridSize*i,gridSize*j,gridSize,gridSize);
    

    var ocrText=OCRAD(image_data)
    var result=parseText(ocrText);
    
    if(result==""&&SETTINGS.eraseErrors){
        clearGrid(i,j);
    }

    drawTextGrid(result,i,j+1);
    GRID[j][i]=result;
    return result;
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
    recognizeGesture();
    finishedDrawingEquation();
}

function recognizeGesture(){
    //Clear Swipe
    if(LAST_UPDATED_POSITION.x<2*SETTINGS.gridSize&&
       LAST_UPDATED_POSITION.y<2*SETTINGS.gridSize&&
       FINAL_UPDATED_POSITION.x>10*SETTINGS.gridSize&&
       FINAL_UPDATED_POSITION.y>10*SETTINGS.gridSize
       ){
        clearCanvas();
    }else
    if(Math.sqrt(Math.pow(LAST_UPDATED_POSITION.x-FINAL_UPDATED_POSITION.x,2)+
    Math.pow(LAST_UPDATED_POSITION.y-FINAL_UPDATED_POSITION.y,2))>1.2*SETTINGS.gridSize){//Drawing
        //Let it Draw
    }else{//Single Character
        recognizeTextDebounced();
    }
    
    
}


var recognizeTextDebounced = debounce(function() {
	recognizeText();
},500);

var finishedDrawingEquation = debounce(function() {
	computeAndWrite();
},2000);


function computeAndWrite(){
    var statements=generateStatements();
    console.log(statements);
    var evaled=evaluate(statements);

    evaled.map(function(e){
        for(var i=0;i<e.location.length;i++){
            clearGrid(i+e.location.x,e.location.y+1);
        }
        drawTextGrid(getExprAsText(e.statement),e.location.x,e.location.y+1);
    });
    console.log(evaled);
}



//https://davidwalsh.name/javascript-debounce-function
function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};

//document.getElementById("ocr-button").onclick=recognizeText;
