function evaluate(statements){
    var variables={};
    statements.map(statement=>evaluateStatement(variables));
    return 
}

function evaluateStatement(expr,variables){
    if(!variables){
        variables={};
    }
    var t=typeExpr(expr);
    if(t=="number"){
        return expr;
    }
    if(t=="variable"){
        if(variables[expr]){
            return variables[expr];
        }else{
            return expr;
        }
    }

    //Statements

    var op=expr[0];
    var a1=evaluateStatement(expr[1],variables);
    var a2=evaluateStatement(expr[2],variables);

    var t1=typeExpr(a1);
    var t2=typeExpr(a2);

    if(t1=="number"&&t2=="number"){
        switch(op){
            case "+":
                return a1+a2;
            break;
            case "-":
                return a1-a2;
            break;
            case "*":
                return a1*a2;
            break;
            case "/":
                return a1/a2;
            break;
        }
    }

    //Swap variables
    if(t1=="number"&&t2=="variable"){
        var temp=t2;
        t2=t1;
        t1=temp;
    }
    //Assignment etc
    if(t1=="variable"&&t2=="number"){
        switch(op){
            case "=":
                variables[a1]=a2;
            break; 
        }
    }


    return expr;
}


function typeExpr(expr){
    if(Array.isArray(expr)){
        return "expr"
    }else{
        if(isNaN(expr)){
            return "variable"
        }else{
            return "number"
        }
    }
}




function getExprAsText(expr){
    var t=typeExpr(expr);

    if(t=="number"){
        return expr;
    }
    if(t=="variable"){
        return expr;
    }
    return getExprAsText(expr[1])+expr[0]+getExprAsText(expr[2]);
}



function clearGrid(i,j){
    canvasContext.fillStyle = SETTINGS.backgroundColor;
    canvasContext.fillRect(i*SETTINGS.gridSize+1,j*SETTINGS.gridSize+1,SETTINGS.gridSize-1,SETTINGS.gridSize-1);
}

function drawRectGrid(i,j){
    canvasContext.fillStyle = SETTINGS.color;
    canvasContext.fillRect(i*SETTINGS.gridSize+1,j*SETTINGS.gridSize+1,SETTINGS.gridSize-1,SETTINGS.gridSize-1);
}

function drawTextGrid(text,i,j){
    var textSize=SETTINGS.gridSize/text.length;
    
    clearGrid(i,j);

    canvasContext.fillStyle = SETTINGS.textColor;
    canvasContext.font = textSize+"px serif";
    canvasContext.fillText(text,i*SETTINGS.gridSize+SETTINGS.gridSize/4,j*SETTINGS.gridSize+SETTINGS.gridSize*3/4);



}





function drawGraph(expr,x,y){
    var width=100;
    var height=100;

    var graph=calculateGraph(expr);

    //Draw box
    canvasContext.fillStyle = SETTINGS.color;
    canvasContext.strokeStyle = SETTINGS.color;
    canvasContext.strokeRect(x,y,width,height);
    //Draw Axis
    canvasContext.fillRect(x+width/2,y,2,height);
    canvasContext.fillRect(x,y+height/2,width,2);

    //canvasContext.strokeRect(0,y+height/2,width,1);
    canvasContext.strokeStyle = SETTINGS.graphColor;
    canvasContext.fillStyle = SETTINGS.graphColor;
    for(var i=0;i<graph.x.length;i++){
        var xCoor=graph.x[i];
        var yCoor=graph.y[i]*-1;
        
        if(x+width/2+xCoor>x&&x+width/2+xCoor<x+width&&y+height/2+yCoor>y&&y+height/2+yCoor<y+height){
            canvasContext.fillRect(x+width/2+xCoor,y+height/2+yCoor,1,1);    
        }
    
    }
    canvasContext.fillStyle = SETTINGS.textColor;
    canvasContext.font = '10px serif';
    canvasContext.fillText(getExprAsText(expr),x+10,y+10);
    
}

function calculateGraph(expr){
    var sampleX=[];
    var sampleY=[];
    for(var i=SETTINGS.bounds.minX;i<SETTINGS.bounds.maxX;i+=SETTINGS.bounds.step){
        var x=i;

        var vars={x:x};

        var y=evaluateStatement(expr,vars);
        sampleX.push(x);
        sampleY.push(vars.y);
    }

  
    return {
        x:sampleX,
        y:sampleY
    }
}