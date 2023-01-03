class   OpDivide
extends OpArithmetic
{
    constructor()
    {
        super(NUMBER_DIVIDE, 'div', '/');//'÷');
    }



    // updateNode()
    // {
    //     super.updateNode();

    //     const colors = this.getHeaderColors();

    //     this._symbol.innerHTML =
    //         this._showOnlySymbol
    //         ? '<svg width="11" height="13" viewBox="0 0 11 13" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10.5 2L2.44458 12.5468L0.698218 11.3084L8.75363 0.761576L10.5 2Z" fill="' + rgba2style(colors.text) + '"/></svg>'
    //         : '<svg width="11" height="13" viewBox="0 0 11 13" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10.5 2L2.44458 12.5468L0.698218 11.3084L8.75363 0.761576L10.5 2Z" fill="' + rgba2style(colors.text) + '"/></svg>';

    //     this._symbol.style.left = 'calc(50% + ' + (this._showOnlySymbol ? 1.5 : 1) + 'px)';
    //     this._symbol.style.top  = parseFloat(this._symbol.style.top) + (this._showOnlySymbol ? 1.5 : 6);
    // }
}