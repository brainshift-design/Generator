menuSelect.addEventListener('change', async function(e) 
{
    switch (e.detail.selectedValue)
    {
        case 'saveLocal': saveToLocalFile('graph.gen', uiGraph.save()); break;
        case 'loadLocal': loadFromLocalFile();                          break;
        case 'duplicate': console.log(uiGraph.save());                  break;
        case 'productKey': showProductKeyDialog();                      break;
    }
});



productKeyClose.addEventListener('click', e =>
{
    hideProductKeyDialog();
});