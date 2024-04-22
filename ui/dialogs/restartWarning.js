function initRestartDialog()
{
    initCheckbox(chkHideRestart, 'Don\'t show again', !settings.showRestartInfo);

    chkHideRestart.addEventListener('change', () => updateSettingAndMenu('showRestartInfo', true, !chkHideRestart.checked));

    restartBack .addEventListener('pointerdown', e  => e.preventDefault());
    restartBack .addEventListener('pointerdown', () => hideRestartDialog());
    restartClose.addEventListener('pointerdown', e  => e.stopPropagation());
}



function showRestartDialog()
{
    restartBack  .style.display = 'block';
    restartDialog.style.display = 'block';

    chkHideRestart.checked = false;
    
    dialogShown = true;
}



function hideRestartDialog()
{
    restartBack  .style.display = 'none';
    restartDialog.style.display = 'none';

    dialogShown = false;
}



restartBack.addEventListener('pointerdown', () =>
{
    hideRestartDialog();
});
