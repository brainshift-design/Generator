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

    isSetting     = false;
    disambiguate  = false;

    enteredDiv    = false;
    enteredExpand = false;

    arrowWidth    = 48;


    div;
    divHighlight;

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
        if (options.checkCallback != undefined) this.checkCallback = options.checkCallback;
        if (options.callback      != undefined) this.callback      = options.callback;
        if (options.childMenu     != undefined) 
        { 
            this.childMenu = options.childMenu;  

            if (this.childMenu)
                this.childMenu.parentMenu = this.parentMenu; 
        }
        if (options.separator     != undefined) this.separator     = options.separator;
        if (options.shortcut      != undefined) this.shortcut      = options.shortcut;
        if (options.enabled       != undefined) this.enabled       = options.enabled;
        if (options.setting       != undefined) this.isSetting     = options.setting;
        if (options.disambiguate  != undefined) this.disambiguate  = options.disambiguate;
    }



    createControls()
    {
        this.div          = createDiv('menuItem' + (this.disambiguate ? ' disambiguate' : ''));
        this.divHighlight = createDiv('menuItemHighlight');

        this.divCheck     = createDiv('menuItemCheck'    );
        this.divIcon      = createDiv('menuItemIcon'     );
        this.divName      = createDiv('menuItemName'     );
        this.divExpand    = createDiv('menuItemExpand'   );
        this.divShortcut  = createDiv('menuItemShortcut' );

        this.divSeparator = createDiv('menuSeparator'    );


        this.div.style.pointerEvents = this.separator ? 'none' : 'all';


        this.setName(this.name);

        
        if (this.childMenu)
            this.divExpand.style.visibility = 'visible';


        this.setIcon(this.icon);

    
        this.divShortcut.innerHTML = this.shortcut;

    
        this.divHighlight.style.zIndex = -2;

        
        if (!this.separator)
        {
            this.div.appendChild(this.divHighlight);

            this.div.appendChild(this.divCheck);
            this.div.appendChild(this.divIcon );

            this.div.appendChild(this.divName    );
            this.div.appendChild(this.divExpand  );
            this.div.appendChild(this.divShortcut);
        }
        else
            this.div.appendChild(this.divSeparator);



        this.div.addEventListener('pointerdown', e => 
        {
            e.stopPropagation();
            e.preventDefault();
        });



        this.div.addEventListener('pointerup', e => 
        {
            e.stopPropagation();
            e.preventDefault();


            if (e.button == 0)
            {
                const rect = boundingRect(this.div);

                if (   this.callback
                    && this.childMenu)
                {
                    if (e.clientX - rect.x < rect.width - this.arrowWidth)
                        this.select(e.shiftKey, getCtrlKey(e), e.altKey, rect.x, rect.y);
                }
                else if (this.callback)
                    this.select(e.shiftKey, getCtrlKey(e), e.altKey, rect.x, rect.y);
            }
        });



        this.div.addEventListener('pointermove', e =>
        {
            if (this.enabled)
            {
                this.divHighlight.style.background = 'var(--figma-color-bg-brand)';

                if (   this.callback
                    && this.childMenu)
                {
                    const rect = boundingRect(this.div);

                    if (    e.clientX - rect.x < rect.width - this.arrowWidth
                        && !this.enteredDiv)
                    {
                        this.divHighlight.style.left  = 0;
                        this.divHighlight.style.width = 'calc(100% - ' + (this.childMenu && this.callback ? this.arrowWidth : 0) + 'px)';

                        hideAllMenusAfter(this.parentMenu);

                        this.enteredDiv    = true;
                        this.enteredExpand = false;
                    }
                    else if ( e.clientX - rect.x >= rect.width - this.arrowWidth
                          && !this.enteredExpand)
                    {
                        this.divHighlight.style.left  = 'calc(100% - ' + (this.childMenu && this.callback ? this.arrowWidth : 0) + 'px)';
                        this.divHighlight.style.width = this.arrowWidth + 'px';

                        this.showChildMenu();

                        this.enteredDiv    = false;
                        this.enteredExpand = true;
                    }
                }
                else if (!this.enteredDiv)
                {
                    this.divHighlight.style.left  = 0;
                    this.divHighlight.style.width = '100%';

                    this.showChildMenu();

                    this.enteredDiv    = true;
                    this.enteredExpand = false;
                }
            }
        });
    

    
        this.div.addEventListener('pointerleave', () =>
        {
            this.divHighlight.style.background = 'transparent';

            this.enteredDiv    = false;
            this.enteredExpand = false;
        });
    }



    setName(name)
    {
        this.name              = name;
        this.divName.innerHTML = name;
    }



    setIcon(icon)
    {
        if (icon != '')
        {
            this.divIcon.style.background         = 'url(\'data:image/svg+xml;utf8,' + icon + '\')';
            this.divIcon.style.backgroundPosition = '50% 50%';
            this.divIcon.style.backgroundRepeat   = 'no-repeat';
        }
        else
            this.divIcon.style.background = 'transparent';
    }



    showChildMenu()
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
    }



    select(shift = false, ctrl = false, alt = false, x = Number.NaN, y = Number.NaN)
    {
        if (!this.enabled)
            return;


        if (!isEmpty(currentMenus)) // this lets the item be selected without its parent menu being involved
        {
            if (this.parentMenu.button)
                this.parentMenu.button.update();
        }

        if (!shift) 
            hideAllMenus();


        const e = 
        {
            shiftKey: shift,
            ctrlKey:  ctrl,
            altKey:   alt
        };


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
        this.div     .style.opacity    = this.enabled ? '100%'    : '40%';
    }
}