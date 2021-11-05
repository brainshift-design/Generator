function initMenuSelect(select)
{
    select.className = 'menuSelect';
    select.tabIndex  = 0;    
    
    initMenuSelectMenu   (select);
    initMenuSelectTextbox(select);

    select.holding = false;

    select.enableChangeEvent = true;


    
    //////////////////////////////////////////////////////////////////////////////////
    


    select.initMenu = function()
    {
        select.check = document.createElement('DIV');
        
        select.check.style.width    = 16;
        select.check.style.height   = 16;
        select.check.style.position = 'absolute';
        select.check.style.left     = 8;
        select.check.innerHTML      = '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M13.2069 5.20718L7.70694 10.7072L6.99983 11.4143L6.29272 10.7072L3.29272 7.70718L4.70694 6.29297L6.99983 8.58586L11.7927 3.79297L13.2069 5.20718Z" fill="white" fill-opacity="1"/></svg>';
    };



    select.resetMenu = function()
    {
        clearChildren(select.menuWrap);
        select.menuWrap.appendChild(select.check);
    };  



    select.updateItems = function(items)
    {
        select.resetMenu();
        
        
        select.items = items;
        select.update(0);


        for (let i = 0; i < select.items.length; i++)
        {
            let item = document.createElement('DIV');
            let sub  = document.createElement('DIV');
            
            item.style.width       = 'auto';
            item.style.display     = 'block';
            item.style.textAlign   = 'left';
            item.style.paddingLeft = 30;
            
            sub .style.height      = 'auto';
            sub .style.position    = 'relative';
            sub .style.top         = '50%';
            sub .style.transform   = 'translateY(-50%)';
            
            item.style.border      = 'none';
            item.style.height      = 24;

            item.disabled = false;

            sub.innerHTML = select.items[i].text;

            item.appendChild(sub);

            select.menuWrap.appendChild(item);
        }
    };
    


    select.update = function(index)
    {
        select.value     = select.items[index].value;
        select.innerHTML = select.items[index].text;
    };
    

    
    select.addEventListener('pointerdown', function(e)
    {
        if (e.button == 0)
        {
            e.preventDefault();
            e.stopPropagation();

            var rect = select.getBoundingClientRect();

            if (e.clientX > rect.width - 20)
            {
                select.buttonDown0 = true;        
                select.setPointerCapture(e.pointerId);
                
                select.holding = false;
                setTimeout(function() { onSelectClickTimer(select); }, 200);
                
                select.menu.hoverIndex = select.getSelectedIndex();

                select.showMenu();
            }
            else
                select.showTextbox();
        }        
    });        
    

    
    select.addEventListener('keydown', function(e)
    {
        if (   e.code == 'Enter' 
            || e.code == 'NumpadEnter'
            || e.code == 'ArrowUp'
            || e.code == 'ArrowDown')
        {
            select.showMenu();
        }        
    });        



    select.showMenu = function()
    {  
        select.menu.style.display = 'inline-block';

        select.parentNode.appendChild(select.menu);
        select.updateMenu();
        
        select.menu.focus();

        document.menuHadFocus = true;
    }        
    


    select.hideMenu = function()
    {
        select.menu.blur();
    };    



    select.updateMenu = function()
    {
        let iy = select.getSelectedIndex();
        
        // let menuTop =
        //     select.offsetTop; 
        //     - 3 // paddingTop
        //     - 4 // hack this for now (select.menu.children[0].offsetHeight - select.menu.children[0].children[0].offsetHeight) / 2;
        //     - iy * 24;
        
        menuTop = select.offsetTop + select.offsetHeight + 11;//Math.min(Math.max(8, menuTop), document.body.clientHeight - 8 - select.menu.offsetHeight);
        
        select.menu .style.top = menuTop;
        select.check.style.top = 7 + 4 + iy * 24;
        
        select.selectBox.style.top = 7 + select.menu.hoverIndex * 24;
    };
    


    select.indexFromY = function(y)
    {
        let iy = Math.floor((y - 8 - select.menu.offsetTop) / 24);
            iy = Math.min(Math.max(0, iy), select.items.length-1);

        return iy;
    };        
    

    
    select.getSelectedValue = function()
    {
        return select.items[select.getSelectedIndex()].value;
    };        



    select.getSelectedIndex = function()
    {
        return select.items.findIndex(item => item.value == select.value);
    };        



    select.setValue = function(value)
    {
        select.value = value;
        select.update(select.getSelectedIndex());
        select.dispatchChangeEvent();
    };



    select.setSelectedIndex = function(index)
    {
        select.value = select.items[index].value;
        select.update(select.getSelectedIndex());
        
        select.enableChangeEvent = false;
        select.dispatchChangeEvent();
        select.enableChangeEvent = true;
    };



    select.dispatchChangeEvent = function()
    {
        if (!select.enableChangeEvent)
            return;
    
        let index = select.getSelectedIndex();
    
        const onchange = new Event('change', 
        {
            selectedIndex: index,
            selectedValue: select.items[index].value
        });

        select.dispatchEvent(onchange);
    };
}
