class MenuItem
{
    parentMenu    = null;
    index         = -1;
    
    checked       = false;
    icon          = ''; // svg
    name          = '';
    shortcut      = '';

    callback      = null;
    checkCallback = null;

    childMenu     = null;


    div;

    divCheck;
    divIcon;
    divName;
    divExpand;
    divShortcut;



    constructor(name, options = {})
    {
        this.name = name;


        if (options.icon         )   this.icon          = options.icon;
        if (options.callback     )   this.callback      = options.callback;
        if (options.checkCallback)   this.checkCallback = options.checkCallback;
        if (options.childMenu    ) { this.childMenu     = options.childMenu;  this.childMenu.parentMenu = this.parentMenu; }


        this.div         = createDiv('menuItem');

        this.divCheck    = createDiv('menuItemCheck'   );
        this.divIcon     = createDiv('menuItemIcon'    );
        this.divName     = createDiv('menuItemName'    );
        this.divExpand   = createDiv('menuItemExpand'  );
        this.divShortcut = createDiv('menuItemShortcut');


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

        this.div.appendChild(this.divCheck   );
        this.div.appendChild(this.divIcon    );
        this.div.appendChild(this.divName    );
        this.div.appendChild(this.divExpand  );
        this.div.appendChild(this.divShortcut);


        this.div.addEventListener('pointerdown', e => e.stopPropagation());
        this.div.addEventListener('pointerup', () => { if (!this.childMenu) this.select(); });


        this.div.addEventListener('pointerenter', () =>
        {
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
        
        
        // this.div.addEventListener('pointerleave', e =>
        // {
        //     const menuRect = this.div.getBoundingClientRect();

        //     if (    this.childMenu
        //         && !this.childMenu.overMenu
        //         && e.clientX < menuRect.right)
        //         this.childMenu.hide();
        // });
    }



    select()
    {
        if (currentMenus.length > 0) // this lets the item be selected without its parent menu being involved
        {
            currentMenus[0].lastItem = this;
            currentMenus[0].button.update();
        }

        hideAllMenus();

        if (this.callback) 
            this.callback(); 
    }



    setChecked(checked)
    {
        this.checked = checked;
        this.divCheck.style.visibility = this.checked ? 'visible' : 'hidden';
    }
}