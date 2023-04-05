class   OpDivide
extends OpArithmetic
{
    constructor()
    {
        super(NUMBER_DIVIDE, 'div', '/');//'÷');
    }



    toJS()
    {
        if (isEmpty(this.connectedHeaderInputs))
            return 'Number.NaN';


        let js = '';

        js += '(';

        js += this.connectedHeaderInputs
            .map(i => i.connectedOutput.toJS())
            .join(' / ');
        
        js += ')';

        
        return js;
    }
}