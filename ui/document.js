document.addEventListener('pointerdown', function(e)
{
    if (e.button == 0)
    {
        if (   document.canResizeX
            || document.canResizeY)
        {
            document.startRect = new Rect(
                e.clientX,
                e.clientY,
                window.innerWidth,
                window.innerHeight);

            document.body.setPointerCapture(e.pointerId);

            document.resizingX = document.canResizeX;
            document.resizingY = document.canResizeY;
        }
    }


    hideAllMenus();
});



document.addEventListener('pointermove', function(e)
{
    if (   document.resizingX
        && document.resizingY)
    {
        uiResizeWindow(
            document.startRect.w + e.clientX - document.startRect.x,
            document.startRect.h + e.clientY - document.startRect.y);
    }
    else if (document.resizingX)
    {
        uiResizeWindow(
            document.startRect.w + e.clientX - document.startRect.x,
            window.innerHeight);
    }
    else if (document.resizingY)
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
     if (   document.resizingX
         || document.resizingY)
    {
        checkResize(e.clientX, e.clientY);
        document.body.releasePointerCapture(e.pointerId);
    }

    document.resizingX = false;
    document.resizingY = false;

    scrollbarX.moving  = false;
    scrollbarY.moving  = false;
});