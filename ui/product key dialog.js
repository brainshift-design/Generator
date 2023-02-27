var productKey = '';



function showProductKeyDialog()
{
    productKeyBack  .style.display = 'block';
    productKeyDialog.style.display = 'block';


    //productKeyUserName.innerHTML = currentUser.name;
    productKeyUserId.innerHTML = '<span style="user-select: none; color: var(--figma-color-bg-disabled-secondary);">User ID:&nbsp;&nbsp;</span>' + currentUser.id;
    setDefaultProductKeyInput();

    productKeyInputBack.innerHTML = '•'.repeat(13);
    productKeyInput.value = '';

    
    window.setTimeout(() => document.getElementById('productKeyInput').focus(), 0);

    dialogShown = true;
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

    dialogShown = false;
}



productKeyClose.addEventListener('pointerdown', e => e.stopPropagation());
productKeyBack.addEventListener('pointerdown', () => { hideProductKeyDialog(); });

productKeyInput.addEventListener('pointerdown', () => { setDefaultProductKeyInput(); });

productKeyInput.addEventListener('keydown', e =>
{
    e.stopPropagation();
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



function tryValidateLicense(key)
{
    if (validateLicense(currentUser.id, key))
    {
        productKey = key;
        uiSetLocalData('productKey', key);

        enableFeatures(productKey != NULL, settings.enableBetaFeatures);

        hideProductKeyDialog();

        uiNotify('✨ Thank you for subscribing to Generator! ✨', {delay: 6000});
    }
    else
    {
        setBadProductKeyInput();
    }
}



function startupValidateLicense()
{
    if (!validateLicense(currentUser.id, productKey))
    {
        productKey = NULL;
        uiSetLocalData('productKey', NULL);
    }
}