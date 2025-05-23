class   OpColor
extends OpColorBase
{
    static { Operator.types[COLOR] = this; }



    paramSpace;
    param1;
    param2;
    param3;
    paramColor;

    colorBack;


    prevSpace;
    prevSpaceConnections = [];


    _colorBeforeNaN = dataColor_NaN;



    constructor(options = {})
    {
        super(COLOR, 'color', 'color', iconColor);

        this.canDisable = true;

        
        const defColor = ['hex', 0.85, 0.85, 0.85];

             if (!!options.random) this._color = ['hex', Math.random(), Math.random(), Math.random()];
        else if (!!options.color ) this._color = ['hex', options.color[0], options.color[1], options.color[2]];
        else                       this._color = [...defColor];

            
        this.prevSpace = 'hex';


        this.colorBack = createDiv('colorBack');
        this.inner.insertBefore(this.colorBack, this.paramHolder);


        this.addInput (new Input ([COLOR_VALUE], getColorInputValuesForUndo, this.input_getBackInitValue));
        this.addOutput(new Output([COLOR_VALUE], this.output_genRequest, getColorOutputValuesForUndo, this.output_backInit));

        
        this.addParam(this.paramSpace = new OptionParam('space', 'space', false, true,  true, ColorSpaces.map(s => s[1]), 0));
        this.addParam(this.param1     = new NumberParam('c1',    '',      true,  true,  true));
        this.addParam(this.param2     = new NumberParam('c2',    '',      true,  true,  true));
        this.addParam(this.param3     = new NumberParam('c3',    '',      true,  true,  true));
        
        this.addParam(this.paramColor = new ColorParam ('color', '',      false, false, false, ColorValue.fromRgb(scaleRgb(dataColor2rgb(this._color)))));


        this.paramSpace.separatorsBefore = [1, 4, 7, 12, 15];
        this.paramSpace.markMenuPro      = subscribed() ? [] : [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17];
        this.paramSpace.minMenuWidth     = subscribed() ? 200 : 220;

        this.paramSpace.alwaysSaveValue  = true;

        this.paramSpace.controls[0].textValues =
        [
            [ 0, 'hex'                          ],
            [ 1, 'rgb'                          ],
            [ 2, 'hsl'                          ],
            [ 3, 'hsv',   'hsb'                 ],
            [ 4, 'lin',   'linear'              ],
            [ 5, 'p3'                           ],
            [ 6, 'a98',   'adobe98'             ],
            [ 7, 'pro',   'prophoto'            ],
            [ 8, 'r2020', 'rec2020', 'rec.2020' ],
            [ 9, 'hclok', 'okhcl',   'oklch'    ],
            [10, 'hclab'                        ],
            [11, 'hcluv'                        ],
            [12, 'oklab'                        ],
            [13, 'lab'                          ],
            [14, 'luv'                          ],
            [15, 'xyz'                          ],
            [16, 'xyz50'                        ],
            [17, 'xyz65'                        ]
        ];
        

        this.param1    .alwaysSaveValue  = true;
        this.param2    .alwaysSaveValue  = true;
        this.param3    .alwaysSaveValue  = true;

        this.param1.controls[0].epsilon  = ColorEpsilon;
        this.param2.controls[0].epsilon  = ColorEpsilon;
        this.param3.controls[0].epsilon  = ColorEpsilon;

        this.paramSpace.backStyleDark    =
        this.paramSpace.backStyleLight   = 'transparent';

        
        this.paramColor.showColorBack    = false;


        this.paramSpace.controls[0].delayUse = 100; // so that you carelessly drag it by grabbing the space param
                                                    // while already moving the mouse with an aim to drag
        this.paramSpace.input.outputMustBeCached = true;

        this.paramSpace.addEventListener('change', () => 
        {
            if (this.paramSpace.value.toNumber() == 0)
            {
                if (this.param1.output.connected) this.param1.output.connectedInputs.forEach(i => uiDisconnect(i));
                if (this.param2.output.connected) this.param2.output.connectedInputs.forEach(i => uiDisconnect(i));
                if (this.param3.output.connected) this.param3.output.connectedInputs.forEach(i => uiDisconnect(i));

                if (this.param1.input.connected) uiDisconnect(this.param1.input);
                if (this.param2.input.connected) uiDisconnect(this.param2.input);
                if (this.param3.input.connected) uiDisconnect(this.param3.input);
            }
        });


        this.param1.setValue(new NumberValue(roundTo(this._color[1] * rgbFactor[0], this.param1.controls[0].decimals)), false, true, false);
        this.param2.setValue(new NumberValue(roundTo(this._color[2] * rgbFactor[1], this.param2.controls[0].decimals)), false, true, false);
        this.param3.setValue(new NumberValue(roundTo(this._color[3] * rgbFactor[2], this.param3.controls[0].decimals)), false, true, false);

        this.param1.controls[0].setMin(0);
        this.param2.controls[0].setMin(0);
        this.param3.controls[0].setMin(0);

        this.param1.controls[0].setMax(255);
        this.param2.controls[0].setMax(255);
        this.param3.controls[0].setMax(255);


        this.paramSpace.controls[0].barTop = 0.8;

        this.paramSpace.controls[0].addEventListener('pointerenter', () => { this.header.over = true;  this.updateHeader(); });
        this.paramSpace.controls[0].addEventListener('pointerleave', () => { this.header.over = false; this.updateHeader(); });


        this.paramSpace.controls[0].wheelScale = 1;
        this.param1    .controls[0].wheelScale = 1;
        this.param2    .controls[0].wheelScale = 1;
        this.param3    .controls[0].wheelScale = 1;


        this.param1.isNodeValue = true;
        this.param2.isNodeValue = true;
        this.param3.isNodeValue = true;


        // hex is default, remove default sliders
        this.paramHolder.removeChild(this.param1.div);
        this.paramHolder.removeChild(this.param2.div);
        this.paramHolder.removeChild(this.param3.div);

        
        this.paramColor.addEventListener('change', () => 
        {
            this._color = this.paramColor.value.toDataColor();

            this.param1.setValue(new NumberValue(this._color[1] * rgbFactor[0]), false, true, false);
            this.param2.setValue(new NumberValue(this._color[2] * rgbFactor[1]), false, true, false);
            this.param3.setValue(new NumberValue(this._color[3] * rgbFactor[2]), false, true, false);
        });


        this.setAllParamDividers(0.45);


        this.getDescription = () => `defines a color value`;

        this.paramSpace .getDescription = () => `color space`;
        this.param1     .getDescription = () => `channel 1`;
        this.param2     .getDescription = () => `channel 2`;
        this.param3     .getDescription = () => `channel 3`;
    }



    input_getBackInitValue()
    {
        // 'this' is the input

        return this.node.paramColor.value;
    }



    output_backInit(value)
    {
        // 'this' is the output

        if (value.type == FILL_VALUE)
            value = value.color;


        consoleAssert(value.type == COLOR_VALUE, 'expected COLOR_VALUE in backInit()');

        const _color = convertDataColorToSpace(
            value.toDataColor(), 
            colorSpace(this.node.paramSpace.value.value));

        const _value = ColorValue.fromDataColor(_color);

        this.node.param1.setValue(_value.c1, false, true, false);
        this.node.param2.setValue(_value.c2, false, true, false);
        this.node.param3.setValue(_value.c3, false, true, false);
    }



    getDataColorFromParams()
    {
        const col = getNormalColor_(
            colorSpace(this.paramSpace.value),
            this.param1.value,
            this.param2.value,
            this.param3.value);
    
        return [
            colorSpace(this.paramSpace.value),
            col[0],
            col[1],
            col[2] ];
    }
    
    
    
    setColorParams(color, fireChangeEvent = false)
    {
        const col = getScaledDataColor(color);

        this.param1.setValue(new NumberValue(col[1]), fireChangeEvent);
        this.param2.setValue(new NumberValue(col[2]), fireChangeEvent);
        this.param3.setValue(new NumberValue(col[3]), fireChangeEvent);
    }



    getTabParams()
    {
        return this.paramSpace.value.value == 0
            ? [this.paramSpace, this.paramColor]
            : this.params;
    }



    isConnected()
    {
        return this.inputs[0].connected
            //   skipping [1]
            || this.inputs[2].connected
            || this.inputs[3].connected
            || this.inputs[4].connected;
    }



    paramCanBeUnknown(param)
    {
        return param.id != this.paramSpace.id;
    }



    output_genRequest(gen)
    {
        // 'this' is the output

        gen.scope.push({
            nodeId:  this.node.id, 
            paramId: NULL });


        const hasInputs =
               this.node.param1.input.connected
            || this.node.param2.input.connected
            || this.node.param3.input.connected;

        const options = (hasInputs ? 1 : 0) << 20;

                
        const [request, ignore] = this.node.genRequestStart(gen, options);
        if (ignore) return request;

        
        const input = this.node.inputs[0];


        request.push(input.connected ? 1 : 0);


        if (input.connected)
        {
            request.push(...pushInputOrParam(input, gen));
            

            const paramIds = [];

            paramIds.push(this.node.paramSpace.id);

            for (const param of this.node.params.filter(p => p.id != this.node.paramSpace.id))
                if (   param.input 
                    && param.input.connected)
                    paramIds.push(param.id);

            request.push(paramIds.join(','));
            
                                                  request.push(...this.node.paramSpace.genRequest(gen));
            if (this.node.param1.input.connected) request.push(...this.node.param1    .genRequest(gen));
            if (this.node.param2.input.connected) request.push(...this.node.param2    .genRequest(gen));
            if (this.node.param3.input.connected) request.push(...this.node.param3    .genRequest(gen));
        }
        else
        {
            if (this.node.paramSpace.value == 0) // hex
            {
                request.push(
                    ...this.node.paramSpace.genRequest(gen),
                    NUMBER_VALUE, this.node.prevSpace.isValid() ? numToString(colorSpaceIndex(this.node.prevSpace)) : NAN_DISPLAY,
                    NUMBER_VALUE, numToString(this.node._color[1] * rgbScale[0]),
                    NUMBER_VALUE, numToString(this.node._color[2] * rgbScale[1]),
                    NUMBER_VALUE, numToString(this.node._color[3] * rgbScale[2]));
            }
            else
            {
                request.push(
                    ...this.node.paramSpace.genRequest(gen),
                    NUMBER_VALUE, this.node.prevSpace != NAN_DISPLAY ? numToString(colorSpaceIndex(this.node.prevSpace)) : NAN_DISPLAY,
                    ...this.node.param1.genRequest(gen),
                    ...this.node.param2.genRequest(gen),
                    ...this.node.param3.genRequest(gen));
            }
        }


        gen.scope.pop();
        pushUnique(gen.passedNodes, this.node);

        return request;
    }



    updateValues(requestId, actionId, updateParamId, paramIds, values)
    {
        const convert = values[paramIds.findIndex(id => id == 'convert')];
        const space   = values[paramIds.findIndex(id => id == 'space'  )];
        const c1      = values[paramIds.findIndex(id => id == 'c1'     )];
        const c2      = values[paramIds.findIndex(id => id == 'c2'     )];
        const c3      = values[paramIds.findIndex(id => id == 'c3'     )];

        this.rgbaBack = rgb_a(values[paramIds.findIndex(id => id == 'value')].toRgb());


        if (   space 
            && space.isValid())
        {
            this.paramSpace.setValue(space, false, true, false);


            if (   convert.value != space.value
                || graphView.pastingNodes
                || graphView.loadingNodes
                || graphView.restoringNodes)
                switchToSpace(this, colorSpace(space.value));
            

            if (c1) this.param1.setValue(c1, false, true, false);
            if (c2) this.param2.setValue(c2, false, true, false);
            if (c3) this.param3.setValue(c3, false, true, false);


            const _space = this.paramSpace.value;
            const _c1    = this.param1    .value;
            const _c2    = this.param2    .value;
            const _c3    = this.param3    .value;

            const valid =
                   _space && _space.isValid()
                && _c1    && _c1   .isValid()
                && _c2    && _c2   .isValid()
                && _c3    && _c3   .isValid();


            if (valid)
            {
                this._color =
                    this.isUnknown()
                    ? dataColor_NaN
                    : makeDataColor(_space, _c1, _c2, _c3);

                this.prevSpace = colorSpace(_space.value);
            }
            else
            {
                this.paramColor.setValue(ColorValue.NaN(), false, true, false);

                this._color    = dataColor_NaN;
                this.prevSpace = NAN_DISPLAY;
            }
        }
        else if (space)
        {
            this.paramSpace.setValue(NumberValue.NaN(), false, true, false);
            removeParamDivs(this);

            this._color    = dataColor_NaN;
            this.prevSpace = NAN_DISPLAY;
        }


        this.param1.isNodeValue = this.headerInputs[0].connected;
        this.param2.isNodeValue = this.headerInputs[0].connected;
        this.param3.isNodeValue = this.headerInputs[0].connected;
    }



    updateNode()
    {
        if (!hasFocus(this.paramColor.controls[0]))
            this.paramColor.setValue(ColorValue.fromRgb(scaleRgb(dataColor2rgb(this._color))), false, true, false);


        const colors = this.getHeaderColors();

        const colSpaceBar = 
              !rgbIsNaN(colors.back)
            && isDark(colors.back)
            ? [1, 1, 1, 0.12]
            : [0, 0, 0, 0.09]; 


        this.paramSpace.setOptions(ColorSpaces.map(s => s[1]));
        this.paramSpace.controls[0].setMax(ColorSpaces.length-1);


        this.paramSpace.controls[0].backStyleLight  =
        this.paramSpace.controls[0].backStyleDark   = 'transparent';

        this.paramSpace.controls[0].valueStyleLight =
        this.paramSpace.controls[0].valueStyleDark  = rgba2style(colSpaceBar);

        this.paramSpace.controls[0].textStyleLight  =
        this.paramSpace.controls[0].textStyleDark   = rgba2style(colors.text);


        super.updateNode();
    }



    updateHeader()
    {
        super.updateHeader();

        const colors = this.getHeaderColors();
        
        updateColorHeader(this, colors);

        this.colorBack.style.height = defHeaderHeight + defParamHeight;
    }



    updateParams()
    {
        this.updateAllControlRanges();


        const enable = !this.inputs[0].connected;


        this.paramSpace.enableControlText(!this.paramSpace.input.connected);
        this.param1    .enableControlText(enable, (this.param1.isOnlyParamUnknown() /*|| headerConnectedUnknown*/) && !this.param1.input.connected);
        this.param2    .enableControlText(enable, (this.param2.isOnlyParamUnknown() /*|| headerConnectedUnknown*/) && !this.param2.input.connected);
        this.param3    .enableControlText(enable, (this.param3.isOnlyParamUnknown() /*|| headerConnectedUnknown*/) && !this.param3.input.connected);


        setEnabledTextStyle(this.paramColor.controls[0].div, !this.isConnected());


        const colors = this.getHeaderColors();

        this.paramSpace.controls[0].textbox.style.color      = rgba2style(colors.text);
        this.paramSpace.controls[0].textbox.style.background = 'transparent';


        this.updateParamControls();


        this.paramColor._warningOverlay.style.display = 'none';
    }



    resetAllControlRanges()
    {
        this.param1.controls[0].resetRanges();
        this.param2.controls[0].resetRanges();
        this.param3.controls[0].resetRanges();
    }



    updateAllControlRanges()
    {
        const space = 
            this.paramSpace.value.isValid()
                ? colorSpace(this.paramSpace.value.value)
                : NULL;

        if (   (   space == 'rgb'
                || space == 'lin'
                || space == 'hsv'
                || space == 'hsl')
            && !dataColorIsNaN  (this._color)
            && !dataColorIsValid(this._color))
        {
            this.showExtRanges(true);
        }
        else if (   (   space == 'p3'
                     || space == 'a98'
                     || space == 'pro'
                     || space == 'r2020'
                     || space == 'hclok'
                     || space == 'hclab'
                     || space == 'hcluv'
                     || space == 'oklab'
                     || space == 'lab'
                     || space == 'luv'
                     || space == 'xyz'
                     || space == 'xyz50'
                     || space == 'xyz65')
                 && !dataColorIsNaN(this._color))
        {
            this.showExtRanges(false);

            this.updateControlRanges(this.param1.controls[0], f =>
                dataColor2rgb([
                    this._color[0],
                    (this.param1.controls[0].minDisplay + f * (this.param1.controls[0].maxDisplay - this.param1.controls[0].minDisplay)) / colorSpaceFactor(this._color[0])[0],
                    this._color[2],
                    this._color[3]]));

            this.updateControlRanges(this.param2.controls[0], f =>
                dataColor2rgb([
                    this._color[0],
                    this._color[1],
                    (this.param2.controls[0].minDisplay + f * (this.param2.controls[0].maxDisplay - this.param2.controls[0].minDisplay)) / colorSpaceFactor(this._color[0])[1],
                    this._color[3]]));

            this.updateControlRanges(this.param3.controls[0], f =>
                dataColor2rgb([
                    this._color[0],
                    this._color[1],
                    this._color[2],
                    (this.param3.controls[0].minDisplay + f * (this.param3.controls[0].maxDisplay - this.param3.controls[0].minDisplay)) / colorSpaceFactor(this._color[0])[2]]));
        }
        else // no warning ranges
        {
            this.resetAllControlRanges();
            this.showExtRanges(false);
        }
    }



    showExtRanges(show)
    {
        this.param1.controls[0].showExtRanges = show;
        this.param2.controls[0].showExtRanges = show;
        this.param3.controls[0].showExtRanges = show;
    }



    updateControlRanges(control, getRgb)
    {
        const warnLineColor = getWarningRangeColor();


        const ranges    = [];
 
        
        const precision = 0.01;
        let   open      = false;

        for (let f = 0; f <= 1; f += precision)
        {
            const rgb = getRgb(f);

            if (!open && !rgbIsValid(rgb))
            {
                ranges.push(new NumberValueRange(f, f, warnLineColor, 0.8));
                open = true;
            }
            else if (open && rgbIsValid(rgb)) 
            {
                ranges.at(-1).end = f;
                open = false;
            }
        }

        
        if (open)
            ranges.at(-1).end = 1;
        else if (!open
              && isEmpty(ranges))
            control.resetRanges();


        control.ranges = ranges;
    }



    // getInputWireColor()
    // {
    //     if (!dataColorIsNaN(this._color))
    //         return dataColor2rgb(this._color);
    //     else
    //         return super.getInputWireColor();
    // }



    // getOutputWireColor()
    // {
    //     if (!dataColorIsNaN(this._color))
    //         return dataColor2rgb(this._color);
    //     else
    //         return super.getOutputWireColor();
    // }



    paramIsConsideredDefault(param)
    {
        return super.paramIsConsideredDefault(param)
            && !this.inputs[0].connected
            && (  !this.paramSpace.input.connected
                || this.paramSpace.value == 0);
    }



    toJsonBase(nTab = 0) 
    {
        let   pos = ' '.repeat(nTab);
        const tab = HTAB;

        let json = super.toJsonBase(nTab);

        json += ',\n' + pos + tab + '"prevSpace": "' + this.prevSpace + '"';

        if (!dataColorIsNaN(this._colorBeforeNaN))
            json += ',\n' + pos + tab + '"colorBeforeNaN":\n' + dataColorToJson(this._colorBeforeNaN, 4);

        return json;
    }



    paramsToJson(nTab = 0) 
    {
        let   pos = ' '.repeat(nTab);
        const tab = HTAB;


        let json =
             ',\n'
            + pos + tab + '"params":\n'
            + pos + tab + '[\n';
        

        let first = true;
        for (let i = 0; i < this.params.length-1; i++) // -1 is for paramColor
        {
            const param = this.params[i];

            if (!this.paramIsConsideredDefault(param))
            {
                if (!first) json += ',\n'; first = false;

                json += 
                      pos + tab + tab 
                    + param.toJson(nTab, i > 0 ? 'c' + i : '');
            }
        }


        if (!first)
            json += '\n';

        json += pos + tab + ']';


        return json;
    }



    loadParams(_node, pasting)
    {
        super.loadParams(_node, pasting);


        if (_node.colorBeforeNaN)
            this._colorBeforeNaN = _node.colorBeforeNaN;

        this.prevSpace = _node.prevSpace;    


        if (this.paramSpace.value.isValid())
        {
            const space  = colorSpace(Math.max(1, this.paramSpace.value.value));
            const factor = colorFactor(space);

            this._color = [
                space,
                this.param1.value.value / factor[0],
                this.param2.value.value / factor[1],
                this.param3.value.value / factor[2]];
        }
        else
            this._color = dataColor_NaN;
    }



    restoreParamUndoValue(value)
    {
        if (value.paramId == 'color')
        {
            super.restoreParamUndoValue({paramId: 'space', value: value.value.space});
            super.restoreParamUndoValue({paramId: 'c1',    value: value.value.c1   });
            super.restoreParamUndoValue({paramId: 'c2',    value: value.value.c2   });
            super.restoreParamUndoValue({paramId: 'c3',    value: value.value.c3   });
        }
        else
            super.restoreParamUndoValue(value);
    }
}



