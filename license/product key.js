var productKey = '';



function showProductKeyDialog()
{
    productKeyBack  .style.display = 'block';
    productKeyDialog.style.display = 'block';

    productKeyUserInfo.innerHTML = 'User ID: ' + currentUser.id;

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