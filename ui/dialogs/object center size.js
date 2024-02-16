var objectCenterSizeDialogVisible = false;



function showObjectCenterSizeDialog()
{
    if (minZoomDialogVisible)
        hideMinZoomDialog();


    objectCenterSizeDialog.style.left      = '50%';
    objectCenterSizeDialog.style.top       = '50%';
    objectCenterSizeDialog.style.transform = 'translateX(-50%) translateY(-50%)';

    objectCenterSizeDialog.style.display   = 'block';
    objectCenterSizeDialogVisible          = true;
  
    objectCenterSizeTitle.buttonDown0      = false;
       
    objectCenterSizeTitle.moveStart        = point_NaN;
    objectCenterSizeTitle.pStart           = point_NaN;
    
    objectCenterSizeInput.value = numToString(settings.objectCenterSize);
    objectCenterSizeInput.select();

    window.setTimeout(() => document.getElementById("objectCenterSizeInput").focus(), 0);
}



function hideObjectCenterSizeDialog()
{
    objectCenterSizeDialog.style.display = 'none';
    objectCenterSizeDialogVisible        = false;
}



objectCenterSizeClose.addEventListener('pointerdown', e => e.stopPropagation());



objectCenterSizeTitle.addEventListener('pointerdown', e => 
{
    objectCenterSizeTitle.setPointerCapture(e.pointerId);
    objectCenterSizeTitle.buttonDown0 = true;

    objectCenterSizeTitle.moveStart = point(objectCenterSizeDialog.offsetLeft, objectCenterSizeDialog.offsetTop);
    objectCenterSizeTitle.pStart    = point(e.clientX, e.clientY);
});



objectCenterSizeTitle.addEventListener('pointermove', e =>
{
    if (objectCenterSizeTitle.buttonDown0)
    {
        objectCenterSizeDialog.style.left = (objectCenterSizeTitle.moveStart.x + (e.clientX - objectCenterSizeTitle.pStart.x)) + 'px';
        objectCenterSizeDialog.style.top  = (objectCenterSizeTitle.moveStart.y + (e.clientY - objectCenterSizeTitle.pStart.y)) + 'px';
    }
});



objectCenterSizeTitle.addEventListener('pointerup', e =>
{
    objectCenterSizeTitle.buttonDown0 = false;
    objectCenterSizeTitle.releasePointerCapture(e.pointerId);
});



objectCenterSizeInput.addEventListener('keydown', e => 
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
            const objectCenterSize = parseInt(objectCenterSizeInput.value);

            if (!isNaN(objectCenterSize))
            {
                updateSetting('objectCenterSize', objectCenterSize);
                uiSetLocalData('objectCenterSize', settings.objectCenterSize);

                
                graph.nodes.forEach(n => n.updateNode());
                graph.nodes.forEach(n => n.updateMeasureData());
                graph.nodes.forEach(n => n.updateHeaderLabelOffsetX());

                graph.updatePages();

                pushUpdate(null, graph.nodes.filter(n => n.active));
            }

            hideObjectCenterSizeDialog();
            break;
        }
    }
});



objectCenterSizeInput.addEventListener('pointerup', e =>
{
    e.stopPropagation();

    if (e.button == 2)
    {
        initTextMenu(objectCenterSizeInput);
        menuText.showAt(e.clientX, e.clientY, false, false);
    }
});
