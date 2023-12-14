class   OpTextToColor
extends OperatorBase
{
    _color = dataColor_NaN;



    constructor()
    {
        super(TEXT_TO_COLOR, 'textToColor', 'to color', iconTextToColor);


        this.colorBack = createDiv('colorBack');
        this.inner.insertBefore(this.colorBack, this.paramHolder);


        this.addInput(new Input([TEXT_VALUE, TEXT_LIST_VALUE, LIST_VALUE]));
        this.addOutput(new Output([COLOR_VALUE], this.output_genRequest));
    }



    output_genRequest(gen)
    {
        // 'this' is the output

        gen.scope.push({
            nodeId:  this.node.id, 
            paramId: NULL });

        const [request, ignore] = this.node.genRequestStart(gen);
        if (ignore) return request;

        
        const input = this.node.inputs[0];


        request.push(input.connected ? 1 : 0);
        
        if (input.connected)
            request.push(...pushInputOrParam(input, gen));

        
        gen.scope.pop();
        pushUnique(gen.passedNodes, this.node);

        return request;
    }



    updateValues(requestId, actionId, updateParamId, paramIds, values)
    {
        const value = values[paramIds.findIndex(id => id == 'value')];
        const type  = values[paramIds.findIndex(id => id == 'type' )];

        this._color = 
               value
            && value.type == COLOR_VALUE
            ? value.toDataColor()
            : dataColor_NaN;

        if (type)
            this.headerOutputs[0].types = [type.value];

        super.updateValues(requestId, actionId, updateParamId, paramIds, values);
    }



    isUnknown()
    {
        return super.isUnknown()
            || isListType(this.outputs[0].types[0]);
    }



    getHeaderColors()
    {
        const colors = super.getHeaderColors();

        if (this.isUnknown())
        {
            // colors.back       = rgbFromType(this.outputs[0].types[0], this.active);
            // colors.stripeBack = rgbFromType(this.outputs[0].types[0], this.active);

            colors.text = darkMode ? hex2rgb('fff8') : hex2rgb('0008');
            colors.wire = darkMode ? hex2rgb('888f') : hex2rgb('aaaf');
        }
        else
        {
            const noColor = 
                darkMode
                ? rgbNoColorDark
                : rgbNoColorLight;

            colors.wire = 
                !dataColorIsNaN(this._color)
                ? dataColor2rgb(this._color)
                : noColor;
        }
            
        
        return colors;
    }
}