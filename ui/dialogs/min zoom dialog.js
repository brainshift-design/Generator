function showMinZoomDialog()
{
    minZoomDialog.style.left      = '50%';
    minZoomDialog.style.top       = '50%';
    minZoomDialog.style.transform = 'translateX(-50%) translateY(-50%)';

    
    minZoomTitle.buttonDown0      = false;
    
    minZoomTitle.moveStart        = point_NaN;
    minZoomTitle.pStart           = point_NaN;
    
    minZoomInput.value = numToString(settings.minZoomForParams * 100, -1) + '%';
    minZoomInput.select();


    showDialog(minZoomDialog);


    window.setTimeout(() => document.getElementById("minZoomInput").focus(), 0);
}



minZoomClose.addEventListener('pointerdown', e => e.stopPropagation());



minZoomTitle.addEventListener('pointerdown', e => 
{
    minZoomTitle.setPointerCapture(e.pointerId);
    minZoomTitle.buttonDown0 = true;

    minZoomTitle.moveStart = point(minZoomDialog.offsetLeft, minZoomDialog.offsetTop);
    minZoomTitle.pStart    = point(e.clientX, e.clientY);
});



minZoomTitle.addEventListener('pointermove', e =>
{
    if (minZoomTitle.buttonDown0)
    {
        minZoomDialog.style.left = (minZoomTitle.moveStart.x + (e.clientX - minZoomTitle.pStart.x)) + 'px';
        minZoomDialog.style.top  = (minZoomTitle.moveStart.y + (e.clientY - minZoomTitle.pStart.y)) + 'px';
    }
});



minZoomTitle.addEventListener('pointerup', e =>
{
    minZoomTitle.buttonDown0 = false;
    minZoomTitle.releasePointerCapture(e.pointerId);
});



minZoomInput.addEventListener('keydown', e => 
{
    e.stopPropagation();

    
    if (   (   e.key < '0' 
            || e.key > '9')
        &&  e.key != '.'
        &&  e.key != '%'
        &&  e.code != 'Backspace'
        &&  e.code != 'Delete'
        &&  e.code != 'Enter'
        &&  e.code != 'NumpadEnter'
        && !isArrowKey(e.code))
        e.preventDefault();    
        
        
    switch (e.code)
    {
        case 'Enter':
        case 'NumpadEnter':
        {
            const minZoom = parseFloat(minZoomInput.value.replace('%', ''));

            if (!isNaN(minZoom))
            {
                updateSetting('minZoomForParams', minZoom / 100);
                uiSetLocalData('minZoomForParams', settings.minZoomForParams);
                
                updateZoomIcon();
            }

            hideDialog(minZoomDialog);
            break;
        }
    }
});



minZoomInput.addEventListener('pointerup', e =>
{
    e.stopPropagation();

    if (e.button == 2)
    {
        initTextMenu(minZoomInput);
        menuText.showAt(e.clientX, e.clientY, false, false);
    }
});
