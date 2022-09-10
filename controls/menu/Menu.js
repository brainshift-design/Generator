var currentMenu = null;



class Menu
{
    name;

    div;
    divArrow;

    showCheck;

    items    = [];
    lastItem = null;



    constructor(name, showCheck = false)
    {
        this.name      = name;

        this.showCheck = showCheck;

        this.div       = createDiv('menu');
        this.divArrow  = createDiv('menuArrow');
    }



    addItems(items)
    {
        this.items = items;

        if (!this.lastItem)
            this.lastItem = this.items[0];

        for (let i = 0; i < this.items.length; i++)
        {
            if (i > 0) 
                this.div.appendChild(document.createElement('br'));

            if (!this.showCheck)
                this.items[i].divCheck.style.display = 'none';
                
            this.div.appendChild(this.items[i].div);
        }
    }



    show(srcDiv)
    {
        if (currentMenu)
            currentMenu.hide();
    
            
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
            srcRect.x + srcRect.width/2 - this.div.offsetWidth/2), 
            graphView.offsetWidth - this.div.offsetWidth - margin);
    
        this.divArrow.style.left = srcRect.x + srcRect.width/2;// - menuArrow.offsetWidth/2;
    
        
        this.div.style.top = srcRect.y + srcRect.height + this.divArrow.offsetHeight;
    
        const menuRect = this.div.getBoundingClientRect();
    
        this.divArrow.style.borderColor = 'transparent transparent #040404 transparent';
        this.divArrow.style.top         = menuRect.y - this.divArrow.offsetHeight;
    
    
        currentMenu = this;
    }
    
    
    
    hide()
    {
        this.div     .style.display = 'none';
        this.div     .style.opacity = '0%';
    
        this.divArrow.style.display = 'none';
        this.divArrow.style.opacity = '0%';
    
        currentMenu                 = null;
    }
}