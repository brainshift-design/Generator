class OpFill
extends OpColorBase
{
    paramColor;
    paramOpacity;

    checkersHolder;
    checkers;
    colorBack;



    constructor()
    {
        super(FILL, 'fill', 'fill');


        this.colorBack      = createDiv('colorBack');
        this.checkersHolder = createDiv('nodeHeaderCheckersHolder');
        this.checkers       = createDiv('nodeHeaderCheckers');

        //this.inner.appendChild(this.colorBack);
        this.inner.insertBefore(this.checkersHolder, this.header);
        this.checkersHolder.appendChild(this.checkers);


        this.addInput (new Input(FILL_TYPES, getNodeInputValuesForUndo, this.input_getBackInitValue));
        this.addOutput(new Output([FILL], this.output_genRequest, getNodeOutputValuesForUndo, this.output_backInit));


        this.addParam(this.paramColor   = new ColorParam ('color',   '',        false, true, true, ColorValue.fromRgb(rgbDefaultFill)));
        this.addParam(this.paramOpacity = new NumberParam('opacity', 'opacity', true,  true, true, 100, 0, 100));

        this.paramOpacity.controls[0].suffix = '%';
    }
    
    
    
    input_getBackInitValue()
    {
        // 'this' is the input

        return new FillValue(
            node.paramColor  .value,
            node.paramOpacity.value);
    }



    output_backInit(value)
    {
        // 'this' is the output

        console.assert(value.type == FILL_VALUE, 'expected FILL_VALUE in backInit()');

        this.node.paramColor  .setValue(value.color,   false, true, false);
        this.node.paramOpacity.setValue(value.opacity, false, true, false);
    }



    output_genRequest(gen)
    {
        // 'this' is the output

        gen.scope.push({
            nodeId:  this.node.id, 
            paramId: NULL });


        const hasInputs =
               this.node.paramColor  .input.connected
            || this.node.paramOpacity.input.connected;

        const options = (hasInputs ? 1 : 0) << 20;
    
    
        const [request, ignore] = this.node.genRequestStart(gen, options);
        if (ignore) return request;


        const input = this.node.inputs[0];


        request.push(input.connected ? 1 : 0);


        if (input.connected)
        {
            request.push(...pushInputOrParam(input, gen));


            const paramIds = [];

            for (const param of this.node.params)
                if (   param.input 
                    && param.input.connected)
                    paramIds.push(param.id);

            request.push(paramIds.join(','));


            for (const param of this.node.params)
                if (param.input.connected) request.push(...param.genRequest(gen));            
        }
        else
        {
            for (const param of this.node.params)
                request.push(...param.genRequest(gen));            
        }

        
        gen.scope.pop();
        pushUnique(gen.passedNodes, this.node);

        return request;
    }



    updateValues(requestId, actionId, updateParamId, paramIds, values)
    {
        const color = values[paramIds.findIndex(id => id == 'color')];

        this._color = 
            color.isValid()
            ? color.toDataColor()
            : dataColor_NaN;


        this.outputs[0].types =
               this.inputs[0].connected
            && this.inputs[0].connectedOutput.supportsTypes(SHAPE_TYPES)
            ? [...this.inputs[0].connectedOutput.types, FILL]
            : [FILL];


        super.updateValues(requestId, actionId, updateParamId, paramIds, values);
    }



    updateColorControl()
    {
        const colors = this.getHeaderColors({color: true});

        colors.text   = getTextColorFromBackColor(colors.back, this.inputIsShape ? colors.back[3] : 1);
        colors.input  = rgb_a(colors.text, 0.2);
        colors.output = rgb_a(colors.text, 0.2);


        this.paramColor.checkers.style.display = !rgbIsNaN(colors.back) ? 'inline-block' : 'none';

        if (this.paramOpacity.value.isValid())
            this.paramColor.checkers.style.opacity = 
                this.inputIsShape 
                ? (100 - this.paramOpacity.value.toNumber()) + '%'
                : 0;


        this.paramColor.controls[0]. backStyleLight = 
        this.paramColor.controls[0]. backStyleDark  = 
        this.paramColor.controls[0].valueStyleLight = 
        this.paramColor.controls[0].valueStyleDark  = rgba2style(rgb_a(colors.back, 1));

        this.paramColor.controls[0].textStyleLight  = 
        this.paramColor.controls[0].textStyleDark   = rgba2style(colors.text);

        this.paramColor. input.colorLight           =
        this.paramColor. input.colorDark            = colors.input;
        
        this.paramColor.output.colorLight           =
        this.paramColor.output.colorDark            = colors.output;
    }



    updateNode()
    {
        this.updateColorControl();

        super.updateNode();
    }



    updateHeader()
    {
        //console.log(this.id + '.OpFill.updateHeader()');
        
        Operator.prototype.updateHeader.call(this);


        const colors =
              this.inputIsShape
            ? OperatorBase.prototype.getHeaderColors.call(this)
            : this.getHeaderColors();


        this.header.style.background = 
            !rgbIsNaN(colors.back)
            ? rgba2style(colors.back) 
            : 'transparent';

        this.colorBack.style.background = 
            !rgbIsNaN(colors.back)
            ? rgb2style(colors.back)
            : rgba2style(rgb_a(rgbDocumentBody, 0.95));


        this.checkers.style.height = this.header.offsetHeight;

        this.checkers.style.background =
            darkMode
            ?   'linear-gradient(45deg, #222 25%, transparent 25%, transparent 75%, #222 75%), '
              + 'linear-gradient(45deg, #222 25%, transparent 25%, transparent 75%, #222 75%)'
            :   'linear-gradient(45deg, #ddd 25%, transparent 25%, transparent 75%, #ddd 75%), '
              + 'linear-gradient(45deg, #ddd 25%, transparent 25%, transparent 75%, #ddd 75%)';

        this.checkers.style.display            = !rgbIsNaN(colors.back) ? 'inline-block' : 'none';
        this.checkers.style.backgroundColor    = darkMode ? '#444' : '#fff';

        this.checkers.style.backgroundSize     = '22px 22px';
        this.checkers.style.backgroundPosition = '0 0, 11px 11px';

        this.checkers.style.left               = '-3px';
        this.checkers.style.width              = 'calc(100% + 3px)';
                       

        this.inputs[0] .colorLight = 
        this.inputs[0] .colorDark  = colors.input;
        this.inputs[0] .wireColor  = colors.wire;

        this.outputs[0].colorLight =
        this.outputs[0].colorDark  = colors.output;
        this.outputs[0].wireColor  = colors.wire;


        this.updateWarningOverlay();
        this.updateWarningOverlayStyle(colors.back, this.inputIsShape ? -1 : 45);
    }



    updateHeaderLabel()
    {
        super.updateHeaderLabel();
        
        const colors = this.getHeaderColors();
        this.label.style.color = rgba2style(colors.text);
    }



    getHeaderColors(options = {})
    {
        if (    this.inputIsShape
            && !options.color)
            return Operator.prototype.getHeaderColors.call(this);

            
        const colors  = super.getHeaderColors();

        colors.back   = rgb_a(colors.back, this.paramOpacity.value.value/100);
        colors.text   = getTextColorFromBackColor(colors.back, colors.back[3]);
        colors.input  = rgb_a(colors.text, 0.2);
        colors.output = rgb_a(colors.text, 0.2);
        colors.wire   = colors.back;
        
        return colors;
    }



    updateParams()
    {
        const enable = 
              !this.inputs[0].connected
            || this.inputs[0].connectedOutput.supportsTypes(SHAPE_TYPES);

        this.paramColor  .enableControlText(enable);
        this.paramOpacity.enableControlText(enable);

        this.updateParamControls();
    }
}