function initWhatsNewDialog()
{
    //whatsNew0.innerHTML = whatsNew0.innerHTML.replace('%Ctrl%', osCtrl());


    initCheckbox(chkHideWhatsNew, 'Don\'t show again until next update', false);
    chkHideWhatsNew.addEventListener('change', () => uiSetLocalData('showWhatsNew', generatorVersion));


    whatsNewBack.addEventListener('pointerdown', e => { e.preventDefault(); });

    whatsNewUpgradeLink.addEventListener('click', e => 
    { 
        e.preventDefault();
        uiFigmaManageSubscription(); 
    });



    whatsNewDialog.mouseOver = false;

    whatsNewDialog.addEventListener('pointerenter', e => { whatsNewDialog.mouseOver = true;  updateWhatsNewScroll(); });
    whatsNewDialog.addEventListener('pointerleave', e => { whatsNewDialog.mouseOver = false; updateWhatsNewScroll(); });
    

    let r = simpleIntHash(generatorVersion);
    r = 3*r*r - 2*r*r*r;

    whatsNewWatermark.style.left = Math.round(r * 100) + '%';


    whatsNewDialogContainer.addEventListener('wheel', e =>
    {    
        const bounds = whatsNewDialogContent.getBoundingClientRect();

        if (bounds.bottom - bounds.top <= whatsNewDialogContainer.clientHeight)
            return;


        let oy = whatsNewDialogContent.style.top = whatsNewDialogContent.offsetTop - e.deltaY / 3;

        oy = Math.max(oy, whatsNewDialogContainer.clientHeight - whatsNewDialogContent.clientHeight + whatsNewTitle.clientHeight);
        whatsNewDialogContent.style.top = Math.min(oy, getTopHeight());

        updateWhatsNewScroll();
    });



    whatsNewScrollbarY.addEventListener('pointerdown', e =>
    {
        if (e.button == 0)
        {
            whatsNewScrollbarY.moving = true;
            whatsNewScrollbarY.yStart = whatsNewScrollbarY.offsetTop;
            whatsNewScrollbarY.hStart = whatsNewScrollbarY.offsetHeight;
            whatsNewScrollbarY.pStart = e.clientY;
            whatsNewScrollbarY.setPointerCapture(e.pointerId);
    
            for (const node of graph.nodes)
                node.div.sly = node.div.offsetTop;
    
            whatsNewDialogContent.topStart = whatsNewDialogContent.offsetTop;
        }
    });
    
    
    
    whatsNewScrollbarY.addEventListener('pointerup', e =>
    {
        if (   e.button == 0
            && whatsNewScrollbarY.moving)
        {
            whatsNewScrollbarY.moving = false;
            whatsNewScrollbarY.releasePointerCapture(e.pointerId);
 
            let bounds = Rect.NaN;
    
            for (const node of graph.nodes)
                bounds = expandRect(bounds, boundingRect(node.div));
    
            // if (bounds.t >= 0 && bounds.b < whatsNewDialog.clientHeight)
            //     whatsNewScrollbarY.style.display = 'none';
        }
    });
    
    
    
    whatsNewScrollbarY.addEventListener('pointermove', e =>
    {
        if (whatsNewScrollbarY.moving)
            updateWhatsNewScrollbar(e.clientY);
    });


    whatsNewTitleText.innerHTML = 'Version ' + generatorVersion;
}



function showWhatsNewDialog()
{
    showDialog(whatsNewDialog, whatsNewBack);

    whatsNewSuggestUpgrade.style.display = subscribed() ? 'none' : 'inline';

    updateWhatsNewScroll();
}



whatsNewClose.addEventListener('pointerdown', e => e.stopPropagation());



whatsNewBack.addEventListener('pointerdown', () =>
{
    hideDialog(whatsNewDialog);
});



/////////////////////////////////////////////////////////////////////////////////////



function updateWhatsNewScrollbar(clientY)
{
    let t = whatsNewScrollbarY.yStart + clientY - whatsNewScrollbarY.pStart;
    let b = t + whatsNewScrollbarY.hStart;

    t = Math.max(whatsNewTitle.clientHeight + smallScrollGap, t);
    b = Math.min(b, whatsNewDialogContainer.clientHeight - largeScrollGap);

    t = Math.max(smallScrollGap, Math.min(t, b - smallScrollGap));
    b = Math.max(t + smallScrollGap, b);


    let oy = 
          whatsNewDialogContent.topStart 
        - (clientY - whatsNewScrollbarY.pStart) / whatsNewScrollbarY.hStart * whatsNewDialogContainer.clientHeight;

    oy = Math.max(oy, whatsNewDialogContainer.clientHeight - whatsNewDialogContent.clientHeight + whatsNewTitle.clientHeight);


    whatsNewDialogContent.style.top = Math.min(
        oy,
        getTopHeight());


    updateWhatsNewScroll();
}



function updateWhatsNewScroll()
{
    const x       = whatsNewDialog.clientLeft;
    const w       = whatsNewDialog.clientWidth;
    const h       = whatsNewDialogContainer.clientHeight;
    const yOffset = getTopHeight();
    
    const bounds = whatsNewDialogContent.getBoundingClientRect();
    
    updateWhatsNewScrollY(x, w, h, bounds, yOffset);
}



function updateWhatsNewScrollY(x, w, h, bounds, yOffset)
{
    if (   whatsNewDialog.mouseOver
        && bounds.bottom - bounds.top > h)
    {
        const height = sqr(h) / bounds.height - 2*smallScrollGap;

        whatsNewScrollbarY.style.display = 'inline-block';
        whatsNewScrollbarY.style.height  =  height;
        whatsNewScrollbarY.style.left    =  x + w - smallScrollGap - 6;
        whatsNewScrollbarY.style.top     =  yOffset - (bounds.top - 100) * h / bounds.height;
    }
    else
       whatsNewScrollbarY.style.display = 'none';
}