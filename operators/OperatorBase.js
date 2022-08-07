class OperatorBase
extends Operator
{
    updateHeader()
    {
        //console.log(this.id + '.OperatorBase.updateHeader()');

        super.updateHeader();


        const colors = this.getHeaderColors();


        this.header.style.backgroundColor = colorStyleRgb_a(colors.back, 0.95);

        this.label .style.color           = colors.textStyle;
        this.label .style.fontWeight      = this.active ? 'bold' : 'normal';


        for (const input  of this.inputs .filter(i => !i.param)) input .color = colors.input;
        for (const output of this.outputs.filter(i => !i.param)) output.color = colors.output;
    }
}