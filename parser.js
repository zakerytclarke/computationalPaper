function parseText(text){
    for(var key in SETTINGS.mappings){
        text=text.replaceAll(SETTINGS.mappings,SETTINGS.mappings[key]);
    }
    return text;
}