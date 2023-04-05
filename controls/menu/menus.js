var btnMain;
var btnFlow;
var btnNumber;
var btnText;
var btnColor;
var btnStyle;
var btnShape;
var btnGroup;
var btnHand;
var btnComment;
var btnZoom;


var menuMain;
var menuMainPreferences;
var menuMainDebug;
var menuMainHelp;

var menuShowTooltips;

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

var menuText;
var menuTextbox;


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
var menuItemShowAllColorSpaces;
var menuItemShowBoolValues;
var menuItemShowOperationResults;
var menuItemShowClearUndoWarning;
var menuItemShowTooltips;
var menuItemShowDebugMenu;

var menuItemShowNodeId;

var menuItemDebug;
var menuItemDebugLog;

var menuItemHelp;


var menuItemEnableBetaFeatures;


var menuItemList;  
var menuFlowSep1;
var menuItemItems;
var menuItemSelect;
var menuItemIfElse;
var menuFlowSep2;
var menuItemStart;
var menuItemRepeat;
var menuFlowSep3;
var menuItemCache;
var menuItemCopy;

var menuItemSeries;
var menuItemNumberSep1;
var menuItemNumberConvertToText;

var menuItemColor;
var menuItemCorrectColor;
var menuItemColorSep1;
var menuItemColorblind;
var menuItemColorBlend;


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
var menuItemLogRawLoadNodes;
var menuItemLogRawLoadConnections;
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

var menuItemNodeCopy;
var menuItemNodeCopyAsJavascript;
var menuItemNodeDuplicate;
var menuItemNodeDuplicateConnected;
var menuItemNodeRemove;
var menuItemNodeLayout;
var menuItemNodeSep1;
var menuItemNodeRename;
var menuItemNodeEdit;
var menuItemNodeSep2;
var menuItemNodeSelect;
// var menuItemNodeBringToFront;
// var menuItemNodeSendToBack;
//var menuItemNodeActivate;
var menuItemNodeSep3;
var menuItemNodeEnableDisable;


var menuItemLicenseSep1;
var menuItemLicenseRemove;


var menuItemCustomInputs;
var menuItemCustomOutputs;



