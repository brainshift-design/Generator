function position(e)
{
    return point(e.clientX, e.clientY);
}



function getStyleValue(obj, style)
{
    return window.getComputedStyle(obj, null).getPropertyValue(style);
}



function getCtrlKey(e)
{
    return  isMac && e.metaKey
        || !isMac && e.ctrlKey;
}



function dispatchNewEvent(target, proto)
{
    target.dispatchEvent(new proto.constructor(proto.type, proto));
}



function createDiv(className = '')
{
    const div = document.createElement('div');
    
    if (className.trim() != '')
        div.className = className;
    
    return div;
}



function createTextbox(className = '')
{
    const textbox = document.createElement('INPUT');
    textbox.setAttribute('type', 'text'); 

    if (className.trim() != '')
        textbox.className = className;
    
    return textbox;
}



function enableSliderText(slider, enable)
{
    //slider.style.fontStyle  =  enable ? 'normal' : 'italic'; 
    slider.style.fontWeight =  enable ? 'normal' : 'bold'; 
    slider.readOnly         = !enable;
}