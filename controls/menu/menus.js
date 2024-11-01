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
var btnDecoration;
var btnPage;
var objectCountWrapper;
var objectCountInfo;
var objectCountProgress;
var objectCountNumber;
var btnSolo;
var btnZoom;


var menuBarMenus;


var menuDebugMain;
var menuMain;
var menuMainFile;
var menuShiftR;
var menuMainPreferences;
var menuMainDebug;
var menuMainHelp;

var menuShowTooltips;
var menuShowWarnings;

var menuLogGenerator;
var menuLogStorage;
var menuLogMessages;

var menuDebugDelete;

var menuRepeat;
var menuSelectFromList;
var menuFlow;
var menuList;
var menuData;
var menuItems;
var menuNumber;
var menuSets;
var menuAddText;
var menuString;
var menuTextFunctions;
var menuConvertNumber;
var menuConvertText;
var menuComplexData;
var menuStroke;
var menuValidColor;
var menuColor;
var menuCreateColor;
var menuColorStyle;
var menuLayer;
var menuEffects;
var menuStyles;
var menuShape;
var menuTemplate;
var menuGroup;
var menuDecoration;

var menuNumberBase;
var menuMath;
var menuMinMax;
var menuBoolean;
var menuCondition;
var menuTrig;
var menuFunctions;

var menuVectorPoints;
var menuVectorPaths;
var menuVectorNetworks;
var menuVectorShapes;
var menuShapes;
var menuRectangle;
var menuTransform;

var menuVariables;
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
var menuNodeRandomize;


var menuLocalStyles;
var menuLocalVariables;
var menuOptionParam;

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
var menuItemShowTooltipValidateMethod;
var menuItemShowTooltipColorBlindness;
var menuItemShowTooltipColorContrast;
var menuItemShowTooltipColorNames;
var menuItemShowTooltipAscii;


var menuItemEnableZoomedOutParams;
var menuItemMinZoomForParams;
var menuItemObjectCenterSize;
var menuItemObjectBatchSize;
var menuItemVariableNulls;
var menuItemMaxSolveIterations;
var menuItemShowPages;
var menuPrefSep1;

var menuItemShowSnapshots;
var menuItemShowAllColorSpaces;
var menuItemPreferHtmlColorNames;
var menuItemShowNodeIcons;
var menuItemShowColorLegendInMenus;
var menuItemShowBoolValues;
var menuItemSeparateThousands;
var menuItemAllowInvertParams;
var menuItemActivateDeactiatesOthers;
var menuItemRandomShiftR;
var menuItemColorShiftR;
var menuItemNumberShiftR;
var menuItemShowClearUndoWarning;
var menuItemShowRestartInfo;
var menuItemShareUsageMetrics;
var menuItemShowTooltips;
var menuItemShowWarnings;
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

var menuItemUpgrade;
var menuItemHelp;

var menuItemRestartSep;
var menuItemRestart;


var menuItemEnableBetaFeatures;


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
var menuItemGetValueNames;
var menuItemSetValueNames;
var menuItemGetValueName;
var menuItemSetValueName;
var menuItemObjectName;
var menuItemGetParameter;
var menuItemSetParameter;
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

var menuItemParseJson;
var menuItemToJson;

var menuItemColor;
var menuItemValidColor;
var menuItemCorrectColor;
var menuItemConvertToP3;
var menuItemColorSep1;
var menuItemColorblind;
var menuItemColorBlend;
var menuItemColorScheme;
var menuItemColorDifference;


var menuItemLayerFill;
var menuItemLayerStroke;
var menuItemLayerSep1;
var menuItemLayerDropShadow;
var menuItemLayerInnerShadow;
var menuItemLayerLayerBlur;
var menuItemLayerBackBlur;
var menuItemStyleSep2;


var menuItemBooleanSep;
var menuItemBooleanShape;
var menuItemShapeSep1;
var menuItemShapeSelected;
var menuItemRetain;
var menuItemShapeExport;


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

var menuItemCopyLLMPrompt;

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
//var menuItemNodeSep2;
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
var menuItemNodeSaveAsTemplate;
var menuItemNodeSepRem;
var menuItemNodeEnableDisable;
var menuItemNodeSepRnd;
var menuItemNodeConnectSeeds;
var menuItemNodeRandomizeSeeds;
var menuItemNodeRandomizeColors;
var menuItemNodeRandomizeNumbers;
var menuItemNodeRandomizeNodes;
var menuItemPointAlongPath;
var menuItemClosestPointOnPath;
var menuItemVectorVertex;
var menuItemVectorEdge;
var menuItemVectorRegion;
var menuItemVectorNetwork;

var menuItemLicenseSep1;
var menuItemLicenseRemove;

var menuItemSaveTemplate;



