function crashAssert(condition, error, showDebugButton = true)
{
    if (condition) return;

    initCrashDialog(error, null, showDebugButton);
    showCrashDialog();

    consoleError(error);
}



function initCrashDialog(event, error = event, showDebugButton = true)
{
    if (error)
    {
        let stack = error.stack
            .replaceAll('<anonymous>', '')
            .replaceAll('.<', '<')
            .replaceAll(/\(?data[a-zA-Z0-9/,;:=]*\)?/g, '')
            .replaceAll('at \n', '')
            .replaceAll('at ', '<br/>&nbsp;&nbsp;&nbsp;&nbsp;at ')
            .replaceAll(/\(:[^\)]*\)/g, '')
            .replaceAll(/at :[0-9]+:[0-9]+/g, '');

        crashDetails.innerHTML += stack + '<br/>';
    }
    else
        crashDetails.innerHTML += event + '<br/>';
        

    if (!crashed)
    {
        crashDialog.addEventListener('pointerdown', e => {                     hideAllMenus(); });
        crashBack  .addEventListener('pointerdown', e => { e.preventDefault(); hideAllMenus(); });

        
        btnCrashSaveRestart.addEventListener('click', async () => { await uiSaveToLocalFile('crashed.gen'); clearGraph(); uiRestartGenerator(false); });
        btnCrashSaveRestart.style.display = showDebugButton ? 'block' : 'none';

        btnCrashClearRestart.addEventListener('click', () => { clearGraph(); uiRestartGenerator(false); });
        btnCrashClearRestart.style.display = showDebugButton ? 'block' : 'none';

        btnCrashRestart.addEventListener('click', () => uiGetLocalData('debugWarningCrash'));
        btnCrashRestart.style.display = showDebugButton ? 'block' : 'none';

        crashDetails.addEventListener('pointerup', e =>
        {
            if (e.button == 2)
            {
                e.preventDefault();
                e.stopImmediatePropagation();

                initCopyMenu();
                menuCopy.showAt(e.clientX, e.clientY, false, false);
            }
        });
    }
}



function showCrashDialog()
{
    crashed = true;


    if (loadRestartTimer) 
    {
        clearTimeout(loadRestartTimer);
        loadRestartTimer = null;
    }


    crashBack  .style.display = 'block';
    crashDialog.style.display = 'block';

    dialogShown = true;
}



function hideCrashDialog(hideBack = true)
{
    if (hideBack)
        crashBack.style.display = 'none';
    
    crashDialog.style.display = 'none';

    dialogShown = false;
}