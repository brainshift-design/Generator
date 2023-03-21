var productKey = NULL;



function onValidateClick(key)
{
    if (productKeyInput.disabled)
    {
        licenseInfo.innerHTML = '';

        validateProductKeyButton.innerHTML = 'Validate';

        productKeyInput.disabled = false
        productKeyInput.style.display = 'inline-block';

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
    
    
    const license = 
        productKey != NULL
        ? validateLicense(currentUser.id, productKey)
        : null;

    console.log('2 license =', license);
    
    productKeyInputBack.innerHTML = license ? '' : '•'.repeat(13);
    
    productKeyInput.value         = productKey;
    productKeyInput.disabled      = license;
    
    productKeyInput.style.display = license ? 'none' : 'inline'

    updateLicenseInfo(license);
    
    productKeyTextBack.style.display   = license ? 'none' : 'inline';
    validateProductKeyButton.innerHTML = license ? 'Edit' : 'Validate';


    if (license) setDisabledProductKeyInput();
    else         setDefaultProductKeyInput();
    
    window.setTimeout(() => document.getElementById('productKeyInput').focus(), 0);

    dialogShown = true;
}



function copyUserId()
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

        const subscribed = 
               productKey != NULL
            && (      productKeyInput.selectionStart == productKeyInput.selectionEnd
                   && productKeyInput.value == productKey
                || getSelectedText(productKeyInput) == productKey);

        if (e.button == 2)
        {
            e.preventDefault();
            e.stopPropagation();

            updateMenuItemDisplay(menuItemLicenseSep1  .div, subscribed);
            updateMenuItemDisplay(menuItemLicenseRemove.div, subscribed);

            menuRemoveLicense.showAt(e.clientX, e.clientY, false);
        }
    }
});

productKeyInput.addEventListener('keydown', e =>
{
    if (e.code == 'Escape')
        productKeyInput.blur();

    e.stopPropagation();
});



productKeyInput.addEventListener('input', () =>
{
    let val = productKeyInput.value;
    
    val = val.toUpperCase();
    val = val.replace(/[^12345679ABCDEFGHJKLMNPQRSTUVWXYZ]/g, '');
    val = val.substring(0, Math.min(val.length, 13));
    
    productKeyInput.value = val;

    updateProductKeyDots();
});



function updateProductKeyDots()
{
    productKeyInputBack.innerHTML = 
          '&nbsp;'.repeat(productKeyInput.value.length)
        + '•'.repeat(13 - productKeyInput.value.length);
}



function setBadProductKeyInput()
{
    productKeyInput.style.outline   = '2px dashed #e00';        
    productKeyTextBack.style.display = 'none';
}



function setDefaultProductKeyInput()
{
    productKeyInput.style.outline    = 'none';
    productKeyTextBack.style.display = 'inline';
}



function setDisabledProductKeyInput()
{
    productKeyInput.style.outline   = 'none';
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

        productKeyInput.disabled         = true;
        productKeyTextBack.style.display = 'none';
        productKeyInput   .style.display = 'none';

        validateProductKeyButton.innerHTML = 'Edit';

        uiNotify('✨   Thank you for subscribing to Generator !   ✨', {delay: 6000});
    }
    else
    {
        setBadProductKeyInput();
    }
}



function updateLicenseInfo(license)
{
    if (license)
    {
        const strPrep =
                    license.lastYear
            + '-' + license.lastMonth.toString().padStart(2, '0')
            + '-' + license.lastDay  .toString().padStart(2, '0');

        const date    = new Date(Date.parse(strPrep));
        const strDate = date.toLocaleString('en-UK', {dateStyle: 'medium'});

        licenseInfo.innerHTML = 'Expires on: <span style="font-weight: 600">' + strDate.replaceAll('/', '&hairsp;/&hairsp;') + '</span>';
    }
    else
    {
        licenseInfo.innerHTML = '';
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
