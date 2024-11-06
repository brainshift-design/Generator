function versionWarningAssert(condition, error, showDebugButton = true)
{
    if (condition) return;

    initVersionWarningDialog(error, null, showDebugButton);
    showVersionWarningDialog();

    addMetricsEvent('CRASH', error);

    consoleError(error);
}



function initVersionWarningDialog(showDebugButton = true)
{
    versionWarningDialog.addEventListener('pointerdown', e => {                     hideAllMenus(); });
    versionWarningBack  .addEventListener('pointerdown', e => { e.preventDefault(); hideAllMenus(); });

    btnVersionWarningDebugMode.addEventListener('click', () => uiRestartGenerator(true));
    btnVersionWarningDebugMode.style.display = showDebugButton ? 'block' : 'none';
}



function showVersionWarningDialog()
{
    showDialog(versionWarningDialog, versionWarningBack);
}