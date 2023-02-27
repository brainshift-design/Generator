var productKey = NULL;



function onValidateClick(key)
{
    if (productKeyInput.disabled)
    {
        validateProductKeyButton.innerHTML = 'Validate';

        productKeyInput.disabled = false
        productKeyInput.style.display = 'inline-block';

        licenseInfo.innerHTML = '';

        setDefaultProductKeyInput();

        productKeyInput.focus();
        productKeyInput.select();
    }
    else
    {
        tryValidateLicense(key);
    }
}



function removeLicense()
{
    productKey = NULL;
    uiSetLocalData('productKey', NULL);

    productKeyInputBack.innerHTML = '•'.repeat(13);
    productKeyInput.value         = '';

    enableFeatures(false, settings.enableBetaFeatures);
}



function showProductKeyDialog()
{
    productKeyBack  .style.display = 'block';
    productKeyDialog.style.display = 'block';


    productKeyUserId.innerHTML = '<span style="user-select: none; color: var(--figma-color-bg-disabled-secondary);">User ID:&nbsp;&nbsp;</span>' + currentUser.id;
    setDefaultProductKeyInput();
    
    
    const license = 
        productKey != NULL
        ? validateLicense(currentUser.id, productKey)
        : null;

    
    productKeyInputBack.innerHTML = license ? '' : '•'.repeat(13);
    
    productKeyInput.value         = productKey;
    productKeyInput.disabled      = license;
    
    productKeyInput.style.display = license ? 'none' : 'inline-block'

    updateLicenseInfo(license);
    

    validateProductKeyButton.innerHTML = license ? 'Edit' : 'Validate';

    if (license) setDisabledProductKeyInput();
    else         setDefaultProductKeyInput();
    
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

productKeyInput.addEventListener('pointerdown', e => 
{ 
    if (!productKeyInput.disabled)
    {
        setDefaultProductKeyInput(); 

        if (   e.button == 2
            && productKey != NULL
            && productKeyInput.value == productKey)
        {
            e.preventDefault();
            e.stopPropagation();

            productKeyInput.select();

            menuRemoveLicense.showAt(e.clientX, e.clientY, false);
        }
    }
});

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



function setDisabledProductKeyInput()
{
    productKeyInput.style.outline   = 'none';
    productKeyInput.style.boxShadow = 'none';//0 0 0 1px var(--figma-color-bg-tertiary)'; 
}



function tryValidateLicense(key)
{
    let license;

    if (license = validateLicense(currentUser.id, key))
    {
        productKey = key;
        uiSetLocalData('productKey', key);

        enableFeatures(productKey != NULL, settings.enableBetaFeatures);
        
        setDisabledProductKeyInput();
        updateLicenseInfo(license);

        productKeyInput.disabled      = true;
        productKeyInput.style.display = 'none';

        validateProductKeyButton.innerHTML = 'Edit';

        uiNotify('✨ Thank you for subscribing to Generator! ✨', {delay: 6000});
    }
    else
    {
        setBadProductKeyInput();
    }
}



function updateLicenseInfo(license)
{
    licenseInfo.innerHTML = 
        license
        ?  'Valid until <span style="font-weight: 600">' 
          + license.lastDay  .toString().padStart(2, '0') + '&hairsp;/&hairsp;'
          + license.lastMonth.toString().padStart(2, '0') + '&hairsp;/&hairsp;'
          + license.lastYear + '</span>'
        : '';
}



function startupValidateLicense()
{
    if (!validateLicense(currentUser.id, productKey))
    {
        productKey = NULL;
        uiSetLocalData('productKey', NULL);
    }
}