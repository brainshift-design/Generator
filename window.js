document.canResize = false;
document.resizing  = false;

document.startY    = 0;
document.startH    = 0;


document.addEventListener('pointerdown', function(e)
{
    if (document.canResize)
    {
        document.resizing = true;
        document.startY   = e.clientY;
        document.startH   = window.innerHeight;

        document.body.setPointerCapture(e.pointerId);
    }
});


document.addEventListener('pointermove', function(e)
{
    if (document.resizing)
    {
        parent.postMessage({ pluginMessage: { 
            cmd:    'resizeWindow', 
            width:  window.innerWidth, 
            height: document.startH + e.clientY - document.startY
        } }, '*');
    }
    else
    {
        document.canResize = document.body.clientHeight - e.clientY <= 8;
        document.body.style.cursor = document.canResize ? 'ns-resize' : 'default';
    }
});


document.addEventListener('pointerup', function(e)
{
    if (document.resizing)
    {
        document.resizing  = false;
        document.canResize = document.body.clientHeight - e.clientY <= 8;
        document.body.releasePointerCapture(e.pointerId);
    }
});
