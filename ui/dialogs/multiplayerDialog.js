let multiplayerEnabled = false;



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
        

    multiplayerBack.addEventListener('pointerdown', e => { e.preventDefault(); });
}



function showMultiplayerDialog()
{
    showDialog(multiplayerDialog, multiplayerBack);
}