class   OpColor
extends OpColorBase
{
    paramSpace;
    
    param1;
    param2;
    param3;

    #colorBack;


    hexbox;

    
    prevSpace;
    prevSpaceConnections = [];


    _colorBeforeNaN = dataColor_NaN;



    #init = false;
    


    constructor()
    {
        super(COLOR, 'color');


        this._color    = ['hex', 0.5, 0.5, 0.5];
        this.prevSpace =  'hex';


        this.#colorBack = createDiv('colorBack');
        this.inner.appendChild(this.#colorBack);


        this.addInput(new Input(COLOR_TYPES));
        this.addOutput(new Output(COLOR, this.output_genRequest));


        this.inputs[0].addEventListener('connect', () =>
        {
            for (let i = 1; i < this.params.length; i++)
                enableSliderText(this.params[i].control, false);
        });
    
        this.inputs[0].addEventListener('disconnect', () =>
        {
            for (let i = 1; i < this.params.length; i++)
            {
                if (!this.params[i].input.connected) 
                    enableSliderText(this.params[i].control, true);
            }

            this.updateNode();
        });

        
        this.addParam(this.paramSpace = new SelectParam('space', 'space', false, true, true, OpColorSpaces.map(s => s[1]), 0));
        this.addParam(this.param1     = new NumberParam('c1',    '',      true,  true, true, Math.round(this._color[1] * rgbFactor[0])));
        this.addParam(this.param2     = new NumberParam('c2',    '',      true,  true, true, Math.round(this._color[2] * rgbFactor[1])));
        this.addParam(this.param3     = new NumberParam('c3',    '',      true,  true, true, Math.round(this._color[3] * rgbFactor[2])));

        
        this.paramSpace.control.barTop = 0.8;

        this.paramSpace.control.wheelScale = 1;
        this.param1    .control.wheelScale = 1;
        this.param2    .control.wheelScale = 1;
        this.param3    .control.wheelScale = 1;


        this.paramSpace.control.addEventListener('pointerenter', () => { this.header.over = true;  this.updateHeader(); });
        this.paramSpace.control.addEventListener('pointerleave', () => { this.header.over = false; this.updateHeader(); });


        //this.paramSpace.addEventListener('beforechange', () => { this.fromSpace = this.paramSpace.oldValue; });


        initHexbox(this);


        for (let i = 1; i < this.params.length; i++)
            this.params[i].input.addEventListener('disconnect', () => { enableSliderText(this.params[i].control, !this.inputs[0].connected); });
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
        const col = getDataColor(color);

        this.param1.setValue(col[1], fireChangeEvent);
        this.param2.setValue(col[2], fireChangeEvent);
        this.param3.setValue(col[3], fireChangeEvent);
    }



    isConnected()
    {
        return this.inputs[0].connected
            || this.inputs[2].connected
            || this.inputs[3].connected
            || this.inputs[4].connected;
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
                if (param.input && param.input.connected) 
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
        const col   = values[paramIds.findIndex(id => id == 'value')];
        const space = values[paramIds.findIndex(id => id == 'space')];
        

        this.paramSpace.setValue(space, false, true, false);
        switchToSpace(this, colorSpace(space.value));

        
        if (col.isValid())
        {
            this.param1.setValue(col.c1, false, true, false);
            this.param2.setValue(col.c2, false, true, false);
            this.param3.setValue(col.c3, false, true, false);

            this._color = col.toDataColor();
        }
        else
        {
            this.param1.setValue(GNumberValue.NaN, false, true, false);
            this.param2.setValue(GNumberValue.NaN, false, true, false);
            this.param3.setValue(GNumberValue.NaN, false, true, false);
            
            this._color = dataColor_NaN;
        }


        this.prevSpace = colorSpace(space.value);


        super.updateValues(updateParamId, paramIds, values);
    }



    updateNode()
    {
        //console.log(this.id + '.OpColor.updateNode()');

        
        enableElementText(this.hexbox, !this.isConnected());


        if (!hasFocus(this.hexbox))
        {
            const colBack = dataColor2rgb(this._color);

            this.hexbox.value = 
                isValidRgb(colBack)
                ? rgb2hex(colBack)
                : DISPLAY_INVALID;
        }

        
        this.hexbox.style.color = 
            isDarkMode()
            ? '#eee'
            : 'black';


        super.updateNode();
    }



    updateHeader()
    {
        //console.log(this.id + '.OpColor.updateHeader()');

        super.updateHeader();
        

        this.header.style.background = 'transparent';
    
    
        const colors = this.getHeaderColors();

        this.#colorBack.style.background = 
            this.canShowColor()
            ? colorStyleRgb(colors.back)
            : isDarkMode()
              ? '#888088ee'
              : '#ead8eaee';


        const colSpaceBar = 
            colors.darkText 
            ? [0, 0, 0, isValidRgb(colors.back) ? (this.header.over ? 3 : 1) * 0.03 : 0.12] 
            : [1, 1, 1, isValidRgb(colors.back) ? (this.header.over ? 3 : 1) * 0.05 : 0.24];

        this.paramSpace.control.backColor  = 'transparent';
        this.paramSpace.control.valueColor = colorStyleRgba(colSpaceBar);
        this.paramSpace.control.textColorLight =
        this.paramSpace.control.textColorDark = colors.textStyle;
        this.paramSpace.input .color       = colors.input;
        this.paramSpace.output.color       = colors.output;
        this.paramSpace.updateControls();

        const colWarning = 
            colors.darkText 
            ? [0, 0, 0, 0.12] 
            : [1, 1, 1, 0.2 ];

        this.warningStyle = colorStyleRgba(colWarning);


        this.updateWarningOverlay();
        this.updateWarningOverlayStyle(colors.back, 45);
    }



    updateParamControls()
    {
        const colors = this.getHeaderColors();

        this.updateAllSliderRanges();

        const isValid = 
               colorSpaceIndex(this._color[0]) > 3
            || isValidRgb(colors.back);

        this.updateSlider(this.param1.control, isValid);
        this.updateSlider(this.param2.control, isValid);
        this.updateSlider(this.param3.control, isValid);
    }



    updateSlider(slider, isValid)
    {
        // slider.valueText = 
        //        this.inputs[0].connected 
        //     // && this.inputs[0].data.color[0] != this._color[0]
        //     && !isValid 
        //     ? DISPLAY_INVALID
        //     : '';

        // if (    this.inputs[0].connected
        //     && !isValid)
        //     slider.setValue(Number.NaN, true, false, false);

        enableElementText(slider.textbox, !this.inputs[0].connected);

        slider.update();
    }



    getHeaderColor() 
    {
        return dataColor2rgb(this._color); 
    }



    canShowColor()
    {
        return isValidDataColor(this._color);
    }



    resetAllControlRanges()
    {
        resetSliderRanges(this.param1.control);
        resetSliderRanges(this.param2.control);
        resetSliderRanges(this.param3.control);
    }



    getWarnLineStyle()
    {
        return isDarkMode()
            ? 'rgba(255, 96, 96, 0.5)'
            : 'rgba(255, 0, 0, 0.16)';
    }



    updateAllSliderRanges()
    {
        const warnLineStyle = this.getWarnLineStyle();


        if (    this.paramSpace.value == 1
            && !isValidDataColor(this._color)) // RGB warning ranges
        {
            const rangesR = [];
            if (this._color[1] < 0) rangesR.push(new NumberSliderRange(0, Math.min(-this._color[1], 1), warnLineStyle, 0.8));
            if (this._color[1] > 1) rangesR.push(new NumberSliderRange(2-Math.min(this._color[1], 2), 1, warnLineStyle, 0.8));
            this.param1.control.ranges = rangesR;

            const rangesG = [];
            if (this._color[2] < 0) rangesG.push(new NumberSliderRange(0, Math.min(-this._color[2], 1), warnLineStyle, 0.8));
            if (this._color[2] > 1) rangesG.push(new NumberSliderRange(2-Math.min(this._color[2], 2), 1, warnLineStyle, 0.8));
            this.param2.control.ranges = rangesG;
            
            const rangesB = [];
            if (this._color[3] < 0) rangesB.push(new NumberSliderRange(0, Math.min(-this._color[3], 1), warnLineStyle, 0.8));
            if (this._color[3] > 1) rangesB.push(new NumberSliderRange(2-Math.min(this._color[3], 2), 1, warnLineStyle, 0.8));
            this.param3.control.ranges = rangesB;
        }
        else if ((   this.paramSpace.value == 2  // HSV
                  || this.paramSpace.value == 3) // HSL
              && !isValidDataColor(this._color))
        {
            const rangesS = [];
            if (this._color[2] < 0) rangesS.push(new NumberSliderRange(0, Math.min(-this._color[2], 1), warnLineStyle, 0.8));
            if (this._color[2] > 1) rangesS.push(new NumberSliderRange(2-Math.min(this._color[2], 2), 1, warnLineStyle, 0.8));
            this.param2.control.ranges = rangesS;
            
            const rangesVL = [];
            if (this._color[3] < 0) rangesVL.push(new NumberSliderRange(0, Math.min(-this._color[3], 1), warnLineStyle, 0.8));
            if (this._color[3] > 1) rangesVL.push(new NumberSliderRange(2-Math.min(this._color[3], 2), 1, warnLineStyle, 0.8));
            this.param3.control.ranges = rangesVL;
        }
        else if (this.paramSpace.value > 3) // HCL
        {
            this.updateSliderRanges(this.param1.control, f =>
                dataColor2rgb([
                    this._color[0],
                    (this.param1.control.displayMin + f * (this.param1.control.displayMax - this.param1.control.displayMin)) / getColorSpaceFactor(this._color[0])[0],
                    this._color[2],
                    this._color[3]]));

            this.updateSliderRanges(this.param2.control, f =>
                dataColor2rgb([
                    this._color[0],
                    this._color[1],
                    (this.param2.control.displayMin + f * (this.param2.control.displayMax - this.param2.control.displayMin)) / getColorSpaceFactor(this._color[0])[1],
                    this._color[3]]));

            this.updateSliderRanges(this.param3.control, f =>
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



    updateSliderRanges(slider, getRgb)
    {
        const warnLineStyle = this.getWarnLineStyle();


        const ranges    = [];
 
        
        const precision = 0.01;
        let   open      = false;

        for (let f = 0; f <= 1; f += precision)
        {
            const rgb = getRgb(f);

            if (!open && !isValidRgb(rgb))
            {
                ranges.push(new NumberSliderRange(f, f, warnLineStyle, 0.8));
                open = true;
            }
            else if (open && isValidRgb(rgb)) 
            {
                ranges[ranges.length-1].end = f;
                open = false;
            }
        }

        
        if (open)
            lastOf(ranges).end = 1;
        else if (!open
              && ranges.length == 0)
            resetSliderRanges(slider);


        slider.ranges = ranges;
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
        for (let i = 0; i < this.params.length; i++)
        {
            const param = this.params[i];

            if (!this.paramIsConsideredDefault(param))
            {
                if (!first) json += ',\n'; first = false;
                json += pos + tab + tab + param.toJson(nTab, i > 0 ? 'c' + i : '');
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
    }
}



// function paramSpace_onbeforechange(paramSpace)
// {
//     if (   paramSpace.value == 0
//         && paramSpace.oldValue > 0)
//     {
//         for (let i = 2; i < paramSpace.node.inputs.length; i++)
//         {
//             const input = paramSpace.node.inputs[i];

//             if (input.connected)
//                 paramSpace.node._oldSpaceConnections.push(getConnectionForArrayWithNames(input.connection));
//         }   

//         for (let i = 2; i < paramSpace.node.outputs.length; i++)
//         {
//             const output = paramSpace.node.outputs[i];

//             for (const input of output.connectedInputs)
//                 paramSpace.node._oldSpaceConnections.push(getConnectionForArrayWithNames(input.connection));
//         }   
//     }
// }



// function paramSpace_onchange(paramSpace)
// {
//     // restore the old connections
    
//     if (   paramSpace.value > 0
//         && paramSpace.oldValue == 0)
//     {
//         for (const conn of paramSpace.node._oldSpaceConnections)
//         {
//             const outputNode = nodeFromId(conn.outputNodeName);
//             const  inputNode = nodeFromId(conn. inputNodeName);

//             if (outputNode && inputNode)
//             {
//                 const output = outputNode.outputs[conn.outputIndex];
//                 const  input =  inputNode. inputs[conn. inputIndex];

//                 uiVariableConnect(outputNode, conn.outputIndex, inputNode, conn.inputIndex);
//             }
//         }

//         paramSpace.node._oldSpaceConnections = [];
//     }

//     //pushUpdate([paramSpace.node]);
// }