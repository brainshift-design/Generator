class   OpSubtract
extends OpArithmetic
{
    constructor()
    {
        super(NUMBER_SUBTRACT, 'sub', '−');
    }



    toJsCode()
    {
        if (isEmpty(this.connectedHeaderInputs))
            return 'Number.NaN';


        let js = '';

        js += '(';

        js += this.connectedHeaderInputs
            .map(i => i.connectedOutput.toJsCode)
            .join(' - ');
        
        js += ')';

        
        return js;
    }
}