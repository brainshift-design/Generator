class OpFill
extends OpColorBase
{
    paramColor;
    paramOpacity;
    paramBlend;


    checkersHolder;
    checkers;
    colorBack;



    constructor()
    {
        super(FILL, 'fill', 'fill', iconFill);

        this.canDisable  = true;
        this.iconOffsetY = 1;
        

        this.colorBack = createDiv('colorBack');
        this.inner.insertBefore(this.colorBack, this.paramHolder);


        this.checkersHolder = createDiv('nodeHeaderCheckersHolder');
        this.checkers       = createDiv('nodeHeaderCheckers'      );
        
        this.checkersHolder.appendChild(this.checkers);
        this.inner.insertBefore(this.checkersHolder, this.header);



        this.addInput (new Input ([FILL_VALUE], getNodeInputValuesForUndo, this.input_getBackInitValue));
        this.addOutput(new Output([FILL_VALUE], this.output_genRequest, getNodeOutputValuesForUndo, this.output_backInit));


        this.addParam(this.paramColor   = new ColorParam ('color',   'color',   false, true, true, ColorValue.fromRgb(rgbDefaultFill)));
        this.addParam(this.paramOpacity = new NumberParam('opacity', 'opacity', true,  true, true, 100, 0, 100));
        this.addParam(this.paramBlend   = new SelectParam('blend',   'blend',   false, true, true, BlendModes.map(bm => bm[1]), 0));


        this.paramColor.isNodeValue = true;
        this.paramColor.controls[0].textbox.style.background = 'transparent';
        
        this.paramOpacity.controls[0].suffix = '%';

        this.paramOpacity.divider = 0.54;
    }
    
    
    
    input_getBackInitValue()
    {
        // 'this' is the input

        return new FillValue(
            node.paramColor  .value,
            node.paramOpacity.value,
            node.paramBlend  .value);
    }



    output_backInit(value)
    {
        // 'this' is the output

        consoleAssert(value.type == FILL_VALUE, 'expected FILL_VALUE in backInit()');

        this.node.paramColor  .setValue(value.color,   false, true, false);
        this.node.paramOpacity.setValue(value.opacity, false, true, false);
        this.node.paramBlend  .setValue(value.blend,   false, true, false);
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
        super.updateValues(requestId, actionId, updateParamId, paramIds, values);

        const value = values[paramIds.findIndex(id => id == 'value')];

        this.paramColor  .setValue(value.color,   false, true, false);
        this.paramOpacity.setValue(value.opacity, false, true, false);
        this.paramBlend  .setValue(value.blend,   false, true, false);
 
        this._color = 
            value.color.isValid()
            ? value.color.toDataColor()
            : dataColor_NaN;

        this.outputs[0].types =
               this.inputs[0].connected
            && this.inputs[0].connectedOutput.supportsTypes(SHAPE_TYPES)
            ? [...this.inputs[0].connectedOutput.types, FILL_VALUE]
            : [FILL_VALUE];
    }



    updateColorControl()
    {
        const colors = this.getHeaderColors({color: true});

        colors.text = getTextColorFromBackColor(colors.stripeBack, 1);

        colors.input  = rgb_a(colors.text, 0.2);
        colors.output = rgb_a(colors.text, 0.2);


        this.paramColor.checkers.style.display = !rgbIsNaN(colors.back) ? 'inline-block' : 'none';

        if (this.paramOpacity.value.isValid())
            this.checkersHolder.style.opacity = (100 - this.paramOpacity.value.toNumber()) + '%';


        // this.paramColor.controls[0]. backStyleLight = 
        // this.paramColor.controls[0]. backStyleDark  = 
        //     !rgbIsNaN(colors.stripeBack)
        //     ? rgb2style(colors.stripeBack, 1)
        //     : noColorStyle(colors.stripeBack);

              
        // this.paramColor.controls[0].valueStyleLight = 
        // this.paramColor.controls[0].valueStyleDark  = 'transparent';//rgba2style(rgb_a(colors.back));

        // this.paramColor.controls[0].textStyleLight  = 
        // this.paramColor.controls[0].textStyleDark   = rgba2style(colors.text);

        // this.paramColor. input.colorLight           =
        // this.paramColor. input.colorDark            = colors.input;
        
        // this.paramColor.output.colorLight           =
        // this.paramColor.output.colorDark            = colors.output;

        // this.paramColor.output.wireColor            = colors.stripeBack;
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


        const colors = this.getHeaderColors();


        updateFillHeader(this, colors);
    }



    updateHeaderLabel()
    {
        super.updateHeaderLabel();
        
        const colors = this.getHeaderColors();
        this.label.style.color = rgb2style(colors.text);
    }



    getHeaderColors(options = {})
    {
        const colors = super.getHeaderColors();

        const opacity = 
            this.paramOpacity.value.isValid() 
            ? this.paramOpacity.value.value/100 
            : Number.NaN;


        colors.input  = rgb_a(colors.text, 0.2);
        colors.output = rgb_a(colors.text, 0.2);
        

        if (this.isUnknown())
        {
            colors.back       = darkMode ? hex2rgb('444' ) : hex2rgb('ccc' );
            colors.stripeBack = darkMode ? hex2rgb('444' ) : hex2rgb('ccc' );
            colors.text       = darkMode ? hex2rgb('fff8') : hex2rgb('0008');
            colors.inWire     =
            colors.outWire    = darkMode ? hex2rgb('888' ) : hex2rgb('aaa' );
        }
        else
        {
            colors.back       = !rgbIsNaN(colors.back      ) && !isNaN(opacity) ? rgb_a(colors.back,       opacity) : rgb_NaN;//rgbDocumentBody;
            colors.stripeBack = !rgbIsNaN(colors.stripeBack) && !isNaN(opacity) ? rgb_a(colors.stripeBack, opacity) : rgbDocumentBody;
            colors.text       = getTextColorFromBackColor(colors.stripeBack, colors.back[3]);

            colors.inWire     =
            colors.outWire    = 
                !rgbaIsNaN(colors.stripeBack)
                ? colors.stripeBack
                : rgb_a(rgbFromType(ANY_VALUE, false));
        }
        

        return colors;
    }



    updateParams()
    {
        const enable = 
              !this.inputs[0].connected
            || this.inputs[0].connectedOutput.supportsTypes(SHAPE_TYPES);

        this.paramColor  .enableControlText(enable, this.paramColor  .isUnknown());
        this.paramOpacity.enableControlText(enable, this.paramOpacity.isUnknown());
        this.paramBlend  .enableControlText(enable, this.paramBlend  .isUnknown());

        this.updateParamControls();
    }



    updateWarningOverlay() 
    {
        //console.log(this.id + '.updateWarningOverlay()');

        const colors = this.getHeaderColors();
        
            
        if (   !rgbIsNaN(colors.back)
            && this.paramOpacity.value.isValid())
        {
            if (  !this.paramOpacity.value.isValid()
                || this.forceShowWarning)
            {
                if (!this.forceShowWarning)
                    this.warningStyle = getDefaultWarningStyle(colors.back);

                this.updateWarningOverlayStyle(colors.back);
            }
            else
                this._warningOverlay.style.display = 'none';
        }
        else
        {
            this.warningStyle = getDefaultWarningStyle(colors.back);
            this.updateWarningOverlayStyle(colors.back);
        }
    }
}



