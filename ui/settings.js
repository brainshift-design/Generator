const settings =
{
    dataMode:                      false,
    debugMode:                     false,
        
    enableZoomedOutParams:         false,
    minZoomForParams:              0.35,
    showPages:                     false,
    showAllColorSpaces:            false,
    showNodeIcons:                 true,
    showBoolValues:                true,
    showOperationResults:          false,
    showClearUndoWarning:          true,
    showDebugMenu:                 false,
        
    showNodeId:                    false, // instead of name
    showTransformPoints:           false,
    enableAsserts:                 false,

    showTooltipLongText:           true,
    showTooltipColorInterpolation: true,
    showTooltipColorBlindness:     true,
    showTooltipColorContrast:      true,

    //enableBetaFeatures:            false,
            
    logThreadMessages:             false,
    logDataMessages:               false,
    logMessages:                   false,

    logActions:                    false, 
            
    logLoading:                    false, 
    logRequests:                   false, 
    logValueUpdates:               false, 
    logObjectUpdates:              false,
    logStyleUpdates:               false,
            
    logRawLoadPages:               false, 
    logRawLoadNodes:               false, 
    logRawLoadConnections:         false, 
        
    logRawSavePages:               false, 
    logRawSaveNodes:               false, 
    logRawSaveConnections:         false, 
        
    logRawRequests:                false, 
    logRawValues:                  false,

    lastValidCheck:                ''
};



function updateSetting(settingName, value)
{
    switch (settingName)
    {
        case 'dataMode':                      settings.dataMode                      = value;  break;
        case 'debugMode':                     settings.debugMode                     = value;  break;
                
        case 'enableZoomedOutParams':         settings.enableZoomedOutParams         = value;  break;
        case 'minZoomForParams':              settings.minZoomForParams              = value;  break;
        case 'showPages':                     settings.showPages                     = value;  break;
        case 'showAllColorSpaces':            settings.showAllColorSpaces            = value;  break;
        case 'showNodeIcons':                 settings.showNodeIcons                 = value;  break;
        case 'showBoolValues':                settings.showBoolValues                = value;  break;
        case 'showOperationResults':          settings.showOperationResults          = value;  break;
        case 'showClearUndoWarning':          settings.showClearUndoWarning          = value;  break;
        case 'showDebugMenu':                 settings.showDebugMenu                 = value;  break;
                        
        case 'showNodeId':                    settings.showNodeId                    = value;  break;
        case 'showTransformPoints':           settings.showTransformPoints           = value;  break;
        case 'enableAsserts':                 settings.enableAsserts                 = value;  break;

        case 'showTooltipLongText':           settings.showTooltipLongText           = value;  break;
        case 'showTooltipColorInterpolation': settings.showTooltipColorInterpolation = value;  break;
        case 'showTooltipColorBlindness':     settings.showTooltipColorBlindness     = value;  break;
        case 'showTooltipColorContrast':      settings.showTooltipColorContrast      = value;  break;

        //case 'enableBetaFeatures':            settings.enableBetaFeatures            = value;  break;
                   
        case 'logThreadMessages':             settings.logThreadMessages             = value;  break;
        case 'logDataMessages':               settings.logDataMessages               = value;  break;
        case 'logMessages':                   settings.logMessages                   = value;  break;

        case 'logActions':                    settings.logActions                    = value;  break;
        case 'logLoading':                    settings.logLoading                    = value;  break;
        case 'logRequests':                   settings.logRequests                   = value;  break;
        case 'logValueUpdates':               settings.logValueUpdates               = value;  break;
        case 'logObjectUpdates':              settings.logObjectUpdates              = value;  break;
        case 'logStyleUpdates':               settings.logStyleUpdates               = value;  break;
                   
        case 'logRawLoadPages':               settings.logRawLoadPages               = value;  break;
        case 'logRawLoadNodes':               settings.logRawLoadNodes               = value;  break;
        case 'logRawLoadConnections':         settings.logRawLoadConnections         = value;  break;
                
        case 'logRawSavePages':               settings.logRawSavePages               = value;  break;
        case 'logRawSaveNodes':               settings.logRawSaveNodes               = value;  break;
        case 'logRawSaveConnections':         settings.logRawSaveConnections         = value;  break;
                
        case 'logRawRequests':                settings.logRawRequests                = value;  break;
        case 'logRawValues':                  settings.logRawValues                  = value;  break;

        case 'lastValidCheck':                settings.lastValidCheck                = value;  break;
    } 
}



