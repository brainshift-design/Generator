function initHexbox(op)
{
    op.hexbox = createTextbox('hexbox');
    
    op.hexbox.op      = op;
    op.hexbox.editing = false;
    
    op.hexbox.addEventListener('pointerdown', onHexboxPointerDown);
    op.hexbox.addEventListener('pointerup',   onHexboxPointerUp);
    op.hexbox.addEventListener('focus',       onHexboxFocus);
    op.hexbox.addEventListener('focusout',    onHexboxFocusOut);
    op.hexbox.addEventListener('input',       onHexboxInput);
    op.hexbox.addEventListener('keydown',     onHexboxKeyDown);
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
    hexboxFinish(hexbox.op, true);
    hexbox.style.cursor = 'default';//hexbox.op.isConnected() ? 'default' : 'text';
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
        && !hexbox.op.isConnected())
    {
        // do nothing and let the OS do its thing
    }

    else if ((   e.code == 'Enter'
              || e.code == 'NumpadEnter')
           && !hexbox.op.isConnected())
        hexboxFinish(hexbox.op, true);

    else if (e.code == 'Escape')
        hexboxFinish(hexbox.op, false);

    else if (   e.key.length == 1
             && !isDigitChar(e.key)
             && !isHexDigitChar(e.key)
         ||     hexbox.op.isConnected()
            && !isArrowKey(e.code)
         ||    e.key != 'ArrowLeft'
            && e.key != 'ArrowRight'
            && e.key != 'Delete'
            && e.key != 'Backspace'
            && hexbox.value.length >= 6
            && hexbox.selectionStart == hexbox.selectionEnd)
        e.preventDefault();

    // else if (e.key == 'ArrowUp'
    //       || e.key == 'ArrowDown')
    // {

    // }
}



function hexboxFinish(op, success)
{
    if (op.hexbox.value.trim() == '')
        op.hexbox.value = op.hexbox.savedValue;


    var rgb = hex2rgb(op.hexbox.value);

    if (success) 
    {
        setDataColorToCurrentSpace(op, rgb2dataColor(rgb));
        op.hexbox.op.pushUpdate();
    }

    
    op.hexbox.selectionEnd = op.hexbox.selectionStart;
    op.hexbox.editing = false;
    op.hexbox.blur();
};