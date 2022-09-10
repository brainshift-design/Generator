class MenuItem
{
    menu     = null;
    index    = -1;
    
    checked  = false;
    icon     = ''; // svg
    name     = '';
    shortcut = '';

    callback;


    div;

    divCheck;
    divIcon;
    divName;
    divShortcut;



    constructor(name, icon = '', callback = null)
    {
        this.name        = name;
        this.icon        = icon;

        this.callback    = callback;

        this.div         = createDiv('menuItem');

        this.divCheck    = createDiv('menuItemCheck');
        this.divIcon     = createDiv('menuItemIcon');
        this.divName     = createDiv('menuItemName');
        this.divShortcut = createDiv('menuItemShortcut');


        this.divName.innerHTML = this.name;


        if (this.icon != '')
        {
            this.divIcon.style.background         = 'url(\'data:image/svg+xml;utf8,' + this.icon + '\')';
            this.divIcon.style.backgroundPosition = '50% 50%';
            this.divIcon.style.backgroundRepeat   = 'no-repeat';
        }        

        this.div.appendChild(this.divCheck);
        this.div.appendChild(this.divIcon);
        this.div.appendChild(this.divName);
        this.div.appendChild(this.divShortcut);


        this.div.addEventListener('pointerup', () => { if (this.callback) this.callback(); });
    }
}