
function showWhatsNewDialog()
{
    whatsNewBack  .style.display = 'block';
    whatsNewDialog.style.display = 'block';


    // whatsNewUserName.innerHTML = currentUser.name;
    // whatsNewUserId  .innerHTML = '<span style="user-select: none; color: #aaa;">ID:&nbsp;&nbsp;</span>' + currentUser.id;

    // setDefaultWhatsNewInput();
    // whatsNewInputBack.innerHTML = '•'.repeat(13);
    // whatsNewInput.value = '';

    
    // window.setTimeout(() => document.getElementById('whatsNewInput').focus(), 0);
}



function hideWhatsNewDialog()
{
    whatsNewBack  .style.display = 'none';
    whatsNewDialog.style.display = 'none';
}



whatsNewClose.addEventListener('pointerdown', e => e.stopPropagation());



whatsNewBack.addEventListener('pointerdown', () =>
{
    hideWhatsNewDialog();
});