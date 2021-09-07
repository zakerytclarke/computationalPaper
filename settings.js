var GRID=[];

var SETTINGS={
    gridSize:100,
    color:"#ccc",
    backgroundColor:"#ffffff",
    graphColor:"#4882e0",
    textColor:"#555",
    mappings:{
        "±":"=",
        "_":"-",
        "rt":"x",
        "r":"x",
        ")c":"x",
        ")(":"x",
        "\n":"",
        "\t":""
    },
    bounds:{
        minX:-50,
        maxX:50,
        minY:-50,
        maxY:50,
        step:0.5
    },
    drawGrid:true,
    eraseErrors:false
};

SETTINGS.mappings["Â±".substring(1)]="=";