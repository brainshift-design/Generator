class MenuItem
{
    parentMenu    = null;
    index         = -1;

    enabled       = true;

    checked       = false;
    icon          = ''; // svg
    name          = '';
    searchName    = '';
    shortcut      = '';
    sub           = true;

    callback      = null;
    checkCallback = null;

    childMenu     = null;

    separator     = false;
    createType    = '';

    selectOnDrag  = false;

    isSetting     = false;
    disambiguate  = false;

    enteredDiv    = false;
    enteredExpand = false;

    arrowWidth    = 48;

    showSubscribe = false;


    div;
    divHighlight;

    divLegend;
    divCheck;
    divIcon;
    divName;
    divExpand;
    divShortcut;
    divPro;


    divSeparator;


    mouseOver = false;



    constructor(name, searchName, options = {})
    {
        this.name       = name;
        this.searchName = searchName ?? name;

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
        if (options.selectOnDrag  != undefined) this.selectOnDrag  = options.selectOnDrag;
        if (options.shortcut      != undefined) this.shortcut      = options.shortcut;
        if (options.enabled       != undefined) this.enabled       = options.enabled;
        if (options.setting       != undefined) this.isSetting     = options.setting;
        if (options.disambiguate  != undefined) this.disambiguate  = options.disambiguate;
        if (options.createType    != undefined) this.createType    = options.createType;
    }



    createControls()
    {
        this.div          = createDiv('menuItem' + (this.disambiguate ? ' disambiguate' : ''));
        this.divHighlight = createDiv('menuItemHighlight');

        this.divLegend    = createDiv('menuItemLegend'   );
        this.divCheck     = createDiv('menuItemCheck'    );
        this.divIcon      = createDiv('menuItemIcon'     );
        this.divName      = createDiv('menuItemName'     );
        this.divExpand    = createDiv('menuItemExpand'   );
        this.divShortcut  = createDiv('menuItemShortcut' );
        this.divPro = createDiv('menuItemSubscribe');

        this.divSeparator = createDiv('menuSeparator'    );


        this.div.style.pointerEvents = this.separator ? 'none' : 'all';


        this.setName(this.name, this.searchName);

        
        if (this.childMenu)
            this.divExpand.style.visibility = 'visible';


        this.setIcon(this.icon);

    
        this.divShortcut .innerHTML = this.shortcut;
        this.divPro.innerHTML = 'PRO';

    
        this.divHighlight.style.zIndex = -2;

        
        if (!this.separator)
        {
            this.div.appendChild(this.divHighlight);

            this.div.appendChild(this.divLegend   );
            this.div.appendChild(this.divCheck    );
            this.div.appendChild(this.divIcon     );

            this.div.appendChild(this.divName     );
            this.div.appendChild(this.divExpand   );
            this.div.appendChild(this.divShortcut );
            this.div.appendChild(this.divPro);
        }
        else
            this.div.appendChild(this.divSeparator);


        this.updateLegend();



        this.div.addEventListener('pointerdown', e => 
        {
            e.stopPropagation();
            e.preventDefault();


            if (e.button == 0)
            {
                this.button0 = true;

                try
                {
                    this.div.setPointerCapture(e.pointerId);
                    this.dragStart = point(e.clientX, e.clientY);
                }
                catch {}
            }
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

                    
                this.button0 = false;

                this.div.releasePointerCapture(e.pointerId);
            }
        });



        this.div.addEventListener('pointermove', e =>
        {
            if (this.enabled)
            {
                this.mouseOver = true;
                this.update();


                if (   this.button0
                    && this.callback
                    && distance(this.dragStart, clientPos(e)) > 5)
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

                    
                    this.button0 = false;

                    if (!e.shiftKey)
                        hideAllMenus();


                    const node = graph.pageNodes.at(-1);

                    node.div.shiftOnPointerDown = false;

                    node.sx  = node.div.offsetLeft;
                    node.sy  = node.div.offsetTop ;

                    node.slx = node.div.offsetLeft - (defNodeWidth    / 2) - (               + graph.currentPage.pan.x) / graph.currentPage.zoom;
                    node.sly = node.div.offsetTop  - (defHeaderHeight / 2) - (getTopHeight() + graph.currentPage.pan.y) / graph.currentPage.zoom;

                    try
                    {
                        if (this.div.hasPointerCapture(e.pointerId))
                            this.div.releasePointerCapture(e.pointerId);

                        node.header.setPointerCapture(e.pointerId);

                        node.div.dragging = true;
                    }
                    catch {}
                }
                else
                {
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
                            this.divHighlight.style.left  = 0;
                            this.divHighlight.style.width = '100%';

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
            }
        });
    

    
        this.div.addEventListener('pointerleave', () =>
        {
            this.mouseOver = false;
            this.update();

            this.enteredDiv    = false;
            this.enteredExpand = false;
        });


        this.update();
    }



    setName(name, searchName = null)
    {
        this.name              = name;
        this.searchName        = searchName ?? name;
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
            this.divIcon.style.background         = 'transparent';
    }



    updateLegend()
    {
        this.divLegend.style.background = 
               this.createType != ''
            && settings.showColorLegendInMenus
            ?  rgb2style(rgbFromType(this.createType, true))
            : 'transparent';
    }



    showChildMenu()
    {
        if (this.childMenu)
        {
            if (!currentMenus.includes(this.childMenu))
            {
                hideAllMenusAfter(this.parentMenu);

                this.childMenu.parentItem = this;
                this.childMenu.show(this.div, true, true);
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
        this.div.style.display = visible ? 'inline-block' : 'none';
    }



    update()
    {
        this.divHighlight.style.background = 
               this.mouseOver
            ||    this.childMenu
               && this.childMenu.visible
            ? 'var(--figma-color-bg-brand)'
            : 'transparent';

        this.divCheck    .style.visibility = this.checked   ? 'visible'      : 'hidden';
        this.div         .style.opacity    = this.enabled   ? '100%'         : '40%';

        this.divShortcut.style.display    = this.sub ? 'inline-block' : 'none';
        this.divPro     .style.display    = this.sub ? 'none'         : 'inline-block';

        this.updateLegend();
    }
}