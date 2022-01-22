function initHexbox(op)
{
    op.hexbox = document.createElement('INPUT');
    
    op.hexbox.setAttribute('type', 'text');
    
    op.hexbox.style.textAlign = 'center';
    op.hexbox.style.width     = '100%';
    op.hexbox.style.height    = 26;
    
    op.hexbox.op      = op;
    op.hexbox.editing = false;
    
    
    op.hexbox.addEventListener('pointerdown', onHexboxPointerDown);
    op.hexbox.addEventListener('pointerup',   onHexboxPointerUp);
    op.hexbox.addEventListener('focusout',    onHexboxFocusOut);
    op.hexbox.addEventListener('input',       onHexboxInput);
    op.hexbox.addEventListener('keydown',     onHexboxKeyDown);
}



function onHexboxPointerDown(e)
{
    const hexbox = e.target;

    if (hexbox.op.inputs[0].isConnected)
        e.preventDefault();

    e.stopPropagation();
}



function onHexboxPointerUp(e)
{
    const hexbox = e.target;

    if (   !hexbox.editing
        && !hexbox.op.inputs[0].isConnected)
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
    hexboxFinish(hexbox.op, true);
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

    if (success) 
    {
        setDataColorToCurrentSpace(op, rgb2dataColor(rgb));
        op.hexbox.op.pushUpdate();
    }
    
    op.hexbox.editing = false;
    op.hexbox.blur();
};