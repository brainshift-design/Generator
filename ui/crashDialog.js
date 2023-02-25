function initCrashDialog(event, error)
{
    let stack = error.stack;

    stack = stack.replaceAll('.<', '<');
    stack = stack.replaceAll(/\(?data[a-zA-Z0-9/,;:=]*\)?/g, '');
    stack = stack.replaceAll('at \n', '');
    stack = stack.replaceAll('at ', '<br/>&nbsp;&nbsp;&nbsp;&nbsp;at ');

    crashDetails.innerHTML = stack;


    crashBack.addEventListener('pointerdown', e => { e.preventDefault(); });

    chkCrashRestart.addEventListener('change', () => uiSetLocalData('dataMode', boolToString(chkCrashRestart.checked)));
}



function showCrashDialog()
{
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