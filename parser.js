function parseText(text){
    for(var key in SETTINGS.mappings){
        text=text.replace(key,SETTINGS.mappings[key]);
        //console.log(text)
    }
    if(text.includes("±")){
        return "=";
    }
    // if(text.length>0){
    //     return text.substring(0,1);
    // }
    return text.toLowerCase();
}



function parser(txt){
    var orderOfOps=["=","*","/","+","-"];
    var out=txt;
    orderOfOps.map(function(op){
        out=splitAtCharIfNotSplit(out,op);
    });

    if(Array.isArray(out)){
        return [out[0],parser(out[1]),parser(out[2])];
    }else
    if(Number(out)){//Number
        return Number(out);
    }else{//Variable
        console.log(out);
        if(out.length>1){//Variables must be one character
            var o=null;
            
            var oStr=out.split("");
            oStr.map(function(oS){
                if(o==null){
                    o=oS
                }else{
                    o=["*",o,oS]
                }
            });
            return o;
        }else{
            return out;
        }
    }

    



    function splitAtCharIfNotSplit(txt,op){
       
        if(Array.isArray(txt)){//Already Parsed
            return txt;
        }
        
        var i=txt.indexOf(op);
        if(i!=-1){
            var a1=txt.substring(0,i);
            var a2=txt.substring(i+1);
            return [op,a1,a2];
        }else{
            return txt;
        }
    }
}

