function saveToLocalFile(filename, str) 
{
    const link = document.createElement('a');
    link.style.display = 'none';
    
    link.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(str));
    link.setAttribute('download', filename);
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}



function loadFromLocalFile()
{
    const input = document.createElement('input');

    input.type          = 'file';
    input.style.display = 'none';

    input.addEventListener('change', e =>
    {
        const files = e.target.files;

        if (files.length > 0)
            loadGraphFromFile(files[0]);
    },
    false);

    //document.body.appendChild(input);
    input.click();
    //document.body.removeChild(input);
}



function loadGraphFromFile(file)
{
    const reader = new FileReader();

    reader.onload = () => 
    {
        console.log(reader.result);
        // clear uiGraph
        // load file contents
    };

    reader.readAsText(file);
}