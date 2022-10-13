class MenuItem
{
    parentMenu    = null;
    index         = -1;

    enabled       = true;

    checked       = false;
    icon          = ''; // svg
    name          = '';
    shortcut      = '';

    callback      = null;
    checkCallback = null;

    childMenu     = null;

    separator     = false;


    div;

    divCheck;
    divIcon;
    divName;
    divExpand;
    divShortcut;

    divSeparator;



    constructor(name, options = {})
    {
        this.name = name;

        this.initOptions(options);
        this.createControls();

        this.update();
    }



    initOptions(options)
    {
        if (options.icon          != undefined) this.icon          = options.icon;
        if (options.callback      != undefined) this.callback      = options.callback;
        if (options.checkCallback != undefined) this.checkCallback = options.checkCallback;
        if (options.childMenu     != undefined) 
        { 
            this.childMenu = options.childMenu;  
            
            if (this.childMenu)
                this.childMenu.parentMenu = this.parentMenu; 
        }
        if (options.separator     != undefined) this.separator     = options.separator;
        if (options.shortcut      != undefined) this.shortcut      = options.shortcut;
        if (options.enabled       != undefined) this.enabled       = options.enabled;
    }



    createControls()
    {
        this.div          = createDiv('menuItem');

        this.divCheck     = createDiv('menuItemCheck'   );
        this.divIcon      = createDiv('menuItemIcon'    );
        this.divName      = createDiv('menuItemName'    );
        this.divExpand    = createDiv('menuItemExpand'  );
        this.divShortcut  = createDiv('menuItemShortcut');

        this.divSeparator = createDiv('menuSeparator'   );


        this.div.style.pointerEvents = this.separator ? 'none' : 'all';


        this.divName.innerHTML = this.name;

        this.divCheck.visibility = 
               this.checkCallback 
            && this.checkCallback() 
            ? 'visible' 
            : 'hidden';


        if (this.childMenu)
            this.divExpand.style.visibility = 'visible';


        if (this.icon != '')
        {
            this.divIcon.style.background         = 'url(\'data:image/svg+xml;utf8,' + this.icon + '\')';
            this.divIcon.style.backgroundPosition = '50% 50%';
            this.divIcon.style.backgroundRepeat   = 'no-repeat';
        }        

        
        this.divShortcut.innerHTML = this.shortcut;

        
        if (!this.separator)
        {
            this.div.appendChild(this.divCheck   );
            this.div.appendChild(this.divIcon    );
            this.div.appendChild(this.divName    );
            this.div.appendChild(this.divExpand  );
            this.div.appendChild(this.divShortcut);
        }
        else
            this.div.appendChild(this.divSeparator);


        this.div.addEventListener('pointerdown', e => e.stopPropagation());


        this.div.addEventListener('pointerup', e => 
        {
            const rect = boundingRect(this.div);

            if (!this.childMenu) 
                this.select(e.shiftKey, rect.x, rect.y); 
        });


        this.div.addEventListener('pointerenter', () =>
        {
            if (this.enabled)
                this.div.style.background = 'var(--figma-color-bg-brand)';

            if (this.childMenu)
            {
                if (!currentMenus.includes(this.childMenu))
                {
                    hideAllMenusAfter(this.parentMenu);
                    this.childMenu.show(this.div, true);
                }
            }
            else
                hideAllMenusAfter(this.parentMenu);
        });
        
        
        this.div.addEventListener('pointerleave', () =>
        {
            this.div.style.background = 'transparent';
        });
        
        
        // this.div.addEventListener('pointerleave', e =>
        // {
        //     const menuRect = this.div.getBoundingClientRect();

        //     if (    this.childMenu
        //         && !this.childMenu.overMenu
        //         && e.clientX < menuRect.right)
        //         this.childMenu.hide();
        // });
    }



    select(shift = false, x = Number.NaN, y = Number.NaN)
    {
        if (!this.enabled)
            return;

        if (currentMenus.length > 0) // this lets the item be selected without its parent menu being involved
        {
            currentMenus[0].lastItem = this;

            if (currentMenus[0].button)
                currentMenus[0].button.update();
        }

        if (!shift)
            hideAllMenus();


        const e = {shiftKey: shift};

        if (!isNaN(x)) e.clientX = x;
        if (!isNaN(y)) e.clientY = y;

        if (this.callback) 
            this.callback(e); 
    }



    setChecked(checked)
    {
        this.checked = checked;
        this.update();
    }



    setEnabled(enabled)
    {
        this.enabled = enabled;
        this.update();
    }
    

    setVisible(visible)
    {
        menuItemDebug.div.style.display = visible ? 'inline-block' : 'none';
    }



    update()
    {
        this.divCheck.style.visibility = this.checked ? 'visible' : 'hidden';

        this.div     .style.opacity    = this.enabled ? '100%' : '40%';
    }
}