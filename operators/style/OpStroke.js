class OpStroke
extends OpColorBase
{
    paramFill;
    paramWeight;
    paramFit;
    paramJoin;
    paramMiter;

    checkers;
    colorBack;


    
    constructor()
    {
        super(STROKE, 'stroke', 'stroke');


        this.colorBack      = createDiv('colorBack');
        this.checkersHolder = createDiv('nodeHeaderCheckersHolder');
        this.checkers       = createDiv('nodeHeaderCheckers');
        
        this.inner.appendChild(this.colorBack);
        this.inner.insertBefore(this.checkersHolder, this.header);

        this.checkersHolder.appendChild(this.checkers);


        this.addInput (new Input(STROKE_TYPES, getNodeInputValuesForUndo));
        this.addOutput(new Output([STROKE_VALUE], this.output_genRequest, getNodeOutputValuesForUndo));


        this.addParam(this.paramFill   = new FillParam  ('fill',   'fill',   false, true, true, FillValue.create(0, 0, 0, 100)));
        this.addParam(this.paramWeight = new NumberParam('weight', 'weight', true,  true, true, 1, 0));
        this.addParam(this.paramFit    = new SelectParam('fit',    'align',  true,  true, true, ['inside', 'center', 'outside'], 0));
        this.addParam(this.paramJoin   = new SelectParam('join',   'join',   true,  true, true, ['miter', 'bevel', 'round'], 0));
        this.addParam(this.paramMiter  = new NumberParam('miter',  'miter',  true,  true, true, 28.96, 0, 180, 2));

        this.paramMiter.controls[0].setSuffix('°', true);
        this.paramMiter.canShow = () => this.paramJoin.value == 0;
    }
    
    
    
    // canAutoConnectFrom(output)
    // {
    //     return output.supportsTypes(FILL_TYPES)
    //         || output.supportsTypes(COLOR_TYPES);
    // }



    output_genRequest(gen)
    {
        // 'this' is the output

        gen.scope.push({
            nodeId:  this.node.id, 
            paramId: NULL });


        const hasInputs =
               this.node.paramFill  .input.connected
            || this.node.paramWeight.input.connected
            || this.node.paramFit   .input.connected
            || this.node.paramJoin  .input.connected
            || this.node.paramMiter .input.connected;

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
        const fill = values[paramIds.findIndex(id => id == 'fill')];

        this._color = 
               fill
            && fill.isValid()
            ? fill.color.toDataColor()
            : dataColor_NaN;

            
        this.outputs[0].types =
               this.inputs[0].connected
            && this.inputs[0].connectedOutput.supportsTypes(SHAPE_TYPES)
            ? [...this.inputs[0].connectedOutput.types, STROKE_VALUE]
            : [STROKE_VALUE];


        super.updateValues(requestId, actionId, updateParamId, paramIds, values);
    }



    updateHeader()
    {
        //console.log(this.id + '.OpStroke.updateHeader()');

        Operator.prototype.updateHeader.call(this);


        const colors = this.getHeaderColors();


        this.header.style.background = 
            !rgbaIsNaN(colors.stripeBack)
            ? rgba2style(colors.stripeBack) 
            : 'transparent';

        this.colorBack.style.background = 
            rgbIsOk(colors.stripeBack) //!rgbIsNaN(colors.back)
            ? rgb2style(colors.stripeBack)
            : rgba2style(rgb_a(rgbDocumentBody, 0.95));


        this.colorBack.style.height = this.measureData.headerOffset.height;

            
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


        this.header.style.background = 
            !rgbIsNaN(colors.stripeBack)
            ? rgba2style(colors.stripeBack) 
            : 'transparent';


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



    updateParams()
    {
        const enableFill = !this.paramFill.input.connected;
 
        const enable = 
               !this.inputs[0].connected
            || !this.inputs[0].connectedOutput.supportsTypes(STROKE_TYPES);

        this.paramFill  .enableControlText(enableFill);
        this.paramWeight.enableControlText(enable);
        this.paramFit   .enableControlText(enable);
        this.paramJoin  .enableControlText(enable);
        this.paramMiter .enableControlText(enable);

        this.updateParamControls();
    }

    

    getHeaderColors(options = {})
    {
        const colors = super.getHeaderColors();

        colors.back       = rgb_a(colors.back, this.paramFill.value.opacity.value/100);
        colors.stripeBack = rgb_a(colors.stripeBack, this.paramFill.value.opacity.value/100);
        colors.text       = getTextColorFromBackColor(colors.stripeBack, this.paramFill.value.opacity.value/100);
        colors.input      = rgb_a(colors.text, 0.2);
        colors.output     = rgb_a(colors.text, 0.2);

        colors.wire = 
            !rgbaIsNaN(colors.stripeBack)
            ? colors.stripeBack
            : rgbFromType(ANY_TYPE, false);

        return colors;
    }



    updateWarningOverlayStyle(colBack, height = -1)
    {
        super.updateWarningOverlayStyle(colBack, height);
        
        this._warningOverlay.style.backgroundPosition = '-1.5px 0';
        this._warningOverlay.style.backgroundSize     = 'calc(100% + 16px) 100%';
        this._warningOverlay.style.display            = 'block';
    }
}