class MenuButton
{
    name;
    menu;

    icon     = '';

    callback;
    highlight;
    useMenuName;

    selectLast;

    
    div;

    divIcon;
    divArrow;
    
    over      = false;
    overArrow = false;
    

    tooltip;
    tooltipIcon;
    //tooltipArrow;



    constructor(name, menu, options = {})
    {
        this.name = name;
        this.menu = menu;

        if (this.menu)
            this.menu.button = this;


        this.initOptions(options);
        
        this.createControls();
        this.createTooltips();

        this.update();
    }



    initOptions(options)
    {
        this.callback    ??= options.callback;
        this.highlight   ??= options.highlight;
        this.useMenuName ??= options.useMenuName;
        this.selectLast  ??= options.selectLast;
        this.tooltip     ??= options.tooltip;
    }



    createControls()
    {
        this.div      = createDiv('menuButton');

        this.divIcon  = createDiv('menuButtonIcon');
        this.divArrow = createDiv('menuButtonArrow');


        this.div.addEventListener('pointerenter', () => 
        {
            this.over = true;
            this.update();
        });
   

        this.div.addEventListener('pointerleave', () => 
        {
            this.over = false;
            this.update();
        });


        if (this.menu) 
        {
            this.div.addEventListener('pointerdown', e => 
            {
                if (e.button == 0)
                {
                    disableCurrentMenuButton();

                    e.stopPropagation();
                    this.showMenu();
                    
                    this.update();
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
                    this.update();
                }
            });
        }
        
        
        if (this.callback) 
        {
            this.div.addEventListener('click', () =>
            {
                disableCurrentMenuButton();
                this.callback();
            });
        }


        this.div.appendChild(this.divIcon);

        if (this.menu)
            this.div.appendChild(this.divArrow);

        menuBar.appendChild(this.div);
    }



    createTooltips()
    {
        const ttName = 
            this.menu 
            ? this.menu.name 
            : this.name;

        // this.tooltipIcon = 
        //     this.tooltip 
        //     ? this.tooltip 
        //     : createDiv('tooltip', 'ttMenuButtonIcon'  + ttName);

        this.tooltipIcon  = createDiv('tooltip', 'ttMenuButtonIcon'  + ttName);
        //this.tooltipArrow = createDiv('tooltip', 'ttMenuButtonArrow' + ttName);

        
        document.body.appendChild(this.tooltipIcon);
        //document.body.appendChild(this.tooltipArrow);
        

        createTooltip(this.tooltipIcon);
        //createTooltip(this.tooltipArrow);

        createTooltipSrc(this.div, this.div, () => document.getElementById('ttMenuButtonIcon'  + ttName));
        //createTooltipSrc(this.divArrow, this.divArrow, () => document.getElementById('ttMenuButtonArrow' + ttName));
    }



    createArrowEvents(div)
    {
        div.addEventListener('pointerenter', e =>
        {
            this.overArrow = true;
            this.moveArrowDown();
        });


        div.addEventListener('pointerleave', e =>
        {
            if (!currentMenus.includes(this.menu))
                this.moveArrowUp();

            this.overArrow = false;
        });
    }



    moveArrowDown()
    {
        this.divArrow.style.transform = 'translateY(3px)';
    }



    moveArrowUp()
    {
        this.divArrow.style.transform = 'translateY(0)';
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

            // else
            // this.div.style.background = '#111';
    }



    update()
    {
        this.div.style.width = this.menu ? 50 : 40;


        this.div.style.background =
               currentMenuButton == this
            ||    this.highlight 
               && this.highlight()
                ? 'var(--figma-color-bg-brand)'
                : this.over
                    ? '#111'
                    : 'transparent';


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


        // if (this.menu)
        //     this.tooltipArrow.innerHTML = this.menu.name;


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