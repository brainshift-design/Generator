class   OpDivide
extends OpArithmetic
{
    constructor()
    {
        super(NUMBER_DIVIDE, 'div', '/');//'÷');
    }



    toJsCode()
    {
        if (isEmpty(this.connectedHeaderInputs))
            return 'Number.NaN';


        let js = '';

        js += '(';

        js += this.connectedHeaderInputs
            .map(i => i.connectedOutput.toJsCode)
            .join(' / ');
        
        js += ')';

        
        return js;
    }
}