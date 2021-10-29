function saveToLocalFile(filename, str) 
{
    var link = document.createElement('a');
    link.style.display = 'none';

    link.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(str));
    link.setAttribute('download', filename);
      
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}