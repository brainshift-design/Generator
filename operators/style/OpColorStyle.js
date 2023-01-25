class   OpColorStyle
extends OpColorBase
{
    paramValue;



    constructor()
    {
        super(COLOR_STYLE, 'style');

        this.addParam(this.paramValue = new ColorParam('value', '', false, true, false, ColorValue.fromRgb(rgbDefaultFill)));
    }



    genRequest(gen)
    {
        // 'this' is the node

        gen.scope.push({
            nodeId:  this.id, 
            paramId: '' });

        const [request, ignore] = this.genRequestStart(gen);
        if (ignore) return request;

                
        request.push(...this.paramValue.genRequest(gen));


        gen.scope.pop();
        pushUnique(gen.passedNodes, this);

        return request;
    }



    // updateValues(actionId, updateParamId, paramIds, values)
    // {
    //     const col = values[paramIds.findIndex(id => id == 'value')];

    //     this._color = 
    //         col
    //         ? col.toDataColor()
    //         : dataColor_NaN;

    //     super.updateValues(actionId, updateParamId, paramIds, values);
    // }



    updateParams()
    {
        const input = this.inputs[0];
        
        this.paramValue.enableControlText(!input.connected);

        this.paramValue.control.valueText =  this.isUnknown() ? UNKNOWN_DISPLAY : '';
        this.paramValue.control.showBar   = !this.isUnknown();


        this.updateParamControls();
    }



    updateHeader()
    {
        super.updateHeader();

        this._warningOverlay.style.display = 'none';

        this.header.style.height = '25px';
    }



    // updateHeaderLabel()
    // {
    //     super.updateHeaderLabel();
      
    //     const strCircle = '●&nbsp;&nbsp;';

    //     if (   this.label.innerHTML.length < strCircle.length
    //         || this.label.innerHTML.substring(0, strCircle.length) != strCircle)
    //         this.label.innerHTML = strCircle + this.label.innerHTML;
    // }



    paramIsConsideredDefault(param)
    {
        return  param.isDefault()
            && !this.inputs[0].connected;
    }
}