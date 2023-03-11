var documentBodyClient = null;
var enteredDragging    = false;



// document.addEventListener('dragenter', function(e)
// {
//     console.log('dragenter');
//     e.preventDefault();
//     // e.stopImmediatePropagation();
//     return false;
//     // return false;
//     // if (   e.buttons[0] 
//     //     || e.buttons[1] 
//     //     || e.buttons[2])
//     //     enteredDragging = true;
// });



// document.addEventListener('drag', function(e)
// {
//     e.preventDefault();
//     // e.stopImmediatePropagation();
//     return false;
//     // return false;
//     // if (   e.buttons[0] 
//     //     || e.buttons[1] 
//     //     || e.buttons[2])
//     //     enteredDragging = true;
// });



// document.addEventListener('pointerenter', function(e)
// {
//     if (   e.buttons[0] 
//         || e.buttons[1] 
//         || e.buttons[2])
//         enteredDragging = true;
// });



document.addEventListener('pointerdown', function(e)
{
    if (e.button == 0)
    {
        if (   /*document.canResizeL
            ||*/ document.canResizeR
            || document.canResizeB)
        {
            document.startRect = new Rect(
                document.body.offsetLeft,
                document.body.offsetTop,
                window.innerWidth,
                window.innerHeight);

            document.sx = e.clientX;
            document.sy = e.clientY;

            document.startPan = graphView.pan;

            document.body.setPointerCapture(e.pointerId);

          //document.resizingL = document.canResizeL;
            document.resizingR = document.canResizeR;
            document.resizingB = document.canResizeB;

            uiUpdateViewportRect();
        }
    }


    hideAllMenus();
});



document.addEventListener('pointermove', function(e)
{
    if (enteredDragging)
    {
        e.preventDefault();
        return false;
    }


    if (   document.resizingR
        && document.resizingB)
    {
        uiResizeWindow(
            document.startRect.w + e.clientX - document.sx,
            document.startRect.h + e.clientY - document.sy);
    }
    // else if (document.resizingL
    //       && document.resizingB)
    // {
    //     uiSetWindowRect(
    //         e.clientX,
    //         e.clientY,
    //         document.startRect.w - e.clientX + document.startRect.x,
    //         document.startRect.h + e.clientY - document.startRect.y);
    // }
    // else if (document.resizingL)
    // {
    //     uiSetWindowRect(
    //         document.startRect.x + e.clientX - document.sx,
    //         document.startRect.y,
    //         document.startRect.width - e.clientX + document.sx,
    //         document.startRect.height);

    //     //graphView.pan = point(document.startPan.x - e.clientX, document.startPan.y);
    // }
    else if (document.resizingR)
    {
        uiResizeWindow(
            document.startRect.w + e.clientX - document.sx,
            window.innerHeight);
    }
    else if (document.resizingB)
    {
        uiResizeWindow(
            window.innerWidth,
            document.startRect.h + e.clientY - document.sy);
    }
    else if (!graphView.selecting)
        checkResize(e.clientX, e.clientY);
});



document.addEventListener('pointerup', function(e)
{
    enteredDragging = false;

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

    graphView.scrollbarX.moving  = false;
    graphView.scrollbarY.moving  = false;
});



document.addEventListener('contextmenu', e => e.preventDefault());