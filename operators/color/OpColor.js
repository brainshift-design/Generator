class   OpColor
extends OpColorBase
{
    paramSpace;
    param1;
    param2;
    param3;
    paramColor;

    colorBack;


    //hexbox;

    
    prevSpace;
    prevSpaceConnections = [];


    _colorBeforeNaN = dataColor_NaN;



    constructor(options = {})
    {
        super(COLOR, 'color');


        const defColor = ['hex', 0.788, 0.788, 0.788];

        this._color = 
            !!options.random
            ? ['hex', Math.random(), Math.random(), Math.random()]
            : [...defColor];
        
        this.prevSpace =  'hex';


        this.colorBack = createDiv('colorBack');
        this.inner.appendChild(this.colorBack);


        this.addInput(new Input(COLOR_TYPES, this.input_getValuesForUndo));
        this.addOutput(new Output(COLOR, this.output_genRequest));

        
        this.addParam(this.paramSpace = new SelectParam('space', '', false, true,  true,  OpColorSpaces.map(s => s[1]), 0));
        this.addParam(this.param1     = new NumberParam('c1',    '', true,  true,  true,  Math.round(defColor[1] * rgbFactor[0])));
        this.addParam(this.param2     = new NumberParam('c2',    '', true,  true,  true,  Math.round(defColor[2] * rgbFactor[1])));
        this.addParam(this.param3     = new NumberParam('c3',    '', true,  true,  true,  Math.round(defColor[3] * rgbFactor[2])));
        this.addParam(this.paramColor = new ColorParam ('color', '', false, false, false, ColorValue.fromRgb(scaleRgb(dataColor2rgb(this._color)))));

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



    input_getValuesForUndo()
    {
        return [ 
            [this.node.param1.id, 
             this.node.param1.value],

            [this.node.param2.id, 
             this.node.param2.value],

            [this.node.param3.id, 
             this.node.param3.value]];
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


        this.paramSpace.setValue(space, false, true, false);
        switchToSpace(this, colorSpace(space.value));


        this.param1.setValue(c1, false, true, false);
        this.param2.setValue(c2, false, true, false);
        this.param3.setValue(c3, false, true, false);


        const valid =
               space.isValid()
            && c1   .isValid()
            && c2   .isValid()
            && c3   .isValid();

            
        if (!valid)
            this.paramColor.setValue(ColorValue.NaN, false, true, false);


        this._color = 
            valid
            ? makeDataColor(space, c1, c2, c3)
            : dataColor_NaN;


        this.prevSpace = colorSpace(space.value);


        super.updateValues(updateParamId, paramIds, values);
    }



    updateNode()
    {
        //console.log(this.id + '.OpColor.updateNode()');
        
        super.updateNode();


        if (!hasFocus(this.paramColor.control))
            this.paramColor.setValue(ColorValue.fromRgb(scaleRgb(dataColor2rgb(this._color))), false, true, false);// = 
        

        const colors = this.getHeaderColors();

        const colSpaceBar = 
                isDark(colors.back)
            && !rgbIsNaN(colors.back)
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


        this.paramSpace.updateControls();
    }



    updateHeader()
    {
        //console.log(this.id + '.OpColor.updateHeader()');

        super.updateHeader();

        
        this.header.style.background = 'transparent';
    
        const colors = this.getHeaderColors();

        
        this.colorBack.style.background = 
            !rgbIsNaN(colors.back)
            ? rgb2style(colors.back)
            : rgba2style(rgb_a(rgbDocumentBody, 0.95));

        this.label.style.color = rgb2style(colors.text);
        
        this.inputs[0] .colorLight =
        this.inputs[0] .colorDark  = colors.input;

        this.outputs[0].colorLight =
        this.outputs[0].colorDark  = colors.output; 


        const colWarning = 
            isDark(colors.back)
            ? [1, 1, 1, 0.2 ]
            : [0, 0, 0, 0.12]; 

        this.warningStyle = 
            rgbIsValid(colors.back) 
            ? 'transparent' 
            : rgba2style(colWarning);


        this.updateWarningOverlay();
        this.updateWarningOverlayStyle(colors.back, 45);
    }



    updateParams()
    {
        this.updateAllControlRanges();

        this.param1.updateControls();
        this.param2.updateControls();
        this.param3.updateControls();

        this.param1.enableControlText(!this.inputs[0].connected);
        this.param2.enableControlText(!this.inputs[0].connected);
        this.param3.enableControlText(!this.inputs[0].connected);

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
                    (this.param1.control.displayMin + f * (this.param1.control.displayMax - this.param1.control.displayMin)) / getColorSpaceFactor(this._color[0])[0],
                    this._color[2],
                    this._color[3]]));

            this.updateControlRanges(this.param2.control, f =>
                dataColor2rgb([
                    this._color[0],
                    this._color[1],
                    (this.param2.control.displayMin + f * (this.param2.control.displayMax - this.param2.control.displayMin)) / getColorSpaceFactor(this._color[0])[1],
                    this._color[3]]));

            this.updateControlRanges(this.param3.control, f =>
                dataColor2rgb([
                    this._color[0],
                    this._color[1],
                    this._color[2],
                    (this.param3.control.displayMin + f * (this.param3.control.displayMax - this.param3.control.displayMin)) / getColorSpaceFactor(this._color[0])[2]]));
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
              && ranges.length == 0)
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
        if (_node.colorBeforeNaN)
            this._colorBeforeNaN = _node.colorBeforeNaN;

        this.prevSpace = _node.prevSpace;


        super.loadParams(_node);


        const space  = colorSpace(Math.max(1, this.paramSpace.value.value));
        const factor = colorFactor(space);

        this._color = [
            space,
            this.param1.value.value / factor[0],
            this.param2.value.value / factor[1],
            this.param3.value.value / factor[2]];
    }
}