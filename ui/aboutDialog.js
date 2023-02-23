function initAboutDialog()
{
    // initCheckbox(chkAboutHideWhatsNew, 'Show what\'s new at startup', settings.showWhatsNew);
    // chkAboutHideWhatsNew.addEventListener('change', () => uiSetLocalData('showWhatsNew', chkAboutHideWhatsNew.checked ? (generatorVersion-1) : (generatorVersion)));

    aboutBack.addEventListener('pointerdown', e => { e.preventDefault(); });

    aboutVersion.innerHTML = '&hairsp;Version&nbsp;&thinsp;' + generatorVersion;
}



function showAboutDialog()
{
    aboutBack  .style.display = 'block';
    aboutDialog.style.display = 'block';

    dialogShown = true;
}



function hideAboutDialog()
{
    aboutBack  .style.display = 'none';
    aboutDialog.style.display = 'none';

    dialogShown = false;
}



aboutClose.addEventListener('pointerdown', e => e.stopPropagation());
aboutBack.addEventListener('pointerdown', () => { hideAboutDialog(); });



aboutBack.addEventListener('pointerdown', () =>
{
    hideAboutDialog();
});
