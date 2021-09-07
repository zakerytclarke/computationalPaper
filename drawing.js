var LAST_UPDATED_POSITION={x:1,y:1};
var FINAL_UPDATED_POSITION={x:1,y:1};


// =============
// == Globals ==
// =============
const canvas = document.getElementById('drawing-area');
const canvasContext = canvas.getContext('2d');

canvasContext.canvas.width  = window.innerWidth-100;
canvasContext.canvas.height  = window.innerHeight-100;
//canvasContext.canvas.height = window.innerHeight;
clearCanvas();

const state = {
  mousedown: false
};

// ===================
// == Configuration ==
// ===================
const lineWidth = 2;
const halfLineWidth = lineWidth / 2;
// const fillStyle = '#333';
// const strokeStyle = '#333';
// const shadowColor = '#333';
const fillStyle = '#000000';
const strokeStyle = '#000000';
const shadowColor = '#000000';
const shadowBlur = lineWidth / 4;

// =====================
// == Event Listeners ==
// =====================
canvas.addEventListener('mousedown', handleWritingStart);
canvas.addEventListener('mousemove', handleWritingInProgress);
canvas.addEventListener('mouseup', handleDrawingEnd);
canvas.addEventListener('mouseout', handleDrawingEnd);

canvas.addEventListener('touchstart', handleWritingStart);
canvas.addEventListener('touchmove', handleWritingInProgress);
canvas.addEventListener('touchend', handleDrawingEnd);

//clearButton.addEventListener('click', handleClearButtonClick);

// ====================
// == Event Handlers ==
// ====================
function handleWritingStart(event) {
  event.preventDefault();

  const mousePos = getMosuePositionOnCanvas(event);
  
  canvasContext.beginPath();

  canvasContext.moveTo(mousePos.x, mousePos.y);

  canvasContext.lineWidth = lineWidth;
  canvasContext.strokeStyle = strokeStyle;
  canvasContext.shadowColor = null;
  canvasContext.shadowBlur = null;

  canvasContext.fill();
  LAST_UPDATED_POSITION={x:mousePos.x, y:mousePos.y};
  
  state.mousedown = true;
}

function handleWritingInProgress(event) {
  event.preventDefault();
  
  if (state.mousedown) {
    const mousePos = getMosuePositionOnCanvas(event);
    FINAL_UPDATED_POSITION={x:mousePos.x, y:mousePos.y};
    canvasContext.lineTo(mousePos.x, mousePos.y);
    canvasContext.stroke();
  }
}

function handleDrawingEnd(event) {
  event.preventDefault();
  
  if (state.mousedown) {
    canvasContext.shadowColor = shadowColor;
    canvasContext.shadowBlur = shadowBlur;

    canvasContext.stroke();
  }
  
  finishedDrawingLine();

  state.mousedown = false;
}

function handleClearButtonClick(event) {
  event.preventDefault();
  
  clearCanvas();
}

// ======================
// == Helper Functions ==
// ======================
function getMosuePositionOnCanvas(event) {
  const clientX = event.clientX || event.touches[0].clientX;
  const clientY = event.clientY || event.touches[0].clientY;
  const { offsetLeft, offsetTop } = event.target;
  const canvasX = clientX - offsetLeft;
  const canvasY = clientY - offsetTop;

  return { x: canvasX, y: canvasY };
}

function clearCanvas() {
  canvasContext.clearRect(0, 0, canvas.width, canvas.height);
  canvasContext.fillStyle = "rgb(255, 255, 255)";
  canvasContext.fillRect(0, 0, canvas.width, canvas.height);
  if(SETTINGS.drawGrid){
    drawGrid();
  }
  SETTINGS.gridDimensions={
    x:Math.floor(canvas.width/SETTINGS.gridSize),
    y:Math.floor(canvas.height/SETTINGS.gridSize),
  };
  //drawLines();
}


function drawGrid(){
  
  for(var i=0;i<canvas.width/SETTINGS.gridSize;i++){
    canvasContext.fillStyle = "#cccccc";
    canvasContext.fillRect(i*SETTINGS.gridSize, 0, 1, canvas.height);
  }
  for(var i=0;i<canvas.height/SETTINGS.gridSize;i++){
    canvasContext.fillStyle = "#cccccc";
    canvasContext.fillRect(0, i*SETTINGS.gridSize, canvas.width, 1);
  }
}

function drawLines(){

  for(var i=0;i<canvas.height/SETTINGS.gridSize;i++){
    canvasContext.fillStyle = SETTINGS.color;
    canvasContext.fillRect(0, i*SETTINGS.gridSize, canvas.width, 1);
  }
}