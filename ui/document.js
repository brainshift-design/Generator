var documentBodyClient = null;//{
//     x:      0,
//     y:      0,
//     width:  0,
//     height: 0
// };



document.addEventListener('pointerdown', function(e)
{
    if (e.button == 0)
    {
        if (   document.canResizeL
            || document.canResizeR
            || document.canResizeB)
        {
            document.startRect = new Rect(
                e.clientX,
                e.clientY,
                window.innerWidth,
                window.innerHeight);

            document.body.setPointerCapture(e.pointerId);

            document.resizingL = document.canResizeL;
            document.resizingR = document.canResizeR;
            document.resizingB = document.canResizeB;
        }
    }


    hideAllMenus();
});



document.addEventListener('pointermove', function(e)
{
    if (   document.resizingR
        && document.resizingB)
    {
        uiResizeWindow(
            document.startRect.w + e.clientX - document.startRect.x,
            document.startRect.h + e.clientY - document.startRect.y);
    }
    else if (document.resizingL
          && document.resizingB)
    {
        uiSetWindowRect(
            e.clientX,
            e.clientY,
            document.startRect.w - e.clientX + document.startRect.x,
            document.startRect.h + e.clientY - document.startRect.y);
    }
    else if (document.resizingL)
    {
        uiSetWindowRect(
            e.clientX,
            Number.NaN,
            document.startRect.w - e.clientX + document.startRect.x,
            window.innerHeight);
    }
    else if (document.resizingR)
    {
        uiResizeWindow(
            document.startRect.w + e.clientX - document.startRect.x,
            window.innerHeight);
    }
    else if (document.resizingB)
    {
        uiResizeWindow(
            window.innerWidth,
            document.startRect.h + e.clientY - document.startRect.y);
    }
    else if (!graphView.selecting)
        checkResize(e.clientX, e.clientY);
});



document.addEventListener('pointerup', function(e)
{
     if (   document.resizingL
         || document.resizingR
         || document.resizingB)
    {
        checkResize(e.clientX, e.clientY);
        document.body.releasePointerCapture(e.pointerId);
    }

    document.resizingL = false;
    document.resizingR = false;
    document.resizingB = false;

    scrollbarX.moving  = false;
    scrollbarY.moving  = false;
});



document.addEventListener('contextmenu', e => e.preventDefault());