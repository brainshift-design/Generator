class   OpExponent
extends OpArithmetic
{
    constructor()
    {
        super(NUMBER_EXPONENT, 'pow', 'eˣ'); // placeholder symbol, actual symbol set in updateNode()
    }



    toJsCode()
    {
        if (isEmpty(this.connectedHeaderInputs))
            return 'Number.NaN';


        let js = '';


        this.connectedHeaderInputs
            .forEach(i => 
            {
                js += 'Math.pow(';
                js += i.connectedOutput.toJsCode();
                js += ', ';
            });

        this.connectedHeaderInputs
            .forEach(i => ')');

        
        return js;
    }
}