function initRestartDialog()
{
    initCheckbox(chkHideRestart, 'Don\'t show again', !settings.showRestartInfo);

    chkHideRestart.addEventListener('change', () => updateSettingAndMenu('showRestartInfo', true, !chkHideRestart.checked));

    restartBack .addEventListener('pointerdown', e  => e.preventDefault());
    restartBack .addEventListener('pointerdown', () => hideDialog(restartDialog));
    restartClose.addEventListener('pointerdown', e  => e.stopPropagation());
}



function showRestartDialog()
{
    showDialog(restartDialog);

    chkHideRestart.checked = false;
}



restartBack.addEventListener('pointerdown', () =>
{
    hideDialog(restartDialog);
});
