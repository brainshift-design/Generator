var maxSolveIterationsDialogVisible = false;



function showMaxSolveIterationsDialog()
{
    if (minZoomDialogVisible)
        hideMinZoomDialog();


    maxSolveIterationsDialog.style.left      = '50%';
    maxSolveIterationsDialog.style.top       = '50%';
    maxSolveIterationsDialog.style.transform = 'translateX(-50%) translateY(-50%)';

    maxSolveIterationsDialog.style.display   = 'block';
    maxSolveIterationsDialogVisible          = true;
  
    maxSolveIterationsTitle.buttonDown0      = false;
       
    maxSolveIterationsTitle.moveStart        = point_NaN;
    maxSolveIterationsTitle.pStart           = point_NaN;
    
    maxSolveIterationsInput.value = numToString(settings.maxSolveIterations);
    maxSolveIterationsInput.select();

    window.setTimeout(() => document.getElementById("maxSolveIterationsInput").focus(), 0);
}



function hideMaxSolveIterationsDialog()
{
    maxSolveIterationsDialog.style.display = 'none';
    maxSolveIterationsDialogVisible        = false;
}



maxSolveIterationsClose.addEventListener('pointerdown', e => e.stopPropagation());



maxSolveIterationsTitle.addEventListener('pointerdown', e => 
{
    maxSolveIterationsTitle.setPointerCapture(e.pointerId);
    maxSolveIterationsTitle.buttonDown0 = true;

    maxSolveIterationsTitle.moveStart = point(maxSolveIterationsDialog.offsetLeft, maxSolveIterationsDialog.offsetTop);
    maxSolveIterationsTitle.pStart    = point(e.clientX, e.clientY);
});



maxSolveIterationsTitle.addEventListener('pointermove', e =>
{
    if (maxSolveIterationsTitle.buttonDown0)
    {
        maxSolveIterationsDialog.style.left = (maxSolveIterationsTitle.moveStart.x + (e.clientX - maxSolveIterationsTitle.pStart.x)) + 'px';
        maxSolveIterationsDialog.style.top  = (maxSolveIterationsTitle.moveStart.y + (e.clientY - maxSolveIterationsTitle.pStart.y)) + 'px';
    }
});



maxSolveIterationsTitle.addEventListener('pointerup', e =>
{
    maxSolveIterationsTitle.buttonDown0 = false;
    maxSolveIterationsTitle.releasePointerCapture(e.pointerId);
});



maxSolveIterationsInput.addEventListener('keydown', e => 
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
            const maxSolveIterations = parseInt(maxSolveIterationsInput.value);

            if (!isNaN(maxSolveIterations))
            {
                updateSetting('maxSolveIterations', maxSolveIterations);
                uiSetLocalData('maxSolveIterations', settings.maxSolveIterations);
            }

            hideMaxSolveIterationsDialog();
            break;
        }
    }
});



maxSolveIterationsInput.addEventListener('pointerup', e =>
{
    e.stopPropagation();

    if (e.button == 2)
    {
        initTextMenu(maxSolveIterationsInput);
        menuText.showAt(e.clientX, e.clientY, false, false);
    }
});
