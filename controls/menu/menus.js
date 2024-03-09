var btnMain;
var btnFlow;
var btnData;
var btnSets;
var btnNumber;
var btnText;
var btnColor;
var btnLayer;
//var btnStyle;
var btnShape;
var btnTemplate;
var btnGroup;
var btnHand;
var btnComment;
var btnPanel;
var btnPage;
var objectCountWrapper;
var objectCountInfo;
var objectCountProgress;
var objectCountNumber;
var btnSolo;
var btnZoom;


var menuBarMenus;


var menuMain;
var menuMainFile;
var menuShiftR;
var menuMainPreferences;
var menuMainDebug;
var menuMainHelp;

var menuShowTooltips;

var menuLogGenerator;
var menuLogStorage;
var menuLogMessages;

var menuDebugDelete;

var menuFlow;
var menuData;
var menuItems;
var menuNumber;
var menuSets;
var menuString;
var menuTextFunctions;
var menuConvertNumber;
var menuConvertText;
var menuTextData;
var menuColor;
var menuCreateColor;
var menuColorStyle;
var menuLayer;
var menuEffects;
var menuStyles;
var menuShape;
var menuTemplate;
var menuGroup;
var menuPanel;

var menuNumberBase;
var menuMath;
var menuMinMax;
var menuBoolean;
var menuCondition;
var menuTrig;
var menuFunctions;

var menuVectorPath;
var menuVectorFunctions;
var menuVectorShapes;
var menuPoint;
var menuShapes;
var menuRectangle;
var menuTransform;

var menuParams;
var menuNames;

var menuPage;

var menuZoom;
var menuWindow;


var wholeMenu;
var menuGraph;
var menuNode;
var menuNodeCopyAs;
var menuNodeHighlight;
var menuNodeSelect;


var menuLocalStyles;
var menuLocalVariables;
var menuSelectParam;

var menuRemoveLicense;

var menuText;
var menuTextbox;

var menuCopy;

var menuPageData;
var menuPageDataPages;
var menuNodeData;
var menuNodeDataSort;
var menuNodeDataNodes;
var menuConnData;
var menuConnDataSort;
var menuConnDataConns;


var menuItemSortNodesType;
var menuItemSortNodesId;
var menuItemSortNodesName;
                               
var menuItemSortNodesCreated;       
var menuItemSortNodesUpdated;       


var menuItemSortConnsInputId;
var menuItemSortConnsInputNodeId;
var menuItemSortConnsInputNodeName;

var menuItemSortConnsOutputId; 
var menuItemSortConnsOutputNodeId;
var menuItemSortConnsOutputNodeName;

var menuItemSortConnsCreated;


var menuItemShowTooltipLongText;
var menuItemShowTooltipLists;
var menuItemShowTooltipColorInterpolation;
var menuItemShowTooltipColorContrast;
var menuItemShowTooltipColorBlindness;


var menuItemEnableZoomedOutParams;
var menuItemMinZoomForParams;
var menuItemObjectCenterSize;
var menuItemObjectBatchSize;
var menuItemShowPages;
var menuPrefSep1;
var menuItemShowAllColorSpaces;
var menuItemShowNodeIcons;
var menuItemShowColorLegendInMenus;
var menuItemShowBoolValues;
var menuItemSeparateThousands;
var menuItemInvertSimpleMathParamOrder;
var menuItemRandomShiftR;
var menuItemColorShiftR;
var menuItemShowClearUndoWarning;
var menuItemShareUsageMetrics;
var menuItemShowTooltips;
var menuItemShowObjectCount;
var menuItemShowDebugMenu;
var menuItemEnableMultiplayer;
var menuPrefSep2;

var menuItemShowNodeId;
var menuItemShowTransformPoints;
var menuItemEnableAsserts;

var menuFileSep1;
var menuItemSaveToFile;
var menuItemSaveSelected;

var menuDebug;
var menuItemDebugLog;

var menuItemHelp;

var menuItemRestartSep;
var menuItemRestart;


//var menuItemEnableBetaFeatures;


var menuItemCombine;  
var menuFlowSep1;
var menuItemList;
var menuItemSelect;
var menuItemCount;
var menuItemIfElse;
var menuItemUniqueList;
var menuItemReorderList;
var menuItemShiftList;
var menuItemReverseList;
var menuItemSort;
var menuItemFilter;
var menuFlowSep2;
var menuFlowSep3;
var menuItemStart;
var menuItemRepeat;
var menuFlowSep4;
var menuItemNull;
var menuItemVarGroup;
var menuItemCache;
var menuItemFreeze;
var menuItemSetValueNames;
var menuItemValueName;
var menuItemObjectName;
var menuItemTimer;
var menuTextDataSep1;
var menuItemAnimate;  
var menuItemFetch;
var menuItemTextFile;

var menuItemArray;
var menuItemRange;
var menuItemWave;
var menuItemSequence;

var menuItemDateTime;
var menuItemIndexToName;

var menuItemSolve;  

var menuItemTextJson;

var menuItemColor;
var menuItemValidColor;
var menuItemCorrectColor;
var menuItemConvertToP3;
var menuItemColorSep1;
var menuItemColorblind;
var menuItemColorBlend;


var menuItemLayerFill;
var menuItemLayerStroke;
var menuItemLayerSep1;
var menuItemLayerDropShadow;
var menuItemLayerInnerShadow;
var menuItemLayerLayerBlur;
var menuItemLayerBackBlur;
var menuItemStyleSep2;


var menuItemShapeSep1;
var menuItemShapeSelected;
var menuItemShapeRender;

var menuItemManageTemplates;

var menuItemDebugMode;

var menuItemLogThreadMessages;
var menuItemLogDataMessages;
var menuItemLogMessages;
var menuItemLogActions;
var menuItemLogLoading;
var menuItemLogRequests;
var menuItemLogValueUpdates;
var menuItemLogObjectUpdates;
var menuItemLogStyleUpdates;
var menuItemLogRawLoadPages;
var menuItemLogRawLoadNodes;
var menuItemLogRawLoadConnections;
var menuItemLogRawSavePages;
var menuItemLogRawSaveNodes;
var menuItemLogRawSaveConnections;
var menuItemLogRawRequests;
var menuItemLogRawValues;

var menuItemZoomTo100;

var menuItemWindowNormal;
var menuItemWindowMaximize;
var menuItemWindowTop;
var menuItemWindowLeft;
var menuItemWindowRight;
var menuItemWindowBottom;

var menuItemGraphPaste;
var menuItemGraphPasteConnected;
var menuItemGraphDeactivateAll;

var menuItemNodeEditGroup;
var menuItemNodeSepGroup;
var menuItemNodeCopy;
var menuItemNodeCopyAsJsCode;
var menuItemNodeCopyAsJsFunction;
var menuItemNodePaste;
var menuItemNodePasteConnected;
var menuItemNodeRemove;
var menuItemNodeLayout;
var menuItemNodeLayoutSep;
var menuItemNodeSep1;
var menuItemNodeGroupSelected;
var menuItemNodeUngroup;
var menuItemNodeSep2;
var menuItemNodeRename;
//var menuItemNodeEdit;
var menuItemNodeSep3;
var menuItemNodeHighlight;
var menuItemNodeNotConditionSep;
var menuItemNodeNotCondition;
var menuItemNodeSelect;
// var menuItemNodeBringToFront;
// var menuItemNodeSendToBack;
var menuItemNodeActivate;
var menuItemNodeDeactivate;
var menuItemNodeSaveAsTemplate;
var menuItemNodeSep4;
var menuItemNodeEnableDisable;
var menuItemNodeSep5;
var menuItemNodeConnectSeeds;
var menuItemNodeRandomizeColor;
var menuItemNodeRandomizeSeeds;
var menuItemPointAlongPath;
var menuItemClosestPointOnPath;
var menuItemPathLength;
var menuItemVectorVertex;
var menuItemVectorEdge;
var menuItemVectorRegion;
var menuItemVectorNetwork;

var menuItemLicenseSep1;
var menuItemLicenseRemove;

var menuItemSaveTemplate;
var menuItemManageTemplates;



