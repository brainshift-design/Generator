const defNodeWidth    = 120;
const resizeEdgeWidth = 8;


var overNumberControl     = null;
var overColorControl      = null;

var numberControlChanging = null;

var overNumberControlCtrl = null;



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