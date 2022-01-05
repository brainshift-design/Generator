menuSelect.addEventListener('change', async function(e) 
{
    switch (e.detail.selectedValue)
    {
        case 'saveLocal':  saveToLocalFile('graph.json'); break;
        case 'loadLocal':  loadFromLocalFile();           break;
        case 'duplicate':  console.log(graph.save());   break;
        case 'productKey': showProductKeyDialog();        break;
    }
});



productKeyClose.addEventListener('click', e =>
{
    hideProductKeyDialog();
});