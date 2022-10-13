var productKey = '';



function showProductKeyDialog()
{
    productKeyBack  .style.display = 'block';
    productKeyDialog.style.display = 'block';

    productKeyUserInfo.innerHTML = '<span style="user-select: none; color: #aaa;">User ID: </span>' + currentUser.id;

    setDefaultProductKeyInput();
    productKeyInputBack.innerHTML = '•'.repeat(13);
    productKeyInput.value = '';
    
    //menuSelect.setSelectedIndex(0);
    
    window.setTimeout(() => document.getElementById('productKeyInput').focus(), 0);
}



function hideProductKeyDialog()
{
    productKeyBack  .style.display = 'none';
    productKeyDialog.style.display = 'none';
}



productKeyBack.addEventListener('pointerdown', () =>
{
    hideProductKeyDialog();
});



productKeyInput.addEventListener('input', () =>
{
    let val = productKeyInput.value;
    
    val = val.toUpperCase();
    val = val.replace(/[^12345679ABCDEFGHJKLMNPQRSTUVWXYZ]/g, '');
    val = val.substring(0, Math.min(val.length, 13));
    
    productKeyInput.value = val;

    productKeyInputBack.innerHTML = 
          '&nbsp;'.repeat(val.length)
        + '•'.repeat(13 - val.length);

    
    if (val.length == 13)
    {
        if (validateProductKey(currentUser.id, val))
        {
            productKey = val;        
            uiSetLocalData('productKey', productKey);
            
            productKeyInput.blur();
            setGoodProductKeyInput();
            
            window.setTimeout(() => 
            {
                hideProductKeyDialog();
                //updateMenuSelectItems();

                uiNotify('✨ ' + GENERATOR_LOGO + '  Thank you for subscribing to Generator! ✨', 6000, false, '');
            }, 
            1200);
        }
        else
            setBadProductKeyInput();
    }
    else
        setDefaultProductKeyInput();
});



function setBadProductKeyInput()
{
    productKeyInput.style.outline   = '2px dashed #e00';        
    productKeyInput.style.boxShadow = 'none';
}



function setGoodProductKeyInput()
{
    productKeyInput.style.outline   = 'none';
    productKeyInput.style.boxShadow = '0 0 0 2px #0b0';
}



function setDefaultProductKeyInput()
{
    productKeyInput.style.outline   = 'none';
    productKeyInput.style.boxShadow = '0 0 0 2px var(--figma-color-bg-brand)'; 
}