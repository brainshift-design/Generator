function initWindowSizers()
{
    initWindowSizerEvents(windowSizerL,  setWindowSizerRectL);
    initWindowSizerEvents(windowSizerR,  setWindowSizerRectR);
    initWindowSizerEvents(windowSizerB,  setWindowSizerRectB);

    initWindowSizerEvents(windowSizerBL, setWindowSizerRectBL);
    initWindowSizerEvents(windowSizerBR, setWindowSizerRectBR);
}



function initWindowSizerEvents(sizer, setRect)
{
    sizer.resizing = false;


    sizer.addEventListener('pointerdown', e =>
    {
        if (e.button == 0)
        {
            if (document.activeElement)
                document.activeElement.blur();


            hideAllMenus();
               
            sizer.setPointerCapture(e.pointerId);


            e.stopPropagation();


            sizer.startRect = new Rect(0, 0, window.innerWidth, window.innerHeight);
            sizer.resizing  = true;
            

            sizer.sx = e.clientX;
            sizer.sy = e.clientY;
        }        
    });



    sizer.addEventListener('pointermove', e =>
    {
        if (!sizer.resizing)
            return;


        const dx = e.clientX - sizer.sx;
        const dy = e.clientY - sizer.sy;
    
        setRect(sizer, dx, dy);
            

        e.preventDefault();
        e.stopPropagation();
    });
    

    
    sizer.addEventListener('pointerup', e =>
    {
        if (e.button == 0)
        {
            if (sizer.resizing)
                sizer.resizing = false;

            if (sizer.hasPointerCapture(e.pointerId))
                sizer.releasePointerCapture(e.pointerId);
        }
    });
}



function setWindowSizerRectL(sizer, dx, dy) // these have to be lambdas for 'this'
{
    setWindowSizerRect(
        sizer.startRect.x + dx,
        sizer.startRect.y, 
        sizer.startRect.w - dx, 
        sizer.startRect.h);
}



function setWindowSizerRectR(sizer, dx, dy)
{
    uiResizeWindow(
        sizer.startRect.w + Math.round(dx),
        sizer.startRect.h);

    setWindowSizerRect(
        sizer.startRect.x, 
        sizer.startRect.y, 
        sizer.startRect.w + dx, 
        sizer.startRect.h);
}



function setWindowSizerRectB(sizer, dx, dy)
{
    uiResizeWindow(
        sizer.startRect.w,
        sizer.startRect.h + Math.round(dy));

    setWindowSizerRect(
        sizer.startRect.x, 
        sizer.startRect.y, 
        sizer.startRect.w, 
        sizer.startRect.h + dy);
}



function setWindowSizerRectBL(sizer, dx, dy)
{
    setWindowSizerRect(
        sizer.startRect.x + dx, 
        sizer.startRect.y, 
        sizer.startRect.w - dx, 
        sizer.startRect.h + dy);
}



function setWindowSizerRectBR(sizer, dx, dy)
{
    uiResizeWindow(
        sizer.startRect.w + Math.round(dx),
        sizer.startRect.h + Math.round(dy));

    setWindowSizerRect(
        sizer.startRect.x, 
        sizer.startRect.y, 
        sizer.startRect.w + dx, 
        sizer.startRect.h + dy);
}


function setWindowSizerSize(w, h, updateTransform = true)
{
    updateWindowSizers();
}



function setWindowSizerRect(x, y, w, h, updateTransform = true)
{
    updateWindowSizers();
}



function updateWindowSizers()
{
    const edge   = Math.ceil(windowBorderWidth);
    const corner = Math.max(windowBorderWidth, edge);

    windowSizerL .style.width  = edge; 
    windowSizerR .style.width  = edge; 
    windowSizerB .style.height = edge; 

    windowSizerBL.style.width  = corner; 
    windowSizerBL.style.height = corner; 

    windowSizerBR.style.width  = corner; 
    windowSizerBR.style.height = corner; 


    windowSizerL.style.cursor  = 'ew-resize';
    windowSizerR.style.cursor  = 'ew-resize';
    windowSizerB.style.cursor  = 'ns-resize';
    
    windowSizerBL.style.cursor = 'nesw-resize';
    windowSizerBR.style.cursor = 'nwse-resize';
}