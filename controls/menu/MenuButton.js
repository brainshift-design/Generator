class MenuButton
{
    name;
    menu;

    icon     = '';

    callback;
    useMenuName;

    div;

    divIcon;
    divArrow;

    overArrow = false;

    tooltipIcon;
    tooltipArrow;



    constructor(name, menu, options = {})
    {
        this.name     = name;
        this.menu     = menu;

        if (this.menu)
            this.menu.button = this;


        this.callback    = options.callback    ? options.callback    : null;
        this.useMenuName = options.useMenuName ? options.useMenuName : false;


        this.div      = createDiv('menuButton');

        this.divIcon  = createDiv('menuButtonIcon');
        this.divArrow = createDiv('menuButtonArrow');


        this.div.addEventListener('pointerenter', () => 
        {
            if (!currentMenus.includes(this.menu))
                this.div.style.background = '#111';
        });
   

        this.div.addEventListener('pointerleave', () => 
        {
            if (    currentMenus.length == 0
                || !currentMenus.includes(this.menu)) 
                this.div.style.background = 'transparent';
        });


        if (this.menu) 
        {
            this.divIcon.addEventListener('pointerdown', e => 
            {
                if (e.button == 0)
                {
                    if (this.useMenuName)
                    {
                        e.stopPropagation();
                        this.showMenu();
                    }
                    else if (this.menu.lastItem)
                        this.menu.lastItem.select();
                }
            });


            if (this.useMenuName) this.createArrowEvents(this.div);
            else                  this.createArrowEvents(this.divArrow);
            

            this.divArrow.addEventListener('pointerdown', e => 
            {
                if (e.button == 0)
                {
                    e.stopPropagation();
                    this.showMenu();
                }
            });
        }
        else if (this.callback) 
            this.div.addEventListener('click', this.callback);


        this.div.appendChild(this.divIcon);

        if (this.menu)
            this.div.appendChild(this.divArrow);

        menuBar.appendChild(this.div);


        const ttName = 
            this.menu 
            ? this.menu.name 
            : this.name;

        this.tooltipIcon  = createDiv('tooltip', 'ttMenuButtonIcon'  + ttName);
        this.tooltipArrow = createDiv('tooltip', 'ttMenuButtonArrow' + ttName);

        document.body.appendChild(this.tooltipIcon);
        document.body.appendChild(this.tooltipArrow);
        

        createTooltip(this.tooltipIcon);
        createTooltip(this.tooltipArrow);

        createTooltipSrc(this.divIcon,  this.div,      () => document.getElementById('ttMenuButtonIcon'  + ttName));
        createTooltipSrc(this.divArrow, this.divArrow, () => document.getElementById('ttMenuButtonArrow' + ttName));


        this.update();
    }



    createArrowEvents(div)
    {
        div.addEventListener('pointerenter', e =>
        {
            this.overArrow = true;
            this.divArrow.style.transform = 'translateY(3px)';
        });


        div.addEventListener('pointerleave', e =>
        {
            if (!currentMenus.includes(this.menu))
                this.divArrow.style.transform = 'translateY(0)';

            this.overArrow = false;
        });
    }



    setIcon(icon)
    {
        this.icon = icon;
        this.update();
    }



    showMenu()
    {
        const curMenus = [...currentMenus];

        hideAllMenus()
        
        if (!curMenus.includes(this.menu))
            this.menu.show(this.div);
        else
            this.div.style.background = '#111';
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


        if (this.menu)
            this.tooltipArrow.innerHTML = this.menu.name;


        if (this.useMenuName)
            this.tooltipIcon.innerHTML = 
                this.menu 
                ? this.menu.name 
                : this.name;
        else
            this.tooltipIcon.innerHTML = 
                   this.menu
                && this.menu.lastItem
                ? this.menu.lastItem.name
                : this.name;        
    }
}