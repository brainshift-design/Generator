class OpColorStop
extends OpColorBase
{
    paramFill;
    paramPosition;

    checkers;
    colorBack;


    
    constructor()
    {
        super(COLOR_STOP, 'colorStop', 'color stop', iconColorStop);

        this.canDisable  = true;
        this.iconOffsetY = -1;
        

        this.colorBack = createDiv('colorBack');
        this.inner.appendChild(this.colorBack, this.paramHolder);


        this.checkersHolder = createDiv('nodeHeaderCheckersHolder');
        this.checkers       = createDiv('nodeHeaderCheckers');
        
        this.checkersHolder.appendChild(this.checkers);
        this.inner.insertBefore(this.checkersHolder, this.header);


        this.addInput (new Input([COLOR_STOP_VALUE], getNodeInputValuesForUndo));
        this.addOutput(new Output([COLOR_STOP_VALUE], this.output_genRequest));//, getNodeOutputValuesForUndo));


        this.addParam(this.paramFill     = new FillParam  ('fill',     'fill',     false, true, true, FillValue.create(0, 0, 0, 100)));
        this.addParam(this.paramPosition = new NumberParam('position', 'position', true,  true, true, 0));


        this.paramPosition.controls[0].suffix = '%';

        this.paramPosition.controls[0].displayMin =   0;
        this.paramPosition.controls[0].displayMax = 100;

        this.paramPosition.divider = 0.55;
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
               this.node.paramFill    .input.connected
            || this.node.paramPosition.input.connected;

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
        const value = values[paramIds.findIndex(id => id == 'value')];

        this.paramFill    .setValue(value.fill,     false, true, false);
        this.paramPosition.setValue(value.position, false, true, false);


        this._color = 
               value.fill
            && value.fill.isValid()
            ? value.fill.color.toDataColor()
            : dataColor_NaN;

            
        // this.outputs[0].types =
        //        this.inputs[0].connected
        //     && this.inputs[0].connectedOutput.supportsTypes(SHAPE_TYPES)
        //     ? [...this.inputs[0].connectedOutput.types, COLOR_STOP_VALUE]
        //     : [COLOR_STOP_VALUE];


        // super.updateValues(requestId, actionId, updateParamId, paramIds, values);
    }



    updateHeader()
    {
        //console.log(this.id + '.OpStroke.updateHeader()');

        Operator.prototype.updateHeader.call(this);


        const colors = this.getHeaderColors();


        const unknownBackStyle = darkMode ? '#444' : '#ccc';


        this.header.style.background = 'transparent';

        this.colorBack.style.background = 
            this.isUnknown()
            ? unknownBackStyle
            : !rgbIsNaN(colors.stripeBack)
            ? rgba2style(colors.stripeBack)
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


        if (this.paramFill.value.opacity.isValid())
            this.checkersHolder.style.opacity = (100 - this.paramFill.value.opacity.toNumber()) + '%';


        this.header.style.background = 'transparent';


        this.inputs[0] .wireColor  = colors.inWire;

        this.outputs[0].colorLight =
        this.outputs[0].colorDark  = colors.output;
        this.outputs[0].wireColor  = colors.outWire;


        this.updateWarningOverlay();
        this.updateWarningOverlayStyle(colors.back, 45);
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
            || !this.inputs[0].connectedOutput.supportsTypes(COLOR_STOP_TYPES);

        this.paramFill    .enableControlText(enableFill, this.paramFill    .isUnknown());
        this.paramPosition.enableControlText(enable,     this.paramPosition.isUnknown());

        this.updateParamControls();
    }

    

    getHeaderColors(options = {})
    {
        const colors = super.getHeaderColors();

        colors.input      = rgb_a(colors.text, 0.2);
        colors.output     = rgb_a(colors.text, 0.2);


            
        if (this.isUnknown())
        {
            colors.back       = darkMode ? hex2rgb('444' ) : hex2rgb('ccc' );
            colors.stripeBack = darkMode ? hex2rgb('444' ) : hex2rgb('ccc' );
            colors.text       = darkMode ? hex2rgb('fff8') : hex2rgb('0008');
            colors.input      = rgb_a(colors.text, 0.3);
            colors.output     = rgb_a(colors.text, 0.3);
            colors.inWire     =
            colors.outWire    = darkMode ? hex2rgb('888') : hex2rgb('aaa');
        }
        else
        {
            const opacity = this.paramFill.value.opacity.value/100;

            colors.back       = rgb_a(colors.back,       opacity);
            colors.stripeBack = rgb_a(colors.stripeBack, opacity);
            colors.text       = getTextColorFromBackColor(colors.stripeBack, opacity);
            colors.input      = rgb_a(colors.text, 0.3);
            colors.output     = rgb_a(colors.text, 0.3);
            colors.inWire     =
            colors.outWire    = 
                !rgbaIsNaN(colors.stripeBack)
                ? colors.stripeBack
                : rgbFromType(ANY_VALUE, false);
        }


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