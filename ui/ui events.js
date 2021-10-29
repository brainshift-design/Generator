menuSelect.addEventListener('change', async function(e) 
{
    switch (e.detail.selectedValue)
    {
        case 'saveLocal': saveToLocalFile('graph.gen', uiGraph.save()); break;
        case 'loadLocal': loadFromLocalFile();                          break;
    }
});