function initGeneratorMenus()
{
    menuShowTooltips = new Menu('Show tooltips', false);
    menuShowTooltips.addItems([
        menuItemShowTooltipLists              = new MenuItem('List items',          null, {checkCallback: () => settings.showTooltipLists,              callback: () => { updateSettingAndMenu('showTooltipLists',              true, !settings.showTooltipLists             ); }}),
        menuItemShowTooltipLongText           = new MenuItem('Long text',           null, {checkCallback: () => settings.showTooltipLongText,           callback: () => { updateSettingAndMenu('showTooltipLongText',           true, !settings.showTooltipLongText          ); }}),
        menuItemShowTooltipColorContrast      = new MenuItem('Color contrast',      null, {checkCallback: () => settings.showTooltipColorContrast,      callback: () => { updateSettingAndMenu('showTooltipColorContrast',      true, !settings.showTooltipColorContrast     ); }}),
        menuItemShowTooltipColorInterpolation = new MenuItem('Color interpolation', null, {checkCallback: () => settings.showTooltipColorInterpolation, callback: () => { updateSettingAndMenu('showTooltipColorInterpolation', true, !settings.showTooltipColorInterpolation); }}),
        menuItemShowTooltipColorBlindness     = new MenuItem('Color blindness',     null, {checkCallback: () => settings.showTooltipColorBlindness,     callback: () => { updateSettingAndMenu('showTooltipColorBlindness',     true, !settings.showTooltipColorBlindness    ); }})]);


    menuMainFile = new Menu('File', false);
    menuMainFile.addItems([
                               new MenuItem('Open file . . .',          null, {callback: () => { hideAllMenus(); checkDeleteNodesWarning(() => uiOpenLocalFile()); }}),
                               new MenuItem('Import from file . . .',   null, {callback: () => { hideAllMenus(); uiImportFromLocalFile(); }}),
        menuFileSep1         = new MenuItem('',                         null, {separator: true}),    
        menuItemSaveToFile   = new MenuItem('Save to file . . .',       null, {shortcut: osCtrl() + 'S', callback: () => { hideAllMenus(); uiSaveToLocalFile(); }}),
        menuItemSaveSelected = new MenuItem('Save selected . . .',      null, {shortcut: osCtrlShift() + 'S', callback: () => { hideAllMenus(); uiSaveSelectionToLocalFile(); }})]);


    menuShiftR = new Menu('Shift+R', false);
    menuShiftR.addItems([
        menuItemRandomShiftR = new MenuItem('Random nodes', null, {checkCallback: () => settings.randomShiftR, callback: () => { updateSettingAndMenu('randomShiftR', true, !settings.randomShiftR); }}),
        menuItemColorShiftR  = new MenuItem('Color nodes',  null, {checkCallback: () => settings.colorShiftR,  callback: () => { updateSettingAndMenu('colorShiftR',  true, !settings.colorShiftR);  }})]);


    menuMainPreferences = new Menu('Preferences', false);
    menuMainPreferences.addItems([
        // menuItemShowPages               = new MenuItem('Show pages',                         null, {checkCallback: () => settings.showAllColorSpaces,         callback: () => { updateSettingAndMenu('showPages',                  true, !settings.showPages);                  updateMenuItemShowPages();                  }}),
        // menuPrefSep1                    = new MenuItem('',                                   null, {separator: true}),    
        menuItemShowAllColorSpaces         = new MenuItem('Show all color spaces',              null, {checkCallback: () => settings.showAllColorSpaces,         callback: () => { updateSettingAndMenu('showAllColorSpaces',         true, !settings.showAllColorSpaces);         updateMenuItemShowAllColorSpaces();         }}),
        menuItemShowNodeIcons              = new MenuItem('Show node icons',                    null, {checkCallback: () => settings.showNodeIcons,              callback: () => { updateSettingAndMenu('showNodeIcons',              true, !settings.showNodeIcons);              updateMenuItemShowNodeIcons();              }}),
        menuItemShowBoolValues             = new MenuItem('Show boolean values as   ✓ ✗',      null, {checkCallback: () => settings.showBoolValues,             callback: () => { updateSettingAndMenu('showBoolValues',             true, !settings.showBoolValues);             updateMenuItemShowBoolValues();             }}),
        menuItemSeparateThousands          = new MenuItem('Separate thousands in numbers',      null, {checkCallback: () => settings.separateThousands,          callback: () => { updateSettingAndMenu('separateThousands',          true, !settings.separateThousands);          updateMenuItemSeparateThousands();          }}),
        menuItemInvertSimpleMathParamOrder = new MenuItem('Invert simple math parameters',      null, {checkCallback: () => settings.invertSimpleMathParamOrder, callback: () => { updateSettingAndMenu('invertSimpleMathParamOrder', true, !settings.invertSimpleMathParamOrder); updateMenuItemInvertSimpleMathParamOrder(); }}),
                                             new MenuItem( osShift(true) + 'R randomizes selected . . .',                 null, {childMenu: menuShiftR}),
        //menuItemShowColorLegendInMenus   = new MenuItem('Show color legend in menus',         null, {checkCallback: () => settings.showColorLegendInMenus,     callback: () => { updateSettingAndMenu('showColorLegendInMenus',     true, !settings.showColorLegendInMenus);     updateMenuItemShowColorLegendInMenus();     }}),
                                             new MenuItem('',                                   null, {separator: true}),    
        menuItemShowTooltips               = new MenuItem('Show tooltips',                      null, {childMenu: menuShowTooltips}),
        menuItemShowClearUndoWarning       = new MenuItem('Show clear undo warning',            null, {checkCallback: () => settings.showClearUndoWarning,       callback: () => { updateSettingAndMenu('showClearUndoWarning',       true, !settings.showClearUndoWarning);                                                   }}),
        menuItemShowObjectCount            = new MenuItem('Show object count',                  null, {checkCallback: () => settings.showObjectCount,            callback: () => { updateSettingAndMenu('showObjectCount',            true, !settings.showObjectCount);            updateObjectCountDisplay();                 }}),
        menuItemShowDebugMenu              = new MenuItem('Show debug menu',                    null, {checkCallback: () => settings.showDebugMenu,              callback: () => { uiGetLocalData('debugWarning'); }}),
                                             new MenuItem('',                     null, {separator: true}),
        menuItemShareUsageMetrics          = new MenuItem('Share anonymous metrics',           null, {checkCallback: () => settings.shareUsageMetrics,      callback: () => { updateSettingAndMenu('shareUsageMetrics',      true, !settings.shareUsageMetrics);                                              }}),
                                             new MenuItem('',                                   null, {separator: true}),    
        menuItemMinZoomForParams           = new MenuItem('Zoom level for values . . .',        null, {callback: () => showMinZoomDialog()}),
        //menuPrefSep2                       = new MenuItem('',                                   null, {separator: true}),    
        // menuItemEnableMultiplayer       = new MenuItem('Enable multiplayer on this canvas',  null, {checkCallback: () => multiplayerEnabled,                  callback: () => { updateSettingAndMenu('showPages',                  true, !settings.showPages);                  enableMultiplayer(!multiplayerEnabled);     }}),
        //                                   new MenuItem('',                                   null, {separator: true}),    
        // menuItemEnableBetaFeatures      = new MenuItem('Enable beta features',               null, {checkCallback: () => settings.enableBetaFeatures,         callback: () => { updateSettingAndMenu('enableBetaFeatures',         true, !settings.enableBetaFeatures);         enableFeatures(true, settings.enableBetaFeatures); }}),
        menuItemObjectCenterSize           = new MenuItem('Object center size . . .',           null, {callback: () => showObjectCenterSizeDialog()}),
        menuItemObjectBatchSize            = new MenuItem('Update batch size . . .',            null, {callback: () => showObjectBatchDialog()})]);
        

    menuItemShowBoolValues.divName.innerHTML = 'Show boolean values as   <span style="position: relative; top: 1px;">' + TRUE_DISPLAY_MENU + '</span>  <span>' + FALSE_DISPLAY_MENU + '</span>';


    menuLogGenerator = new Menu('Log generator', false);
    menuLogGenerator.addItems([
        menuItemLogRequests       = new MenuItem('Requests',          null, {checkCallback: () => settings.logRequests     ,      callback: () => updateSettingAndMenu('logRequests',           true, !settings.logRequests          ), setting: true}),
        menuItemLogValueUpdates   = new MenuItem('Values',            null, {checkCallback: () => settings.logValueUpdates ,      callback: () => updateSettingAndMenu('logValueUpdates',       true, !settings.logValueUpdates      ), setting: true}),
        menuItemLogObjectUpdates  = new MenuItem('Objects',           null, {checkCallback: () => settings.logObjectUpdates,      callback: () => updateSettingAndMenu('logObjectUpdates',      true, !settings.logObjectUpdates     ), setting: true}),
        menuItemLogStyleUpdates   = new MenuItem('Styles',            null, {checkCallback: () => settings.logStyleUpdates ,      callback: () => updateSettingAndMenu('logStyleUpdates',       true, !settings.logStyleUpdates      ), setting: true}),
                                    new MenuItem('',                  null, {separator: true}),                   
        menuItemLogRawRequests    = new MenuItem('Raw\u2008requests', null, {checkCallback: () => settings.logRawRequests  ,      callback: () => updateSettingAndMenu('logRawRequests',        true, !settings.logRawRequests       ), setting: true}),
        menuItemLogRawValues      = new MenuItem('Raw\u2008values',   null, {checkCallback: () => settings.logRawValues    ,      callback: () => updateSettingAndMenu('logRawValues',          true, !settings.logRawValues         ), setting: true})]);
                     


    menuLogStorage = new Menu('Log storage', false);
    menuLogStorage.addItems([
        menuItemLogLoading            = new MenuItem('Load\u2008at start',  null, {checkCallback: () => settings.logLoading      ,      callback: () => updateSettingAndMenu('logLoading',            true, !settings.logLoading           ), setting: true}),
                                        new MenuItem('',                    null, {separator: true}),                   
        menuItemLogRawLoadPages       = new MenuItem('Load pages',          null, {checkCallback: () => settings.logRawLoadPages ,      callback: () => updateSettingAndMenu('logRawLoadPages',       true, !settings.logRawLoadPages      ), setting: true}),
        menuItemLogRawSavePages       = new MenuItem('Save pages',          null, {checkCallback: () => settings.logRawSavePages ,      callback: () => updateSettingAndMenu('logRawSavePages',       true, !settings.logRawSavePages      ), setting: true}),
                                        new MenuItem('',                    null, {separator: true}),                   
        menuItemLogRawLoadNodes       = new MenuItem('Load nodes',          null, {checkCallback: () => settings.logRawLoadNodes ,      callback: () => updateSettingAndMenu('logRawLoadNodes',       true, !settings.logRawLoadNodes      ), setting: true}),
        menuItemLogRawSaveNodes       = new MenuItem('Save nodes',          null, {checkCallback: () => settings.logRawSaveNodes ,      callback: () => updateSettingAndMenu('logRawSaveNodes',       true, !settings.logRawSaveNodes      ), setting: true}),
                                        new MenuItem('',                    null, {separator: true}),                   
        menuItemLogRawLoadConnections = new MenuItem('Load connections',    null, {checkCallback: () => settings.logRawLoadConnections, callback: () => updateSettingAndMenu('logRawLoadConnections', true, !settings.logRawLoadConnections), setting: true}),
        menuItemLogRawSaveConnections = new MenuItem('Save connections',    null, {checkCallback: () => settings.logRawSaveConnections, callback: () => updateSettingAndMenu('logRawSaveConnections', true, !settings.logRawSaveConnections), setting: true}),
                                        new MenuItem('',                    null, {separator: true}),
                                        new MenuItem('All page keys',       null, {callback:      () => { hideAllMenus(); uiQueueMessageToFigma({cmd: 'figLogAllSavedPageKeys', darkMode: darkMode}); }}),
                                        new MenuItem('All connection keys', null, {callback:      () => { hideAllMenus(); uiQueueMessageToFigma({cmd: 'figLogAllSavedConnKeys', darkMode: darkMode}); }}),
                                        new MenuItem('',                    null, {separator: true}),   
                                        new MenuItem('All pages',           null, {callback:      () => { hideAllMenus(); uiQueueMessageToFigma({cmd: 'figLogAllSavedPages',    darkMode: darkMode}); }}),
                                        new MenuItem('',                    null, {separator: true}),   
                                        new MenuItem('All local data',      null, {callback:      () => { hideAllMenus(); uiQueueMessageToFigma({cmd: 'figLogAllLocalData',     darkMode: darkMode}); }}),
                                        new MenuItem('',                    null, {separator: true}),   
                                        new MenuItem('Undo stack',          null, {callback:      () => { hideAllMenus(); logUndoStack(); }}),
                                        new MenuItem('Redo stack',          null, {callback:      () => { hideAllMenus(); logRedoStack(); }})]);
                     

    menuLogMessages = new Menu('Log messages', false);
    menuLogMessages.addItems([
        menuItemLogThreadMessages = new MenuItem('Thread messages', null, {checkCallback: () => settings.logThreadMessages,     callback: () => updateSettingAndMenu('logThreadMessages',     true, !settings.logThreadMessages    ), setting: true}),
        menuItemLogDataMessages   = new MenuItem('Data messages',   null, {checkCallback: () => settings.logDataMessages  ,     callback: () => updateSettingAndMenu('logDataMessages',       true, !settings.logDataMessages      ), setting: true}),
        menuItemLogMessages       = new MenuItem('Other messages',  null, {checkCallback: () => settings.logMessages     ,      callback: () => updateSettingAndMenu('logMessages',           true, !settings.logMessages          ), setting: true})]);
                     


    menuDebugDelete = new Menu('Debug generator', false);
    menuDebugDelete.addItems([
        new MenuItem('All saved pages',       null, {callback: () => { hideAllMenus(); uiRemoveAllSavedPages(); }}),
        new MenuItem('',                      null, {separator: true}),                   
        new MenuItem('Connections to . . .',     null, {callback: () => showDeleteConnectionsDialog()}),                        
        new MenuItem('All saved connections', null, {callback: () => { hideAllMenus(); uiRemoveAllSavedConnections(); }}),
        new MenuItem('',                      null, {separator: true}),                   
        new MenuItem('All style links',       null, {callback: () => { hideAllMenus(); uiRemovePluginDataFromAllLocalStyles(); }}),
        new MenuItem('',                      null, {separator: true}),                   
        new MenuItem('All local data',        null, {callback: () => { hideAllMenus(); uiQueueMessageToFigma({cmd: 'figClearAllLocalData'}); }})]);
                     

    menuMainDebug = new Menu('Debug', false);
    menuMainDebug.addItems([
    menuItemShowNodeId = new MenuItem('Show node IDs', null,
                        {
                            checkCallback: () => settings.showNodeId, 
                            callback:      () => 
                            {
                                updateSettingAndMenu('showNodeId', true, !settings.showNodeId);
                                    
                                graph.nodes.forEach(n => n.updateNode());
                                graph.nodes.forEach(n => n.updateMeasureData());
                                graph.nodes.forEach(n => n.updateHeaderLabelOffsetX());

                                graph.updatePages();

                                pushUpdate(null, graph.nodes.filter(n => n.active));
                            }
                        }),
    // menuItemShowTransformPoints = new MenuItem('Show transforms', null,
    //                     {
    //                         checkCallback: () => settings.showTransformPoints, 
    //                         callback:      () => 
    //                         {
    //                             updateSettingAndMenu('showTransformPoints', true, !settings.showTransformPoints);
    //                             pushUpdate(null, graph.nodes.filter(n => n.active));
    //                         }
    //                     }),
    menuItemEnableAsserts = new MenuItem('Enable asserts', null,
                         {
                             checkCallback: () => settings.enableAsserts, 
                             callback:      () => updateSettingAndMenu('enableAsserts', true, !settings.enableAsserts)
                         }),
                         new MenuItem('',                      null, {separator: true}),
    menuItemLogActions = new MenuItem('Log actions',           null, {checkCallback: () => settings.logActions, callback: () => updateSettingAndMenu('logActions', true, !settings.logActions), setting: true}),
                         new MenuItem('Log generator',         null, {childMenu: menuLogGenerator}),
                         new MenuItem('Log messages',          null, {childMenu: menuLogMessages}),
                         new MenuItem('Log storage',           null, {childMenu: menuLogStorage}),
                         new MenuItem('',                      null, {separator: true}),   
                         new MenuItem('Delete',                null, {childMenu: menuDebugDelete}),
                         new MenuItem('',                      null, {separator: true}),   
                         new MenuItem('Update legacy nodes',   null, {callback: () => uiUpdateLegacyNodes()}),
                         new MenuItem('',                      null, {separator: true}),   
    menuItemDebugMode  = new MenuItem('Restart in debug mode', null, {callback: () => uiRestartGenerator(true)})]);
                     

    //menuMainHelp = new Menu('Help and subscription', false);
    menuMainHelp = new Menu('Help', false);
    menuMainHelp.addItems([
        new MenuItem('Keyboard shortcuts',   null, {shortcut: osCtrlShift() + '?', callback: () => showKeyboardPanel()}),
        new MenuItem('Tutorials & examples', null, {callback: () => showPresets()}),
        new MenuItem('Video tutorials',      null, {callback: () => window.open('https://www.youtube.com/channel/UC1tInoqlh6TYHlFJ3q-YEmA', '_blank')}),
        // new MenuItem('Help page',         null, {callback:  () => window.open('http://www.bourt.com/generator/help', '_blank')}),
        new MenuItem('',                     null, {separator: true}),
        //new MenuItem('Subscription',       null, {callback:  () => showSubscriptionDialog(false)}),
        new MenuItem('About',                null, {callback:  () => showAboutDialog()})]);


    menuMain = new Menu('Main menu', true, false, true);
    menuMain.addItems([
                             new MenuItem('Quick actions. . .',     null, {icon: iconSearchMenu, shortcut: osCtrl() + '/', callback: () => { hideAllMenus(); showSearchBox(); }}),
                             new MenuItem('',                       null, {separator: true}),
                             new MenuItem('File',                   null, {childMenu: menuMainFile}),
                             new MenuItem('',                       null, {separator: true}),
                             new MenuItem('Preferences',            null, {childMenu: menuMainPreferences}),
        menuDebug          = new MenuItem('Debug',                  null, {childMenu: menuMainDebug}),
                             new MenuItem('',                       null, {separator: true}),
      //menuItemHelp       = new MenuItem('Help and subscription',  null, {childMenu: menuMainHelp }),
        menuItemHelp       = new MenuItem('Help',                   null, {childMenu: menuMainHelp }),
        menuItemRestartSep = new MenuItem('',                       null, {separator: true}),
        menuItemRestart    = new MenuItem('Restart to update. . .', null, {icon: iconUpdate, callback: () => uiRestartGenerator()})]);

    updateElementDisplay(menuItemRestartSep.div, false);
    updateElementDisplay(menuItemRestart   .div, false);


    menuParams = new Menu('Parameters', true, false);
    menuParams.addItems([
        new MenuItem('Set parameter', null, {icon: iconSetParam, createType: SET_PARAM, callback: e => actionManager.do(getCreateNodeAction(SET_PARAM, btnFlow.div, getCreateOptions(e)))}),
        new MenuItem('Get parameter', null, {icon: iconGetParam, createType: GET_PARAM, callback: e => actionManager.do(getCreateNodeAction(GET_PARAM, btnFlow.div, getCreateOptions(e)))})]);

    menuNames = new Menu('Name', true, false);
    menuNames.addItems([
                                new MenuItem('Get list value names', null, {icon: iconListNames,      createType: GET_LIST_VALUE_NAMES, callback: e => actionManager.do(getCreateNodeAction(GET_LIST_VALUE_NAMES, btnFlow.div, getCreateOptions(e)))}),
        menuItemSetValueNames = new MenuItem('Set list value names', null, {icon: iconListValueNames, createType: LIST_VALUE_NAMES,     callback: e => actionManager.do(getCreateNodeAction(LIST_VALUE_NAMES,     btnFlow.div, getCreateOptions(e)))}),
        menuItemValueName     = new MenuItem('Set value name',       null, {icon: iconValueName,      createType: VALUE_NAME,           callback: e => actionManager.do(getCreateNodeAction(VALUE_NAME,           btnFlow.div, getCreateOptions(e)))}),
        menuItemObjectName    = new MenuItem('Set object name',      null, {icon: iconObjectName,     createType: OBJECT_NAME,          callback: e => actionManager.do(getCreateNodeAction(OBJECT_NAME,          btnFlow.div, getCreateOptions(e)))})]);

    menuNames.init = () => menuNames.minWidth = subscribed() ? 200 : 220;        


    menuFlow = new Menu('Flow', true, false);
    menuFlow.addItems([
        menuItemStart      = new MenuItem('Start . . .',       null, {icon: iconStart,         createType: START,            callback: e => actionManager.do(getCreateNodeAction(START,           btnFlow.div, getCreateOptions(e)))}),
        menuItemRepeat     = new MenuItem('. . . Repeat',      null, {icon: iconRepeat,        createType: REPEAT,           callback: e => actionManager.do(getCreateNodeAction(REPEAT,          btnFlow.div, getCreateOptions(e)))}),
                             new MenuItem('',                  null, {separator: true}),
        menuItemCache      = new MenuItem('Cache. . .',        null, {icon: iconCache,         createType: CACHE,            callback: e => actionManager.do(getCreateNodeAction(CACHE,           btnFlow.div, getCreateOptions(e)))}),
        menuItemFreeze     = new MenuItem('Freeze',            null, {icon: iconFreeze,        createType: FREEZE,           callback: e => actionManager.do(getCreateNodeAction(FREEZE,          btnFlow.div, getCreateOptions(e)))}),
                             new MenuItem('',                  null, {separator: true}),
        menuItemNull       = new MenuItem('Null',              null, {icon: iconNull,          createType: NULL_NODE,        callback: e => actionManager.do(getCreateNodeAction(NULL_NODE,       btnFlow.div, getCreateOptions(e)))}),
                             new MenuItem('',                  null, {separator: true}),
                             new MenuItem('Variable',          null, {icon: iconVariable,      createType: VARIABLE,         callback: e => actionManager.do(getCreateNodeAction(VARIABLE,        btnFlow.div, getCreateOptions(e)))}),
      //menuItemVarGroup   = new MenuItem('Variable group',    null, {icon: iconVariableGroup, createType: VARIABLE_GROUP, callback: e => actionManager.do(getCreateNodeAction(VARIABLE_GROUP,  btnFlow.div, getCreateOptions(e)))}),
                             new MenuItem('',                  null, {separator: true}),
                             new MenuItem('Parameters',        null, {icon: iconParameters, childMenu: menuParams}),
                             new MenuItem('Value names',       null, {icon: iconNames, childMenu: menuNames}),
                             new MenuItem('',                  null, {separator: true}),
        menuItemTimer      = new MenuItem('Timer ',            null, {icon: iconTimer,         createType: TIMER,            callback: e => actionManager.do(getCreateNodeAction(TIMER,           btnFlow.div, getCreateOptions(e)))})]);
        //menuItemAnimate    = new MenuItem('Animate',           null, {icon: iconAnimate,       createType: NUMBER_ANIMATE,   callback: e => actionManager.do(getCreateNodeAction(NUMBER_ANIMATE,  btnFlow.div, getCreateOptions(e)))})]);
    

    menuItems = new Menu('Data', true, false);
    menuItems.addItems([
                              new MenuItem('Sublist',           null,            {icon: iconSublist,      createType: SUBLIST,       callback: e => actionManager.do(getCreateNodeAction(SUBLIST,       btnData.div, getCreateOptions(e)))}),
                              new MenuItem('Extract items',     null,            {icon: iconExtract,      createType: EXTRACT,       callback: e => actionManager.do(getCreateNodeAction(EXTRACT,       btnData.div, getCreateOptions(e)))}),
        menuItemUniqueList  = new MenuItem('Unique',            null,            {icon: iconUnique,       createType: UNIQUE,        callback: e => actionManager.do(getCreateNodeAction(UNIQUE,        btnData.div, getCreateOptions(e)))}),
        menuItemFilter      = new MenuItem('Filter',            null,            {icon: iconFilter,       createType: FILTER,        callback: e => actionManager.do(getCreateNodeAction(FILTER,        btnData.div, getCreateOptions(e)))}),
        menuItemSort        = new MenuItem('Sort',              null,            {icon: iconSort,         createType: SORT,          callback: e => actionManager.do(getCreateNodeAction(SORT,          btnData.div, getCreateOptions(e)))}),
        menuItemReorderList = new MenuItem('Reorder',           null,            {icon: iconReorderList,  createType: REORDER_LIST,  callback: e => actionManager.do(getCreateNodeAction(REORDER_LIST,  btnData.div, getCreateOptions(e)))}),
        menuItemShiftList   = new MenuItem('Shift',             'Shift list',    {icon: iconShiftList,    createType: SHIFT_LIST,    callback: e => actionManager.do(getCreateNodeAction(SHIFT_LIST,    btnData.div, getCreateOptions(e)))}),
        menuItemReverseList = new MenuItem('Reverse',           null,            {icon: iconReverseList,  createType: REVERSE_LIST,  callback: e => actionManager.do(getCreateNodeAction(REVERSE_LIST,  btnData.div, getCreateOptions(e)))})]);
    

    menuData = new Menu('Data', true, false);
    menuData.addItems([
        menuItemCombine     = new MenuItem('Combine',           null,            {icon: iconCombine,       createType: COMBINE,       callback: e => actionManager.do(getCreateNodeAction(COMBINE,          btnData.div, getCreateOptions(e)))}),
        menuItemList        = new MenuItem('List...',           null,            {icon: iconList,          createType: LIST,          callback: e => actionManager.do(getCreateNodeAction(LIST,             btnData.div, getCreateOptions(e)))}),
                              new MenuItem('',                  null,            {separator: true}),     
        menuItemCount       = new MenuItem('Count',             null,            {icon: iconCount,         createType: LIST_COUNT,    callback: e => actionManager.do(getCreateNodeAction(LIST_COUNT,       btnData.div, getCreateOptions(e)))}),
                              //new MenuItem('Object count',      null,            {icon: iconObjectCount,   createType: OBJECT_COUNT,  callback: e => actionManager.do(getCreateNodeAction(OBJECT_COUNT,     btnData.div, getCreateOptions(e)))}),
                              //new MenuItem('',                  null,            {separator: true}),     
                              new MenuItem('Contains',          'List contains', {icon: iconContains,      createType: CONTAINS,      callback: e => actionManager.do(getCreateNodeAction(CONTAINS,         btnData.div, getCreateOptions(e))), disambiguate: true}),
                              new MenuItem('',                  null,            {separator: true}),     
                              new MenuItem('Functions',         null,            {icon: iconListFunctions, childMenu: menuItems}),
                              new MenuItem('',                  null,            {separator: true}),     
        menuItemIfElse      = new MenuItem('I&hairsp;f / else', null,            {icon: iconIfElse,        createType: IF_ELSE,       callback: e => actionManager.do(getCreateNodeAction(IF_ELSE,          btnData.div, getCreateOptions(e))), disambiguate: true}),
        menuItemSelect      = new MenuItem('Select',            null,            {icon: iconSelect,        createType: SELECT,        callback: e => actionManager.do(getCreateNodeAction(SELECT,           btnData.div, getCreateOptions(e)))}),
                              new MenuItem('Select from list',  null, {icon: iconSelectFromList, createType: SELECT_FROM_LIST,        callback: e => actionManager.do(getCreateNodeAction(SELECT_FROM_LIST, btnData.div, getCreateOptions(e)))}),
                              new MenuItem('',                  null,            {separator: true}),     
                              new MenuItem('Column',            null,            {icon: iconColumn,        createType: COLUMN,        callback: e => actionManager.do(getCreateNodeAction(COLUMN,           btnData.div, getCreateOptions(e)))}),
                              new MenuItem('Cell',              null,            {icon: iconCell,          createType: CELL,          callback: e => actionManager.do(getCreateNodeAction(CELL,             btnData.div, getCreateOptions(e)))}),
                              new MenuItem('',                  null,            {separator: true}),     
                              new MenuItem('List as item',      null,            {icon: iconListAsItem,    createType: LIST_AS_ITEM,  callback: e => actionManager.do(getCreateNodeAction(LIST_AS_ITEM,     btnData.div, getCreateOptions(e)))})]);
    

    menuSets = new Menu('Sets...', true, false);
    menuSets.addItems([
        menuItemArray    = new MenuItem('Iterate. . .',     null, {icon: iconIterate,     createType: ITERATE,            callback: e => actionManager.do(getCreateNodeAction(ITERATE,            btnSets.div, getCreateOptions(e)))}),
                           new MenuItem('',                 null, {separator: true}),
        menuItemSequence = new MenuItem('Sequence. . .',    null, {icon: iconSequence,    createType: NUMBER_SEQUENCE,    callback: e => actionManager.do(getCreateNodeAction(NUMBER_SEQUENCE,    btnSets.div, getCreateOptions(e)))}),
        menuItemRange    = new MenuItem('Range. . .',       null, {icon: iconRange,       createType: NUMBER_RANGE,       callback: e => actionManager.do(getCreateNodeAction(NUMBER_RANGE,       btnSets.div, getCreateOptions(e)))}),
        menuItemWave     = new MenuItem('Wave. . .',        null, {icon: iconWave,        createType: NUMBER_WAVE,        callback: e => actionManager.do(getCreateNodeAction(NUMBER_WAVE,        btnSets.div, getCreateOptions(e)))}),
                           new MenuItem('',                 null, {separator: true}),
                           new MenuItem('Random . . .',     null, {icon: iconRandom,      createType: NUMBER_RANDOM,      callback: e => actionManager.do(getCreateNodeAction(NUMBER_RANDOM,      btnSets.div, getCreateOptions(e)))}),
                           new MenuItem('Noise. . .',       null, {icon: iconNoise,       createType: NUMBER_NOISE,       callback: e => actionManager.do(getCreateNodeAction(NUMBER_NOISE,       btnSets.div, getCreateOptions(e)))}),
                           new MenuItem('Probability. . .', null, {icon: iconProbability, createType: NUMBER_PROBABILITY, callback: e => actionManager.do(getCreateNodeAction(NUMBER_PROBABILITY, btnSets.div, getCreateOptions(e)))}),
                           new MenuItem('',                 null, {separator: true}),
                           new MenuItem('Accumulate. . .',  null, {icon: iconAccumulate,  createType: NUMBER_ACCUMULATE,  callback: e => actionManager.do(getCreateNodeAction(NUMBER_ACCUMULATE,  btnSets.div, getCreateOptions(e)))})]);
        
    
    menuMath = new Menu('Math', true, false);
    menuMath.addItems([
        new MenuItem('Math',  null, {icon: iconMulti, createType: NUMBER_MATH, callback: e => actionManager.do(getCreateNodeAction(NUMBER_MATH, btnNumber.div, getCreateOptions(e)))})]);
        

    menuMinMax = new Menu('Min/max', true, false);
    menuMinMax.addItems([
        new MenuItem('Min / max',  null, {icon: iconMulti, createType: NUMBER_MINMAX, callback: e => actionManager.do(getCreateNodeAction(NUMBER_MINMAX, btnNumber.div, getCreateOptions(e)))})]);
        

    menuBoolean = new Menu('Boolean', true, false);
    menuBoolean.addItems([
        new MenuItem('And', null, {icon: iconAnd, createType: NUMBER_AND, callback: e => actionManager.do(getCreateNodeAction(NUMBER_AND, btnNumber.div, getCreateOptions(e)))}),
        new MenuItem('Or',  null, {icon: iconOr , createType: NUMBER_OR,  callback: e => actionManager.do(getCreateNodeAction(NUMBER_OR,  btnNumber.div, getCreateOptions(e)))}),
        new MenuItem('Xor', null, {icon: iconXor, createType: NUMBER_XOR, callback: e => actionManager.do(getCreateNodeAction(NUMBER_XOR, btnNumber.div, getCreateOptions(e)))}),
        new MenuItem('Not', null, {icon: iconNot, createType: NUMBER_NOT, callback: e => actionManager.do(getCreateNodeAction(NUMBER_NOT, btnNumber.div, getCreateOptions(e)))})]);
        
    
    menuCondition = new Menu('Compare', true, false);
    menuCondition.addItems([
        new MenuItem('Greater',          null, {icon: iconGreater,        createType: NUMBER_GREATER,          callback: e => actionManager.do(getCreateNodeAction(NUMBER_GREATER,          btnNumber.div, getCreateOptions(e)))}),
        new MenuItem('Greater or equal', null, {icon: iconGreaterOrEqual, createType: NUMBER_GREATER_OR_EQUAL, callback: e => actionManager.do(getCreateNodeAction(NUMBER_GREATER_OR_EQUAL, btnNumber.div, getCreateOptions(e)))}),
        new MenuItem('Equal',            null, {icon: iconEqual,          createType: NUMBER_EQUAL,            callback: e => actionManager.do(getCreateNodeAction(NUMBER_EQUAL,            btnNumber.div, getCreateOptions(e)))}),
        new MenuItem('Not equal',        null, {icon: iconNotEqual,       createType: NUMBER_NOT_EQUAL,        callback: e => actionManager.do(getCreateNodeAction(NUMBER_NOT_EQUAL,        btnNumber.div, getCreateOptions(e)))}),
        new MenuItem('Less or equal',    null, {icon: iconLessOrEqual,    createType: NUMBER_LESS_OR_EQUAL,    callback: e => actionManager.do(getCreateNodeAction(NUMBER_LESS_OR_EQUAL,    btnNumber.div, getCreateOptions(e)))}),
        new MenuItem('Less',             null, {icon: iconLess,           createType: NUMBER_LESS,             callback: e => actionManager.do(getCreateNodeAction(NUMBER_LESS,             btnNumber.div, getCreateOptions(e)))})]);
        
    
    // menuTrig = new Menu('Trigonometric', true, false);
    // menuTrig.addItems([
        // new MenuItem('Sine',       null, {icon: iconSine,    createType: NUMBER_SIN,   callback: e => actionManager.do(getCreateNodeAction(NUMBER_SIN,   btnNumber.div, getCreateOptions(e)))}),
        // new MenuItem('Cosine',     null, {icon: iconCosine,  createType: NUMBER_COS,   callback: e => actionManager.do(getCreateNodeAction(NUMBER_COS,   btnNumber.div, getCreateOptions(e)))}),
        // new MenuItem('Tangent',    null, {icon: iconTangent, createType: NUMBER_TAN,   callback: e => actionManager.do(getCreateNodeAction(NUMBER_TAN,   btnNumber.div, getCreateOptions(e)))})]);
        
    
    menuNumberBase = new Menu('Numbers', true, false);
    menuNumberBase.addItems([
                           new MenuItem('Constant',      null, {icon: iconConstant,        createType: NUMBER_CONSTANT,  callback: e => actionManager.do(getCreateNodeAction(NUMBER_CONSTANT,  btnNumber.div, getCreateOptions(e)))}),
                           new MenuItem('',              null, {separator: true}),
                           new MenuItem('Precision',     null, {icon: iconNumberPrecision, createType: NUMBER_PRECISION, callback: e => actionManager.do(getCreateNodeAction(NUMBER_PRECISION, btnNumber.div, getCreateOptions(e)))}),
                           new MenuItem('NaN ⟶ Number', null, {icon: iconNaNisNumber,     createType: NUMBER_NAN,       callback: e => actionManager.do(getCreateNodeAction(NUMBER_NAN,       btnNumber.div, getCreateOptions(e)))}),
                           new MenuItem('',              null, {separator: true}),
        menuItemDateTime = new MenuItem('Date & time',   null, {icon: iconDateTime,    createType: NUMBER_DATETIME,      callback: e => actionManager.do(getCreateNodeAction(NUMBER_DATETIME,      btnNumber.div, getCreateOptions(e)))})]);

    menuFunctions = new Menu('Functions', true, false);
    menuFunctions.addItems([
                           new MenuItem('Sign',          null, {icon: iconSign,        createType: NUMBER_SIGN,          callback: e => actionManager.do(getCreateNodeAction(NUMBER_SIGN,          btnNumber.div, getCreateOptions(e)))}),
                           new MenuItem('Negative',      null, {icon: iconNegative,    createType: NUMBER_NEGATIVE,      callback: e => actionManager.do(getCreateNodeAction(NUMBER_NEGATIVE,      btnNumber.div, getCreateOptions(e)))}),
                           new MenuItem('Absolute',      null, {icon: iconAbsolute,    createType: NUMBER_ABSOLUTE,      callback: e => actionManager.do(getCreateNodeAction(NUMBER_ABSOLUTE,      btnNumber.div, getCreateOptions(e)))}),
                           new MenuItem('Round',         null, {icon: iconRound,       createType: NUMBER_ROUND,         callback: e => actionManager.do(getCreateNodeAction(NUMBER_ROUND,         btnNumber.div, getCreateOptions(e)))}),
                           new MenuItem('Min / max',     null, {icon: iconMinMax,      childMenu: menuMinMax, createType: NUMBER_SIMPLE_MINMAX, callback: e => actionManager.do(getCreateNodeAction(NUMBER_SIMPLE_MINMAX, btnNumber.div, getCreateOptions(e)))}),
                           new MenuItem('',              null, {separator: true}),
                           new MenuItem('Limits',        null, {icon: iconLimits,      createType: NUMBER_LIMITS,        callback: e => actionManager.do(getCreateNodeAction(NUMBER_LIMITS,        btnNumber.div, getCreateOptions(e)))}), 
                           new MenuItem('Quantize',      null, {icon: iconQuantize,    createType: NUMBER_QUANTIZE,      callback: e => actionManager.do(getCreateNodeAction(NUMBER_QUANTIZE,      btnNumber.div, getCreateOptions(e)))}),
                           new MenuItem('Curve',         null, {icon: iconNumberCurve, createType: NUMBER_CURVE,         callback: e => actionManager.do(getCreateNodeAction(NUMBER_CURVE,         btnNumber.div, getCreateOptions(e)))}), 
                           new MenuItem('Bias',          null, {icon: iconNumberBias,  createType: NUMBER_BIAS,          callback: e => actionManager.do(getCreateNodeAction(NUMBER_BIAS,          btnNumber.div, getCreateOptions(e)))}), 
                           new MenuItem('',              null, {separator: true}),
                           new MenuItem('Trigonometric', null, {icon: iconSine,        createType: NUMBER_TRIG,          callback: e => actionManager.do(getCreateNodeAction(NUMBER_TRIG,          btnNumber.div, getCreateOptions(e)))}),
                           new MenuItem('Arctangent',    null, {icon: iconAtan2,       createType: NUMBER_ATAN2,         callback: e => actionManager.do(getCreateNodeAction(NUMBER_ATAN2,         btnNumber.div, getCreateOptions(e)))})]);
        

    menuConvertNumber = new Menu('Convert number', true, false);
    menuConvertNumber.addItems([
        new MenuItem('Degrees ⟷ Radians', null, {icon: iconConvertAngle,  createType: CONVERT_ANGLE, callback: e => actionManager.do(getCreateNodeAction(CONVERT_ANGLE, btnNumber.div, getCreateOptions(e)))})]);
    

    menuConvertText = new Menu('Convert text', true, false);
    menuConvertText.addItems([
                              new MenuItem('Text ⟶ Number',    null, {icon: iconTextToNumber,    createType: TEXT_TO_NUMBER, callback: e => actionManager.do(getCreateNodeAction(TEXT_TO_NUMBER, btnText.div, getCreateOptions(e)))}),
                              new MenuItem('Text ⟶ Color',     null, {icon: iconTextToColor,     createType: TEXT_TO_COLOR,  callback: e => actionManager.do(getCreateNodeAction(TEXT_TO_COLOR,  btnText.div, getCreateOptions(e)))}),
                              new MenuItem('',                  null, {separator: true}),
                              new MenuItem('Number ⟶ Text',    null, {icon: iconNumberToText,    createType: NUMBER_TO_TEXT, callback: e => actionManager.do(getCreateNodeAction(NUMBER_TO_TEXT, btnText.div, getCreateOptions(e)))}),
                              new MenuItem('Color ⟶ Text',     null, {icon: iconColorToText,     createType: COLOR_TO_TEXT,  callback: e => actionManager.do(getCreateNodeAction(COLOR_TO_TEXT,  btnText.div, getCreateOptions(e)))}),
                              new MenuItem('',                  null, {separator: true}),
                              new MenuItem('Code ⟶ Character', null, {icon: iconCodeToCharacter, createType: TEXT_CHAR,      callback: e => actionManager.do(getCreateNodeAction(TEXT_CHAR,      btnText.div, getCreateOptions(e)))}),
                              new MenuItem('Character ⟶ Code', null, {icon: iconCharacterToCode, createType: TEXT_UNICODE,   callback: e => actionManager.do(getCreateNodeAction(TEXT_UNICODE,   btnText.div, getCreateOptions(e)))}),
                              new MenuItem('',                  null, {separator: true}),
        menuItemIndexToName = new MenuItem('Index ⟶ Name',     null, {icon: iconIndexToName,     createType: INDEX_TO_NAME,  callback: e => actionManager.do(getCreateNodeAction(INDEX_TO_NAME,      btnText.div, getCreateOptions(e)))})]);
    

    menuTextData = new Menu('Data', true, false);
    menuTextData.addItems([
        menuItemFetch    = new MenuItem('Fetch',      null, {icon: iconTextFetch, createType: TEXT_FETCH,       callback: e => actionManager.do(getCreateNodeAction(TEXT_FETCH,      btnText.div, getCreateOptions(e)))}),
        menuItemTextFile = new MenuItem('Text file',  null, {icon: iconTextFile,  createType: TEXT_FILE,        callback: e => actionManager.do(getCreateNodeAction(TEXT_FILE,       btnText.div, getCreateOptions(e)))}),
        menuTextDataSep1 = new MenuItem('',           null, {separator: true}),
        menuItemTextJson = new MenuItem('Parse JSON', null, {icon: iconTextJson,      createType: TEXT_JSON,      callback: e => actionManager.do(getCreateNodeAction(TEXT_JSON,     btnText.div, getCreateOptions(e)))}),
                           new MenuItem('Parse CSV',  null, {icon: iconTextCSV,       createType: TEXT_CSV,       callback: e => actionManager.do(getCreateNodeAction(TEXT_CSV,      btnText.div, getCreateOptions(e)))})]);
    

    menuNumber = new Menu('Numbers', true, false);
    menuNumber.addItems([
                          new MenuItem('Number',        null,                 {icon: iconNumber,      childMenu: menuNumberBase, createType: NUMBER, callback: e => actionManager.do(getCreateNodeAction(NUMBER,             btnNumber.div, getCreateOptions(e)))}),
                          new MenuItem('',              null,                 {separator: true}),
                          new MenuItem('Math',          null,                 {icon: iconMath,        childMenu: menuMath,          createType: NUMBER_SIMPLE_MATH, callback: e => actionManager.do(getCreateNodeAction(NUMBER_SIMPLE_MATH, btnNumber.div, getCreateOptions(e)))}),
                          new MenuItem('Logic',         null,                 {icon: iconBoolean,     /*childMenu: menuBoolean,  */ createType: NUMBER_BOOLEAN,     callback: e => actionManager.do(getCreateNodeAction(NUMBER_BOOLEAN,     btnNumber.div, getCreateOptions(e)))}),
                          new MenuItem('Compare',       null,                 {icon: iconCondition,   /*childMenu: menuCondition,*/ createType: NUMBER_CONDITION,   callback: e => actionManager.do(getCreateNodeAction(NUMBER_CONDITION,   btnNumber.div, getCreateOptions(e)))}),
                          new MenuItem('',              null,                 {separator: true}),
                          new MenuItem('Functions',     null,                 {icon: iconRound,       childMenu: menuFunctions}),
                          new MenuItem('',              null,                 {separator: true}),
                          new MenuItem('Convert',       null,                 {icon: iconConvert,     childMenu: menuConvertNumber}),
                          new MenuItem('',              null,                 {separator: true}),
                          new MenuItem('Interpolate',   'Interpolate number', {icon: iconInterpolate, createType: NUMBER_INTERPOLATE, callback: e => actionManager.do(getCreateNodeAction(NUMBER_INTERPOLATE, btnNumber.div, getCreateOptions(e)))})]);
        
    
    menuTextFunctions = new Menu('Text functions', true, false);
    menuTextFunctions.addItems([
                           new MenuItem('Trim',       null,            {icon: iconTextTrim,      createType: TEXT_TRIM,      callback: e => actionManager.do(getCreateNodeAction(TEXT_TRIM,      btnText.div, getCreateOptions(e)))}),
                           new MenuItem('Spl it',     null,            {icon: iconTextSplit,     createType: TEXT_SPLIT,     callback: e => actionManager.do(getCreateNodeAction(TEXT_SPLIT,     btnText.div, getCreateOptions(e)))}),
                           new MenuItem('Join',       null,            {icon: iconTextJoin,      createType: TEXT_JOIN,      callback: e => actionManager.do(getCreateNodeAction(TEXT_JOIN,      btnText.div, getCreateOptions(e)))}),
                           new MenuItem('Substring',  null,            {icon: iconTextSubstring, createType: TEXT_SUBSTRING, callback: e => actionManager.do(getCreateNodeAction(TEXT_SUBSTRING, btnText.div, getCreateOptions(e)))}),
                           new MenuItem('Case',       null,            {icon: iconTextCase,      createType: TEXT_CASE,      callback: e => actionManager.do(getCreateNodeAction(TEXT_CASE,      btnText.div, getCreateOptions(e)))}),
                           new MenuItem('Replace',    null,            {icon: iconTextReplace,   createType: TEXT_REPLACE,   callback: e => actionManager.do(getCreateNodeAction(TEXT_REPLACE,   btnText.div, getCreateOptions(e)))}),
                           new MenuItem('Pad',        null,            {icon: iconTextPad,       createType: TEXT_PAD,       callback: e => actionManager.do(getCreateNodeAction(TEXT_PAD,       btnText.div, getCreateOptions(e)))})]);


    menuString = new Menu('Text', true, false);
    menuString.addItems([
                           new MenuItem('Text',       null,            {icon: iconText,          createType: TEXT,           callback: e => actionManager.do(getCreateNodeAction(TEXT,           btnText.div, getCreateOptions(e)))}),
                           new MenuItem('',           null,            {separator: true}),
                           new MenuItem('Length',     null,            {icon: iconTextLength,    createType: TEXT_LENGTH,    callback: e => actionManager.do(getCreateNodeAction(TEXT_LENGTH,    btnText.div, getCreateOptions(e)))}),
                           new MenuItem('Compare',    null,            {icon: iconTextCompare,   createType: TEXT_COMPARE,   callback: e => actionManager.do(getCreateNodeAction(TEXT_COMPARE,   btnText.div, getCreateOptions(e)))}),
                           new MenuItem('Contains',   'Text contains', {icon: iconTextContains,  createType: TEXT_CONTAINS,  callback: e => actionManager.do(getCreateNodeAction(TEXT_CONTAINS,  btnText.div, getCreateOptions(e)))}),
                           new MenuItem('',           null,            {separator: true}),
                           new MenuItem('Functions',  null,            {icon: iconTextFunctions, childMenu: menuTextFunctions}),
                           new MenuItem('',           null,            {separator: true}),
                           new MenuItem('Convert',    null,            {icon: iconConvert,      childMenu: menuConvertText}),
                           new MenuItem('Data',       null,            {icon: iconTextFile,     childMenu: menuTextData})]);


    menuColorStyle = new Menu('Color style', true, false);
    menuColorStyle.addItems([
        new MenuItem('Link existing. . .', null, {icon: iconColorStyleReplace, createType: COLOR_STYLE, callback: e => actionManager.do(getCreateNodeAction(COLOR_STYLE,  btnColor.div, getCreateOptions(e, {existing: true})))})]);

        
    menuCreateColor = new Menu('Create color menu', false, false);
    menuCreateColor.addItems([
        new ColorListMenuItem(
        {
            callback: (e, colorIndex) => 
            { 
                hideAllMenus(); 
                actionManager.do(getCreateNodeAction(COLOR, btnColor.div, getCreateOptions(e, {color: getMenuColorFromIndex(colorIndex)}))); 
            },

            swatchType: 1
        })]);


    menuColor = new Menu('Colors', true, false);
    menuColor.addItems([
        menuItemColor        = new MenuItem('Color',         null,                {icon: iconColor,            childMenu: menuCreateColor,  callback: e => actionManager.do(getCreateNodeAction(COLOR, btnColor.div, getCreateOptions(e,  {random: e.altKey && !getCtrlKey(e)})))}),
                               new MenuItem('',              null,                {separator: true}),
        menuItemLayerFill    = new MenuItem('Fill',          null,                {icon: iconFill,             callback: e => actionManager.do(getCreateNodeAction(FILL,              btnColor.div, getCreateOptions(e)))}),
        menuItemLayerStroke  = new MenuItem('Stroke',        null,                {icon: iconStroke,           callback: e => actionManager.do(getCreateNodeAction(STROKE,            btnColor.div, getCreateOptions(e)))}),
                               new MenuItem('',              null,                {separator: true}),
                               new MenuItem('Gradient',      null,                {icon: iconGradient,         callback: e => actionManager.do(getCreateNodeAction(GRADIENT,          btnColor.div, getCreateOptions(e)))}),
                               new MenuItem('Color stop',    null,                {icon: iconColorStop,        callback: e => actionManager.do(getCreateNodeAction(COLOR_STOP,        btnColor.div, getCreateOptions(e)))}),
        menuItemLayerSep1    = new MenuItem('',              null,                {separator: true}),
        menuItemValidColor   = new MenuItem('Valid sRGB',    null,                {icon: iconValidColor,       callback: e => actionManager.do(getCreateNodeAction(VALID_COLOR,       btnColor.div, getCreateOptions(e)))}),
        menuItemCorrectColor = new MenuItem('Correct color', null,                {icon: iconCorrectColor,     callback: e => actionManager.do(getCreateNodeAction(CORRECT_COLOR,     btnColor.div, getCreateOptions(e)))}),
        menuItemConvertToP3  = new MenuItem('sRGB ⟷ P3',    null,                {icon: iconConvertP3,        callback: e => actionManager.do(getCreateNodeAction(COLOR_CONVERT_P3,  btnColor.div, getCreateOptions(e)))}),
        menuItemColorblind   = new MenuItem('Color vision',  null,                {icon: iconColorblind,       callback: e => actionManager.do(getCreateNodeAction(COLORBLIND,        btnColor.div, getCreateOptions(e)))}),
                               new MenuItem('',              null,                {separator: true}),
                               new MenuItem('Interpolate',   'Interpolate color', {icon: iconColorInterpolate, callback: e => actionManager.do(getCreateNodeAction(COLOR_INTERPOLATE, btnColor.div, getCreateOptions(e)))}),
        menuItemColorBlend   = new MenuItem('Blend',         null,                {icon: iconColorBlend,       callback: e => actionManager.do(getCreateNodeAction(COLOR_BLEND,       btnColor.div, getCreateOptions(e)))}),
        menuItemColorSep1    = new MenuItem('',              null,                {separator: true}),
                               new MenuItem('Web contrast',  null,                {icon: iconWebContrast,      callback: e => actionManager.do(getCreateNodeAction(COLOR_CONTRAST,    btnColor.div, getCreateOptions(e)))})]);

    menuColor.init = () => 
    {
        menuItemColor.setIcon(iconColor);
    };

    
    menuEffects = new Menu('Effects', true, false);
    menuEffects.addItems([
                                   new MenuItem('Layer blend',     null, {icon: iconColorBlend,  callback: e => actionManager.do(getCreateNodeAction(LAYER_BLEND, btnShape.div, getCreateOptions(e)))}),
                                   new MenuItem('',                null, {separator: true}),
        menuItemLayerDropShadow  = new MenuItem('Drop shadow',     null, {icon: iconDropShadow,  callback: e => actionManager.do(getCreateNodeAction(DROP_SHADOW,  btnShape.div, getCreateOptions(e)))}),
        menuItemLayerInnerShadow = new MenuItem('Inner shadow',    null, {icon: iconInnerShadow, callback: e => actionManager.do(getCreateNodeAction(INNER_SHADOW, btnShape.div, getCreateOptions(e)))}),
        menuItemLayerLayerBlur   = new MenuItem('Layer blur',      null, {icon: iconLayerBlur,   callback: e => actionManager.do(getCreateNodeAction(LAYER_BLUR,   btnShape.div, getCreateOptions(e)))}),
        menuItemLayerBackBlur    = new MenuItem('Background blur', null, {icon: iconBackBlur,    callback: e => actionManager.do(getCreateNodeAction(BACK_BLUR,    btnShape.div, getCreateOptions(e)))}),
                                   new MenuItem('',                null, {separator: true}),
                                   new MenuItem('Mask',            null, {icon: iconMask,        callback: e => actionManager.do(getCreateNodeAction(LAYER_MASK,  btnShape.div, getCreateOptions(e)))})]);

    
    menuStyles = new Menu('Styles', true, false);
    menuStyles.addItems([
        new MenuItem('Color style', null, {icon: iconColorStyle, createType: START, callback: e => actionManager.do(getCreateNodeAction(COLOR_STYLE, btnShape.div, getCreateOptions(e, {existing: true})))})]);
    
    
    // menuLayer = new Menu('Style', true, false);
    // menuLayer.addItems([
    //     new MenuItem('Apply style', null, {icon: iconApply, createType: SHAPE_APPLY, callback: e => actionManager.do(getCreateNodeAction(SHAPE_APPLY, btnLayer.div, getCreateOptions(e)))}),
    //     new MenuItem('',            null, {separator: true}),
    //     new MenuItem('Effects',     null, {icon: iconEffects, childMenu: menuEffects}),
    //     new MenuItem('Styles',      null, {icon: iconStyle, childMenu: menuStyles}),
    //     new MenuItem('',            null, {separator: true}),
    //     new MenuItem('Blend',       null, {icon: iconColorBlend,  callback: e => actionManager.do(getCreateNodeAction(LAYER_BLEND, btnLayer.div, getCreateOptions(e)))}),
    //     new MenuItem('',            null, {separator: true}),
    //     new MenuItem('Mask',        null, {icon: iconMask,        callback: e => actionManager.do(getCreateNodeAction(LAYER_MASK,  btnLayer.div, getCreateOptions(e)))})]);
    
    
    menuPoint = new Menu('Point', true, false);
    menuPoint.addItems([
        new MenuItem('Corner', null, {icon: iconPointCorner, createType: POINT_CORNER,      callback: e => actionManager.do(getCreateNodeAction(POINT_CORNER, btnShape.div, getCreateOptions(e)))})]);


    menuVectorFunctions = new Menu('Vector functions', true, false);
    menuVectorFunctions.addItems([
                                     new MenuItem('Vector',                null, {icon: iconVector,                      createType: VECTOR,         callback: e => actionManager.do(getCreateNodeAction(VECTOR,         btnShape.div, getCreateOptions(e)))}),
                                     new MenuItem('',                      null, {separator: true}),
                                     new MenuItem('Circle center',         null, {icon: iconCircleCenter,                createType: CIRCLE_CENTER,         callback: e => actionManager.do(getCreateNodeAction(CIRCLE_CENTER,         btnShape.div, getCreateOptions(e)))}),
        menuItemPointAlongPath     = new MenuItem('Point along path',      null, {icon: iconPointAlongPath,              createType: POINT_ALONG_PATH,      callback: e => actionManager.do(getCreateNodeAction(POINT_ALONG_PATH,      btnShape.div, getCreateOptions(e)))}),
        menuItemClosestPointOnPath = new MenuItem('Closest point on path', null, {icon: iconClosestPointOnPath,          createType: CLOSEST_POINT_ON_PATH, callback: e => actionManager.do(getCreateNodeAction(CLOSEST_POINT_ON_PATH, btnShape.div, getCreateOptions(e)))}),
                                     new MenuItem('Intersect lines',       null, {icon: iconIntersectLines,              createType: INTERSECT_LINES,       callback: e => actionManager.do(getCreateNodeAction(INTERSECT_LINES,       btnShape.div, getCreateOptions(e)))}),
                                     new MenuItem('Interpolate points',    null, {icon: iconInterpolatePoint,            createType: INTERPOLATE_POINT,     callback: e => actionManager.do(getCreateNodeAction(INTERPOLATE_POINT,     btnShape.div, getCreateOptions(e)))}),
                                     new MenuItem('',                      null, {separator: true}),       
                                     new MenuItem('Measure vector',        null, {icon: iconMeasureVector,               createType: MEASURE_VECTOR,        callback: e => actionManager.do(getCreateNodeAction(MEASURE_VECTOR,        btnShape.div, getCreateOptions(e)))}),
        menuItemPathLength         = new MenuItem('Path length',           null, {icon: iconPathLength,                  createType: PATH_LENGTH,           callback: e => actionManager.do(getCreateNodeAction(PATH_LENGTH,           btnShape.div, getCreateOptions(e)))}),
                                     new MenuItem('',                      null, {separator: true}),
                                     new MenuItem('Join paths',            null, {icon: iconJoinPaths,                   createType: JOIN_PATHS,            callback: e => actionManager.do(getCreateNodeAction(JOIN_PATHS,            btnShape.div, getCreateOptions(e)))}),
                                     new MenuItem('Reverse path',          null, {icon: iconReversePath,                 createType: REVERSE_PATH,          callback: e => actionManager.do(getCreateNodeAction(REVERSE_PATH,          btnShape.div, getCreateOptions(e)))})]);


    menuVectorShapes = new Menu('Vector shapes', true, false);
    menuVectorShapes.addItems([
        new MenuItem('Arc',             null, {icon: iconArcPath,       createType: ARC_PATH,              callback: e => actionManager.do(getCreateNodeAction(ARC_PATH,        btnShape.div, getCreateOptions(e)))}),
        new MenuItem('Arc from points', null, {icon: iconArcFromPoints, createType: ARC_FROM_POINTS,       callback: e => actionManager.do(getCreateNodeAction(ARC_FROM_POINTS, btnShape.div, getCreateOptions(e)))}),
        new MenuItem('Wave',            null, {icon: iconWavePath,      createType: WAVE_PATH,             callback: e => actionManager.do(getCreateNodeAction(WAVE_PATH,       btnShape.div, getCreateOptions(e)))})]);


    menuVectorPath = new Menu('Vector path', true, false);
    menuVectorPath.addItems([
                                     new MenuItem('Point',     null,          {childMenu: menuPoint, icon: iconPoint, createType: POINT,          callback: e => actionManager.do(getCreateNodeAction(POINT,          btnShape.div, getCreateOptions(e)))}),
                                     new MenuItem('Path',      'Vector path', {icon: iconVectorPath,                  createType: VECTOR_PATH,    callback: e => actionManager.do(getCreateNodeAction(VECTOR_PATH,    btnShape.div, getCreateOptions(e)))}),
                                     new MenuItem('',          null,          {separator: true}),           
        menuItemVectorVertex       = new MenuItem('Vertex',    null,          {icon: iconVectorVertex,                createType: VECTOR_VERTEX,  callback: e => actionManager.do(getCreateNodeAction(VECTOR_VERTEX,  btnShape.div, getCreateOptions(e)))}),
        menuItemVectorEdge         = new MenuItem('Edge',      null,          {icon: iconVectorEdge,                  createType: VECTOR_EDGE,    callback: e => actionManager.do(getCreateNodeAction(VECTOR_EDGE,    btnShape.div, getCreateOptions(e)))}),
        menuItemVectorRegion       = new MenuItem('Region',    null,          {icon: iconVectorRegion,                createType: VECTOR_REGION,  callback: e => actionManager.do(getCreateNodeAction(VECTOR_REGION,  btnShape.div, getCreateOptions(e)))}),
        menuItemVectorNetwork      = new MenuItem('Network',   null,          {icon: iconVectorNetwork,               createType: VECTOR_NETWORK, callback: e => actionManager.do(getCreateNodeAction(VECTOR_NETWORK, btnShape.div, getCreateOptions(e)))}),
                                     new MenuItem('',          null,          {separator: true}),           
                                     new MenuItem('Shapes',    null,          {childMenu: menuVectorShapes}),
                                     new MenuItem('',          null,          {separator: true}),           
                                     new MenuItem('Functions', null,          {childMenu: menuVectorFunctions})]);


    menuRectangle = new Menu('Rectangle', true, false);
    menuRectangle.addItems([
        new MenuItem('Round corners',  null, {icon: iconRoundCorners, createType: ROUND_CORNERS, callback: e => actionManager.do(getCreateNodeAction(ROUND_CORNERS, btnShape.div, getCreateOptions(e)))})]);


    menuShapes = new Menu('Shapes', true, false);
    menuShapes.addItems([
        new MenuItem('Rectangle', null,         {icon: iconRectangle,  childMenu: menuRectangle, createType: RECTANGLE,  callback: e => actionManager.do(getCreateNodeAction(RECTANGLE, btnShape.div, getCreateOptions(e)))}),
        new MenuItem('Trapeze',   null,         {icon: iconTrapeze,    createType: TRAPEZE,    callback: e => actionManager.do(getCreateNodeAction(TRAPEZE,    btnShape.div, getCreateOptions(e)))}),
        new MenuItem('Line',      null,         {icon: iconLine,       createType: LINE,       callback: e => actionManager.do(getCreateNodeAction(LINE,       btnShape.div, getCreateOptions(e)))}),
        new MenuItem('Ellipse',   null,         {icon: iconEllipse,    createType: ELLIPSE,    callback: e => actionManager.do(getCreateNodeAction(ELLIPSE,    btnShape.div, getCreateOptions(e)))}),
        new MenuItem('Polygon',   null,         {icon: iconPolygon,    createType: POLYGON,    callback: e => actionManager.do(getCreateNodeAction(POLYGON,    btnShape.div, getCreateOptions(e)))}),
        new MenuItem('Star',      null,         {icon: iconStar,       createType: STAR,       callback: e => actionManager.do(getCreateNodeAction(STAR,       btnShape.div, getCreateOptions(e)))}),
        new MenuItem('Text',      'Text shape', {icon: iconTextShape,  createType: TEXT_SHAPE, callback: e => actionManager.do(getCreateNodeAction(TEXT_SHAPE, btnShape.div, getCreateOptions(e)))})]);


    menuTransform = new Menu('Transform', true, false);
    menuTransform.addItems([
        new MenuItem('Move',            null, {icon: iconMove,       createType: MOVE,        callback: e => actionManager.do(getCreateNodeAction(MOVE,        btnShape.div, getCreateOptions(e)))}),
        new MenuItem('Rotate',          null, {icon: iconRotate,     createType: ROTATE,      callback: e => actionManager.do(getCreateNodeAction(ROTATE,      btnShape.div, getCreateOptions(e)))}),
        new MenuItem('Scale',           null, {icon: iconScale,      createType: SCALE,       callback: e => actionManager.do(getCreateNodeAction(SCALE,       btnShape.div, getCreateOptions(e)))}),
        new MenuItem('Skew',            null, {icon: iconSkew,       createType: SKEW,        callback: e => actionManager.do(getCreateNodeAction(SKEW,        btnShape.div, getCreateOptions(e)))}),
        new MenuItem('',                null, {separator: true}),
        new MenuItem('Place',           null, {icon: iconPlace,      createType: PLACE,       callback: e => actionManager.do(getCreateNodeAction(PLACE,       btnShape.div, getCreateOptions(e)))}),
        new MenuItem('',                null, {separator: true}),
        new MenuItem('Set center',      null, {icon: iconCenter,     createType: SET_CENTER,  callback: e => actionManager.do(getCreateNodeAction(SET_CENTER,  btnShape.div, getCreateOptions(e)))}),
        new MenuItem('',                null, {separator: true}),
        new MenuItem('Reset center',    null, {icon: iconResetXform, createType: RESET_XFORM, callback: e => actionManager.do(getCreateNodeAction(RESET_XFORM, btnShape.div, getCreateOptions(e)))})]);


    menuShape = new Menu('Shapes', true, false);
    menuShape.addItems([
        // menuItemShapeSelected = new MenuItem('Selected objects...', null, {icon: iconSelected,   enabled: false}),
                             // new MenuItem('',            null, {separator: true}),
                                new MenuItem('Shapes',      null, {icon: iconShapes,        childMenu: menuShapes}),
                                new MenuItem('Vector',      null, {icon: iconVectorPath,    childMenu: menuVectorPath}),
                                new MenuItem('',            null, {separator: true}),
                                new MenuItem('Frame',       null, {icon: iconFrame,      createType: FRAME,       callback: e => actionManager.do(getCreateNodeAction(FRAME,       btnShape.div, getCreateOptions(e)))}),
                                new MenuItem('Group',       null, {icon: iconShapeGroup, createType: SHAPE_GROUP, callback: e => actionManager.do(getCreateNodeAction(SHAPE_GROUP, btnShape.div, getCreateOptions(e)))}),
                             // new MenuItem('Boolean',     null, {enabled: false, icon: iconBoolUnion,  callback: e => actionManager.do(getCreateNodeAction(BOOLEAN,     btnShape.div, getCreateOptions(e)))}),
        menuItemShapeSep1     = new MenuItem('',            null, {separator: true}),
                                new MenuItem('Transform',   null, {icon: iconMove, childMenu: menuTransform}),
                                new MenuItem('',            null, {separator: true}),
                                new MenuItem('Apply style', null, {icon: iconApply, createType: SHAPE_APPLY, callback: e => actionManager.do(getCreateNodeAction(SHAPE_APPLY, btnShape.div, getCreateOptions(e)))}),
                                new MenuItem('',            null, {separator: true}),
                                new MenuItem('Effects',     null, {icon: iconEffects, childMenu: menuEffects}),
                                new MenuItem('Styles',      null, {icon: iconStyle, childMenu: menuStyles}),
                                new MenuItem('',            null, {separator: true}),
        menuItemShapeRender   = new MenuItem('Render',      null, {icon: iconRenderDown, createType: RENDER, callback: e => actionManager.do(getCreateNodeAction(RENDER, btnShape.div, getCreateOptions(e)))})]);


    menuTemplate = new Menu('Templates', true, false);
    menuTemplate.minWidth = 230;
    menuTemplate.init     = initTemplateMenu;


    menuGroup = new Menu('Groups', true, false);
    menuGroup.addItems([
        new MenuItem('Group',     null, {icon: iconGroupNode,  createType: GROUP_NODE, callback: e => actionManager.do(getCreateNodeAction(GROUP_NODE,  btnGroup.div, getCreateOptions(e)))}),
        new MenuItem('Parameter', null, {icon: iconGroupParam, createType: GROUP_PARAM, callback: e => actionManager.do(getCreateNodeAction(GROUP_PARAM, btnGroup.div, getCreateOptions(e)))})]);
    

    menuPanel = new Menu('Decoration', true, false);
    menuPanel.addItems([
        new MenuItem('Panel',   null, {icon: iconPanel,        createType: PANEL,         callback: e => actionManager.do(getCreateNodeAction(PANEL,         btnPanel.div, getCreateOptions(e)))})]);//,
        // new MenuItem('',        null, {separator: true}),
        // new MenuItem('Comment', null, {icon: iconComment,      createType: COMMENT,       callback: e => actionManager.do(getCreateNodeAction(COMMENT,       btnPanel.div, getCreateOptions(e)))}),
        // new MenuItem('Arrow',   null, {icon: iconCommentArrow, createType: COMMENT_ARROW, callback: e => actionManager.do(getCreateNodeAction(COMMENT_ARROW, btnPanel.div, getCreateOptions(e)))})]);


    menuWindow = new Menu('Window options', true, false);
    menuWindow.showOnLeft = true;
    menuWindow.addItems([
        menuItemWindowNormal   = new MenuItem('Normal',   null, {icon: iconWindowNormal,     shortcut: osAlt() + '0', callback: () => dockWindowNormal  ()}),
        menuItemWindowMaximize = new MenuItem('Maximize', null, {icon: iconWindowMaximize,   shortcut: osAlt() + '8', callback: () => dockWindowMaximize()}),
        menuItemWindowTop      = new MenuItem('Top',      null, {icon: iconWindowDockTop,    shortcut: osAlt() + '5', callback: () => dockWindowTop     ()}),
        menuItemWindowLeft     = new MenuItem('Left',     null, {icon: iconWindowDockLeft,   shortcut: osAlt() + '1', callback: () => dockWindowLeft    ()}),
        menuItemWindowRight    = new MenuItem('Right',    null, {icon: iconWindowDockRight,  shortcut: osAlt() + '3', callback: () => dockWindowRight   ()}),
        menuItemWindowBottom   = new MenuItem('Bottom',   null, {icon: iconWindowDockBottom, shortcut: osAlt() + '2', callback: () => dockWindowTop     ()})]);


    menuPage = new Menu('Page menu', false, false);
    menuPage.addItems([
        new MenuItem('Duplicate', null, {enabled: false, callback: () => {}}),
        new MenuItem('Rename',    null, {enabled: false, callback: () => {}})]);

        
    menuZoom = new Menu('Zoom/view options');
    menuZoom.combineChecksAndIcons = true;
    menuZoom.addItems([
                            new MenuItem('Zoom in',      null, {shortcut: osCtrl () + '+', callback: () => { graph.currentPage.zoom *= Math.pow(2, 1/2); graph.updateSavedPages(); }}),
                            new MenuItem('Zoom out',     null, {shortcut: osCtrl () + '-', callback: () => { graph.currentPage.zoom /= Math.pow(2, 1/2); graph.updateSavedPages(); }}),
                            new MenuItem('Zoom to fit',  null, {shortcut: osShift() + '1', callback: () => { graphView.zoomToFit(); graph.updateSavedPages(); }}),
        menuItemZoomTo100 = new MenuItem('Zoom to 100%', null, {shortcut: osCtrl () + '0', callback: () => { graph.currentPage.zoom = 1; graph.updateSavedPages(); }})]);//,
                        //  new MenuItem('',             {separator: true}),
                        //  new MenuItem('Window',       {childMenu: menuWindow})]);

        
    wholeMenu = new Menu('Create node. . .', true, false);
    wholeMenu.addItems([
        new MenuItem('Flow',      null, {icon: iconFlow,     childMenu: menuFlow  }),
        new MenuItem('Data',      null, {icon: iconCombine,  childMenu: menuData  }),
        new MenuItem('Sets. . .', null, {icon: iconSequence, childMenu: menuSets  }),
        new MenuItem('Number',    null, {icon: iconNumber,   childMenu: menuNumber}),
        new MenuItem('Text',      null, {icon: iconText,     childMenu: menuString}),
        new MenuItem('Color',     null, {icon: iconVarColor, childMenu: menuColor }),
        new MenuItem('Layer',     null, {icon: iconEffects,  childMenu: menuLayer }),
        new MenuItem('Shape',     null, {icon: iconShapes,   childMenu: menuShape }),
        new MenuItem('Panel',     null, {icon: iconPanel,    createType: PANEL, callback: e => actionManager.do(getCreateNodeAction(PANEL, btnPanel.div, getCreateOptions(e)))})]);

                                      
    menuGraph = new Menu('Graph menu', false, false);
    menuGraph.addItems([
        menuItemGraphPaste          = new MenuItem('Paste here',           null, {shortcut: osCtrl()      + 'V', callback: e => { hideAllMenus(); graphView.pasteCopiedNodes(false, e.clientX, e.clientY - getTopHeight()); }}),
        menuItemGraphPasteConnected = new MenuItem('Paste connected',      null, {shortcut: osCtrlShift() + 'V', callback: e => { hideAllMenus(); graphView.pasteCopiedNodes(true,  e.clientX, e.clientY - getTopHeight()); }}),
                                      new MenuItem('',                     null, {separator: true}),
        menuItemGraphDeactivateAll  = new MenuItem('Deactivate all nodes', null, {callback: () => actionManager.do(new MakeActiveNodesAction([], false))}),
                                      new MenuItem('',                     null, {separator: true}),
                                      new MenuItem('Create node. . .',     null, {childMenu: wholeMenu}),
                                      new MenuItem('',                     null, {separator: true}),
                                      new MenuItem('Quick actions. . .',   null, {shortcut: osCtrl() + '/',      callback: () => showSearchBox() })]);

    menuGraph.init = () => 
    {
        menuItemGraphPaste         .setEnabled(copiedNodesJson != '');
        menuItemGraphPasteConnected.setEnabled(copiedNodesJson != '');
        menuItemGraphDeactivateAll .setEnabled(graph.nodes.find(n => n.active) != null);
    };


    menuNodeHighlight = new Menu('Highlight nodes menu', false, false);
    menuNodeHighlight.addItems([
        new ColorListMenuItem({callback: (e, colorIndex) => { hideAllMenus(); setNodeHighlight(graphView.selectedNodes, colorIndex); }})]);

    menuNodeSelect = new Menu('Select nodes menu', false, false);
    menuNodeSelect.addItems([
        new MenuItem('Select left',   null, {callback: () => graphView.selectedNodes = [graphView.selectedNodes[0], ...getNodesBeforeNode(graphView.selectedNodes[0])] }),
        new MenuItem('Select right',  null, {callback: () => graphView.selectedNodes = [graphView.selectedNodes[0], ...getNodesAfterNode (graphView.selectedNodes[0])] }),
        new MenuItem('Select across', null, {callback: () => graphView.selectedNodes = [graphView.selectedNodes[0], ...getNodesAcrossNode(graphView.selectedNodes[0])] }),
        new MenuItem('Select tree',   null, {callback: () => graphView.selectedNodes =                                 getAllNodesFromNode(graphView.selectedNodes[0]) })]);


    menuNodeCopyAs = new Menu('Copy nodes menu', false, false);
    menuNodeCopyAs.addItems([
        //menuItemNodeCopyAsJsCode       = new MenuItem('Copy as JS code',     {shortcut:  osCtrlShift() + 'C',            callback: () => graphView.copySelectedNodesAsJsCode()     }),
        menuItemNodeCopyAsJsFunction   = new MenuItem('Copy as Javascript', {shortcut:  osCtrlShift() /*+ osAlt()*/ + 'C',  callback: () => graphView.copySelectedNodesAsJavascript() })]);


    menuNode = new Menu('Node menu', false, false);
    menuNode.addItems([
        //menuItemNodeEditGroup     = new MenuItem('Edit group...',    null, {callback: e => { hideAllMenus(); editSelectedGroup(); }}),
        //menuItemNodeSep1          = new MenuItem('',                 null, {separator: true}),
        menuItemNodeCopy            = new MenuItem('Copy',             null, {shortcut:  osCtrl() + 'C',       callback: () => graphView.copySelectedNodes() }),
        menuItemNodePaste           = new MenuItem('Paste here',       null, {shortcut:  osCtrl() + 'V',       callback: e => { hideAllMenus(); graphView.pasteCopiedNodes(false); }}),
        menuItemNodePasteConnected  = new MenuItem('Paste connected',  null, {shortcut:  osCtrlShift() + 'D',  callback: e => { hideAllMenus(); graphView.pasteCopiedNodes(true ); }}),
        //                            new MenuItem('Copy/Paste as',    null, {childMenu: menuNodeCopyAs}),
        menuItemNodeLayoutSep       = new MenuItem('',                 null, {separator: true}),
        menuItemNodeLayout          = new MenuItem('Layout',           null, {shortcut: osCtrlShift() + 'L', callback: e => { hideAllMenus(); layoutSelectedNodes(); }}),
        // menuItemNodeSepGroup     = new MenuItem('',                 null, {separator: true}),
        //menuItemNodeGroupSelected = new MenuItem('Group selected',   null, {shortcut:  osCtrl() + 'G',       callback: e => { hideAllMenus(); actionManager.do(new   GroupNodesAction(graphView.selectedNodes)); }}),
        //menuItemNodeUngroup       = new MenuItem('Ungroup',          null, {                                 callback: e => { hideAllMenus(); actionManager.do(new UngroupNodesAction(graphView.selectedNodes)); }}),
        menuItemNodeSep2            = new MenuItem('',                 null, {separator: true}),
        menuItemNodeRename          = new MenuItem('Rename',           null, {shortcut:  osCtrl() + 'R',       callback: e => { hideAllMenus(); graphView.renameSelectedNode(); }}),
        menuItemNodeHighlight       = new MenuItem('Highlight',        null, {childMenu: menuNodeHighlight}),
        menuItemNodeSep3            = new MenuItem('',                 null, {separator: true}),
        menuItemNodeActivate        = new MenuItem('Activate',         null, {shortcut:  osAlt()     + 'A',  callback: () => makeSelectedNodesActive()}),
        menuItemNodeDeactivate      = new MenuItem('Deactivate',       null, {shortcut:  osAlt()     + 'D',  callback: () => makeSelectedNodesInactive()}),
        menuItemNodeEnableDisable   = new MenuItem('Enable/Disable',   null, {shortcut:  osCtrlShift() + 'E',  callback: () => actionManager.do(new ToggleDisableNodesAction(graphView.selectedNodes.map(n => n.id)))}),
        menuItemNodeSelect          = new MenuItem('Select',           null, {childMenu: menuNodeSelect}),
      //menuItemNodeEdit            = new MenuItem('Edit . . .',       null, {callback: e => { hideAllMenus(); graphView.editSelectedCustomNode(); }}),
      //                              new MenuItem('',              null, {separator: true}),
      //menuItemNodeSaveAsTemplate  = new MenuItem('Save as template', null, {callback: e => { hideAllMenus(); showSaveAsTemplateDialog(); }}),
      //                              new MenuItem('',                 null, {separator: true}),
        menuItemNodeSep5            = new MenuItem('',                 null, {separator: true}),
        menuItemNodeRandomizeColor  = new MenuItem('Randomize color',  null, {shortcut:  osShift() + 'R', icon: iconProbability, callback: e => { hideAllMenus(); graphView.randomizeSelectedColors(); }}),
        menuItemNodeRandomizeSeeds  = new MenuItem('Randomize seeds',  null, {shortcut:  osShift() + 'R', icon: iconProbability, callback: e => { hideAllMenus(); graphView.randomizeSelectedSeeds(); }}),
        menuItemNodeConnectSeeds    = new MenuItem('Connect seeds',    null, {shortcut:  osShift() + 'C', callback: e => { hideAllMenus(); graphView.connectSelectedSeeds(); }}),
        menuItemNodeSep4            = new MenuItem('',                 null, {separator: true}),
        menuItemNodeRemove          = new MenuItem('Remove',           null, {shortcut:  osCtrl() + '⌫',      callback: e => { hideAllMenus(); graphView.removeSelectedNodes(true); }}),
        menuItemNodeNotConditionSep = new MenuItem('',                 null, {separator: true}),
        menuItemNodeNotCondition    = new MenuItem('Not condition',    null, {checkCallback: () => graphView.selectedNodes.some(n => n.notCondition), callback: () => toggleSelectedNodesNotCondition()}),
                                      new MenuItem('',                 null, {separator: true}),
                                      new MenuItem('Create node. . .', null, {childMenu: wholeMenu})]);



    menuNode.init = () => 
    {
        const single      =  graphView.selectedNodes.length == 1;
        const canDisable  = !graphView.selectedNodes.find(n => !n.canDisable);
        const isCondition =  graphView.selectedNodes.some(n => n.hasConditionOutputs());
        const someActive  =  graphView.selectedNodes.some (n => n.active);
        const allActive   =  graphView.selectedNodes.every(n => n.active);


        const selectedRandom =
            graphView.selectedNodes.filter(n => 
                   n.type == NUMBER_RANDOM
                || n.type == NUMBER_NOISE
                || n.type == NUMBER_PROBABILITY);
        
        const selectedColors    = graphView.selectedNodes.filter(n => n.type == COLOR);
        const canRandomizeColor = selectedColors.length > 0;
        

        const canRandomizeSeeds = selectedRandom.length > 0;
        const canConnectSeeds   = 
               selectedRandom.length > 0
            && graphView.selectedNodes.filter(n => n.type == LIST).length == 1;


        // menuNode.showIcons = true;
        // menuNode.items.forEach(i => i.showIcon = true);

        
        menuItemNodeRandomizeColor.setName('Randomize color' + (selectedColors.length == 1 ? '' : 's'));
        menuItemNodeRandomizeSeeds.setName('Randomize seed'  + (selectedRandom.length == 1 ? '' : 's'));
        menuItemNodeConnectSeeds  .setName('Connect seed'    + (selectedRandom.length == 1 ? '' : 's'));


        menuNode.showChecks = isCondition;

        //updateElementDisplay(menuItemNodeEditGroup    .div, hasGroups && single);
        //updateElementDisplay(menuItemNodeSepGroup     .div, hasGroups && single);
        //updateElementDisplay(menuItemNodeUngroup      .div, hasGroups);
        //updateElementDisplay(menuItemNodeSep2         .div, single);
        updateElementDisplay(menuItemNodeRename         .div, single);
        updateElementDisplay(menuItemNodeLayoutSep      .div, !single);
        updateElementDisplay(menuItemNodeLayout         .div, !single);
        //updateElementDisplay(menuItemNodeEdit         .div, single);
        updateElementDisplay(menuItemNodeSep5           .div, canRandomizeSeeds || canConnectSeeds || canRandomizeColor);
        updateElementDisplay(menuItemNodeRandomizeColor .div, canRandomizeColor);
        updateElementDisplay(menuItemNodeRandomizeSeeds .div, canRandomizeSeeds);
        updateElementDisplay(menuItemNodeConnectSeeds   .div, canConnectSeeds);
        updateElementDisplay(menuItemNodeSep2           .div, single);
        updateElementDisplay(menuItemNodeSelect         .div, single);
        updateElementDisplay(menuItemNodeSep4           .div, canDisable || canRandomizeSeeds || canConnectSeeds);
        updateElementDisplay(menuItemNodeActivate       .div, !allActive);
        updateElementDisplay(menuItemNodeDeactivate     .div, someActive);
        updateElementDisplay(menuItemNodeEnableDisable  .div, canDisable);
        updateElementDisplay(menuItemNodeNotConditionSep.div, isCondition);
        updateElementDisplay(menuItemNodeNotCondition   .div, isCondition);
    };



    // menuRemoveLicense = new Menu('Remove license', false, false);
    // menuRemoveLicense.addItems([
    //                             new MenuItem('Cut',   {callback: () => { hideAllMenus(); document.execCommand('copy' ); clearSelectedText(subscriptionInput); updateSubscriptionDots(); }}),
    //                             new MenuItem('Copy',  {callback: () => { hideAllMenus(); document.execCommand('copy' ); }}),
    //                             new MenuItem('Paste', {callback: () => { hideAllMenus(); document.execCommand('paste'); }}),
    //     menuItemLicenseSep1   = new MenuItem('', {separator: true}),
    //     menuItemLicenseRemove = new MenuItem('Remove from this computer', {callback: () => { hideAllMenus(); removeLicense(); }})]);


    menuText    = new Menu('Text menu',    false, false);
    menuTextbox = new Menu('Textbox menu', false, true);

    menuCopy    = new Menu('Copy menu',    false, false);


    menuLocalStyles    = new Menu('Local styles',    true,  true);
    menuLocalVariables = new Menu('Local variables', true,  true);
    menuSelectParam    = new Menu('Select options',  false, true);

    
    btnMain     = new MenuButton('', menuMain,     {useMenuName: true, highlight: () => currentMenus.includes(menuMain  ), callback: () => updatePanMode(false)});
    btnTemplate = new MenuButton('', menuTemplate, {useMenuName: true, highlight: () => currentMenus.includes(menuTemplate ), callback: () => updatePanMode(false)});
    btnFlow     = new MenuButton('', menuFlow,     {useMenuName: true, highlight: () => currentMenus.includes(menuFlow  ), callback: () => updatePanMode(false)});
    btnData     = new MenuButton('', menuData,     {useMenuName: true, highlight: () => currentMenus.includes(menuData  ), callback: () => updatePanMode(false)});
    btnSets     = new MenuButton('', menuSets,     {useMenuName: true, highlight: () => currentMenus.includes(menuSets  ), callback: () => updatePanMode(false)});
    btnShape    = new MenuButton('', menuShape,    {useMenuName: true, highlight: () => currentMenus.includes(menuShape ), callback: () => updatePanMode(false)});
    btnColor    = new MenuButton('', menuColor,    {useMenuName: true, highlight: () => currentMenus.includes(menuColor ), callback: () => updatePanMode(false)});
    //btnLayer    = new MenuButton('', menuLayer,    {useMenuName: true, highlight: () => currentMenus.includes(menuLayer ), callback: () => updatePanMode(false)});
    btnNumber   = new MenuButton('', menuNumber,   {useMenuName: true, highlight: () => currentMenus.includes(menuNumber), callback: () => updatePanMode(false)});
    btnText     = new MenuButton('', menuString,   {useMenuName: true, highlight: () => currentMenus.includes(menuString), callback: () => updatePanMode(false)});
    //btnStyle  = new MenuButton('', menuStyle,    {useMenuName: true, highlight: () => currentMenus.includes(menuStyle ), callback: () => updatePanMode(false)});
    //btnGroup  = new MenuButton('', menuGroup,  {useMenuName: true, highlight: () => currentMenus.includes(menuGroup ), callback: () => updatePanMode(false)});
    
    // btnGroup  = new MenuButton('Node groups', null, {callback: () => 
    // {
    //     const create = new CreateNodeAction(OUP, btnGroup.div);
    //     actionManager.do(create);

    //     graphView.updateNodes([create.node]);
    //     graphView.updateScrollWithBounds();

    //     updatePanMode(false);
    // }});


    if (false)
    {
        btnPanel = new MenuButton('', menuPanel, {useMenuName: true, highlight: () => currentMenus.includes(menuPanel ), callback: () => updatePanMode(false)});
    }
    else
    {
        btnPanel = new MenuButton('Panel', null, {callback: () => 
        {
            const create = new CreateNodeAction(PANEL, btnPanel.div);
            actionManager.do(create);

            graphView.updateNodes([create.node]);
            graphView.updateScrollWithBounds();

            hideAllMenus();
            updatePanMode(false);
        }});
    }
    
    
    btnHand = new MenuButton('Hand tool&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #888; font-weight: 500;">H</span>', null, {callback: () => 
        {
            hideAllMenus(); 
            updatePanMode(!panMode);
        }});


    // btnComment = new MenuButton('Add comment', null, {callback: () => 
    // {
    //     const create = new CreateNodeAction(COMMENT, btnComment.div);
    //     actionManager.do(create);

    //     graphView.updateNodes([create.node]);
    //     graphView.updateScrollWithBounds();

    //     hideAllMenus();
    //     updatePanMode(false);
    // }});


    //menuBar.appendChild(createDiv('', 'groupName'));


    // btnPage = new MenuButton(
    //     '-', 
    //     menuPage, 
    //     {
    //         afterLabel:  true,
    //         useMenuName: false,
    //         noHighlight: true
    //     });

    // btnPage.divIcon.style.width   = 4;
    
    // btnPage.div.style.marginRight = 'auto';
    
    // btnPage.div.style.position    = 'relative';
    // btnPage.div.style.left        = '-26px';


    createObjectCountInfo();


    btnSolo = new MenuButton('Highlight mode&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #888; font-weight: 500;">~</span>', null, {callback: () => 
    {
        updateSoloMode(!graphView.soloMode);
    }});
    
    btnSolo.highlight = () => graphView.soloMode;

    btnSolo.div.style.position = 'absolute';
    btnSolo.div.style.right    = '66px';


    btnZoom = new MenuButton(
        '', 
        menuZoom, 
        { 
            useMenuName: true, 
            selectLast:  false, 
            highlight:   () => currentMenus.includes(menuZoom),
            tooltip:     ttMinValueZoom,
            afterLabel:  true
        });

        
    btnZoom.div.insertBefore(createDiv('', 'zoomIconOverlay'), btnZoom.divIcon);

    btnZoom.divIcon.style.textAlign          = 'center';
    btnZoom.divIcon.style.fontVariantNumeric = 'tabular-nums';
    btnZoom.divIcon.style.letterSpacing      = '-0.8px';


    btnMain.div.style.paddingLeft            = '6px';

    btnZoom.div.style.position               = 'absolute';
    btnZoom.div.style.right                  = '0px';
    btnZoom.div.style.paddingRight           = '5px';
    btnZoom.div.style.paddingLeft            = '11px';
    // btnZoom.div.style.boxShadow           = '0 0 0 1px red inset';


    btnFlow    .setIcon(iconFlow);
    btnData    .setIcon(iconData);
    btnSets    .setIcon(iconSequence);
    btnMain    .setIcon(iconGenerator);
    btnColor   .setIcon(iconVarColor);
    //btnLayer  .setIcon(iconEffects);
    btnShape   .setIcon(iconShapes);
    btnHand    .setIcon(iconHand);
    //btnComment.setIcon(iconComment);
    btnTemplate.setIcon(iconTemplate);
    btnPanel   .setIcon(iconPanel);
    btnSolo    .setIcon(iconSolo);


    menuBarMenus = 
    [
        menuFlow,
        menuData,
        menuItems,
        menuParams,
        menuNames,
        menuSets,
        menuNumber,
        menuNumberBase,
        menuFunctions,
        menuMath,
        menuMinMax,
        //menuTrig,
        menuConvertNumber,
        menuConvertText,
        menuString,
        menuTextFunctions,
        menuTextData,
        menuColor,
        menuLayer,
        menuEffects,
        menuStyles,
        menuShape,
        menuShapes,
        menuRectangle,
        menuVectorPath,
        menuVectorFunctions,
        menuPoint,
        menuTransform,
        menuPanel
    ];
}



