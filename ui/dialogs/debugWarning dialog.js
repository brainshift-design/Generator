function showDebugWarningDialog(crash = false)
{
    debugWarningDialog.crash = crash;
    
    window.getSelection().removeAllRanges();

    debugWarningBack  .style.display = 'block';
    debugWarningDialog.style.display = 'block';

    dialogShown = true;
}



function hideDebugWarningDialog()
{
    debugWarningBack  .style.display = 'none';
    debugWarningDialog.style.display = 'none';

    dialogShown = false;
}



/////////////////////////////////////////////////////////////////////////////////////



function btnAcceptDebugWarning_onclick()
{
    btnAcceptDebugWarning.blur(); 
    hideAllMenus(); 
    
    uiSetLocalData('debugWarning', 'true');
    hideDebugWarningDialog();

    updateSettingAndMenu('showDebugMenu', true, !settings.showDebugMenu); updateMenuItemShowDebugMenu();
}