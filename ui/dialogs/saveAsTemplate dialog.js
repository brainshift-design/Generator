function showSaveAsTemplateDialog()
{
    hideCurrentDialog();


    saveAsTemplateDialog.copiedJson      = uiCopyNodes(graphView.selectedNodes.map(n => n.id));
    saveAsTemplateDialog.nameToDelete    = '';


    saveAsTemplateBack.addEventListener('pointerdown', e => { e.preventDefault(); });


    saveAsTemplateDialog.style.left      = '50%';
    saveAsTemplateDialog.style.top       = '50%';
    saveAsTemplateDialog.style.transform = 'translateX(-50%) translateY(-50%)';


    saveAsTemplateTitle.buttonDown0      = false;
    
    saveAsTemplateTitle.moveStart        = point_NaN;
    saveAsTemplateTitle.pStart           = point_NaN;
    
    // TODO suggest correct template name with increment
    
    saveAsTemplateInput.value            = 'template';
    saveAsTemplateInput.select();
    

    updateSaveAsTemplateInputBack();
 
    
    showDialog(saveAsTemplateDialog, saveAsTemplateBack);


    window.setTimeout(() => document.getElementById("saveAsTemplateInput").focus(), 0);
}



saveAsTemplateClose.addEventListener('pointerdown', e => e.stopPropagation());


saveAsTemplateTitle.addEventListener('pointerdown', e => 
{
    saveAsTemplateTitle.setPointerCapture(e.pointerId);
    saveAsTemplateTitle.buttonDown0 = true;

    saveAsTemplateTitle.moveStart = point(saveAsTemplateDialog.offsetLeft, saveAsTemplateDialog.offsetTop);
    saveAsTemplateTitle.pStart    = point(e.clientX, e.clientY);
});



saveAsTemplateTitle.addEventListener('pointermove', e =>
{
    if (saveAsTemplateTitle.buttonDown0)
    {
        saveAsTemplateDialog.style.left = (saveAsTemplateTitle.moveStart.x + (e.clientX - saveAsTemplateTitle.pStart.x)) + 'px';
        saveAsTemplateDialog.style.top  = (saveAsTemplateTitle.moveStart.y + (e.clientY - saveAsTemplateTitle.pStart.y)) + 'px';
    }
});



saveAsTemplateTitle.addEventListener('pointerup', e =>
{
    saveAsTemplateTitle.buttonDown0 = false;
    saveAsTemplateTitle.releasePointerCapture(e.pointerId);
});



saveAsTemplateInput.addEventListener('keydown', e => 
{
    e.stopPropagation();

    if (   e.code == 'Enter'
        || e.code == 'NumpadEnter')
    {
        saveSelectedAsTemplate(saveAsTemplateInput.value); 
        hideDialog(saveAsTemplateDialog);
    }
    else if (e.code == 'Escape')
        hideDialog(saveAsTemplateDialog);
});



saveAsTemplateInput.addEventListener('input', () =>
{
    updateSaveAsTemplateInputBack();
});



function updateSaveAsTemplateInputBack()
{
    saveAsTemplateInputBack.innerHTML          = saveAsTemplateInput.value == '' ? 'Node IDs' : '';
    saveAsTemplateInputBack.style.borderBottom = saveAsTemplateInput.value == '' ? '1px solid var(--figma-color-bg-tertiary)' : 'none';
}



saveAsTemplateInput.addEventListener('pointerup', () =>
{
    saveAsTemplateInput.select();
});



function saveSelectedAsTemplate(templateName)
{
    const found = userTemplates.find(t => t.name == templateName);

    
    if (found)
    {
        found.graph = saveAsTemplateDialog.copiedJson;
    }
    else
    {
        if (saveAsTemplateDialog.nameToDelete != '')
        {
            userTemplates.splice(
                userTemplates.findIndex(t => t.name == saveAsTemplateDialog.nameToDelete),
                0,
                {
                    name:  templateName,
                    graph: saveAsTemplateDialog.copiedJson
                });
        }
        else
        {    
            userTemplates.push(
                {
                    name:  templateName,
                    graph: saveAsTemplateDialog.copiedJson
                });
        }
    }


    postToServer(
    {
        action:   'saveTemplate',
        figmaId:   currentUser.id,
        name:      templateName,
        graph:     encodeURIComponent(saveAsTemplateDialog.copiedJson),
        sortOrder: userTemplates.length.toString()
    })
    .then(response =>
    {
        if (   saveAsTemplateDialog.nameToDelete != ''
            && saveAsTemplateDialog.nameToDelete != templateName)
        {
            postToServer(
            {
                action: 'deleteTemplate',
                figmaId: currentUser.id,
                name:    saveAsTemplateDialog.nameToDelete
            })
            .then(response =>
            {
                removeFromArrayWhere(userTemplates, t => t.name == saveAsTemplateDialog.nameToDelete);

                uiNotify('Renamed template \'' + saveAsTemplateDialog.nameToDelete + '\' to \'' + templateName + '\'');

                saveAsTemplateDialog.nameToDelete = '';
            })
            .catch(e =>
            {
                crash(e);
                throw e;
            });
        }    
        else if (response.result)
            uiNotify('Saved template \'' + templateName + '\'');
    })
    .catch(e =>
    {
        crash(e);
        throw e;
    });
}