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
}



function hideAboutDialog()
{
    aboutBack  .style.display = 'none';
    aboutDialog.style.display = 'none';
}



aboutClose.addEventListener('pointerdown', e => e.stopPropagation());



aboutBack.addEventListener('pointerdown', () =>
{
    hideAboutDialog();
});
