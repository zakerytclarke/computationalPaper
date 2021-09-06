function parseText(text){
    for(var key in SETTINGS.mappings){
        text=text.replaceAll(key,SETTINGS.mappings[key]);
        //console.log(text)
    }
    return text;
}