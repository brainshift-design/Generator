var deleteNodesWarningDialogVisible = false;



function checkDeleteNodesWarning(success)
{
    if (graph.currentPage.nodes.length > 0)
        showDeleteNodesWarningDialog(success);
    else
        success();
}



function showDeleteNodesWarningDialog(success)
{
    deleteNodesWarningDialog.success           = success;

    deleteNodesWarningDialog.style.left        = '50%';
    deleteNodesWarningDialog.style.top         = '50%';
    deleteNodesWarningDialog.style.transform   = 'translateX(-50%) translateY(-50%)';

    deleteNodesWarningDialogBack.style.display = 'block';
    deleteNodesWarningDialog    .style.display = 'block';
    
    deleteNodesWarningDialogVisible            = true;
    
    deleteNodesWarningTitle.buttonDown0        = false;
         
    deleteNodesWarningTitle.moveStart          = point_NaN;
    deleteNodesWarningTitle.pStart             = point_NaN;
}



function hideDeleteNodesWarningDialog()
{
    deleteNodesWarningDialogBack.style.display = 'none';
    deleteNodesWarningDialog    .style.display = 'none';
    deleteNodesWarningDialogVisible            = false;
}



deleteNodesWarningClose.addEventListener('pointerdown', e => e.stopPropagation());



deleteNodesWarningTitle.addEventListener('pointerdown', e => 
{
    deleteNodesWarningTitle.setPointerCapture(e.pointerId);
    deleteNodesWarningTitle.buttonDown0 = true;

    deleteNodesWarningTitle.moveStart = point(deleteNodesWarningDialog.offsetLeft, deleteNodesWarningDialog.offsetTop);
    deleteNodesWarningTitle.pStart    = point(e.clientX, e.clientY);
});



deleteNodesWarningTitle.addEventListener('pointermove', e =>
{
    if (deleteNodesWarningTitle.buttonDown0)
    {
        deleteNodesWarningDialog.style.left = (deleteNodesWarningTitle.moveStart.x + (e.clientX - deleteNodesWarningTitle.pStart.x)) + 'px';
        deleteNodesWarningDialog.style.top  = (deleteNodesWarningTitle.moveStart.y + (e.clientY - deleteNodesWarningTitle.pStart.y)) + 'px';
    }
});



deleteNodesWarningTitle.addEventListener('pointerup', e =>
{
    deleteNodesWarningTitle.buttonDown0 = false;
    deleteNodesWarningTitle.releasePointerCapture(e.pointerId);
});




function deleteNodesWarningToNodes(str)
{
    str = str.replace(',', ' ');
    
    const nodeIds = str.split(' ').filter(i => i);

    uiRemoveConnsToNodes(nodeIds);

    if (!isEmpty(nodeIds))
        hideDeleteNodesWarningDialog();
}