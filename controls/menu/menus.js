var btnMain;
var btnFlow;
var btnNumber;
var btnString;
var btnColor;
var btnStyle;
var btnShape;
var btnCustom;
var btnHand;
var btnComment;
var btnZoom;


var menuMain;
var menuMainPreferences;
var menuMainMinZoomForParams;
var menuMainDebug;
var menuMainHelp;

var menuDebugLog;

var menuFlow;
var menuNumber;
var menuString;
var menuColor;
var menuColorStyle;
var menuStyle;
var menuShape;

var menuMath;
var menuBoolean;
var menuCondition;


var menuZoom;
var menuWindow;


var menuGraph;
var menuNode;
var menuNodeSelect;


var menuLocalStyles;
var menuSelectParam;

var menuRemoveLicense;


var menuNodeData;
var menuNodeDataNodes;
var menuConnData;
var menuConnDataConns;


var menuItemAutoConnectNewNodes;
var menuItemEnableZoomedOutParams;
var menuItemMinZoomForParams;
var menuItemShowAllColorSpaces;
var menuItemShowBoolValues;
var menuItemShowOperationResults;
var menuItemShowClearUndoWarning;
var menuItemShowDebugMenu;

var menuItemShowNodeId;

var menuItemDebug;
var menuItemDebugLog;

var menuItemHelp;


var menuItemEnableBetaFeatures;


var menuItemIfElse;
var menuSep1;      
var menuItemStart; 
var menuItemRepeat;
var menuSep2;      
var menuItemCache; 
var menuItemCopy;  

var menuItemSeries;


var menuItemColor;
var menuItemCorrectColor;


var menuItemStyleFill;
var menuItemStyleStroke;
var menuItemStyleSep1;


var menuItemDataMode;

var menuItemLogMessages;
var menuItemLogActions;
var menuItemLogLoading;
var menuItemLogRequests;
var menuItemLogValueUpdates;
var menuItemLogObjectUpdates;
var menuItemLogStyleUpdates;
var menuItemLogRawLoading;
var menuItemLogRawSaving;
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

var menuItemNodeCopy;
var menuItemNodeDuplicate;
var menuItemNodeDuplicateConnected;
var menuItemNodeRemove;
var menuItemNodeLayout;
var menuItemNodeSep1;
var menuItemNodeRename;
var menuItemNodeSep2;
var menuItemNodeSelect;
// var menuItemNodeBringToFront;
// var menuItemNodeSendToBack;
var menuItemNodeActivate;
var menuItemNodeEnableDisable;

var menuItemLicenseSep1;
var menuItemLicenseRemove;



