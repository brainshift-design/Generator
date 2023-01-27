class   OpColorStyle
extends OpColorBase
{
    paramValue;

    circle;



    constructor()
    {
        super(COLOR_STYLE, 'style');

        this.addParam(this.paramValue = new ColorParam('value', '', false, true, false, ColorValue.fromRgb(rgbDefaultFill)));

        this.circle = createDiv('styleCircle');
        
        this.label.insertBefore(this.circle, this.labelText);
    }



    genRequest(gen)
    {
        // 'this' is the node

        gen.scope.push({
            nodeId:  this.id, 
            paramId: NULL });

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

        this.circle.style.background = rgb2style(this.paramValue.value.toRgb());
    }



    paramIsConsideredDefault(param)
    {
        return  param.isDefault()
            && !this.inputs[0].connected;
    }
}