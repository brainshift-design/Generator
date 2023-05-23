class   OpMultiply
extends OpArithmetic
{
    constructor()
    {
        super(NUMBER_MULTIPLY, 'mul', 'multiply', '×', iconMultiply);
    }



    toJsCode(gen)
    {
        if (isEmpty(this.connectedHeaderInputs))
            return 'Number.NaN';


        let js = '';

        js += '(';

        js += this.connectedHeaderInputs
            .map(i => i.connectedOutput.toJsCode)
            .join(' * ');
        
        js += ')';

        
        return js;
    }
}