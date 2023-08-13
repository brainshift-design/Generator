class OpStroke
extends OpColorBase
{
    paramFills;
    paramWeight;
    paramFit;
    paramJoin;
    paramMiter;
    paramCap;
    paramDashes;

    checkers;
    colorBack;


    
    constructor()
    {
        super(STROKE, 'stroke', 'stroke', iconStroke);

        this.canDisable  = true;
        this.iconOffsetY = 1;
        

        this.colorBack      = createDiv('colorBack');
        this.checkersHolder = createDiv('nodeHeaderCheckersHolder');
        this.checkers       = createDiv('nodeHeaderCheckers');
        
        this.inner.appendChild(this.colorBack);
        this.inner.insertBefore(this.checkersHolder, this.header);

        this.checkersHolder.appendChild(this.checkers);


        this.addInput (new Input ([STROKE_VALUE], getNodeInputValuesForUndo));
        this.addOutput(new Output([STROKE_VALUE], this.output_genRequest, getNodeOutputValuesForUndo));


        this.addParam(this.paramFills  = new   ListParam('fills',  'fills',  false, true, true));
        this.addParam(this.paramWeight = new NumberParam('weight', 'weight', true,  true, true, 1, 0));
        this.addParam(this.paramFit    = new SelectParam('fit',    'align',  true,  true, true, ['inside', 'center', 'outside'], 1));
        this.addParam(this.paramJoin   = new SelectParam('join',   'join',   true,  true, true, ['miter', 'bevel', 'round'], 0));
        this.addParam(this.paramMiter  = new NumberParam('miter',  'miter',  true,  true, true, 28.96, 0, 180, 2));
        this.addParam(this.paramCap    = new SelectParam('cap',    'cap',    true,  true, true, ['none', 'square', 'round'], 0));
        this.addParam(this.paramDashes = new   TextParam('dashes', 'dashes', false, true, true));

        this.paramFills.itemName  = 'fill';
        this.paramFills.showZero  = false;
        this.paramFills.listTypes = [COLOR_VALUE, FILL_VALUE, GRADIENT_VALUE];
        this.paramFills.input.types.push(...this.paramFills.listTypes);

        this.paramWeight.divider = 0.55;
        this.paramMiter .divider = 0.43;

        this.paramMiter.controls[0].setSuffix('°', true);
        this.paramMiter.controls[0].suffixOffsetY = -4;
        this.paramMiter.canShow = () => this.paramJoin.value == 0;

        this.paramDashes.controls[0].textbox.defPlaceholder = 'no dashes';
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
               this.node.paramFills .input.connected
            || this.node.paramWeight.input.connected
            || this.node.paramFit   .input.connected
            || this.node.paramJoin  .input.connected
            || this.node.paramMiter .input.connected
            || this.node.paramCap   .input.connected
            || this.node.paramDashes.input.connected;

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
        this.outputs[0].types =
               this.inputs[0].connected
            && this.inputs[0].connectedOutput.supportsTypes(SHAPE_TYPES)
            ? [...this.inputs[0].connectedOutput.types, STROKE_VALUE]
            : [STROKE_VALUE];


            const value = values[paramIds.findIndex(id => id == 'value')];

            this.paramFills .setValue(value.fills,  false, true, false);
            this.paramWeight.setValue(value.weight, false, true, false);
            this.paramFit   .setValue(value.fit,    false, true, false);
            this.paramJoin  .setValue(value.join,   false, true, false);
            this.paramMiter .setValue(value.miter,  false, true, false);
            this.paramCap   .setValue(value.cap,    false, true, false);
            this.paramDashes.setValue(value.dashes, false, true, false);


            // super.updateValues(requestId, actionId, updateParamId, paramIds, values);
    }



    // updateHeader()
    // {
    //     //console.log(this.id + '.OpStroke.updateHeader()');

    //     Operator.prototype.updateHeader.call(this);


    //     const colors = this.getHeaderColors();


    //     this.header.style.background = 
    //         !rgbaIsNaN(colors.stripeBack)
    //         ? rgba2style(colors.stripeBack) 
    //         : 'transparent';

    //     this.colorBack.style.background = 
    //         rgbIsOk(colors.stripeBack) //!rgbIsNaN(colors.back)
    //         ? rgb2style(colors.stripeBack)
    //         : rgba2style(rgb_a(rgbDocumentBody, 0.95));


    //     this.colorBack.style.height = this.measureData.headerOffset.height;

            
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


    //     this.header.style.background = 
    //         !rgbIsNaN(colors.stripeBack)
    //         ? rgba2style(colors.stripeBack) 
    //         : 'transparent';


    //     this.inputs[0] .colorLight = 
    //     this.inputs[0] .colorDark  = colors.input;
    //     this.inputs[0] .wireColor  = colors.wire;

    //     this.outputs[0].colorLight =
    //     this.outputs[0].colorDark  = colors.output;
    //     this.outputs[0].wireColor  = colors.wire;


    //     this.updateWarningOverlay();
    //     this.updateWarningOverlayStyle(colors.back, 45);
    // }



    updateHeaderLabel()
    {
        super.updateHeaderLabel();
        
        const colors = this.getHeaderColors();
        this.label.style.color = rgba2style(colors.text);
    }



    updateParams()
    {
        const enableFills = !this.paramFills.input.connected;
 
        const enable = 
               !this.inputs[0].connected
            || !this.inputs[0].connectedOutput.supportsTypes(STROKE_TYPES);

        this.paramFills .enableControlText(enableFills, this.paramFills .isUnknown());
        this.paramWeight.enableControlText(enable,      this.paramWeight.isUnknown());
        this.paramFit   .enableControlText(enable,      this.paramFit   .isUnknown());
        this.paramJoin  .enableControlText(enable,      this.paramJoin  .isUnknown());
        this.paramMiter .enableControlText(enable,      this.paramMiter .isUnknown());

        this.updateParamControls();
    }

    

    // getHeaderColors(options = {})
    // {
    //     const colors = super.getHeaderColors();

    //     if (this.paramFills.value)
    //     {
    //         colors.back       = rgb_a(colors.back, this.paramFills.value.opacity.value/100);
    //         colors.stripeBack = rgb_a(colors.stripeBack, this.paramFills.value.opacity.value/100);
    //         colors.text       = getTextColorFromBackColor(colors.stripeBack, this.paramFills.value.opacity.value/100);
    //         colors.input      = rgb_a(colors.text, 0.2);
    //         colors.output     = rgb_a(colors.text, 0.2);

    //         colors.wire = 
    //             !rgbaIsNaN(colors.stripeBack)
    //             ? colors.stripeBack
    //             : rgbFromType(ANY_VALUE, true);
    //     }
    //     else
    //     {
    //         colors.back = document
    //     }

        

    //     return colors;
    // }



    updateWarningOverlayStyle(colBack, height = -1)
    {
        super.updateWarningOverlayStyle(colBack, height);
        
        this._warningOverlay.style.backgroundPosition = '-1.5px 0';
        this._warningOverlay.style.backgroundSize     = 'calc(100% + 16px) 100%';
        this._warningOverlay.style.display            = 'block';
    }
}