const defNodeWidth    = 100;
const resizeEdgeWidth = 8;


var overNumberControl     = null;
var overColorControl      = null;

var numberControlChanging = null;

var overNumberControlCtrl = null;



function uiError(text, delay = 6000)
{
    uiNotify(
        text, 
        {
            delay: delay, 
            error: true
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



// function uiFetch(request)
// {
//     console.log('uiFetch(\'%s\')', request);

//     uiPostMessageToFigma(
//     {
//         cmd:    'figFetch',
//         request: request
//     });
// }



// function uiFetchResponse(success, response)
// {
//     console.log('uiFetchResponse(\'%s\', \'%s\')', success, response);

//     uiPostMessageToGenerator(
//     {
//         cmd:     'genFetchResponse',
//         success:  success,
//         response: response
//     });
// }