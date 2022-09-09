class MenuItem
{
    parentMenu = null;
    
    checked    = false;
    icon       = ''; // svg
    name       = '';
    shortcut   = '';

    callback   = null;


    div;

    divCheck;
    divIcon;
    divName;
    divShortcut;



    constructor(name)
    {
        this.name        = name;


        this.div         = createDiv('menuItem');

        this.divCheck    = createDiv('menuItemCheck');
        this.divIcon     = createDiv('menuItemIcon');
        this.divName     = createDiv('menuItemName');
        this.divShortcut = createDiv('menuItemShortcut');

        this.div.appendChild(this.divCheck);
        this.div.appendChild(this.divIcon);
        this.div.appendChild(this.divName);
        this.div.appendChild(this.divShortcut);
    }
}