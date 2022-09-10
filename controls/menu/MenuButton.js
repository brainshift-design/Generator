class MenuButton
{
    name;
    menu;

    icon     = '';
    tooltip  = null;

    callback;


    div;

    divIcon;
    divArrow;



    constructor(name, menu, callback = null)
    {
        this.name     = name;
        this.menu     = menu;

        if (this.menu)
            this.menu.menuButton = this;


        this.callback = callback;


        this.div      = createDiv('menuButton');

        this.divIcon  = createDiv('menuButtonIcon');
        this.divArrow = createDiv('menuButtonArrow');


        if (this.menu) 
        {
            this.divArrow.addEventListener('pointerdown', e => 
            {
                if (e.button == 0)
                {
                    if (currentMenu) currentMenu.hide();
                    else             this.menu.show(this.div);
                }
            }, false);
        }
        else if (this.callback) 
            this.divArrow.addEventListener('click', this.callback);


        this.div.appendChild(this.divIcon);

        if (this.menu)
            this.div.appendChild(this.divArrow);

        menuBar.appendChild(this.div);


        this.update();
    }



    setIcon(icon)
    {
        this.icon = icon;
        this.update();
    }



    update()
    {
        this.div.style.width = this.menu ? 50 : 40;


        const icon = 
            this.icon != ''
            ? this.icon
            : this.menu
                ? this.menu.lastItem.icon
                : '';

        if (icon != '')
        {
            this.divIcon.style.background         = 'url(\'data:image/svg+xml;utf8,' + icon + '\')';
            this.divIcon.style.backgroundPosition = '100% 50%';
            this.divIcon.style.backgroundRepeat   = 'no-repeat';
        }
    }
}