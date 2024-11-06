function initAboutDialog()
{
    // initCheckbox(chkAboutHideWhatsNew, 'Show what\'s new at startup', settings.showWhatsNew);
    // chkAboutHideWhatsNew.addEventListener('change', () => uiSetLocalData('showWhatsNew', chkAboutHideWhatsNew.checked ? (generatorVersion-1) : (generatorVersion)));

    aboutBack.addEventListener('pointerdown', e => 
    {
        e.preventDefault();
        hideDialog(aboutDialog);
    });

    aboutClose.addEventListener('pointerdown', e  => e.stopPropagation());

    aboutVersion  .innerHTML = 'Generator&nbsp;&hairsp;version&nbsp;&thinsp;' + generatorVersion;
    aboutCopyright.innerHTML = 'Copyright © ' + new Date().getFullYear().toString() + '&nbsp;&hairsp;Brainshift';
}



function showAboutDialog()
{
    showDialog(aboutDialog, aboutBack);

    //aboutUserId.innerHTML = '<span style="user-select: none; color: var(--figma-color-bg-disabled-secondary);">Your Figma user ID:&nbsp;&nbsp;</span>' + currentUser.id;
}



function copyUserId()
{
    writeTextToClipboard(currentUser.id);
    selectElementText("debugUserId");
    uiNotify('Copied user ID');
}



aboutBack.addEventListener('pointerdown', () =>
{
    hideDialog(aboutDialog);
});
