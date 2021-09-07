var GRID=[];

var SETTINGS={
    gridSize:200,
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
        "}c":"x",
        ")(":"x",
        "}{":"x",
        "){":"x",
        "}(":"x",
        "][":"x",
        "|":"1",
        "|":"1",
        "q":"9",
        "u":"4",
        "S":"5",
        "O":"0",
        "o":"0",
        "D":"0",
        "a":"8",
        "T":"7",
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