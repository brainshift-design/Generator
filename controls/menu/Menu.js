var currentMenus = [];



class Menu
{
    name;

    button   = null;


    div;
    divArrow;

    showCheck;

    
    overMenu = false;

    
    items    = [];

    lastItem = null;



    constructor(name, showCheck = false)
    {
        this.name       = name;

        this.showCheck  = showCheck;

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

            if (!this.showCheck)
                this.items[i].divCheck.style.display = 'none';

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



    show(srcDiv, hideCurrent = true)
    {
        if (hideCurrent)
            currentMenus.forEach(m => m.hide());
    
            
        this.div     .style.display = 'block';
        this.div     .style.opacity = '100%';
    
        this.divArrow.style.display = 'block';
        this.divArrow.style.opacity = '100%';


        document.body.appendChild(this.div);
        document.body.appendChild(this.divArrow);

    
        let srcRect = srcDiv.getBoundingClientRect();
    
        srcRect.y -= 5;
    
    
        const margin = 8;
     
        this.div.style.left = Math.min(Math.max(
            margin, 
            hideCurrent
            ? srcRect.x + srcRect.width/2 - this.div.offsetWidth/2
            : srcRect.x + srcRect.width), 
            graphView.offsetWidth - this.div.offsetWidth - margin);
    
        this.div.style.top = 
            hideCurrent
            ? srcRect.y + srcRect.height + this.divArrow.offsetHeight
            : srcRect.y;

        
        this.divArrow.style.left = srcRect.x + srcRect.width/2;
        
    
        const menuRect = this.div.getBoundingClientRect();
    
        this.divArrow.style.top = menuRect.y - this.divArrow.offsetHeight;
    
    
        currentMenus.push(this);


        if (   this.button
            && this == menuMain)
            this.button.div.style.background = 'var(--figma-color-bg-brand)';
    }
    
    
    
    hide()
    {
        this.div     .style.display = 'none';
        this.div     .style.opacity = '0%';
    
        this.divArrow.style.display = 'none';
        this.divArrow.style.opacity = '0%';

        if (    currentMenus.length == 1
            && !this.button.overArrow)
        {
            this.button.divArrow.style.transform  = 'translateY(0)';
            this.button.div     .style.background = 'transparent';
        }


        removeFrom(currentMenus, this);
    }
}