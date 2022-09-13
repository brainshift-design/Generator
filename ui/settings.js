const settings =
{
    showNodeId:       false, // instead of name
    showWires:        true,
    
    logMessages:      false,

    logActions:       true, 

    logRawLoading:    false, 
    logRawSaving:     false, 
    
    logLoading:       false, 

    logRawRequests:   false, 
    logRawValues:     false, 
    
    logRequests:      true, 
    logValueUpdates:  true, 
    logObjectUpdates: true
};



function updateSetting(settingName, value)
{
    switch (settingName)
    {
        case 'showNodeId':        settings.showNodeId       = value;  break;
        case 'showWires':         settings.showWires        = value;  break;
        case 'logMessages':       settings.logMessages      = value;  break;
        case 'logActions':        settings.logActions       = value;  break;
        case 'logRawLoading':     settings.logRawLoading    = value;  break;
        case 'logRawSaving':      settings.logRawSaving     = value;  break;
        case 'logLoading':        settings.logLoading       = value;  break;
        case 'logRawRequests':    settings.logRawRequests   = value;  break;
        case 'logRawValues':      settings.logRawValues     = value;  break;
        case 'logRequests':       settings.logRequests      = value;  break;
        case 'logValueUpdates':   settings.logValueUpdates  = value;  break;
        case 'logObjectUpdates':  settings.logObjectUpdates = value;  break;
    } 
}



function updateSettingAndMenu(settingName, value, save = true)
{
    switch (settingName)
    {
        case 'showNodeId':        settings.showNodeId       = value;  menuItemShowNodeId   .setChecked(settings.showNodeId      );  break;
        case 'showWires':         settings.showWires        = value;  menuItemShowWires    .setChecked(settings.showWires       );  break;
        case 'logMessages':       settings.logMessages      = value;  menuItemMessages     .setChecked(settings.logMessages     );  break;
        case 'logActions':        settings.logActions       = value;  menuItemActions      .setChecked(settings.logActions      );  break;
        case 'logRawLoading':     settings.logRawLoading    = value;  menuItemRawLoading   .setChecked(settings.logRawLoading   );  break;
        case 'logRawSaving':      settings.logRawSaving     = value;  menuItemRawSaving    .setChecked(settings.logRawSaving    );  break;
        case 'logLoading':        settings.logLoading       = value;  menuItemLoading      .setChecked(settings.logLoading      );  break;
        case 'logRawRequests':    settings.logRawRequests   = value;  menuItemRawRequests  .setChecked(settings.logRawRequests  );  break;
        case 'logRawValues':      settings.logRawValues     = value;  menuItemRawValues    .setChecked(settings.logRawValues    );  break;
        case 'logRequests':       settings.logRequests      = value;  menuItemRequests     .setChecked(settings.logRequests     );  break;
        case 'logValueUpdates':   settings.logValueUpdates  = value;  menuItemValueUpdates .setChecked(settings.logValueUpdates );  break;
        case 'logObjectUpdates':  settings.logObjectUpdates = value;  menuItemObjectUpdates.setChecked(settings.logObjectUpdates);  break;
    } 

    if (save)
        uiSetLocalData(settingName, boolString(value));
}



function updateSettingsMenus()
{
    menuItemShowNodeId   .setChecked(settings.showNodeId      );
    menuItemShowWires    .setChecked(settings.showWires       );
    menuItemMessages     .setChecked(settings.logMessages     );
    menuItemActions      .setChecked(settings.logActions      );
    menuItemRawLoading   .setChecked(settings.logRawLoading   );
    menuItemRawSaving    .setChecked(settings.logRawSaving    );
    menuItemLoading      .setChecked(settings.logLoading      );
    menuItemRawRequests  .setChecked(settings.logRawRequests  );
    menuItemRawValues    .setChecked(settings.logRawValues    );
    menuItemRequests     .setChecked(settings.logRequests     );
    menuItemValueUpdates .setChecked(settings.logValueUpdates );
    menuItemObjectUpdates.setChecked(settings.logObjectUpdates);
}