function initGeneratorMenus()
{
    menuShowTooltips = new Menu('Show tooltips', false);
    menuShowTooltips.addItems([
        menuItemShowTooltipLongText           = new MenuItem('Long text',           {checkCallback: () => settings.showTooltipLongText,           callback: () => { updateSettingAndMenu('showTooltipLongText',           true, !settings.showTooltipLongText          ); }}),
        menuItemShowTooltipColorContrast      = new MenuItem('Color contrast',      {checkCallback: () => settings.showTooltipColorContrast,      callback: () => { updateSettingAndMenu('showTooltipColorContrast',      true, !settings.showTooltipColorContrast     ); }}),
        menuItemShowTooltipColorInterpolation = new MenuItem('Color interpolation', {checkCallback: () => settings.showTooltipColorInterpolation, callback: () => { updateSettingAndMenu('showTooltipColorInterpolation', true, !settings.showTooltipColorInterpolation); }}),
        menuItemShowTooltipColorBlindness     = new MenuItem('Color blindness',     {checkCallback: () => settings.showTooltipColorBlindness,     callback: () => { updateSettingAndMenu('showTooltipColorBlindness',     true, !settings.showTooltipColorBlindness    ); }})]);


    menuMainPreferences = new Menu('Preferences', false);
    menuMainPreferences.addItems([
        menuItemShowAllColorSpaces    = new MenuItem('Show all color spaces',        {checkCallback: () => settings.showAllColorSpaces,    callback: () => { updateSettingAndMenu('showAllColorSpaces',    true, !settings.showAllColorSpaces);    updateMenuItemShowAllColorSpaces();   }}),
                                        new MenuItem('',                             {separator: true}),    
        menuItemShowOperationResults  = new MenuItem('Show operation results',       {checkCallback: () => settings.showOperationResults,  callback: () => { updateSettingAndMenu('showOperationResults',  true, !settings.showOperationResults);  updateMenuItemShowOperationResults(); }}),
        menuItemShowBoolValues        = new MenuItem('Show boolean values as  ✓ ✗', {checkCallback: () => settings.showBoolValues,        callback: () => { updateSettingAndMenu('showBoolValues',        true, !settings.showBoolValues);        updateMenuItemShowBoolValues();       }}),
                                        new MenuItem('',                             {separator: true}),    
        menuItemShowClearUndoWarning  = new MenuItem('Show clear undo warning',      {checkCallback: () => settings.showClearUndoWarning,  callback: () => { updateSettingAndMenu('showClearUndoWarning',  true, !settings.showClearUndoWarning);                                        }}),
        menuItemShowTooltips          = new MenuItem('Show tooltips',                {childMenu: menuShowTooltips}),
                                        new MenuItem('',                             {separator: true}),    
        menuItemShowDebugMenu         = new MenuItem('Show debug menu',              {checkCallback: () => settings.showDebugMenu,         callback: () => { updateSettingAndMenu('showDebugMenu',         true, !settings.showDebugMenu);         updateMenuItemShowDebugMenu();        }}),
        menuItemEnableBetaFeatures    = new MenuItem('Enable beta features',         {checkCallback: () => settings.enableBetaFeatures,    callback: () => { updateSettingAndMenu('enableBetaFeatures',    true, !settings.enableBetaFeatures);    enableFeatures(true, settings.enableBetaFeatures); }}),
                                        new MenuItem('',                             {separator: true}),    
                                        new MenuItem('Keyboard layout...',           {callback: () => showKeyboardPanel()}),
                                        new MenuItem('',                             {separator: true}),    
        menuItemMinZoomForParams      = new MenuItem('Zoom level for values...',     {callback: () => showMinZoomDialog()})]);
        

    menuDebugLog = new Menu('Debug log', false);
    menuDebugLog.addItems([
        menuItemLogRequests           = new MenuItem('Log\u2008requests',          {checkCallback: () => settings.logRequests     ,      callback: () => updateSettingAndMenu('logRequests',           true, !settings.logRequests          ), setting: true}),
        menuItemLogValueUpdates       = new MenuItem('Log\u2008values',            {checkCallback: () => settings.logValueUpdates ,      callback: () => updateSettingAndMenu('logValueUpdates',       true, !settings.logValueUpdates      ), setting: true}),
        menuItemLogObjectUpdates      = new MenuItem('Log\u2008objects',           {checkCallback: () => settings.logObjectUpdates,      callback: () => updateSettingAndMenu('logObjectUpdates',      true, !settings.logObjectUpdates     ), setting: true}),
        menuItemLogStyleUpdates       = new MenuItem('Log\u2008styles',            {checkCallback: () => settings.logStyleUpdates ,      callback: () => updateSettingAndMenu('logStyleUpdates',       true, !settings.logStyleUpdates      ), setting: true}),
                                        new MenuItem('',                           {separator: true}),                   
        menuItemLogRawRequests        = new MenuItem('Log\u2008raw\u2008requests', {checkCallback: () => settings.logRawRequests  ,      callback: () => updateSettingAndMenu('logRawRequests',        true, !settings.logRawRequests       ), setting: true}),
        menuItemLogRawValues          = new MenuItem('Log\u2008raw\u2008values',   {checkCallback: () => settings.logRawValues    ,      callback: () => updateSettingAndMenu('logRawValues',          true, !settings.logRawValues         ), setting: true}),
                                        new MenuItem('',                           {separator: true}),                   
        menuItemLogLoading            = new MenuItem('Log\u2008load\u2008at start', {checkCallback: () => settings.logLoading      ,      callback: () => updateSettingAndMenu('logLoading',            true, !settings.logLoading           ), setting: true}),
                                        new MenuItem('',                           {separator: true}),                   
        menuItemLogRawLoadNodes       = new MenuItem('Log\u2008load nodes',        {checkCallback: () => settings.logRawLoadNodes ,      callback: () => updateSettingAndMenu('logRawLoadNodes',       true, !settings.logRawLoadNodes      ), setting: true}),
        menuItemLogRawSaveNodes       = new MenuItem('Log\u2008save nodes',        {checkCallback: () => settings.logRawSaveNodes ,      callback: () => updateSettingAndMenu('logRawSaveNodes',       true, !settings.logRawSaveNodes      ), setting: true}),
                                        new MenuItem('',                           {separator: true}),                   
        menuItemLogRawLoadConnections = new MenuItem('Log\u2008load connections',  {checkCallback: () => settings.logRawLoadConnections, callback: () => updateSettingAndMenu('logRawLoadConnections', true, !settings.logRawLoadConnections), setting: true}),
        menuItemLogRawSaveConnections = new MenuItem('Log\u2008save connections',  {checkCallback: () => settings.logRawSaveConnections, callback: () => updateSettingAndMenu('logRawSaveConnections', true, !settings.logRawSaveConnections), setting: true}),
                                        new MenuItem('Log all connection keys',    {callback:      () => { hideAllMenus(); uiQueueMessageToFigma({cmd: 'figLogAllSavedConnKeys'}); }}),
                                        new MenuItem('',                           {separator: true}),   
        menuItemLogMessages           = new MenuItem('Log\u2008messages',          {checkCallback: () => settings.logMessages     ,      callback: () => updateSettingAndMenu('logMessages',           true, !settings.logMessages          ), setting: true}),
                                        new MenuItem('',                           {separator: true}),   
        menuItemLogActions            = new MenuItem('Log\u2008actions',           {checkCallback: () => settings.logActions      ,      callback: () => updateSettingAndMenu('logActions',            true, !settings.logActions           ), setting: true}),
                                        new MenuItem('',                           {separator: true}),
                                        new MenuItem('Log undo stack',             {callback:      () => { hideAllMenus(); logUndoStack(); }}),
                                        new MenuItem('Log redo stack',             {callback:      () => { hideAllMenus(); logRedoStack(); }}),
                                        new MenuItem('',                           {separator: true}),
                                        new MenuItem('Log all local data',         {callback:      () => { hideAllMenus(); uiQueueMessageToFigma({cmd: 'figLogAllLocalData'}); }})]);
                     

    menuMainDebug = new Menu('Debug', false);
    menuMainDebug.addItems([
        menuItemDataMode              = new MenuItem('Restart in debug mode',              {checkCallback: () => settings.dataMode           , callback: () => updateSettingAndMenu('dataMode',         true, !settings.dataMode        ), setting: true}),
                                        new MenuItem('',                                   {separator: true}),   
        menuItemShowNodeId            = new MenuItem('Show node IDs',
                                        {
                                            checkCallback: () => settings.showNodeId, 
                                            callback:      () => 
                                            {
                                                updateSettingAndMenu('showNodeId', true, !settings.showNodeId);
                                                
                                                graphView.graph.nodes.forEach(n => n.updateNode());
                                                graphView.graph.nodes.forEach(n => n.updateMeasureData());
                                                graphView.graph.nodes.forEach(n => n.updateHeaderLabelOffsetX());
                                            }
                                        }),
                                        new MenuItem('',                                   {separator: true}),
                                        new MenuItem('Log',                        {childMenu: menuDebugLog}),
                                        new MenuItem('',                                   {separator: true}),
                                        new MenuItem('Delete connections to...',           {callback:      () => showDeleteConnectionsDialog()}),                        
                                        new MenuItem('Delete all saved connections',       {callback:      () => { hideAllMenus(); uiRemoveAllSavedConnections(); }}),
                                        new MenuItem('Delete all style links',             {callback:      () => { hideAllMenus(); uiRemovePluginDataFromAllLocalStyles(); }}),
                                        new MenuItem('',                                   {separator: true}),
                                        new MenuItem('Clear all local data',               {callback:      () => { hideAllMenus(); uiQueueMessageToFigma({cmd: 'figClearAllLocalData'}); }})]);
                     

    menuMainHelp = new Menu('Help and subscription', false);
    menuMainHelp.addItems([
        // new MenuItem('Help page',    {callback:  () => window.open('http://www.bourt.com/generator/help', '_blank')}),
      //new MenuItem('',             {separator: true}),
        new MenuItem('Subscription', {callback:  () => showProductKeyDialog()}),
      //new MenuItem('',             {separator: true}),
        new MenuItem('About',        {callback:  () => showAboutDialog()})]);


    menuMain = new Menu('Main menu', false);
    menuMain.addItems([
                        new MenuItem('Preferences',           {childMenu: menuMainPreferences}),
        menuItemDebug = new MenuItem('Debug',                 {childMenu: menuMainDebug}),
                        new MenuItem('',                      {separator: true}),
        menuItemHelp  = new MenuItem('Help and subscription', {childMenu: menuMainHelp })]);


    menuFlow = new Menu('Flow', true, false);
    menuFlow.addItems([
        menuItemList          = new MenuItem('List',              {icon: iconList,   callback: e => actionManager.do(getCreateNodeAction(LIST,         btnNumber.div, getCreateOptions(e)))}),
        menuFlowSep1          = new MenuItem('',                  {separator: true}),     
        menuItemItems         = new MenuItem('Items',             {icon: iconItems,  callback: e => actionManager.do(getCreateNodeAction(ITEMS,        btnNumber.div, getCreateOptions(e)))}),
        menuItemSelect        = new MenuItem('Select',            {icon: iconSelect, callback: e => actionManager.do(getCreateNodeAction(SELECT,       btnNumber.div, getCreateOptions(e)))}),
        menuItemIfElse        = new MenuItem('I&hairsp;f / else', {icon: iconIfElse, callback: e => actionManager.do(getCreateNodeAction(IF_ELSE,      btnNumber.div, getCreateOptions(e))), disambiguate: true}),
        menuFlowSep2          = new MenuItem('',                  {separator: true}),
      //menuItemStart         = new MenuItem('Start',             {icon: iconStart,  callback: e => actionManager.do(getCreateNodeAction(START,        btnNumber.div, getCreateOptions(e)))}),
        menuItemRepeat        = new MenuItem('Repeat',            {icon: iconRepeat, callback: e => actionManager.do(getCreateNodeAction(REPEAT,       btnNumber.div, getCreateOptions(e)))}),
        menuFlowSep3          = new MenuItem('',                  {separator: true}),
        menuItemCache         = new MenuItem('Cache',             {icon: iconCache,  callback: e => actionManager.do(getCreateNodeAction(CACHE,        btnNumber.div, getCreateOptions(e)))}),
        menuItemCopy          = new MenuItem('Copy',              {icon: iconCopy,   callback: e => actionManager.do(getCreateNodeAction(COPY,         btnNumber.div, getCreateOptions(e)))}),
        menuItemCustomInputs  = new MenuItem('Custom inputs',     {                  callback: e => actionManager.do(getCreateNodeAction(NODE_INPUTS,  btnNumber.div, getCreateOptions(e)))}),
        menuItemCustomOutputs = new MenuItem('Custom outputs',    {                  callback: e => actionManager.do(getCreateNodeAction(NODE_OUTPUTS, btnNumber.div, getCreateOptions(e)))})]);
    
    
    menuMath = new Menu('Math', true, false);
    menuMath.addItems([
        new MenuItem('Power',       {icon: iconExponent, callback: e => actionManager.do(getCreateNodeAction(NUMBER_EXPONENT, btnNumber.div, getCreateOptions(e)))}),
        new MenuItem('Multiply',    {icon: iconMultiply, callback: e => actionManager.do(getCreateNodeAction(NUMBER_MULTIPLY, btnNumber.div, getCreateOptions(e)))}),
        new MenuItem('Divide',      {icon: iconDivide,   callback: e => actionManager.do(getCreateNodeAction(NUMBER_DIVIDE,   btnNumber.div, getCreateOptions(e)))}),
        new MenuItem('Remainder',   {icon: iconModulo,   callback: e => actionManager.do(getCreateNodeAction(NUMBER_MODULO,   btnNumber.div, getCreateOptions(e)))}),
        new MenuItem('Add',         {icon: iconAdd,      callback: e => actionManager.do(getCreateNodeAction(NUMBER_ADD,      btnNumber.div, getCreateOptions(e)))}),
        new MenuItem('Subtract',    {icon: iconSubtract, callback: e => actionManager.do(getCreateNodeAction(NUMBER_SUBTRACT, btnNumber.div, getCreateOptions(e)))})]);
        

    menuBoolean = new Menu('Boolean', true, false);
    menuBoolean.addItems([
        new MenuItem('Not', {icon: iconNot, callback: e => actionManager.do(getCreateNodeAction(NUMBER_NOT, btnNumber.div, getCreateOptions(e)))}),
        new MenuItem('And', {icon: iconAnd, callback: e => actionManager.do(getCreateNodeAction(NUMBER_AND, btnNumber.div, getCreateOptions(e)))}),
        new MenuItem('Or',  {icon: iconOr , callback: e => actionManager.do(getCreateNodeAction(NUMBER_OR,  btnNumber.div, getCreateOptions(e)))}),
        new MenuItem('Xor', {icon: iconXor, callback: e => actionManager.do(getCreateNodeAction(NUMBER_XOR, btnNumber.div, getCreateOptions(e)))})]);
        
    
    menuCondition = new Menu('Conditional', true, false);
    menuCondition.addItems([
        new MenuItem('Greater',          {icon: iconGreater,        callback: e => actionManager.do(getCreateNodeAction(NUMBER_GREATER,          btnNumber.div, getCreateOptions(e)))}),
        new MenuItem('Greater or equal', {icon: iconGreaterOrEqual, callback: e => actionManager.do(getCreateNodeAction(NUMBER_GREATER_OR_EQUAL, btnNumber.div, getCreateOptions(e)))}),
        new MenuItem('Equal',            {icon: iconEqual,          callback: e => actionManager.do(getCreateNodeAction(NUMBER_EQUAL,            btnNumber.div, getCreateOptions(e)))}),
        new MenuItem('Not equal',        {icon: iconNotEqual,       callback: e => actionManager.do(getCreateNodeAction(NUMBER_NOT_EQUAL,        btnNumber.div, getCreateOptions(e)))}),
        new MenuItem('Less or equal',    {icon: iconLessOrEqual,    callback: e => actionManager.do(getCreateNodeAction(NUMBER_LESS_OR_EQUAL,    btnNumber.div, getCreateOptions(e)))}),
        new MenuItem('Less',             {icon: iconLess,           callback: e => actionManager.do(getCreateNodeAction(NUMBER_LESS,             btnNumber.div, getCreateOptions(e)))})]);
        
    
    menuNumber = new Menu('Numbers', true, false);
    menuNumber.addItems([
                                      new MenuItem('Number',          {icon: iconNumber,       callback: e => actionManager.do(getCreateNodeAction(NUMBER,             btnNumber.div, getCreateOptions(e)))}),
                                      new MenuItem('',                {separator: true}),
                                      new MenuItem('Absolute',        {icon: iconAbsolute,     callback: e => actionManager.do(getCreateNodeAction(NUMBER_ABSOLUTE,    btnNumber.div, getCreateOptions(e)))}),
                                      new MenuItem('Round',           {icon: iconRound,        callback: e => actionManager.do(getCreateNodeAction(NUMBER_ROUND,       btnNumber.div, getCreateOptions(e)))}),
                                      new MenuItem('Limits',          {icon: iconLimits,       callback: e => actionManager.do(getCreateNodeAction(NUMBER_LIMITS,      btnNumber.div, getCreateOptions(e)))}),
                                      new MenuItem('',                {separator: true}),
                                      new MenuItem('Math',            {icon: iconMath,         childMenu: menuMath,      callback: e => actionManager.do(getCreateNodeAction(NUMBER_MATH,        btnNumber.div, getCreateOptions(e)))}),
                                      new MenuItem('Boolean',         {icon: iconBoolean,      childMenu: menuBoolean,   callback: e => actionManager.do(getCreateNodeAction(NUMBER_BOOLEAN,     btnNumber.div, getCreateOptions(e)))}),
                                      new MenuItem('Condition',       {icon: iconCondition,    childMenu: menuCondition, callback: e => actionManager.do(getCreateNodeAction(NUMBER_CONDITION,   btnNumber.div, getCreateOptions(e)))}),
                                      new MenuItem('',                {separator: true}),
        menuItemSeries              = new MenuItem('Series',          {icon: iconSeries,       callback: e => actionManager.do(getCreateNodeAction(NUMBER_SERIES,      btnNumber.div, getCreateOptions(e)))}),
                                      new MenuItem('Random',          {icon: iconRandom,       callback: e => actionManager.do(getCreateNodeAction(NUMBER_RANDOM,      btnNumber.div, getCreateOptions(e)))}),
                                      new MenuItem('',                {separator: true}),
                                      new MenuItem('Interpolate',     {icon: iconInterpolate,  callback: e => actionManager.do(getCreateNodeAction(NUMBER_INTERPOLATE, btnNumber.div, getCreateOptions(e)))}),
        menuItemNumberSep1          = new MenuItem('',                {separator: true}),
        menuItemNumberConvertToText = new MenuItem('Convert to text', {icon: iconNumberToText, callback: e => actionManager.do(getCreateNodeAction(NUMBER_TO_TEXT,     btnNumber.div, getCreateOptions(e)))})]);
        
    
    menuString = new Menu('Text nodes', true, false);
    menuString.addItems([
        new MenuItem('Text',      {icon: iconText,          callback: e => actionManager.do(getCreateNodeAction(TEXT,           btnText.div, getCreateOptions(e)))}),
        new MenuItem('',          {separator: true}),
        new MenuItem('Substring', {icon: iconTextSubstring, callback: e => actionManager.do(getCreateNodeAction(TEXT_SUBSTRING, btnText.div, getCreateOptions(e)))}),
        new MenuItem('Character', {icon: iconTextCharacter, callback: e => actionManager.do(getCreateNodeAction(TEXT_CHAR,      btnText.div, getCreateOptions(e)))}),
        new MenuItem('',          {separator: true}),
        new MenuItem('Join',      {icon: iconTextJoin,      callback: e => actionManager.do(getCreateNodeAction(TEXT_JOIN,      btnText.div, getCreateOptions(e)))}),
        new MenuItem('Replace',   {icon: iconTextReplace,   callback: e => actionManager.do(getCreateNodeAction(TEXT_REPLACE,   btnText.div, getCreateOptions(e)))}),
        new MenuItem('',          {separator: true}),
        new MenuItem('CSV',       {icon: iconTextCSV,       callback: e => actionManager.do(getCreateNodeAction(TEXT_CSV,       btnText.div, getCreateOptions(e)))}),
        new MenuItem('',          {separator: true}),
        new MenuItem('Fetch',     {icon: iconTextFetch,     callback: e => actionManager.do(getCreateNodeAction(TEXT_FETCH,     btnText.div, getCreateOptions(e)))})]);
    

    menuColorStyle = new Menu('Color style', true, false);
    menuColorStyle.addItems([
        new MenuItem('Link existing...', {icon: iconColorStyleReplace, callback: e => actionManager.do(getCreateNodeAction(COLOR_STYLE,  btnColor.div, getCreateOptions(e, {existing: true})))})]);

        
    menuColor = new Menu('Colors', true, true);
    menuColor.addItems([
        menuItemColor        = new MenuItem('Color',         {icon: iconColor,            callback: e => actionManager.do(getCreateNodeAction(COLOR,             btnColor.div, getCreateOptions(e,  {random: e.altKey && !getCtrlKey(e)})))}),
                               new MenuItem('',              {separator: true}),
                               new MenuItem('Valid sRGB',    {icon: iconValidColor,       callback: e => actionManager.do(getCreateNodeAction(VALID_COLOR,       btnColor.div, getCreateOptions(e)))}),
        menuItemCorrectColor = new MenuItem('Correct color', {icon: iconCorrectColor,     callback: e => actionManager.do(getCreateNodeAction(CORRECT_COLOR,     btnColor.div, getCreateOptions(e)))}),
        menuItemColorSep1    = new MenuItem('',              {separator: true}),
                               new MenuItem('Web contrast',  {icon: iconWebContrast,      callback: e => actionManager.do(getCreateNodeAction(COLOR_CONTRAST,    btnColor.div, getCreateOptions(e)))}),
        menuItemColorblind   = new MenuItem('Colorblind',    {icon: iconColorblind,       callback: e => actionManager.do(getCreateNodeAction(COLORBLIND,        btnColor.div, getCreateOptions(e)))}),
                               new MenuItem('',              {separator: true}),
                               new MenuItem('Interpolate',   {icon: iconColorInterpolate, callback: e => actionManager.do(getCreateNodeAction(COLOR_INTERPOLATE, btnColor.div, getCreateOptions(e)))}),
        menuItemColorBlend   = new MenuItem('Blend',         {icon: iconColorBlend,       callback: e => actionManager.do(getCreateNodeAction(COLOR_BLEND,       btnColor.div, getCreateOptions(e)))})]);

    menuColor.init = () => 
    {
        menuItemColor.setIcon(iconColor);
    };

    
    menuStyle = new Menu('Styles', true, false);
    menuStyle.addItems([
        menuItemStyleFill   = new MenuItem('Fill',          {icon: iconFill,       callback: e => actionManager.do(getCreateNodeAction(FILL,   btnColor.div, getCreateOptions(e)))}),
        menuItemStyleStroke = new MenuItem('Stroke',        {icon: iconStroke,     callback: e => actionManager.do(getCreateNodeAction(STROKE, btnColor.div, getCreateOptions(e)))}),
        menuItemStyleSep1   = new MenuItem('',              {separator: true}),
                              new MenuItem('Color style',   {icon: iconColorStyle, callback: e => actionManager.do(getCreateNodeAction(COLOR_STYLE,  btnColor.div, getCreateOptions(e, {existing: true})))})]);
                            //new MenuItem('Color style',   {icon: iconColorStyle, childMenu: menuColorStyle, callback: e => actionManager.do(getCreateNodeAction(COLOR_STYLE,  btnColor.div, getCreateOptions(e)))})]);
    
    
    menuShape = new Menu('Shapes', true, false);
    menuShape.addItems([
        new MenuItem('Rectangle', {icon: iconRectangle, callback: e => actionManager.do(getCreateNodeAction(RECTANGLE, btnShape.div, getCreateOptions(e)))}),
        new MenuItem('Line',      {icon: iconLine,      callback: e => actionManager.do(getCreateNodeAction(LINE,      btnShape.div, getCreateOptions(e)))}),
        new MenuItem('Ellipse',   {icon: iconEllipse,   callback: e => actionManager.do(getCreateNodeAction(ELLIPSE,   btnShape.div, getCreateOptions(e)))}),
        new MenuItem('Polygon',   {icon: iconPolygon,   callback: e => actionManager.do(getCreateNodeAction(POLYGON,   btnShape.div, getCreateOptions(e)))}),
        new MenuItem('Star',      {icon: iconStar,      callback: e => actionManager.do(getCreateNodeAction(STAR,      btnShape.div, getCreateOptions(e)))})]);


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
        menuItemZoomTo100 = new MenuItem('Zoom to 100%', {shortcut: osCtrl () + '0', callback: () => graphView.setPanAndZoom(isEmpty(graphView.graph.nodes) ? point(0, 0) : graphView.pan, 1)})]);//,
                        //  new MenuItem('',             {separator: true}),
                        //  new MenuItem('Window',       {childMenu: menuWindow})]);

        
    menuGraph = new Menu('Graph menu', false, false);
    menuGraph.addItems([
        menuItemGraphPaste          = new MenuItem('Paste here',      {shortcut: osCtrl()             + 'V', callback: e => { hideAllMenus(); graphView.pasteCopiedNodes(false, e.clientX, e.clientY - menuBarHeight); }}),
        menuItemGraphPasteConnected = new MenuItem('Paste connected', {shortcut: osCtrl() + osShift() + 'V', callback: e => { hideAllMenus(); graphView.pasteCopiedNodes(true,  e.clientX, e.clientY - menuBarHeight); }})]);

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
        menuItemNodeCopy               = new MenuItem('Copy',                {shortcut:  osCtrl() + 'C',              callback: () => graphView.copySelectedNodes() }),
        menuItemNodeCopyAsJavascript   = new MenuItem('Copy as Javascript',  {shortcut:  osCtrl() + osShift() + 'C',  callback: () => graphView.copySelectedNodesAsJavascript() }),
        menuItemNodeDuplicate          = new MenuItem('Duplicate',           {shortcut:  osCtrl() + 'D',              callback: e => { hideAllMenus(); graphView.duplicateSelectedNodes(false); }}),
        menuItemNodeDuplicateConnected = new MenuItem('Duplicate connected', {shortcut:  osCtrl() + osShift() + 'D',  callback: e => { hideAllMenus(); graphView.duplicateSelectedNodes(true ); }}),
                                       //new MenuItem('',                    {separator: true}),
      //menuItemNodeLayout             = new MenuItem('Layout',              {enabled:   false, shortcut: osCtrl() + 'L', callback: e => { hideAllMenus(); layoutSelectedNodes(); }}),
        menuItemNodeSep1               = new MenuItem('',                    {separator: true}),
        menuItemNodeSelect             = new MenuItem('Select',              {childMenu: menuNodeSelect}),
        menuItemNodeSep2               = new MenuItem('',                    {separator: true}),
        // menuItemNodeRename             = new MenuItem('Rename',              {shortcut:  osCtrl() + 'R',              callback: e => { hideAllMenus(); graphView.renameSelectedNode(); }}),
        menuItemNodeEdit               = new MenuItem('Edit...',             {callback: e => { hideAllMenus(); graphView.editSelectedCustomNode(); }}),
                                         new MenuItem('',                    {separator: true}),
        // menuItemNodeActivate           = new MenuItem('Activate',            {callback: () => makeSelectedNodesActive()}),
        menuItemNodeEnableDisable      = new MenuItem('Enable/Disable',      {shortcut:  osCtrl() + osShift() + 'E',  callback: () => actionManager.do(new ToggleDisableNodesAction(graphView.graph, graphView.selectedNodes.map(n => n.id)))}),
        menuItemNodeSep3               = new MenuItem('',                    {separator: true}),
        menuItemNodeRemove             = new MenuItem('Remove',              {shortcut:  osCtrl() + '⌫',             callback: e => { hideAllMenus(); graphView.removeSelectedNodes(true); }})]);


    menuNode.init = () => 
    {
        const single   = graphView.selectedNodes.length == 1;
        //const parallel = nodesAreParallel(graphView.selectedNodes);

        const canDisable = !graphView.selectedNodes.find(n => !n.canDisable);

        const group = 
               graphView.selectedNodes.length == 1 
            && graphView.selectedNodes[0].type == NODE_GROUP;   
    

        updateMenuItemDisplay(menuItemNodeSep1         .div, single);
      //updateMenuItemDisplay(menuItemNodeRename       .div, single);
        updateMenuItemDisplay(menuItemNodeEdit         .div, single && group);
        updateMenuItemDisplay(menuItemNodeSep2         .div, single && group);
        updateMenuItemDisplay(menuItemNodeSelect       .div, single);
        updateMenuItemDisplay(menuItemNodeSep3         .div, canDisable);
        updateMenuItemDisplay(menuItemNodeEnableDisable.div, canDisable);
    };


    menuRemoveLicense = new Menu('Remove license', false, false);
    menuRemoveLicense.addItems([
                                new MenuItem('Cut',   {callback: () => { hideAllMenus(); document.execCommand('copy'); clearSelectedText(productKeyInput); updateProductKeyDots(); }}),
                                new MenuItem('Copy',  {callback: () => { hideAllMenus(); document.execCommand('copy'); }}),
                                new MenuItem('Paste', {callback: () => { hideAllMenus(); document.execCommand('paste'); }}),
        menuItemLicenseSep1   = new MenuItem('', {separator: true}),
        menuItemLicenseRemove = new MenuItem('Remove from this computer', {callback: () => { hideAllMenus(); removeLicense(); }})]);


    menuText    = new Menu('Text menu', false, false);
    menuTextbox = new Menu('Textbox menu', false, true);


    menuLocalStyles = new Menu('Local styles',   true,  true);
    menuSelectParam = new Menu('Select options', false, true);

    
    btnMain   = new MenuButton('', menuMain,   {useMenuName: true, highlight: () => currentMenus.includes(menuMain  ), callback: () => updatePanMode(false)});
    btnFlow   = new MenuButton('', menuFlow,   {useMenuName: true, highlight: () => currentMenus.includes(menuFlow  ), callback: () => updatePanMode(false)});
    btnNumber = new MenuButton('', menuNumber, {useMenuName: true, highlight: () => currentMenus.includes(menuNumber), callback: () => updatePanMode(false)});
    btnText   = new MenuButton('', menuString, {useMenuName: true, highlight: () => currentMenus.includes(menuString), callback: () => updatePanMode(false)});
    btnColor  = new MenuButton('', menuColor,  {useMenuName: true, highlight: () => currentMenus.includes(menuColor ), callback: () => updatePanMode(false)});
    btnStyle  = new MenuButton('', menuStyle,  {useMenuName: true, highlight: () => currentMenus.includes(menuStyle ), callback: () => updatePanMode(false)});
    btnShape  = new MenuButton('', menuShape,  {useMenuName: true, highlight: () => currentMenus.includes(menuShape ), callback: () => updatePanMode(false)});

    btnGroup  = new MenuButton('Node groups', null, {callback: () => 
    {
        const create = new CreateNodeAction(graphView.graph, NODE_GROUP, btnGroup.div);
        actionManager.do(create);

        graphView.updateNodes([create.node]);
        graphView.updateScrollWithBounds();

        updatePanMode(false);
    }});
    
    btnHand = new MenuButton('Hand tool', null, {callback: () => 
    { 
        updatePanMode(!panMode);
    }});

    btnComment = new MenuButton('Add comment', null, {callback: () => 
    {
        const create = new CreateNodeAction(graphView.graph, COMMENT, btnComment.div);
        actionManager.do(create);

        graphView.updateNodes([create.node]);
        graphView.updateScrollWithBounds();

        updatePanMode(false);
    }});


    btnZoom = new MenuButton(
        '', 
        menuZoom, 
        { 
            useMenuName: true, 
            selectLast:  false, 
            highlight:   () => currentMenus.includes(menuZoom),
            tooltip:     ttMinValueZoom
        });

        
    btnZoom.div.appendChild(createDiv('', 'zoomIconOverlay'));

    btnZoom.divIcon.style.textAlign          = 'center';
    btnZoom.divIcon.style.fontVariantNumeric = 'tabular-nums';
    btnZoom.divIcon.style.letterSpacing      = '-0.8px';


    btnMain.div.style.paddingLeft = '6px';

    btnStyle.setIcon(iconStyle);

    btnZoom.div.style.position     = 'absolute';
    btnZoom.div.style.right        = '0px';
    btnZoom.div.style.paddingRight = '5px';
    btnZoom.div.style.paddingLeft  = '11px';
    // btnZoom.div.style.boxShadow = '0 0 0 1px red inset';


    btnMain   .setIcon(iconGenerator);
    btnShape  .setIcon(iconShapes);
    btnGroup .setIcon(iconNodeGroup);
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



