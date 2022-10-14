const settings =
{
    autoConnectNewNodes:   true,
    includeLxxColorSpaces: false,
    debugMode:             false,

    showNodeId:            false, // instead of name
    showWires:             true,
    
    logMessages:           false,
    logActions:            false, 
    
    logLoading:            false, 
    logRequests:           false, 
    logValueUpdates:       false, 
    logObjectUpdates:      false,
    
    logRawLoading:         false, 
    logRawSaving:          false, 
    logRawRequests:        false, 
    logRawValues:          false    
};



function updateSetting(settingName, value)
{
    switch (settingName)
    {
        case 'autoConnectNewNodes':   settings.autoConnectNewNodes   = value;  break;
        case 'includeLxxColorSpaces': settings.includeLxxColorSpaces = value;  break;
        case 'debugMode':             settings.debugMode             = value;  break;

        case 'showNodeId':            settings.showNodeId            = value;  break;
        case 'showWires':             settings.showWires             = value;  break;
   
        case 'logMessages':           settings.logMessages           = value;  break;
        case 'logActions':            settings.logActions            = value;  break;
        case 'logLoading':            settings.logLoading            = value;  break;
        case 'logRequests':           settings.logRequests           = value;  break;
        case 'logValueUpdates':       settings.logValueUpdates       = value;  break;
        case 'logObjectUpdates':      settings.logObjectUpdates      = value;  break;
   
        case 'logRawLoading':         settings.logRawLoading         = value;  break;
        case 'logRawSaving':          settings.logRawSaving          = value;  break;
        case 'logRawRequests':        settings.logRawRequests        = value;  break;
        case 'logRawValues':          settings.logRawValues          = value;  break;
    } 
}



function updateSettingAndMenu(settingName, valid, value, save = true)
{
    switch (settingName)
    {
        case 'autoConnectNewNodes':   updateSettingAndMenu_(valid, settingName, value, menuItemAutoConnectNewNodes  );  break;
        case 'includeLxxColorSpaces': updateSettingAndMenu_(valid, settingName, value, menuItemIncludeLxxColorSpaces);  break;
        case 'debugMode':             updateSettingAndMenu_(valid, settingName, value, menuItemDebugMode            );  break;

        case 'showNodeId':            updateSettingAndMenu_(valid, settingName, value, menuItemShowNodeId           );  break;
        case 'showWires':             updateSettingAndMenu_(valid, settingName, value, menuItemShowWires            );  break;
 
        case 'logMessages':           updateSettingAndMenu_(valid, settingName, value, menuItemLogMessages          );  break;
        case 'logActions':            updateSettingAndMenu_(valid, settingName, value, menuItemLogActions           );  break;
        case 'logLoading':            updateSettingAndMenu_(valid, settingName, value, menuItemLogLoading           );  break;
        case 'logRequests':           updateSettingAndMenu_(valid, settingName, value, menuItemLogRequests          );  break;
        case 'logValueUpdates':       updateSettingAndMenu_(valid, settingName, value, menuItemLogValueUpdates      );  break;
        case 'logObjectUpdates':      updateSettingAndMenu_(valid, settingName, value, menuItemLogObjectUpdates     );  break;
  
        case 'logRawLoading':         updateSettingAndMenu_(valid, settingName, value, menuItemLogRawLoading        );  break;
        case 'logRawSaving':          updateSettingAndMenu_(valid, settingName, value, menuItemLogRawSaving         );  break;
        case 'logRawRequests':        updateSettingAndMenu_(valid, settingName, value, menuItemLogRawRequests       );  break;
        case 'logRawValues':          updateSettingAndMenu_(valid, settingName, value, menuItemLogRawValues         );  break;
    } 

    if (save)
        uiSetLocalData(settingName, boolToString(value));
}



function updateSettingAndMenu_(valid, setting, value, menu)
{
    if (valid) 
        settings[setting] = value;  

    menu.setChecked(settings[setting]);
}



function updateSettingsMenus()
{
    menuItemAutoConnectNewNodes  .setChecked(settings.autoConnectNewNodes  );
    menuItemIncludeLxxColorSpaces.setChecked(settings.includeLxxColorSpaces);
    menuItemDebugMode            .setChecked(settings.debugMode            );

    menuItemDebug                .setVisible(settings.debugMode            );

    menuItemShowNodeId           .setChecked(settings.showNodeId           );
    menuItemShowWires            .setChecked(settings.showWires            );
  
    menuItemLogMessages          .setChecked(settings.logMessages          );
    menuItemLogActions           .setChecked(settings.logActions           );
  
    menuItemLogLoading           .setChecked(settings.logLoading           );
    menuItemLogRequests          .setChecked(settings.logRequests          );
    menuItemLogValueUpdates      .setChecked(settings.logValueUpdates      );
    menuItemLogObjectUpdates     .setChecked(settings.logObjectUpdates     );
  
    menuItemLogRawLoading        .setChecked(settings.logRawLoading        );
    menuItemLogRawSaving         .setChecked(settings.logRawSaving         );
    menuItemLogRawRequests       .setChecked(settings.logRawRequests       );
    menuItemLogRawValues         .setChecked(settings.logRawValues         );
}



function updateMenuItemIncludeLxxColorSpace()
{
    graph.nodes
        .filter(n => COLOR_TYPES.includes(n.type))
        .forEach(n => n.updateNode());
}



function loadLocalSettings()
{
    uiGetLocalData('graphView');

    uiGetLocalData('autoConnectNewNodes'  );
    uiGetLocalData('includeLxxColorSpaces');
    uiGetLocalData('debugMode'            );

    uiGetLocalData('showNodeId'           );
    uiGetLocalData('showWires'            );
 
    uiGetLocalData('logMessages'          );
    uiGetLocalData('logActions'           );

    uiGetLocalData('logLoading'           );
    uiGetLocalData('logRequests'          );
    uiGetLocalData('logValueUpdates'      );
    uiGetLocalData('logObjectUpdates'     );

    uiGetLocalData('logRawLoading'        );
    uiGetLocalData('logRawSaving'         );
    uiGetLocalData('logRawRequests'       );
    uiGetLocalData('logRawValues'         );
}