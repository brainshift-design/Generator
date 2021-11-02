var productKey = '';



function showProductKeyDialog()
{
    productKeyBack  .style.display = 'block';
    productKeyDialog.style.display = 'block';

    productKeyUserInfo.innerHTML = '<span style="user-select: none;">User ID: </span>' + currentUser.id;

    setDefaultProductKeyInput();
    productKeyInput.value = '';
    
    menuSelect.setSelectedIndex(0);
    
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
    
    
    if (val.length == 13)
    {
        if (validateProductKey(currentUser.id, val))
        {
            productKey = val;        
            productKeyInput.blur();
            setGoodProductKeyInput();
            
            window.setTimeout(() => 
            {
                hideProductKeyDialog();
                
                let index = menuSelect.items.findIndex(item => item.value == 'productKey');
                removeAt(menuSelect.items, index);
                menuSelect.updateItems();

                uiNotify('Thank you for subscribing!', 6000);    
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
    productKeyInput.style.boxShadow = '0 0 0 2px #0c0';
}



function setDefaultProductKeyInput()
{
    productKeyInput.style.outline   = 'none';
    productKeyInput.style.boxShadow = '0 0 0 2px #18A0FB'; 
}