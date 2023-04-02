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
        }

        
        for (const output of this.headerOutputs) 
        {
            output.colorLight =
            output.colorDark  = colors.output;
        }
    }
}