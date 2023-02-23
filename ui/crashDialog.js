function initCrashDialog(event, error, source)
{
    crashDetails.innerHTML = error;

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