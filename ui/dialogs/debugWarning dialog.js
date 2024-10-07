function showDebugWarningDialog(crash = false)
{
    debugWarningDialog.crash = crash;
    
    window.getSelection().removeAllRanges();

    showDialog(debugWarningDialog, debugWarningBack);
}



/////////////////////////////////////////////////////////////////////////////////////



function btnAcceptDebugWarning_onclick()
{
    btnAcceptDebugWarning.blur(); 
    hideAllMenus(); 
    
    uiSetLocalData('debugWarning', 'true');
    hideDialog(debugWarningDialog);

    updateSettingAndMenu('showDebugMenu', true, !settings.showDebugMenu); updateMenuItemShowDebugMenu();
}