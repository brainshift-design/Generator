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
var btnPage;
var btnZoom;


var menuBarMenus;


var menuMain;
var menuMainFile;
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
var menuNumber;
var menuSets;
var menuString;
var menuConvert;
var menuColor;
var menuColorStyle;
var menuLayer;
var menuEffects;
var menuStyles;
var menuVariables;
var menuShape;
var menuTemplate;
var menuGroup;

var menuMath;
var menuBoolean;
var menuCondition;
var menuTrig;
var menuFunctions;

var menuVector;
var menuShapes;
var menuTransform;

var menuPage;

var menuZoom;
var menuWindow;


var menuGraph;
var menuNode;
var menuNodeCopyAs;
var menuNodeHighlight;
var menuNodeSelect;


var menuLocalStyles;
var menuSelectParam;

var menuRemoveLicense;

var menuText;
var menuTextbox;

var menuCopy;

var menuPageData;
var menuPageDataPages;
var menuNodeData;
var menuNodeDataNodes;
var menuConnData;
var menuConnDataConns;

var menuItemShowTooltipLongText;
var menuItemShowTooltipColorInterpolation;
var menuItemShowTooltipColorContrast;
var menuItemShowTooltipColorBlindness;


var menuItemEnableZoomedOutParams;
var menuItemMinZoomForParams;
var menuItemShowPages;
var menuPrefSep1;
var menuItemShowAllColorSpaces;
var menuItemShowNodeIcons;
var menuItemShowColorLegendInMenus;
var menuItemShowBoolValues;
var menuItemShowOperationResults;
var menuItemShowClearUndoWarning;
var menuItemShowTooltips;
var menuItemShowDebugMenu;
var menuPrefSep2;

var menuItemShowNodeId;
var menuItemShowTransformPoints;
var menuItemEnableAsserts;

var menuItemDebug;
var menuItemDebugLog;

var menuItemHelp;


//var menuItemEnableBetaFeatures;


var menuItemList;  
var menuFlowSep1;
var menuItemItems;
var menuItemSelect;
var menuItemCount;
var menuItemIfElse;
var menuFlowSep2;
var menuFlowSep3;
var menuItemStart;
var menuItemRepeat;
var menuFlowSep4;
var menuItemTimer;
var menuItemNull;
var menuItemCache;
var menuItemFreeze;

var menuItemArray;
var menuItemDistribute;
var menuItemSequence;
var menuItemSolve;  
var menuItemAnimate;  
var menuItemNumberSep1;

var menuItemColor;
var menuItemCorrectColor;
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

var menuItemManageTemplates;

var menuItemDataMode;

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
var menuItemNodeSelect;
// var menuItemNodeBringToFront;
// var menuItemNodeSendToBack;
//var menuItemNodeActivate;
var menuItemNodeSaveAsTemplate;
var menuItemNodeSep4;
var menuItemNodeEnableDisable;


var menuItemLicenseSep1;
var menuItemLicenseRemove;

``

