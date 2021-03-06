

function recognizeText(){
    //var image_data = canvasContext.getImageData(0, 0,canvasContext.canvas.width,canvasContext.canvas.height);
    // var image_data = canvasContext.getImageData(0, 0, canvas.width, canvas.height);
    // document.getElementById("debug-image").src=canvas.toDataURL();
    
    var parsedText=extractTextByCell(LAST_UPDATED_POSITION.x,LAST_UPDATED_POSITION.y)
    // if(parsedText=="vs"){
    //     alert("Computational Paper\nVERSION: "+SETTINGS.version);
    //     return "";
    // }
    return parsedText;
}


function extractTextByCanvas(){
    var image_data = canvasContext.getImageData(0,0,canvas.width,canvas.height);
    return OCRAD(image_data);
}


function coordinatesToGrid(x,y){
    var i=Math.floor(x/SETTINGS.gridSize);
    var j=Math.floor(y/SETTINGS.gridSize);
    return {x:i,y:j};
}

function extractTextByCell(x,y){
    var gridSize=SETTINGS.gridSize;
    var coor=coordinatesToGrid(x,y);
    var i=coor.x;
    var j=coor.y;
    LAST_GRID_UPDATED={x:i,y:j}
    var image_data = canvasContext.getImageData(gridSize*i,gridSize*j,gridSize,gridSize);
    

    var ocrText=OCRAD(image_data);
 
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
    //Long Full Erase Swipe
    if(LAST_UPDATED_POSITION.x<2*SETTINGS.gridSize&&
       LAST_UPDATED_POSITION.y<2*SETTINGS.gridSize&&
       FINAL_UPDATED_POSITION.x>(SETTINGS.gridDimensions.x-1)*SETTINGS.gridSize&&
       FINAL_UPDATED_POSITION.y>(SETTINGS.gridDimensions.y-1)*SETTINGS.gridSize
       ){
        clearCanvas();
    }else
    if(Math.sqrt(Math.pow(LAST_UPDATED_POSITION.x-FINAL_UPDATED_POSITION.x,2)+
    Math.pow(LAST_UPDATED_POSITION.y-FINAL_UPDATED_POSITION.y,2))>1.2*Math.sqrt(2*Math.pow(SETTINGS.gridSize,2))){//Drawing
        //Let it Draw
    }else{//Single Character
        if(Math.abs(LAST_UPDATED_POSITION.x-FINAL_UPDATED_POSITION.x)>=0.8*SETTINGS.gridSize&&
           Math.abs(LAST_UPDATED_POSITION.y-FINAL_UPDATED_POSITION.y)>=0.8*SETTINGS.gridSize){//Erase Grid
            //Calcualte average position to find grid
            var avgX=(LAST_UPDATED_POSITION.x+FINAL_UPDATED_POSITION.x)/2;
            var avgY=(LAST_UPDATED_POSITION.y+FINAL_UPDATED_POSITION.y)/2;
            var coor=coordinatesToGrid(avgX,avgY)
            
            clearGrid(coor.x,coor.y);
        }else
        if(Math.abs(LAST_UPDATED_POSITION.y-FINAL_UPDATED_POSITION.y)<SETTINGS.gridSize/10){
            var coor=coordinatesToGrid(LAST_UPDATED_POSITION.x,LAST_UPDATED_POSITION.y);
            if(Math.abs(LAST_UPDATED_POSITION.x-FINAL_UPDATED_POSITION.x)>=SETTINGS.gridSize){//Erase Grid
                //Calcualte average position to find grid
                var maxP=Math.max(LAST_UPDATED_POSITION.x,FINAL_UPDATED_POSITION.x);
                var maxP=Math.max(LAST_UPDATED_POSITION.x,FINAL_UPDATED_POSITION.x);
                
                var coor=coordinatesToGrid(LAST_UPDATED_POSITION.x,LAST_UPDATED_POSITION.y);
                clearGrid(coor.x,coor.y);
            }else{//Special Symbols
                if(LAST_GRID_UPDATED.x==coor.x&&LAST_GRID_UPDATED.y==coor.y){//Two horizontal lines
                    overWriteCell("=",coor.x,coor.y);
                }else{//Single horizontal line
                    overWriteCell("-",coor.x,coor.y);
                }
                LAST_GRID_UPDATED={x:coor.x,y:coor.y};
            } 
        }else{
            recognizeTextDebounced();
        }
    }
    
    
}

function overWriteCell(txt,i,j){
    GRID[j][i]=txt;
    drawTextGrid(txt,i,j+1);
    LAST_GRID_UPDATED={x:0,y:0};
}


var recognizeTextDebounced = debounce(function() {
	recognizeText();
},0);

var finishedDrawingEquation = debounce(function() {
	computeAndWrite();
},3000);


function computeAndWrite(){
    var statements=generateStatements();
    console.log(statements);
    var evaled=evaluate(statements);
    console.log(evaled);
    evaled.map(function(e){
        for(var i=0;i<e.location.length;i++){
            clearGrid(i+e.location.x,e.location.y+1);
        }

        var statementOutput=getExprAsText(e.statement);
        if(statementOutput.indexOf("y=")==0){//GRAPHING TIME !!!
            drawGraphResize(e);
        }else{
            drawTextGrid(statementOutput,e.location.x,e.location.y+1);
        }

    });
    
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
