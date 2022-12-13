function writeTextToClipboard(str) 
{
    if (   navigator.clipboard 
        && window.isSecureContext) 
        return navigator.clipboard.writeText(str);

    else 
    {
        let textArea = document.createElement('textarea');

        textArea.value = str;

        textArea.style.position = 'fixed';
        textArea.style.left     = '-999999px';
        textArea.style.top      = '-999999px';
        
        document.body.appendChild(textArea);
        
        textArea.focus();
        textArea.select();
        
        return new Promise((res, rej) => 
        {
            document.execCommand('copy') ? res() : rej();
            textArea.remove();
        });
    }
}



function readTextFromClipboard() 
{
    if (   navigator.clipboard 
        && window.isSecureContext) 
        return navigator.clipboard.readText();

    else 
    {
        let textArea = document.createElement('textarea');

        textArea.style.position = 'fixed';
        textArea.style.left     = '-999999px';
        textArea.style.top      = '-999999px';
        
        document.body.appendChild(textArea);
        
        textArea.focus();
        textArea.select();
        
        return new Promise((res, rej) => 
        {
            document.execCommand('paste') ? res(textArea.value) : rej();
            textArea.remove();
        });
    }
}