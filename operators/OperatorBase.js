class OperatorBase
extends Operator
{
    width;
    height;



    constructor(type, id, name, icon, defWidth = defNodeWidth, progressBar = false)
    {
        super(type, id, name, icon, defWidth, progressBar);

        
        this.width  = defWidth;
        this.height = defHeaderHeight;
    }



    canAutoConnectFrom(output)
    {
        return this.inputs[0].canConnectFrom(output);
    }



    updateHeader()
    {
        //console.log(this.id + '.OperatorBase.updateHeader()');

        super.updateHeader();

        
        const colors = this.getHeaderColors();


        this.header.style.backgroundColor = rgba2style(colors.back);
        this.label .style.color           = rgba2style(colors.text);
    }
}



function createBoolMenu(param)
{
    const menu = new Menu('L', true, true);

    menu.minWidth = 130;

    param.div.addEventListener('pointerdown', e => 
    {
        initBoolMenu(param, menu);
        param.node.showParamMenu(e, param, menu);
    });

    return menu;
}



function initBoolMenu(param, menu)
{
    menu.showIcons = settings.showBoolValues;
    
    menu.clearItems();

    menu.addItems([
        new MenuItem('1  ·  true',  null, false, {icon:  TRUE_DISPLAY_MENU, callback: () => { hideAllMenus(); param.setValue(new NumberValue(1), true); }}),
        new MenuItem('0  ·  false', null, false, {icon: FALSE_DISPLAY_MENU, callback: () => { hideAllMenus(); param.setValue(new NumberValue(0), true); }})]);

    menu.items[0].setChecked(param.value.toNumber() >  0);
    menu.items[1].setChecked(param.value.toNumber() == 0);
}