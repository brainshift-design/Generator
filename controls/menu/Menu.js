var currentMenus      = [];
var currentMenuButton = null;



class Menu
{
    parentMenu = null;
    
    name;
    button   = null;

    div;
    divArrow;

    showIcons;
    showChecks;

    overMenu   = false;
    
    items      = [];
    lastItem   = null;


    init       = null; // ()


    constructor(name, showIcons = true, showChecks = true)
    {
        this.name       = name;

        this.showIcons  = showIcons;
        this.showChecks = showChecks;

        this.div        = createDiv('menu');
        this.divArrow   = createDiv('menuArrow');

        this.div.addEventListener('pointerenter', e => this.overMenu = true );
        this.div.addEventListener('pointerleave', e => this.overMenu = false);
    }



    addItems(items)
    {
        this.items = [...items];


        for (let i = 0; i < this.items.length; i++)
        {
            if (i > 0) 
                this.div.appendChild(document.createElement('br'));

            if (!this.showIcons)  this.items[i].divIcon .style.display = 'none';
            if (!this.showChecks) this.items[i].divCheck.style.width   = this.showIcons ? 18 : 15;

            this.items[i].parentMenu = this;
            this.items[i].index      = i;

            this.div.appendChild(this.items[i].div);
        }


        if (  !this.lastItem
            && this.items.length > 0)
            this.lastItem = this.items[0];


        if (this.button)
            this.button.update();
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
    
    
    
    showAt(x, y)
    {
        this.initMenu();


        this.div.style.display = 'block';
        this.div.style.opacity = '100%';
    
        document.body.appendChild(this.div);
    
        const margin = 8;
     
        this.div.style.left = Math.min(Math.max(margin, x), graphView.offsetWidth - this.div.offsetWidth - margin) - 6;
        this.div.style.top  = y - 4;
    

        currentMenus.push(this);
    }
    
    
    
    initMenu()
    {
        // let maxWidth = 0;

        // for (const item of this.items)
        //     maxWidth = Math.max(maxWidth, item.name.offsetWidth + item.shortcut.offsetWidth + 30);

        // if (this.div.offsetWidth < maxWidth)
        //     this.div.style.width = maxWidth;
            
        if (this.init)
            this.init();
    }



    hide()
    {
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