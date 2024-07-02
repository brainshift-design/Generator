var currentMenus      = [];
var currentMenuButton = null;



class Menu
{
    parentMenu            = null;
    parentItem            = null;
        
    name;           
    button                = null;
    fromButton            = false;

    div;
    divArrow;
    divItems;

    showChecks;
    showIcons;

    showOnLeft            = false;
    activeOnLeft          = false;

    combineChecksAndIcons = false; // conflicts are resolved in favor of icons

    overMenu              = false;
        
    items                 = [];
    lastItem              = null;

    itemIndex             = -1; // for menus with keyboard navigation
            
    reverse               = false;
            
    minWidth              = 200;
    forceMinWidth         = false;
        
    init                  = null; // ()
        
    visible               = false;
        
        
    onHide                = null; // removes itself after firing


    showCallback          = null;



    constructor(name, showIcons = true, showChecks = true, condense = false)
    {
        this.name       = name;

        this.showIcons  = showIcons;
        this.showChecks = showChecks;
        this.condense   = condense;

        this.div        = createDiv('menu');
        this.divArrow   = createDiv('menuArrow');
        this.divItems   = createDiv('menuItems');

        this.div.appendChild(this.divItems);

        this.div.addEventListener('pointerenter', () => this.overMenu = true );
        this.div.addEventListener('pointerleave', () => { this.overMenu = false; this.activeOnLeft = false; });
    }



    clearItems()
    {
        for (const item of this.items)
        {
            item.div.querySelectorAll('br')
                .forEach(br => 
                    br.parentNode.removeChild(br));
        }

        while (this.divItems.firstChild)
            this.divItems.removeChild(this.divItems.firstChild);

        this.items    = [];
        this.lastItem = null;
    }



    addItems(items)
    {
        for (let i = 0; i < items.length; i++)
        {
            const item = items[i];


            if (i > 0) 
                item.div.appendChild(document.createElement('br'));

            item.parentMenu = this;
            item.index      = i;

            this.items.push(item);
            this.divItems.appendChild(item.div);
        }


        if (   !this.lastItem
            && !isEmpty(this.items))
            this.lastItem = this.items[0];


        if (this.button)
            this.button.update();
    }



    removeItem(item)
    {
        removeFromArray(this.items, item);
        this.divItems.removeChild(item.div);
    }



    removeItemAt(index)
    {
        const item = this.items[index];

        removeAt(this.items, index);
        this.divItems.removeChild(item.div);
    }



    initMenu(callInit = true)
    {
        const e = { cancel: false };

        if (   callInit
            && this.init)
            this.init(e);

        if (e.cancel)
            return false;


        utilContext.font = '12px Inter';

        
        // console.log('this.showIcons =',  this.showIcons);
        // console.log('this.showChecks =', this.showChecks);

        let width = 0;

        for (const item of this.items)
        {
            const mesName     = utilContext.measureText(item.name);
            const mesShortcut = utilContext.measureText(item.shortcut);

            if (    item.divIcon
                && !item.parentMenu.showIcons) 
                item.divIcon.style.display = 'none';
            
            if (item.divCheck) 
            {
                item.divCheck.style.width = 
                    !item.parentMenu.showChecks
                    ? (this.showIcons ? 18 : 15)
                    : 34;
            }


            let checksAndIcons =
                  (item.parentMenu.showChecks  ? 32 : 0)
                + (item.parentMenu.showIcons   ? 32 : 0)
                + (item.childMenu != undefined ? 32 : 0);

            if (this.combineChecksAndIcons)
                checksAndIcons = Math.min(checksAndIcons, 32);

            if (!this.forceMinWidth)
            {
                width = Math.max(
                    width,
                    checksAndIcons
                    + mesName.width
                    + 30
                    + mesShortcut.width
                    + (mesShortcut.width > 0 ? 20 : 0));
            }


            if (this.combineChecksAndIcons)
            {
                item.divCheck.style.display = item.icon == NULL ? 'inline-block' : 'none';
                item.divIcon .style.display = item.icon != NULL ? 'inline-block' : 'none';
            }


            item.update();
        }


        for (const item of this.items)
        {
            if (item.updateLegend) 
                item.updateLegend();
        }


        this.divItems.style.width = Math.max(this.minWidth, width) + 'px';

        return true;
    }



