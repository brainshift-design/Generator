class OpFill
extends OpColorBase
{
    paramColor;
    paramOpacity;

    checkers;
    colorBack;


    constructor()
    {
        super(FILL, 'fill');


        this.colorBack = createDiv('colorBack');
        this.inner.appendChild(this.colorBack);

        this.addInput (new Input(SHAPE_TYPES, this.input_getValuesForUndo));
        this.addOutput(new Output(SHAPE_VALUE, this.output_genRequest));

        //this.initContentInput(this.inputs[0], 0);


        this.addParam(this.paramColor   = new ColorParam ('color',   '',        false, true, true, ColorValue.fromRgb([0x80, 0x80, 0x80])));
        this.addParam(this.paramOpacity = new NumberParam('opacity', 'opacity', true,  true, true, 100, 0, 100));

        this.paramOpacity.control.suffix = '%';
    

        this.checkers = createDiv('nodeHeaderCheckers');
        this.inner.insertBefore(this.checkers, this.header);
    }
    
    
    
    input_getValuesForUndo()
    {
        return [ 
            [this.node.paramColor  .id, 
             this.node.paramColor  .value],
            [this.node.paramOpacity.id, 
             this.node.paramOpacity.value]];
    }



    output_genRequest(gen)
    {
        // 'this' is the output

        if (!isEmpty(this.cache))
            return this.cache;


        gen.scope.push({
            nodeId:  this.node.id, 
            paramId: '' });

        const [request, ignore] = this.node.genRequestStart(gen);
        if (ignore) return request;

        
        const input = this.node.inputs[0];

        const paramIds = [];

        if (input.connected)
        {
            request.push(...pushInputOrParam(input, gen));

            for (const param of this.node.params)
                if (   param.input 
                    && param.input.connected) 
                    paramIds.push(param.id);
        }


        for (const param of this.node.params)
            request.push(...param.genRequest(gen))


        gen.scope.pop();
        pushUnique(gen.passedNodes, this.node);

        return request;
    }



    updateValues(updateParamId, paramIds, values)
    {
        const color   = values[paramIds.findIndex(id => id == 'color'  )];
        const opacity = values[paramIds.findIndex(id => id == 'opacity')];


        this.paramColor  .setValue(color,   false, true, false);
        this.paramOpacity.setValue(opacity, false, true, false);


        this._color = 
            color.isValid()
            ? color.toDataColor()
            : dataColor_NaN;

            
        super.updateValues(updateParamId, paramIds, values);
    }



    updateHeader()
    {
        //console.log(this.id + '.OpFill.updateHeader()');


        // if (dataColorIsNaN(this._color))
        //     return;


        const colors = this.getHeaderColors();

        this.colorBack.style.background = 
            !rgbIsNaN(colors.back)
            ? rgb2style(colors.back)
            : rgba2style(rgb_a(rgbDocumentBody, 0.95));

              
        this.checkers.style.height = this.header.offsetHeight;

        this.checkers.style.background =
            isDarkMode()
            ?   'linear-gradient(45deg, #222 25%, transparent 25%, transparent 75%, #222 75%), '
              + 'linear-gradient(45deg, #222 25%, transparent 25%, transparent 75%, #222 75%)'
            :   'linear-gradient(45deg, #ddd 25%, transparent 25%, transparent 75%, #ddd 75%), '
              + 'linear-gradient(45deg, #ddd 25%, transparent 25%, transparent 75%, #ddd 75%)';

        this.checkers.style.display            = !rgbIsNaN(colors.back) ? 'inline-block' : 'none';
        this.checkers.style.backgroundColor    = isDarkMode() ? '#444' : '#fff';

        this.checkers.style.backgroundSize     = '26px 26px';
        this.checkers.style.backgroundPosition = '0 0, 13px 13px';
                        

        this.header.style.background = 
            !rgbIsNaN(colors.back)
            ? rgba2style(colors.back) 
            : 'transparent';

        
        const noColor = 
            isDarkMode()
            ? rgbNoColorDark
            : rgbNoColorLight;

        this.inputs[0] .wireColor  = !rgbIsNaN(colors.back) ? colors.back : noColor;
        this.inputs[0] .colorLight = 
        this.inputs[0] .colorDark  = rgb_a(colors.input, 0.2);

        this.outputs[0].wireColor  = !rgbIsNaN(colors.back) ? colors.back : noColor;
        this.outputs[0].colorLight =
        this.outputs[0].colorDark  = rgb_a(colors.output, 0.2);


        this.updateWarningOverlay();
        this.updateWarningOverlayStyle(colors.back, 45);


        Operator.prototype.updateHeader.call(this);
    }



    getHeaderColors()
    {
        const colors = super.getHeaderColors();
 
        colors.back = rgb_a(colors.back, this.paramOpacity.value.value/100);
        colors.text = getTextColorFromBackColor(colors.back, colors.back[3]);

        return colors;
    }
}