function initTextMenu(textbox)
{
    menuText.clearItems();

    menuText.addItems([
        new MenuItem('Cut',   {enabled: !textbox.control.readOnly, callback: () => { hideAllMenus(); document.execCommand('copy'); clearSelectedText(textbox); }}),
        new MenuItem('Copy',  {callback: () => { hideAllMenus(); document.execCommand('copy'); }}),
        new MenuItem('Paste', {enabled: !textbox.control.readOnly, callback: () => { hideAllMenus(); document.execCommand('paste'); }})]);
}



function initTextboxMenu(textbox)
{
    menuTextbox.clearItems();


    const style = getComputedStyle(textbox);

    let menuItemLeft,
        menuItemCenter,
        menuItemRight,
        menuItemJustify;


    const param = textbox.control.param;
console.log('param =', param);

    menuTextbox.addItems([
                          new MenuItem('Cut',          { enabled: !textbox.control.readOnly, callback: () => { hideAllMenus(); document.execCommand('copy'); clearSelectedText(textbox); }}),
                          new MenuItem('Copy',         { callback: () => { hideAllMenus(); document.execCommand('copy'); }}),
                          new MenuItem('Paste',        { enabled: !textbox.control.readOnly, callback: () => { hideAllMenus(); document.execCommand('paste'); }}),
                          new MenuItem('',             { separator: true }),
        menuItemLeft    = new MenuItem('Align left',   { callback: () => { hideAllMenus(); actionManager.do(new SetParamSettingAction(mainGraph, param, 'align', 'left'   )); }}),
        menuItemCenter  = new MenuItem('Align center', { callback: () => { hideAllMenus(); actionManager.do(new SetParamSettingAction(mainGraph, param, 'align', 'center' )); }}),
        menuItemRight   = new MenuItem('Align right',  { callback: () => { hideAllMenus(); actionManager.do(new SetParamSettingAction(mainGraph, param, 'align', 'right'  )); }}),
        menuItemJustify = new MenuItem('Justify',      { callback: () => { hideAllMenus(); actionManager.do(new SetParamSettingAction(mainGraph, param, 'align', 'justify')); }})]);


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