class OperatorBase
extends Operator
{
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


        for (const input of this.headerInputs)
        {
            input.colorLight = 
            input.colorDark  = colors.input;
            input.wireColor  = colors.inWire;
        }

        
        for (const output of this.headerOutputs) 
        {
            output.colorLight =
            output.colorDark  = colors.output;
            output.wireColor  = colors.outWire;
        }
    }
}



function createBoolMenu(param)
{
    const menu = new Menu('L', true, false);

    menu.minWidth = 130;
    
    menu.addItems([
        new MenuItem('true',  null, {icon:  TRUE_DISPLAY_MENU, callback: () => { hideAllMenus(); param.setValue(new NumberValue(1), true); }}),
        new MenuItem('false', null, {icon: FALSE_DISPLAY_MENU, callback: () => { hideAllMenus(); param.setValue(new NumberValue(0), true); }})]);

    param.controls[0].div.addEventListener('pointerdown', e => param.node.showParamMenu(e, param, menu));

    return menu;
}