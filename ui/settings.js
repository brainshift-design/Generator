const settings =
{
    debugMode:                     false,
        
    enableZoomedOutParams:         false,
    minZoomForParams:              0.35,
    objectCenterSize:              18,
    objectBatchSize:               500,
    maxSolveIterations:            100,
    numberVarNullValue:            0,
    boolVarNullValue:              false,
    stringVarNullValue:            '',
    colorVarNullValue:             [1, 0, 1],
    showPages:                     false,
    showAllColorSpaces:            false,
    showGrid:                      false,
    showNodeIcons:                 true,
    showBoolValues:                true,
    separateThousands:             true,
    allowInvertParams:             true,
    activateDeactiatesOthers:      true,
    preferHtmlColorNames:          true,
    normalizeRandomNumbers:        false,
    randomShiftR:                  true,
    colorShiftR:                   false,
    numberShiftR:                  false,

    showSnapshots:                 false,
    showRestartInfo:               true,
    showColorLegendInMenus:        false,
    showClearUndoWarning:          true,
    shareUsageMetrics:             true,
    showObjectCount:               true,
    showDebugMenu:                 false,
        
    showNodeId:                    false, // instead of name
    showTransformPoints:           false,
    enableAsserts:                 false,

    showTooltipNodes:              true,
    showTooltipParams:             true,
    showTooltipLists:              false,
    showTooltipLongText:           false,
    showTooltipColorInterpolation: true,
    showTooltipValidateMethod:     true,
    showTooltipColorBlindness:     true,
    showTooltipColorContrast:      true,
    showTooltipColorNames:         true,
    showTooltipAscii:              true,

    enableBetaFeatures:            false,
            
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

    sessionId:                     ''
};



function updateSetting(settingName, value)
{
    switch (settingName)
    {
        case 'debugMode':                     settings.debugMode                     = value;  break;
                
        case 'enableZoomedOutParams':         settings.enableZoomedOutParams         = value;  break;
        case 'minZoomForParams':              settings.minZoomForParams              = value;  break;
        case 'objectCenterSize':              settings.objectCenterSize              = value;  break;
        case 'objectBatchSize':               settings.objectBatchSize               = value;  break;
        case 'maxSolveIterations':            settings.maxSolveIterations            = value;  break;
        case 'numberVarNullValue':            settings.numberVarNullValue            = value;  break;
        case 'boolVarNullValue':              settings.boolVarNullValue              = value;  break;
        case 'stringVarNullValue':            settings.stringVarNullValue            = value;  break;
        case 'colorVarNullValue':             settings.colorVarNullValue             = value;  break;
        case 'showPages':                     settings.showPages                     = value;  break;
        case 'showAllColorSpaces':            settings.showAllColorSpaces            = value;  break;
        case 'showGrid':                      settings.showGrid                      = value;  break;
        case 'showNodeIcons':                 settings.showNodeIcons                 = value;  break;
        case 'showBoolValues':                settings.showBoolValues                = value;  break;
        case 'separateThousands':             settings.separateThousands             = value;  break;
        case 'allowInvertParams':             settings.allowInvertParams             = value;  break;
        case 'activateDeactiatesOthers':      settings.activateDeactiatesOthers      = value;  break;
        case 'preferHtmlColorNames':          settings.preferHtmlColorNames          = value;  break;
        case 'normalizeRandomNumbers':        settings.normalizeRandomNumbers        = value;  break;
        case 'randomShiftR':                  settings.randomShiftR                  = value;  break;
        case 'colorShiftR':                   settings.colorShiftR                   = value;  break;
        case 'numberShiftR':                  settings.numberShiftR                  = value;  break;
        
        case 'showSnapshots':                 settings.showSnapshots                 = value;  break;
        case 'showRestartInfo':               settings.showRestartInfo               = value;  break;
        case 'showColorLegendInMenus':        settings.showColorLegendInMenus        = value;  break;
        case 'showClearUndoWarning':          settings.showClearUndoWarning          = value;  break;
        case 'shareUsageMetrics':             settings.shareUsageMetrics             = value;  break;
        case 'showObjectCount':               settings.showObjectCount               = value;  break;
        case 'showDebugMenu':                 settings.showDebugMenu                 = value;  break;
                        
        case 'showNodeId':                    settings.showNodeId                    = value;  break;
        case 'showTransformPoints':           settings.showTransformPoints           = value;  break;
        case 'enableAsserts':                 settings.enableAsserts                 = value;  break;

        case 'showTooltipNodes':              settings.showTooltipNodes              = value;  break;
        case 'showTooltipParams':             settings.showTooltipParams             = value;  break;
        case 'showTooltipLists':              settings.showTooltipLists              = value;  break;
        case 'showTooltipLongText':           settings.showTooltipLongText           = value;  break;
        case 'showTooltipColorInterpolation': settings.showTooltipColorInterpolation = value;  break;
        case 'showTooltipValidateMethod':     settings.showTooltipValidateMethod     = value;  break;
        case 'showTooltipColorBlindness':     settings.showTooltipColorBlindness     = value;  break;
        case 'showTooltipColorContrast':      settings.showTooltipColorContrast      = value;  break;
        case 'showTooltipColorNames':         settings.showTooltipColorNames         = value;  break;
        case 'showTooltipAscii':              settings.showTooltipAscii              = value;  break;

        case 'enableBetaFeatures':            settings.enableBetaFeatures            = value;  break;
                   
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

        case 'sessionId':                     settings.sessionId                     = value;  break;
    } 


    switch (settingName)
    {
        case 'objectCenterSize':
            uiPostMessageToFigma(
            {
                cmd:             'figUpdateObjectCenterSize',
                objectCenterSize: settings.objectCenterSize
            });
            break;
    }
}



