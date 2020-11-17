function initSelectMenu(select)
{
    select.menu = document.createElement('DIV');
    select.menu.className = 'selectMenu';

    select.menu.style.position     = 'absolute';
    select.menu.style.left         = select.offsetLeft;
    select.menu.style.width        = 'auto';
    select.menu.style.color        = 'white';
    select.menu.style.fontFamily   = 'Inter';
    select.menu.style.fontSize     = '13';
    select.menu.style.boxShadow    = '0px 2px 7px  rgba(0, 0, 0, 0.15), \
                                      0px 5px 17px rgba(0, 0, 0, 0.2)';
    select.menu.style.outline      = '0.5px solid rgba(0, 0, 0, 0.1)';                                   
    select.menu.style.borderRadius = '2px';
    select.menu.style.overflow     = 'hidden';

    select.menu.addEventListener('focus', function() { select.menu.style.outline = 'none'; });

    select.menu.addEventListener('keydown', function(e)
    { 
        if (e.code == 'Escape')
            select.menu.blur();
    });
    
    
    select.menu.tabIndex = 0;
    
    select.menu.style.height     = 'auto';
    select.menu.style.textAlign  = 'center';
    select.menu.style.background = '#222222';
    select.menu.style.zIndex     = Number.MAX_SAFE_INTEGER;

    select.menu.hoverIndex       = 0;


    select.selectBox = document.createElement('DIV');
        
    // width is set with menu width in showMenu()
    select.selectBox.style.display         = 'inline-block';
    select.selectBox.style.width           = 'calc(100% + 1px)';
    select.selectBox.style.height          = 24;
    select.selectBox.style.backgroundColor = '#18A0FB';
    select.selectBox.style.position        = 'absolute';
    select.selectBox.style.left            = -1; // -1 = border
    
    select.menu.appendChild(select.selectBox);
    

    select.menuWrap = document.createElement('DIV');
    
    select.menuWrap.style.width         = 'auto';
    select.menuWrap.style.height        = '100%';
    select.menuWrap.style.position      = 'relative';
    select.menuWrap.style.paddingLeft   = 4;
    select.menuWrap.style.paddingRight  = 5;
    select.menuWrap.style.paddingTop    = 7;
    select.menuWrap.style.paddingBottom = 7;
    select.menuWrap.style.margin        = 0;
    select.menuWrap.style.marginRight   = 10;
    
    select.menu.appendChild(select.menuWrap);

    select.menu.addEventListener('pointerdown', function(e)
    {
        e.stopPropagation();
    });            
    
    select.menu.addEventListener('pointerup', function(e)
    {
        if (select.holding)
            select.menu.selectCurrent();
    });         

    select.menu.addEventListener('pointermove', function(e)
    {
        select.menu.hoverIndex = select.indexFromY(e.clientY);
        select.selectBox.style.top = 7 + select.menu.hoverIndex * 24;
    });                
    
    select.menu.selectCurrent = function()
    {
        select.update(select.menu.hoverIndex);
        select.hideMenu();
        select.dispatchEvent(select.onchange);
        select.focus();

        document.menuHadFocus = false;
    };

    select.menu.addEventListener('keydown', function(e)
    {
        if (   e.code == 'Enter' 
            || e.code == 'NumpadEnter')
        {
            select.menu.selectCurrent();   
        }
        else if (e.code == 'ArrowUp')
        {
            select.menu.hoverIndex = Math.min(Math.max(0, select.menu.hoverIndex - 1), select.items.length-1);
            select.updateMenu();
        }
        else if (e.code == 'ArrowDown')
        {
            select.menu.hoverIndex = Math.min(Math.max(0, select.menu.hoverIndex + 1), select.items.length-1);
            select.updateMenu();
        }        
    });        


    select.menu.addEventListener('focusout', function()
    {
        select.hideMenu();

        select.menu.style.display = 'none';
        select.parentNode.removeChild(select.menu);
    });
}    


function initSelect(select, items)
{
    select.className = 'figmaSelect';
    select.tabIndex = 0;    
    
    initSelectMenu(select);

    select.holding  = false;
    
    //////////////////////////////////////////////////////////////////////////////////
    
    select.updateItems = function()
    {
        select.resetMenu();
        
        for (var i = 0; i < select.items.length; i++)
        {
            var item = document.createElement('DIV');
            var sub  = document.createElement('DIV');
            
            item.style.width       = 'auto';
            item.style.height      = 24;
            item.style.display     = 'block';
            item.style.textAlign   = 'left';
            item.style.paddingLeft = 30;
            
            sub.style.height    = 'auto';
            sub.style.position  = 'relative';
            sub.style.top       = '50%';
            sub.style.transform = 'translateY(-50%)';
            
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
            
            select.buttonDown0 = true;        
            select.setPointerCapture(e.pointerId);
            
            select.holding = false;
            setTimeout(function() { onSelectClickTimer(select); }, 200);
            
            select.menu.hoverIndex = select.selectedIndex();

            select.showMenu();
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
        var iy = select.selectedIndex();
        
        var menuTop =
            select.offsetTop 
            - 3 // paddingTop
            - 4 // hack this for now (select.menu.children[0].offsetHeight - select.menu.children[0].children[0].offsetHeight) / 2;
            - iy * 24;
        
        menuTop = Math.min(Math.max(8, menuTop), document.body.clientHeight - 8 - select.menu.offsetHeight);
        
        select.menu     .style.top = menuTop;
        select.check    .style.top = 7 + 4 + iy * 24;
        
        select.selectBox.style.top = 7 + select.menu.hoverIndex * 24;
    };
    
    select.indexFromY = function(y)
    {
        var iy = Math.floor((y - 8 - select.menu.offsetTop) / 24);
        iy = Math.min(Math.max(0, iy), select.items.length-1);
        return iy;
    };        
    
    
    select.resetMenu = function()
    {
        clearChildren(select.menuWrap);
        

        select.check = document.createElement('DIV');
        
        select.check.style.width    = 16;
        select.check.style.height   = 16;
        select.check.style.position = 'absolute';
        select.check.style.left     = 8;
        select.check.innerHTML      = '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M13.2069 5.20718L7.70694 10.7072L6.99983 11.4143L6.29272 10.7072L3.29272 7.70718L4.70694 6.29297L6.99983 8.58586L11.7927 3.79297L13.2069 5.20718Z" fill="white" fill-opacity="1"/></svg>';

        select.menuWrap.appendChild(select.check);
    };        


    select.selectedIndex = function()
    {
        return select.items.findIndex(item => item.value == select.value);
    };        


    select.setValue = function(value)
    {
        select.value = value;
        select.update(select.selectedIndex());
        select.dispatchEvent(select.onchange);
    }


    //////////////////////////////////////////////////////////////////////////////////
 
    select.items = items;
    
    select.update(0);
    select.updateItems();
    
    select.onchange = new Event('change');
}


function onSelectClickTimer(select)
{
    select.holding = true;
}