function createObjectCountInfo()
{
    objectCountWrapper  = createDiv('', "objectCountWrapper" );
    objectCountInfo     = createDiv('', "objectCountInfo"    );
    objectCountProgress = createDiv('', "objectCountProgress");
    objectCountNumber   = createDiv('', "objectCountNumber"  );

    objectCountNumber.innerHTML = '0';
    
    objectCountInfo.appendChild(objectCountProgress);
    objectCountInfo.appendChild(objectCountNumber);
 
    objectCountWrapper.appendChild(objectCountInfo);
    menuBar.appendChild(objectCountWrapper);

    createTooltip(ttObjectCount);
    createTooltipSrc(objectCountWrapper, objectCountWrapper, () => ttObjectCount);
}



function initDebugModeMenus()
{
    menuPageData = new Menu('Pages menu', false, false);
    menuPageData.addItems([
        // new MenuItem('Delete all pages',  null, { enabled: false, callback: () => { hideAllMenus(); debugModeDeleteAllPages(); }}),
        // new MenuItem('',                  null, { enabled: false, separator: true }),
        new MenuItem('Delete page',       null, { callback: () => { hideAllMenus(); debugModeDeletePage(menuPageData._div.page); }})]);


    menuPageDataPages = new Menu('Pages menu', false, false);
    menuPageDataPages.addItems([
        new MenuItem('Expand all',       null, { callback: () => { hideAllMenus(); expandAllPageData();   }}),
        new MenuItem('Collapse all',     null, { callback: () => { hideAllMenus(); collapseAllPageData(); }}),
        new MenuItem('',                 null, { separator: true }),
        new MenuItem('Delete all pages', null, { callback: () => { hideAllMenus(); debugModeDeleteAllPages(); }})]);


    menuNodeData = new Menu('Node menu', false, false);
    menuNodeData.addItems([
        new MenuItem('Remove path from ID',     null, { callback: () => { hideAllMenus(); debugModeDeletePathFromNodeId(menuNodeData._div.node); }}),
        new MenuItem('',                        null, { separator: true }),
        new MenuItem('Delete connections from', null, { callback: () => { hideAllMenus(); debugModeDeleteConnectionsFromNode     (menuNodeData._div.node); }}),
        new MenuItem('Delete connections to'  , null, { callback: () => { hideAllMenus(); debugModeDeleteConnectionsToNode       (menuNodeData._div.node); }}),
        new MenuItem('Delete all connections',  null, { callback: () => { hideAllMenus(); debugModeDeleteConnectionsToAndFromNode(menuNodeData._div.node); }}),
        new MenuItem('',                        null, { separator: true }),
        new MenuItem('Delete node',             null, { callback: () => { hideAllMenus(); debugModeDeleteNode(menuNodeData._div.node); }})]);


    menuNodeDataSort = new Menu('Sort nodes menu', false);
    menuNodeDataSort.addItems([
        menuItemSortNodesType    = new MenuItem('Type',             null, { checkCallback: () => nodeSortOrder == 'type',    callback: () => { hideAllMenus(); sortNodeDivs('type'); }}),
        menuItemSortNodesId      = new MenuItem('ID',               null, { checkCallback: () => nodeSortOrder == 'id',      callback: () => { hideAllMenus(); sortNodeDivs('id');   }}),
        menuItemSortNodesName    = new MenuItem('Name',             null, { checkCallback: () => nodeSortOrder == 'name',    callback: () => { hideAllMenus(); sortNodeDivs('name'); }}),
                                   new MenuItem('',                 null, { separator: true }),
        menuItemSortNodesCreated = new MenuItem('Creation time',    null, { checkCallback: () => nodeSortOrder == 'created', callback: () => { hideAllMenus(); sortNodeDivs('created'); }}),
        menuItemSortNodesUpdated = new MenuItem('Last update time', null, { checkCallback: () => nodeSortOrder == 'updated', callback: () => { hideAllMenus(); sortNodeDivs('updated'); }})]);

    menuNodeDataNodes = new Menu('Nodes menu', false, false);
    menuNodeDataNodes.addItems([
        new MenuItem('Sort nodes by...', null, { childMenu: menuNodeDataSort }),
        new MenuItem('',                 null, { separator: true }),
        new MenuItem('Expand all',       null, { callback: () => { hideAllMenus(); expandAllNodeData();   }}),
        new MenuItem('Collapse all',     null, { callback: () => { hideAllMenus(); collapseAllNodeData(); }}),
        new MenuItem('',                 null, { separator: true }),
        new MenuItem('Delete all nodes', null, { callback: () => { hideAllMenus(); debugModeDeleteAllNodes(); }})]);


    menuConnData = new Menu('Connection menu', false, false);
    menuConnData.addItems([
        new MenuItem('Delete connection', null, { callback: () => { hideAllMenus(); debugModeDeleteConnection(menuConnData._div.conn); }})]);


    menuConnDataSort = new Menu('Sort connections menu', false);
    menuConnDataSort.addItems([
        menuItemSortConnsOutputNodeId   = new MenuItem('Output node ID',   null, { checkCallback: () => connSortOrderOut == 'outputNodeId',   callback: () => { hideAllMenus(); sortConnDivs('outputNodeId'  ); }}),
        menuItemSortConnsOutputNodeName = new MenuItem('Output node name', null, { checkCallback: () => connSortOrderOut == 'outputNodeName', callback: () => { hideAllMenus(); sortConnDivs('outputNodeName'); }}),
        menuItemSortConnsOutputId       = new MenuItem('Output ID',        null, { checkCallback: () => connSortOrderOut == 'outputId',       callback: () => { hideAllMenus(); sortConnDivs('outputId'      ); }}),
                                          new MenuItem('',                 null, { separator: true }),
        menuItemSortConnsInputNodeId    = new MenuItem('Input node ID',    null, { checkCallback: () => connSortOrderIn == 'inputNodeId',    callback: () => { hideAllMenus(); sortConnDivs('inputNodeId'  ); }}),
        menuItemSortConnsInputNodeName  = new MenuItem('Input node name',  null, { checkCallback: () => connSortOrderIn == 'inputNodeName',  callback: () => { hideAllMenus(); sortConnDivs('inputNodeName'); }}),
        menuItemSortConnsInputId        = new MenuItem('Input ID',         null, { checkCallback: () => connSortOrderIn == 'inputId',        callback: () => { hideAllMenus(); sortConnDivs('inputId'      ); }}),
                                          new MenuItem('',                 null, { separator: true }),
        menuItemSortConnsCreated        = new MenuItem('Creation time',    null, { checkCallback: () => connSortOrderOut == 'created',        callback: () => { hideAllMenus(); sortConnDivs('created'); }})]);

    menuConnDataConns = new Menu('Connections menu', false, false);
    menuConnDataConns.addItems([
        new MenuItem('Sort connections by...',   null, { childMenu: menuConnDataSort }),
        new MenuItem('',                         null, { separator: true }),
        new MenuItem('Expand all',               null, { callback: () => { hideAllMenus(); expandAllConnData();   }}),
        new MenuItem('Collapse all',             null, { callback: () => { hideAllMenus(); collapseAllConnData(); }}),
        new MenuItem('',                         null, { separator: true }),
        // new MenuItem('List all connection keys', null, { callback: () => { hideAllMenus(); uiQueueMessageToFigma({cmd: 'figLogAllSavedConnKeys', darkMode: darkMode}); }}),
        // new MenuItem('',                         null, { separator: true }),
        new MenuItem('Delete all connections',   null, { callback: e => { hideAllMenus(); debugModeDeleteAllConnections(); }})]);
}