function updateSettingAndMenu(settingName, valid, value, save = true)
{
    switch (settingName)
    {
        case 'debugMode':                     updateSettingAndMenu_(valid, settingName, value, menuItemDebugMode                    ); break;
              
        case 'enableZoomedOutParams':         updateSettingAndMenu_(valid, settingName, value, menuItemEnableZoomedOutParams        ); break;
        case 'showPages':                     updateSettingAndMenu_(valid, settingName, value, menuItemShowPages                    ); break;
        case 'showAllColorSpaces':            updateSettingAndMenu_(valid, settingName, value, menuItemShowAllColorSpaces           ); break;
        case 'showGrid':                      updateSettingAndMenu_(valid, settingName, value, menuItemShowGrid                     ); break;
        case 'showNodeIcons':                 updateSettingAndMenu_(valid, settingName, value, menuItemShowNodeIcons                ); break;
        case 'showBoolValues':                updateSettingAndMenu_(valid, settingName, value, menuItemShowBoolValues               ); break;
        case 'separateThousands':             updateSettingAndMenu_(valid, settingName, value, menuItemSeparateThousands            ); break;
        case 'allowInvertParams':             updateSettingAndMenu_(valid, settingName, value, menuItemAllowInvertParams            ); break;
        case 'activateDeactiatesOthers':      updateSettingAndMenu_(valid, settingName, value, menuItemActivateDeactiatesOthers     ); break;
        case 'preferHtmlColorNames':          updateSettingAndMenu_(valid, settingName, value, menuItemPreferHtmlColorNames         ); break;
        case 'normalizeRandomNumbers':        updateSettingAndMenu_(valid, settingName, value, menuItemNormalizeRandomNumbers       ); break;
        case 'randomShiftR':                  updateSettingAndMenu_(valid, settingName, value, menuItemRandomShiftR                 ); break;
        case 'colorShiftR':                   updateSettingAndMenu_(valid, settingName, value, menuItemColorShiftR                  ); break;
        case 'numberShiftR':                  updateSettingAndMenu_(valid, settingName, value, menuItemNumberShiftR                 ); break;

        case 'showSnapshots':                 updateSettingAndMenu_(valid, settingName, value, menuItemShowSnapshots                ); break;
        case 'showRestartInfo':               updateSettingAndMenu_(valid, settingName, value, menuItemShowRestartInfo              ); break;
        case 'showColorLegendInMenus':        updateSettingAndMenu_(valid, settingName, value, menuItemShowColorLegendInMenus       ); break;
        case 'showClearUndoWarning':          updateSettingAndMenu_(valid, settingName, value, menuItemShowClearUndoWarning         ); break;
        case 'shareUsageMetrics':             updateSettingAndMenu_(valid, settingName, value, menuItemShareUsageMetrics            ); break;
        case 'showObjectCount':               updateSettingAndMenu_(valid, settingName, value, menuItemShowObjectCount              ); break;
        case 'showDebugMenu':                 updateSettingAndMenu_(valid, settingName, value, menuItemShowDebugMenu                ); break;
                      
        case 'showNodeId':                    updateSettingAndMenu_(valid, settingName, value, menuItemShowNodeId                   ); break;
        case 'showTransformPoints':           updateSettingAndMenu_(valid, settingName, value, menuItemShowTransformPoints          ); break;
        case 'enableAsserts':                 updateSettingAndMenu_(valid, settingName, value, menuItemEnableAsserts                ); enableAsserts = value; break;
        
        case 'showTooltipNodes':              updateSettingAndMenu_(valid, settingName, value, menuItemShowTooltipNodes             ); break;
        case 'showTooltipParams':             updateSettingAndMenu_(valid, settingName, value, menuItemShowTooltipParams            ); break;
        case 'showTooltipLists':              updateSettingAndMenu_(valid, settingName, value, menuItemShowTooltipLists             ); break;
        case 'showTooltipLongText':           updateSettingAndMenu_(valid, settingName, value, menuItemShowTooltipLongText          ); break;
        case 'showTooltipColorInterpolation': updateSettingAndMenu_(valid, settingName, value, menuItemShowTooltipColorInterpolation); break;
        case 'showTooltipValidateMethod':     updateSettingAndMenu_(valid, settingName, value, menuItemShowTooltipValidateMethod    ); break;
        case 'showTooltipColorBlindness':     updateSettingAndMenu_(valid, settingName, value, menuItemShowTooltipColorBlindness    ); break;
        case 'showTooltipColorContrast':      updateSettingAndMenu_(valid, settingName, value, menuItemShowTooltipColorContrast     ); break;
        case 'showTooltipColorNames':         updateSettingAndMenu_(valid, settingName, value, menuItemShowTooltipColorNames        ); break;
        case 'showTooltipAscii':              updateSettingAndMenu_(valid, settingName, value, menuItemShowTooltipColorBlindness    ); break;

        case 'enableBetaFeatures':            updateSettingAndMenu_(valid, settingName, value, menuItemEnableBetaFeatures           ); break;
                      
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


    if (save)
        //&& settingName != 'showAllColorSpaces')
        uiSetLocalData(settingName, boolToString(value));
}



function updateSettingAndMenu_(valid, setting, value, menu)
{
    if (valid) 
        settings[setting] = value;  


    switch (setting)
    {
        case 'showNodeId':
            uiPostMessageToFigma(
            {
                cmd:    'figUpdateShowIds',
                showIds: settings.showNodeId
            });
            break;
    }


    if (menu)
        menu.setChecked(settings[setting]);
}



function updateSettingsMenus()
{
    menuItemDebugMode                    .setVisible(settings.debugMode                    );
                
    menuItemEnableZoomedOutParams        .setChecked(settings.enableZoomedOutParams        );
    menuItemShowPages                    .setChecked(settings.showPages                    );
    menuItemShowAllColorSpaces           .setChecked(settings.showAllColorSpaces           );
    menuItemShowGrid                     .setChecked(settings.showGrid                     );
    menuItemShowNodeIcons                .setChecked(settings.showNodeIcons                );
    menuItemShowBoolValues               .setChecked(settings.showBoolValues               );
    menuItemSeparateThousands            .setChecked(settings.separateThousands            );
    menuItemAllowInvertParams            .setChecked(settings.allowInvertParams            );
    menuItemActivateDeactiatesOthers     .setChecked(settings.activateDeactiatesOthers     );
    menuItemPreferHtmlColorNames         .setChecked(settings.preferHtmlColorNames         );
    menuItemNormalizeRandomNumbers       .setChecked(settings.normalizeRandomNumbers       );
    menuItemRandomShiftR                 .setChecked(settings.randomShiftR                 );
    menuItemColorShiftR                  .setChecked(settings. colorShiftR                 );
    menuItemNumberShiftR                 .setChecked(settings.numberShiftR                 );

    menuItemShowSnapshots                .setChecked(settings.showSnapshots                );
    menuItemShowRestartInfo              .setChecked(settings.showRestartInfo              );
    menuItemShowColorLegendInMenus       .setChecked(settings.showColorLegendInMenus       );
    menuItemShowClearUndoWarning         .setChecked(settings.showClearUndoWarning         );
    menuItemShareUsageMetrics            .setChecked(settings.shareUsageMetrics            );
    menuItemShowObjectCount              .setChecked(settings.showObjectCount              );
    menuItemShowDebugMenu                .setChecked(settings.showDebugMenu                );
                
    menuItemShowNodeId                   .setChecked(settings.showNodeId                   );
    menuItemShowTransformPoints          .setChecked(settings.showTransformPoints          );
    menuItemEnableAsserts                .setChecked(settings.enableAsserts                );

    menuItemShowTooltipNodes             .setChecked(settings.showTooltipNodes             );
    menuItemShowTooltipParams            .setChecked(settings.showTooltipParam             );
    menuItemShowTooltipLists             .setChecked(settings.showTooltipLists             );
    menuItemShowTooltipLongText          .setChecked(settings.showTooltipLongText          );
    menuItemShowTooltipColorInterpolation.setChecked(settings.showTooltipColorInterpolation);
    menuItemShowTooltipValidateMethod    .setChecked(settings.showTooltipValidateMethod    );
    menuItemShowTooltipColorBlindness    .setChecked(settings.showTooltipColorBlindness    );
    menuItemShowTooltipColorContrast     .setChecked(settings.showTooltipColorContrast     );
    menuItemShowTooltipColorNames        .setChecked(settings.showTooltipColorNames        );
    menuItemShowTooltipAscii             .setChecked(settings.showTooltipAscii             );

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



function updateMenuItemShowSnapshots()
{
    uiSetPageData('showSnapshots', boolToString(settings.showSnapshots));

    snapshotBar.style.display = settings.showSnapshots ? 'block' : 'none';
    //graphView.updateScrollWithBounds();
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
        .filter(n => n.params.find(p => p.type == NUMBER_VALUE) != null)
        .forEach(n => n.updateNode());
}



function updateMenuItemSeparateThousands()
{
    graph.nodes
        .filter(n => n.params.find(p => p.type == NUMBER_VALUE) != null)
        .forEach(n => n.updateNode());
}



function updateMenuItemAllowInvertParams()
{
    graph.nodes
        .filter(n => n.type == NUMBER_SIMPLE_MATH)
        .forEach(n => n.updateNode());
}



function updateMenuItemShowColorLegendInMenus()
{
    for (const menu of menuBarMenus)
        menu.items.forEach(i => i.updateLegend());
}



function enableFeatures(pro)
{
    enableMenuItem(menuItemUpgrade,            true, pro, false, pro);
    enableMenuItem(menuItemSetValueNames,      true, pro);
    enableMenuItem(menuItemEnableBetaFeatures, true, pro);
    enableMenuItem(menuItemCopyLLMPrompt,      true, pro, true, currentUserIsDev());
 // enableMenuItem(menuItemShowSnapshots,      true, sub);
    enableMenuItem(menuItemShowRestartInfo,    true, pro);
    // enableMenuItem(menuItemGetValueName,       true, pro);
    // enableMenuItem(menuItemSetValueName,       true, pro);
    // enableMenuItem(menuItemGetValueNames,      true, pro);
    // enableMenuItem(menuItemSetValueNames,      true, pro);
    // enableMenuItem(menuItemObjectName,         true, pro);
    // enableMenuItem(menuItemGetParameter,       true, pro);
    // enableMenuItem(menuItemSetParameter,       true, pro);
    enableMenuItem(menuItemVarGroup,           true, pro, true);
    enableMenuItem(menuItemTimer,              true, pro);
    enableMenuItem(menuItemAnimate,            true, pro, true);
    enableMenuItem(menuItemSaveToFile,         true, pro);
    enableMenuItem(menuItemSaveSelected,       true, pro);
    enableMenuItem(menuItemFetch,              true, pro);
    enableMenuItem(menuItemRetain,             true, pro);
    enableMenuItem(menuItemVectorNetwork,      true, pro,   true);
    enableMenuItem(menuItemVectorVertex,       true, pro,   true);
    enableMenuItem(menuItemVectorEdge,         true, pro,   true);
    enableMenuItem(menuItemVectorRegion,       true, pro,   true);
    enableMenuItem(menuItemVectorNetwork,      true, pro,   true);
    //enableMenuItem(menuItemPerspective,        true, false, true);
    //enableMenuItem(menuItemSep3d,              true, false, true);
    //enableMenuItem(menuItem3dPoint,            true, false, true);
    enableMenuItem(menuItemBooleanSep,         true, pro,   true);
    enableMenuItem(menuItemBooleanShape,       true, pro,   true);
    enableMenuItem(menuItemSaveTemplate,       true, pro);


    updatePanelButton();


    graph.nodes.forEach(n => n.updateProStatus(pro));
}



function updatePanelButton()
{
    if (btnPanel     ) btnPanel     .div.style.display = !(settings.enableBetaFeatures && subscribed()) ? 'inline-block' : 'none';
    if (btnDecoration) btnDecoration.div.style.display =  (settings.enableBetaFeatures && subscribed()) ? 'inline-block' : 'none';
}



function enableMenuItem(menuItem, enable, pro, beta = false, show = true)
{
    if (!menuItem) return;

    menuItem.enabled = enable;
    menuItem.pro     = pro;

    menuItem.setVisible(
           show 
        && (
              !beta
            ||     beta 
               && !pro 
               &&  settings.enableBetaFeatures));

    menuItem.update();
}



function updateMenuItemShowDebugMenu()
{
    updateElementDisplay(menuDebug.div, settings.showDebugMenu);

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
    uiGetLocalData('debugMode'                    );
        
    uiGetLocalData('enableZoomedOutParams'        );
    uiGetLocalData('minZoomForParams'             );
    uiGetLocalData('objectCenterSize'             );
    uiGetLocalData('objectBatchSize'              );
    uiGetLocalData('maxSolveIterations'           );
    uiGetLocalData('numberVarNullValue'           );
    uiGetLocalData('boolVarNullValue'             );
    uiGetLocalData('stringVarNullValue'           );
    uiGetLocalData('colorVarNullValue'            );
    uiGetLocalData('showAllColorSpaces'           );
    uiGetLocalData('showGrid'                     );
    uiGetLocalData('showNodeIcons'                );
    uiGetLocalData('showBoolValues'               );
    uiGetLocalData('separateThousands'            );
    uiGetLocalData('allowInvertParams'            );
    uiGetLocalData('activateDeactiatesOthers'     );
    uiGetLocalData('preferHtmlColorNames'         );
    uiGetLocalData('normalizeRandomNumbers'       );
    uiGetLocalData('randomShiftR'                 );
    uiGetLocalData('colorShiftR'                  );
    uiGetLocalData('numberShiftR'                 );

    uiGetLocalData('showSnapshots'                );
    uiGetLocalData('showRestartInfo'              );
    uiGetLocalData('showColorLegendInMenus'       );
    uiGetLocalData('showPages'                    );
    uiGetLocalData('showClearUndoWarning'         );
    uiGetLocalData('shareUsageMetrics'            );
    uiGetLocalData('showObjectCount'              );
    uiGetLocalData('showDebugMenu'                );
        
    uiGetLocalData('showNodeId'                   );
    uiGetLocalData('showTransformPoints'          );
    uiGetLocalData('enableAsserts'                );

    uiGetLocalData('showTooltipNodes'             );
    uiGetLocalData('showTooltipParams'            );
    uiGetLocalData('showTooltipLists'             );
    uiGetLocalData('showTooltipLongText'          );
    uiGetLocalData('showTooltipColorInterpolation');
    uiGetLocalData('showTooltipValidateMethod'    );
    uiGetLocalData('showTooltipColorBlindness'    );
    uiGetLocalData('showTooltipColorContrast'     );
    uiGetLocalData('showTooltipColorNames'        );
    uiGetLocalData('showTooltipAscii'             );

    uiGetLocalData('enableBetaFeatures'           );
            
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
}