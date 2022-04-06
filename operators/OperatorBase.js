class OperatorBase
extends Operator
{
    updateHeader()
    {
        //log(this.id + '.OperatorBase.updateHeader()');

        super.updateHeader();

        const colBack   = dataType2rgb(this._dataType, this.active);
        const darkText  = rgb2hclokl(colBack)[2] > 0.71;
        
        const colText   = darkText ? [0, 0, 0]      : [1, 1, 1];
        const colInput  = darkText ? [0, 0, 0, 0.1] : [1, 1, 1, 0.3];
        const colOutput = darkText ? [0, 0, 0, 0.1] : [1, 1, 1, 0.35];


        this.header.style.backgroundColor = colorStyleRgb_a(colBack, 0.95);

        this.label .style.color           = colorStyleRgb(colText);
        this.label .style.fontWeight      = this.active ? 'bold' : 'normal';


        for (const input  of this.inputs .filter(i => !i.param)) input .color = colInput;
        for (const output of this.outputs.filter(i => !i.param)) output.color = colOutput;
    }
}