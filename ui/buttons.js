function updateToggleShowWiresButton()
{
    const color = 
           graphView.showWires 
        || btnToggleWires.mouseOver 
        ? 'white' 
        : '%23d5d5d5';

    btnToggleWires.style.background         = 'url(\'data:image/svg+xml;utf8,<svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.65006 17.8918C15.4645 18.1216 13.0131 12.9935 10.1855 10.4007C7.35798 7.80786 4.94977 2.68156 17.7642 2.91138" stroke="'+color+'" stroke-width="1"/><circle cx="2.65005" cy="17.8918" r="2" transform="rotate(2.45954 2.65005 17.8918)" fill="'+color+'"/><circle cx="17.7642" cy="2.91141" r="2" transform="rotate(-177.54 17.7642 2.91141)" fill="'+color+'"/></svg>\')';
    btnToggleWires.style.backgroundPosition = '50% 50%';
    btnToggleWires.style.backgroundRepeat   = 'no-repeat';
    btnToggleWires.style.backgroundColor    = graphView.showWires ? 'var(--figma-color-bg-brand)' : (btnToggleWires.mouseOver ? 'black' : '#2c2c2c');
}



btnToggleWires.addEventListener('pointerover',  () => updateToggleShowWiresButton());
btnToggleWires.addEventListener('pointerleave', () => updateToggleShowWiresButton());