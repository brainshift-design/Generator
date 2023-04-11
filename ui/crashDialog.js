function crashAssert(condition, error)
{
    if (condition) return;

    initCrashDialog(error, null);
    showCrashDialog();

    console.assert(false, error);
}



function initCrashDialog(event, error)
{
    if (error)
    {
        let stack = error.stack
            .replaceAll('<anonymous>', '')
            .replaceAll('.<', '<')
            .replaceAll(/\(?data[a-zA-Z0-9/,;:=]*\)?/g, '')
            .replaceAll('at \n', '')
            .replaceAll('at ', '<br/>&nbsp;&nbsp;&nbsp;&nbsp;at ')
            .replaceAll(/\(:[^\)]*\)/g, '');

        crashDetails.innerHTML += stack + '<br/>';
    }
    else
        crashDetails.innerHTML += event + '<br/>';
        

    if (!crashed)
    {
        crashBack.addEventListener('pointerdown', e => { e.preventDefault(); });

        btnCrashRestart.addEventListener('click', () => uiRestartGenerator(true));

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

    crashBack  .style.display = 'block';
    crashDialog.style.display = 'block';

    dialogShown = true;
}



function hideCrashDialog()
{
    crashBack  .style.display = 'none';
    crashDialog.style.display = 'none';

    dialogShown = false;
}