function initGeneratorMenus()
{
    menuShowTooltips = new Menu('Show tooltips', false);
    menuShowTooltips.addItems([
        menuItemShowTooltipLists              = new MenuItem('List items',          null, false, {checkCallback: () => settings.showTooltipLists,              callback: () => { updateSettingAndMenu('showTooltipLists',              true, !settings.showTooltipLists             ); }}),
        menuItemShowTooltipLongText           = new MenuItem('Long text',           null, false, {checkCallback: () => settings.showTooltipLongText,           callback: () => { updateSettingAndMenu('showTooltipLongText',           true, !settings.showTooltipLongText          ); }}),
        menuItemShowTooltipAscii              = new MenuItem('ASCII',               null, false, {checkCallback: () => settings.showTooltipAscii,              callback: () => { updateSettingAndMenu('showTooltipAscii',              true, !settings.showTooltipAscii             ); }}),        
        menuItemShowTooltipColorNames         = new MenuItem('Color names',         null, false, {checkCallback: () => settings.showTooltipColorNames,         callback: () => { updateSettingAndMenu('showTooltipColorNames',         true, !settings.showTooltipColorNames        ); }}),
        menuItemShowTooltipColorContrast      = new MenuItem('Color contrast',      null, false, {checkCallback: () => settings.showTooltipColorContrast,      callback: () => { updateSettingAndMenu('showTooltipColorContrast',      true, !settings.showTooltipColorContrast     ); }}),
        menuItemShowTooltipColorInterpolation = new MenuItem('Color interpolation', null, false, {checkCallback: () => settings.showTooltipColorInterpolation, callback: () => { updateSettingAndMenu('showTooltipColorInterpolation', true, !settings.showTooltipColorInterpolation); }}),
        menuItemShowTooltipValidateMethod     = new MenuItem('Validation method',   null, false, {checkCallback: () => settings.showTooltipValidateMethod,     callback: () => { updateSettingAndMenu('showTooltipValidateMethod',     true, !settings.showTooltipValidateMethod    ); }}),
        menuItemShowTooltipColorBlindness     = new MenuItem('Color blindness',     null, false, {checkCallback: () => settings.showTooltipColorBlindness,     callback: () => { updateSettingAndMenu('showTooltipColorBlindness',     true, !settings.showTooltipColorBlindness    ); }})]);


    // menuShowWarnings = new Menu('Show warnings', false);
    // menuShowWarnings.addItems([
    //     //menuItemShowClearUndoWarning = new MenuItem('Show clear undo warning', null, false, {checkCallback: () => settings.showClearUndoWarning, callback: () => { updateSettingAndMenu('showClearUndoWarning',       true, !settings.showClearUndoWarning); }}),
    //     menuItemShowRestartInfo      = new MenuItem('Show restart warning',    null, false, {checkCallback: () => settings.showRestartInfo,      callback: () => { updateSettingAndMenu('showRestartInfo',            true, !settings.showRestartInfo);      }})]);


    menuMainFile = new Menu('File', false);
    menuMainFile.addItems([
                               new MenuItem('Open file . . .',        null, false, {callback: () => { hideAllMenus(); checkFileWarningDialog(() => uiOpenLocalFile()); }}),
                               new MenuItem('Import from file . . .', null, false, {callback: () => { hideAllMenus(); uiImportFromLocalFile(); }}),
        menuFileSep1         = new MenuItem('',                       null, false, {separator: true}),    
        menuItemSaveToFile   = new MenuItem('Save to file . . .',     null, false, {shortcut: osCtrl() + 'S', callback: () => { hideAllMenus(); uiSaveToLocalFile(); }}),
        menuItemSaveSelected = new MenuItem('Save selected . . .',    null, false, {shortcut: osCtrlShift() + 'S', callback: () => { hideAllMenus(); uiSaveSelectionToLocalFile(); }})]);


    menuShiftR = new Menu('Shift+R', false);
    menuShiftR.addItems([
        menuItemRandomShiftR = new MenuItem('Random',  null, false, {checkCallback: () => settings.randomShiftR, callback: () => { updateSettingAndMenu('randomShiftR', true, !settings.randomShiftR); }}),
        menuItemColorShiftR  = new MenuItem('Colors',  null, false, {checkCallback: () => settings.colorShiftR,  callback: () => { updateSettingAndMenu('colorShiftR',  true, !settings.colorShiftR);  }}),
        menuItemNumberShiftR = new MenuItem('Numbers', null, false, {checkCallback: () => settings.numberShiftR, callback: () => { updateSettingAndMenu('numberShiftR', true, !settings.numberShiftR); }})]);


    initPreferenceMenus();


    //menuMainHelp = new Menu('Help and subscription', false);
    menuMainHelp = new Menu('Help', false);
    menuMainHelp.addItems([
        new MenuItem('Keyboard shortcuts',   null, false, {shortcut: osCtrlShift() + '?', callback: () => showKeyboardPanel()}),
        new MenuItem('Tutorials & examples', null, false, {callback: () => showPresets()}),
        new MenuItem('Video tutorials',      null, false, {callback: () => window.open('https://www.youtube.com/channel/UC1tInoqlh6TYHlFJ3q-YEmA', '_blank')}),
        // new MenuItem('Help page',         null, false, {callback:  () => window.open('http://www.bourt.com/generator/help', '_blank')}),
        new MenuItem('',                     null, false, {separator: true}),
        //new MenuItem('Subscription',       null, false, {callback:  () => showSubscriptionDialog(false)}),
        new MenuItem('EULA',                 null, false, {callback:  () => showEulaDialog()}),
        new MenuItem('About',                null, false, {callback:  () => showAboutDialog()})]);


    menuMain = new Menu('Main menu', true, false, true);
    menuMain.addItems([
                             new MenuItem('Quick actions. . .',     null, false, {icon: iconSearchMenu, shortcut: osCtrl() + '/', callback: () => { hideAllMenus(); showSearchBox(); }}),
                             new MenuItem('',                       null, false, {separator: true}),
                             new MenuItem('File',                   null, false, {childMenu: menuMainFile}),
                             new MenuItem('',                       null, false, {separator: true}),
                             new MenuItem('Preferences',            null, false, {childMenu: menuMainPreferences}),
        menuDebug          = new MenuItem('Debug',                  null, false, {childMenu: menuMainDebug}),
                             new MenuItem('',                       null, false, {separator: true}),
      //menuItemHelp       = new MenuItem('Help and subscription',  null, false, {childMenu: menuMainHelp }),
        menuItemUpgrade    = new MenuItem('Upgrade to Pro',         null, false, {callback: () => uiFigmaManageSubscription()}),
        menuItemHelp       = new MenuItem('Help',                   null, false, {childMenu: menuMainHelp }),
        menuItemRestartSep = new MenuItem('',                       null, false, {separator: true}),
        menuItemRestart    = new MenuItem('Restart to update. . .', null, false, {icon: iconUpdate, callback: () => settings.showRestartInfo ? showRestartDialog() : uiRestartGenerator()})]);

    updateElementDisplay(menuItemRestartSep.div, false);
    updateElementDisplay(menuItemRestart   .div, false);


    menuVariables = new Menu('Variables', true, false);
    menuVariables.addItems([
        menuItemVarGroup   = new MenuItem('Variable group',    null, false, {icon: iconVariableGroup, createType: VARIABLE_GROUP, callback: e => actionManager.do(getCreateNodeAction(VARIABLE_GROUP,  btnFlow.div, getCreateOptions(e)))})]);

    menuParams = new Menu('Parameters', true, false);
    menuParams.addItems([
        new MenuItem('Set parameter', null, false, {icon: iconSetParam, createType: SET_PARAM, callback: e => actionManager.do(getCreateNodeAction(SET_PARAM, btnFlow.div, getCreateOptions(e)))}),
        new MenuItem('Get parameter', null, false, {icon: iconGetParam, createType: GET_PARAM, callback: e => actionManager.do(getCreateNodeAction(GET_PARAM, btnFlow.div, getCreateOptions(e)))})]);

    menuNames = new Menu('Name', true, false);
    menuNames.addItems([
        menuItemGetValueName  = new MenuItem('Get value name',       null, false, {icon: iconGetValueName,      createType: GET_VALUE_NAME,       callback: e => actionManager.do(getCreateNodeAction(GET_VALUE_NAME,       btnFlow.div, getCreateOptions(e)))}),
        menuItemSetValueName  = new MenuItem('Set value name',       null, false, {icon: iconSetValueName,      createType: SET_VALUE_NAME,       callback: e => actionManager.do(getCreateNodeAction(SET_VALUE_NAME,       btnFlow.div, getCreateOptions(e)))}),
                                new MenuItem('',                     null, false, {separator: true}),
        menuItemGetValueNames = new MenuItem('Get list value names', null, false, {icon: iconGetListValueNames,      createType: GET_LIST_VALUE_NAMES, callback: e => actionManager.do(getCreateNodeAction(GET_LIST_VALUE_NAMES, btnFlow.div, getCreateOptions(e)))}),
        menuItemSetValueNames = new MenuItem('Set list value names', null, false, {icon: iconSetListValueNames, createType: SET_LIST_VALUE_NAMES, callback: e => actionManager.do(getCreateNodeAction(SET_LIST_VALUE_NAMES, btnFlow.div, getCreateOptions(e)))}),
                                new MenuItem('',                     null, false, {separator: true}),
        menuItemObjectName    = new MenuItem('Set object name',      null, false, {icon: iconSetObjectName,     createType: SET_OBJECT_NAME,      callback: e => actionManager.do(getCreateNodeAction(SET_OBJECT_NAME,      btnFlow.div, getCreateOptions(e)))}),
                                new MenuItem('',                     null, false, {separator: true}),
        menuItemGetParameter  = new MenuItem('Get parameter', null, false, {icon: iconGetParam, createType: GET_PARAM, callback: e => actionManager.do(getCreateNodeAction(GET_PARAM, btnFlow.div, getCreateOptions(e)))}),
        menuItemSetParameter  = new MenuItem('Set parameter', null, false, {icon: iconSetParam, createType: SET_PARAM, callback: e => actionManager.do(getCreateNodeAction(SET_PARAM, btnFlow.div, getCreateOptions(e)))})]);

    menuNames.init = () => menuNames.minWidth = subscribed() ? 200 : 220;        


    menuComplexData = new Menu('Data', true, false);
    menuComplexData.addItems([
        menuItemFetch     = new MenuItem('Fetch',      null, false, {icon: iconTextFetch, createType: TEXT_FETCH, callback: e => actionManager.do(getCreateNodeAction(TEXT_FETCH, btnFlow.div, getCreateOptions(e)))}),
        menuItemTextFile  = new MenuItem('Text file',  null, false, {icon: iconTextFile,  createType: TEXT_FILE,  callback: e => actionManager.do(getCreateNodeAction(TEXT_FILE,  btnFlow.div, getCreateOptions(e)))}),
        menuTextDataSep1  = new MenuItem('',           null, false, {separator: true}),
                            new MenuItem('Parse CSV',  null, false, {icon: iconParseCSV,  createType: PARSE_CSV,  callback: e => actionManager.do(getCreateNodeAction(PARSE_CSV,  btnFlow.div, getCreateOptions(e)))}),
        menuItemParseJson = new MenuItem('Parse JSON', null, false, {icon: iconParseJson, createType: PARSE_JSON, callback: e => actionManager.do(getCreateNodeAction(PARSE_JSON, btnFlow.div, getCreateOptions(e)))}),
        menuTextDataSep1  = new MenuItem('',           null, false, {separator: true}),
        menuItemToJson    = new MenuItem('To JSON',    null, false, {icon: iconToJson,    createType: TO_JSON,    callback: e => actionManager.do(getCreateNodeAction(TO_JSON,    btnFlow.div, getCreateOptions(e)))})]);
    
    
    menuRepeat = new Menu('Repeat', true, false);
    menuRepeat.addItems([
        //                  new MenuItem('Advance',        null,       false, {icon: iconAdvance,  createType: ADVANCE,          callback: e => actionManager.do(getCreateNodeAction(ADVANCE,         btnFlow.div, getCreateOptions(e)))}),
        menuItemStart   = new MenuItem('Feedback . . .', 'Feedback', false, {icon: iconFeedback, createType: FEEDBACK,         callback: e => actionManager.do(getCreateNodeAction(FEEDBACK,        btnFlow.div, getCreateOptions(e)))}),
                          new MenuItem('',               null,       false, {separator: true}),
        menuItemTimer   = new MenuItem('Timer ',         null,       false, {icon: iconTimer,    createType: TIMER,            callback: e => actionManager.do(getCreateNodeAction(TIMER,           btnFlow.div, getCreateOptions(e)))}),
        menuItemAnimate = new MenuItem('Animate',        null,       false, {icon: iconAnimate,  createType: NUMBER_ANIMATE,   callback: e => actionManager.do(getCreateNodeAction(NUMBER_ANIMATE,  btnFlow.div, getCreateOptions(e)))})]);

    menuSelectFromList = new Menu('Select', true, false);
    menuSelectFromList.addItems([
        new MenuItem('Select from list', null, false, {icon: iconSelectFromList, createType: SELECT_FROM_LIST,        callback: e => actionManager.do(getCreateNodeAction(SELECT_FROM_LIST, btnFlow.div, getCreateOptions(e)))})]);


    menuFlow = new Menu('Data flow', true, false);
    menuFlow.addItems([
        menuItemIfElse     = new MenuItem('I&hairsp;f / else', 'If else',  false, {icon: iconIfElse,        createType: IF_ELSE,       callback: e => actionManager.do(getCreateNodeAction(IF_ELSE,          btnFlow.div, getCreateOptions(e))), disambiguate: true}),
        menuItemSelect     = new MenuItem('Select',            null,       false, {childMenu: menuSelectFromList, icon: iconSelect,        createType: SELECT,        callback: e => actionManager.do(getCreateNodeAction(SELECT,           btnFlow.div, getCreateOptions(e)))}),
                             new MenuItem('',                  null,       false, {separator: true}),
        menuItemRepeat     = new MenuItem('. . . Repeat',      'Repeat',   false, {icon: iconRepeat, childMenu: menuRepeat, createType: REPEAT,         callback: e => actionManager.do(getCreateNodeAction(REPEAT,          btnFlow.div, getCreateOptions(e)))}),
        //menuItemVarGroup   = new MenuItem('Variable group',  null,       false, {icon: iconVariableGroup, createType: VARIABLE_GROUP, callback: e => actionManager.do(getCreateNodeAction(VARIABLE_GROUP,  btnFlow.div, getCreateOptions(e)))}),
                             new MenuItem('',                  null,       false, {separator: true}),
        menuItemCache      = new MenuItem('Cache. . .',        'Cache',    false, {icon: iconCache,         createType: CACHE,          callback: e => actionManager.do(getCreateNodeAction(CACHE,           btnFlow.div, getCreateOptions(e)))}),
        menuItemFreeze     = new MenuItem('Freeze',            null,       false, {icon: iconFreeze,        createType: FREEZE,         callback: e => actionManager.do(getCreateNodeAction(FREEZE,          btnFlow.div, getCreateOptions(e)))}),
        menuItemRetain    = new MenuItem('Retain',            null,       false, {icon: iconRetain,   createType: RETAIN,        callback: e => actionManager.do(getCreateNodeAction(RETAIN,         btnFlow.div, getCreateOptions(e)))}),
                             new MenuItem('',                  null,       false, {separator: true}),
                             new MenuItem('Variable',          null,       false, {icon: iconVariable,      createType: VARIABLE,       callback: e => actionManager.do(getCreateNodeAction(VARIABLE,        btnFlow.div, getCreateOptions(e)))}),
                             new MenuItem('',                  null,       false, {separator: true}),
        menuItemNull       = new MenuItem('Null',              null,       false, {icon: iconNull,          createType: NULL_NODE,      callback: e => actionManager.do(getCreateNodeAction(NULL_NODE,       btnFlow.div, getCreateOptions(e)))}),
                             new MenuItem('',                  null,       false, {separator: true}),
                             new MenuItem('Values',            null,       false, {icon: iconValues, childMenu: menuNames}),
                             new MenuItem('Data',              null,       false, {icon: iconTextFile,     childMenu: menuComplexData})]);
                           //new MenuItem('Parameters',        null,       false, {icon: iconParameters, childMenu: menuParams})]);
    

    menuItems = new Menu('List functions', true, false);
    menuItems.addItems([
                              new MenuItem('Sublist',       null,         false, {icon: iconSublist,        createType: SUBLIST,          callback: e => actionManager.do(getCreateNodeAction(SUBLIST,          btnData.div, getCreateOptions(e)))}),
                              new MenuItem('Extract items', null,         false, {icon: iconExtract,        createType: EXTRACT,          callback: e => actionManager.do(getCreateNodeAction(EXTRACT,          btnData.div, getCreateOptions(e)))}),
                              new MenuItem('',              null,         false, {separator: true}),
        menuItemReorderList = new MenuItem('Reorder',       null,         false, {icon: iconReorderList,    createType: REORDER_LIST,     callback: e => actionManager.do(getCreateNodeAction(REORDER_LIST,     btnData.div, getCreateOptions(e)))}),
        menuItemShiftList   = new MenuItem('Shift',         'Shift list', true,  {icon: iconShiftList,      createType: SHIFT_LIST,       callback: e => actionManager.do(getCreateNodeAction(SHIFT_LIST,       btnData.div, getCreateOptions(e)))}),
        menuItemReverseList = new MenuItem('Reverse',       null,         false, {icon: iconReverseList,    createType: REVERSE_LIST,     callback: e => actionManager.do(getCreateNodeAction(REVERSE_LIST,     btnData.div, getCreateOptions(e)))}),
                              new MenuItem('',              null,         false, {separator: true}),
        menuItemUniqueList  = new MenuItem('Unique',        null,         false, {icon: iconUnique,         createType: UNIQUE,           callback: e => actionManager.do(getCreateNodeAction(UNIQUE,           btnData.div, getCreateOptions(e)))}),
        menuItemFilter      = new MenuItem('Filter',        null,         false, {icon: iconFilter,         createType: FILTER,           callback: e => actionManager.do(getCreateNodeAction(FILTER,           btnData.div, getCreateOptions(e)))}),
        menuItemSort        = new MenuItem('Sort',          null,         false, {icon: iconSort,           createType: SORT,             callback: e => actionManager.do(getCreateNodeAction(SORT,             btnData.div, getCreateOptions(e)))}),
                              new MenuItem('',              null,         false, {separator: true}),
                              new MenuItem('Blend edges',   null,         false, {icon: iconBuckleList,     createType: BUCKLE_LIST,      callback: e => actionManager.do(getCreateNodeAction(BUCKLE_LIST,      btnData.div, getCreateOptions(e)))})]);
    

    menuList = new Menu('List menu', true, false);
    menuList.addItems([
        new MenuItem('List as item', null, false, {icon: iconListAsItem, createType: LIST_AS_ITEM, callback: e => actionManager.do(getCreateNodeAction(LIST_AS_ITEM, btnData.div, getCreateOptions(e)))})]);


    menuData = new Menu('Lists', true, false);
    menuData.addItems([
        menuItemCombine = new MenuItem('List',         null,            false, {childMenu: menuList, icon: iconData, createType: LIST,          callback: e => actionManager.do(getCreateNodeAction(LIST,             btnData.div, getCreateOptions(e)))}),
        menuItemList    = new MenuItem('Items. . .',   null,            false, {icon: iconExpand,                    createType: ITEMS,         callback: e => actionManager.do(getCreateNodeAction(ITEMS,            btnData.div, getCreateOptions(e)))}),
                          new MenuItem('',             null,            false, {separator: true}),     
        menuItemCount   = new MenuItem('Count',        null,            false, {icon: iconCount,                     createType: ITEM_COUNT,    callback: e => actionManager.do(getCreateNodeAction(ITEM_COUNT,       btnData.div, getCreateOptions(e)))}),
                        //new MenuItem('Object count', null,            false, {icon: iconObjectCount,               createType: OBJECT_COUNT,  callback: e => actionManager.do(getCreateNodeAction(OBJECT_COUNT,     btnData.div, getCreateOptions(e)))}),
                        //new MenuItem('',             null,            false, {separator: true}),     
                          new MenuItem('Contains',     'List contains', true,  {icon: iconListContains,              createType: LIST_CONTAINS, callback: e => actionManager.do(getCreateNodeAction(LIST_CONTAINS,    btnData.div, getCreateOptions(e))), disambiguate: true}),
                          new MenuItem('Find',         'Find in list',  true,  {icon: iconListFind,                  createType: LIST_FIND,     callback: e => actionManager.do(getCreateNodeAction(LIST_FIND,        btnData.div, getCreateOptions(e))), disambiguate: true}),
                          new MenuItem('',             null,            false, {separator: true}),     
                          new MenuItem('Column',       null,            false, {icon: iconColumn,                    createType: COLUMN,        callback: e => actionManager.do(getCreateNodeAction(COLUMN,           btnData.div, getCreateOptions(e)))}),
                          new MenuItem('Cell',         null,            false, {icon: iconCell,                      createType: CELL,          callback: e => actionManager.do(getCreateNodeAction(CELL,             btnData.div, getCreateOptions(e)))}),
                          new MenuItem('',             null,            false, {separator: true}),     
                          new MenuItem('Functions',    null,            false, {icon: iconListFunctions, childMenu: menuItems})]);


    menuSets = new Menu('Sets...', true, false);
    menuSets.addItems([
        menuItemArray    = new MenuItem('Iterate. . .',     null, false, {icon: iconIterate,     createType: ITERATE,            callback: e => actionManager.do(getCreateNodeAction(ITERATE,            btnSets.div, getCreateOptions(e)))}),
                           new MenuItem('',                 null, false, {separator: true}),
        menuItemSequence = new MenuItem('Sequence. . .',    null, false, {icon: iconSequence,    createType: NUMBER_SEQUENCE,    callback: e => actionManager.do(getCreateNodeAction(NUMBER_SEQUENCE,    btnSets.div, getCreateOptions(e)))}),
        menuItemRange    = new MenuItem('Range. . .',       null, false, {icon: iconRange,       createType: NUMBER_RANGE,       callback: e => actionManager.do(getCreateNodeAction(NUMBER_RANGE,       btnSets.div, getCreateOptions(e)))}),
        menuItemWave     = new MenuItem('Wave. . .',        null, false, {icon: iconWave,        createType: NUMBER_WAVE,        callback: e => actionManager.do(getCreateNodeAction(NUMBER_WAVE,        btnSets.div, getCreateOptions(e)))}),
                           new MenuItem('',                 null, false, {separator: true}),
                           new MenuItem('Random . . .',     null, false, {icon: iconRandom,      createType: NUMBER_RANDOM,      callback: e => actionManager.do(getCreateNodeAction(NUMBER_RANDOM,      btnSets.div, getCreateOptions(e)))}),
                           new MenuItem('Noise. . .',       null, false, {icon: iconNoise,       createType: NUMBER_NOISE,       callback: e => actionManager.do(getCreateNodeAction(NUMBER_NOISE,       btnSets.div, getCreateOptions(e)))}),
                           new MenuItem('Probability. . .', null, false, {icon: iconProbability, createType: PROBABILITY,        callback: e => actionManager.do(getCreateNodeAction(PROBABILITY,        btnSets.div, getCreateOptions(e)))}),
                           new MenuItem('',                 null, false, {separator: true}),
                           new MenuItem('Accumulate. . .',  null, false, {icon: iconAccumulate,  createType: NUMBER_ACCUMULATE,  callback: e => actionManager.do(getCreateNodeAction(NUMBER_ACCUMULATE,  btnSets.div, getCreateOptions(e)))})]);
                           //new MenuItem('Hold. . .',        null, false, {icon: iconHold,        createType: HOLD,               callback: e => actionManager.do(getCreateNodeAction(HOLD,               btnSets.div, getCreateOptions(e)))})]);
        
    
    menuMath = new Menu('Math', true, false);
    menuMath.addItems([
        new MenuItem('Math (many)',  null, false, {icon: iconMulti, createType: NUMBER_MATH, callback: e => actionManager.do(getCreateNodeAction(NUMBER_MATH, btnNumber.div, getCreateOptions(e)))})]);
        

    menuMinMax = new Menu('Min/max', true, false);
    menuMinMax.addItems([
        new MenuItem('Min / max (many)', null, false, {icon: iconMulti, createType: NUMBER_MINMAX, callback: e => actionManager.do(getCreateNodeAction(NUMBER_MINMAX, btnNumber.div, getCreateOptions(e)))})]);
        

    menuBoolean = new Menu('Boolean', true, false);
    menuBoolean.addItems([
        new MenuItem('And', null, false, {icon: iconAnd, createType: NUMBER_AND, callback: e => actionManager.do(getCreateNodeAction(NUMBER_AND, btnNumber.div, getCreateOptions(e)))}),
        new MenuItem('Or',  null, false, {icon: iconOr , createType: NUMBER_OR,  callback: e => actionManager.do(getCreateNodeAction(NUMBER_OR,  btnNumber.div, getCreateOptions(e)))}),
        new MenuItem('Xor', null, false, {icon: iconXor, createType: NUMBER_XOR, callback: e => actionManager.do(getCreateNodeAction(NUMBER_XOR, btnNumber.div, getCreateOptions(e)))}),
        new MenuItem('Not', null, false, {icon: iconNot, createType: NUMBER_NOT, callback: e => actionManager.do(getCreateNodeAction(NUMBER_NOT, btnNumber.div, getCreateOptions(e)))})]);
        
    
    menuCondition = new Menu('Compare', true, false);
    menuCondition.addItems([
        new MenuItem('Greater',          null, false, {icon: iconGreater,        createType: NUMBER_GREATER,          callback: e => actionManager.do(getCreateNodeAction(NUMBER_GREATER,          btnNumber.div, getCreateOptions(e)))}),
        new MenuItem('Greater or equal', null, false, {icon: iconGreaterOrEqual, createType: NUMBER_GREATER_OR_EQUAL, callback: e => actionManager.do(getCreateNodeAction(NUMBER_GREATER_OR_EQUAL, btnNumber.div, getCreateOptions(e)))}),
        new MenuItem('Equal',            null, false, {icon: iconEqual,          createType: NUMBER_EQUAL,            callback: e => actionManager.do(getCreateNodeAction(NUMBER_EQUAL,            btnNumber.div, getCreateOptions(e)))}),
        new MenuItem('Not equal',        null, false, {icon: iconNotEqual,       createType: NUMBER_NOT_EQUAL,        callback: e => actionManager.do(getCreateNodeAction(NUMBER_NOT_EQUAL,        btnNumber.div, getCreateOptions(e)))}),
        new MenuItem('Less or equal',    null, false, {icon: iconLessOrEqual,    createType: NUMBER_LESS_OR_EQUAL,    callback: e => actionManager.do(getCreateNodeAction(NUMBER_LESS_OR_EQUAL,    btnNumber.div, getCreateOptions(e)))}),
        new MenuItem('Less',             null, false, {icon: iconLess,           createType: NUMBER_LESS,             callback: e => actionManager.do(getCreateNodeAction(NUMBER_LESS,             btnNumber.div, getCreateOptions(e)))})]);
        
    
    menuNumberBase = new Menu('Numbers', true, false);
    menuNumberBase.addItems([
                           new MenuItem('Constant',       null,           false, {icon: iconConstant,        createType: NUMBER_CONSTANT,  callback: e => actionManager.do(getCreateNodeAction(NUMBER_CONSTANT,  btnNumber.div, getCreateOptions(e)))}),
                           new MenuItem('Boolean',        null,           false, {icon: iconBooleanValue,    createType: BOOLEAN_NUMBER,   callback: e => actionManager.do(getCreateNodeAction(BOOLEAN_NUMBER,   btnNumber.div, getCreateOptions(e)))}),
                           new MenuItem('Bounded',        null,           false, {icon: iconBoundedNumber,   createType: BOUNDED_NUMBER,   callback: e => actionManager.do(getCreateNodeAction(BOUNDED_NUMBER,   btnNumber.div, getCreateOptions(e)))}),
                           new MenuItem('',               null,           false, {separator: true}),
        menuItemDateTime = new MenuItem('Date & time',    null,           false, {icon: iconDateTime,        createType: NUMBER_DATETIME,  callback: e => actionManager.do(getCreateNodeAction(NUMBER_DATETIME,  btnNumber.div, getCreateOptions(e)))})]);

        
    menuFunctions = new Menu('Functions', true, false);
    menuFunctions.addItems([
                           new MenuItem('Sign',          null, false, {icon: iconSign,        createType: NUMBER_SIGN,          callback: e => actionManager.do(getCreateNodeAction(NUMBER_SIGN,          btnNumber.div, getCreateOptions(e)))}),
                           new MenuItem('Negative',      null, false, {icon: iconNegative,    createType: NUMBER_NEGATIVE,      callback: e => actionManager.do(getCreateNodeAction(NUMBER_NEGATIVE,      btnNumber.div, getCreateOptions(e)))}),
                           new MenuItem('Absolute',      null, false, {icon: iconAbsolute,    createType: NUMBER_ABSOLUTE,      callback: e => actionManager.do(getCreateNodeAction(NUMBER_ABSOLUTE,      btnNumber.div, getCreateOptions(e)))}),
                           new MenuItem('Precision',     null, false, {icon: iconNumberPrecision, createType: NUMBER_PRECISION, callback: e => actionManager.do(getCreateNodeAction(NUMBER_PRECISION,     btnNumber.div, getCreateOptions(e)))}),
                           new MenuItem('',              null, false, {separator: true}),
                           new MenuItem('Round',         null, false, {icon: iconRound,       createType: NUMBER_ROUND,         callback: e => actionManager.do(getCreateNodeAction(NUMBER_ROUND,         btnNumber.div, getCreateOptions(e)))}),
                           new MenuItem('Quantize',      null, false, {icon: iconQuantize,    createType: NUMBER_QUANTIZE,      callback: e => actionManager.do(getCreateNodeAction(NUMBER_QUANTIZE,      btnNumber.div, getCreateOptions(e)))}),
                           new MenuItem('',              null, false, {separator: true}),
                           new MenuItem('Min / max',     null, false, {icon: iconMinMax,      childMenu: menuMinMax, createType: NUMBER_SIMPLE_MINMAX, callback: e => actionManager.do(getCreateNodeAction(NUMBER_SIMPLE_MINMAX, btnNumber.div, getCreateOptions(e)))}),
                           new MenuItem('Limits',        null, false, {icon: iconLimits,      createType: NUMBER_LIMITS,        callback: e => actionManager.do(getCreateNodeAction(NUMBER_LIMITS,        btnNumber.div, getCreateOptions(e)))}), 
                           new MenuItem('',              null, false, {separator: true}),
                           new MenuItem('Trigonometric', null, false, {icon: iconSine,         childMenu: menuTrig,          createType: NUMBER_TRIG,        callback: e => actionManager.do(getCreateNodeAction(NUMBER_TRIG,        btnNumber.div, getCreateOptions(e)))}),
                           new MenuItem('',              null, false, {separator: true}),
                           new MenuItem('Curve',         null, false, {icon: iconNumberCurve, createType: NUMBER_CURVE,         callback: e => actionManager.do(getCreateNodeAction(NUMBER_CURVE,         btnNumber.div, getCreateOptions(e)))}), 
                           new MenuItem('Bias',          null, false, {icon: iconNumberBias,  createType: NUMBER_BIAS,          callback: e => actionManager.do(getCreateNodeAction(NUMBER_BIAS,          btnNumber.div, getCreateOptions(e)))}), 
                           new MenuItem('Remap',         null, false, {icon: iconNumberMap,   createType: NUMBER_MAP,           callback: e => actionManager.do(getCreateNodeAction(NUMBER_MAP,           btnNumber.div, getCreateOptions(e)))}),
                           new MenuItem('',              null, false, {separator: true}),
                           new MenuItem('Is NaN',        null, false, {icon: iconIsNaN,       createType: NUMBER_IS_NAN,       callback: e => actionManager.do(getCreateNodeAction(NUMBER_IS_NAN,       btnNumber.div, getCreateOptions(e)))})]);
        

    menuTrig = new Menu('Trigonometric', true, false);
    menuTrig.addItems([
        new MenuItem('Arctangent', null, false, {icon: iconAtan2, createType: NUMBER_ATAN2, callback: e => actionManager.do(getCreateNodeAction(NUMBER_ATAN2, btnNumber.div, getCreateOptions(e)))})]);


    menuConvertNumber = new Menu('Convert number', true, false);
    menuConvertNumber.addItems([
        new MenuItem('Degrees ⟷ Radians', 'Degrees to Radians', false, {icon: iconConvertAngle,  createType: CONVERT_ANGLE, callback: e => actionManager.do(getCreateNodeAction(CONVERT_ANGLE, btnNumber.div, getCreateOptions(e)))})]);
    

    menuConvertText = new Menu('Convert text', true, false);
    menuConvertText.addItems([
                              new MenuItem('Text ⟶ Number',    'Text to Number',    false, {icon: iconTextToNumber,    createType: TEXT_TO_NUMBER,  callback: e => actionManager.do(getCreateNodeAction(TEXT_TO_NUMBER,  btnText.div, getCreateOptions(e)))}),
                              new MenuItem('Text ⟶ Boolean',   'Text to Boolean',   false, {icon: iconTextToBoolean,   createType: TEXT_TO_BOOLEAN, callback: e => actionManager.do(getCreateNodeAction(TEXT_TO_BOOLEAN, btnText.div, getCreateOptions(e)))}),
                              new MenuItem('Text ⟶ Color',     'Text to Color',     false, {icon: iconTextToColor,     createType: TEXT_TO_COLOR,   callback: e => actionManager.do(getCreateNodeAction(TEXT_TO_COLOR,   btnText.div, getCreateOptions(e)))}),
                              new MenuItem('',                   null,               true,  {separator: true}),
                              new MenuItem('Number ⟶ Text',    'Number to Text',    false, {icon: iconNumberToText,    createType: NUMBER_TO_TEXT,  callback: e => actionManager.do(getCreateNodeAction(NUMBER_TO_TEXT,  btnText.div, getCreateOptions(e)))}),
                              new MenuItem('Color ⟶ Text',     'Color to Text',     false, {icon: iconColorToText,     createType: COLOR_TO_TEXT,   callback: e => actionManager.do(getCreateNodeAction(COLOR_TO_TEXT,   btnText.div, getCreateOptions(e)))}),
                              new MenuItem('',                   null,               true,  {separator: true}),
                              new MenuItem('Code ⟶ Character', 'Code to Character', false, {icon: iconCodeToCharacter, createType: TEXT_CHAR,       callback: e => actionManager.do(getCreateNodeAction(TEXT_CHAR,       btnText.div, getCreateOptions(e)))}),
                              new MenuItem('Character ⟶ Code', 'Character to Code', false, {icon: iconCharacterToCode, createType: TEXT_UNICODE,    callback: e => actionManager.do(getCreateNodeAction(TEXT_UNICODE,    btnText.div, getCreateOptions(e)))}),
                              new MenuItem('',                   null,               true,  {separator: true}),
        menuItemIndexToName = new MenuItem('Index ⟶ Name',     'Index to Name',     false, {icon: iconIndexToName,     createType: INDEX_TO_NAME,   callback: e => actionManager.do(getCreateNodeAction(INDEX_TO_NAME,   btnText.div, getCreateOptions(e)))})]);
    

    menuNumber = new Menu('Numbers', true, false);
    menuNumber.addItems([
                        new MenuItem('Number',        null,                 false, {icon: iconNumber,       childMenu: menuNumberBase,    createType: NUMBER,             callback: e => actionManager.do(getCreateNodeAction(NUMBER,             btnNumber.div, getCreateOptions(e)))}),
                        new MenuItem('',              null,                 false, {separator: true}),
                        new MenuItem('Math',          null,                 false, {icon: iconMath,         childMenu: menuMath,          createType: NUMBER_SIMPLE_MATH, callback: e => actionManager.do(getCreateNodeAction(NUMBER_SIMPLE_MATH, btnNumber.div, getCreateOptions(e)))}),
                        new MenuItem('Logic',         null,                 false, {icon: iconBoolean,      /*childMenu: menuBoolean,  */ createType: NUMBER_BOOLEAN,     callback: e => actionManager.do(getCreateNodeAction(NUMBER_BOOLEAN,     btnNumber.div, getCreateOptions(e)))}),
                        new MenuItem('Compare',       null,                 false, {icon: iconCondition,    /*childMenu: menuCondition,*/ createType: NUMBER_COMPARE,   callback: e => actionManager.do(getCreateNodeAction(NUMBER_COMPARE,   btnNumber.div, getCreateOptions(e)))}),
                        new MenuItem('',              null,                 false, {separator: true}),
                        new MenuItem('Interpolate',   'Interpolate number', true,  {icon: iconInterpolate,                                createType: NUMBER_INTERPOLATE, callback: e => actionManager.do(getCreateNodeAction(NUMBER_INTERPOLATE, btnNumber.div, getCreateOptions(e)))}),
        menuItemSolve = new MenuItem('Solve',         null,                 true,  {icon: iconSolve,                                      createType: NUMBER_SOLVE,       callback: e => actionManager.do(getCreateNodeAction(NUMBER_SOLVE,       btnNumber.div, getCreateOptions(e)))}),
                        new MenuItem('',              null,                 false, {separator: true}),
                        new MenuItem('Functions',     null,                 false, {icon: iconRound,        childMenu: menuFunctions}),
                        new MenuItem('',              null,                 false, {separator: true}),
                        new MenuItem('Convert',       null,                 false, {icon: iconConvert,      childMenu: menuConvertNumber})]);


    menuTextFunctions = new Menu('Text functions', true, false);
    menuTextFunctions.addItems([
        new MenuItem('Trim',     null, false, {icon: iconTextTrim,     createType: TEXT_TRIM,     callback: e => actionManager.do(getCreateNodeAction(TEXT_TRIM,      btnText.div, getCreateOptions(e)))}),
        new MenuItem('Case',     null, false, {icon: iconTextCase,     createType: TEXT_CASE,     callback: e => actionManager.do(getCreateNodeAction(TEXT_CASE,      btnText.div, getCreateOptions(e)))}),
        new MenuItem('Pad',      null, false, {icon: iconTextPad,      createType: TEXT_PAD,      callback: e => actionManager.do(getCreateNodeAction(TEXT_PAD,       btnText.div, getCreateOptions(e)))}),
        new MenuItem('',         null, false, {separator: true}),
        new MenuItem('Escape',   null, false, {icon: iconTextEscape,   createType: TEXT_ESCAPE,   callback: e => actionManager.do(getCreateNodeAction(TEXT_ESCAPE,    btnText.div, getCreateOptions(e)))}),
        new MenuItem('Unescape', null, false, {icon: iconTextUnescape, createType: TEXT_UNESCAPE, callback: e => actionManager.do(getCreateNodeAction(TEXT_UNESCAPE,  btnText.div, getCreateOptions(e)))})]);


    menuAddText = new Menu('Add text', true, false);
    menuAddText.addItems([
        new MenuItem('Join text', null, false, {icon: iconMulti, createType: TEXT_JOIN, callback: e => actionManager.do(getCreateNodeAction(TEXT_JOIN,      btnText.div, getCreateOptions(e)))})]);
        

    menuString = new Menu('Text', true, false);
    menuString.addItems([
        new MenuItem('Text',       null,            false, {icon: iconText,          createType: TEXT,           callback: e => actionManager.do(getCreateNodeAction(TEXT,           btnText.div, getCreateOptions(e)))}),
        new MenuItem('',           null,            false, {separator: true}),
        new MenuItem('Length',     null,            false, {icon: iconTextLength,    createType: TEXT_LENGTH,    callback: e => actionManager.do(getCreateNodeAction(TEXT_LENGTH,    btnText.div, getCreateOptions(e)))}),
        new MenuItem('Contains',   'Text contains', true,  {icon: iconTextContains,  createType: TEXT_CONTAINS,  callback: e => actionManager.do(getCreateNodeAction(TEXT_CONTAINS,  btnText.div, getCreateOptions(e)))}),
        new MenuItem('Find',       'Find in text',  true,  {icon: iconTextFind,      createType: TEXT_FIND,      callback: e => actionManager.do(getCreateNodeAction(TEXT_FIND,      btnText.div, getCreateOptions(e)))}),
        new MenuItem('Compare',    null,            false, {icon: iconTextCompare,   createType: TEXT_COMPARE,   callback: e => actionManager.do(getCreateNodeAction(TEXT_COMPARE,   btnText.div, getCreateOptions(e)))}),
        new MenuItem('',           null,            false, {separator: true}),
        new MenuItem('Add text',   null,            false, {childMenu: menuAddText, icon: iconAddText,       createType: TEXT_ADD,       callback: e => actionManager.do(getCreateNodeAction(TEXT_ADD,       btnText.div, getCreateOptions(e)))}),
        new MenuItem('Split',      null,            false, {icon: iconTextSplit,     createType: TEXT_SPLIT,     callback: e => actionManager.do(getCreateNodeAction(TEXT_SPLIT,     btnText.div, getCreateOptions(e)))}),
        new MenuItem('Substring',  null,            false, {icon: iconTextSubstring, createType: TEXT_SUBSTRING, callback: e => actionManager.do(getCreateNodeAction(TEXT_SUBSTRING, btnText.div, getCreateOptions(e)))}),
        new MenuItem('Replace',    null,            false, {icon: iconTextReplace,   createType: TEXT_REPLACE,   callback: e => actionManager.do(getCreateNodeAction(TEXT_REPLACE,   btnText.div, getCreateOptions(e)))}),
        new MenuItem('',           null,            false, {separator: true}),
        new MenuItem('Functions',  null,            false, {icon: iconTextFunctions, childMenu: menuTextFunctions}),
        new MenuItem('',           null,            false, {separator: true}),
        new MenuItem('Convert',    null,            false, {icon: iconConvert,      childMenu: menuConvertText})]);


    menuColorStyle = new Menu('Color style', true, false);
    menuColorStyle.addItems([
        new MenuItem('Link existing. . .', null, false, {icon: iconColorStyleReplace, createType: COLOR_STYLE, callback: e => actionManager.do(getCreateNodeAction(COLOR_STYLE,  btnColor.div, getCreateOptions(e, {existing: true})))})]);

        
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


    menuStroke = new Menu('Stroke', true, false);
    menuStroke.addItems([
        new MenuItem('Stroke sides', null, true, {icon: iconStrokeSides, createType: STROKE_SIDES, callback: e => actionManager.do(getCreateNodeAction(STROKE_SIDES, btnShape.div, getCreateOptions(e)))})]);


    menuValidColor = new Menu('Valid color', true, false);
    menuValidColor.addItems([
        menuItemCorrectColor = new MenuItem('Correct color', null, false, {icon: iconCorrectColor, callback: e => actionManager.do(getCreateNodeAction(CORRECT_COLOR,     btnColor.div, getCreateOptions(e)))})]);


    menuColor = new Menu('Colors', true, false);
    menuColor.addItems([
        menuItemColor           = new MenuItem('Color',            null,                false, {icon: iconColor,            childMenu: menuCreateColor,  callback: e => actionManager.do(getCreateNodeAction(COLOR, btnColor.div, getCreateOptions(e,  {random: e.altKey && !getCtrlKey(e)})))}),
                                  new MenuItem('',                 null,                false, {separator: true}),
        menuItemLayerFill       = new MenuItem('Fill',             null,                false, {icon: iconFill,             callback: e => actionManager.do(getCreateNodeAction(FILL,              btnColor.div, getCreateOptions(e)))}),
        menuItemLayerStroke     = new MenuItem('Stroke',           null,                false, {icon: iconStroke,           childMenu: menuStroke, callback: e => actionManager.do(getCreateNodeAction(STROKE,            btnColor.div, getCreateOptions(e)))}),
                                  new MenuItem('Color stop',       null,                false, {icon: iconColorStop,        callback: e => actionManager.do(getCreateNodeAction(COLOR_STOP,        btnColor.div, getCreateOptions(e)))}),
                                  new MenuItem('Gradient',         null,                false, {icon: iconGradient,         callback: e => actionManager.do(getCreateNodeAction(GRADIENT,          btnColor.div, getCreateOptions(e)))}),
        menuItemColorScheme     = new MenuItem('Scheme',           null,                false, {icon: iconColorScheme,      callback: e => actionManager.do(getCreateNodeAction(COLOR_SCHEME,      btnColor.div, getCreateOptions(e)))}),
        menuItemLayerSep1       = new MenuItem('',                 null,                false, {separator: true}),
        menuItemValidColor      = new MenuItem('Valid sRGB',       null,                false, {childMenu: menuValidColor, icon: iconValidColor,       callback: e => actionManager.do(getCreateNodeAction(VALID_COLOR,       btnColor.div, getCreateOptions(e)))}),
        menuItemColorblind      = new MenuItem('Colorblind',       null,                false, {icon: iconColorblind,       callback: e => actionManager.do(getCreateNodeAction(COLORBLIND,        btnColor.div, getCreateOptions(e)))}),
                                  new MenuItem('',                 null,                false, {separator: true}),
                                  new MenuItem('Web contrast',     null,                false, {icon: iconWebContrast,      callback: e => actionManager.do(getCreateNodeAction(COLOR_CONTRAST,    btnColor.div, getCreateOptions(e)))}),
        menuItemColorDifference = new MenuItem('Color difference', null,                false, {icon: iconColorDeltaE,      callback: e => actionManager.do(getCreateNodeAction(COLOR_DIFFERENCE,     btnColor.div, getCreateOptions(e)))}),
                                  new MenuItem('',                 null,                false, {separator: true}),
                                  new MenuItem('Interpolate',      'Interpolate color', true,  {icon: iconColorInterpolate, callback: e => actionManager.do(getCreateNodeAction(COLOR_INTERPOLATE, btnColor.div, getCreateOptions(e)))}),
        menuItemColorBlend      = new MenuItem('Blend',            null,                false, {icon: iconColorBlend,       callback: e => actionManager.do(getCreateNodeAction(COLOR_BLEND,       btnColor.div, getCreateOptions(e)))})]);

    menuColor.init = () => 
    {
        menuItemColor.setIcon(iconColor);
    };

    
    menuEffects = new Menu('Effects', true, false);
    menuEffects.addItems([
                                   new MenuItem('Layer blend',     null, false, {icon: iconColorBlend,  callback: e => actionManager.do(getCreateNodeAction(LAYER_BLEND, btnShape.div, getCreateOptions(e)))}),
                                   new MenuItem('',                null, false, {separator: true}),
        menuItemLayerDropShadow  = new MenuItem('Drop shadow',     null, false, {icon: iconDropShadow,  callback: e => actionManager.do(getCreateNodeAction(DROP_SHADOW,  btnShape.div, getCreateOptions(e)))}),
        menuItemLayerInnerShadow = new MenuItem('Inner shadow',    null, false, {icon: iconInnerShadow, callback: e => actionManager.do(getCreateNodeAction(INNER_SHADOW, btnShape.div, getCreateOptions(e)))}),
        menuItemLayerLayerBlur   = new MenuItem('Layer blur',      null, false, {icon: iconLayerBlur,   callback: e => actionManager.do(getCreateNodeAction(LAYER_BLUR,   btnShape.div, getCreateOptions(e)))}),
        menuItemLayerBackBlur    = new MenuItem('Background blur', null, false, {icon: iconBackBlur,    callback: e => actionManager.do(getCreateNodeAction(BACK_BLUR,    btnShape.div, getCreateOptions(e)))}),
                                   new MenuItem('',                null, false, {separator: true}),
                                   new MenuItem('Mask',            null, false, {icon: iconMask,        callback: e => actionManager.do(getCreateNodeAction(LAYER_MASK,  btnShape.div, getCreateOptions(e)))})]);

    
    menuStyles = new Menu('Styles', true, false);
    menuStyles.addItems([
        new MenuItem('Color style', null, true, {icon: iconColorStyle, createType: COLOR_STYLE, callback: e => actionManager.do(getCreateNodeAction(COLOR_STYLE, btnShape.div, getCreateOptions(e, {existing: true})))})]);
    
    
    // menuLayer = new Menu('Style', true, false);
    // menuLayer.addItems([
    //     new MenuItem('Apply style', null, false, {icon: iconApply, createType: SHAPE_APPLY, callback: e => actionManager.do(getCreateNodeAction(SHAPE_APPLY, btnLayer.div, getCreateOptions(e)))}),
    //     new MenuItem('',            null, false, {separator: true}),
    //     new MenuItem('Effects',     null, false, {icon: iconEffects, childMenu: menuEffects}),
    //     new MenuItem('Styles',      null, false, {icon: iconStyle, childMenu: menuStyles}),
    //     new MenuItem('',            null, false, {separator: true}),
    //     new MenuItem('Blend',       null, false, {icon: iconColorBlend,  callback: e => actionManager.do(getCreateNodeAction(LAYER_BLEND, btnLayer.div, getCreateOptions(e)))}),
    //     new MenuItem('',            null, false, {separator: true}),
    //     new MenuItem('Mask',        null, false, {icon: iconMask,        callback: e => actionManager.do(getCreateNodeAction(LAYER_MASK,  btnLayer.div, getCreateOptions(e)))})]);
    
    
    menuVectorShapes = new Menu('Vector shapes', true, false);
    menuVectorShapes.addItems([
        new MenuItem('Arc',             null, false, {icon: iconArcPath,       createType: ARC_PATH,              callback: e => actionManager.do(getCreateNodeAction(ARC_PATH,        btnShape.div, getCreateOptions(e)))}),
        new MenuItem('Arc from points', null, false, {icon: iconArcFromPoints, createType: ARC_FROM_POINTS,       callback: e => actionManager.do(getCreateNodeAction(ARC_FROM_POINTS, btnShape.div, getCreateOptions(e)))}),
        new MenuItem('Wave',            null, false, {icon: iconWavePath,      createType: WAVE_PATH,             callback: e => actionManager.do(getCreateNodeAction(WAVE_PATH,       btnShape.div, getCreateOptions(e)))})]);


    menuVectorPoints = new Menu('Vector points', true, false);
    menuVectorPoints.addItems([
                                     new MenuItem('Vector',                null,          false, {icon: iconVector,                      createType: VECTOR,         callback: e => actionManager.do(getCreateNodeAction(VECTOR,         btnShape.div, getCreateOptions(e)))}),
                                     new MenuItem('',                      null,          false, {separator: true}),
                                     new MenuItem('Interpolate points',    null,          false, {icon: iconInterpolatePoint,            createType: INTERPOLATE_POINT,     callback: e => actionManager.do(getCreateNodeAction(INTERPOLATE_POINT,     btnShape.div, getCreateOptions(e)))}),
                                     new MenuItem('Intersect lines',       null,          false, {icon: iconIntersectLines,              createType: INTERSECT_LINES,       callback: e => actionManager.do(getCreateNodeAction(INTERSECT_LINES,       btnShape.div, getCreateOptions(e)))}),
                                     new MenuItem('Circle center',         null,          false, {icon: iconCircleCenter,                createType: CIRCLE_CENTER,         callback: e => actionManager.do(getCreateNodeAction(CIRCLE_CENTER,         btnShape.div, getCreateOptions(e)))}),
        menuItemClosestPointOnPath = new MenuItem('Closest point on path', null,          false, {icon: iconClosestPointOnPath,          createType: CLOSEST_POINT_ON_PATH, callback: e => actionManager.do(getCreateNodeAction(CLOSEST_POINT_ON_PATH, btnShape.div, getCreateOptions(e)))}),
        menuItemPointAlongPath     = new MenuItem('Point along path',      null,          false, {icon: iconPointAlongPath,              createType: POINT_ALONG_PATH,      callback: e => actionManager.do(getCreateNodeAction(POINT_ALONG_PATH,      btnShape.div, getCreateOptions(e)))}),
                                     new MenuItem('',                      null,          false, {separator: true}),       
                                     new MenuItem('Measure vector',        null,          false, {icon: iconMeasureVector,               createType: MEASURE_VECTOR,        callback: e => actionManager.do(getCreateNodeAction(MEASURE_VECTOR,        btnShape.div, getCreateOptions(e)))}),
                                     new MenuItem('Measure point angle',   null,          false, {icon: iconPointAngle,                  createType: POINT_ANGLE,           callback: e => actionManager.do(getCreateNodeAction(POINT_ANGLE,           btnShape.div, getCreateOptions(e)))}),
                                     new MenuItem('',                      null,          false, {separator: true}),       
                                     new MenuItem('Corner',               'Point corner', false, {icon: iconPointCorner, createType: POINT_CORNER,      callback: e => actionManager.do(getCreateNodeAction(POINT_CORNER, btnShape.div, getCreateOptions(e)))})]);
                             

    menuVectorPaths = new Menu('Vector paths', true, false);
    menuVectorPaths.addItems([
        new MenuItem('Join paths',      null, false, {icon: iconJoinPaths,                   createType: JOIN_PATHS,            callback: e => actionManager.do(getCreateNodeAction(JOIN_PATHS,            btnShape.div, getCreateOptions(e)))}),
        new MenuItem('Reorient paths',  null, false, {icon: iconReorientPaths,               createType: REORIENT_PATHS,        callback: e => actionManager.do(getCreateNodeAction(REORIENT_PATHS,        btnShape.div, getCreateOptions(e)))}),
        new MenuItem('Reverse path',    null, false, {icon: iconReversePath,                 createType: REVERSE_PATH,          callback: e => actionManager.do(getCreateNodeAction(REVERSE_PATH,          btnShape.div, getCreateOptions(e)))}),
        new MenuItem('',                null, false, {separator: true}),           
        new MenuItem('Arc',             null, false, {icon: iconArcPath,       createType: ARC_PATH,              callback: e => actionManager.do(getCreateNodeAction(ARC_PATH,        btnShape.div, getCreateOptions(e)))}),
        new MenuItem('Arc from points', null, false, {icon: iconArcFromPoints, createType: ARC_FROM_POINTS,       callback: e => actionManager.do(getCreateNodeAction(ARC_FROM_POINTS, btnShape.div, getCreateOptions(e)))}),
        new MenuItem('Wave',            null, false, {icon: iconWavePath,      createType: WAVE_PATH,             callback: e => actionManager.do(getCreateNodeAction(WAVE_PATH,       btnShape.div, getCreateOptions(e)))}),
        new MenuItem('',                null, false, {separator: true}),
        new MenuItem('Path length',     null, false, {icon: iconPathLength,                  createType: PATH_LENGTH,           callback: e => actionManager.do(getCreateNodeAction(PATH_LENGTH,           btnShape.div, getCreateOptions(e)))})]);
                             

    menuVectorNetworks = new Menu('Vector networks', true, false);
    menuVectorNetworks.addItems([
        menuItemVectorVertex       = new MenuItem('Vertex',    null,          false, {icon: iconVectorVertex,                createType: VECTOR_VERTEX,  callback: e => actionManager.do(getCreateNodeAction(VECTOR_VERTEX,  btnShape.div, getCreateOptions(e)))}),
        menuItemVectorEdge         = new MenuItem('Edge',      null,          false, {icon: iconVectorEdge,                  createType: VECTOR_EDGE,    callback: e => actionManager.do(getCreateNodeAction(VECTOR_EDGE,    btnShape.div, getCreateOptions(e)))}),
        menuItemVectorRegion       = new MenuItem('Region',    null,          false, {icon: iconVectorRegion,                createType: VECTOR_REGION,  callback: e => actionManager.do(getCreateNodeAction(VECTOR_REGION,  btnShape.div, getCreateOptions(e)))})]);
                             

    menuRectangle = new Menu('Rectangle', true, false);
    menuRectangle.addItems([
        // new MenuItem('Extents',        null, true,  {icon: iconRectangleExt, createType: RECTANGLE_EXT, callback: e => actionManager.do(getCreateNodeAction(RECTANGLE_EXT, btnShape.div, getCreateOptions(e)))}),
        // new MenuItem('',               null, false, {separator: true}),
        new MenuItem('Round corners',  null, true,  {icon: iconRoundCorners, createType: ROUND_CORNERS, callback: e => actionManager.do(getCreateNodeAction(ROUND_CORNERS, btnShape.div, getCreateOptions(e)))})]);


    menuShapes = new Menu('Shapes', true, false);
    menuShapes.addItems([
        new MenuItem('Rectangle', null,         false, {icon: iconRectangle,  childMenu: menuRectangle, createType: RECTANGLE,  callback: e => actionManager.do(getCreateNodeAction(RECTANGLE, btnShape.div, getCreateOptions(e)))}),
        new MenuItem('Trapeze',   null,         false, {icon: iconTrapeze,    createType: TRAPEZE,    callback: e => actionManager.do(getCreateNodeAction(TRAPEZE,    btnShape.div, getCreateOptions(e)))}),
        new MenuItem('Line',      null,         false, {icon: iconLine,       createType: LINE,       callback: e => actionManager.do(getCreateNodeAction(LINE,       btnShape.div, getCreateOptions(e)))}),
        new MenuItem('Ellipse',   null,         false, {icon: iconEllipse,    createType: ELLIPSE,    callback: e => actionManager.do(getCreateNodeAction(ELLIPSE,    btnShape.div, getCreateOptions(e)))}),
        new MenuItem('Polygon',   null,         false, {icon: iconPolygon,    createType: POLYGON,    callback: e => actionManager.do(getCreateNodeAction(POLYGON,    btnShape.div, getCreateOptions(e)))}),
        new MenuItem('Star',      null,         false, {icon: iconStar,       createType: STAR,       callback: e => actionManager.do(getCreateNodeAction(STAR,       btnShape.div, getCreateOptions(e)))}),
        new MenuItem('Text',      'Text shape', true,  {icon: iconTextShape,  createType: TEXT_SHAPE, callback: e => actionManager.do(getCreateNodeAction(TEXT_SHAPE, btnShape.div, getCreateOptions(e)))})]);


    menuTransform = new Menu('Transform', true, false);
    menuTransform.addItems([
        new MenuItem('Move',            null, false, {icon: iconMove,       createType: MOVE,        callback: e => actionManager.do(getCreateNodeAction(MOVE,        btnShape.div, getCreateOptions(e)))}),
        new MenuItem('Rotate',          null, false, {icon: iconRotate,     createType: ROTATE,      callback: e => actionManager.do(getCreateNodeAction(ROTATE,      btnShape.div, getCreateOptions(e)))}),
        new MenuItem('Scale',           null, false, {icon: iconScale,      createType: SCALE,       callback: e => actionManager.do(getCreateNodeAction(SCALE,       btnShape.div, getCreateOptions(e)))}),
        new MenuItem('Skew',            null, false, {icon: iconSkew,       createType: SKEW,        callback: e => actionManager.do(getCreateNodeAction(SKEW,        btnShape.div, getCreateOptions(e)))}),
        new MenuItem('',                null, false, {separator: true}),
        new MenuItem('Place',           null, false, {icon: iconPlace,      createType: PLACE,       callback: e => actionManager.do(getCreateNodeAction(PLACE,       btnShape.div, getCreateOptions(e)))}),
        new MenuItem('',                null, false, {separator: true}),
        new MenuItem('Set center',      null, false, {icon: iconCenter,     createType: SET_CENTER,  callback: e => actionManager.do(getCreateNodeAction(SET_CENTER,  btnShape.div, getCreateOptions(e)))}),
        new MenuItem('Show center',     null, false, {icon: iconShowCenter, createType: SHOW_CENTER, callback: e => actionManager.do(getCreateNodeAction(SHOW_CENTER, btnShape.div, getCreateOptions(e)))}),
        new MenuItem('',                null, false, {separator: true}),
        new MenuItem('Reset transform', null, false, {icon: iconResetXform, createType: RESET_XFORM, callback: e => actionManager.do(getCreateNodeAction(RESET_XFORM, btnShape.div, getCreateOptions(e)))})]);


    menuShape = new Menu('Shapes', true, false);
    menuShape.addItems([
                                  new MenuItem('Point',       null,          false, {childMenu: menuVectorPoints,   icon: iconPoint,         createType: POINT,          callback: e => actionManager.do(getCreateNodeAction(POINT,          btnShape.div, getCreateOptions(e)))}),
                                  new MenuItem('Path',        'Vector path', true,  {childMenu: menuVectorPaths,    icon: iconVectorPath,    createType: VECTOR_PATH,    callback: e => actionManager.do(getCreateNodeAction(VECTOR_PATH,    btnShape.div, getCreateOptions(e)))}),
        menuItemVectorNetwork   = new MenuItem('Network',     null,          false, {childMenu: menuVectorNetworks, icon: iconVectorNetwork, createType: VECTOR_NETWORK, callback: e => actionManager.do(getCreateNodeAction(VECTOR_NETWORK, btnShape.div, getCreateOptions(e)))}),
                                  new MenuItem('Shapes',      null,          false, {icon: iconShapes,        childMenu: menuShapes}),
        menuItemBooleanSep      = new MenuItem('',            null,          false, {separator: true}),
        menuItemBooleanShape    = new MenuItem('Boolean',     null,          false, {icon: iconBoolUnion,  createType: SHAPE_BOOLEAN, callback: e => actionManager.do(getCreateNodeAction(SHAPE_BOOLEAN, btnShape.div, getCreateOptions(e)))}),
        // menuItemShapeSelected = new MenuItem('Selected objects...', null, {icon: iconSelected,   enabled: false}),
                                  new MenuItem('',            null,          false, {separator: true}),
                                  new MenuItem('Group',       null,          false, {icon: iconShapeGroup, createType: SHAPE_GROUP,   callback: e => actionManager.do(getCreateNodeAction(SHAPE_GROUP,   btnShape.div, getCreateOptions(e)))}),
                                  new MenuItem('Frame',       null,          false, {icon: iconFrame,      createType: FRAME,         callback: e => actionManager.do(getCreateNodeAction(FRAME,         btnShape.div, getCreateOptions(e)))}),
        menuItemShapeSep1       = new MenuItem('',            null,          false, {separator: true}),
                                  new MenuItem('Transform',   null,          false, {icon: iconMove, childMenu: menuTransform}),
                                  new MenuItem('',            null,          false, {separator: true}),
                                  new MenuItem('Apply style', null,          false, {icon: iconApply, createType: SHAPE_APPLY, callback: e => actionManager.do(getCreateNodeAction(SHAPE_APPLY, btnShape.div, getCreateOptions(e)))}),
                                  new MenuItem('',            null,          false, {separator: true}),
                                  new MenuItem('Effects',     null,          false, {icon: iconEffects, childMenu: menuEffects}),
                                  new MenuItem('Styles',      null,          false, {icon: iconStyle, childMenu: menuStyles})]);
     //                           new MenuItem('',            null,          false, {separator: true}),
     // menuItemShapeExport     = new MenuItem('Export',      null,          false, {icon: iconExport,     createType: EXPORT, callback: e => actionManager.do(getCreateNodeAction(EXPORT, btnShape.div, getCreateOptions(e)))})]);


    menuTemplate = new Menu('Templates', true, false);
    menuTemplate.minWidth = 230;
    menuTemplate.init     = initTemplateMenu;


    menuGroup = new Menu('Groups', true, false);
    menuGroup.addItems([
        new MenuItem('Group',     null, false, {icon: iconGroupNode,  createType: GROUP_NODE, callback: e => actionManager.do(getCreateNodeAction(GROUP_NODE,  btnGroup.div, getCreateOptions(e)))}),
        new MenuItem('Parameter', null, false, {icon: iconGroupParam, createType: GROUP_PARAM, callback: e => actionManager.do(getCreateNodeAction(GROUP_PARAM, btnGroup.div, getCreateOptions(e)))})]);
    

    menuDecoration = new Menu('Decoration', true, false);
    menuDecoration.addItems([
        new MenuItem('Panel',   null, false, {icon: iconPanel,        createType: PANEL,         callback: e => actionManager.do(getCreateNodeAction(PANEL,         btnDecoration.div, getCreateOptions(e)))}),
        new MenuItem('',        null, false, {separator: true}),
        new MenuItem('Comment', null, false, {icon: iconTextComment,  createType: COMMENT,       callback: e => actionManager.do(getCreateNodeAction(COMMENT,       btnDecoration.div, getCreateOptions(e)))})]);
      //new MenuItem('Arrow',   null, false, {icon: iconCommentArrow, createType: COMMENT_ARROW, callback: e => actionManager.do(getCreateNodeAction(COMMENT_ARROW, btnDecoration.div, getCreateOptions(e)))})]);


    menuWindow = new Menu('Window options', true, false);
    menuWindow.showOnLeft = true;
    menuWindow.addItems([
        menuItemWindowNormal   = new MenuItem('Normal',   null, false, {icon: iconWindowNormal,     shortcut: osAlt() + '0', callback: () => dockWindowNormal  ()}),
        menuItemWindowMaximize = new MenuItem('Maximize', null, false, {icon: iconWindowMaximize,   shortcut: osAlt() + '8', callback: () => dockWindowMaximize()}),
        menuItemWindowTop      = new MenuItem('Top',      null, false, {icon: iconWindowDockTop,    shortcut: osAlt() + '5', callback: () => dockWindowTop     ()}),
        menuItemWindowLeft     = new MenuItem('Left',     null, false, {icon: iconWindowDockLeft,   shortcut: osAlt() + '1', callback: () => dockWindowLeft    ()}),
        menuItemWindowRight    = new MenuItem('Right',    null, false, {icon: iconWindowDockRight,  shortcut: osAlt() + '3', callback: () => dockWindowRight   ()}),
        menuItemWindowBottom   = new MenuItem('Bottom',   null, false, {icon: iconWindowDockBottom, shortcut: osAlt() + '2', callback: () => dockWindowTop     ()})]);


    menuPage = new Menu('Page menu', false, false);
    menuPage.addItems([
        new MenuItem('Duplicate', null, false, {enabled: false, callback: () => {}}),
        new MenuItem('Rename',    null, false, {enabled: false, callback: () => {}})]);

        
    menuZoom = new Menu('Zoom/view options');
    menuZoom.combineChecksAndIcons = true;
    menuZoom.addItems([
                            new MenuItem('Zoom in',      null, false, {shortcut: osCtrl () + '+', callback: () => { graph.currentPage.zoom *= Math.pow(2, 1/2); graph.updateSavedPages(); }}),
                            new MenuItem('Zoom out',     null, false, {shortcut: osCtrl () + '-', callback: () => { graph.currentPage.zoom /= Math.pow(2, 1/2); graph.updateSavedPages(); }}),
                            new MenuItem('Zoom to fit',  null, false, {shortcut: osShift() + '1', callback: () => { graphView.zoomToFit(); graph.updateSavedPages(); }}),
        menuItemZoomTo100 = new MenuItem('Zoom to 100%', null, false, {shortcut: osCtrl () + '0', callback: () => { graph.currentPage.zoom = 1; graph.updateSavedPages(); }})]);//,
                        //  new MenuItem('',             null, false, {separator: true}),
                        //  new MenuItem('Window',       null, false, {childMenu: menuWindow})]);

        
    wholeMenu = new Menu('Create node. . .', true, false);
    wholeMenu.addItems([
        new MenuItem('Flow',      null, false, {icon: iconFlow,     childMenu: menuFlow  }),
        new MenuItem('Data',      null, false, {icon: iconCombine,  childMenu: menuData  }),
        new MenuItem('Sets. . .', null, false, {icon: iconSets,     childMenu: menuSets  }),
        new MenuItem('Number',    null, false, {icon: iconNumber,   childMenu: menuNumber}),
        new MenuItem('Text',      null, false, {icon: iconText,     childMenu: menuString}),
        new MenuItem('Color',     null, false, {icon: iconVarColor, childMenu: menuColor }),
        new MenuItem('Layer',     null, false, {icon: iconEffects,  childMenu: menuLayer }),
        new MenuItem('Shape',     null, false, {icon: iconShapes,   childMenu: menuShape }),
        new MenuItem('Panel',     null, false, {icon: iconPanel,    createType: PANEL, callback: e => actionManager.do(getCreateNodeAction(PANEL, btnDecoration.div, getCreateOptions(e)))})]);

                                      
    menuGraph = new Menu('Graph menu', false, false);
    menuGraph.addItems([
        menuItemGraphPaste          = new MenuItem('Paste here',           null, false, {shortcut: osCtrl()      + 'V', callback: e => { hideAllMenus(); graphView.pasteCopiedNodes(false, e.clientX, e.clientY - getTopHeight()); }}),
        menuItemGraphPasteConnected = new MenuItem('Paste connected',      null, false, {shortcut: osCtrlShift() + 'V', callback: e => { hideAllMenus(); graphView.pasteCopiedNodes(true,  e.clientX, e.clientY - getTopHeight()); }}),
                                      new MenuItem('',                     null, false, {separator: true}),
        menuItemGraphDeactivateAll  = new MenuItem('Deactivate all nodes', null, false, {shortcut: osAlt() + 'D', callback: () => actionManager.do(new MakeActiveNodesAction([], false, true))}),
                                      new MenuItem('',                     null, false, {separator: true}),
                                      new MenuItem('Create node. . .',     null, false, {childMenu: wholeMenu}),
                                      new MenuItem('',                     null, false, {separator: true}),
                                      new MenuItem('Quick actions. . .',   null, false, {shortcut: osCtrl() + '/',      callback: () => showSearchBox() })]);

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
        new MenuItem('Select left',   null, false, {callback: () => graphView.selectedNodes = [graphView.selectedNodes[0], ...getNodesBeforeNode(graphView.selectedNodes[0])] }),
        new MenuItem('Select right',  null, false, {callback: () => graphView.selectedNodes = [graphView.selectedNodes[0], ...getNodesAfterNode (graphView.selectedNodes[0])] }),
        new MenuItem('Select across', null, false, {callback: () => graphView.selectedNodes = [graphView.selectedNodes[0], ...getNodesAcrossNode(graphView.selectedNodes[0])] }),
        new MenuItem('Select tree',   null, false, {callback: () => graphView.selectedNodes =                                 getAllNodesFromNode(graphView.selectedNodes[0]) })]);

        
    menuNodeCopyAs = new Menu('Copy nodes menu', false, false);
    menuNodeCopyAs.addItems([
        //menuItemNodeCopyAsJsCode       = new MenuItem('Copy as JS code',  null, false, {shortcut:  osCtrlShift() + 'C',            callback: () => graphView.copySelectedNodesAsJsCode()     }),
        menuItemNodeCopyAsJsFunction   = new MenuItem('Copy as Javascript', null, false, {shortcut:  osCtrlShift() /*+ osAlt()*/ + 'C',  callback: () => graphView.copySelectedNodesAsJavascript() })]);

            
    menuNodeRandomize = new Menu('Randomize nodes', false, false);
    menuNodeRandomize.addItems([
        menuItemNodeRandomizeSeeds   = new MenuItem('Seed',   null, false, {callback: e => { hideAllMenus(); graphView.randomizeSelectedSeeds();   }}),
        menuItemNodeRandomizeColors  = new MenuItem('Color',  null, false, {callback: e => { hideAllMenus(); graphView.randomizeSelectedColors();  }}),
        menuItemNodeRandomizeNumbers = new MenuItem('Number', null, false, {callback: e => { hideAllMenus(); graphView.randomizeSelectedNumbers(); }})]);


    menuNode = new Menu('Node menu', false, false);
    menuNode.addItems([
        //menuItemNodeEditGroup      = new MenuItem('Edit group...',       null, false, {callback: e => { hideAllMenus(); editSelectedGroup(); }}),
        //menuItemNodeSep1           = new MenuItem('',                    null, false, {separator: true}),
        menuItemNodeCopy             = new MenuItem('Copy',                null, false, {shortcut:  osCtrl() + 'C',       callback: () => graphView.copySelectedNodes() }),
        menuItemNodePaste            = new MenuItem('Paste here',          null, false, {shortcut:  osCtrl() + 'V',       callback: e => { hideAllMenus(); graphView.pasteCopiedNodes(false); }}),
        menuItemNodePasteConnected   = new MenuItem('Paste connected',     null, false, {shortcut:  osCtrlShift() + 'D',  callback: e => { hideAllMenus(); graphView.pasteCopiedNodes(true ); }}),
        //                             new MenuItem('Copy/Paste as',       null, false, {childMenu: menuNodeCopyAs}),
        menuItemNodeLayoutSep        = new MenuItem('',                    null, false, {separator: true}),
        menuItemNodeLayout           = new MenuItem('Layout',              null, false, {shortcut: osCtrlShift() + 'L', callback: e => { hideAllMenus(); layoutSelectedNodes(); }}),
        // menuItemNodeSepGroup      = new MenuItem('',                    null, false, {separator: true}),
        //menuItemNodeGroupSelected  = new MenuItem('Group selected',      null, false, {shortcut:  osCtrl() + 'G',       callback: e => { hideAllMenus(); actionManager.do(new   GroupNodesAction(graphView.selectedNodes)); }}),
        //menuItemNodeUngroup        = new MenuItem('Ungroup',             null, false, {                                 callback: e => { hideAllMenus(); actionManager.do(new UngroupNodesAction(graphView.selectedNodes)); }}),
        menuItemNodeSep3             = new MenuItem('',                    null, false, {separator: true}),
        menuItemNodeActivate         = new MenuItem('Activate/Deactivate', null, false, {shortcut:  osAlt()     + 'A',  callback: () => makeSelectedNodesActive(false)}),
        menuItemNodeEnableDisable    = new MenuItem('Enable/Disable',      null, false, {shortcut:  osCtrlShift() + 'E',  callback: () => actionManager.do(new ToggleDisableNodesAction(graphView.selectedNodes.map(n => n.id)))}),
        //menuItemNodeSep2             = new MenuItem('',                    null, false, {separator: true}),
        menuItemNodeRename           = new MenuItem('Rename',              null, false, {shortcut:  osCtrl() + 'R',       callback: e => { hideAllMenus(); graphView.renameSelectedNode(); }}),
        menuItemNodeHighlight        = new MenuItem('Highlight',           null, false, {childMenu: menuNodeHighlight}),
        menuItemNodeSelect           = new MenuItem('Select',              null, false, {childMenu: menuNodeSelect}),
      //menuItemNodeEdit             = new MenuItem('Edit . . .',          null, false, {callback: e => { hideAllMenus(); graphView.editSelectedCustomNode(); }}),
      //                               new MenuItem('',                    null, false, {separator: true}),
      //menuItemNodeSaveAsTemplate   = new MenuItem('Save as template',    null, false, {callback: e => { hideAllMenus(); showSaveAsTemplateDialog(); }}),
      //                               new MenuItem('',                    null, false, {separator: true}),
        menuItemNodeSepRnd           = new MenuItem('',                    null, false, {separator: true}),
        menuItemNodeConnectSeeds     = new MenuItem('Connect seeds',       null, false, {shortcut:  osShift() + 'C', callback: e => { hideAllMenus(); graphView.connectSelectedSeeds(); }}),
        menuItemNodeRandomizeNodes   = new MenuItem('Randomize',           null, false, {childMenu: menuNodeRandomize, shortcut: osShift() + 'R           ', icon: iconProbability, callback: e => { hideAllMenus(); graphView.randomizeSelectedNodes(); }}),
        menuItemNodeSepRem           = new MenuItem('',                    null, false, {separator: true}),
        menuItemNodeRemove           = new MenuItem('Remove',              null, false, {shortcut:  osCtrl() + '⌫',      callback: e => { hideAllMenus(); graphView.removeSelectedNodes(true); }}),
        menuItemNodeNotConditionSep  = new MenuItem('',                    null, false, {separator: true}),
        menuItemNodeNotCondition     = new MenuItem('Not condition',       null, false, {checkCallback: () => graphView.selectedNodes.some(n => n.notCondition), callback: () => toggleSelectedNodesNotCondition()}),
                                       new MenuItem('',                    null, false, {separator: true}),
                                       new MenuItem('Create node. . .',    null, false, {childMenu: wholeMenu})]);



    menuNode.init = () => 
    {
        const single      =  graphView.selectedNodes.length == 1;
        const canDisable  = !graphView.selectedNodes.find(n => !n.canDisable);
        const canRename   = !graphView.selectedNodes.find(n => !n.canRename);
        const isCondition =  graphView.selectedNodes.some(n => n.hasConditionOutputs());
        const someActive  =  graphView.selectedNodes.some (n => n.active);
        const allActive   =  graphView.selectedNodes.every(n => n.active);


        const selectedRandom =
            graphView.selectedNodes.filter(n => 
                   n.type == NUMBER_RANDOM
                || n.type == NUMBER_NOISE
                || n.type == PROBABILITY);
        

        const canRandomizeSeeds = selectedRandom.length > 0;
        const canConnectSeeds   = 
               selectedRandom.length > 0
            && graphView.selectedNodes.filter(n => n.type == ITEMS).length == 1;


        const selectedColors      = graphView.selectedNodes.filter(n => n.type == COLOR);
        const canRandomizeColors  = selectedColors.length > 0;
        
        const selectedNumbers     = graphView.selectedNodes.filter(n => n.type == NUMBER || n.type == BOUNDED_NUMBER);
        const canRandomizeNumbers = selectedNumbers.length > 0;

        
        menuItemNodeConnectSeeds    .setName('Connect seed' + (selectedRandom .length == 1 ? '' : 's'));
        menuItemNodeRandomizeSeeds  .setName('Seed'         + (selectedRandom .length == 1 ? '' : 's'));
        menuItemNodeRandomizeColors .setName('Color'        + (selectedColors .length == 1 ? '' : 's'));
        menuItemNodeRandomizeNumbers.setName('Number'       + (selectedNumbers.length == 1 ? '' : 's'));


        menuNode.showChecks = isCondition;

        //updateElementDisplay(menuItemNodeEditGroup     .div, hasGroups && single);
        //updateElementDisplay(menuItemNodeSepGroup      .div, hasGroups && single);
        //updateElementDisplay(menuItemNodeUngroup       .div, hasGroups);
        //updateElementDisplay(menuItemNodeSep2          .div, single);
        updateElementDisplay(menuItemNodeRename          .div, single && canRename);
        updateElementDisplay(menuItemNodeLayoutSep       .div, !single);
        updateElementDisplay(menuItemNodeLayout          .div, !single);
        //updateElementDisplay(menuItemNodeEdit          .div, single);
        //updateElementDisplay(menuItemNodeSep2          .div, single);
        updateElementDisplay(menuItemNodeSelect          .div, single);
        //updateElementDisplay(menuItemNodeActivate      .div, true);
        updateElementDisplay(menuItemNodeEnableDisable   .div, canDisable);
        updateElementDisplay(menuItemNodeNotConditionSep .div, isCondition);
        updateElementDisplay(menuItemNodeNotCondition    .div, isCondition);

        updateElementDisplay(menuItemNodeSepRnd          .div, canConnectSeeds || canRandomizeSeeds || canRandomizeColors || canRandomizeNumbers);
        updateElementDisplay(menuItemNodeConnectSeeds    .div, canConnectSeeds);
        updateElementDisplay(menuItemNodeRandomizeNodes  .div, canRandomizeSeeds || canRandomizeColors || canRandomizeNumbers);
        updateElementDisplay(menuItemNodeRandomizeSeeds  .div, canRandomizeSeeds);
        updateElementDisplay(menuItemNodeRandomizeColors .div, canRandomizeColors);
        updateElementDisplay(menuItemNodeRandomizeNumbers.div, canRandomizeNumbers);
        
        // updateElementDisplay(menuItemNodeSepRem          .div, canDisable || canConnectSeeds || canRandomizeSeeds || canRandomizeColors || canRandomizeNumbers);

        const showRandomizeMenu =
               canRandomizeSeeds  && canRandomizeColors
            || canRandomizeSeeds  && canRandomizeNumbers
            || canRandomizeColors && canRandomizeNumbers;

        //updateElementDisplay(menuItemNodeRandomizeNodes.div, showRandomizeMenu);
        
        menuItemNodeRandomizeNodes.childMenu                  = showRandomizeMenu ? menuNodeRandomize : null;
        menuItemNodeRandomizeNodes.divExpand.style.visibility = showRandomizeMenu ? 'visible' : 'hidden';

        menuItemNodeRandomizeNodes.divShortcut.innerHTML      = osShift() + 'R' + (showRandomizeMenu ? '           ' : '');
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
    menuOptionParam    = new Menu('Select options',  false, true);

    
    btnMain     = new MenuButton('', menuMain,     {useMenuName: true, highlight: () => currentMenus.includes(menuMain  ), callback: () => updatePanMode(false)});
    btnFlow     = new MenuButton('', menuFlow,     {useMenuName: true, highlight: () => currentMenus.includes(menuFlow  ), callback: () => updatePanMode(false)});
    btnData     = new MenuButton('', menuData,     {useMenuName: true, highlight: () => currentMenus.includes(menuData  ), callback: () => updatePanMode(false)});
    btnSets     = new MenuButton('', menuSets,     {useMenuName: true, highlight: () => currentMenus.includes(menuSets  ), callback: () => updatePanMode(false)});
    btnShape    = new MenuButton('', menuShape,    {useMenuName: true, highlight: () => currentMenus.includes(menuShape ), callback: () => updatePanMode(false)});
    btnColor    = new MenuButton('', menuColor,    {useMenuName: true, highlight: () => currentMenus.includes(menuColor ), callback: () => updatePanMode(false)});
    //btnLayer    = new MenuButton('', menuLayer,    {useMenuName: true, highlight: () => currentMenus.includes(menuLayer ), callback: () => updatePanMode(false)});
    btnNumber   = new MenuButton('', menuNumber,   {useMenuName: true, highlight: () => currentMenus.includes(menuNumber), callback: () => updatePanMode(false)});
    btnText     = new MenuButton('', menuString,   {useMenuName: true, highlight: () => currentMenus.includes(menuString), callback: () => updatePanMode(false)});
    btnTemplate = new MenuButton('', menuTemplate, {useMenuName: true, highlight: () => currentMenus.includes(menuTemplate ), callback: () => updatePanMode(false)});
  //btnStyle    = new MenuButton('', menuStyle,    {useMenuName: true, highlight: () => currentMenus.includes(menuStyle ), callback: () => updatePanMode(false)});
  //btnGroup    = new MenuButton('', menuGroup,    {useMenuName: true, highlight: () => currentMenus.includes(menuGroup ), callback: () => updatePanMode(false)});
    
    // btnGroup  = new MenuButton('Node groups', null, {callback: () => 
    // {
    //     const create = new CreateNodeAction(OUP, btnGroup.div);
    //     actionManager.do(create);

    //     graphView.updateNodes([create.node]);
    //     graphView.updateScrollWithBounds();

    //     updatePanMode(false);
    // }});


    btnPanel = new MenuButton('Panel', null, {callback: () => 
    {
        const create = new CreateNodeAction(PANEL, btnPanel.div);
        actionManager.do(create);

        graphView.updateNodes([create.node]);
        graphView.updateScrollWithBounds();

        hideAllMenus();
        updatePanMode(false);
    }});
    
    btnDecoration = new MenuButton('Decoration', menuDecoration, {useMenuName: true, highlight: () => currentMenus.includes(menuDecoration), callback: () => updatePanMode(false)});

    
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


    btnFlow      .setIcon(iconFlow);
    btnData      .setIcon(iconData);
    btnSets      .setIcon(iconSets);
    btnMain      .setIcon(iconGenerator);
    btnColor     .setIcon(iconVarColor);
    //btnLayer   .setIcon(iconEffects);
    btnShape     .setIcon(iconShapes);
    btnHand      .setIcon(iconHand);
    //btnComment .setIcon(iconComment);
    btnTemplate  .setIcon(iconTemplate);
    btnPanel     .setIcon(iconPanel);
    btnDecoration.setIcon(iconPanel);
    btnSolo      .setIcon(iconSolo);


    menuBarMenus = 
    [
        menuRepeat,
        menuSelectFromList,
        menuFlow,
        menuData,
        menuList,
        menuItems,
        //menuVariables,
        menuParams,
        menuNames,
        menuSets,
        menuNumber,
        menuNumberBase,
        menuFunctions,
        menuMath,
        menuMinMax,
        menuTrig,
        menuConvertNumber,
        menuConvertText,
        menuAddText,
        menuString,
        menuTextFunctions,
        menuComplexData,
        menuColor,
        menuLayer,
        menuEffects,
        menuStyles,
        menuShape,
        menuShapes,
        menuStroke,
        menuValidColor,
        menuRectangle,
        menuVectorPoints,
        menuVectorPaths,
        menuVectorNetworks,
        menuTransform,
        menuDecoration
    ];
}



