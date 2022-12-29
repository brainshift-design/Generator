class   OpVarExponent
extends OpVarArithmetic
{
    constructor()
    {
        super(NUMBER_VAR_EXPONENT, 'pow', 'eˣ'); // placeholder symbol, actual symbol set in updateNode()
    }



    // updateNode()
    // {
    //     super.updateNode();

    //     this._symbol.innerHTML =
    //         this._showOnlySymbol
    //         ? '<span style="font-size: 14px;">x</span><span style="position: relative; left: -1px; top: -7px; font-size: 7px; font-weight: bold;">y</span>'
    //         : '<span style="position: relative; top: -2.5px; font-size: 9px;">x</span><span style="position: relative; left: -0.5px; top: -7.5px; font-size: 3.75px; font-weight: bold;">y</span>';

    //     this._symbol.style.left = 'calc(50% + ' + (this._showOnlySymbol ? 1.5 : 1) + 'px)';
    //     this._symbol.style.top  = parseFloat(this._symbol.style.top) + (this._showOnlySymbol ? 1.5 : 6);
    // }
}