function initTextMenu(textbox)
{
    menuText.clearItems();

    menuText.addItems([
        new MenuItem('Cut',   null, {enabled: !textbox.control || !textbox.control.readOnly, callback: () => { hideAllMenus(); document.execCommand('cut'); }}),
        new MenuItem('Copy',  null, {                                                        callback: () => { hideAllMenus(); document.execCommand('copy'); }}),
        new MenuItem('Paste', null, {enabled: !textbox.control || !textbox.control.readOnly, callback: () => { hideAllMenus(); document.execCommand('paste'); }})]);
}



function initCopyMenu()
{
    menuCopy.clearItems();

    menuCopy.addItems([
        new MenuItem('Copy',       null, {enabled: elementHasSelectedText(crashDialogBody), callback: () => { hideAllMenus(); document.execCommand('copy'); }}),
        new MenuItem('',           null, {separator: true }),
        new MenuItem('Select all', null, {callback: () => { hideAllMenus(); selectDivText(crashDetails); }})]);
}



function initTextboxMenu(textbox)
{
    menuTextbox.clearItems();


    let menuItemLeft,
        menuItemCenter,
        menuItemRight,
        menuItemJustify;


    const param = textbox.control.param;

    menuTextbox.addItems([
                          new MenuItem('Cut',          null, { enabled: !textbox.control.readOnly, callback: () => { hideAllMenus(); document.execCommand('cut'); }}),
                          new MenuItem('Copy',         null, {                                     callback: () => { hideAllMenus(); document.execCommand('copy'); }}),
                          new MenuItem('Paste',        null, { enabled: !textbox.control.readOnly, callback: () => { hideAllMenus(); document.execCommand('paste'); }}),
                          new MenuItem('',             null, { separator: true }),
        menuItemLeft    = new MenuItem('Align left',   null, { callback: () => { hideAllMenus(); actionManager.do(new SetParamSettingAction(param, 'align', 'left'   )); }}),
        menuItemCenter  = new MenuItem('Align center', null, { callback: () => { hideAllMenus(); actionManager.do(new SetParamSettingAction(param, 'align', 'center' )); }}),
        menuItemRight   = new MenuItem('Align right',  null, { callback: () => { hideAllMenus(); actionManager.do(new SetParamSettingAction(param, 'align', 'right'  )); }}),
        menuItemJustify = new MenuItem('Justify',      null, { callback: () => { hideAllMenus(); actionManager.do(new SetParamSettingAction(param, 'align', 'justify')); }})]);


    const align = textbox.control.getTextAlignment();

    menuItemLeft   .setChecked(align == 'left'   );
    menuItemCenter .setChecked(align == 'center' );
    menuItemRight  .setChecked(align == 'right'  );
    menuItemJustify.setChecked(align == 'justify');
}



function updatePanMode(enabled)
{
    panMode = enabled;  
    currentMenuButton = panMode ? btnHand : null;
    btnHand.update();

    setCursor(panMode ? panCursor : 'default');
}



function updateSoloMode(enabled)
{
    graphView.soloMode = enabled;  
    btnSolo.update();

    if (graphView.soloMode) graphView.soloNode(graphView.overNode);
    else                    graphView.unsoloNode();
}



function getCreateOptions(e, options = {})
{
    return {
        insert:      e.ctrlKey,
        autoConnect:    e.ctrlKey 
                     && e.altKey,
        fromSearch:  e.fromSearch === true,
        ...options
    };
}