    show(srcDiv, subMenu, right = false, callInit = true)
    {
        if (graphView._soloNode);
            graphView.unsoloNode();


        if (!this.initMenu(callInit))
            return;


        this.div.style.display = 'block';
        this.div.style.opacity = '100%';


        if (!right)
        {
            this.divArrow.style.display = 'block';
            this.divArrow.style.opacity = '100%';
        }


        document.body.appendChild(this.div     );
        document.body.appendChild(this.divArrow);


        let srcRect = srcDiv.getBoundingClientRect();

        srcRect.y -= subMenu ? 5 : 9;


        const margin = 8;

        const x = Math.min(Math.max(
            margin, 
            right
            ? (this.showOnLeft ? srcRect.x - this.div.offsetWidth : srcRect.x + srcRect.width)
            : srcRect.x + srcRect.width/2 - this.div.offsetWidth/2),
            graphView.div.offsetWidth - this.div.offsetWidth - margin);


        const dy = subMenu ? 4 : -1;

        const y =
            right
            ? srcRect.y - dy - 3
            : srcRect.y - dy + srcRect.height + this.divArrow.offsetHeight;


        this.showAt(x + 6, y, subMenu, false);
        
            
        const menuRect = this.div.getBoundingClientRect();
        
        this.divArrow.style.left = srcRect.x + srcRect.width/2;
        this.divArrow.style.top  = menuRect.y - this.divArrow.offsetHeight + 2;


        if (   this.button
            && this.fromButton)
            this.button.update();
    }



    showAt(x, y, subMenu, hidePrev = true)
    {
        if (graphView._soloNode);
            graphView.unsoloNode();


        if (hidePrev)
            hideAllMenus();

        hideSearchBox();


        this.initMenu();


        this.div.style.display = 'block';
        this.div.style.opacity = '100%';

        document.body.appendChild(this.div);


        this.update(x, y, subMenu);


        currentMenus.push(this);


        if (this.showCallback)
            this.showCallback();
        
            
        this.visible = true;
    }



    update(x, y, subMenu)
    {
        this.activeOnLeft = false;


        const margin = 8;

        const  dy  = subMenu ? 0 : 4;
        const _dy  = subMenu ? 4 : 0;

        let   left = Math.max(margin, x) - 6;
        let   top  = y - dy;


        let height = 0;
        
        for (const item of this.items)
            if (item.div.style.display != 'none')
                height += item.separator ? 17 : 25;


        if (this.parentItem)
        {
            if (left + this.div.offsetWidth + margin >= graphView.div.offsetWidth)
            {
                left = this.parentItem.parentMenu.div.offsetLeft - this.div.offsetWidth;
                this.activeOnLeft = true;
            }
        }
        else
        {
            if (left + this.div.offsetWidth > graphView.div.offsetWidth - margin)
                left = graphView.div.offsetWidth - this.div.offsetWidth - 28;
        }


        const graphHeight = graphView.div.offsetHeight - getTopHeight();

        if (top + height > graphView.div.offsetHeight - margin)
        {
            height = Math.min(height, graphHeight - margin*2);
            top    = getTopHeight() + Math.max(8, graphHeight - height);
            
            if (!subMenu)
                left += 10; // so it doesn't hit a menu item by accident once the menu appears
        }
        else
        {
            if (!subMenu)
            {
                left += 10;
                top += 4;
            }
            
            if (this == menuLocalVariables)
                height += 39; // for the search bar
        }


        this.div.style.left = left;
        this.div.style.top  = top + _dy;


        this.div.style.overflowY = 
            top + height > graphHeight-8 
            ? 'overlay' 
            : 'hidden';

        
        this.div.style.height = height + 'px';
    }



    hide()
    {
        if (this.onHide)
        {
            this.onHide();
            this.onHide = null;
        }


        this.div     .style.display = 'none';
        this.div     .style.opacity = '0%';

        this.divArrow.style.display = 'none';
        this.divArrow.style.opacity = '0%';


        if (    this.button
            && !this.button.overArrow)
        {
            this.button.divArrow.style.transform  = 'translateY(0)';
            this.button.div     .style.background = 'transparent';
        }


        removeFrom(currentMenus, this);


        this.visible = false;

        if (this.parentItem)
            this.parentItem.update();
    }
}



function hideAllMenus()
{
    for (let i = currentMenus.length-1; i >= 0; i--)
        currentMenus[i].hide();

    hideTutorialsArrow();
}



function hideAllMenusAfter(menu)
{
    const index = currentMenus.indexOf(menu);

    for (let i = currentMenus.length-1; i > index; i--)
        currentMenus[i].hide();
}



function disableCurrentMenuButton()
{
    if (currentMenuButton)
    {
        const curMenuButton = currentMenuButton;
        currentMenuButton = null;
        curMenuButton.update();
    }
}