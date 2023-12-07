function initSelectMenu(select)
{
    select.menu = createDiv('selectMenu');

    select.menu.hoverIndex       =  0;
    select.menu.tabIndex         =  0;

    select.menu.style.left       =  select.offsetLeft;
    select.menu.style.height     = 'auto';
    select.menu.style.textAlign  = 'center';
    select.menu.style.background = '#222';
    select.menu.style.zIndex     =  MAX_INT32 - 3;
    


    select.menu.addEventListener('focus', function() { select.menu.style.outline = 'none'; });

    select.menu.addEventListener('keydown', function(e)
    { 
        if (e.code == 'Escape')
            select.menu.blur();
    });        
    

    
    select.menu.tabIndex   = 0;
    
    select.menu.hoverIndex = 0;


    select.selectBox = createDiv();
        
    // width is set with menu width in showMenu()
    select.selectBox.style.display         = 'inline-block';
    select.selectBox.style.width           = 'calc(100% + 1px)';
    select.selectBox.style.height          = 24;
    select.selectBox.style.backgroundColor = 'var(--figma-color-bg-brand)';
    select.selectBox.style.position        = 'absolute';
    select.selectBox.style.left            = -1; // -1 = border
    
    select.menu.appendChild(select.selectBox);
    

    select.menuWrap = createDiv();
    
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
        select.dispatchChangeEvent();
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