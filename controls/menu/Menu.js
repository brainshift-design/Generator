var currentMenus      = [];
var currentMenuButton = null;



class Menu
{
    parentMenu = null;

    name;
    button = null;

    div;
    divArrow;

    showIcons;
    showChecks;

    overMenu = false;

    items    = [];
    lastItem = null;


    init     = null; // ()


    onHide   = null; // removes itself after firing



    constructor(name, showIcons = true, showChecks = true)
    {
        this.name              = name;

        this.showIcons         = showIcons;
        this.showChecks        = showChecks;

        this.div               = createDiv('menu');
        this.divArrow          = createDiv('menuArrow');

        this.div.addEventListener('pointerenter', () => this.overMenu = true );
        this.div.addEventListener('pointerleave', () => this.overMenu = false);
    }



    clearItems()
    {
        while (this.div.firstChild)
            this.div.removeChild(this.div.firstChild);
        // for (const item of this.items)
        //     this.div.removeChild(item.div);

        this.items    = [];
        this.lastItem = null;
    }



    addItems(items)
    {
        this.items = [...items];


        for (let i = 0; i < this.items.length; i++)
        {
            const item = this.items[i];

            if (i > 0) 
                item.div.appendChild(document.createElement('br'));

            if (!this.showIcons ) item.divIcon .style.display = 'none';
            if (!this.showChecks) item.divCheck.style.width   = this.showIcons ? 18 : 15;

            item.parentMenu = this;
            item.index      = i;

            this.div.appendChild(item.div);
        }


        if (  !this.lastItem
            && this.items.length > 0)
            this.lastItem = this.items[0];


        if (this.button)
            this.button.update();
    }



    initMenu()
    {
        if (this.init)
            this.init();


        let width = 0;

        utilContext.font = '13px Inter';


        for (const item of this.items)
        {
            const mesName     = utilContext.measureText(item.name);
            const mesShortcut = utilContext.measureText(item.shortcut);

            width = Math.max(width, mesName.width + mesShortcut.width + 30);
        }


        this.div.style.width = Math.max(100, width) + 'px';
    }



    show(srcDiv, right = false)
    {
        this.initMenu();


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

        srcRect.y -= 5;


        const margin = 8;

        this.div.style.left = Math.min(Math.max(
            margin, 
            right
            ? srcRect.x + srcRect.width 
            : srcRect.x + srcRect.width/2 - this.div.offsetWidth/2),
            graphView.offsetWidth - this.div.offsetWidth - margin);

        this.div.style.top =
            right
            ? srcRect.y - 3
            : srcRect.y + srcRect.height + this.divArrow.offsetHeight;


        this.divArrow.style.left = srcRect.x + srcRect.width/2;


        const menuRect = this.div.getBoundingClientRect();

        this.divArrow.style.top = menuRect.y - this.divArrow.offsetHeight;


        currentMenus.push(this);


        if (this.button)
            this.button.update();
    }



    showAt(x, y, hidePrev = true)
    {
        if (hidePrev)
            hideAllMenus();


        this.initMenu();


        this.div.style.display = 'block';
        this.div.style.opacity = '100%';

        document.body.appendChild(this.div);


        const margin = 8;

        const left = Math.min(Math.max(margin, x), graphView.offsetWidth - this.div.offsetWidth - margin) - 6;

        let top    = y - 4;
        let height = this.div.offsetHeight;

        if (top + height > graphView.offsetHeight-8)
            top = Math.max(8, top - (graphView.offsetHeight-8 - height));

        if (height > graphView.offsetHeight-16)
            height = graphView.offsetHeight-16;

        
        this.div.style.left   = left;
        this.div.style.top    = top;
        //this.div.style.height = height;


        currentMenus.push(this);
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
    }
}



function hideAllMenus()
{
    for (let i = currentMenus.length-1; i >= 0; i--)
        currentMenus[i].hide();
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