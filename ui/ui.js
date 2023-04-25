const defNodeWidth          = 114;
const resizeEdgeWidth       = 8;


var   overNumberControl     = null;
var   numberControlChanging = null;
var   overNumberControlCtrl = null;


const graph                 = new Graph();
var   graphView             = new GraphView(_graphView);
         
var   viewportZoom          = 1;
var   viewportRect          = new Rect();


const smallScrollGap        =  6;
const largeScrollGap        = 14;
       
var   menuBarHeight         = 40;
var   pagesBarHeight        = 36;


var   figFonts              = [];



function getTopHeight() 
{ 
    return menuBarHeight 
        + (settings.showPages ? pagesBarHeight : 0);
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
}



function uiNotify(text, options = {})
{
    if (options.delay        == undefined) options.delay        = 4000;
    if (options.error        == undefined) options.error        = false;
    if (options.prefix       == undefined) options.prefix       = '';
    if (options.buttonText   == undefined) options.buttonText   = '';
    if (options.buttonAction == undefined) options.buttonAction = NULL;


    uiQueueMessageToFigma({ 
        cmd:         'figNotify',
        text:         text,
        prefix:       options.prefix,
        delay:        options.delay,
        error:        options.error,
        buttonText:   options.buttonText,
        buttonAction: options.buttonAction
    });        
}



function uiShowClearUndoWarning(deleting)
{
    if (settings.showClearUndoWarning)
    {
        uiNotify(
            'Changing or deleting linked styles in Figma clears undo in Generator', 
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



function uiRestartGenerator(dataMode)
{
    uiSetLocalData('dataMode', boolToString(dataMode));
    uiPostMessageToFigma({cmd: 'figRestartGenerator'});
}