function updateFillHeader(node, colors)
{
    const unknownBackStyle = darkMode ? '#444' : '#ccc';

    
    node.header.style.background = 'transparent';

    node.colorBack.style.background = 
        node.isUnknown()
        ? unknownBackStyle
        : (  !rgbIsNaN(colors.stripeBack)
           && node.paramOpacity.value.isValid()
           ? rgba2style(colors.stripeBack)
           : rgba2style(rgb_a(rgbDocumentBody, 0.95)));

    node.colorBack.style.backgroundImage = 
        node.isUnknown()
        ? 'url(\'data:image/svg+xml;utf8,<svg width="35" height="51" viewBox="0 0 35 51" fill="none" xmlns="http://www.w3.org/2000/svg"><path opacity="0.1" d="M11.8434 33.3907V32.6328C11.8581 30.0323 12.0865 27.9593 12.5284 26.4139C12.9851 24.8684 13.6479 23.6202 14.517 22.6691C15.3861 21.7181 16.432 20.8562 17.6546 20.0835C18.568 19.489 19.3855 18.8724 20.1073 18.2334C20.8291 17.5944 21.4036 16.8885 21.8308 16.1158C22.258 15.3282 22.4716 14.4515 22.4716 13.4856C22.4716 12.4602 22.2285 11.5612 21.7424 10.7884C21.2563 10.0157 20.6008 9.42129 19.7759 9.00521C18.9657 8.58913 18.0671 8.38109 17.0802 8.38109C16.1227 8.38109 15.2167 8.59658 14.3624 9.02753C13.508 9.44361 12.8083 10.0677 12.2632 10.8999C11.7182 11.7172 11.4236 12.7351 11.3794 13.9537H2.36426C2.43791 10.9816 3.14498 8.52969 4.48547 6.59789C5.82597 4.65122 7.60102 3.20234 9.8106 2.25129C12.0202 1.28538 14.4581 0.802429 17.1244 0.802429C20.0558 0.802429 22.6483 1.29281 24.9021 2.27358C27.1559 3.23949 28.9236 4.64377 30.2052 6.48644C31.4867 8.32911 32.1275 10.5507 32.1275 13.1512C32.1275 14.8898 31.8403 16.4353 31.2658 17.7876C30.706 19.125 29.9179 20.3138 28.9015 21.354C27.8851 22.3794 26.6845 23.3081 25.2999 24.1403C24.1361 24.8387 23.1787 25.5669 22.4274 26.3247C21.6908 27.0826 21.1385 27.9593 20.7702 28.955C20.4167 29.9506 20.2325 31.1766 20.2178 32.6328V33.3907H11.8434ZM16.2184 47.6563C14.7454 47.6563 13.4859 47.1365 12.44 46.0961C11.4089 45.0412 10.9007 43.778 10.9154 42.3068C10.9007 40.8506 11.4089 39.6023 12.44 38.5621C13.4859 37.5218 14.7454 37.0017 16.2184 37.0017C17.6178 37.0017 18.8478 37.5218 19.9085 38.5621C20.9691 39.6023 21.5067 40.8506 21.5214 42.3068C21.5067 43.2876 21.249 44.1868 20.7481 45.004C20.262 45.8062 19.6212 46.4527 18.8257 46.9431C18.0303 47.4186 17.1612 47.6563 16.2184 47.6563Z" fill="' + (darkMode ? 'white' : 'black') + '"/></svg>\')'
        : 'none';

    node.colorBack.style.height = node.measureData.headerOffset.height;

    node.colorBack.style.backgroundPosition = '50% 50%';
    node.colorBack.style.backgroundRepeat   = 'no-repeat';


    if (    node.isUnknown()
        || !node.paramOpacity.value.isValid())
        node.checkers.style.display = 'none';

    else
        updateHeaderCheckers(node, colors);
                        

    node.inputs[0] .colorLight = 
    node.inputs[0] .colorDark  = colors.input;
    node.inputs[0] .wireColor  = colors.inWire;

    node.outputs[0].colorLight =
    node.outputs[0].colorDark  = colors.output;
    node.outputs[0].wireColor  = colors.outWire;


    if (node.isUnknown())
        node._warningOverlay.style.display = 'none';

    else
    {
        const colWarning = 
            isDark(colors.back)
            ? [1, 1, 1, 0.2 ]
            : [0, 0, 0, 0.12];

        node.warningStyle = 
               rgbIsValid(colors.back) 
            && node.paramOpacity.value.isValid()
            ? 'transparent' 
            :  rgba2style(colWarning);

            
        node.updateWarningOverlay();
        node.updateWarningOverlayStyle(colors.back, defHeaderHeight + defParamHeight);
    }
}



function updateHeaderCheckers(node, colors)
{
    node.checkers.style.height = node.header.offsetHeight;

    node.checkers.style.background =
        darkMode
        ?     'linear-gradient(45deg, #222 25%, transparent 25%, transparent 75%, #222 75%), '
            + 'linear-gradient(45deg, #222 25%, transparent 25%, transparent 75%, #222 75%)'
        :     'linear-gradient(45deg, #ddd 25%, transparent 25%, transparent 75%, #ddd 75%), '
            + 'linear-gradient(45deg, #ddd 25%, transparent 25%, transparent 75%, #ddd 75%)';

    node.checkers.style.display            = !rgbIsNaN(colors.stripeBack) ? 'inline-block' : 'none';
    node.checkers.style.backgroundColor    =  darkMode ? '#444' : '#fff';

    node.checkers.style.backgroundSize     = '22px 22px';
    node.checkers.style.backgroundPosition = '0 0, 11px 11px';

    node.checkers.style.left               = '-3px';
    node.checkers.style.width              = 'calc(100% + 3px)';
}