class OpDropShadow
extends OperatorBase
{
    paramX;
    paramY;
    paramBlur;
    paramSpread;
    paramFill;
    paramBlend;
    paramBehind;


    
    constructor()
    {
        super(DROP_SHADOW, 'dropShadow', 'drop shadow');

        this.canDisable = true;
        

        this.addInput (new Input([DROP_SHADOW_VALUE], getNodeInputValuesForUndo, this.input_getBackInitValue));
        this.addOutput(new Output([DROP_SHADOW_VALUE], this.output_genRequest, getNodeOutputValuesForUndo, this.output_backInit));


        this.addParam(this.paramX      = new NumberParam('x',      'y',           true,  true, true, 0));
        this.addParam(this.paramY      = new NumberParam('y',      'y',           true,  true, true, 4));
        this.addParam(this.paramBlur   = new NumberParam('blur',   'blur',        true,  true, true, 4, 0));
        this.addParam(this.paramSpread = new NumberParam('spread', 'spread',      true,  true, true, 0));
        this.addParam(this.paramFill   = new FillParam  ('fill',   'fill',        false, true, true, new FillValue(ColorValue.fromRgb([0, 0, 0]), 0.25)));
        this.addParam(this.paramBlend  = new SelectParam('blend',  'blend',       false, true, true, BlendModes.map(bm => bm[1]), 0));
        this.addParam(this.paramBehind = new NumberParam('behind', 'show behind', true,  true, true, 1, 0, 1));
    }
    
    
    
    input_getBackInitValue()
    {
        // 'this' is the input

        return new DropShadowValue(
            node.paramX     .value,
            node.paramY     .value,
            node.paramBlur  .value,
            node.paramSpread.value,
            node.paramFill  .value,
            node.paramBlend .value,
            node.paramBehind.value);
    }



    output_backInit(value)
    {
        // 'this' is the output

        console.assert(value.type == DROP_SHADOW_VALUE, 'expected DROP_SHADOW_VALUE in backInit()');

        this.node.paramX     .setValue(value.x,      false, true, false);
        this.node.paramY     .setValue(value.y,      false, true, false);
        this.node.paramBlur  .setValue(value.blur,   false, true, false);
        this.node.paramSpread.setValue(value.spread, false, true, false);
        this.node.paramFill  .setValue(value.fill,   false, true, false);
        this.node.paramBlend .setValue(value.blend,  false, true, false);
        this.node.paramBehind.setValue(value.behind, false, true, false);
    }



    output_genRequest(gen)
    {
        // 'this' is the output

        gen.scope.push({
            nodeId:  this.node.id, 
            paramId: NULL });


        const hasInputs =
               this.node.paramX     .input.connected
            || this.node.paramY     .input.connected
            || this.node.paramBlur  .input.connected
            || this.node.paramSpread.input.connected
            || this.node.paramFill  .input.connected
            || this.node.paramBlend .input.connected
            || this.node.paramBehind.input.connected;

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



    // updateValues(requestId, actionId, updateParamId, paramIds, values)
    // {
    //     const color = values[paramIds.findIndex(id => id == 'color')];

    //     this._color = 
    //         color.isValid()
    //         ? color.toDataColor()
    //         : dataColor_NaN;


    //     this.outputs[0].types =
    //            this.inputs[0].connected
    //         && this.inputs[0].connectedOutput.supportsTypes(SHAPE_TYPES)
    //         ? [...this.inputs[0].connectedOutput.types, FILL_VALUE]
    //         : [FILL_VALUE];


    //     super.updateValues(requestId, actionId, updateParamId, paramIds, values);
    // }



    // updateHeader()
    // {
    //     //console.log(this.id + '.OpFill.updateHeader()');
        
    //     Operator.prototype.updateHeader.call(this);


    //     const colors = this.getHeaderColors();


    //     this.header.style.background = 
    //         !rgbaIsNaN(colors.stripeBack)
    //         ? rgba2style(colors.stripeBack) 
    //         : rgba2style(rgb_a(rgbDocumentBody, 0.95));

    //     this.colorBack.backStyleLight =
    //     this.colorBack.backStyleDark  =
    //         rgbaIsOk(colors.stripeBack)
    //         ? rgba2style(colors.stripeBack)
    //         : 'transparent';


    //     this.checkers.style.height = this.header.offsetHeight;

    //     this.checkers.style.background =
    //         darkMode
    //         ?   'linear-gradient(45deg, #222 25%, transparent 25%, transparent 75%, #222 75%), '
    //           + 'linear-gradient(45deg, #222 25%, transparent 25%, transparent 75%, #222 75%)'
    //         :   'linear-gradient(45deg, #ddd 25%, transparent 25%, transparent 75%, #ddd 75%), '
    //           + 'linear-gradient(45deg, #ddd 25%, transparent 25%, transparent 75%, #ddd 75%)';

    //     this.checkers.style.display            = !rgbIsNaN(colors.back) ? 'inline-block' : 'none';
    //     this.checkers.style.backgroundColor    = darkMode ? '#444' : '#fff';

    //     this.checkers.style.backgroundSize     = '22px 22px';
    //     this.checkers.style.backgroundPosition = '0 0, 11px 11px';

    //     this.checkers.style.left               = '-3px';
    //     this.checkers.style.width              = 'calc(100% + 3px)';
                       

    //     this.inputs[0] .colorLight = 
    //     this.inputs[0] .colorDark  = colors.input;
    //     this.inputs[0] .wireColor  = colors.wire;

    //     this.outputs[0].colorLight =
    //     this.outputs[0].colorDark  = colors.output;
    //     this.outputs[0].wireColor  = colors.wire;


    //     this.updateWarningOverlay();
    //     this.updateWarningOverlayStyle(colors.back);
    // }



    // updateHeaderLabel()
    // {
    //     super.updateHeaderLabel();
        
    //     const colors = this.getHeaderColors();
    //     this.label.style.color = rgb2style(colors.text);
    // }



    // getHeaderColors(options = {})
    // {
    //     const colors = super.getHeaderColors();

    //     const opacity = 
    //         this.paramOpacity.value.isValid() 
    //         ? this.paramOpacity.value.value/100 
    //         : Number.NaN;


    //     colors.back       = rgb_a(colors.back,       opacity);
    //     colors.stripeBack = rgb_a(colors.stripeBack, opacity);
    //     colors.text       = getTextColorFromBackColor(colors.stripeBack, colors.back[3]);
    //     colors.input      = rgb_a(colors.text, 0.2);
    //     colors.output     = rgb_a(colors.text, 0.2);

    //     colors.wire = 
    //         !rgbaIsNaN(colors.stripeBack)
    //         ? colors.stripeBack
    //         : rgb_a(rgbFromType(ANY_VALUE, false));


    //     return colors;
    // }



    // updateParams()
    // {
    //     const enable = 
    //           !this.inputs[0].connected
    //         || this.inputs[0].connectedOutput.supportsTypes(SHAPE_TYPES);

    //     this.paramColor  .enableControlText(enable);
    //     this.paramOpacity.enableControlText(enable);

    //     this.updateParamControls();
    // }
}