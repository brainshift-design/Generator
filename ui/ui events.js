menuSelect.addEventListener('change', async function(e) 
{
    switch (e.detail.selectedValue)
    {
        case 'saveLocal':
        {
            let save = uiGraph.save();

            // const options = 
            // {
            //     types: 
            //     [{
            //         description: 'Text Files',
            //         accept:      { 'text/plain': ['.txt'] }
            //     }],
            // };

            // const handle = await window.showSaveFilePicker(options);

            //setPluginData('generator', save);
            
            saveToLocalFile('graph.gen', save);
            break;
        }

        case 'load':
            break;
    }
});