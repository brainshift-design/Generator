var documentBodyClient = null;


document.button0 = false;



document.addEventListener('pointerdown', function(e)
{
    if (e.button == 0)
        document.button0 = true;
}, 
true);



document.addEventListener('pointerup', function(e)
{
    if (e.button == 0)
        document.button0 = false;
},
true);



document.addEventListener('pointerup', function(e)
{
    graphView.scrollbarX.moving = false;
    graphView.scrollbarY.moving = false;
});


document.addEventListener('wheel', e =>
{
    if (e.ctrlKey)
        e.preventDefault();
}, 
{ passive: false });



window.addEventListener('focus', () => graph.updatePages());
window.addEventListener('blur',  () => graph.updatePages());

document.addEventListener('contextmenu', e => e.preventDefault());




document.addEventListener('dragover',  e => e.preventDefault());

document.addEventListener('drop', async e => 
{
    e.preventDefault();
    

    const files = [];
    
    if (e.dataTransfer.items) 
    {
        for (const item of e.dataTransfer.items) 
        {
            if (item.kind === 'file') 
                files.push(item.getAsFile());
        }
    }
    else 
    {
        for (const file of e.dataTransfer.files) 
            files.push(file);
    }


    for (const file of files)
    {
        const reader = new FileReader();
        reader.readAsText(file,'UTF-8');

        reader.onload = e =>
        {
            if (isValidGeneratorFile(e.target.result))
                actionManager.do(new PasteNodesAction(e.target.result, false, false, true));
        };
    }
});



function isValidGeneratorFile(json)
{
    try
    {
        const obj = JSON.parse(json);

        return Array.isArray(obj.nodes)
            && Array.isArray(obj.connections);
    }
    catch (e)
    {
        return false;
    }
}