function showDeleteConnectionsDialog()
{
    deleteConnectionsDialog.style.left      = '50%';
    deleteConnectionsDialog.style.top       = '50%';
    deleteConnectionsDialog.style.transform = 'translateX(-50%) translateY(-50%)';

    deleteConnectionsDialog.style.display  = 'block';
 
    deleteConnectionsTitle.buttonDown0     = false;
      
    deleteConnectionsTitle.moveStart       = point_NaN;
    deleteConnectionsTitle.pStart          = point_NaN;
   
    deleteConnectionsInput.value           = '';
    deleteConnectionsInput.focus();
    
    window.setTimeout(() => document.getElementById('deleteConnectionsInput').focus(), 0);
}



function hideDeleteConnectionsDialog()
{
    deleteConnectionsDialog.style.display = 'none';
}



deleteConnectionsTitle.addEventListener('pointerdown', e => 
{
    deleteConnectionsTitle.setPointerCapture(e.pointerId);
    deleteConnectionsTitle.buttonDown0 = true;

    deleteConnectionsTitle.moveStart = point(deleteConnectionsDialog.offsetLeft, deleteConnectionsDialog.offsetTop);
    deleteConnectionsTitle.pStart    = point(e.clientX, e.clientY);
});



deleteConnectionsTitle.addEventListener('pointermove', e =>
{
    if (deleteConnectionsTitle.buttonDown0)
    {
        deleteConnectionsDialog.style.left = (deleteConnectionsTitle.moveStart.x + (e.clientX - deleteConnectionsTitle.pStart.x)) + 'px';
        deleteConnectionsDialog.style.top  = (deleteConnectionsTitle.moveStart.y + (e.clientY - deleteConnectionsTitle.pStart.y)) + 'px';
    }
});



deleteConnectionsTitle.addEventListener('pointerup', e =>
{
    deleteConnectionsTitle.buttonDown0 = false;
    deleteConnectionsTitle.releasePointerCapture(e.pointerId);
});



deleteConnectionsInput.addEventListener('input', () =>
{
    let val = deleteConnectionsInput.value;
    
    // val = val.toUpperCase();
    // val = val.replace(/[^12345679ABCDEFGHJKLMNPQRSTUVWXYZ]/g, '');
    // val = val.substring(0, Math.min(val.length, 13));
    
    deleteConnectionsInput.value = val;

    // deleteConnectionsInputBack.innerHTML = 
    //       '&nbsp;'.repeat(val.length)
    //     + '•'.repeat(13 - val.length);

    
    // if (val.length == 13)
    // {
    //     if (validatedeleteConnections(currentUser.id, val))
    //     {
    //         deleteConnections = val;        
    //         uiSetLocalData('deleteConnections', deleteConnections);
            
    //         deleteConnectionsInput.blur();
    //         setGoodDeleteConnectionsInput();
            
    //         window.setTimeout(() => 
    //         {
    //             hideDeleteConnectionsDialog();
    //             uiNotify('✨ ' + GENERATOR_LOGO + '  Thank you for subscribing to Generator! ✨', 6000, false, '');
    //         }, 
    //         1200);
    //     }
    //     else
    //         setBadDeleteConnectionsInput();
    // }
    // else
    //     setDefaultDeleteConnectionsInput();
});



deleteConnectionsInput.addEventListener('pointerup', () =>
{
    deleteConnectionsInput.select();
});