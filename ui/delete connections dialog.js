function showDeleteConnectionsDialog()
{
    deleteConnectionsDialog.style.display = 'block';

    deleteConnectionsUserInfo.innerHTML = '<span style="user-select: none; color: #aaa;">User ID: </span>' + currentUser.id;

    setDefaultDeleteConnectionsInput();
    deleteConnectionsInput.value = '';
    
    window.setTimeout(() => document.getElementById('deleteConnectionsInput').focus(), 0);
}



function hideDeleteConnectionsDialog()
{
    deleteConnectionsDialog.style.display = 'none';
}



deleteConnectionsInput.addEventListener('input', () =>
{
    let val = deleteConnectionsInput.value;
    
    val = val.toUpperCase();
    val = val.replace(/[^12345679ABCDEFGHJKLMNPQRSTUVWXYZ]/g, '');
    val = val.substring(0, Math.min(val.length, 13));
    
    deleteConnectionsInput.value = val;

    // deleteConnectionsInputBack.innerHTML = 
    //       '&nbsp;'.repeat(val.length)
    //     + '•'.repeat(13 - val.length);

    
    // if (val.length == 13)
    // {
    //     if (validateProductKey(currentUser.id, val))
    //     {
    //         productKey = val;        
    //         uiSetLocalData('productKey', productKey);
            
    //         productKeyInput.blur();
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



function setBadDeleteConnectionsInput()
{
    deleteConnectionsInput.style.outline   = '2px dashed #e00';        
    deleteConnectionsInput.style.boxShadow = 'none';
}



function setGoodDeleteConnectionsInput()
{
    deleteConnectionsInput.style.outline   = 'none';
    deleteConnectionsInput.style.boxShadow = '0 0 0 2px #0b0';
}



function setDefaultDeleteConnectionsInput()
{
    deleteConnectionsInput.style.outline   = 'none';
    deleteConnectionsInput.style.boxShadow = '0 0 0 2px var(--figma-color-bg-brand)'; 
}