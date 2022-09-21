class OperatorBase
extends Operator
{
    updateHeader()
    {
        //console.log(this.id + '.OperatorBase.updateHeader()');

        super.updateHeader();

        
        const colors = this.getHeaderColors();


        this.header.style.backgroundColor = rgb2style_a(colors.back, 0.95);
        this.label .style.color           = rgba2style(colors.text);


        for (const input  of this.inputs .filter(i => !i.param)) input .color = colors.input;
        for (const output of this.outputs.filter(o => !o.param)) output.color = colors.output;
    }
}