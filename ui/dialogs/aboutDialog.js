function initAboutDialog()
{
    // initCheckbox(chkAboutHideWhatsNew, 'Show what\'s new at startup', settings.showWhatsNew);
    // chkAboutHideWhatsNew.addEventListener('change', () => uiSetLocalData('showWhatsNew', chkAboutHideWhatsNew.checked ? (generatorVersion-1) : (generatorVersion)));

    aboutBack .addEventListener('pointerdown', e  => e.preventDefault());
    aboutBack .addEventListener('pointerdown', () => hideAboutDialog());
    aboutClose.addEventListener('pointerdown', e  => e.stopPropagation());

    aboutVersion.innerHTML = 'Generator&nbsp;&hairsp;version&nbsp;&thinsp;' + generatorVersion;
}



function showAboutDialog()
{
    aboutBack  .style.display = 'block';
    aboutDialog.style.display = 'block';

    //aboutUserId.innerHTML = '<span style="user-select: none; color: var(--figma-color-bg-disabled-secondary);">Your Figma user ID:&nbsp;&nbsp;</span>' + currentUser.id;

    dialogShown = true;
}



function hideAboutDialog()
{
    aboutBack  .style.display = 'none';
    aboutDialog.style.display = 'none';

    dialogShown = false;
}



function copyUserId()
{
    writeTextToClipboard(currentUser.id);
    selectElementText("aboutUserId");
    uiNotify('Copied user ID');
}



aboutBack.addEventListener('pointerdown', () =>
{
    hideAboutDialog();
});
