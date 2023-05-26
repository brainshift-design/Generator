class   OpAdd
extends OpArithmetic
{
    constructor()
    {
        super(NUMBER_ADD, 'add', 'add', iconAdd);

        this.iconOffsetY = 1;
    }



    toJsCode(gen)
    {
        if (isEmpty(this.connectedHeaderInputs))
            return 'Number.NaN';


        let js = '';

        js += '(';

        js += this.connectedHeaderInputs
            .map(i => i.connectedOutput.toJsCode)
            .join(' + ');
        
        js += ')';


        return js;
    }
}