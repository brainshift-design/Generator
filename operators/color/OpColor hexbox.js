function initHexbox(node)
{
    node.hexbox = createTextbox('hexbox');
    
    node.hexbox.node    = node;
    node.hexbox.editing = false;
    
    node.hexbox.addEventListener('pointerdown', onHexboxPointerDown);
    node.hexbox.addEventListener('pointerup',   onHexboxPointerUp);
    node.hexbox.addEventListener('focus',       onHexboxFocus);
    node.hexbox.addEventListener('focusout',    onHexboxFocusOut);
    node.hexbox.addEventListener('input',       onHexboxInput);
    node.hexbox.addEventListener('keydown',     onHexboxKeyDown);
}



function onHexboxPointerDown(e)
{
    //const hexbox = e.target;

    if (e.button > 0)
        e.preventDefault();

    e.stopPropagation();
}



function onHexboxPointerUp(e)
{
    const hexbox = e.target;

    if (    e.button == 0
        && !hexbox.editing)
    {
        e.preventDefault();

        hexbox.savedValue = hexbox.value;

        hexbox.focus();
        hexbox.select();
        hexbox.editing = true;
    }
}



function onHexboxFocus(e)
{
    const hexbox = e.target;
    hexbox.style.cursor = 'default';
}



function onHexboxFocusOut(e)
{
    const hexbox = e.target;
    hexboxFinish(hexbox.node, true);
    hexbox.style.cursor = 'default';
}



function onHexboxInput(e)
{
    const hexbox = e.target;
    
    let val = hexbox.value;

    if (val.trim() == '')
        return;

         if (   val.length > 7 
             && val[0] == '#') hexbox.value = val.trim().slice(0, 7);
    else if (val.length > 6)   hexbox.value = val.trim().slice(0, 6);
}



function onHexboxKeyDown(e)
{
    e.stopPropagation();

    
    const hexbox = e.target;

    if (   e.code == 'KeyC'
        && getCtrlKey(e))
    {
        e.preventDefault();
        document.execCommand('copy');
    }

    else if (   e.code == 'KeyV'
        && getCtrlKey(e)
        && !hexbox.node.connected())
    {
        // do nothing and let the OS do its thing
    }

    else if ((   e.code == 'Enter'
              || e.code == 'NumpadEnter')
           && !hexbox.node.connected())
        hexboxFinish(hexbox.node, true);

    else if (e.code == 'Escape')
        hexboxFinish(hexbox.node, false);

    else if (   e.key.length == 1
             && !isDigitChar(e.key)
             && !isHexDigitChar(e.key)
         ||     hexbox.node.connected()
            && !isArrowKey(e.code)
         ||    e.key != 'ArrowLeft'
            && e.key != 'ArrowRight'
            && e.key != 'Delete'
            && e.key != 'Backspace'
            && hexbox.value.length >= 6
            && hexbox.selectionStart == hexbox.selectionEnd)
        e.preventDefault();
}



function hexboxFinish(node, success)
{
    if (node.hexbox.value.trim() == '')
        node.hexbox.value = node.hexbox.savedValue;


    var rgb = hex2rgb(node.hexbox.value);

    if (success) 
    {
        setDataColorToCurrentSpace(node, rgb2dataColor(rgb));
        pushUpdate([node.hexbox.node]);
    }

    
    node.hexbox.selectionEnd = node.hexbox.selectionStart;
    node.hexbox.editing = false;
    node.hexbox.blur();
};