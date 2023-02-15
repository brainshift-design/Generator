var productKey = '';



function showProductKeyDialog()
{
    productKeyBack  .style.display = 'block';
    productKeyDialog.style.display = 'block';


    //productKeyUserName.innerHTML = currentUser.name;
    productKeyUserId.innerHTML = '<span style="user-select: none; color: var(--figma-color-bg-disabled);">User ID:&nbsp;&nbsp;</span>' + currentUser.id;

    setDefaultProductKeyInput();
    productKeyInputBack.innerHTML = '•'.repeat(13);
    productKeyInput.value = '';

    
    window.setTimeout(() => document.getElementById('productKeyInput').focus(), 0);
}



function copyProductKey()
{
    writeTextToClipboard(currentUser.id);
    selectElementText('productKeyUserId');
    uiNotify('Copied user ID');
}



function hideProductKeyDialog()
{
    productKeyBack  .style.display = 'none';
    productKeyDialog.style.display = 'none';
}



productKeyClose.addEventListener('pointerdown', e => e.stopPropagation());



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
                uiNotify(
                    '✨ ' + GENERATOR_LOGO + '  Thank you for subscribing to Generator! ✨', 
                    {delay: 6000});
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