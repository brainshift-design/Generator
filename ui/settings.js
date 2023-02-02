const settings =
{
    dataMode:              false,
    debugMode:             false,

    autoConnectNewNodes:   true,
    includeLxxColorSpaces: true,
    showBoolValues:        true,
    showDebugMenu:         false,

    showNodeId:            false, // instead of name

    enableBetaFeatures:    false,
    
    logMessages:           false,
    logActions:            false, 
    
    logLoading:            false, 
    logRequests:           false, 
    logValueUpdates:       false, 
    logObjectUpdates:      false,
    logStyleUpdates:       false,
    
    logRawLoading:         false, 
    logRawSaving:          false, 
    logRawRequests:        false, 
    logRawValues:          false    
};



function updateSetting(settingName, value)
{
    switch (settingName)
    {
        case 'dataMode':              settings.dataMode              = value;  break;
        case 'debugMode':             settings.debugMode             = value;  break;

        case 'autoConnectNewNodes':   settings.autoConnectNewNodes   = value;  break;
        case 'includeLxxColorSpaces': settings.includeLxxColorSpaces = value;  break;
        case 'showBoolValues':        settings.showBoolValues        = value;  break;
        case 'showDebugMenu':         settings.showDebugMenu         = value;  break;
        
        case 'showNodeId':            settings.showNodeId            = value;  break;

        case 'enableBetaFeatures':    settings.enableBetaFeatures    = value;  break;
   
        case 'logMessages':           settings.logMessages           = value;  break;
        case 'logActions':            settings.logActions            = value;  break;
        case 'logLoading':            settings.logLoading            = value;  break;
        case 'logRequests':           settings.logRequests           = value;  break;
        case 'logValueUpdates':       settings.logValueUpdates       = value;  break;
        case 'logObjectUpdates':      settings.logObjectUpdates      = value;  break;
        case 'logStyleUpdates':       settings.logStyleUpdates       = value;  break;
   
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
        case 'dataMode':              updateSettingAndMenu_(valid, settingName, value, menuItemDataMode);               break;
        case 'debugMode':             updateSettingAndMenu_(valid, settingName, value);                                 break;

        case 'autoConnectNewNodes':   updateSettingAndMenu_(valid, settingName, value, menuItemAutoConnectNewNodes  );  break;
        case 'includeLxxColorSpaces': updateSettingAndMenu_(valid, settingName, value, menuItemIncludeLxxColorSpaces);  break;
        case 'showBoolValues':        updateSettingAndMenu_(valid, settingName, value, menuItemShowBoolValues       );  break;
        case 'showDebugMenu':         updateSettingAndMenu_(valid, settingName, value, menuItemShowDebugMenu        );  break;

        case 'showNodeId':            updateSettingAndMenu_(valid, settingName, value, menuItemShowNodeId           );  break;
        
        case 'enableBetaFeatures':    updateSettingAndMenu_(valid, settingName, value, menuItemEnableBetaFeatures   );  break;
 
        case 'logMessages':           updateSettingAndMenu_(valid, settingName, value, menuItemLogMessages          );  break;
        case 'logActions':            updateSettingAndMenu_(valid, settingName, value, menuItemLogActions           );  break;
        case 'logLoading':            updateSettingAndMenu_(valid, settingName, value, menuItemLogLoading           );  break;
        case 'logRequests':           updateSettingAndMenu_(valid, settingName, value, menuItemLogRequests          );  break;
        case 'logValueUpdates':       updateSettingAndMenu_(valid, settingName, value, menuItemLogValueUpdates      );  break;
        case 'logObjectUpdates':      updateSettingAndMenu_(valid, settingName, value, menuItemLogObjectUpdates     );  break;
        case 'logStyleUpdates':       updateSettingAndMenu_(valid, settingName, value, menuItemLogStyleUpdates      );  break;
  
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

    if (menu)
        menu.setChecked(settings[setting]);
}



function updateSettingsMenus()
{
    menuItemDataMode             .setVisible(settings.dataMode             );
    menuItemDebug                .setVisible(settings.debugMode            );

    menuItemAutoConnectNewNodes  .setChecked(settings.autoConnectNewNodes  );
    menuItemIncludeLxxColorSpaces.setChecked(settings.includeLxxColorSpaces);
    menuItemShowBoolValues       .setChecked(settings.showBoolValues       );
    menuItemShowDebugMenu        .setChecked(settings.showDebugMenu        );

    menuItemShowNodeId           .setChecked(settings.showNodeId           );

    menuItemEnableBetaFeatures   .setChecked(settings.enableBetaFeatures   );
  
    menuItemLogMessages          .setChecked(settings.logMessages          );
    menuItemLogActions           .setChecked(settings.logActions           );
  
    menuItemLogLoading           .setChecked(settings.logLoading           );
    menuItemLogRequests          .setChecked(settings.logRequests          );
    menuItemLogValueUpdates      .setChecked(settings.logValueUpdates      );
    menuItemLogObjectUpdates     .setChecked(settings.logObjectUpdates     );
    menuItemLogStyleUpdates      .setChecked(settings.logStyleUpdates      );
  
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



function updateMenuItemShowBoolValues()
{
    graph.nodes
        .filter(n => 
               BOOLEAN_TYPES  .includes(n.type)
            || CONDITION_TYPES.includes(n.type))
        .forEach(n => n.updateNode());
}



function updateMenuItemEnableBetaFeatures()
{
    updateMenuItemDisplay(btnFlow .div,            settings.enableBetaFeatures);
    updateMenuItemDisplay(btnShape.div,            settings.enableBetaFeatures);

    updateMenuItemDisplay(menuItemStyleFill  .div, settings.enableBetaFeatures);
    updateMenuItemDisplay(menuItemStyleStroke.div, settings.enableBetaFeatures);
    updateMenuItemDisplay(menuItemStyleSep1  .div, settings.enableBetaFeatures);

    updateMenuItemDisplay(menuItemSeries.div,      settings.enableBetaFeatures);    
}



function updateMenuItemShowDebugMenu()
{
    updateMenuItemDisplay(menuItemDebug.div, settings.showDebugMenu);
}

 

function updateMenuItemDisplay(menuItem, enable)
{
    menuItem.style.display = enable ? 'block' : 'none';
}



function loadLocalSettings()
{
    uiGetLocalData('dataMode'             );
    uiGetLocalData('debugMode'            );

    uiGetLocalData('autoConnectNewNodes'  );
    uiGetLocalData('includeLxxColorSpaces');
    uiGetLocalData('showBoolValues'       );
    uiGetLocalData('showDebugMenu'        );

    uiGetLocalData('showNodeId'           );

    uiGetLocalData('enableBetaFeatures'   );
    
    uiGetLocalData('logMessages'          );
    uiGetLocalData('logActions'           );
    
    uiGetLocalData('logLoading'           );
    uiGetLocalData('logRequests'          );
    uiGetLocalData('logValueUpdates'      );
    uiGetLocalData('logObjectUpdates'     );
    uiGetLocalData('logStyleUpdates'      );
    
    uiGetLocalData('logRawLoading'        );
    uiGetLocalData('logRawSaving'         );
    uiGetLocalData('logRawRequests'       );
    uiGetLocalData('logRawValues'         );
    
    uiGetLocalData('graphView'            );
}