function initGeneratorMenus()
{
    // menuMainMinZoomForParams = new Menu('Min zoom for params', false);
    // menuMainMinZoomForParams.addItems([
    //     menuItemMinZoomForParams = new MenuItem('Smallest adjustment zoom...', {callback: () => showMinZoomDialog()})]);


    menuMainPreferences = new Menu('Preferences', false);
    menuMainPreferences.addItems([
        menuItemShowAllColorSpaces    = new MenuItem('Show all color spaces',        {checkCallback: () => settings.showAllColorSpaces,    callback: () => { updateSettingAndMenu('showAllColorSpaces',    true, !settings.showAllColorSpaces);    updateMenuItemShowAllColorSpaces();   }}),
                                        new MenuItem('',                             {separator: true}),    
        menuItemAutoConnectNewNodes   = new MenuItem('Auto-connect new nodes',       {checkCallback: () => settings.autoConnectNewNodes,   callback: () => { updateSettingAndMenu('autoConnectNewNodes',   true, !settings.autoConnectNewNodes);                                         }}),
      //menuItemEnableZoomedOutParams = new MenuItem('',                             {checkCallback: () => settings.enableZoomedOutParams, callback: () => { updateSettingAndMenu('enableZoomedOutParams', true, !settings.enableZoomedOutParams); }, childMenu: menuMainMinZoomForParams}),
        menuItemShowOperationResults  = new MenuItem('Show operation results',       {checkCallback: () => settings.showOperationResults,  callback: () => { updateSettingAndMenu('showOperationResults',  true, !settings.showOperationResults);  updateMenuItemShowOperationResults(); }}),
        menuItemShowBoolValues        = new MenuItem('Show boolean values as  ✓ ✗', {checkCallback: () => settings.showBoolValues,        callback: () => { updateSettingAndMenu('showBoolValues',        true, !settings.showBoolValues);        updateMenuItemShowBoolValues();       }}),
        menuItemShowClearUndoWarning  = new MenuItem('Show clear undo warning',      {checkCallback: () => settings.showClearUndoWarning,  callback: () => { updateSettingAndMenu('showClearUndoWarning',  true, !settings.showClearUndoWarning);                                        }}),
                                        new MenuItem('',                             {separator: true}),    
        menuItemMinZoomForParams      = new MenuItem('Smallest adjustment zoom...',  {callback: () => showMinZoomDialog()}),
                                        new MenuItem('',                             {separator: true}),    
        menuItemShowDebugMenu         = new MenuItem('Show debug menu',              {checkCallback: () => settings.showDebugMenu,         callback: () => { updateSettingAndMenu('showDebugMenu',         true, !settings.showDebugMenu);         updateMenuItemShowDebugMenu();        }}),
        menuItemEnableBetaFeatures    = new MenuItem('Enable beta features',         {checkCallback: () => settings.enableBetaFeatures,    callback: () => { updateSettingAndMenu('enableBetaFeatures',    true, !settings.enableBetaFeatures);    enableFeatures(true, settings.enableBetaFeatures); }})]);

    // menuMainPreferences.init = () => 
    // {
    //     menuItemEnableZoomedOutParams.setName('Adjust values at zoom  <  ' + numToString(settings.minZoomForParams * 100, 0) + '%');
    // };
        

    menuMainDebug = new Menu('Debug', false);
    menuMainDebug.addItems([
        // menuItemShowWires = new MenuItem('Show wires',
        // {
        //     checkCallback: () => settings.showWires, 
        //     callback:      () => 
        //     {
        //         updateSettingAndMenu('showWires', true, !settings.showWires);
        //         graphView.updateShowWires(settings.showWires);  
        //     }
        // }),
        menuItemDataMode         = new MenuItem('Restart in debug mode',      {checkCallback: () => settings.dataMode           , callback: () => updateSettingAndMenu('dataMode',         true, !settings.dataMode        ), setting: true}),
                                   new MenuItem('',                           {separator: true}),   
        menuItemShowNodeId       = new MenuItem('Show node IDs',
                                   {
                                       checkCallback: () => settings.showNodeId, 
                                       callback:      () => 
                                       {
                                           updateSettingAndMenu('showNodeId', true, !settings.showNodeId);
                                           
                                           graph.nodes.forEach(n => n.updateNode());
                                           graph.nodes.forEach(n => n.updateMeasureData());
                                           graph.nodes.forEach(n => updateHeaderLabelOffsetX(n));
                                       }
                                   }),
                                 //new MenuItem('',                             {separator: true}),
                                 //new MenuItem('Re-save all connections',      {callback:      () => uiSaveConnections(graph.connections)}),                                   
                                 //new MenuItem('Delete connections to...',     {callback:      () => showDeleteConnectionsDialog()}),                                   new MenuItem('',                           {separator: true}),
                                 //new MenuItem('',                             {separator: true}),   
                                 //new MenuItem('Log all connection keys',      {callback:      () => { hideAllMenus(); uiQueueMessageToFigma({cmd: 'figLogAllSavedConnKeys'}); }}),
                                 //new MenuItem('Log all local data',           {callback:      () => { hideAllMenus(); uiQueueMessageToFigma({cmd: 'figLogAllLocalData'}); }}),
                                 //new MenuItem('Clear all local data',         {callback:      () => { hideAllMenus(); uiQueueMessageToFigma({cmd: 'figClearAllLocalData'}); }}),
                                 //new MenuItem('Delete all saved connections', {callback:      () => { hideAllMenus(); uiQueueMessageToFigma({cmd: 'figRemoveAllSavedConnections'}); }}),
                                 //new MenuItem('',                             {separator: true }),
                                 //new MenuItem('Delete all style links',       {callback:      () => { hideAllMenus(); uiRemovePluginDataFromAllLocalStyles(); }}),
                                   new MenuItem('',                             {separator: true }),
        menuItemLogRequests      = new MenuItem('Log\u2008requests',            {checkCallback: () => settings.logRequests     , callback: () => updateSettingAndMenu('logRequests',      true, !settings.logRequests     ), setting: true}),
        menuItemLogValueUpdates  = new MenuItem('Log\u2008values',              {checkCallback: () => settings.logValueUpdates , callback: () => updateSettingAndMenu('logValueUpdates',  true, !settings.logValueUpdates ), setting: true}),
        menuItemLogObjectUpdates = new MenuItem('Log\u2008objects',             {checkCallback: () => settings.logObjectUpdates, callback: () => updateSettingAndMenu('logObjectUpdates', true, !settings.logObjectUpdates), setting: true}),
        menuItemLogStyleUpdates  = new MenuItem('Log\u2008styles',              {checkCallback: () => settings.logStyleUpdates , callback: () => updateSettingAndMenu('logStyleUpdates',  true, !settings.logStyleUpdates ), setting: true}),
                                   new MenuItem('',                             {separator: true}),   
        menuItemLogRawRequests   = new MenuItem('Log\u2008raw\u2008requests',   {checkCallback: () => settings.logRawRequests  , callback: () => updateSettingAndMenu('logRawRequests',   true, !settings.logRawRequests  ), setting: true}),
        menuItemLogRawValues     = new MenuItem('Log\u2008raw\u2008values',     {checkCallback: () => settings.logRawValues    , callback: () => updateSettingAndMenu('logRawValues',     true, !settings.logRawValues    ), setting: true}),
                                   new MenuItem('',                             {separator: true}),   
        menuItemLogLoading       = new MenuItem('Log\u2008loading',             {checkCallback: () => settings.logLoading      , callback: () => updateSettingAndMenu('logLoading',       true, !settings.logLoading      ), setting: true}),
        menuItemLogRawLoading    = new MenuItem('Log\u2008raw\u2008loading',    {checkCallback: () => settings.logRawLoading   , callback: () => updateSettingAndMenu('logRawLoading',    true, !settings.logRawLoading   ), setting: true}),
        menuItemLogRawSaving     = new MenuItem('Log\u2008raw\u2008saving',     {checkCallback: () => settings.logRawSaving    , callback: () => updateSettingAndMenu('logRawSaving',     true, !settings.logRawSaving    ), setting: true}),
                                   new MenuItem('',                             {separator: true}),   
        menuItemLogMessages      = new MenuItem('Log\u2008messages',            {checkCallback: () => settings.logMessages     , callback: () => updateSettingAndMenu('logMessages',      true, !settings.logMessages     ), setting: true}),
                                   new MenuItem('',                             {separator: true}),   
        menuItemLogActions       = new MenuItem('Log\u2008actions',             {checkCallback: () => settings.logActions      , callback: () => updateSettingAndMenu('logActions',       true, !settings.logActions      ), setting: true})]);
                     

    menuMainHelp = new Menu('Help and subscription', false);
    menuMainHelp.addItems([
        new MenuItem('Help page',    {callback:  () => window.open('http://www.bourt.com/generator/help', '_blank')}),
        //new MenuItem('',           {separator: true}),
        new MenuItem('Subscription', {callback:  () => showProductKeyDialog()}),
        //new MenuItem('',           {separator: true}),
        new MenuItem('About',        {callback:  () => showAboutDialog()})]);


    menuMain = new Menu('Main menu', false);
    menuMain.addItems([
                        new MenuItem('Preferences',           {childMenu: menuMainPreferences}),
        menuItemDebug = new MenuItem('Debug',                 {childMenu: menuMainDebug}),
                        new MenuItem('',                      {separator: true}),
        menuItemHelp  = new MenuItem('Help and subscription', {childMenu: menuMainHelp })]);
  
        
    menuFlow = new Menu('Flow', true, false);
    menuFlow.addItems([
                         new MenuItem('List',              {icon: iconList,   callback: e => actionManager.do(getCreateNodeAction(LIST,    btnNumber.div, {insert: e.ctrlKey}))}),
                         new MenuItem('',                  {separator: true}),
                         new MenuItem('Items',             {icon: iconItems,  callback: e => actionManager.do(getCreateNodeAction(ITEMS,   btnNumber.div, {insert: e.ctrlKey}))}),
                         new MenuItem('Select',            {icon: iconSelect, callback: e => actionManager.do(getCreateNodeAction(SELECT,  btnNumber.div, {insert: e.ctrlKey}))}),
        menuItemIfElse = new MenuItem('I&hairsp;f / else', {icon: iconIfElse, callback: e => actionManager.do(getCreateNodeAction(IF_ELSE, btnNumber.div, {insert: e.ctrlKey})), disambiguate: true}),
        menuSep1       = new MenuItem('',                  {separator: true}),
        // menuItemStart  = new MenuItem('Start',             {icon: iconStart,  callback: e => actionManager.do(getCreateNodeAction(START,   btnNumber.div, {insert: e.ctrlKey}))}),
        menuItemRepeat = new MenuItem('Repeat',            {icon: iconRepeat, callback: e => actionManager.do(getCreateNodeAction(REPEAT,  btnNumber.div, {insert: e.ctrlKey}))}),
        menuSep2       = new MenuItem('',                  {separator: true}),
        menuItemCache  = new MenuItem('Cache',             {icon: iconCache,  callback: e => actionManager.do(getCreateNodeAction(CACHE,   btnNumber.div, {insert: e.ctrlKey}))}),
        menuItemCopy   = new MenuItem('Copy',              {icon: iconCopy,   callback: e => actionManager.do(getCreateNodeAction(COPY,    btnNumber.div, {insert: e.ctrlKey}))})]);
    
    
    menuMath = new Menu('Math', true, false);
    menuMath.addItems([
        new MenuItem('Add',         {icon: iconAdd,      callback: e => actionManager.do(getCreateNodeAction(NUMBER_ADD,      btnNumber.div, {insert: e.ctrlKey}))}),
        new MenuItem('Subtract',    {icon: iconSubtract, callback: e => actionManager.do(getCreateNodeAction(NUMBER_SUBTRACT, btnNumber.div, {insert: e.ctrlKey}))}),
        new MenuItem('Multiply',    {icon: iconMultiply, callback: e => actionManager.do(getCreateNodeAction(NUMBER_MULTIPLY, btnNumber.div, {insert: e.ctrlKey}))}),
        new MenuItem('Divide',      {icon: iconDivide,   callback: e => actionManager.do(getCreateNodeAction(NUMBER_DIVIDE,   btnNumber.div, {insert: e.ctrlKey}))}),
        new MenuItem('Power',       {icon: iconExponent, callback: e => actionManager.do(getCreateNodeAction(NUMBER_EXPONENT, btnNumber.div, {insert: e.ctrlKey}))}),
        new MenuItem('Remainder',   {icon: iconModulo,   callback: e => actionManager.do(getCreateNodeAction(NUMBER_MODULO,   btnNumber.div, {insert: e.ctrlKey}))})]);
        

    menuBoolean = new Menu('Boolean', true, false);
    menuBoolean.addItems([
        new MenuItem('Not', {icon: iconNot, callback: e => actionManager.do(getCreateNodeAction(NUMBER_NOT, btnNumber.div, {insert: e.ctrlKey}))}),
        new MenuItem('And', {icon: iconAnd, callback: e => actionManager.do(getCreateNodeAction(NUMBER_AND, btnNumber.div, {insert: e.ctrlKey}))}),
        new MenuItem('Or',  {icon: iconOr , callback: e => actionManager.do(getCreateNodeAction(NUMBER_OR,  btnNumber.div, {insert: e.ctrlKey}))}),
        new MenuItem('Xor', {icon: iconXor, callback: e => actionManager.do(getCreateNodeAction(NUMBER_XOR, btnNumber.div, {insert: e.ctrlKey}))})]);
        
    
    menuCondition = new Menu('Conditional', true, false);
    menuCondition.addItems([
        new MenuItem('Greater',          {icon: iconGreater,        callback: e => actionManager.do(getCreateNodeAction(NUMBER_GREATER,          btnNumber.div, {insert: e.ctrlKey}))}),
        new MenuItem('Greater or equal', {icon: iconGreaterOrEqual, callback: e => actionManager.do(getCreateNodeAction(NUMBER_GREATER_OR_EQUAL, btnNumber.div, {insert: e.ctrlKey}))}),
        new MenuItem('Equal',            {icon: iconEqual,          callback: e => actionManager.do(getCreateNodeAction(NUMBER_EQUAL,            btnNumber.div, {insert: e.ctrlKey}))}),
        new MenuItem('Not equal',        {icon: iconNotEqual,       callback: e => actionManager.do(getCreateNodeAction(NUMBER_NOT_EQUAL,        btnNumber.div, {insert: e.ctrlKey}))}),
        new MenuItem('Less or equal',    {icon: iconLessOrEqual,    callback: e => actionManager.do(getCreateNodeAction(NUMBER_LESS_OR_EQUAL,    btnNumber.div, {insert: e.ctrlKey}))}),
        new MenuItem('Less',             {icon: iconLess,           callback: e => actionManager.do(getCreateNodeAction(NUMBER_LESS,             btnNumber.div, {insert: e.ctrlKey}))})]);
        
    
    menuNumber = new Menu('Numbers', true, false);
    menuNumber.addItems([
                         new MenuItem('Number',      {icon: iconNumber,      callback: e => actionManager.do(getCreateNodeAction(NUMBER,             btnNumber.div, {insert: e.ctrlKey}))}),
                         new MenuItem('',            {separator: true}),
                         new MenuItem('Absolute',    {icon: iconAbsolute,    callback: e => actionManager.do(getCreateNodeAction(NUMBER_ABSOLUTE,    btnNumber.div, {insert: e.ctrlKey}))}),
                         new MenuItem('Round',       {icon: iconRound,       callback: e => actionManager.do(getCreateNodeAction(NUMBER_ROUND,       btnNumber.div, {insert: e.ctrlKey}))}),
                         new MenuItem('Limits',      {icon: iconLimits,      callback: e => actionManager.do(getCreateNodeAction(NUMBER_LIMITS,      btnNumber.div, {insert: e.ctrlKey}))}),
                         new MenuItem('',            {separator: true}),
                         new MenuItem('Math',        {icon: iconMath,        childMenu: menuMath,      callback: e => actionManager.do(getCreateNodeAction(NUMBER_MATH,        btnNumber.div, {insert: e.ctrlKey}))}),
                         new MenuItem('Boolean',     {icon: iconBoolean,     childMenu: menuBoolean,   callback: e => actionManager.do(getCreateNodeAction(NUMBER_BOOLEAN,     btnNumber.div, {insert: e.ctrlKey}))}),
                         new MenuItem('Condition',   {icon: iconCondition,   childMenu: menuCondition, callback: e => actionManager.do(getCreateNodeAction(NUMBER_CONDITION,   btnNumber.div, {insert: e.ctrlKey}))}),
                         new MenuItem('',            {separator: true}),
        menuItemSeries = new MenuItem('Series',      {icon: iconSeries,      callback: e => actionManager.do(getCreateNodeAction(NUMBER_SERIES,      btnNumber.div, {insert: e.ctrlKey}))}),
                         new MenuItem('Random',      {icon: iconRandom,      callback: e => actionManager.do(getCreateNodeAction(NUMBER_RANDOM,      btnNumber.div, {insert: e.ctrlKey}))}),
                         new MenuItem('',            {separator: true}),
                         new MenuItem('Interpolate', {icon: iconInterpolate, callback: e => actionManager.do(getCreateNodeAction(NUMBER_INTERPOLATE, btnNumber.div, {insert: e.ctrlKey}))})]);
        
    
    // menuString = new Menu('String nodes', true, false);
    // menuString.addItems([
    //     new MenuItem('String',      {icon: iconString       , enabled: false}),
    //     new MenuItem('Join',        {icon: iconStringJoin   , enabled: false}),
    //     new MenuItem('Substring',   {icon: iconSubstring    , enabled: false}),
    //     new MenuItem('Replace',     {icon: iconStringReplace, enabled: false})]);
    
    menuColorStyle = new Menu('Color style', true, false);
    menuColorStyle.addItems([
        new MenuItem('Link existing...', {icon: iconColorStyleReplace, callback: e => actionManager.do(getCreateNodeAction(COLOR_STYLE,  btnColor.div, {insert: e.ctrlKey, existing: true}))})]);

        
    menuColor = new Menu('Colors', true, true);
    menuColor.addItems([
        menuItemColor        = new MenuItem('Color',             {icon: iconColor,            callback: e => actionManager.do(getCreateNodeAction(COLOR,             btnColor.div, {insert: e.ctrlKey, random: e.altKey, autoConnect: !e.altKey}))}),
                               new MenuItem('',                  {separator: true}),
                               new MenuItem('Valid sRGB',        {icon: iconValidColor,       callback: e => actionManager.do(getCreateNodeAction(VALID_COLOR,       btnColor.div, {insert: e.ctrlKey}))}),
        menuItemCorrectColor = new MenuItem('Correct color',     {icon: iconCorrectColor,     callback: e => actionManager.do(getCreateNodeAction(CORRECT_COLOR,     btnColor.div, {insert: e.ctrlKey}))}),
                               new MenuItem('',                  {separator: true}),
                               new MenuItem('Web contrast',      {icon: iconWebContrast,      callback: e => actionManager.do(getCreateNodeAction(COLOR_CONTRAST,    btnColor.div, {insert: e.ctrlKey}))}),
                               new MenuItem('Colorblind',        {icon: iconColorblind,       callback: e => actionManager.do(getCreateNodeAction(COLORBLIND,        btnColor.div, {insert: e.ctrlKey}))}),
                               new MenuItem('',                  {separator: true}),
                               new MenuItem('Interpolate color', {icon: iconColorInterpolate, callback: e => actionManager.do(getCreateNodeAction(COLOR_INTERPOLATE, btnColor.div, {insert: e.ctrlKey}))})]);
        
    menuColor.init = () => 
    {
        menuItemColor.setIcon(iconColor);
    };

    
    menuStyle = new Menu('Styles', true, false);
    menuStyle.addItems([
        menuItemStyleFill   = new MenuItem('Fill',          {icon: iconFill,       callback: e => actionManager.do(getCreateNodeAction(FILL,   btnColor.div, {insert: e.ctrlKey}))}),
        menuItemStyleStroke = new MenuItem('Stroke',        {icon: iconStroke,     callback: e => actionManager.do(getCreateNodeAction(STROKE, btnColor.div, {insert: e.ctrlKey}))}),
        menuItemStyleSep1   = new MenuItem('',              {separator: true}),
                              new MenuItem('Color style',   {icon: iconColorStyle, callback: e => actionManager.do(getCreateNodeAction(COLOR_STYLE,  btnColor.div, {insert: e.ctrlKey, existing: true}))})]);
                            //new MenuItem('Color style',   {icon: iconColorStyle, childMenu: menuColorStyle, callback: e => actionManager.do(getCreateNodeAction(COLOR_STYLE,  btnColor.div, {insert: e.ctrlKey}))})]);
    
    
    menuShape = new Menu('Shapes', true, false);
    menuShape.addItems([
        new MenuItem('Rectangle', {icon: iconRectangle, callback: e => actionManager.do(getCreateNodeAction(RECTANGLE, btnShape.div, {insert: e.ctrlKey}))}),
        new MenuItem('Line',      {icon: iconLine,      callback: e => actionManager.do(getCreateNodeAction(LINE,      btnShape.div, {insert: e.ctrlKey}))}),
        new MenuItem('Ellipse',   {icon: iconEllipse,   callback: e => actionManager.do(getCreateNodeAction(ELLIPSE,   btnShape.div, {insert: e.ctrlKey}))}),
        new MenuItem('Polygon',   {icon: iconPolygon,   callback: e => actionManager.do(getCreateNodeAction(POLYGON,   btnShape.div, {insert: e.ctrlKey}))}),
        new MenuItem('Star',      {icon: iconStar,      callback: e => actionManager.do(getCreateNodeAction(STAR,      btnShape.div, {insert: e.ctrlKey}))})]);


    menuWindow = new Menu('Window options', true, false);
    menuWindow.showOnLeft = true;
    menuWindow.addItems([
        menuItemWindowNormal   = new MenuItem('Normal',   {icon: iconWindowNormal,     shortcut: osAlt() + '0', callback: () => dockWindowNormal  ()}),
        menuItemWindowMaximize = new MenuItem('Maximize', {icon: iconWindowMaximize,   shortcut: osAlt() + '8', callback: () => dockWindowMaximize()}),
        menuItemWindowTop      = new MenuItem('Top',      {icon: iconWindowDockTop,    shortcut: osAlt() + '5', callback: () => dockWindowTop     ()}),
        menuItemWindowLeft     = new MenuItem('Left',     {icon: iconWindowDockLeft,   shortcut: osAlt() + '1', callback: () => dockWindowLeft    ()}),
        menuItemWindowRight    = new MenuItem('Right',    {icon: iconWindowDockRight,  shortcut: osAlt() + '3', callback: () => dockWindowRight   ()}),
        menuItemWindowBottom   = new MenuItem('Bottom',   {icon: iconWindowDockBottom, shortcut: osAlt() + '2', callback: () => dockWindowTop     ()})]);


    menuZoom = new Menu('Zoom/view options');
    menuZoom.combineChecksAndIcons = true;
    menuZoom.addItems([
                            new MenuItem('Zoom in',      {shortcut: osCtrl () + '+', callback: () => graphView.zoom *= Math.pow(2, 1/2)}),
                            new MenuItem('Zoom out',     {shortcut: osCtrl () + '-', callback: () => graphView.zoom /= Math.pow(2, 1/2)}),
                            new MenuItem('Zoom to fit',  {shortcut: osShift() + '1', callback: () => graphView.zoomToFit()}),
        menuItemZoomTo100 = new MenuItem('Zoom to 100%', {shortcut: osCtrl () + '0', callback: () => graphView.setPanAndZoom(isEmpty(graph.nodes) ? point(0, 0) : graphView.pan, 1)})]);//,
                        //  new MenuItem('',             {separator: true}),
                        //  new MenuItem('Window',       {childMenu: menuWindow})]);


    menuGraph = new Menu('Graph menu', false, false);
    menuGraph.addItems([
        menuItemGraphPaste          = new MenuItem('Paste here',      {shortcut: osCtrl()             + 'V', callback: e => { hideAllMenus(); pasteCopiedNodes(false, e.clientX, e.clientY - menuBarHeight); }}),
        menuItemGraphPasteConnected = new MenuItem('Paste connected', {shortcut: osCtrl() + osShift() + 'V', callback: e => { hideAllMenus(); pasteCopiedNodes(true,  e.clientX, e.clientY - menuBarHeight); }})]);

    menuGraph.init = () => 
    {
        menuItemGraphPaste         .setEnabled(copiedNodesJson != '');
        menuItemGraphPasteConnected.setEnabled(copiedNodesJson != '');
    };


    menuNodeSelect = new Menu('Select nodes menu', false, false);
    menuNodeSelect.addItems([
        new MenuItem('Select tree',   {shortcut:  isMac ? osShift() + osCtrl () + osAlt() + 'Click' : osShift() + osCtrl() + osAlt() + 'Click', callback: () => graphView.selectedNodes =                                 getAllNodesFromNode(graphView.selectedNodes[0]) }),
        new MenuItem('Select left',   {shortcut:  isMac ? osShift() + osAlt  ()           + 'Click' : osShift() + osCtrl()           + 'Click', callback: () => graphView.selectedNodes = [graphView.selectedNodes[0], ...getNodesBeforeNode(graphView.selectedNodes[0])] }),
        new MenuItem('Select right',  {shortcut:  isMac ? osCtrl () + osShift()           + 'Click' : osShift() + osAlt()            + 'Click', callback: () => graphView.selectedNodes = [graphView.selectedNodes[0], ...getNodesAfterNode (graphView.selectedNodes[0])] }),
        new MenuItem('Select across', {shortcut:  isMac ? osAlt  () + osCtrl ()           + 'Click' : osCtrl() + osAlt()             + 'Click', callback: () => graphView.selectedNodes = [graphView.selectedNodes[0], ...getNodesAcrossNode(graphView.selectedNodes[0])] })]);


    menuNode = new Menu('Node menu', false, false);
    menuNode.addItems([
        menuItemNodeCopy               = new MenuItem('Copy',                {shortcut:  osCtrl() + 'C',              callback: () => copySelectedNodes() }),
        menuItemNodeDuplicate          = new MenuItem('Duplicate',           {shortcut:  osCtrl() + 'D',              callback: e => { hideAllMenus(); duplicateSelectedNodes(false); }}),
        menuItemNodeDuplicateConnected = new MenuItem('Duplicate connected', {shortcut:  osCtrl() + osShift() + 'D',  callback: e => { hideAllMenus(); duplicateSelectedNodes(true ); }}),
                                       //new MenuItem('',                    {separator: true}),
        menuItemNodeSep1               = new MenuItem('',                    {separator: true}),
    //  menuItemNodeLayout             = new MenuItem('Layout',              {enabled:   false, shortcut: osCtrl() + 'L', callback: e => { hideAllMenus(); layoutSelectedNodes(); }}),
        menuItemNodeRename             = new MenuItem('Rename',              {shortcut:  osCtrl() + 'R',              callback: e => { hideAllMenus(); renameSelectedNode(); }}),
        menuItemNodeSep2               = new MenuItem('',                    {separator: true}),
        menuItemNodeSelect             = new MenuItem('Select',              {childMenu: menuNodeSelect}),
                                         new MenuItem('',                    {separator: true}),
        menuItemNodeActivate           = new MenuItem('Activate',            {callback: () => makeSelectedNodesActive()}),
        menuItemNodeEnableDisable      = new MenuItem('Enable/Disable',      {shortcut:  osCtrl() + osShift() + 'E',  callback: () => actionManager.do(new ToggleDisableNodesAction(graphView.selectedNodes.map(n => n.id)))}),
                                         new MenuItem('',                    {separator: true}),
        menuItemNodeRemove             = new MenuItem('Remove',              {shortcut:  osShift() + '⌫',            callback: e => { hideAllMenus(); removeSelectedNodes(true); }})]);


    menuRemoveLicense = new Menu('Remove license', false, false);
    menuRemoveLicense.addItems([
                                new MenuItem('Copy',  {callback: () => { hideAllMenus(); writeTextToClipboard(getSelectedText(productKeyInput)); }}),
                                new MenuItem('Paste', {callback: () => { hideAllMenus(); document.execCommand('paste'); }}),
        menuItemLicenseSep1   = new MenuItem('', {separator: true}),
        menuItemLicenseRemove = new MenuItem('Remove from this computer', {callback: () => { hideAllMenus(); removeLicense(); }})]);


    menuNode.init = () => 
    {
        const single   = graphView.selectedNodes.length == 1;
        const parallel = nodesAreParallel(graphView.selectedNodes);

        updateMenuItemDisplay(menuItemNodeSep1    .div, single);
        updateMenuItemDisplay(menuItemNodeRename  .div, single);
        updateMenuItemDisplay(menuItemNodeSep2    .div, single);
        updateMenuItemDisplay(menuItemNodeSelect  .div, single);
        updateMenuItemDisplay(menuItemNodeActivate.div, single || parallel);
    };


    menuLocalStyles = new Menu('Local styles', true, true);
    menuSelectParam = new Menu('Select options', false, true);

    
    btnMain     = new MenuButton('', menuMain,   {useMenuName: true, highlight: () => currentMenus.includes(menuMain  ), callback: () => updatePanMode(false)});
    btnFlow     = new MenuButton('', menuFlow,   {useMenuName: true, highlight: () => currentMenus.includes(menuFlow  ), callback: () => updatePanMode(false)});
    btnNumber   = new MenuButton('', menuNumber, {useMenuName: true, highlight: () => currentMenus.includes(menuNumber), callback: () => updatePanMode(false)});
    //btnString = new MenuButton('', menuString, {useMenuName: true, highlight: () => currentMenus.includes(menuString), callback: () => updatePanMode(false)});
    btnColor    = new MenuButton('', menuColor,  {useMenuName: true, highlight: () => currentMenus.includes(menuColor ), callback: () => updatePanMode(false)});
    btnStyle    = new MenuButton('', menuStyle,  {useMenuName: true, highlight: () => currentMenus.includes(menuStyle ), callback: () => updatePanMode(false)});
    btnShape    = new MenuButton('', menuShape,  {useMenuName: true, highlight: () => currentMenus.includes(menuShape ), callback: () => updatePanMode(false)});

    btnCustom   = new MenuButton('Custom nodes', null, {callback: () => 
    {
        const create = new CreateNodeAction(CUSTOM, btnCustom.div);
        actionManager.do(create);

        graphView.update([create.node]);
        graphView.updateScrollWithBounds();

        updatePanMode(false);
    }});
    
    btnHand = new MenuButton('Hand tool', null, {callback: () => 
    { 
        updatePanMode(!panMode);
    }});

    btnComment = new MenuButton('Add comment', null, {callback: () => 
    {
        const create = new CreateNodeAction(COMMENT, btnComment.div);
        actionManager.do(create);

        graphView.update([create.node]);
        graphView.updateScrollWithBounds();

        updatePanMode(false);
    }});


    btnZoom = new MenuButton('', menuZoom, { useMenuName: true, selectLast: false, highlight: () => currentMenus.includes(menuZoom) });

        

    btnMain.div.style.paddingLeft = '6px';

    btnStyle.setIcon(iconStyle);

    btnZoom.div.style.position     = 'absolute';
    btnZoom.div.style.right        = '0px';
    btnZoom.div.style.paddingRight = '5px';
    btnZoom.div.style.paddingLeft  = '11px';
    // btnZoom.div.style.boxShadow = '0 0 0 1px red inset';


    btnMain   .setIcon(iconGenerator);
    btnShape  .setIcon(iconShapes);
    btnCustom .setIcon(iconCustom);
    btnHand   .setIcon(iconHand);
    btnComment.setIcon(iconComment);
}



function initDataModeMenus()
{
    menuNodeData = new Menu('Node menu', false, false);
    menuNodeData.addItems([
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
        // new MenuItem('List all connection keys', { callback: () => { hideAllMenus(); uiQueueMessageToFigma({cmd: 'figLogAllSavedConnKeys'}); }}),
        // new MenuItem('',                         { separator: true }),
        new MenuItem('Delete all connections',   { callback: e => { hideAllMenus(); dataModeDeleteAllConnections(); }})]);
}



function updatePanMode(enabled)
{
    panMode = enabled;  
    currentMenuButton = panMode ? btnHand : null;
    btnHand.update();
}