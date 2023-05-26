class   OpModulo
extends OpArithmetic
{
    constructor()
    {
        super(NUMBER_MODULO, 'rem', 'remainder', iconModulo);

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
            .join(' % ');
        
        js += ')';

        
        return js;
    }
}