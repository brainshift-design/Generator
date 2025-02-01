var _clipboard = '';



function writeTextToClipboard(str) 
{
    if (subscribed())
    {
        if (   navigator.clipboard 
            && window.isSecureContext) 
            return navigator.clipboard.writeText(str);

        else 
        {
            const prevActive = document.activeElement;
            const textArea   = document.createElement('textarea');

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

                prevActive.focus();
            });
        }
    }
    else
        _clipboard = str;
}



function readTextFromClipboard() 
{
    if (subscribed())
    {
        if (   navigator.clipboard 
            && window.isSecureContext) 
        {
            return navigator.clipboard.readText();
        }

        else 
        {
            let textArea = document.createElement('textarea');
            textArea.style.display = 'none';
            document.body.appendChild(textArea);
            
            textArea.focus({preventScroll: true});
            textArea.select();
            
            return new Promise((res, rej) => 
            {
                document.execCommand('paste') 
                    ? res(textArea.value) 
                    : rej('Error pasting from clipboard');
                    
                textArea.remove();
            });
        }
    }
    else
    {
        return new Promise((res, rej) => res(_clipboard));
    }
}