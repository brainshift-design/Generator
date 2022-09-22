class OperatorBase
extends Operator
{
    updateHeader()
    {
        //console.log(this.id + '.OperatorBase.updateHeader()');

        super.updateHeader();

        
        const colors = this.getHeaderColors();


        this.header.style.backgroundColor = rgba2style(colors.back);
        this.label .style.color           = rgba2style(colors.text);


        for (const input of this.inputs.filter(i => !i.param))
        {
            input.colorLight = 
            input.colorDark  = colors.input;
        }

        
        for (const output of this.outputs.filter(o => !o.param)) 
        {
            output.colorLight =
            output.colorDark  = colors.output;

            output.wireColor  = colors.wire;
        }
    }
}