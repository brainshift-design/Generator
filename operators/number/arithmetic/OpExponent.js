class   OpExponent
extends OpArithmetic
{
    constructor()
    {
        super(NUMBER_EXPONENT, 'pow', 'power', iconExponent);

        this.iconOffsetY = -1;
    }



    toJsCode(gen)
    {
        if (isEmpty(this.connectedHeaderInputs))
            return 'Number.NaN';


        let js = '';


        this.connectedHeaderInputs
            .forEach(i => 
            {
                js += 'Math.pow(';
                js += i.connectedOutput.toJsCode(gen);
                js += ', ';
            });

        this.connectedHeaderInputs
            .forEach(i => ')');

        
        return js;
    }
}