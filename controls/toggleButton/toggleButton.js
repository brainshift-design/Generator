function createToggleButton(width, height)
{
    const btn = createDiv('toggleButton');
    btn.enabled = false;

    btn.addEventListener('pointerdown', e =>
    {
        e.stopPropagation();

        try
        {
            btn.setPointerCapture(e.pointerId);
            btn.enabled = !btn.enabled;
            btn.updateBackground(true);
        }
        catch {}
    });


    btn.addEventListener('pointerup', e =>
    {
        btn.releasePointerCapture(e.pointerId);
        btn.updateBackground(false);
    });


    btn.updateBackground = function(enabled)
    {
        const col = darkMode ? 'white' : 'black';

        const svgEnabled  = 'url(\'data:image/svg+xml;utf8,<svg width="6" height="14" viewBox="0 -2 6 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 1C4.10457 1 5 1.89543 5 3V5H6V3C6 1.34315 4.65685 0 3 0C1.34315 0 0 1.34315 0 3V5H1V3C1 1.89543 1.89543 1 3 1Z" fill="'+col+'"/><path d="M5 9H6V11C6 12.6569 4.65685 14 3 14C1.34315 14 0 12.6569 0 11V9H1V11C1 12.1046 1.89543 13 3 13C4.10457 13 5 12.1046 5 11V9Z" fill="'+col+'"/><path d="M2.5 4V10H3.5V4H2.5Z" fill="'+col+'"/></svg>\')';
        const svgDisabled = 'url(\'data:image/svg+xml;utf8,<svg width="6" height="14" viewBox="0 -2 6 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 5V3C5 1.89543 4.10457 1 3 1C1.89543 1 1 1.89543 1 3V5H0V3C0 1.34315 1.34315 0 3 0C4.65685 0 6 1.34315 6 3V5H5Z" fill="'+col+'"/><path d="M6 9H5V11C5 12.1046 4.10457 13 3 13C1.89543 13 1 12.1046 1 11V9H0V11C0 12.6569 1.34315 14 3 14C4.65685 14 6 12.6569 6 11V9Z" fill="'+col+'"/></svg>\')';

        btn.style.background = btn.enabled ? svgEnabled : svgDisabled;

        btn.style.backgroundPosition = '50% 50%';
        btn.style.backgroundRepeat   = 'no-repeat';

        btn.style.backgroundColor = 
               btn.enabled 
            && enabled 
            ? (darkMode ? '#444' : '#e6e6e6') 
            : 'transparent';
    };


    return btn;
}