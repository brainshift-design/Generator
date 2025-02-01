function crashAssert(condition, error, showDebugButton = true)
{
    if (condition) return;

    initCrashDialog(error, null, showDebugButton);
    showCrashDialog();

    addMetricsEvent('CRASH', error);

    consoleError(error);
}



function initCrashDialog(event, error = event, showDebugButton = true)
{
    let errorText = '';

    if (error)
    {
        if (error.stack)
        {
            errorText = error.stack
                .replaceAll('<anonymous>', '')
                .replaceAll('.<', '<')
                .replaceAll(/\(?data[a-zA-Z0-9/,;:=]*\)?/g, '')
                .replaceAll('at \n', '')
                .replaceAll('at ', '<br/>&nbsp;&nbsp;&nbsp;&nbsp;at ')
                .replaceAll(/\(:[^)]*\)/g, '')
                .replaceAll(/at :[0-9]+:[0-9]+/g, '');
        }
        else
        {
            errorText =
                event.reason instanceof Error
                    ? event.reason.message
                    : (event.reason ?? 'Unknown error');
        }
    }


    crashDetails.innerHTML += errorText + '<br/>';
        
    
    if (!crashed) // to prevent double creation
    {
        if (settings.shareUsageMetrics)
            //&& !ignoreUsers.includes(currentUser.id))
        {
            postToServer(
            {
                action:          'submitUserError',
                figmaId:          currentUser.id,
                generatorVersion: generatorVersion,
                sessionId:        sessionId,
                errorDetails:     errorText
            })
            .then(response =>
            {   

            })
            .catch(error =>
            {
                consoleError(error);
            });
        }


        crashDialog.addEventListener('pointerdown', e => {                     hideAllMenus(); });
        crashBack  .addEventListener('pointerdown', e => { e.preventDefault(); hideAllMenus(); });

       
        btnCrashSaveRestart.addEventListener('click', async () => { await uiSaveToLocalFile('recover.gen'); /*clearGraph();*/ uiRestartGenerator(false); });
        btnCrashSaveRestart.style.display = showDebugButton ? 'block' : 'none';

        btnCrashClearRestart.addEventListener('click', () => { clearGraph(); uiRestartGenerator(false); });
        btnCrashClearRestart.style.display = showDebugButton ? 'block' : 'none';

        btnCrashRestart.addEventListener('click', () => uiRestartGenerator(false));
        btnCrashRestart.style.display = showDebugButton ? 'block' : 'none';

        btnCrashDebugMode.addEventListener('click', () => uiGetLocalData('debugWarningCrash'));
        btnCrashDebugMode.style.display = showDebugButton ? 'block' : 'none';

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

    showDialog(crashDialog, crashBack);
}