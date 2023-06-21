// menuSelect.addEventListener('change', async function(e) 
// {
//     switch (e.detail.selectedValue)
//     {
//         case 'saveLocal':  saveToLocalFile('graph.json'); break;
//         case 'loadLocal':  loadFromLocalFile();           break;
//         case 'duplicate':  console.log(graph.toJson());     break;
//         case 'subscription': showSubscriptionDialog();        break;
//     }
// });



subscriptionClose.addEventListener('click', e =>
{
    hideSubscriptionDialog();
});



// btnToggleWires.addEventListener('pointerenter', () => { btnToggleWires.mouseOver = true;  updateToggleShowWiresButton(); });
// btnToggleWires.addEventListener('pointerleave', () => { btnToggleWires.mouseOver = false; updateToggleShowWiresButton(); });