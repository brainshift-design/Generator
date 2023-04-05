const settings =
{
    dataMode:                      false,
    debugMode:                     false,
        
    enableZoomedOutParams:         false,
    minZoomForParams:              0.35,
    showAllColorSpaces:            false,
    showBoolValues:                true,
    showOperationResults:          true,
    showClearUndoWarning:          true,
    showDebugMenu:                 false,
        
    showNodeId:                    false, // instead of name

    showTooltipLongText:           true,
    showTooltipColorInterpolation: true,
    showTooltipColorBlindness:     true,
    showTooltipColorContrast:      true,

    enableBetaFeatures:            false,
            
    logMessages:                   false,
    logActions:                    false, 
            
    logLoading:                    false, 
    logRequests:                   false, 
    logValueUpdates:               false, 
    logObjectUpdates:              false,
    logStyleUpdates:               false,
            
    logRawLoadNodes:               false, 
    logRawLoadConnections:         false, 
        
    logRawSaveNodes:               false, 
    logRawSaveConnections:         false, 
        
    logRawRequests:                false, 
    logRawValues:                  false    
};



function updateSetting(settingName, value)
{
    switch (settingName)
    {
        case 'dataMode':                      settings.dataMode                      = value;  break;
        case 'debugMode':                     settings.debugMode                     = value;  break;
                
        case 'enableZoomedOutParams':         settings.enableZoomedOutParams         = value;  break;
        case 'minZoomForParams':              settings.minZoomForParams              = value;  break;
        case 'showAllColorSpaces':            settings.showAllColorSpaces            = value;  break;
        case 'showBoolValues':                settings.showBoolValues                = value;  break;
        case 'showOperationResults':          settings.showOperationResults          = value;  break;
        case 'showClearUndoWarning':          settings.showClearUndoWarning          = value;  break;
        case 'showDebugMenu':                 settings.showDebugMenu                 = value;  break;
                        
        case 'showNodeId':                    settings.showNodeId                    = value;  break;

        case 'showTooltipLongText':           settings.showTooltipLongText           = value; break;
        case 'showTooltipColorInterpolation': settings.showTooltipColorInterpolation = value; break;
        case 'showTooltipColorBlindness':     settings.showTooltipColorBlindness     = value; break;
        case 'showTooltipColorContrast':      settings.showTooltipColorContrast      = value; break;

        case 'enableBetaFeatures':            settings.enableBetaFeatures            = value;  break;
                   
        case 'logMessages':                   settings.logMessages                   = value;  break;
        case 'logActions':                    settings.logActions                    = value;  break;
        case 'logLoading':                    settings.logLoading                    = value;  break;
        case 'logRequests':                   settings.logRequests                   = value;  break;
        case 'logValueUpdates':               settings.logValueUpdates               = value;  break;
        case 'logObjectUpdates':              settings.logObjectUpdates              = value;  break;
        case 'logStyleUpdates':               settings.logStyleUpdates               = value;  break;
                   
        case 'logRawLoadNodes':               settings.logRawLoadNodes               = value;  break;
        case 'logRawLoadConnections':         settings.logRawLoadConnections         = value;  break;
                
        case 'logRawSaveNodes':               settings.logRawSaveNodes               = value;  break;
        case 'logRawSaveConnections':         settings.logRawSaveConnections         = value;  break;
                
        case 'logRawRequests':                settings.logRawRequests                = value;  break;
        case 'logRawValues':                  settings.logRawValues                  = value;  break;
    } 
}



