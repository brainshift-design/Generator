var saveAsTemplateDialogVisible = false;



function showSaveAsTemplateDialog()
{
    saveAsTemplateDialog.copiedJson      = uiCopyNodes(graphView.selectedNodes.map(n => n.id));


    saveAsTemplateBack.addEventListener('pointerdown', e => { e.preventDefault(); });


    saveAsTemplateDialog.style.left      = '50%';
    saveAsTemplateDialog.style.top       = '50%';
    saveAsTemplateDialog.style.transform = 'translateX(-50%) translateY(-50%)';

    saveAsTemplateBack  .style.display   = 'block';
    saveAsTemplateDialog.style.display   = 'block';
    saveAsTemplateDialogVisible          = true;
  
    saveAsTemplateTitle.buttonDown0      = false;
       
    saveAsTemplateTitle.moveStart        = point_NaN;
    saveAsTemplateTitle.pStart           = point_NaN;
    
    // TODO suggest correct template name with increment

    saveAsTemplateInput.value            = 'template';
    saveAsTemplateInput.select();

    updateSaveAsTemplateInputBack();


    window.setTimeout(() => document.getElementById("saveAsTemplateInput").focus(), 0);
}



function hideSaveAsTemplateDialog()
{
    saveAsTemplateDialog.style.display = 'none';
    saveAsTemplateBack  .style.display = 'none';

    saveAsTemplateDialogVisible        = false;
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

    if (e.code == 'Enter')
    {
        saveSelectedAsTemplate(saveAsTemplateInput.value); 
        hideSaveAsTemplateDialog();
    }
    else if (e.code == 'Escape')
        hideSaveAsTemplateDialog();
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
        userTemplates.push(
        {
            name:  templateName,
            graph: saveAsTemplateDialog.copiedJson
        });
    }


    postToServer(
    {
        action: 'saveTemplate',
        userId:  currentUser.id,
        name:    templateName,
        graph:   encodeURIComponent(saveAsTemplateDialog.copiedJson)
    })
    .then(response =>
    {
        if (response.result)
            uiNotify('Saved template \'' + templateName + '\'');
    })
    .catch(e =>
    {
        console.error(e);
        throw e;
    });
}