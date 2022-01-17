class   OpExponent
extends OpArithmetic
{
    constructor()
    {
        super('exponent', 'exp', 'xʸ'); // placeholder symbol, actual symbol set in updateNode()
    }
    
    
    
    getResult()
    {
        if (this.inputs.length-1 == 0)
            return 0;
            
        let result = this.inputs[0].data.value;

        for (let i = 1; i < this.inputs.length-1; i++)
            result = Math.pow(result, this.inputs[i].data.value);

        return result;
    }



    updateNode()
    {
        super.updateNode();

        this._symbol.innerHTML =
            this._showOnlySymbol
            ? '<span style="font-size: 14px;">x</span><span style="position: relative; left: -1px; top: -7px; font-size: 7px; font-weight: bold;">y</span>'
            : '<span style="position: relative; top: -1.5px; font-size: 8px;">x</span><span style="position: relative; left: -0.5px; top: -5.15px; font-size: 3.75px; font-weight: bold;">y</span>';

        this._symbol.style.left      = 'calc(50% + ' + (this._showOnlySymbol ? 2.5 : 5) + 'px)';
        this._symbol.style.top       = parseFloat(this._symbol.style.top) + 6;
    }
}