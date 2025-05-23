const defNodeWidth          = 120;
const resizeEdgeWidth       = 8;


var   overNumberControl     = null;
var   overNumberControlCtrl = null;

var   numberControlChanging = null;


var   currentDialog         = null;


const graph                 = new Graph();
var   graphView             = new GraphView(_graphView);
         
var   viewportZoom          = 1;
var   viewportRect          = new Rect();


const smallScrollGap        =  6;
const largeScrollGap        = 14;
       
var   menuBarHeight         = 40;
var   pagesBarHeight        = 36;


var   figFonts              = [];
var   figUniqueFontNames    = [];



function getTopHeight() 
{ 
    return menuBarHeight 
        + (settings.showPages ? pagesBarHeight : 0);
}



function getBottomHeight() 
{ 
    return 0; //snapshotBar.offsetHeight;
}



function uiError(text, options = {}, delay = 6000)
{
    uiNotify(
        text, 
        {
            delay: delay,
            error: true,
            ...options
        });

    addMetricsEvent(METRICS_ERROR, 'text');
}



function uiNotify(text, options = {})
{
    if (options.delay        == undefined) options.delay        = 4000;
    if (options.error        == undefined) options.error        = false;
    if (options.prefix       == undefined) options.prefix       = ''; //PLUGIN_LOGO + '   '; // in release version the icon is shown, the logo is superfluous
    if (options.buttonText   == undefined) options.buttonText   = '';
    if (options.buttonAction == undefined) options.buttonAction = NULL;


    uiQueueMessageToFigma(
    { 
        cmd:         'figNotify',
        text:         text,
        prefix:       options.prefix,
        delay:        options.delay,
        error:        options.error,
        buttonText:   options.buttonText,
        buttonAction: options.buttonAction
    });        
}



function uiShowClearUndoWarning(objName)
{
    if (settings.showClearUndoWarning)
    {
        uiNotify(
            'Changing or deleting linked ' + objName + ' in Figma clears undo in Generator', 
            {
                buttonText:   'Ignore',
                buttonAction: 'hideClearUndoWarning',
                delay:         8000 
            });
    }
}



function uiHideClearUndoWarning()
{
    updateSettingAndMenu(
        'showClearUndoWarning',  
         true, 
        !settings.showClearUndoWarning);
}



function uiRestartGenerator(debugMode = false)
{
    uiSetLocalData('debugMode', boolToString(debugMode));
}



function uiUpdateZoom(zoom)
{
    viewportZoom = zoom;
}



function getMenuColorFromIndex(index)
{
    switch (index)
    {
        case 0: return [0, 0,   0];
        case 1: return [1, 1,   1];
        case 2: return [1, 0,   0];
        case 3: return [1, 0.5, 0];
        case 4: return [1, 1,   0];
        case 5: return [0, 1,   0];
        case 6: return [0, 0,   1];
        case 7: return [1, 0,   1];
    }
}



function hideTutorialsArrow()
{
    if (!tutorialsShown)
        return;

    findTutorials.style.display = 'none';
    uiSetLocalData('tutorials', 'true');
}



function showDialog(dialog, back = null, hideCurrent = true)
{
    if (hideCurrent)
        hideCurrentDialog();

    dialog.style.display = 'block';
    dialog.back          =  back;

    if (dialog.back)
        dialog.back.style.display = 'block';

    currentDialog = dialog;
}



function hideDialog(dialog, hideBack = true)
{
    dialog.style.display = 'none';

    if (   dialog.back
        && hideBack   )
        dialog.back.style.display = 'none';

    if (currentDialog == dialog)
        currentDialog = null;
}



function hideCurrentDialog()
{
    if (currentDialog)
        hideDialog(currentDialog);
}