function updateSettingAndMenu(settingName, valid, value, save = true)
{
    switch (settingName)
    {
        case 'dataMode':                      updateSettingAndMenu_(valid, settingName, value, menuItemDataMode                     ); break;
        case 'debugMode':                     updateSettingAndMenu_(valid, settingName, value                                       ); break;
              
        case 'enableZoomedOutParams':         updateSettingAndMenu_(valid, settingName, value, menuItemEnableZoomedOutParams        ); break;
        case 'showPages':                     updateSettingAndMenu_(valid, settingName, value, menuItemShowPages                    ); break;
        case 'showAllColorSpaces':            updateSettingAndMenu_(valid, settingName, value, menuItemShowAllColorSpaces           ); break;
        case 'showNodeIcons':                 updateSettingAndMenu_(valid, settingName, value, menuItemShowNodeIcons                ); break;
        case 'showBoolValues':                updateSettingAndMenu_(valid, settingName, value, menuItemShowBoolValues               ); break;
        case 'showOperationResults':          updateSettingAndMenu_(valid, settingName, value, menuItemShowOperationResults         ); break;
        case 'showClearUndoWarning':          updateSettingAndMenu_(valid, settingName, value, menuItemShowClearUndoWarning         ); break;
        case 'showDebugMenu':                 updateSettingAndMenu_(valid, settingName, value, menuItemShowDebugMenu                ); break;
                      
        case 'showNodeId':                    updateSettingAndMenu_(valid, settingName, value, menuItemShowNodeId                   ); break;
        case 'showTransformPoints':           updateSettingAndMenu_(valid, settingName, value, menuItemShowTransformPoints          ); break;
        case 'enableAsserts':                 updateSettingAndMenu_(valid, settingName, value, menuItemEnableAsserts                ); enableAsserts = value; break;
        
        case 'showTooltipLongText':           updateSettingAndMenu_(valid, settingName, value, menuItemShowTooltipLongText          ); break;
        case 'showTooltipColorContrast':      updateSettingAndMenu_(valid, settingName, value, menuItemShowTooltipColorContrast     ); break;
        case 'showTooltipColorInterpolation': updateSettingAndMenu_(valid, settingName, value, menuItemShowTooltipColorInterpolation); break;
        case 'showTooltipColorBlindness':     updateSettingAndMenu_(valid, settingName, value, menuItemShowTooltipColorBlindness    ); break;

        //case 'enableBetaFeatures':            //updateSettingAndMenu_(valid, settingName, value, menuItemEnableBetaFeatures           ); break;
                      
        case 'logThreadMessages':             updateSettingAndMenu_(valid, settingName, value, menuItemLogThreadMessages            ); break;
        case 'logDataMessages':               updateSettingAndMenu_(valid, settingName, value, menuItemLogDataMessages              ); break;
        case 'logMessages':                   updateSettingAndMenu_(valid, settingName, value, menuItemLogMessages                  ); break;

        case 'logActions':                    updateSettingAndMenu_(valid, settingName, value, menuItemLogActions                   ); break;
        case 'logLoading':                    updateSettingAndMenu_(valid, settingName, value, menuItemLogLoading                   ); break;
        case 'logRequests':                   updateSettingAndMenu_(valid, settingName, value, menuItemLogRequests                  ); break;
        case 'logValueUpdates':               updateSettingAndMenu_(valid, settingName, value, menuItemLogValueUpdates              ); break;
        case 'logObjectUpdates':              updateSettingAndMenu_(valid, settingName, value, menuItemLogObjectUpdates             ); break;
        case 'logStyleUpdates':               updateSettingAndMenu_(valid, settingName, value, menuItemLogStyleUpdates              ); break;
                      
        case 'logRawLoadPages':               updateSettingAndMenu_(valid, settingName, value, menuItemLogRawLoadPages              ); break;
        case 'logRawLoadNodes':               updateSettingAndMenu_(valid, settingName, value, menuItemLogRawLoadNodes              ); break;
        case 'logRawLoadConnections':         updateSettingAndMenu_(valid, settingName, value, menuItemLogRawLoadConnections        ); break;
                      
        case 'logRawSavePages':               updateSettingAndMenu_(valid, settingName, value, menuItemLogRawSavePages              ); break;
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


    if (setting == 'showNodeId')
    {
        uiPostMessageToFigma(
        {
            cmd:    'figUpdateShowIds',
            showIds: settings.showNodeId
        });
    }


    if (menu)
        menu.setChecked(settings[setting]);
}



function updateSettingsMenus()
{
    menuItemDataMode                     .setVisible(settings.dataMode                     );
    menuItemDebug                        .setVisible(settings.debugMode                    );
                
    menuItemEnableZoomedOutParams        .setChecked(settings.enableZoomedOutParams        );
    menuItemShowPages                    .setChecked(settings.showPages                    );
    menuItemShowAllColorSpaces           .setChecked(settings.showAllColorSpaces           );
    menuItemShowNodeIcons                .setChecked(settings.showNodeIcons                );
    menuItemShowBoolValues               .setChecked(settings.showBoolValues               );
    menuItemShowOperationResults         .setChecked(settings.showOperationResults         );
    menuItemShowClearUndoWarning         .setChecked(settings.showClearUndoWarning         );
    menuItemShowDebugMenu                .setChecked(settings.showDebugMenu                );
                
    menuItemShowNodeId                   .setChecked(settings.showNodeId                   );
    menuItemShowTransformPoints          .setChecked(settings.showTransformPoints          );
    menuItemEnableAsserts                .setChecked(settings.enableAsserts                );

    menuItemShowTooltipLongText          .setChecked(settings.showTooltipLongText          );
    menuItemShowTooltipColorInterpolation.setChecked(settings.showTooltipColorInterpolation);
    menuItemShowTooltipColorBlindness    .setChecked(settings.showTooltipColorBlindness    );
    menuItemShowTooltipColorContrast     .setChecked(settings.showTooltipColorContrast     );

  //menuItemEnableBetaFeatures           .setChecked(settings.enableBetaFeatures           );
                  
    menuItemLogThreadMessages            .setChecked(settings.logThreadMessages            );
    menuItemLogDataMessages              .setChecked(settings.logDataMessages              );
    menuItemLogMessages                  .setChecked(settings.logMessages                  );

    menuItemLogActions                   .setChecked(settings.logActions                   );
                  
    menuItemLogLoading                   .setChecked(settings.logLoading                   );
    menuItemLogRequests                  .setChecked(settings.logRequests                  );
    menuItemLogValueUpdates              .setChecked(settings.logValueUpdates              );
    menuItemLogObjectUpdates             .setChecked(settings.logObjectUpdates             );
    menuItemLogStyleUpdates              .setChecked(settings.logStyleUpdates              );
                  
    menuItemLogRawLoadNodes              .setChecked(settings.logRawLoadPages              );
    menuItemLogRawLoadNodes              .setChecked(settings.logRawLoadNodes              );
    menuItemLogRawLoadConnections        .setChecked(settings.logRawLoadConnections        );
                    
    menuItemLogRawSavePages              .setChecked(settings.logRawSaveNodes              );
    menuItemLogRawSaveNodes              .setChecked(settings.logRawSaveNodes              );
    menuItemLogRawSaveConnections        .setChecked(settings.logRawSaveConnections        );
                
    menuItemLogRawRequests               .setChecked(settings.logRawRequests               );
    menuItemLogRawValues                 .setChecked(settings.logRawValues                 );
}



function updateMenuItemShowPages()
{
    uiSetPageData('showPages', boolToString(settings.showPages));
    graph.updatePages();
    graphView.update();
}



function updateMenuItemShowAllColorSpaces()
{
    uiSetPageData('showAllColorSpaces', boolToString(settings.showAllColorSpaces));

    graph.nodes
        .filter(n => COLOR_TYPES.includes(n.type))
        .forEach(n => n.updateNode());
}



function updateMenuItemShowNodeIcons()
{
    graph.nodes.forEach(n => n.updateNode());
}



function updateMenuItemShowBoolValues()
{
    graph.nodes
        .filter(n => 
               NUMBER_BOOLEAN_TYPES.includes(n.type)
            ||      CONDITION_TYPES.includes(n.type)
            ||         AFFINE_TYPES.includes(n.type)
            || n.type == IF_ELSE)
        .forEach(n => n.updateNode());
}



function updateMenuItemShowOperationResults()
{
    const nodes = graph.nodes
        .filter(n => n.params.find(p => p.isResult));

    nodes.forEach(n => 
    {
        const rect = n.measureData.divOffset;
        n.setRect(rect.x, rect.y, rect.w, rect.h, false);
    });

    graphView.updateNodeTransforms(nodes);
}



// function enableFeatures(subscription, beta)
// {
//     updateElementDisplay(menuItemShowPages           .div, subscription);
//     updateElementDisplay(menuPrefSep1                .div, subscription);
//     updateElementDisplay(menuPrefSep2                .div, subscription);
//     updateElementDisplay(menuItemEnableBetaFeatures  .div, subscription);

//     updateElementDisplay(btnFlow                     .div, subscription);
//     updateElementDisplay(btnText                     .div, subscription && beta);
//     updateElementDisplay(btnShape                    .div, subscription && beta);
//     //updateElementDisplay(btnGroup                    .div, subscription && beta);

//     updateElementDisplay(menuItemLogObjectUpdates    .div, subscription && beta);
    
//     //updateElementDisplay(menuItemList                .div, subscription && beta);
//     updateElementDisplay(menuFlowSep1                .div, subscription && beta);
//     updateElementDisplay(menuItemItems               .div, subscription);
//     updateElementDisplay(menuFlowSep2                .div, subscription);
//     //updateElementDisplay(menuItemSelect              .div, subscription);
//     updateElementDisplay(menuItemCount               .div, subscription);
//     //updateElementDisplay(menuFlowSep3                .div, subscription && beta);
//     //updateElementDisplay(menuItemStart               .div, subscription && beta);
//     updateElementDisplay(menuItemRepeat              .div, subscription && beta);
//     // updateElementDisplay(menuItemCache               .div, subscription && beta);
//     updateElementDisplay(menuItemCopy                .div, subscription && beta);
    
//     updateElementDisplay(menuItemSequence              .div, subscription && beta);    
//     updateElementDisplay(menuItemSolve               .div, subscription && beta);    
//     updateElementDisplay(menuItemNumberSep1          .div, subscription && beta);
//     updateElementDisplay(menuItemAnimate             .div, subscription && beta);    
    
//     updateElementDisplay(menuItemCorrectColor        .div, subscription);
//     updateElementDisplay(menuItemColorSep1           .div, subscription);
//     updateElementDisplay(menuItemColorblind          .div, subscription);
//     //updateMenuItemDisplay(menuItemColorBlend        .div, beta);

//     //updateMenuItemDisplay(menuItemStyleFill         .div, subscription && beta);
//     updateElementDisplay(menuItemLayerStroke         .div, subscription && beta);
//     //updateMenuItemDisplay(menuItemStyleSep1         .div, subscription && beta);
    
//     //updateMenuItemDisplay(menuItemNodeCopyAsJsCode    .div, subscription && beta);
//     updateElementDisplay(menuItemNodeCopyAsJsFunction.div, subscription && beta);

//     // updateElementDisplay(shortcutCopyAsJavascript        , subscription && beta);


//     graph.nodes.forEach(n => n.updateSubscribeStatus(subscription));
// }



function updateMenuItemShowDebugMenu()
{
    updateElementDisplay(menuItemDebug.div, settings.showDebugMenu);

    menuMain.update(
        boundingRect(menuMain.div).x + 6,
        boundingRect(menuMain.div).y - 4,
        true);
}

 

function updateElementDisplay(menuItem, enable)
{
    menuItem.style.display = enable ? 'block' : 'none';
}



function loadLocalSettings()
{
    uiGetLocalData('dataMode'                     );
    uiGetLocalData('debugMode'                    );
        
    uiGetLocalData('enableZoomedOutParams'        );
    uiGetLocalData('minZoomForParams'             );
    uiGetLocalData('showNodeIcons'                );
    uiGetLocalData('showBoolValues'               );
    uiGetLocalData('showPages'                    );
    uiGetLocalData('showOperationResults'         );
    uiGetLocalData('showClearUndoWarning'         );
    uiGetLocalData('showDebugMenu'                );
        
    uiGetLocalData('showNodeId'                   );
    uiGetLocalData('showTransformPoints'          );
    uiGetLocalData('enableAsserts'                );

    uiGetLocalData('showTooltipLongText'          );
    uiGetLocalData('showTooltipColorInterpolation');
    uiGetLocalData('showTooltipColorBlindness'    );
    uiGetLocalData('showTooltipColorContrast'     );

  //uiGetLocalData('enableBetaFeatures'           );
            
    uiGetLocalData('logThreadMessages'            );
    uiGetLocalData('logDataMessages'              );
    uiGetLocalData('logMessages'                  );

    uiGetLocalData('logActions'                   );
            
    uiGetLocalData('logLoading'                   );
    uiGetLocalData('logRequests'                  );
    uiGetLocalData('logValueUpdates'              );
    uiGetLocalData('logObjectUpdates'             );
    uiGetLocalData('logStyleUpdates'              );
            
    uiGetLocalData('logRawLoadPages'              );
    uiGetLocalData('logRawLoadNodes'              );
    uiGetLocalData('logRawLoadConnections'        );
        
    uiGetLocalData('logRawSavePages'              );
    uiGetLocalData('logRawSaveNodes'              );
    uiGetLocalData('logRawSaveConnections'        );
        
    uiGetLocalData('logRawRequests'               );
    uiGetLocalData('logRawValues'                 );

    uiGetLocalData('lastValidCheck'               );
}