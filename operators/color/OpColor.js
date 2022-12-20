class   OpColor
extends OpColorBase
{
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
        super(COLOR, 'color');


        const defColor = ['hex', 0.85, 0.85, 0.85];

        this._color = 
            !!options.random
            ? ['hex', Math.random(), Math.random(), Math.random()]
            : [...defColor];
        
        this.prevSpace =  'hex';


        this.colorBack = createDiv('colorBack');
        this.inner.appendChild(this.colorBack);


        this.addInput(new Input(COLOR_TYPES, this.input_getValuesForUndo));
        this.addOutput(new Output([COLOR], this.output_genRequest));

        
        this.addParam(this.paramSpace = new SelectParam('space', 'space', false, true,  true,  OpColorSpaces.map(s => s[1]), 0));
        this.addParam(this.param1     = new NumberParam('c1',    '',      true,  true,  true,  Math.round(defColor[1] * rgbFactor[0])));
        this.addParam(this.param2     = new NumberParam('c2',    '',      true,  true,  true,  Math.round(defColor[2] * rgbFactor[1])));
        this.addParam(this.param3     = new NumberParam('c3',    '',      true,  true,  true,  Math.round(defColor[3] * rgbFactor[2])));
        this.addParam(this.paramColor = new ColorParam ('color', '',      false, false, false, ColorValue.fromRgb(scaleRgb(dataColor2rgb(this._color)))));

        this.paramSpace.input.outputMustBeCached = true;

        this.param1.setValue(new NumberValue(Math.round(this._color[1] * rgbFactor[0])), false, true, false);
        this.param2.setValue(new NumberValue(Math.round(this._color[2] * rgbFactor[1])), false, true, false);
        this.param3.setValue(new NumberValue(Math.round(this._color[3] * rgbFactor[2])), false, true, false);


        this.paramSpace.control.barTop = 0.8;

        this.paramSpace.control.wheelScale = 1;
        this.param1    .control.wheelScale = 1;
        this.param2    .control.wheelScale = 1;
        this.param3    .control.wheelScale = 1;


        this.paramSpace.control.addEventListener('pointerenter', () => { this.header.over = true;  this.updateHeader(); });
        this.paramSpace.control.addEventListener('pointerleave', () => { this.header.over = false; this.updateHeader(); });


        // hex is default, remove default sliders
        this.inner.removeChild(this.param1.div);
        this.inner.removeChild(this.param2.div);
        this.inner.removeChild(this.param3.div);

        
        this.paramColor.control.showColor = false;

        this.paramColor.addEventListener('change', () => 
        {
            this._color = this.paramColor.value.toDataColor();

            this.param1.setValue(new NumberValue(this._color[1] * rgbFactor[0]), false, true, false);
            this.param2.setValue(new NumberValue(this._color[2] * rgbFactor[1]), false, true, false);
            this.param3.setValue(new NumberValue(this._color[3] * rgbFactor[2]), false, true, false);
        });
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



    isConnected()
    {
        return this.inputs[0].connected
            //   skipping [1]
            || this.inputs[2].connected
            || this.inputs[3].connected
            || this.inputs[4].connected;
    }



    output_genRequest(gen)
    {
        // 'this' is the output

        gen.scope.push({
            nodeId:  this.node.id, 
            paramId: '' });

        const [request, ignore] = this.node.genRequestStart(gen);
        if (ignore) return request;

        
        const paramIds = [];

        const input = this.node.inputs[0];


        request.push(input.connected ? 1 : 0);


        if (input.connected)
        {
            request.push(...pushInputOrParam(input, gen));
            
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
                    NUMBER_VALUE, numToString(colorSpaceIndex(this.node.prevSpace)),
                    NUMBER_VALUE, numToString(this.node._color[1] * rgbScale[0]),
                    NUMBER_VALUE, numToString(this.node._color[2] * rgbScale[1]),
                    NUMBER_VALUE, numToString(this.node._color[3] * rgbScale[2]));
            }
            else
            {
                request.push(
                    ...this.node.paramSpace.genRequest(gen),
                    NUMBER_VALUE, numToString(colorSpaceIndex(this.node.prevSpace)), 
                    ...this.node.param1.genRequest(gen),
                    ...this.node.param2.genRequest(gen),
                    ...this.node.param3.genRequest(gen));
            }
        }


        gen.scope.pop();
        pushUnique(gen.passedNodes, this.node);

        return request;
    }



    updateValues(updateParamId, paramIds, values)
    {
        const space = values[paramIds.findIndex(id => id == 'space')];
        const c1    = values[paramIds.findIndex(id => id == 'c1'   )];
        const c2    = values[paramIds.findIndex(id => id == 'c2'   )];
        const c3    = values[paramIds.findIndex(id => id == 'c3'   )];

        if (space) this.paramSpace.setValue(space, false, true, false);

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
            const unknown = 
                   this.isConnectedUncached()
                && this.hasMultipliedOutputs();

            this._color =
                unknown
                ? dataColor_NaN
                : makeDataColor(_space, _c1, _c2, _c3);

            this.outputs[0].wireColor = 
                unknown
                ? rgbHeaderFromType(CACHE, true)
                : dataColor2rgb(this._color);


            this.prevSpace = colorSpace(_space.value);
        }
        else
        {
            this.paramColor.setValue(ColorValue.NaN, false, true, false);

            this._color    = dataColor_NaN;
            this.prevSpace = NumberValue.NaN;

            this.outputs[0].wireColor = rgb_NaN;
        }
    }



    updateNode()
    {
        //console.log(this.id + '.OpColor.updateNode()');
        
        if (!hasFocus(this.paramColor.control))
            this.paramColor.setValue(ColorValue.fromRgb(scaleRgb(dataColor2rgb(this._color))), false, true, false);// = 
        

        const colors = this.getHeaderColors();

        const colSpaceBar = 
              !rgbIsNaN(colors.back)
            && isDark(colors.back)
            ? [1, 1, 1, 0.12]
            : [0, 0, 0, 0.09]; 


        this.paramSpace.control.setMax(colorSpaceCount()-1);


        this.paramSpace.control. backStyleLight =
        this.paramSpace.control. backStyleDark  = 'transparent';

        this.paramSpace.control.valueStyleLight =
        this.paramSpace.control.valueStyleDark  = rgba2style(colSpaceBar);

        this.paramSpace.control. textStyleLight =
        this.paramSpace.control. textStyleDark  = rgba2style(colors.text);


        this.paramSpace.input .colorLight =
        this.paramSpace.input .colorDark  = colors.input;

        this.paramSpace.output.colorLight =
        this.paramSpace.output.colorDark  = colors.output;


        //this.paramSpace.updateControls();


        super.updateNode();
    }



    updateHeader()
    {
        //console.log(this.id + '.OpColor.updateHeader()');

        super.updateHeader();

        
        this.header.style.background = 'transparent';

        
        const colors = this.getHeaderColors();


        const unknown = 
               this.isConnectedUncached()
            && this.hasMultipliedOutputs();

        const unknownBackStyle = isDarkMode() ? '#444' : '#ccc';


        this.colorBack.style.background = 
            unknown
            ? unknownBackStyle
            : !rgbIsNaN(colors.back)
            ? rgba2style(colors.back)
            : rgba2style(rgb_a(rgbDocumentBody, 0.95));

        this.colorBack.style.backgroundImage = 
            unknown
            ? 'url(\'data:image/svg+xml;utf8,<svg width="45" height="65" viewBox="0 0 9 13" fill="none" xmlns="http://www.w3.org/2000/svg"><path opacity="0.1" d="M3.04545 8.51136V8.31818C3.04924 7.6553 3.10795 7.12689 3.22159 6.73295C3.33902 6.33902 3.50947 6.02083 3.73295 5.77841C3.95644 5.53598 4.22538 5.31629 4.53977 5.11932C4.77462 4.9678 4.98485 4.81061 5.17045 4.64773C5.35606 4.48485 5.50379 4.30492 5.61364 4.10795C5.72349 3.9072 5.77841 3.68371 5.77841 3.4375C5.77841 3.17614 5.71591 2.94697 5.59091 2.75C5.46591 2.55303 5.29735 2.40151 5.08523 2.29545C4.87689 2.18939 4.64583 2.13636 4.39205 2.13636C4.14583 2.13636 3.91288 2.19129 3.69318 2.30114C3.47348 2.4072 3.29356 2.56629 3.15341 2.77841C3.01326 2.98674 2.9375 3.24621 2.92614 3.55682H0.607955C0.626894 2.79924 0.808712 2.17424 1.15341 1.68182C1.49811 1.18561 1.95455 0.816288 2.52273 0.573863C3.09091 0.327651 3.7178 0.204545 4.40341 0.204545C5.1572 0.204545 5.82386 0.329545 6.40341 0.579545C6.98295 0.825757 7.4375 1.18371 7.76705 1.65341C8.09659 2.12311 8.26136 2.68939 8.26136 3.35227C8.26136 3.79545 8.1875 4.18939 8.03977 4.53409C7.89583 4.875 7.69318 5.17803 7.43182 5.44318C7.17045 5.70455 6.86174 5.94129 6.50568 6.15341C6.20644 6.33144 5.96023 6.51705 5.76705 6.71023C5.57765 6.90341 5.43561 7.12689 5.34091 7.38068C5.25 7.63447 5.20265 7.94697 5.19886 8.31818V8.51136H3.04545ZM4.17045 12.1477C3.79167 12.1477 3.4678 12.0152 3.19886 11.75C2.93371 11.4811 2.80303 11.1591 2.80682 10.7841C2.80303 10.4129 2.93371 10.0947 3.19886 9.82955C3.4678 9.56439 3.79167 9.43182 4.17045 9.43182C4.5303 9.43182 4.84659 9.56439 5.11932 9.82955C5.39205 10.0947 5.5303 10.4129 5.53409 10.7841C5.5303 11.0341 5.46402 11.2633 5.33523 11.4716C5.21023 11.6761 5.04545 11.8409 4.84091 11.9659C4.63636 12.0871 4.41288 12.1477 4.17045 12.1477Z" fill="' + (isDarkMode() ? 'white' : 'black') + '"/></svg>\')'
            : 'none';

        this.colorBack.style.backgroundPosition = '50% 50%';
        this.colorBack.style.backgroundRepeat   = 'no-repeat';


        this.label.style.color     = rgb2style(colors.text);
        
        this. inputs[0].colorLight =
        this. inputs[0].colorDark  = colors.input;

        this.outputs[0].colorLight =
        this.outputs[0].colorDark  = colors.output; 


        if (unknown)
            this._warningOverlay.style.display = 'none';

        else
        {
            const colWarning = 
                isDark(colors.back)
                ? [1, 1, 1, 0.2 ]
                : [0, 0, 0, 0.12];

            this.warningStyle = 
                rgbIsValid(colors.back) 
                ? 'transparent' 
                :  rgba2style(colWarning);

                
            this.updateWarningOverlay();
            this.updateWarningOverlayStyle(colors.back, 45);
        }
    }



    updateParams()
    {
        this.updateAllControlRanges();


        const enable = !this.inputs[0].connected;

        this.paramSpace.enableControlText(!this.paramSpace.input.connected);
        this.param1    .enableControlText(enable);
        this.param2    .enableControlText(enable);
        this.param3    .enableControlText(enable);


        enableElementText(this.paramColor.control, !this.isConnected());


        super.updateParams();
    }



    resetAllControlRanges()
    {
        resetControlRanges(this.param1.control);
        resetControlRanges(this.param2.control);
        resetControlRanges(this.param3.control);
    }



    getWarnLineStyle()
    {
        return isDarkMode()
            ? 'rgba(255, 96, 96, 0.5)'
            : 'rgba(255, 0, 0, 0.16)';
    }



    updateAllControlRanges()
    {
        const warnLineStyle = this.getWarnLineStyle();

        const space = this.paramSpace.value.value;

        if (    space == 1
            && !dataColorIsNaN  (this._color)
            && !dataColorIsValid(this._color)) // RGB warning ranges
        {
            const rangesR = [];
            if (this._color[1] < 0) rangesR.push(new NumberControlRange(0, Math.min(-this._color[1], 1), warnLineStyle, 0.8));
            if (this._color[1] > 1) rangesR.push(new NumberControlRange(2-Math.min(this._color[1], 2), 1, warnLineStyle, 0.8));
            this.param1.control.ranges = rangesR;

            const rangesG = [];
            if (this._color[2] < 0) rangesG.push(new NumberControlRange(0, Math.min(-this._color[2], 1), warnLineStyle, 0.8));
            if (this._color[2] > 1) rangesG.push(new NumberControlRange(2-Math.min(this._color[2], 2), 1, warnLineStyle, 0.8));
            this.param2.control.ranges = rangesG;
            
            const rangesB = [];
            if (this._color[3] < 0) rangesB.push(new NumberControlRange(0, Math.min(-this._color[3], 1), warnLineStyle, 0.8));
            if (this._color[3] > 1) rangesB.push(new NumberControlRange(2-Math.min(this._color[3], 2), 1, warnLineStyle, 0.8));
            this.param3.control.ranges = rangesB;
        }
        else if ((   space == 2  // HSV
                  || space == 3) // HSL
              && !dataColorIsNaN  (this._color)
              && !dataColorIsValid(this._color))
        {
            const rangesS = [];
            if (this._color[2] < 0) rangesS.push(new NumberControlRange(0, Math.min(-this._color[2], 1), warnLineStyle, 0.8));
            if (this._color[2] > 1) rangesS.push(new NumberControlRange(2-Math.min(this._color[2], 2), 1, warnLineStyle, 0.8));
            this.param2.control.ranges = rangesS;
            
            const rangesVL = [];
            if (this._color[3] < 0) rangesVL.push(new NumberControlRange(0, Math.min(-this._color[3], 1), warnLineStyle, 0.8));
            if (this._color[3] > 1) rangesVL.push(new NumberControlRange(2-Math.min(this._color[3], 2), 1, warnLineStyle, 0.8));
            this.param3.control.ranges = rangesVL;
        }
        else if ( space > 3 // HCL
              && !dataColorIsNaN(this._color))
        {
            this.updateControlRanges(this.param1.control, f =>
                dataColor2rgb([
                    this._color[0],
                    (this.param1.control.displayMin + f * (this.param1.control.displayMax - this.param1.control.displayMin)) / colorSpaceFactor(this._color[0])[0],
                    this._color[2],
                    this._color[3]]));

            this.updateControlRanges(this.param2.control, f =>
                dataColor2rgb([
                    this._color[0],
                    this._color[1],
                    (this.param2.control.displayMin + f * (this.param2.control.displayMax - this.param2.control.displayMin)) / colorSpaceFactor(this._color[0])[1],
                    this._color[3]]));

            this.updateControlRanges(this.param3.control, f =>
                dataColor2rgb([
                    this._color[0],
                    this._color[1],
                    this._color[2],
                    (this.param3.control.displayMin + f * (this.param3.control.displayMax - this.param3.control.displayMin)) / colorSpaceFactor(this._color[0])[2]]));
        }
        else // no warning ranges
        {
            this.resetAllControlRanges();
        }
    }



    updateControlRanges(control, getRgb)
    {
        const warnLineStyle = this.getWarnLineStyle();


        const ranges    = [];
 
        
        const precision = 0.01;
        let   open      = false;

        for (let f = 0; f <= 1; f += precision)
        {
            const rgb = getRgb(f);

            if (!open && !rgbIsValid(rgb))
            {
                ranges.push(new NumberControlRange(f, f, warnLineStyle, 0.8));
                open = true;
            }
            else if (open && rgbIsValid(rgb)) 
            {
                ranges[ranges.length-1].end = f;
                open = false;
            }
        }

        
        if (open)
            lastOf(ranges).end = 1;
        else if (!open
              && isEmpty(ranges))
            resetControlRanges(control);


        control.ranges = ranges;
    }



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
        const tab = TAB;

        let json = super.toJsonBase(nTab);

        json += ',\n' + pos + tab + '"prevSpace": "' + this.prevSpace + '"';

        if (!dataColorIsNaN(this._colorBeforeNaN))
            json += ',\n' + pos + tab + '"colorBeforeNaN":\n' + dataColorToJson(this._colorBeforeNaN, 4);

        return json;
    }



    paramsToJson(nTab = 0) 
    {
        let   pos = ' '.repeat(nTab);
        const tab = TAB;


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



    loadParams(_node)
    {
        super.loadParams(_node);


        if (_node.colorBeforeNaN)
            this._colorBeforeNaN = _node.colorBeforeNaN;

        this.prevSpace = _node.prevSpace;    


        const space  = colorSpace(Math.max(1, this.paramSpace.value.value));
        const factor = colorFactor(space);

        this._color = [
            space,
            this.param1.value.value / factor[0],
            this.param2.value.value / factor[1],
            this.param3.value.value / factor[2]];
    }
}