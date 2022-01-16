function onHexboxPointerDown(e)
{
    e.stopPropagation();
}



function onHexboxPointerUp(e)
{
    const hexbox = e.target;

    if (!hexbox.editing)
    {
        e.preventDefault();

        hexbox.savedValue = hexbox.value;

        hexbox.select();
        hexbox.editing = true;
    }
}



function onHexboxFocusOut(e)
{
    const hexbox = e.target;
    hexboxFinish(hexbox.op, false);
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
    const hexbox = e.target;

    if (   getCtrlKey(e)
        && e.code == 'KeyV')
    {
        e.preventDefault();
        document.execCommand('paste');
    }

    else if (e.code == 'Enter'
          || e.code == 'NumpadEnter')
        hexboxFinish(hexbox.op, true);

    else if (e.code == 'Escape')
        hexboxFinish(hexbox.op, false);

    else if (e.key.length == 1
         && !isDigit(e.key)
         && !isHexDigit(e.key))
        e.preventDefault();
}



function hexboxFinish(op, success)
{
    var rgb = hex2rgb(op.hexbox.value);

    console.log('rgb', rgb);

    if (success) 
    {
        op._color = rgb2dataColor(rgb);
        op.hexbox.op.pushUpdate();
    }
    
    op.hexbox.editing = false;
    op.hexbox.blur();
};