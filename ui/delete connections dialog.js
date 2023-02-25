// var deleteConnectionsDialogVisible = false;



// function showDeleteConnectionsDialog()
// {
//     deleteConnectionsDialog.style.left      = '50%';
//     deleteConnectionsDialog.style.top       = '50%';
//     deleteConnectionsDialog.style.transform = 'translateX(-50%) translateY(-50%)';

//     deleteConnectionsDialog.style.display   = 'block';
//     deleteConnectionsDialogVisible          = true;
  
//     deleteConnectionsTitle.buttonDown0      = false;
       
//     deleteConnectionsTitle.moveStart        = point_NaN;
//     deleteConnectionsTitle.pStart           = point_NaN;
    
//     deleteConnectionsInput.value            = '';

//     updateDeleteConnectionsInputBack();


//     window.setTimeout(() => document.getElementById('deleteConnectionsInput').focus(), 0);
// }



// function hideDeleteConnectionsDialog()
// {
//     deleteConnectionsDialog.style.display = 'none';
//     deleteConnectionsDialogVisible        = false;
// }



// deleteConnectionsClose.addEventListener('pointerdown', e => e.stopPropagation());



// deleteConnectionsTitle.addEventListener('pointerdown', e => 
// {
//     deleteConnectionsTitle.setPointerCapture(e.pointerId);
//     deleteConnectionsTitle.buttonDown0 = true;

//     deleteConnectionsTitle.moveStart = point(deleteConnectionsDialog.offsetLeft, deleteConnectionsDialog.offsetTop);
//     deleteConnectionsTitle.pStart    = point(e.clientX, e.clientY);
// });



// deleteConnectionsTitle.addEventListener('pointermove', e =>
// {
//     if (deleteConnectionsTitle.buttonDown0)
//     {
//         deleteConnectionsDialog.style.left = (deleteConnectionsTitle.moveStart.x + (e.clientX - deleteConnectionsTitle.pStart.x)) + 'px';
//         deleteConnectionsDialog.style.top  = (deleteConnectionsTitle.moveStart.y + (e.clientY - deleteConnectionsTitle.pStart.y)) + 'px';
//     }
// });



// deleteConnectionsTitle.addEventListener('pointerup', e =>
// {
//     deleteConnectionsTitle.buttonDown0 = false;
//     deleteConnectionsTitle.releasePointerCapture(e.pointerId);
// });



// deleteConnectionsInput.addEventListener('input', () =>
// {
//     updateDeleteConnectionsInputBack();
// });



// function updateDeleteConnectionsInputBack()
// {
//     deleteConnectionsInputBack.innerHTML          = deleteConnectionsInput.value == '' ? 'Node IDs' : '';
//     deleteConnectionsInputBack.style.borderBottom = deleteConnectionsInput.value == '' ? '1px solid var(--figma-color-bg-tertiary)' : 'none';
// }



// deleteConnectionsInput.addEventListener('pointerup', () =>
// {
//     deleteConnectionsInput.select();
// });



// function deleteConnectionsToNodes(str)
// {
//     str = str.replace(',', ' ');
    
//     const nodeIds = str.split(' ').filter(i => i);

//     uiRemoveConnsToNodes(nodeIds);

//     if (!isEmpty(nodeIds))
//         hideDeleteConnectionsDialog();
// }