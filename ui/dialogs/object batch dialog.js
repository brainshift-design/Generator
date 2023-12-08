var objectBatchDialogVisible = false;



function showObjectBatchDialog()
{
    if (minZoomDialogVisible)
        hideMinZoomDialog();


    objectBatchDialog.style.left      = '50%';
    objectBatchDialog.style.top       = '50%';
    objectBatchDialog.style.transform = 'translateX(-50%) translateY(-50%)';

    objectBatchDialog.style.display   = 'block';
    objectBatchDialogVisible          = true;
  
    objectBatchTitle.buttonDown0      = false;
       
    objectBatchTitle.moveStart        = point_NaN;
    objectBatchTitle.pStart           = point_NaN;
    
    objectBatchInput.value = numToString(settings.objectBatchSize);
    objectBatchInput.select();

    window.setTimeout(() => document.getElementById("objectBatchInput").focus(), 0);
}



function hideObjectBatchDialog()
{
    objectBatchDialog.style.display = 'none';
    objectBatchDialogVisible        = false;
}



objectBatchClose.addEventListener('pointerdown', e => e.stopPropagation());



objectBatchTitle.addEventListener('pointerdown', e => 
{
    objectBatchTitle.setPointerCapture(e.pointerId);
    objectBatchTitle.buttonDown0 = true;

    objectBatchTitle.moveStart = point(objectBatchDialog.offsetLeft, objectBatchDialog.offsetTop);
    objectBatchTitle.pStart    = point(e.clientX, e.clientY);
});



objectBatchTitle.addEventListener('pointermove', e =>
{
    if (objectBatchTitle.buttonDown0)
    {
        objectBatchDialog.style.left = (objectBatchTitle.moveStart.x + (e.clientX - objectBatchTitle.pStart.x)) + 'px';
        objectBatchDialog.style.top  = (objectBatchTitle.moveStart.y + (e.clientY - objectBatchTitle.pStart.y)) + 'px';
    }
});



objectBatchTitle.addEventListener('pointerup', e =>
{
    objectBatchTitle.buttonDown0 = false;
    objectBatchTitle.releasePointerCapture(e.pointerId);
});



objectBatchInput.addEventListener('keydown', e => 
{
    e.stopPropagation();

    
    if (   (   e.key < '0' 
            || e.key > '9')
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
            const objectBatchSize = parseInt(objectBatchInput.value);

            if (!isNaN(objectBatchSize))
            {
                updateSetting('objectBatchSize', objectBatchSize);
                uiSetLocalData('objectBatchSize', settings.objectBatchSize);
            }

            hideObjectBatchDialog();
            break;
        }
    }
});



objectBatchInput.addEventListener('pointerup', e =>
{
    e.stopPropagation();

    if (e.button == 2)
    {
        initTextMenu(objectBatchInput);
        menuText.showAt(e.clientX, e.clientY, false, false);
    }
});