function getColorInputValuesForUndo(input)
{
    return [{
        paramId: 'color', 
        value:    ColorValue.fromDataColor(input.node._color)
    }];
}



function getColorOutputValuesForUndo(output)
{
    return [{
        paramId: 'color', 
        value:   ColorValue.fromDataColor(output.node._color)
    }];
}



function updateColorHeader(node, colors)
{
    node.header.style.background = 'transparent';

    
    const unknownBackStyle = darkMode ? '#444' : '#ccc';


    node.colorBack.style.background = 
        node.isUnknown()
        ? unknownBackStyle
        : !rgbIsNaN(colors.colorBack)
          ? rgba2style(colors.colorBack)
          : rgba2style(rgb_a(rgbDocumentBody, 0.95));

    node.colorBack.style.backgroundImage = 
        node.isUnknown()
        ? 'url(\'data:image/svg+xml;utf8,<svg width="45" height="65" viewBox="0 0 9 13" fill="none" xmlns="http://www.w3.org/2000/svg"><path opacity="0.1" d="M3.04545 8.51136V8.31818C3.04924 7.6553 3.10795 7.12689 3.22159 6.73295C3.33902 6.33902 3.50947 6.02083 3.73295 5.77841C3.95644 5.53598 4.22538 5.31629 4.53977 5.11932C4.77462 4.9678 4.98485 4.81061 5.17045 4.64773C5.35606 4.48485 5.50379 4.30492 5.61364 4.10795C5.72349 3.9072 5.77841 3.68371 5.77841 3.4375C5.77841 3.17614 5.71591 2.94697 5.59091 2.75C5.46591 2.55303 5.29735 2.40151 5.08523 2.29545C4.87689 2.18939 4.64583 2.13636 4.39205 2.13636C4.14583 2.13636 3.91288 2.19129 3.69318 2.30114C3.47348 2.4072 3.29356 2.56629 3.15341 2.77841C3.01326 2.98674 2.9375 3.24621 2.92614 3.55682H0.607955C0.626894 2.79924 0.808712 2.17424 1.15341 1.68182C1.49811 1.18561 1.95455 0.816288 2.52273 0.573863C3.09091 0.327651 3.7178 0.204545 4.40341 0.204545C5.1572 0.204545 5.82386 0.329545 6.40341 0.579545C6.98295 0.825757 7.4375 1.18371 7.76705 1.65341C8.09659 2.12311 8.26136 2.68939 8.26136 3.35227C8.26136 3.79545 8.1875 4.18939 8.03977 4.53409C7.89583 4.875 7.69318 5.17803 7.43182 5.44318C7.17045 5.70455 6.86174 5.94129 6.50568 6.15341C6.20644 6.33144 5.96023 6.51705 5.76705 6.71023C5.57765 6.90341 5.43561 7.12689 5.34091 7.38068C5.25 7.63447 5.20265 7.94697 5.19886 8.31818V8.51136H3.04545ZM4.17045 12.1477C3.79167 12.1477 3.4678 12.0152 3.19886 11.75C2.93371 11.4811 2.80303 11.1591 2.80682 10.7841C2.80303 10.4129 2.93371 10.0947 3.19886 9.82955C3.4678 9.56439 3.79167 9.43182 4.17045 9.43182C4.5303 9.43182 4.84659 9.56439 5.11932 9.82955C5.39205 10.0947 5.5303 10.4129 5.53409 10.7841C5.5303 11.0341 5.46402 11.2633 5.33523 11.4716C5.21023 11.6761 5.04545 11.8409 4.84091 11.9659C4.63636 12.0871 4.41288 12.1477 4.17045 12.1477Z" fill="' + (darkMode ? 'white' : 'black') + '"/></svg>\')'
        : 'none';

    node.colorBack.style.height = node.measureData.headerOffset.height;

    node.colorBack.style.backgroundPosition = '50% 50%';
    node.colorBack.style.backgroundRepeat   = 'no-repeat';


    node.label.style.color = rgba2style(colors.text);

     
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
            ? 'transparent' 
            :  rgba2style(colWarning);

            
        node.updateWarningOverlay();
        node.updateWarningOverlayStyle(colors.back, defHeaderHeight + defParamHeight);
    }
}