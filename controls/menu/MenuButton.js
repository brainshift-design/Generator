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


        this.div.addEventListener('pointerenter', () => this.div.style.background = 'black');
   
        this.div.addEventListener('pointerleave', () => 
        {
            if (  !currentMenu
                || currentMenu != this.menu) 
                this.div.style.background = 'transparent';
        });


        if (this.menu) 
        {
            this.divIcon.addEventListener('pointerdown', e => 
            {
                if (e.button == 0)
                {
                    if (this.lastItem)
                        this.lastItem.select();
                }
            });


            this.divArrow.addEventListener('pointerdown', e => 
            {
                if (e.button == 0)
                {
                    e.stopPropagation();

                    const curMenu = currentMenu;

                    if (currentMenu)
                        currentMenu.hide();
                    
                    if (curMenu != this.menu)
                        this.menu.show(this.div);
                }
            });
        }
        else if (this.callback) 
            this.div.addEventListener('click', this.callback);


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