function initGeneratorMenus()
{
    menuShowTooltips = new Menu('Show tooltips', false);
    menuShowTooltips.addItems([
        menuItemShowTooltipLongText           = new MenuItem('Long text',           {checkCallback: () => settings.showTooltipLongText,           callback: () => { updateSettingAndMenu('showTooltipLongText',           true, !settings.showTooltipLongText          ); }}),
        menuItemShowTooltipColorContrast      = new MenuItem('Color contrast',      {checkCallback: () => settings.showTooltipColorContrast,      callback: () => { updateSettingAndMenu('showTooltipColorContrast',      true, !settings.showTooltipColorContrast     ); }}),
        menuItemShowTooltipColorInterpolation = new MenuItem('Color interpolation', {checkCallback: () => settings.showTooltipColorInterpolation, callback: () => { updateSettingAndMenu('showTooltipColorInterpolation', true, !settings.showTooltipColorInterpolation); }}),
        menuItemShowTooltipColorBlindness     = new MenuItem('Color blindness',     {checkCallback: () => settings.showTooltipColorBlindness,     callback: () => { updateSettingAndMenu('showTooltipColorBlindness',     true, !settings.showTooltipColorBlindness    ); }})]);


    menuMainFile = new Menu('File', false);
    menuMainFile.addItems([
        new MenuItem('Import from file...',      {callback: () => { hideAllMenus(); uiImportFromLocalFile(); }}),
        new MenuItem('',                         {separator: true}),    
        new MenuItem('Save selected to file...', {shortcut: osCtrlShift() + 'S', callback: () => { hideAllMenus(); uiSaveSelectionToLocalFile(); }})]);


    menuMainPreferences = new Menu('Preferences', false);
    menuMainPreferences.addItems([
        // menuItemShowPages           = new MenuItem('Show pages',                    {checkCallback: () => settings.showAllColorSpaces,     callback: () => { updateSettingAndMenu('showPages',              true, !settings.showPages);              updateMenuItemShowPages();              }}),
        // menuPrefSep1                = new MenuItem('',                              {separator: true}),    
        menuItemShowAllColorSpaces     = new MenuItem('Show all color spaces',         {checkCallback: () => settings.showAllColorSpaces,     callback: () => { updateSettingAndMenu('showAllColorSpaces',     true, !settings.showAllColorSpaces);     updateMenuItemShowAllColorSpaces();     }}),
        menuItemShowOperationResults   = new MenuItem('Show operation results',        {checkCallback: () => settings.showOperationResults,   callback: () => { updateSettingAndMenu('showOperationResults',   true, !settings.showOperationResults);   updateMenuItemShowOperationResults();   }}),
        menuItemShowNodeIcons          = new MenuItem('Show node icons',               {checkCallback: () => settings.showNodeIcons,          callback: () => { updateSettingAndMenu('showNodeIcons',          true, !settings.showNodeIcons);          updateMenuItemShowNodeIcons();          }}),
        menuItemShowBoolValues         = new MenuItem('Show boolean values as   ✓ ✗', {checkCallback: () => settings.showBoolValues,         callback: () => { updateSettingAndMenu('showBoolValues',         true, !settings.showBoolValues);         updateMenuItemShowBoolValues();         }}),
        menuItemShowColorLegendInMenus = new MenuItem('Show color legend in menus',    {checkCallback: () => settings.showColorLegendInMenus, callback: () => { updateSettingAndMenu('showColorLegendInMenus', true, !settings.showColorLegendInMenus); updateMenuItemShowColorLegendInMenus(); }}),
                                         new MenuItem('',                              {separator: true}),    
        menuItemShowTooltips           = new MenuItem('Show tooltips',                 {childMenu: menuShowTooltips}),
        menuItemShowClearUndoWarning   = new MenuItem('Show clear undo warning',       {checkCallback: () => settings.showClearUndoWarning,   callback: () => { updateSettingAndMenu('showClearUndoWarning',   true, !settings.showClearUndoWarning);                                           }}),
        menuItemShowDebugMenu          = new MenuItem('Show debug menu',               {checkCallback: () => settings.showDebugMenu,          callback: () => { updateSettingAndMenu('showDebugMenu',          true, !settings.showDebugMenu);          updateMenuItemShowDebugMenu();          }}),
        menuPrefSep2                   = new MenuItem('',                              {separator: true}),    
        // menuItemEnableBetaFeatures  = new MenuItem('Enable beta features',          {checkCallback: () => settings.enableBetaFeatures,     callback: () => { updateSettingAndMenu('enableBetaFeatures',     true, !settings.enableBetaFeatures);     enableFeatures(true, settings.enableBetaFeatures); }}),
        //                               new MenuItem('',                              {separator: true}),    
        menuItemMinZoomForParams       = new MenuItem('Zoom level for values...',      {callback: () => showMinZoomDialog()})]);
        

    menuItemShowBoolValues.divName.innerHTML = 'Show boolean values as   <span style="position: relative; top: 1px;">' + TRUE_DISPLAY_MENU + '</span>  <span>' + FALSE_DISPLAY_MENU + '</span>'


    menuLogGenerator = new Menu('Log generator', false);
    menuLogGenerator.addItems([
        menuItemLogRequests       = new MenuItem('Requests',          {checkCallback: () => settings.logRequests     ,      callback: () => updateSettingAndMenu('logRequests',           true, !settings.logRequests          ), setting: true}),
        menuItemLogValueUpdates   = new MenuItem('Values',            {checkCallback: () => settings.logValueUpdates ,      callback: () => updateSettingAndMenu('logValueUpdates',       true, !settings.logValueUpdates      ), setting: true}),
        menuItemLogObjectUpdates  = new MenuItem('Objects',           {checkCallback: () => settings.logObjectUpdates,      callback: () => updateSettingAndMenu('logObjectUpdates',      true, !settings.logObjectUpdates     ), setting: true}),
        menuItemLogStyleUpdates   = new MenuItem('Styles',            {checkCallback: () => settings.logStyleUpdates ,      callback: () => updateSettingAndMenu('logStyleUpdates',       true, !settings.logStyleUpdates      ), setting: true}),
                                    new MenuItem('',                  {separator: true}),                   
        menuItemLogRawRequests    = new MenuItem('Raw\u2008requests', {checkCallback: () => settings.logRawRequests  ,      callback: () => updateSettingAndMenu('logRawRequests',        true, !settings.logRawRequests       ), setting: true}),
        menuItemLogRawValues      = new MenuItem('Raw\u2008values',   {checkCallback: () => settings.logRawValues    ,      callback: () => updateSettingAndMenu('logRawValues',          true, !settings.logRawValues         ), setting: true})]);
                     


    menuLogStorage = new Menu('Log storage', false);
    menuLogStorage.addItems([
        menuItemLogLoading            = new MenuItem('Load\u2008at start',  {checkCallback: () => settings.logLoading      ,      callback: () => updateSettingAndMenu('logLoading',            true, !settings.logLoading           ), setting: true}),
                                        new MenuItem('',                    {separator: true}),                   
        menuItemLogRawLoadPages       = new MenuItem('Load pages',          {checkCallback: () => settings.logRawLoadPages ,      callback: () => updateSettingAndMenu('logRawLoadPages',       true, !settings.logRawLoadPages      ), setting: true}),
        menuItemLogRawSavePages       = new MenuItem('Save pages',          {checkCallback: () => settings.logRawSavePages ,      callback: () => updateSettingAndMenu('logRawSavePages',       true, !settings.logRawSavePages      ), setting: true}),
                                        new MenuItem('',                    {separator: true}),                   
        menuItemLogRawLoadNodes       = new MenuItem('Load nodes',          {checkCallback: () => settings.logRawLoadNodes ,      callback: () => updateSettingAndMenu('logRawLoadNodes',       true, !settings.logRawLoadNodes      ), setting: true}),
        menuItemLogRawSaveNodes       = new MenuItem('Save nodes',          {checkCallback: () => settings.logRawSaveNodes ,      callback: () => updateSettingAndMenu('logRawSaveNodes',       true, !settings.logRawSaveNodes      ), setting: true}),
                                        new MenuItem('',                    {separator: true}),                   
        menuItemLogRawLoadConnections = new MenuItem('Load connections',    {checkCallback: () => settings.logRawLoadConnections, callback: () => updateSettingAndMenu('logRawLoadConnections', true, !settings.logRawLoadConnections), setting: true}),
        menuItemLogRawSaveConnections = new MenuItem('Save connections',    {checkCallback: () => settings.logRawSaveConnections, callback: () => updateSettingAndMenu('logRawSaveConnections', true, !settings.logRawSaveConnections), setting: true}),
                                        new MenuItem('',                    {separator: true}),
                                        new MenuItem('All page keys',       {callback:      () => { hideAllMenus(); uiQueueMessageToFigma({cmd: 'figLogAllSavedPageKeys', darkMode: darkMode}); }}),
                                        new MenuItem('All connection keys', {callback:      () => { hideAllMenus(); uiQueueMessageToFigma({cmd: 'figLogAllSavedConnKeys', darkMode: darkMode}); }}),
                                        new MenuItem('',                    {separator: true}),   
                                        new MenuItem('All pages',           {callback:      () => { hideAllMenus(); uiQueueMessageToFigma({cmd: 'figLogAllSavedPages',    darkMode: darkMode}); }}),
                                        new MenuItem('',                    {separator: true}),   
                                        new MenuItem('All local data',      {callback:      () => { hideAllMenus(); uiQueueMessageToFigma({cmd: 'figLogAllLocalData',     darkMode: darkMode}); }}),
                                        new MenuItem('',                    {separator: true}),   
                                        new MenuItem('Undo stack',          {callback:      () => { hideAllMenus(); logUndoStack(); }}),
                                        new MenuItem('Redo stack',          {callback:      () => { hideAllMenus(); logRedoStack(); }})]);
                     

    menuLogMessages = new Menu('Log messages', false);
    menuLogMessages.addItems([
        menuItemLogThreadMessages = new MenuItem('Thread messages',   {checkCallback: () => settings.logThreadMessages,     callback: () => updateSettingAndMenu('logThreadMessages',     true, !settings.logThreadMessages    ), setting: true}),
        menuItemLogDataMessages   = new MenuItem('Data messages',     {checkCallback: () => settings.logDataMessages  ,     callback: () => updateSettingAndMenu('logDataMessages',       true, !settings.logDataMessages      ), setting: true}),
        menuItemLogMessages       = new MenuItem('Other messages',    {checkCallback: () => settings.logMessages     ,      callback: () => updateSettingAndMenu('logMessages',           true, !settings.logMessages          ), setting: true})]);
                     


    menuDebugDelete = new Menu('Debug generator', false);
    menuDebugDelete.addItems([
        new MenuItem('All saved pages',       {callback: () => { hideAllMenus(); uiRemoveAllSavedPages(); }}),
        new MenuItem('',                      {separator: true}),                   
        new MenuItem('Connections to...',     {callback: () => showDeleteConnectionsDialog()}),                        
        new MenuItem('All saved connections', {callback: () => { hideAllMenus(); uiRemoveAllSavedConnections(); }}),
        new MenuItem('',                      {separator: true}),                   
        new MenuItem('All style links',       {callback: () => { hideAllMenus(); uiRemovePluginDataFromAllLocalStyles(); }}),
        new MenuItem('',                      {separator: true}),                   
        new MenuItem('All local data',        {callback: () => { hideAllMenus(); uiQueueMessageToFigma({cmd: 'figClearAllLocalData'}); }})]);
                     

    menuMainDebug = new Menu('Debug', false);
    menuMainDebug.addItems([
    menuItemShowNodeId = new MenuItem('Show IDs',
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
    menuItemShowTransformPoints = new MenuItem('Show transforms', 
                        {
                            checkCallback: () => settings.showTransformPoints, 
                            callback:      () => 
                            {
                                updateSettingAndMenu('showTransformPoints', true, !settings.showTransformPoints);
                                pushUpdate(null, graph.nodes.filter(n => n.active));
                            }
                        }),
    menuItemEnableAsserts = new MenuItem('Enable asserts', 
                         {
                             checkCallback: () => settings.enableAsserts, 
                             callback:      () => updateSettingAndMenu('enableAsserts', true, !settings.enableAsserts)
                         }),
                         new MenuItem('',                      {separator: true}),
    menuItemLogActions = new MenuItem('Log actions',           {checkCallback: () => settings.logActions, callback: () => updateSettingAndMenu('logActions', true, !settings.logActions), setting: true}),
                         new MenuItem('Log messages',          {childMenu: menuLogMessages}),
                         new MenuItem('Log storage',           {childMenu: menuLogStorage}),
                         new MenuItem('Log generator',         {childMenu: menuLogGenerator}),
                         new MenuItem('',                      {separator: true}),   
                         new MenuItem('Delete',                {childMenu: menuDebugDelete}),
                         new MenuItem('',                      {separator: true}),   
    menuItemDataMode   = new MenuItem('Restart in debug mode', {checkCallback: () => settings.dataMode, callback: () => uiRestartGenerator(true)})]);
                     

    menuMainHelp = new Menu('Help and subscription', false);
    menuMainHelp.addItems([
        new MenuItem('Keyboard shortcuts', {shortcut: osCtrlShift() + '?', callback: () => showKeyboardPanel()}),
        // new MenuItem('Help page',   {callback:  () => window.open('http://www.bourt.com/generator/help', '_blank')}),
        new MenuItem('',             {separator: true}),
        new MenuItem('Subscription', {callback:  () => showSubscriptionDialog()}),
      //new MenuItem('',             {separator: true}),
        new MenuItem('About',        {callback:  () => showAboutDialog()})]);


    menuMain = new Menu('Main menu', false);
    menuMain.addItems([
                        new MenuItem('File',                  {childMenu: menuMainFile}),
                        new MenuItem('',                      {separator: true}),
                        new MenuItem('Preferences',           {childMenu: menuMainPreferences}),
        menuItemDebug = new MenuItem('Debug',                 {childMenu: menuMainDebug}),
                        new MenuItem('',                      {separator: true}),
        menuItemHelp  = new MenuItem('Help and subscription', {childMenu: menuMainHelp })]);


    menuFlow = new Menu('Flow', true, false);
    menuFlow.addItems([
        menuItemStart   = new MenuItem('Start. . .',   {icon: iconStart,     createType: START,            callback: e => actionManager.do(getCreateNodeAction(START,           btnFlow.div, getCreateOptions(e)))}),
        menuItemRepeat  = new MenuItem('. . . Repeat', {icon: iconRepeat,    createType: REPEAT,           callback: e => actionManager.do(getCreateNodeAction(REPEAT,          btnFlow.div, getCreateOptions(e)))}),
                          new MenuItem('',             {separator: true}),
        menuItemNull    = new MenuItem('Null',         {icon: iconNull,      createType: NULL_NODE,        callback: e => actionManager.do(getCreateNodeAction(NULL_NODE,       btnFlow.div, getCreateOptions(e)))}),
        menuItemCache   = new MenuItem('Cache',        {icon: iconCache,     createType: CACHE,            callback: e => actionManager.do(getCreateNodeAction(CACHE,           btnFlow.div, getCreateOptions(e)))}),
        menuItemFreeze  = new MenuItem('Freeze . . .', {icon: iconFreeze,    createType: FREEZE,           callback: e => actionManager.do(getCreateNodeAction(FREEZE,          btnFlow.div, getCreateOptions(e)))}),
                          new MenuItem('',             {separator: true}),
        menuItemTimer   = new MenuItem('Timer ',       {icon: iconTimer,     createType: TIMER,            callback: e => actionManager.do(getCreateNodeAction(TIMER,           btnFlow.div, getCreateOptions(e)))}),
        menuItemAnimate = new MenuItem('Animate',      {icon: iconAnimate,   createType: NUMBER_ANIMATE,   callback: e => actionManager.do(getCreateNodeAction(NUMBER_ANIMATE,  btnFlow.div, getCreateOptions(e)))}),
                          new MenuItem('',             {separator: true}),
                          new MenuItem('Date & time',  {icon: iconDateTime,  createType: NUMBER_DATETIME,  callback: e => actionManager.do(getCreateNodeAction(NUMBER_DATETIME, btnFlow.div, getCreateOptions(e)))}),
        menuFlowSep4    = new MenuItem('',             {separator: true}),
                          new MenuItem('Fetch',        {icon: iconTextFetch, createType: TEXT_FETCH,       callback: e => actionManager.do(getCreateNodeAction(TEXT_FETCH,      btnFlow.div, getCreateOptions(e)))}),
                          new MenuItem('Text file',    {icon: iconTextFile,  createType: TEXT_FILE,        callback: e => actionManager.do(getCreateNodeAction(TEXT_FILE,       btnFlow.div, getCreateOptions(e)))})]);
    

    menuData = new Menu('Data', true, false);
    menuData.addItems([
        menuItemList   = new MenuItem('List',              {icon: iconList,        createType: LIST,         callback: e => actionManager.do(getCreateNodeAction(LIST,          btnData.div, getCreateOptions(e)))}),
        menuFlowSep1   = new MenuItem('',                  {separator: true}),     
        menuItemItems  = new MenuItem('Items',             {icon: iconItems,       createType: ITEMS,        callback: e => actionManager.do(getCreateNodeAction(ITEMS,         btnData.div, getCreateOptions(e)))}),
        menuItemCount  = new MenuItem('Count',             {icon: iconCount,       createType: LIST_COUNT,   callback: e => actionManager.do(getCreateNodeAction(LIST_COUNT,    btnData.div, getCreateOptions(e)))}),
                         new MenuItem('',                  {separator: true}),     
        menuItemSelect = new MenuItem('Select',            {icon: iconSelect,      createType: SELECT,       callback: e => actionManager.do(getCreateNodeAction(SELECT,        btnData.div, getCreateOptions(e)))}),
        menuItemIfElse = new MenuItem('I&hairsp;f / else', {icon: iconIfElse,      createType: IF_ELSE,      callback: e => actionManager.do(getCreateNodeAction(IF_ELSE,       btnData.div, getCreateOptions(e))), disambiguate: true}),
                         new MenuItem('Contains',          {icon: iconContains,    createType: CONTAINS,     callback: e => actionManager.do(getCreateNodeAction(CONTAINS,      btnData.div, getCreateOptions(e))), disambiguate: true}),
                         new MenuItem('',                  {separator: true}),     
                         new MenuItem('Sublist',           {icon: iconSublist,     createType: SUBLIST,      callback: e => actionManager.do(getCreateNodeAction(SUBLIST,       btnData.div, getCreateOptions(e)))}),
                         new MenuItem('Unique',            {icon: iconUnique,      createType: UNIQUE,       callback: e => actionManager.do(getCreateNodeAction(UNIQUE,        btnData.div, getCreateOptions(e)))}),
                         new MenuItem('Reverse',           {icon: iconReverseList, createType: REVERSE_LIST, callback: e => actionManager.do(getCreateNodeAction(REVERSE_LIST,  btnData.div, getCreateOptions(e)))}),
                         new MenuItem('Sort',              {icon: iconSort,        createType: SORT,         callback: e => actionManager.do(getCreateNodeAction(SORT,          btnData.div, getCreateOptions(e)))}),
                         new MenuItem('Expand',            {icon: iconExpand,      createType: EXPAND,       callback: e => actionManager.do(getCreateNodeAction(EXPAND,        btnData.div, getCreateOptions(e)))}),
                         new MenuItem('',                  {separator: true}),     
                         new MenuItem('Column',            {icon: iconColumn,      createType: COLUMN,       callback: e => actionManager.do(getCreateNodeAction(COLUMN,        btnData.div, getCreateOptions(e)))}),
                         new MenuItem('Cell',              {icon: iconCell,        createType: CELL,         callback: e => actionManager.do(getCreateNodeAction(CELL,          btnData.div, getCreateOptions(e)))})]);
    

    menuSets = new Menu('Sets...', true, false);
    menuSets.addItems([
        menuItemSequence   = new MenuItem('Sequence . . .',   {icon: iconSequence,    createType: NUMBER_SEQUENCE,    callback: e => actionManager.do(getCreateNodeAction(NUMBER_SEQUENCE,    btnSets.div, getCreateOptions(e)))}),
        menuItemDistribute = new MenuItem('Range . . .',      {icon: iconDistribute,  createType: NUMBER_DISTRIBUTE,  callback: e => actionManager.do(getCreateNodeAction(NUMBER_DISTRIBUTE,  btnSets.div, getCreateOptions(e)))}),
        menuItemArray      = new MenuItem('Define . . .',     {icon: iconDefine,      createType: DEFINE,             callback: e => actionManager.do(getCreateNodeAction(DEFINE,             btnSets.div, getCreateOptions(e)))}),
                             new MenuItem('',                 {separator: true}),
                             new MenuItem('Random . . .',     {icon: iconRandom,      createType: NUMBER_RANDOM,      callback: e => actionManager.do(getCreateNodeAction(NUMBER_RANDOM,      btnSets.div, getCreateOptions(e)))}),
                             new MenuItem('Noise . . .',      {icon: iconNoise,       createType: NUMBER_NOISE,       callback: e => actionManager.do(getCreateNodeAction(NUMBER_NOISE,       btnSets.div, getCreateOptions(e)))}),
                             new MenuItem('Probability. . .', {icon: iconProbability, createType: NUMBER_PROBABILITY, callback: e => actionManager.do(getCreateNodeAction(NUMBER_PROBABILITY, btnSets.div, getCreateOptions(e)))}),
                             new MenuItem('',                 {separator: true}),
                             new MenuItem('Accumulate. . .',  {icon: iconAccumulate,  createType: NUMBER_ACCUMULATE,  callback: e => actionManager.do(getCreateNodeAction(NUMBER_ACCUMULATE,  btnSets.div, getCreateOptions(e)))})]);
        
    
    menuMath = new Menu('Math', true, false);
    menuMath.addItems([
        // new MenuItem('Power',     {icon: iconExponent, callback: e => actionManager.do(getCreateNodeAction(NUMBER_EXPONENT, btnNumber.div, getCreateOptions(e)))}),
        // new MenuItem('Multiply',  {icon: iconMultiply, callback: e => actionManager.do(getCreateNodeAction(NUMBER_MULTIPLY, btnNumber.div, getCreateOptions(e)))}),
        // new MenuItem('Divide',    {icon: iconDivide,   callback: e => actionManager.do(getCreateNodeAction(NUMBER_DIVIDE,   btnNumber.div, getCreateOptions(e)))}),
        // new MenuItem('Remainder', {icon: iconModulo,   callback: e => actionManager.do(getCreateNodeAction(NUMBER_MODULO,   btnNumber.div, getCreateOptions(e)))}),
        // new MenuItem('Add',       {icon: iconAdd,      callback: e => actionManager.do(getCreateNodeAction(NUMBER_ADD,      btnNumber.div, getCreateOptions(e)))}),
        // new MenuItem('Subtract',  {icon: iconSubtract, callback: e => actionManager.do(getCreateNodeAction(NUMBER_SUBTRACT, btnNumber.div, getCreateOptions(e)))})]);
        new MenuItem('Math',  {icon: iconMulti, createType: NUMBER_MATH, callback: e => actionManager.do(getCreateNodeAction(NUMBER_MATH, btnNumber.div, getCreateOptions(e)))})]);
        

    menuBoolean = new Menu('Boolean', true, false);
    menuBoolean.addItems([
        new MenuItem('And', {icon: iconAnd, createType: NUMBER_AND, callback: e => actionManager.do(getCreateNodeAction(NUMBER_AND, btnNumber.div, getCreateOptions(e)))}),
        new MenuItem('Or',  {icon: iconOr , createType: NUMBER_OR,  callback: e => actionManager.do(getCreateNodeAction(NUMBER_OR,  btnNumber.div, getCreateOptions(e)))}),
        new MenuItem('Xor', {icon: iconXor, createType: NUMBER_XOR, callback: e => actionManager.do(getCreateNodeAction(NUMBER_XOR, btnNumber.div, getCreateOptions(e)))}),
        new MenuItem('Not', {icon: iconNot, createType: NUMBER_NOT, callback: e => actionManager.do(getCreateNodeAction(NUMBER_NOT, btnNumber.div, getCreateOptions(e)))})]);
        
    
    menuCondition = new Menu('Conditional', true, false);
    menuCondition.addItems([
        new MenuItem('Greater',          {icon: iconGreater,        createType: NUMBER_GREATER,          callback: e => actionManager.do(getCreateNodeAction(NUMBER_GREATER,          btnNumber.div, getCreateOptions(e)))}),
        new MenuItem('Greater or equal', {icon: iconGreaterOrEqual, createType: NUMBER_GREATER_OR_EQUAL, callback: e => actionManager.do(getCreateNodeAction(NUMBER_GREATER_OR_EQUAL, btnNumber.div, getCreateOptions(e)))}),
        new MenuItem('Equal',            {icon: iconEqual,          createType: NUMBER_EQUAL,            callback: e => actionManager.do(getCreateNodeAction(NUMBER_EQUAL,            btnNumber.div, getCreateOptions(e)))}),
        new MenuItem('Not equal',        {icon: iconNotEqual,       createType: NUMBER_NOT_EQUAL,        callback: e => actionManager.do(getCreateNodeAction(NUMBER_NOT_EQUAL,        btnNumber.div, getCreateOptions(e)))}),
        new MenuItem('Less or equal',    {icon: iconLessOrEqual,    createType: NUMBER_LESS_OR_EQUAL,    callback: e => actionManager.do(getCreateNodeAction(NUMBER_LESS_OR_EQUAL,    btnNumber.div, getCreateOptions(e)))}),
        new MenuItem('Less',             {icon: iconLess,           createType: NUMBER_LESS,             callback: e => actionManager.do(getCreateNodeAction(NUMBER_LESS,             btnNumber.div, getCreateOptions(e)))})]);
        
    
    menuTrig = new Menu('Trigonometric', true, false);
    menuTrig.addItems([
        new MenuItem('Sine',    {icon: iconSine,    createType: NUMBER_SIN, callback: e => actionManager.do(getCreateNodeAction(NUMBER_SIN, btnNumber.div, getCreateOptions(e)))}),
        new MenuItem('Cosine',  {icon: iconCosine,  createType: NUMBER_COS, callback: e => actionManager.do(getCreateNodeAction(NUMBER_COS, btnNumber.div, getCreateOptions(e)))}),
        new MenuItem('Tangent', {icon: iconTangent, createType: NUMBER_TAN, callback: e => actionManager.do(getCreateNodeAction(NUMBER_TAN, btnNumber.div, getCreateOptions(e)))})]);
        
    
    menuFunctions = new Menu('Functions', true, false);
    menuFunctions.addItems([
        new MenuItem('Constant',    {icon: iconConstant,    createType: NUMBER_CONSTANT, callback: e => actionManager.do(getCreateNodeAction(NUMBER_CONSTANT,    btnNumber.div, getCreateOptions(e)))}),
        new MenuItem('',            {separator: true}),
        new MenuItem('Sign',        {icon: iconSign,        createType: NUMBER_SIGN,     callback: e => actionManager.do(getCreateNodeAction(NUMBER_SIGN,        btnNumber.div, getCreateOptions(e)))}),
        new MenuItem('Absolute',    {icon: iconAbsolute,    createType: NUMBER_ABSOLUTE, callback: e => actionManager.do(getCreateNodeAction(NUMBER_ABSOLUTE,    btnNumber.div, getCreateOptions(e)))}),
        new MenuItem('Round',       {icon: iconRound,       createType: NUMBER_ROUND,    callback: e => actionManager.do(getCreateNodeAction(NUMBER_ROUND,       btnNumber.div, getCreateOptions(e)))}),
        new MenuItem('Min / max',   {icon: iconMinMax,      createType: NUMBER_MINMAX,   callback: e => actionManager.do(getCreateNodeAction(NUMBER_MINMAX,      btnNumber.div, getCreateOptions(e)))}),
        new MenuItem('Limits',      {icon: iconLimits,      createType: NUMBER_LIMITS,   callback: e => actionManager.do(getCreateNodeAction(NUMBER_LIMITS,      btnNumber.div, getCreateOptions(e)))})]);
        

    menuConvert = new Menu('Text', true, false);
    menuConvert.addItems([
        new MenuItem('Text to number',       {icon: iconTextToNumber,  createType: TEXT_TO_NUMBER, callback: e => actionManager.do(getCreateNodeAction(TEXT_TO_NUMBER, btnText.div, getCreateOptions(e)))}),
        new MenuItem('Number to text',       {icon: iconNumberToText,  createType: NUMBER_TO_TEXT, callback: e => actionManager.do(getCreateNodeAction(NUMBER_TO_TEXT, btnText.div, getCreateOptions(e)))}),
        new MenuItem('',                     {separator: true}),
        new MenuItem('Unicode to character', {icon: iconTextCharacter, createType: TEXT_CHAR,      callback: e => actionManager.do(getCreateNodeAction(TEXT_CHAR,      btnText.div, getCreateOptions(e)))})]);
    

    menuNumber = new Menu('Numbers', true, false);
    menuNumber.addItems([
                        new MenuItem('Number',             {icon: iconNumber,      createType: NUMBER, callback: e => actionManager.do(getCreateNodeAction(NUMBER,             btnNumber.div, getCreateOptions(e)))}),
                        new MenuItem('',                   {separator: true}),
                        new MenuItem('Basic',              {icon: iconRound,       childMenu: menuFunctions}),
                        new MenuItem('',                   {separator: true}),
                        new MenuItem('Math',               {icon: iconMath,        childMenu: menuMath,          createType: NUMBER_SIMPLE_MATH, callback: e => actionManager.do(getCreateNodeAction(NUMBER_SIMPLE_MATH, btnNumber.div, getCreateOptions(e)))}),
                        new MenuItem('Boolean',            {icon: iconBoolean,     /*childMenu: menuBoolean,  */ createType: NUMBER_BOOLEAN,     callback: e => actionManager.do(getCreateNodeAction(NUMBER_BOOLEAN,     btnNumber.div, getCreateOptions(e)))}),
                        new MenuItem('Conditional',        {icon: iconCondition,   /*childMenu: menuCondition,*/ createType: NUMBER_CONDITION,   callback: e => actionManager.do(getCreateNodeAction(NUMBER_CONDITION,   btnNumber.div, getCreateOptions(e)))}),
                        new MenuItem('Trigonometric',      {icon: iconSine,        /*childMenu: menuTrig,     */ createType: NUMBER_TRIG,        callback: e => actionManager.do(getCreateNodeAction(NUMBER_TRIG,        btnNumber.div, getCreateOptions(e)))}),
                        new MenuItem('',                   {separator: true}),
                        new MenuItem('Interpolate number', {icon: iconInterpolate, createType: NUMBER_INTERPOLATE, callback: e => actionManager.do(getCreateNodeAction(NUMBER_INTERPOLATE, btnNumber.div, getCreateOptions(e)))}),
        menuItemSolve = new MenuItem('Solve',              {icon: iconSolve,       createType: NUMBER_SOLVE,       callback: e => actionManager.do(getCreateNodeAction(NUMBER_SOLVE,       btnNumber.div, getCreateOptions(e)))}),
                        new MenuItem('',                   {separator: true}),
                        new MenuItem('Convert',            {icon: iconNumberToText, childMenu: menuConvert})]);
        
    
    menuString = new Menu('Text', true, false);
    menuString.addItems([
        new MenuItem('Text',                {icon: iconText,          createType: TEXT,           callback: e => actionManager.do(getCreateNodeAction(TEXT,           btnText.div, getCreateOptions(e)))}),
        new MenuItem('',                    {separator: true}),
        new MenuItem('Length',              {icon: iconTextLength,    createType: TEXT_LENGTH,    callback: e => actionManager.do(getCreateNodeAction(TEXT_LENGTH,    btnText.div, getCreateOptions(e)))}),
        new MenuItem('Compare',             {icon: iconTextCompare,   createType: TEXT_COMPARE,   callback: e => actionManager.do(getCreateNodeAction(TEXT_COMPARE,   btnText.div, getCreateOptions(e)))}),
        new MenuItem('Contains',            {icon: iconTextContains,  createType: TEXT_CONTAINS,  callback: e => actionManager.do(getCreateNodeAction(TEXT_CONTAINS,  btnText.div, getCreateOptions(e)))}),
        new MenuItem('',                    {separator: true}),
        new MenuItem('Trim',                {icon: iconTextTrim,      createType: TEXT_TRIM,      callback: e => actionManager.do(getCreateNodeAction(TEXT_TRIM,      btnText.div, getCreateOptions(e)))}),
        new MenuItem('Spl it',              {icon: iconTextSplit,     createType: TEXT_SPLIT,     callback: e => actionManager.do(getCreateNodeAction(TEXT_SPLIT,     btnText.div, getCreateOptions(e)))}),
        new MenuItem('Join',                {icon: iconTextJoin,      createType: TEXT_JOIN,      callback: e => actionManager.do(getCreateNodeAction(TEXT_JOIN,      btnText.div, getCreateOptions(e)))}),
        new MenuItem('Substring',           {icon: iconTextSubstring, createType: TEXT_SUBSTRING, callback: e => actionManager.do(getCreateNodeAction(TEXT_SUBSTRING, btnText.div, getCreateOptions(e)))}),
        new MenuItem('Case',                {icon: iconTextCase,      createType: TEXT_CASE,      callback: e => actionManager.do(getCreateNodeAction(TEXT_CASE,      btnText.div, getCreateOptions(e)))}),
        new MenuItem('Replace',             {icon: iconTextReplace,   createType: TEXT_REPLACE,   callback: e => actionManager.do(getCreateNodeAction(TEXT_REPLACE,   btnText.div, getCreateOptions(e)))}),
        new MenuItem('Pad',                 {icon: iconTextPad,       createType: TEXT_PAD,       callback: e => actionManager.do(getCreateNodeAction(TEXT_PAD,       btnText.div, getCreateOptions(e)))}),
        new MenuItem('',                    {separator: true}),
        new MenuItem('Parse CSV',           {icon: iconTextCSV,       createType: TEXT_CSV,       callback: e => actionManager.do(getCreateNodeAction(TEXT_CSV,       btnText.div, getCreateOptions(e)))}),
        new MenuItem('Parse JSON',          {icon: iconTextJson,      createType: TEXT_JSON,      callback: e => actionManager.do(getCreateNodeAction(TEXT_JSON,      btnText.div, getCreateOptions(e)))})]);
    

    menuColorStyle = new Menu('Color style', true, false);
    menuColorStyle.addItems([
        new MenuItem('Link existing...', {icon: iconColorStyleReplace, createType: COLOR_STYLE, callback: e => actionManager.do(getCreateNodeAction(COLOR_STYLE,  btnColor.div, getCreateOptions(e, {existing: true})))})]);

        
    menuColor = new Menu('Colors', true, true);
    menuColor.addItems([
        menuItemColor        = new MenuItem('Color',             {icon: iconColor,            callback: e => actionManager.do(getCreateNodeAction(COLOR,             btnColor.div, getCreateOptions(e,  {random: e.altKey && !getCtrlKey(e)})))}),
                               new MenuItem('',                  {separator: true}),
                               new MenuItem('Valid sRGB',        {icon: iconValidColor,       callback: e => actionManager.do(getCreateNodeAction(VALID_COLOR,       btnColor.div, getCreateOptions(e)))}),
        menuItemCorrectColor = new MenuItem('Correct color',     {icon: iconCorrectColor,     callback: e => actionManager.do(getCreateNodeAction(CORRECT_COLOR,     btnColor.div, getCreateOptions(e)))}),
        menuItemColorSep1    = new MenuItem('',                  {separator: true}),
                               new MenuItem('Web contrast',      {icon: iconWebContrast,      callback: e => actionManager.do(getCreateNodeAction(COLOR_CONTRAST,    btnColor.div, getCreateOptions(e)))}),
        menuItemColorblind   = new MenuItem('Colorblind',        {icon: iconColorblind,       callback: e => actionManager.do(getCreateNodeAction(COLORBLIND,        btnColor.div, getCreateOptions(e)))}),
                               new MenuItem('',                  {separator: true}),
                               new MenuItem('Interpolate color', {icon: iconColorInterpolate, callback: e => actionManager.do(getCreateNodeAction(COLOR_INTERPOLATE, btnColor.div, getCreateOptions(e)))}),
        menuItemColorBlend   = new MenuItem('Blend color',       {icon: iconColorBlend,       callback: e => actionManager.do(getCreateNodeAction(COLOR_BLEND,       btnColor.div, getCreateOptions(e)))})]);

    menuColor.init = () => 
    {
        menuItemColor.setIcon(iconColor);
    };

    
    menuEffects = new Menu('Effects', true, false);
    menuEffects.addItems([
        menuItemLayerDropShadow  = new MenuItem('Drop shadow',     {icon: iconDropShadow,  callback: e => actionManager.do(getCreateNodeAction(DROP_SHADOW,  btnLayer.div, getCreateOptions(e)))}),
        menuItemLayerInnerShadow = new MenuItem('Inner shadow',    {icon: iconInnerShadow, callback: e => actionManager.do(getCreateNodeAction(INNER_SHADOW, btnLayer.div, getCreateOptions(e)))}),
        menuItemLayerLayerBlur   = new MenuItem('Layer blur',      {icon: iconLayerBlur,   callback: e => actionManager.do(getCreateNodeAction(LAYER_BLUR,   btnLayer.div, getCreateOptions(e)))}),
        menuItemLayerBackBlur    = new MenuItem('Background blur', {icon: iconBackBlur,    callback: e => actionManager.do(getCreateNodeAction(BACK_BLUR,    btnLayer.div, getCreateOptions(e)))})]);
    
    
    menuStyles = new Menu('Styles', true, false);
    menuStyles.addItems([
        new MenuItem('Color style', {icon: iconColorStyle, createType: START, callback: e => actionManager.do(getCreateNodeAction(COLOR_STYLE, btnLayer.div, getCreateOptions(e, {existing: true})))})]);
    
    
    menuVariables = new Menu('Variables', true, false);
    menuVariables.addItems([
        new MenuItem('Number', {icon: iconVarNumber, createType: START, callback: e => actionManager.do(getCreateNodeAction(VAR_NUMBER, btnLayer.div, getCreateOptions(e, {existing: true})))})]);
    
    
    menuLayer = new Menu('Style', true, false);
    menuLayer.addItems([
        menuItemLayerFill        = new MenuItem('Fill',            {icon: iconFill,        callback: e => actionManager.do(getCreateNodeAction(FILL,       btnLayer.div, getCreateOptions(e)))}),
                                   new MenuItem('Gradient',        {icon: iconGradient,    callback: e => actionManager.do(getCreateNodeAction(GRADIENT,   btnLayer.div, getCreateOptions(e)))}),
                                   new MenuItem('Color stop',      {icon: iconColorStop,   callback: e => actionManager.do(getCreateNodeAction(COLOR_STOP, btnLayer.div, getCreateOptions(e)))}),
        menuItemLayerStroke      = new MenuItem('Stroke',          {icon: iconStroke,      callback: e => actionManager.do(getCreateNodeAction(STROKE,     btnLayer.div, getCreateOptions(e)))}),
        menuItemLayerSep1        = new MenuItem('',                {separator: true}),
                                   new MenuItem('Apply style',     {icon: iconApply, createType: SHAPE_APPLY, callback: e => actionManager.do(getCreateNodeAction(SHAPE_APPLY, btnLayer.div, getCreateOptions(e)))}),
                                   new MenuItem('',                {separator: true}),
                                   new MenuItem('Effects',         {icon: iconEffects, childMenu: menuEffects}),
                                   new MenuItem('Styles',          {icon: iconStyle, childMenu: menuStyles}),
                                   //new MenuItem('Variables',       {childMenu: menuVariables}),
                                   new MenuItem('',                {separator: true}),
                                   new MenuItem('Mask',            {icon: iconMask,        callback: e => actionManager.do(getCreateNodeAction(LAYER_MASK, btnLayer.div, getCreateOptions(e)))})]);
    
    
    menuVector = new Menu('Vector', true, false);
    menuVector.addItems([
        new MenuItem('Point',             {icon: iconPoint,            createType: POINT,             callback: e => actionManager.do(getCreateNodeAction(POINT,             btnShape.div, getCreateOptions(e)))}),
        new MenuItem('Vector path',       {icon: iconVectorPath,       createType: VECTOR_PATH,       callback: e => actionManager.do(getCreateNodeAction(VECTOR_PATH,       btnShape.div, getCreateOptions(e)))}),
        new MenuItem('',                  {separator: true}),
        new MenuItem('Interpolate point', {icon: iconInterpolatePoint, createType: INTERPOLATE_POINT, callback: e => actionManager.do(getCreateNodeAction(INTERPOLATE_POINT, btnShape.div, getCreateOptions(e)))}),
        //new MenuItem('Point on path',     {icon: iconPointOnPath,      createType: POINT_ON_PATH,     callback: e => actionManager.do(getCreateNodeAction(POINT_ON_PATH,     btnShape.div, getCreateOptions(e)))}),
        new MenuItem('',                  {separator: true}),
        new MenuItem('Measure points',    {icon: iconMeasurePoints,    createType: MEASURE_POINTS,    callback: e => actionManager.do(getCreateNodeAction(MEASURE_POINTS,    btnShape.div, getCreateOptions(e)))})]);
        // new MenuItem('',        {separator: true}),
        // new MenuItem('Vertex',  {icon: iconVectorVertex,  createType: START, callback: e => actionManager.do(getCreateNodeAction(VECTOR_VERTEX,  btnShape.div, getCreateOptions(e)))}),
        // new MenuItem('Edge',    {icon: iconVectorEdge,    createType: START, callback: e => actionManager.do(getCreateNodeAction(VECTOR_EDGE,    btnShape.div, getCreateOptions(e)))}),
        // new MenuItem('Region',  {icon: iconVectorRegion,  createType: START, callback: e => actionManager.do(getCreateNodeAction(VECTOR_REGION,  btnShape.div, getCreateOptions(e)))}),
        // new MenuItem('Network', {icon: iconVectorNetwork, createType: START, callback: e => actionManager.do(getCreateNodeAction(VECTOR_NETWORK, btnShape.div, getCreateOptions(e)))})]);


    menuShapes = new Menu('Shapes', true, false);
    menuShapes.addItems([
        new MenuItem('Rectangle',  {icon: iconRectangle,  createType: RECTANGLE,  callback: e => actionManager.do(getCreateNodeAction(RECTANGLE,  btnShape.div, getCreateOptions(e)))}),
        new MenuItem('Line',       {icon: iconLine,       createType: LINE,       callback: e => actionManager.do(getCreateNodeAction(LINE,       btnShape.div, getCreateOptions(e)))}),
        new MenuItem('Ellipse',    {icon: iconEllipse,    createType: ELLIPSE,    callback: e => actionManager.do(getCreateNodeAction(ELLIPSE,    btnShape.div, getCreateOptions(e)))}),
        new MenuItem('Trapeze',    {icon: iconTrapeze,    createType: TRAPEZE,    callback: e => actionManager.do(getCreateNodeAction(TRAPEZE,    btnShape.div, getCreateOptions(e)))}),
        new MenuItem('Polygon',    {icon: iconPolygon,    createType: POLYGON,    callback: e => actionManager.do(getCreateNodeAction(POLYGON,    btnShape.div, getCreateOptions(e)))}),
        new MenuItem('Star',       {icon: iconStar,       createType: STAR,       callback: e => actionManager.do(getCreateNodeAction(STAR,       btnShape.div, getCreateOptions(e)))}),
        new MenuItem('Text shape', {icon: iconTextShape,  createType: TEXT_SHAPE, callback: e => actionManager.do(getCreateNodeAction(TEXT_SHAPE, btnShape.div, getCreateOptions(e)))})]);


    menuTransform = new Menu('Transform', true, false);
    menuTransform.addItems([
        new MenuItem('Move',       {icon: iconMove,             createType: MOVE,              callback: e => actionManager.do(getCreateNodeAction(MOVE,              btnShape.div, getCreateOptions(e)))}),
        new MenuItem('Rotate',     {icon: iconRotate,           createType: ROTATE,            callback: e => actionManager.do(getCreateNodeAction(ROTATE,            btnShape.div, getCreateOptions(e)))}),
        new MenuItem('Scale',      {icon: iconScale,            createType: SCALE,             callback: e => actionManager.do(getCreateNodeAction(SCALE,             btnShape.div, getCreateOptions(e)))}),
        new MenuItem('Skew',       {icon: iconSkew,             createType: SKEW,              callback: e => actionManager.do(getCreateNodeAction(SKEW,              btnShape.div, getCreateOptions(e)))}),
        new MenuItem('',           {separator: true}),
        new MenuItem('Place',      {icon: iconPlace,            createType: PLACE,             callback: e => actionManager.do(getCreateNodeAction(PLACE,             btnShape.div, getCreateOptions(e)))}),
        new MenuItem('',           {separator: true}),
        new MenuItem('Center',     {icon: iconCenter,           createType: CENTER,            callback: e => actionManager.do(getCreateNodeAction(CENTER,            btnShape.div, getCreateOptions(e)))}),
        new MenuItem('Reset',      {icon: iconResetXform,       createType: RESET_XFORM,       callback: e => actionManager.do(getCreateNodeAction(RESET_XFORM,       btnShape.div, getCreateOptions(e)))})]);


    menuShape = new Menu('Shapes', true, false);
    menuShape.addItems([
        // menuItemShapeSelected = new MenuItem('Selected objects...', {icon: iconSelected,   enabled: false}),
                             // new MenuItem('',            {separator: true}),
                                new MenuItem('Shapes',            {icon: iconShapes,        childMenu: menuShapes}),
                                new MenuItem('Vector',            {icon: iconVectorNetwork, childMenu: menuVector}),
                                new MenuItem('',                  {separator: true}),
                                new MenuItem('Frame',             {icon: iconFrame,      createType: FRAME,       callback: e => actionManager.do(getCreateNodeAction(FRAME,       btnShape.div, getCreateOptions(e)))}),
                                //new MenuItem('Group',             {icon: iconShapeGroup, createType: SHAPE_GROUP, callback: e => actionManager.do(getCreateNodeAction(SHAPE_GROUP, btnShape.div, getCreateOptions(e)))}),
                             // new MenuItem('Boolean',           {enabled: false, icon: iconBoolUnion,  callback: e => actionManager.do(getCreateNodeAction(BOOLEAN,     btnShape.div, getCreateOptions(e)))}),
        menuItemShapeSep1     = new MenuItem('',                  {separator: true}),
                                new MenuItem('Transform',         {icon: iconMove, childMenu: menuTransform}),
                                new MenuItem('',                  {separator: true}),
                                new MenuItem('Render',            {icon: iconRenderDown, createType: RENDER, callback: e => actionManager.do(getCreateNodeAction(RENDER,       btnShape.div, getCreateOptions(e)))})]);


    menuTemplate = new Menu('Templates', true, false);
    menuTemplate.init = e => 
    {
        uiQueueMessageToFigma({cmd: 'figGetAllLocalTemplateNames'});
        e.cancel = true;
    };


    menuItemManageTemplates = new MenuItem('Manage templates...', {icon: iconManageTemplates});


    menuGroup = new Menu('Groups', true, false);
    menuGroup.addItems([
        new MenuItem('Group',     {icon: iconGroupNode,  createType: GROUP_NODE, callback: e => actionManager.do(getCreateNodeAction(GROUP_NODE,  btnGroup.div, getCreateOptions(e)))}),
        new MenuItem('Parameter', {icon: iconGroupParam, createType: GROUP_PARAM, callback: e => actionManager.do(getCreateNodeAction(GROUP_PARAM, btnGroup.div, getCreateOptions(e)))})]);
    

    menuWindow = new Menu('Window options', true, false);
    menuWindow.showOnLeft = true;
    menuWindow.addItems([
        menuItemWindowNormal   = new MenuItem('Normal',   {icon: iconWindowNormal,     shortcut: osAlt() + '0', callback: () => dockWindowNormal  ()}),
        menuItemWindowMaximize = new MenuItem('Maximize', {icon: iconWindowMaximize,   shortcut: osAlt() + '8', callback: () => dockWindowMaximize()}),
        menuItemWindowTop      = new MenuItem('Top',      {icon: iconWindowDockTop,    shortcut: osAlt() + '5', callback: () => dockWindowTop     ()}),
        menuItemWindowLeft     = new MenuItem('Left',     {icon: iconWindowDockLeft,   shortcut: osAlt() + '1', callback: () => dockWindowLeft    ()}),
        menuItemWindowRight    = new MenuItem('Right',    {icon: iconWindowDockRight,  shortcut: osAlt() + '3', callback: () => dockWindowRight   ()}),
        menuItemWindowBottom   = new MenuItem('Bottom',   {icon: iconWindowDockBottom, shortcut: osAlt() + '2', callback: () => dockWindowTop     ()})]);


    menuPage = new Menu('Page menu', false, false);
    menuPage.addItems([
        new MenuItem('Duplicate', {enabled: false, callback: () => {}}),
        new MenuItem('Rename',    {enabled: false, callback: () => {}})]);

        
    menuZoom = new Menu('Zoom/view options');
    menuZoom.combineChecksAndIcons = true;
    menuZoom.addItems([
                            new MenuItem('Zoom in',      {shortcut: osCtrl () + '+', callback: () => graph.currentPage.zoom *= Math.pow(2, 1/2)}),
                            new MenuItem('Zoom out',     {shortcut: osCtrl () + '-', callback: () => graph.currentPage.zoom /= Math.pow(2, 1/2)}),
                            new MenuItem('Zoom to fit',  {shortcut: osShift() + '1', callback: () => graphView.zoomToFit()}),
        menuItemZoomTo100 = new MenuItem('Zoom to 100%', {shortcut: osCtrl () + '0', callback: () => graph.currentPage.zoom = 1})]);//,
                        //  new MenuItem('',             {separator: true}),
                        //  new MenuItem('Window',       {childMenu: menuWindow})]);

        
    menuGraph = new Menu('Graph menu', false, false);
    menuGraph.addItems([
        menuItemGraphPaste          = new MenuItem('Paste here',       {shortcut: osCtrl()      + 'V', callback: e => { hideAllMenus(); graphView.pasteCopiedNodes(false, e.clientX, e.clientY - getTopHeight()); }}),
        menuItemGraphPasteConnected = new MenuItem('Paste connected',  {shortcut: osCtrlShift() + 'V', callback: e => { hideAllMenus(); graphView.pasteCopiedNodes(true,  e.clientX, e.clientY - getTopHeight()); }}),
                                      new MenuItem('',                 {separator: true}),
                                      new MenuItem('Quick actions...', {shortcut: osCtrl() + '/',      callback: () => showSearchBox() })]);

    menuGraph.init = () => 
    {
        menuItemGraphPaste         .setEnabled(copiedNodesJson != '');
        menuItemGraphPasteConnected.setEnabled(copiedNodesJson != '');
    };


    menuNodeHighlight = new Menu('Highlight nodes menu', false, false);
    menuNodeHighlight.addItems([
        new ColorListMenuItem({callback: color => { hideAllMenus(); setNodeHighlight(graphView.selectedNodes, color); }})]);

    menuNodeSelect = new Menu('Select nodes menu', false, false);
    menuNodeSelect.addItems([
        new MenuItem('Select left',   {shortcut:  isMac ? osShift() + osAlt ()            : osShift() + osCtrl(false)          , callback: () => graphView.selectedNodes = [graphView.selectedNodes[0], ...getNodesBeforeNode(graphView.selectedNodes[0])] }),
        new MenuItem('Select right',  {shortcut:  isMac ? osShift() + osCtrl()            : osShift() + osAlt (false)          , callback: () => graphView.selectedNodes = [graphView.selectedNodes[0], ...getNodesAfterNode (graphView.selectedNodes[0])] }),
        new MenuItem('Select across', {shortcut:  isMac ? osAlt  () + osCtrl()            : osCtrl () + osAlt (false)          , callback: () => graphView.selectedNodes = [graphView.selectedNodes[0], ...getNodesAcrossNode(graphView.selectedNodes[0])] }),
        new MenuItem('Select tree',   {shortcut:  isMac ? osShift() + osAlt () + osCtrl() : osShift() + osCtrl() + osAlt(false), callback: () => graphView.selectedNodes =                                 getAllNodesFromNode(graphView.selectedNodes[0]) })]);


    menuNodeCopyAs = new Menu('Copy nodes menu', false, false);
    menuNodeCopyAs.addItems([
        //menuItemNodeCopyAsJsCode       = new MenuItem('Copy as JS code',     {shortcut:  osCtrlShift() + 'C',            callback: () => graphView.copySelectedNodesAsJsCode()     }),
        menuItemNodeCopyAsJsFunction   = new MenuItem('Copy as Javascript', {shortcut:  osCtrlShift() /*+ osAlt()*/ + 'C',  callback: () => graphView.copySelectedNodesAsJavascript() })]);


    menuNode = new Menu('Node menu', false, false);
    menuNode.addItems([
        //menuItemNodeEditGroup      = new MenuItem('Edit group...',   {callback: e => { hideAllMenus(); editSelectedGroup(); }}),
        //menuItemNodeSep1           = new MenuItem('',                {separator: true}),
        menuItemNodeCopy           = new MenuItem('Copy',            {shortcut:  osCtrl() + 'C',       callback: () => graphView.copySelectedNodes() }),
        menuItemNodePaste          = new MenuItem('Paste here',      {shortcut:  osCtrl() + 'V',       callback: e => { hideAllMenus(); graphView.pasteCopiedNodes(false); }}),
        menuItemNodePasteConnected = new MenuItem('Paste connected', {shortcut:  osCtrlShift() + 'D',  callback: e => { hideAllMenus(); graphView.pasteCopiedNodes(true ); }}),
        //                                 new MenuItem('Copy/Paste as',   {childMenu: menuNodeCopyAs}),
        menuItemNodeLayoutSep      = new MenuItem('',                {separator: true}),
        menuItemNodeLayout         = new MenuItem('Layout',          {shortcut: osCtrlShift() + 'L', callback: e => { hideAllMenus(); layoutSelectedNodes(); }}),
        // menuItemNodeSepGroup       = new MenuItem('',                {separator: true}),
        //menuItemNodeGroupSelected  = new MenuItem('Group selected',  {shortcut:  osCtrl() + 'G',       callback: e => { hideAllMenus(); actionManager.do(new   GroupNodesAction(graphView.selectedNodes)); }}),
        //menuItemNodeUngroup        = new MenuItem('Ungroup',         {                                 callback: e => { hideAllMenus(); actionManager.do(new UngroupNodesAction(graphView.selectedNodes)); }}),
        menuItemNodeSep2           = new MenuItem('',                 {separator: true}),
        menuItemNodeRename         = new MenuItem('Rename',           {shortcut:  osCtrl() + 'R',       callback: e => { hideAllMenus(); graphView.renameSelectedNode(); }}),
        menuItemNodeHighlight      = new MenuItem('Highlight',        {childMenu: menuNodeHighlight}),
        menuItemNodeSelect         = new MenuItem('Select',           {childMenu: menuNodeSelect}),
        menuItemNodeSep3           = new MenuItem('',                 {separator: true}),
        // menuItemNodeEdit           = new MenuItem('Edit...',       {callback: e => { hideAllMenus(); graphView.editSelectedCustomNode(); }}),
                                    //  new MenuItem('',              {separator: true}),
        // menuItemNodeSaveAsTemplate = new MenuItem('Save as template', {callback: e => { hideAllMenus(); showSaveAsTemplateDialog(); }}),
        //                              new MenuItem('',                 {separator: true}),
        // menuItemNodeActivate    = new MenuItem('Activate',         {callback: () => makeSelectedNodesActive()}),
        menuItemNodeEnableDisable  = new MenuItem('Enable/Disable',   {shortcut:  osCtrlShift() + 'E',  callback: () => actionManager.do(new ToggleDisableNodesAction(graphView.selectedNodes.map(n => n.id)))}),
        menuItemNodeSep4           = new MenuItem('',                 {separator: true}),
        menuItemNodeRemove         = new MenuItem('Remove',           {shortcut:  osCtrl() + '⌫',      callback: e => { hideAllMenus(); graphView.removeSelectedNodes(true); }})]);



    menuNode.init = () => 
    {
        const single     = graphView.selectedNodes.length == 1;
        const hasObjects = isEmpty(graphView.selectedNodes.filter(n => !SHAPE_TYPES.includes(n.type)));
        const hasGroups  = isEmpty(graphView.selectedNodes.filter(n => n.type != GROUP_NODE));
        

        //const parallel = nodesAreParallel(graphView.selectedNodes);

        const canDisable = !graphView.selectedNodes.find(n => !n.canDisable);


        //updateElementDisplay(menuItemNodeEditGroup    .div, hasGroups && single);
        //updateElementDisplay(menuItemNodeSepGroup     .div, hasGroups && single);
        //updateElementDisplay(menuItemNodeUngroup      .div, hasGroups);
        //updateElementDisplay(menuItemNodeSep2         .div, single);
        updateElementDisplay(menuItemNodeRename       .div, single);
        updateElementDisplay(menuItemNodeLayoutSep    .div, !single);
        updateElementDisplay(menuItemNodeLayout       .div, !single);
        //updateElementDisplay(menuItemNodeEdit       .div, single);
        updateElementDisplay(menuItemNodeSep2         .div, single);
        updateElementDisplay(menuItemNodeSelect       .div, single);
        updateElementDisplay(menuItemNodeSep4         .div, canDisable);
        updateElementDisplay(menuItemNodeEnableDisable.div, canDisable);
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


    menuLocalStyles = new Menu('Local styles',   true,  true);
    menuSelectParam = new Menu('Select options', false, true);

    
    btnMain     = new MenuButton('', menuMain,     {useMenuName: true, highlight: () => currentMenus.includes(menuMain  ), callback: () => updatePanMode(false)});
    btnFlow     = new MenuButton('', menuFlow,     {useMenuName: true, highlight: () => currentMenus.includes(menuFlow  ), callback: () => updatePanMode(false)});
    btnData     = new MenuButton('', menuData,     {useMenuName: true, highlight: () => currentMenus.includes(menuData  ), callback: () => updatePanMode(false)});
    btnSets     = new MenuButton('', menuSets,     {useMenuName: true, highlight: () => currentMenus.includes(menuSets  ), callback: () => updatePanMode(false)});
    btnNumber   = new MenuButton('', menuNumber,   {useMenuName: true, highlight: () => currentMenus.includes(menuNumber), callback: () => updatePanMode(false)});
    btnText     = new MenuButton('', menuString,   {useMenuName: true, highlight: () => currentMenus.includes(menuString), callback: () => updatePanMode(false)});
    btnColor    = new MenuButton('', menuColor,    {useMenuName: true, highlight: () => currentMenus.includes(menuColor ), callback: () => updatePanMode(false)});
    btnLayer    = new MenuButton('', menuLayer,    {useMenuName: true, highlight: () => currentMenus.includes(menuLayer ), callback: () => updatePanMode(false)});
    //btnStyle  = new MenuButton('', menuStyle,    {useMenuName: true, highlight: () => currentMenus.includes(menuStyle ), callback: () => updatePanMode(false)});
    btnShape    = new MenuButton('', menuShape,    {useMenuName: true, highlight: () => currentMenus.includes(menuShape ), callback: () => updatePanMode(false)});
   // btnTemplate = new MenuButton('', menuTemplate, {useMenuName: true, highlight: () => currentMenus.includes(menuShape ), callback: () => updatePanMode(false)});
    //btnGroup  = new MenuButton('', menuGroup,  {useMenuName: true, highlight: () => currentMenus.includes(menuShape ), callback: () => updatePanMode(false)});

    // btnGroup  = new MenuButton('Node groups', null, {callback: () => 
    // {
    //     const create = new CreateNodeAction(OUP, btnGroup.div);
    //     actionManager.do(create);

    //     graphView.updateNodes([create.node]);
    //     graphView.updateScrollWithBounds();

    //     updatePanMode(false);
    // }});
    
    btnHand = new MenuButton('Hand tool', null, {callback: () => 
    { 
        updatePanMode(!panMode);
    }});

    btnComment = new MenuButton('Add comment', null, {callback: () => 
    {
        const create = new CreateNodeAction(COMMENT, btnComment.div);
        actionManager.do(create);

        graphView.updateNodes([create.node]);
        graphView.updateScrollWithBounds();

        updatePanMode(false);
    }});


    //menuBar.appendChild(createDiv('', 'groupName'));


    btnPage = new MenuButton(
        '-', 
        menuPage, 
        {
            afterLabel:  true,
            useMenuName: false,
            noHighlight: true
        });

    btnPage.divIcon.style.width   = 4;
    
    btnPage.div.style.marginRight = 'auto';
    
    btnPage.div.style.position    = 'relative';
    btnPage.div.style.left        = '-26px';



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

        
    btnZoom.div.appendChild(createDiv('', 'zoomIconOverlay'));

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
    btnSets    .setIcon(iconSequence);
    btnMain    .setIcon(iconGenerator);
    btnColor   .setIcon(iconVarColor);
    btnLayer   .setIcon(iconEffects);
    btnShape   .setIcon(iconShapes);
    //btnStyle  .setIcon(iconStyle);
    //btnGroup  .setIcon(iconGroup);
    //btnTemplate.setIcon(iconTemplate);
    btnHand    .setIcon(iconHand);
    btnComment .setIcon(iconComment);


    menuBarMenus = 
    [
        // menuMainFile,
        // menuMainPreferences,
        // menuMainDebug,
        // menuMainHelp,
        menuFlow,
        menuData,
        menuSets,
        menuNumber,
        menuFunctions,
        menuMath,
        menuConvert,
        menuString,
        menuColor,
        menuLayer,
        menuEffects,
        menuStyles,
        menuShape,
        menuShapes,
        menuVector,
        menuTransform
    ];
}



function initDataModeMenus()
{
    menuPageData = new Menu('Pages menu', false, false);
    menuPageData.addItems([
        // new MenuItem('Delete all pages',  { enabled: false, callback: () => { hideAllMenus(); dataModeDeleteAllPages(); }}),
        // new MenuItem('',                  { enabled: false, separator: true }),
        new MenuItem('Delete page',       { callback: () => { hideAllMenus(); dataModeDeletePage(menuPageData._div.page); }})]);


    menuPageDataPages = new Menu('Pages menu', false, false);
    menuPageDataPages.addItems([
        new MenuItem('Expand all',       { callback: () => { hideAllMenus(); expandAllPageData();   }}),
        new MenuItem('Collapse all',     { callback: () => { hideAllMenus(); collapseAllPageData(); }}),
        new MenuItem('',                 { separator: true }),
        new MenuItem('Delete all pages', { callback: () => { hideAllMenus(); dataModeDeleteAllPages(); }})]);


    menuNodeData = new Menu('Node menu', false, false);
    menuNodeData.addItems([
        new MenuItem('Remove path from ID',     { callback: () => { hideAllMenus(); dataModeDeletePathFromNodeId(menuNodeData._div.node); }}),
        new MenuItem('',                        { separator: true }),
        new MenuItem('Delete connections from', { callback: () => { hideAllMenus(); dataModeDeleteConnectionsFromNode     (menuNodeData._div.node); }}),
        new MenuItem('Delete connections to'  , { callback: () => { hideAllMenus(); dataModeDeleteConnectionsToNode       (menuNodeData._div.node); }}),
        new MenuItem('Delete all connections',  { callback: () => { hideAllMenus(); dataModeDeleteConnectionsToAndFromNode(menuNodeData._div.node); }}),
        new MenuItem('',                        { separator: true }),
        new MenuItem('Delete node',             { callback: () => { hideAllMenus(); dataModeDeleteNode(menuNodeData._div.node); }})]);


    menuNodeDataNodes = new Menu('Nodes menu', false, false);
    menuNodeDataNodes.addItems([
        new MenuItem('Expand all',       { callback: () => { hideAllMenus(); expandAllNodeData();   }}),
        new MenuItem('Collapse all',     { callback: () => { hideAllMenus(); collapseAllNodeData(); }}),
        new MenuItem('',                 { separator: true }),
        new MenuItem('Delete all nodes', { callback: () => { hideAllMenus(); dataModeDeleteAllNodes(); }})]);


    menuConnData = new Menu('Connection menu', false, false);
    menuConnData.addItems([
        new MenuItem('Delete connection', { callback: () => { hideAllMenus(); dataModeDeleteConnection(menuConnData._div.conn); }})]);


    menuConnDataConns = new Menu('Connections menu', false, false);
    menuConnDataConns.addItems([
        new MenuItem('Expand all',               { callback: () => { hideAllMenus(); expandAllConnData();   }}),
        new MenuItem('Collapse all',             { callback: () => { hideAllMenus(); collapseAllConnData(); }}),
        new MenuItem('',                         { separator: true }),
        // new MenuItem('List all connection keys', { callback: () => { hideAllMenus(); uiQueueMessageToFigma({cmd: 'figLogAllSavedConnKeys', darkMode: darkMode}); }}),
        // new MenuItem('',                         { separator: true }),
        new MenuItem('Delete all connections',   { callback: e => { hideAllMenus(); dataModeDeleteAllConnections(); }})]);
}



function initTextMenu(textbox)
{
    menuText.clearItems();

    menuText.addItems([
        new MenuItem('Cut',   {enabled: !textbox.control || !textbox.control.readOnly, callback: () => { hideAllMenus(); document.execCommand('cut'); }}),
        new MenuItem('Copy',  {                                                        callback: () => { hideAllMenus(); document.execCommand('copy'); }}),
        new MenuItem('Paste', {enabled: !textbox.control || !textbox.control.readOnly, callback: () => { hideAllMenus(); document.execCommand('paste'); }})]);
}



function initCopyMenu()
{
    menuCopy.clearItems();

    menuCopy.addItems([
        new MenuItem('Copy',       {enabled: elementHasSelectedText(crashDialogBody), callback: () => { hideAllMenus(); document.execCommand('copy'); }}),
        new MenuItem('',           {separator: true }),
        new MenuItem('Select all', {callback: () => { hideAllMenus(); selectDivText(crashDetails); }})]);
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
                          new MenuItem('Cut',          { enabled: !textbox.control.readOnly, callback: () => { hideAllMenus(); document.execCommand('cut'); }}),
                          new MenuItem('Copy',         {                                     callback: () => { hideAllMenus(); document.execCommand('copy'); }}),
                          new MenuItem('Paste',        { enabled: !textbox.control.readOnly, callback: () => { hideAllMenus(); document.execCommand('paste'); }}),
                          new MenuItem('',             { separator: true }),
        menuItemLeft    = new MenuItem('Align left',   { callback: () => { hideAllMenus(); actionManager.do(new SetParamSettingAction(param, 'align', 'left'   )); }}),
        menuItemCenter  = new MenuItem('Align center', { callback: () => { hideAllMenus(); actionManager.do(new SetParamSettingAction(param, 'align', 'center' )); }}),
        menuItemRight   = new MenuItem('Align right',  { callback: () => { hideAllMenus(); actionManager.do(new SetParamSettingAction(param, 'align', 'right'  )); }}),
        menuItemJustify = new MenuItem('Justify',      { callback: () => { hideAllMenus(); actionManager.do(new SetParamSettingAction(param, 'align', 'justify')); }})]);


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
}



function getCreateOptions(e, opt = {})
{
    return {
        insert:      e.ctrlKey,
        autoConnect: e.ctrlKey && e.altKey,
        ...opt
    };
}