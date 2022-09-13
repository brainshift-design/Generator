const settings =
{
    showNodeId:       false, // instead of name
    showWires:        true,
    
    logMessages:      false,

    logActions:       false, 

    logRawLoading:    false, 
    logRawSaving:     false, 
    
    logLoading:       false, 

    logRawRequests:   false, 
    logRawValues:     false, 
    
    logRequests:      false, 
    logValueUpdates:  false, 
    logObjectUpdates: false
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



function updateSettingAndMenu(settingName, valid, value, save = true)
{
    switch (settingName)
    {
        case 'showNodeId':        if (valid) settings.showNodeId       = value;  menuItemShowNodeId      .setChecked(settings.showNodeId      );  break;
        case 'showWires':         if (valid) settings.showWires        = value;  menuItemShowWires       .setChecked(settings.showWires       );  break;
        case 'logMessages':       if (valid) settings.logMessages      = value;  menuItemLogMessages     .setChecked(settings.logMessages     );  break;
        case 'logActions':        if (valid) settings.logActions       = value;  menuItemLogActions      .setChecked(settings.logActions      );  break;
        case 'logRawLoading':     if (valid) settings.logRawLoading    = value;  menuItemLogRawLoading   .setChecked(settings.logRawLoading   );  break;
        case 'logRawSaving':      if (valid) settings.logRawSaving     = value;  menuItemLogRawSaving    .setChecked(settings.logRawSaving    );  break;
        case 'logLoading':        if (valid) settings.logLoading       = value;  menuItemLogLoading      .setChecked(settings.logLoading      );  break;
        case 'logRawRequests':    if (valid) settings.logRawRequests   = value;  menuItemLogRawRequests  .setChecked(settings.logRawRequests  );  break;
        case 'logRawValues':      if (valid) settings.logRawValues     = value;  menuItemLogRawValues    .setChecked(settings.logRawValues    );  break;
        case 'logRequests':       if (valid) settings.logRequests      = value;  menuItemLogRequests     .setChecked(settings.logRequests     );  break;
        case 'logValueUpdates':   if (valid) settings.logValueUpdates  = value;  menuItemLogValueUpdates .setChecked(settings.logValueUpdates );  break;
        case 'logObjectUpdates':  if (valid) settings.logObjectUpdates = value;  menuItemLogObjectUpdates.setChecked(settings.logObjectUpdates);  break;
    } 

    if (save)
        uiSetLocalData(settingName, boolString(value));
}



function updateSettingsMenus()
{
    menuItemShowNodeId      .setChecked(settings.showNodeId      );
    menuItemShowWires       .setChecked(settings.showWires       );
    menuItemLogMessages     .setChecked(settings.logMessages     );
    menuItemLogActions      .setChecked(settings.logActions      );
    menuItemLogRawLoading   .setChecked(settings.logRawLoading   );
    menuItemLogRawSaving    .setChecked(settings.logRawSaving    );
    menuItemLogLoading      .setChecked(settings.logLoading      );
    menuItemLogRawRequests  .setChecked(settings.logRawRequests  );
    menuItemLogRawValues    .setChecked(settings.logRawValues    );
    menuItemLogRequests     .setChecked(settings.logRequests     );
    menuItemLogValueUpdates .setChecked(settings.logValueUpdates );
    menuItemLogObjectUpdates.setChecked(settings.logObjectUpdates);
}