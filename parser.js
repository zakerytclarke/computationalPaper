function parseText(text){
    for(var key in SETTINGS.mappings){
        text=text.replace(key,SETTINGS.mappings[key]);
        //console.log(text)
    }
    if(text.includes("±")){
        return "=";
    }
    return text;
}