function createObjectCountInfo()
{
    objectCountWrapper  = createDiv('', 'objectCountWrapper' );
    objectCountInfo     = createDiv('', 'objectCountInfo'    );
    objectCountProgress = createDiv('', 'objectCountProgress');
    objectCountNumber   = createDiv('', 'objectCountNumber'  );

    objectCountNumber.innerHTML = '0';
    
    objectCountInfo.appendChild(objectCountProgress);
    objectCountInfo.appendChild(objectCountNumber);
 
    objectCountWrapper.appendChild(objectCountInfo);
    menuBar.appendChild(objectCountWrapper);

    createTooltip(ttObjectCount);
    createTooltipSrc(objectCountWrapper, objectCountWrapper, () => ttObjectCount);
}



function initPreferenceMenus()
{
    menuMainPreferences = new Menu('Preferences', false);
    menuMainPreferences.addItems([
     // menuItemShowPages                  = new MenuItem('Show pages',                               null, false, {checkCallback: () => settings.showAllColorSpaces,                        callback: () => { updateSettingAndMenu('showPages',                  true, !settings.showPages);                  updateMenuItemShowPages();                  }}),
     // menuPrefSep1                       = new MenuItem('',                                         null, false, {separator: true}),    
     // menuItemShowSnapshots              = new MenuItem('Show snapshots',                           null, false, {checkCallback: () => settings.showSnapshots,                             callback: () => { updateSettingAndMenu('showSnapshots',              true, !settings.showSnapshots);              updateMenuItemShowSnapshots();              }}),
     //                                      new MenuItem('',                                         null, false, {separator: true}),    
     // menuItemShowAllColorSpaces         = new MenuItem('Show advanced color spaces',               null, false, {checkCallback: () => settings.showAllColorSpaces,                        callback: () => { updateSettingAndMenu('showAllColorSpaces',         true, !settings.showAllColorSpaces);         updateMenuItemShowAllColorSpaces();         }}),
        menuItemShowBoolValues             = new MenuItem('Show boolean values as   ✓ ✗',            null, false, {checkCallback: () => settings.showBoolValues,                            callback: () => { updateSettingAndMenu('showBoolValues',             true, !settings.showBoolValues);             updateMenuItemShowBoolValues();             }}),
        menuItemSeparateThousands          = new MenuItem('Separate thousands in numbers',            null, false, {checkCallback: () => settings.separateThousands,                         callback: () => { updateSettingAndMenu('separateThousands',          true, !settings.separateThousands);          updateMenuItemSeparateThousands();          }}),
        menuItemShowNodeIcons              = new MenuItem('Show node icons',                          null, false, {checkCallback: () => settings.showNodeIcons,                             callback: () => { updateSettingAndMenu('showNodeIcons',              true, !settings.showNodeIcons);              updateMenuItemShowNodeIcons();              }}),
        menuItemAllowInvertParams          = new MenuItem('Allow inverting of parameters',            null, false, {checkCallback: () => settings.allowInvertParams,                         callback: () => { updateSettingAndMenu('allowInvertParams',          true, !settings.allowInvertParams);          updateMenuItemAllowInvertParams();          }}),
        menuItemActivateDeactiatesOthers   = new MenuItem('Activate deactivates others',              null, false, {checkCallback: () => settings.activateDeactiatesOthers,                  callback: () => { updateSettingAndMenu('activateDeactiatesOthers',   true, !settings.activateDeactiatesOthers);                                               }}),
        menuItemPreferHtmlColorNames       = new MenuItem('Prefer HTML color names',                  null, false, {checkCallback: () => settings.preferHtmlColorNames,                      callback: () => { updateSettingAndMenu('preferHtmlColorNames',       true, !settings.preferHtmlColorNames);                                                   }}),
                                             new MenuItem( osShift(true) + 'R randomizes mixed nodes. . .', null, false, {childMenu: menuShiftR}),
        //menuItemShowColorLegendInMenus   = new MenuItem('Show color legend in menus',               null, false, {checkCallback: () => settings.showColorLegendInMenus,                    callback: () => { updateSettingAndMenu('showColorLegendInMenus',     true, !settings.showColorLegendInMenus);     updateMenuItemShowColorLegendInMenus();     }}),
                                             new MenuItem('',                                         null, false, {separator: true}),    
        menuItemShowTooltips               = new MenuItem('Show tooltips',                            null, false, {childMenu: menuShowTooltips}),
        menuItemShowRestartInfo            = new MenuItem('Show restart warning',    null, false, {checkCallback: () => settings.showRestartInfo,                                            callback: () => { updateSettingAndMenu('showRestartInfo',            true, !settings.showRestartInfo);                                                        }}),
        //menuItemShowWarnings               = new MenuItem('Show warnings',                            null, false, {childMenu: menuShowWarnings}),
        menuItemShowObjectCount            = new MenuItem('Show canvas object count',                 null, false, {checkCallback: () => settings.showObjectCount,                           callback: () => { updateSettingAndMenu('showObjectCount',            true, !settings.showObjectCount);            updateObjectCountDisplay();                 }}),
                                             new MenuItem('',                                         null, false, {separator: true}),
        menuItemShareUsageMetrics          = new MenuItem('Share usage metrics',                      null, false, {checkCallback: () => settings.shareUsageMetrics,                         callback: () => { updateSettingAndMenu('shareUsageMetrics',          true, !settings.shareUsageMetrics);                                                      }}),
        menuItemEnableBetaFeatures         = new MenuItem('Enable beta features',                     null, false, {checkCallback: () => subscribed() ? settings.enableBetaFeatures : false, callback: () => { updateSettingAndMenu('enableBetaFeatures',         true, !settings.enableBetaFeatures);         enableFeatures(!subscribed());               }}),
        menuItemShowDebugMenu              = new MenuItem('Show debug menu',                          null, false, {checkCallback: () => settings.showDebugMenu,                             callback: () => { uiGetLocalData('debugWarning'); }}),
                                             new MenuItem('',                                         null, false, {separator: true}),    
        menuItemMinZoomForParams           = new MenuItem('Zoom level for values . . .',              null, false, {callback: () => showMinZoomDialog()}),
      //menuPrefSep2                       = new MenuItem('',                                         null, false, {separator: true}),    
     // menuItemEnableMultiplayer          = new MenuItem('Enable multiplayer on this canvas',        null, false, {checkCallback: () => multiplayerEnabled,                                 callback: () => { updateSettingAndMenu('showPages',                  true, !settings.showPages);                  enableMultiplayer(!multiplayerEnabled);     }}),
      //                                     new MenuItem('',                                         null, false, {separator: true}),    
        menuItemObjectCenterSize           = new MenuItem('Object center size . . .',                 null, false, {callback: () => showObjectCenterSizeDialog()}),
        menuItemObjectBatchSize            = new MenuItem('Update batch size . . .',                  null, false, {callback: () => showObjectBatchDialog()}),
        menuItemMaxSolveIterations         = new MenuItem('Maximum solve iterations. . .',            null, false, {callback: () => showMaxSolveIterationsDialog()}),
        menuItemVariableNulls              = new MenuItem('Defaults for  ?  variables . . .',               null, false, {callback: () => showVariableNullsDialog()})]);
        

    menuItemShowBoolValues.divName.innerHTML = 'Show boolean values as   <span style="position: relative; top: 1px;">' + TRUE_DISPLAY_MENU + '</span>  <span>' + FALSE_DISPLAY_MENU + '</span>';


    menuLogGenerator = new Menu('Log generator', false);
    menuLogGenerator.addItems([
        menuItemLogRequests       = new MenuItem('Requests',          null, false, {checkCallback: () => settings.logRequests     ,      callback: () => updateSettingAndMenu('logRequests',           true, !settings.logRequests          ), setting: true}),
        menuItemLogValueUpdates   = new MenuItem('Values',            null, false, {checkCallback: () => settings.logValueUpdates ,      callback: () => updateSettingAndMenu('logValueUpdates',       true, !settings.logValueUpdates      ), setting: true}),
        menuItemLogObjectUpdates  = new MenuItem('Objects',           null, false, {checkCallback: () => settings.logObjectUpdates,      callback: () => updateSettingAndMenu('logObjectUpdates',      true, !settings.logObjectUpdates     ), setting: true}),
                                    new MenuItem('',                  null, false, {separator: true}),                   
        menuItemLogRawRequests    = new MenuItem('Raw\u2008requests', null, false, {checkCallback: () => settings.logRawRequests  ,      callback: () => updateSettingAndMenu('logRawRequests',        true, !settings.logRawRequests       ), setting: true}),
        menuItemLogRawValues      = new MenuItem('Raw\u2008values',   null, false, {checkCallback: () => settings.logRawValues    ,      callback: () => updateSettingAndMenu('logRawValues',          true, !settings.logRawValues         ), setting: true}),
                                    new MenuItem('',                  null, false, {separator: true}),                   
        menuItemLogStyleUpdates   = new MenuItem('Styles',            null, false, {checkCallback: () => settings.logStyleUpdates ,      callback: () => updateSettingAndMenu('logStyleUpdates',       true, !settings.logStyleUpdates      ), setting: true})]);
                     


    menuLogStorage = new Menu('Log storage', false);
    menuLogStorage.addItems([
        menuItemLogLoading            = new MenuItem('Load\u2008at start',  null, false, {checkCallback: () => settings.logLoading      ,      callback: () => updateSettingAndMenu('logLoading',            true, !settings.logLoading           ), setting: true}),
                                        new MenuItem('',                    null, false, {separator: true}),                   
        menuItemLogRawLoadPages       = new MenuItem('Load pages',          null, false, {checkCallback: () => settings.logRawLoadPages ,      callback: () => updateSettingAndMenu('logRawLoadPages',       true, !settings.logRawLoadPages      ), setting: true}),
        menuItemLogRawSavePages       = new MenuItem('Save pages',          null, false, {checkCallback: () => settings.logRawSavePages ,      callback: () => updateSettingAndMenu('logRawSavePages',       true, !settings.logRawSavePages      ), setting: true}),
                                        new MenuItem('',                    null, false, {separator: true}),                   
        menuItemLogRawLoadNodes       = new MenuItem('Load nodes',          null, false, {checkCallback: () => settings.logRawLoadNodes ,      callback: () => updateSettingAndMenu('logRawLoadNodes',       true, !settings.logRawLoadNodes      ), setting: true}),
        menuItemLogRawSaveNodes       = new MenuItem('Save nodes',          null, false, {checkCallback: () => settings.logRawSaveNodes ,      callback: () => updateSettingAndMenu('logRawSaveNodes',       true, !settings.logRawSaveNodes      ), setting: true}),
                                        new MenuItem('',                    null, false, {separator: true}),                   
        menuItemLogRawLoadConnections = new MenuItem('Load connections',    null, false, {checkCallback: () => settings.logRawLoadConnections, callback: () => updateSettingAndMenu('logRawLoadConnections', true, !settings.logRawLoadConnections), setting: true}),
        menuItemLogRawSaveConnections = new MenuItem('Save connections',    null, false, {checkCallback: () => settings.logRawSaveConnections, callback: () => updateSettingAndMenu('logRawSaveConnections', true, !settings.logRawSaveConnections), setting: true}),
                                        new MenuItem('',                    null, false, {separator: true}),
                                        new MenuItem('All page keys',       null, false, {callback:      () => { hideAllMenus(); uiQueueMessageToFigma({cmd: 'figLogAllSavedPageKeys', darkMode: darkMode}); }}),
                                        new MenuItem('All connection keys', null, false, {callback:      () => { hideAllMenus(); uiQueueMessageToFigma({cmd: 'figLogAllSavedConnKeys', darkMode: darkMode}); }}),
                                        new MenuItem('',                    null, false, {separator: true}),   
                                        new MenuItem('All pages',           null, false, {callback:      () => { hideAllMenus(); uiQueueMessageToFigma({cmd: 'figLogAllSavedPages',    darkMode: darkMode}); }}),
                                        new MenuItem('',                    null, false, {separator: true}),   
                                        new MenuItem('All local data',      null, false, {callback:      () => { hideAllMenus(); uiQueueMessageToFigma({cmd: 'figLogAllLocalData',     darkMode: darkMode}); }}),
                                        new MenuItem('',                    null, false, {separator: true}),   
                                        new MenuItem('Undo stack',          null, false, {callback:      () => { hideAllMenus(); logUndoStack(); }}),
                                        new MenuItem('Redo stack',          null, false, {callback:      () => { hideAllMenus(); logRedoStack(); }})]);
                     

    menuLogMessages = new Menu('Log messages', false);
    menuLogMessages.addItems([
        menuItemLogThreadMessages = new MenuItem('Thread messages', null, false, {checkCallback: () => settings.logThreadMessages,     callback: () => updateSettingAndMenu('logThreadMessages',     true, !settings.logThreadMessages    ), setting: true}),
        menuItemLogDataMessages   = new MenuItem('Data messages',   null, false, {checkCallback: () => settings.logDataMessages  ,     callback: () => updateSettingAndMenu('logDataMessages',       true, !settings.logDataMessages      ), setting: true}),
        menuItemLogMessages       = new MenuItem('Other messages',  null, false, {checkCallback: () => settings.logMessages     ,      callback: () => updateSettingAndMenu('logMessages',           true, !settings.logMessages          ), setting: true})]);
                     


    menuDebugDelete = new Menu('Debug generator', false);
    menuDebugDelete.addItems([
        new MenuItem('All saved pages',       null, false, {callback: () => { hideAllMenus(); uiRemoveAllSavedPages(); }}),
        new MenuItem('All saved nodes',       null, false, {callback: () => { hideAllMenus(); debugModeDeleteAllNodes(); }}),
        new MenuItem('All saved connections', null, false, {callback: () => { hideAllMenus(); uiRemoveAllSavedConnections(); }}),
        new MenuItem('',                      null, false, {separator: true}),                   
        new MenuItem('Connections to . . .',  null, false, {callback: () => showDeleteConnectionsDialog()}),                        
        new MenuItem('',                      null, false, {separator: true}),                   
        new MenuItem('All style links',       null, false, {callback: () => { hideAllMenus(); uiRemovePluginDataFromAllLocalStyles(); }}),
        new MenuItem('',                      null, false, {separator: true}),                   
        new MenuItem('All local data',        null, false, {callback: () => { hideAllMenus(); uiQueueMessageToFigma({cmd: 'figClearAllLocalData'}); }})]);
                     

    menuMainDebug = new Menu('Debug', false);
    menuMainDebug.addItems([
        menuItemShowNodeId       = new MenuItem('Show node IDs', null, false,
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
    //  menuItemShowTransformPoints = new MenuItem('Show transforms', null,
    //                             {
    //                                 checkCallback: () => settings.showTransformPoints, 
    //                                 callback:      () => 
    //                                 {
    //                                     updateSettingAndMenu('showTransformPoints', true, !settings.showTransformPoints);
    //                                     pushUpdate(null, graph.nodes.filter(n => n.active));
    //                                 }
    //                             }),
        menuItemEnableAsserts    = new MenuItem('Enable asserts', null, false,
                                   {
                                       checkCallback: () => settings.enableAsserts, 
                                       callback:      () => updateSettingAndMenu('enableAsserts', true, !settings.enableAsserts)
                                   }),
                                   new MenuItem('',                       null, false, {separator: true}),
        menuItemLogActions       = new MenuItem('Log actions',            null, false, {checkCallback: () => settings.logActions, callback: () => updateSettingAndMenu('logActions', true, !settings.logActions), setting: true}),
                                   new MenuItem('Log generator',          null, false, {childMenu: menuLogGenerator}),
                                   new MenuItem('Log messages',           null, false, {childMenu: menuLogMessages}),
                                   new MenuItem('Log storage',            null, false, {childMenu: menuLogStorage}),
                                   new MenuItem('',                       null, false, {separator: true}),   
                                   new MenuItem('Delete',                 null, false, {childMenu: menuDebugDelete}),
                                   new MenuItem('',                       null, false, {separator: true}),   
                                   new MenuItem('Update legacy nodes',    null, false, {callback: () => uiUpdateLegacyNodes()}),
        menuItemCopyLLMPrompt    = new MenuItem('Copy LLM system prompt', null, false, {callback: () => uiCopySystemPrompt()}),
                                   new MenuItem('',                       null, false, {separator: true}),   
        menuItemDebugMode        = new MenuItem('Restart in debug mode',  null, false, {callback: () => uiRestartGenerator(true)})]);


    // menuMainDebug.init = () => 
    // {
    //     menuMainDebug.minWidth = 
    //            subscribed() 
    //         //|| currentUserIsDev()
    //         ? 200 
    //         : 240;        
    // };
}



function initDebugModeMenus()
{
    initPreferenceMenus();


    menuDebugMain = new Menu('Debug main menu', true, false, true);
    menuDebugMain.addItems([
        new MenuItem('Preferences', null, false, {childMenu: menuMainPreferences}),
        new MenuItem('Debug',       null, false, {childMenu: menuMainDebug      })]);


    menuPageData = new Menu('Pages menu', false, false);
    menuPageData.addItems([
     // new MenuItem('Delete all pages',  null, false, { enabled: false, callback: () => { hideAllMenus(); debugModeDeleteAllPages(); }}),
     // new MenuItem('',                  null, false, { enabled: false, separator: true }),
        new MenuItem('Delete page',       null, false, { callback: () => { hideAllMenus(); debugModeDeletePage(menuPageData._div.page); }})]);


    menuPageDataPages = new Menu('Pages menu', false, false);
    menuPageDataPages.addItems([
        new MenuItem('Expand all',       null, false, { callback: () => { hideAllMenus(); expandAllPageData();   }}),
        new MenuItem('Collapse all',     null, false, { callback: () => { hideAllMenus(); collapseAllPageData(); }}),
        new MenuItem('',                 null, false, { separator: true }),
        new MenuItem('Delete all pages', null, false, { callback: () => { hideAllMenus(); debugModeDeleteAllPages(); }})]);


    menuNodeData = new Menu('Node menu', false, false);
    menuNodeData.addItems([
        new MenuItem('Remove path from ID',     null, false, { callback: () => { hideAllMenus(); debugModeDeletePathFromNodeId(menuNodeData._div.node); }}),
        new MenuItem('',                        null, false, { separator: true }),
        new MenuItem('Delete connections from', null, false, { callback: () => { hideAllMenus(); debugModeDeleteConnectionsFromNode     (menuNodeData._div.node); }}),
        new MenuItem('Delete connections to'  , null, false, { callback: () => { hideAllMenus(); debugModeDeleteConnectionsToNode       (menuNodeData._div.node); }}),
        new MenuItem('Delete all connections',  null, false, { callback: () => { hideAllMenus(); debugModeDeleteConnectionsToAndFromNode(menuNodeData._div.node); }}),
        new MenuItem('',                        null, false, { separator: true }),
        new MenuItem('Delete node',             null, false, { callback: () => { hideAllMenus(); debugModeDeleteNode(menuNodeData._div.node); }})]);


    menuNodeDataSort = new Menu('Sort nodes menu', false);
    menuNodeDataSort.addItems([
        menuItemSortNodesType    = new MenuItem('Type',             null, false, { checkCallback: () => nodeSortOrder == 'type',    callback: () => { hideAllMenus(); sortNodeDivs('type'); }}),
        menuItemSortNodesId      = new MenuItem('ID',               null, false, { checkCallback: () => nodeSortOrder == 'id',      callback: () => { hideAllMenus(); sortNodeDivs('id');   }}),
        menuItemSortNodesName    = new MenuItem('Name',             null, false, { checkCallback: () => nodeSortOrder == 'name',    callback: () => { hideAllMenus(); sortNodeDivs('name'); }}),
                                   new MenuItem('',                 null, false, { separator: true }),
        menuItemSortNodesCreated = new MenuItem('Creation time',    null, false, { checkCallback: () => nodeSortOrder == 'created', callback: () => { hideAllMenus(); sortNodeDivs('created'); }}),
        menuItemSortNodesUpdated = new MenuItem('Last update time', null, false, { checkCallback: () => nodeSortOrder == 'updated', callback: () => { hideAllMenus(); sortNodeDivs('updated'); }})]);

    menuNodeDataNodes = new Menu('Nodes menu', false, false);
    menuNodeDataNodes.addItems([
        new MenuItem('Sort nodes by...', null, false, { childMenu: menuNodeDataSort }),
        new MenuItem('',                 null, false, { separator: true }),
        new MenuItem('Expand all',       null, false, { callback: () => { hideAllMenus(); expandAllNodeData();   }}),
        new MenuItem('Collapse all',     null, false, { callback: () => { hideAllMenus(); collapseAllNodeData(); }}),
        new MenuItem('',                 null, false, { separator: true }),
        new MenuItem('Delete all nodes', null, false, { callback: () => { hideAllMenus(); debugModeDeleteAllNodes(); }})]);


    menuConnData = new Menu('Connection menu', false, false);
    menuConnData.addItems([
        new MenuItem('Delete connection', null, false, { callback: () => { hideAllMenus(); debugModeDeleteConnection(menuConnData._div.conn); }})]);


    menuConnDataSort = new Menu('Sort connections menu', false);
    menuConnDataSort.addItems([
        menuItemSortConnsOutputNodeId   = new MenuItem('Output node ID',   null, false, { checkCallback: () => connSortOrderOut == 'outputNodeId',   callback: () => { hideAllMenus(); sortConnDivs('outputNodeId'  ); }}),
        //menuItemSortConnsOutputNodeName = new MenuItem('Output node name', null, false, { checkCallback: () => connSortOrderOut == 'outputNodeName', callback: () => { hideAllMenus(); sortConnDivs('outputNodeName'); }}),
        menuItemSortConnsOutputId       = new MenuItem('Output ID',        null, false, { checkCallback: () => connSortOrderOut == 'outputId',       callback: () => { hideAllMenus(); sortConnDivs('outputId'      ); }}),
                                          new MenuItem('',                 null, false, { separator: true }),
        menuItemSortConnsInputNodeId    = new MenuItem('Input node ID',    null, false, { checkCallback: () => connSortOrderIn == 'inputNodeId',    callback: () => { hideAllMenus(); sortConnDivs('inputNodeId'  ); }}),
        //menuItemSortConnsInputNodeName  = new MenuItem('Input node name',  null, false, { checkCallback: () => connSortOrderIn == 'inputNodeName',  callback: () => { hideAllMenus(); sortConnDivs('inputNodeName'); }}),
        menuItemSortConnsInputId        = new MenuItem('Input ID',         null, false, { checkCallback: () => connSortOrderIn == 'inputId',        callback: () => { hideAllMenus(); sortConnDivs('inputId'      ); }}),
                                          new MenuItem('',                 null, false, { separator: true }),
        menuItemSortConnsCreated        = new MenuItem('Creation time',    null, false, { checkCallback: () => connSortOrderOut == 'created',        callback: () => { hideAllMenus(); sortConnDivs('created'); }})]);

    menuConnDataConns = new Menu('Connections menu', false, false);
    menuConnDataConns.addItems([
        new MenuItem('Sort connections by...',   null, false, { childMenu: menuConnDataSort }),
        new MenuItem('',                         null, false, { separator: true }),
        new MenuItem('Expand all',               null, false, { callback: () => { hideAllMenus(); expandAllConnData();   }}),
        new MenuItem('Collapse all',             null, false, { callback: () => { hideAllMenus(); collapseAllConnData(); }}),
        new MenuItem('',                         null, false, { separator: true }),
     // new MenuItem('List all connection keys', null, false, { callback: () => { hideAllMenus(); uiQueueMessageToFigma({cmd: 'figLogAllSavedConnKeys', darkMode: darkMode}); }}),
     // new MenuItem('',                         null, false, { separator: true }),
        new MenuItem('Delete all connections',   null, false, { callback: e => { hideAllMenus(); debugModeDeleteAllConnections(); }})]);
}



function initTextMenu(textbox)
{
    const readOnly = () =>
        //   textbox.readOnly
        //||    
              textbox.control
           && textbox.control.readOnly;


    menuText.clearItems();
       
    if (!readOnly)
        menuText.addItems([
            new MenuItem('Cut', null, false, { shortcut: (readOnly() ? NULL : osCtrl() + 'X'), enabled: !textbox.control || !readOnly(), callback: () => { hideAllMenus(); document.execCommand('cut'); }})]);

    menuText.addItems([
        new MenuItem('Copy', null, false, { shortcut: osCtrl() + 'C', callback: () => { hideAllMenus(); document.execCommand('copy'); }})]);

    if (!readOnly)
        menuText.addItems([
            new MenuItem('Paste', null, false, { shortcut: (readOnly() ? NULL : osCtrl() + 'V'), enabled: !textbox.control || !readOnly(), callback: () => { hideAllMenus(); document.execCommand('paste'); }})]);

    menuText.addItems([
        new MenuItem('',           null, false, { separator: true }),
        new MenuItem('Select all', null, false, { shortcut: (readOnly() ? NULL : osCtrl() + 'A'), callback: () => { hideAllMenus(); selectTextareaText(textbox); }})]);
}



function initCopyMenu()
{
    menuCopy.clearItems();

    menuCopy.addItems([
        new MenuItem('Copy',       null, false, { shortcut: osCtrl() + 'C', enabled: elementHasSelectedText(crashDialogBody), callback: () => { hideAllMenus(); document.execCommand('copy'); }}),
        new MenuItem('',           null, false, { separator: true }),
        new MenuItem('Select all', null, false, { shortcut: osCtrl() + 'A', callback: () => { hideAllMenus(); selectDivText(crashDetails); }})]);
}



function initTextboxMenu(textbox)
{
    const readOnly = () =>
           textbox.readOnly
        ||    textbox.control
           && textbox.control.readOnly;


           menuTextbox.clearItems();


    let menuItemLeft,
        menuItemCenter,
        menuItemRight,
        menuItemJustify;


    const param = textbox.control.param;

    if (!readOnly()) //disabled)
        menuTextbox.addItems([
            new MenuItem('Cut', null, false, { shortcut: osCtrl() + 'X', enabled: !readOnly(), callback: () => { hideAllMenus(); document.execCommand('cut'); }})]);

    menuTextbox.addItems([
        new MenuItem('Copy', null, false, { shortcut: osCtrl() + 'C', callback: () => { hideAllMenus(); document.execCommand('copy'); }})]);

    if (!readOnly()) //disabled)
        menuTextbox.addItems([
            new MenuItem('Paste', null, false, { shortcut: osCtrl() + 'V', enabled: !readOnly(), callback: () => { hideAllMenus(); document.execCommand('paste'); }})]);

    menuTextbox.addItems([
                          new MenuItem('',             null, false, { separator: true }),
                          new MenuItem('Select all',   null, false, { shortcut: (readOnly() ? NULL : osCtrl() + 'A'), callback: () => { hideAllMenus(); selectTextareaText(textbox); }}),
                          new MenuItem('',             null, false, { separator: true }),
        menuItemLeft    = new MenuItem('Align left',   null, false, { callback: () => { hideAllMenus(); actionManager.do(new SetParamSettingAction(param, 'align', 'left'   )); }}),
        menuItemCenter  = new MenuItem('Align center', null, false, { callback: () => { hideAllMenus(); actionManager.do(new SetParamSettingAction(param, 'align', 'center' )); }}),
        menuItemRight   = new MenuItem('Align right',  null, false, { callback: () => { hideAllMenus(); actionManager.do(new SetParamSettingAction(param, 'align', 'right'  )); }}),
        menuItemJustify = new MenuItem('Justify',      null, false, { callback: () => { hideAllMenus(); actionManager.do(new SetParamSettingAction(param, 'align', 'justify')); }})]);


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
        insert:      getCtrlKey(e),
        autoConnect:    getCtrlKey(e)
                     && e.altKey,
        fromSearch:  e.fromSearch === true,
        ...options
    };
}