function updateSettingAndMenu(settingName, valid, value, save = true)
{
    switch (settingName)
    {
        case 'dataMode':                      updateSettingAndMenu_(valid, settingName, value, menuItemDataMode                     ); break;
        case 'debugMode':                     updateSettingAndMenu_(valid, settingName, value                                       ); break;
              
        case 'enableZoomedOutParams':         updateSettingAndMenu_(valid, settingName, value, menuItemEnableZoomedOutParams        ); break;
        case 'showAllColorSpaces':            updateSettingAndMenu_(valid, settingName, value, menuItemShowAllColorSpaces           ); break;
        case 'showBoolValues':                updateSettingAndMenu_(valid, settingName, value, menuItemShowBoolValues               ); break;
        case 'showOperationResults':          updateSettingAndMenu_(valid, settingName, value, menuItemShowOperationResults         ); break;
        case 'showClearUndoWarning':          updateSettingAndMenu_(valid, settingName, value, menuItemShowClearUndoWarning         ); break;
        case 'showDebugMenu':                 updateSettingAndMenu_(valid, settingName, value, menuItemShowDebugMenu                ); break;
                      
        case 'showNodeId':                    updateSettingAndMenu_(valid, settingName, value, menuItemShowNodeId                   ); break;
        
        case 'showTooltipLongText':           updateSettingAndMenu_(valid, settingName, value, menuItemShowTooltipLongText          ); break;
        case 'showTooltipColorContrast':      updateSettingAndMenu_(valid, settingName, value, menuItemShowTooltipColorContrast     ); break;
        case 'showTooltipColorInterpolation': updateSettingAndMenu_(valid, settingName, value, menuItemShowTooltipColorInterpolation); break;
        case 'showTooltipColorBlindness':     updateSettingAndMenu_(valid, settingName, value, menuItemShowTooltipColorBlindness    ); break;

        case 'enableBetaFeatures':            updateSettingAndMenu_(valid, settingName, value, menuItemEnableBetaFeatures           ); break;
                      
        case 'logMessages':                   updateSettingAndMenu_(valid, settingName, value, menuItemLogMessages                  ); break;
        case 'logActions':                    updateSettingAndMenu_(valid, settingName, value, menuItemLogActions                   ); break;
        case 'logLoading':                    updateSettingAndMenu_(valid, settingName, value, menuItemLogLoading                   ); break;
        case 'logRequests':                   updateSettingAndMenu_(valid, settingName, value, menuItemLogRequests                  ); break;
        case 'logValueUpdates':               updateSettingAndMenu_(valid, settingName, value, menuItemLogValueUpdates              ); break;
        case 'logObjectUpdates':              updateSettingAndMenu_(valid, settingName, value, menuItemLogObjectUpdates             ); break;
        case 'logStyleUpdates':               updateSettingAndMenu_(valid, settingName, value, menuItemLogStyleUpdates              ); break;
                      
        case 'logRawLoadNodes':               updateSettingAndMenu_(valid, settingName, value, menuItemLogRawLoadNodes              ); break;
        case 'logRawLoadConnections':         updateSettingAndMenu_(valid, settingName, value, menuItemLogRawLoadConnections        ); break;
                      
        case 'logRawSaveNodes':               updateSettingAndMenu_(valid, settingName, value, menuItemLogRawSaveNodes              ); break;
        case 'logRawSaveConnections':         updateSettingAndMenu_(valid, settingName, value, menuItemLogRawSaveConnections        ); break;
                      
        case 'logRawRequests':                updateSettingAndMenu_(valid, settingName, value, menuItemLogRawRequests               ); break;
        case 'logRawValues':                  updateSettingAndMenu_(valid, settingName, value, menuItemLogRawValues                 ); break;
    } 

    if (   save
        && settingName != 'showAllColorSpaces')
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
    menuItemDataMode                     .setVisible(settings.dataMode                     );
    menuItemDebug                        .setVisible(settings.debugMode                    );
                
    menuItemEnableZoomedOutParams        .setChecked(settings.enableZoomedOutParams        );
    menuItemShowAllColorSpaces           .setChecked(settings.showAllColorSpaces           );
    menuItemShowBoolValues               .setChecked(settings.showBoolValues               );
    menuItemShowOperationResults         .setChecked(settings.showOperationResults         );
    menuItemShowClearUndoWarning         .setChecked(settings.showClearUndoWarning         );
    menuItemShowDebugMenu                .setChecked(settings.showDebugMenu                );
                
    menuItemShowNodeId                   .setChecked(settings.showNodeId                   );

    menuItemShowTooltipLongText          .setChecked(settings.showTooltipLongText          );
    menuItemShowTooltipColorInterpolation.setChecked(settings.showTooltipColorInterpolation);
    menuItemShowTooltipColorBlindness    .setChecked(settings.showTooltipColorBlindness    );
    menuItemShowTooltipColorContrast     .setChecked(settings.showTooltipColorContrast     );

    menuItemEnableBetaFeatures           .setChecked(settings.enableBetaFeatures           );
                  
    menuItemLogMessages                  .setChecked(settings.logMessages                  );
    menuItemLogActions                   .setChecked(settings.logActions                   );
                  
    menuItemLogLoading                   .setChecked(settings.logLoading                   );
    menuItemLogRequests                  .setChecked(settings.logRequests                  );
    menuItemLogValueUpdates              .setChecked(settings.logValueUpdates              );
    menuItemLogObjectUpdates             .setChecked(settings.logObjectUpdates             );
    menuItemLogStyleUpdates              .setChecked(settings.logStyleUpdates              );
                  
    menuItemLogRawLoadNodes              .setChecked(settings.logRawLoadNodes              );
    menuItemLogRawLoadConnections        .setChecked(settings.logRawLoadConnections        );
                    
    menuItemLogRawSaveNodes              .setChecked(settings.logRawSaveNodes              );
    menuItemLogRawSaveConnections        .setChecked(settings.logRawSaveConnections        );
                
    menuItemLogRawRequests               .setChecked(settings.logRawRequests               );
    menuItemLogRawValues                 .setChecked(settings.logRawValues                 );
}



