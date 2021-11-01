function showProductKeyDialog()
{
    productKeyBack  .style.display = 'block';
    productKeyDialog.style.display = 'block';

    console.log(currentUser);
    //productKeyUserInfo.innerHTML = currentUser;

    menuSelect.setSelectedIndex(0);
    menuSelect.blur();

    productKeyInput.focus();
}



function hideProductKeyDialog()
{
    productKeyBack  .style.display = 'none';
    productKeyDialog.style.display = 'none';
}