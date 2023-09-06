function multiplayerAssert(condition, error, showDebugButton = true)
{
    if (condition) return;

    initMultiplayerDialog(error, null, showDebugButton);
    showMultiplayerDialog();

    consoleError(error);
}



function initMultiplayerDialog(event, error, showDebugButton = true)
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

        multiplayerDetails.innerHTML += stack + '<br/>';
    }
    else
        multiplayerDetails.innerHTML += event + '<br/>';
        

    if (!multiplayered)
    {
        multiplayerBack.addEventListener('pointerdown', e => { e.preventDefault(); });

        // multiplayerDetails.addEventListener('pointerup', e =>
        // {
        //     if (e.button == 2)
        //     {
        //         e.preventDefault();
        //         e.stopImmediatePropagation();

        //         initCopyMenu();
        //         menuCopy.showAt(e.clientX, e.clientY, false, false);
        //     }
        // });
    }
}



function showMultiplayerDialog()
{
    multiplayered = true;


    if (loadRestartTimer > -1) 
    {
        clearTimeout(loadRestartTimer);
        loadRestartTimer = -1;
    }


    multiplayerBack  .style.display = 'block';
    multiplayerDialog.style.display = 'block';

    dialogShown = true;
}



function hideMultiplayerDialog()
{
    multiplayerBack  .style.display = 'none';
    multiplayerDialog.style.display = 'none';

    dialogShown = false;
}