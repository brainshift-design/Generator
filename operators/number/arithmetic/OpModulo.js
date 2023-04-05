class   OpModulo
extends OpArithmetic
{
    constructor()
    {
        super(NUMBER_MODULO, 'rem', '%');
    }
    
    
    
    updateNode()
    {
        super.updateNode();

        // this._symbol.innerHTML =
        //     this._showOnlySymbol
        //     ? '<span style="font-size: 14px;">x</span><span style="position: relative; left: -1px; top: -7px; font-size: 7px; font-weight: bold;">y</span>'
        //     : '<span style="position: relative; top: -1.5px; font-size: 8px;">x</span><span style="position: relative; left: -0.5px; top: -5.15px; font-size: 3.75px; font-weight: bold;">y</span>';

        this._symbol.style.fontSize   = this._showOnlySymbol ? 11 : 8;
        this._symbol.style.fontWeight = 'bold';
        this._symbol.style.left       = 'calc(50% + ' + (this._showOnlySymbol ? 1.5 : 1) + 'px)';
        this._symbol.style.top        = parseFloat(this._symbol.style.top) + (this._showOnlySymbol ? 4 : 4.5);
    }



    toJS()
    {
        if (isEmpty(this.connectedHeaderInputs))
            return 'Number.NaN';


        let js = '';

        js += '(';

        js += this.connectedHeaderInputs
            .map(i => i.connectedOutput.toJS())
            .join(' % ');
        
        js += ')';

        
        return js;
    }
}