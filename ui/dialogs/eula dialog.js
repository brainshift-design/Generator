function initEulaDialog()
{
    eulaBack.addEventListener('pointerdown', e => 
    {
        e.preventDefault();
        hideDialog(eulaDialog);
    });

        
    window.getSelection().removeAllRanges();


    eulaDialog.mouseOver = false;

    eulaDialog.addEventListener('pointerenter', e => { eulaDialog.mouseOver = true;  updateEulaScroll(); });
    eulaDialog.addEventListener('pointerleave', e => { eulaDialog.mouseOver = false; updateEulaScroll(); });
    

    let r = simpleIntHash(generatorVersion);
    r = 3*r*r - 2*r*r*r;

    eulaWatermark.style.left = Math.round(r * 100) + '%';


    eulaDialogContainer.addEventListener('wheel', e =>
    {    
        const bounds = eulaDialogContent.getBoundingClientRect();

        if (bounds.bottom - bounds.top <= eulaDialogContainer.clientHeight)
            return;


        let oy = eulaDialogContent.style.top = eulaDialogContent.offsetTop - e.deltaY / 3;

        oy = Math.max(oy, eulaDialogContainer.clientHeight - eulaDialogContent.clientHeight + eulaTitle.clientHeight);
        eulaDialogContent.style.top = Math.min(oy, getTopHeight());

        updateEulaScroll();
    });



    eulaScrollbarY.addEventListener('pointerdown', e =>
    {
        if (e.button == 0)
        {
            eulaScrollbarY.moving = true;
            eulaScrollbarY.yStart = eulaScrollbarY.offsetTop;
            eulaScrollbarY.hStart = eulaScrollbarY.offsetHeight;
            eulaScrollbarY.pStart = e.clientY;
            eulaScrollbarY.setPointerCapture(e.pointerId);
    
            for (const node of graph.nodes)
                node.div.sly = node.div.offsetTop;
    
            eulaDialogContent.topStart = eulaDialogContent.offsetTop;
        }
    });
    
    
    
    eulaScrollbarY.addEventListener('pointerup', e =>
    {
        if (   e.button == 0
            && eulaScrollbarY.moving)
        {
            eulaScrollbarY.moving = false;
            eulaScrollbarY.releasePointerCapture(e.pointerId);
 
            let bounds = Rect.NaN;
    
            for (const node of graph.nodes)
                bounds = expandRect(bounds, boundingRect(node.div));
    
            // if (bounds.t >= 0 && bounds.b < eulaDialog.clientHeight)
            //     eulaScrollbarY.style.display = 'none';
        }
    });
    
    
    
    eulaScrollbarY.addEventListener('pointermove', e =>
    {
        if (eulaScrollbarY.moving)
            updateEulaScrollbar(e.clientY);
    });
}



function showEulaDialog()
{
    showDialog(eulaDialog, eulaBack);
    updateEulaScroll();
}



/////////////////////////////////////////////////////////////////////////////////////



function updateEulaScrollbar(clientY)
{
    let t = eulaScrollbarY.yStart + clientY - eulaScrollbarY.pStart;
    let b = t + eulaScrollbarY.hStart;

    t = Math.max(eulaTitle.clientHeight + smallScrollGap, t);
    b = Math.min(b, eulaDialogContainer.clientHeight - largeScrollGap);

    t = Math.max(smallScrollGap, Math.min(t, b - smallScrollGap));
    b = Math.max(t + smallScrollGap, b);


    let oy = 
          eulaDialogContent.topStart 
        - (clientY - eulaScrollbarY.pStart) / eulaScrollbarY.hStart * eulaDialogContainer.clientHeight;

    oy = Math.max(oy, eulaDialogContainer.clientHeight - eulaDialogContent.clientHeight + eulaTitle.clientHeight);


    eulaDialogContent.style.top = Math.min(
        oy,
        getTopHeight());


    updateEulaScroll();
}



function updateEulaScroll()
{
    const x       = eulaDialog.clientLeft;
    const w       = eulaDialog.clientWidth;
    const h       = eulaDialogContainer.clientHeight;
    const yOffset = getTopHeight();
    
    const bounds = eulaDialogContent.getBoundingClientRect();
    
    updateEulaScrollY(x, w, h, bounds, yOffset);
}



function updateEulaScrollY(x, w, h, bounds, yOffset)
{
    if (   /*eulaDialog.mouseOver
        &&*/ bounds.bottom - bounds.top > h)
    {
        const height = sqr(h) / bounds.height - 2*smallScrollGap;

        eulaScrollbarY.style.display = 'inline-block';
        eulaScrollbarY.style.height  =  height;
        eulaScrollbarY.style.left    =  x + w - smallScrollGap - 6;
        eulaScrollbarY.style.top     =  yOffset - (bounds.top - 100) * h / bounds.height;
    }
    else
       eulaScrollbarY.style.display = 'none';
}



function btnStartTrial_onclick()
{
    btnStartTrial.blur(); 
    hideAllMenus(); 
    
    uiSetLocalData('eula', 'true');
    hideDialog(eulaDialog);

    validateInit();
}