function updateMenuItemShowAllColorSpaces()
{
    uiSetPageData('showAllColorSpaces', boolToString(settings.showAllColorSpaces));

    graphView.graph.nodes
        .filter(n => COLOR_TYPES.includes(n.type))
        .forEach(n => n.updateNode());
}



function updateMenuItemShowBoolValues()
{
    graphView.graph.nodes
        .filter(n => 
                 BOOLEAN_TYPES.includes(n.type)
            || CONDITION_TYPES.includes(n.type)
            || n.type == IF_ELSE)
        .forEach(n => n.updateNode());
}



function updateMenuItemShowOperationResults()
{
    const nodes = graphView.graph.nodes
        .filter(n => n.params.find(p => p.isResult));

    nodes.forEach(n => n.updateNode());
    graphView.updateNodeTransforms(nodes);
}



function enableFeatures(subscription, beta)
{
    updateMenuItemDisplay(menuItemEnableBetaFeatures  .div, subscription);

    updateMenuItemDisplay(btnFlow                     .div, subscription);
    updateMenuItemDisplay(btnText                     .div, subscription && beta);
    updateMenuItemDisplay(btnShape                    .div, subscription && beta);
    updateMenuItemDisplay(btnGroup                    .div, false);//subscription && beta);

    updateMenuItemDisplay(menuItemLogObjectUpdates    .div, subscription && beta);
    
    updateMenuItemDisplay(menuItemList                .div, subscription && beta);
    updateMenuItemDisplay(menuFlowSep1                .div, subscription && beta);
    updateMenuItemDisplay(menuItemItems               .div, subscription && beta);
    updateMenuItemDisplay(menuItemSelect              .div, subscription && beta);
    updateMenuItemDisplay(menuFlowSep2                .div, subscription && beta);
    updateMenuItemDisplay(menuItemRepeat              .div, subscription && beta);
    updateMenuItemDisplay(menuFlowSep3                .div, subscription && beta);
    updateMenuItemDisplay(menuItemCache               .div, subscription && beta);
    updateMenuItemDisplay(menuItemCopy                .div, subscription && beta);
    updateMenuItemDisplay(menuItemCustomInputs        .div, false);//subscription && beta);
    updateMenuItemDisplay(menuItemCustomOutputs       .div, false);//subscription && beta);
    
    updateMenuItemDisplay(menuItemSeries              .div, subscription && beta);    
    updateMenuItemDisplay(menuItemNumberSep1          .div, subscription && beta);
    updateMenuItemDisplay(menuItemNumberConvertToText .div, subscription && beta);
    
    updateMenuItemDisplay(menuItemCorrectColor        .div, subscription);
    updateMenuItemDisplay(menuItemColorSep1           .div, subscription);
    updateMenuItemDisplay(menuItemColorblind          .div, subscription);
    //updateMenuItemDisplay(menuItemColorBlend        .div, beta);

    //updateMenuItemDisplay(menuItemStyleFill         .div, subscription && beta);
    updateMenuItemDisplay(menuItemStyleStroke         .div, subscription && beta);
    //updateMenuItemDisplay(menuItemStyleSep1         .div, subscription && beta);
    
    //updateMenuItemDisplay(menuItemNodeCopyAsJsCode    .div, subscription && beta);
    updateMenuItemDisplay(menuItemNodeCopyAsJsFunction.div, subscription && beta);


    graphView.graph.nodes.forEach(n => n.updateSubscribeStatus(subscription));
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
    uiGetLocalData('dataMode'                     );
    uiGetLocalData('debugMode'                    );
        
    uiGetLocalData('enableZoomedOutParams'        );
    uiGetLocalData('minZoomForParams'             );
    uiGetLocalData('showBoolValues'               );
    uiGetLocalData('showOperationResults'         );
    uiGetLocalData('showClearUndoWarning'         );
    uiGetLocalData('showDebugMenu'                );
        
    uiGetLocalData('showNodeId'                   );

    uiGetLocalData('showTooltipLongText'          );
    uiGetLocalData('showTooltipColorInterpolation');
    uiGetLocalData('showTooltipColorBlindness'    );
    uiGetLocalData('showTooltipColorContrast'     );

    uiGetLocalData('enableBetaFeatures'           );
            
    uiGetLocalData('logMessages'                  );
    uiGetLocalData('logActions'                   );
            
    uiGetLocalData('logLoading'                   );
    uiGetLocalData('logRequests'                  );
    uiGetLocalData('logValueUpdates'              );
    uiGetLocalData('logObjectUpdates'             );
    uiGetLocalData('logStyleUpdates'              );
            
    uiGetLocalData('logRawLoadNodes'              );
    uiGetLocalData('logRawLoadConnections'        );
        
    uiGetLocalData('logRawSaveNodes'              );
    uiGetLocalData('logRawSaveConnections'        );
        
    uiGetLocalData('logRawRequests'               );
    uiGetLocalData('logRawValues'                 );
}