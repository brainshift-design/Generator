document.addEventListener('pointerdown', function(e)
{
    if (   document.canResizeX
        || document.canResizeY)
    {
        console.log('document.pointerdown');

        document.startRect = new Rect(
            e.clientX,
            e.clientY,
            window.innerWidth,
            window.innerHeight);

        document.body.setPointerCapture(e.pointerId);

        document.resizingX = document.canResizeX;
        document.resizingY = document.canResizeY;
    }
});



document.addEventListener('pointermove', function(e)
{
    if (   document.resizingX
        && document.resizingY)
    {
        resizeWindow(
            document.startRect.w + e.clientX - document.startRect.x,
            document.startRect.h + e.clientY - document.startRect.y);
    }
    else if (document.resizingX)
    {
        resizeWindow(
            document.startRect.w + e.clientX - document.startRect.x,
            document.body.clientHeight);
    }
    else if (document.resizingY)
    {
        resizeWindow(
            document.body.clientWidth,
            document.startRect.h + e.clientY - document.startRect.y);
    }
    else
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


