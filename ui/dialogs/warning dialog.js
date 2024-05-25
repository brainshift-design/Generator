var warningDialogVisible = false;



function checkFileWarningDialog(success)
{
    if (graph.currentPage.nodes.length > 0)
        showWarningDialog(
            'Warning',
            'This will discard unsaved changes.&ensp;Are you sure?',
            'Discard',
            'No',
            success);
    else
        success();
}



function showWarningDialog(title, message, yes, no, success)
{
    warningDialogTitleText.innerHTML = title;
    warningDialogBodyText .innerHTML = message;
    
    btnWarningDialogYes   .innerHTML = yes;
    btnWarningDialogNo    .innerHTML = no;
    
    warningDialog.success            = success;
 
    warningDialog.style.left         = '50%';
    warningDialog.style.top          = '50%';
    warningDialog.style.transform    = 'translateX(-50%) translateY(-50%)';
 
    warningDialogBack.style.display  = 'block';
    warningDialog    .style.display  = 'block';
     
    warningDialogVisible             = true;
    
    warningDialogTitle.buttonDown0   = false;
         
    warningDialogTitle.moveStart     = point_NaN;
    warningDialogTitle.pStart        = point_NaN;
}



function hideWarningDialog()
{
    warningDialogBack.style.display = 'none';
    warningDialog    .style.display = 'none';
    warningDialogVisible            = false;
}



warningDialogClose.addEventListener('pointerdown', e => e.stopPropagation());



warningDialogTitle.addEventListener('pointerdown', e => 
{
    warningDialogTitle.setPointerCapture(e.pointerId);
    warningDialogTitle.buttonDown0 = true;

    warningDialogTitle.moveStart = point(warningDialog.offsetLeft, warningDialog.offsetTop);
    warningDialogTitle.pStart    = point(e.clientX, e.clientY);
});



warningDialogTitle.addEventListener('pointermove', e =>
{
    if (warningDialogTitle.buttonDown0)
    {
        warningDialog.style.left = (warningDialogTitle.moveStart.x + (e.clientX - warningDialogTitle.pStart.x)) + 'px';
        warningDialog.style.top  = (warningDialogTitle.moveStart.y + (e.clientY - warningDialogTitle.pStart.y)) + 'px';
    }
});



warningDialogTitle.addEventListener('pointerup', e =>
{
    warningDialogTitle.buttonDown0 = false;
    warningDialogTitle.releasePointerCapture(e.pointerId);
});




function warningDialogToNodes(str)
{
    str = str.replace(',', ' ');
    
    const nodeIds = str.split(' ').filter(i => i);

    uiRemoveConnsToNodes(nodeIds);

    if (!isEmpty(nodeIds))
        hideWarningDialog();
}