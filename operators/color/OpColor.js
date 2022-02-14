/* 
    the data type 'color' contains four elements: 
        color space 
        component 1
        component 2
        component 3
*/



class   OpColor
extends OpColorBase
{
    paramSpace;
    
    param1;
    param2;
    param3;

    #colorBack;


    hexbox;

    
    _oldSpace;
    _oldSpaceConnections = [];


    _colorBeforeNaN = dataColor_NaN;


    #init = false;
    


    constructor()
    {
        super('color', 'color', 'color', 80);


        this._color    = ['rgb', 0.5, 0.5, 0.5];
        this._oldSpace =  'rgb';


        this.#colorBack = createDiv('colorBack');
        this.inner.appendChild(this.#colorBack);


        this.addInput (new Input (this.dataType));
        this.addOutput(new Output(this.dataType));


        this.inputs[0].addEventListener('connect', () =>
        {
            for (let i = 1; i < this.params.length; i++)
                enableSliderText(this.params[i].control, false);
        });
    
        this.inputs[0].addEventListener('disconnect', () =>
        {
            for (let i = 1; i < this.params.length; i++)
            {
                if (!this.params[i].input.isConnected) 
                    enableSliderText(this.params[i].control, true);
            }

            this.updateNode();
        });

        
        this.addParam(this.paramSpace = new SelectParam('space', 'space', false, true, true, OpColorSpaces.map(s => s[1]), 0));
        this.addParam(this.param1     = new NumberParam('c1',    '',      true,  true, true, Math.round(this._color[1] * rgbFactor[0])));
        this.addParam(this.param2     = new NumberParam('c2',    '',      true,  true, true, Math.round(this._color[2] * rgbFactor[1])));
        this.addParam(this.param3     = new NumberParam('c3',    '',      true,  true, true, Math.round(this._color[3] * rgbFactor[2])));

        
        this.paramSpace.control.barTop  = 0.8;

        this.paramSpace.control.wheelScale = 1;
        this.param1    .control.wheelScale = 1;
        this.param2    .control.wheelScale = 1;
        this.param3    .control.wheelScale = 1;


        this.paramSpace.control.addEventListener('pointerenter', () => { this.header.over = true;  this.updateHeader(); });
        this.paramSpace.control.addEventListener('pointerleave', () => { this.header.over = false; this.updateHeader(); });


        // this.paramSpace.addEventListener('beforechange', e => paramSpace_onbeforechange(e.target));
        // this.paramSpace.addEventListener('change',       e => paramSpace_onchange(e.target));


        initHexbox(this);


        for (let i = 1; i < this.params.length; i++)
            this.params[i].input.addEventListener('disconnect', () => { enableSliderText(this.params[i].control, !this.inputs[0].isConnected); });
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

        this.param1.setValue(col[0], fireChangeEvent);
        this.param2.setValue(col[1], fireChangeEvent);
        this.param3.setValue(col[2], fireChangeEvent);
    }



    isConnected()
    {
        return this.inputs[0].isConnected
            || this.inputs[2].isConnected
            || this.inputs[3].isConnected
            || this.inputs[4].isConnected;
    }



    getHeaderColor() 
    {
        return dataColor2rgb(this._color); 
    }



    updateData()
    {
        //log(this.id + '.OpColor.updateData()');

        if (this.inputs[0].isConnected) 
        {
            if (   dataColorIsNaN(this.inputs[0].data.color)
                && !this.loading
                && !dataColorIsNaN(this._color))
            {
                this._colorBeforeNaN = this._color;
                this._color          = dataColor_NaN;
            }
            else
            {
                const color = convertDataColorToSpace(
                    this.inputs[0].data.color, 
                    colorSpace(this.paramSpace.value));

                if (this.param1.input.isConnected) color[1] = getNormalValue(this.param1.input.data.value, color[0], 0);
                if (this.param2.input.isConnected) color[2] = getNormalValue(this.param2.input.data.value, color[0], 1);
                if (this.param3.input.isConnected) color[3] = getNormalValue(this.param3.input.data.value, color[0], 2);

                setDataColorToSpace(this, color, colorSpace(this.paramSpace.value));
            }
        }
        else
        {
            if (!dataColorIsNaN(this._colorBeforeNaN))
            {
                this._color          = this._colorBeforeNaN;
                this._colorBeforeNaN = dataColor_NaN;

                const toSpace = colorSpace(this.paramSpace.value);

                switchToSpace(this, toSpace);
                setDataColorToCurrentSpace(this, this._color);

                this._oldSpace = toSpace;
            }
            else
            {
                const toSpace = colorSpace(this.paramSpace.value);

                if (   !this.#init
                    ||  this._oldSpace != toSpace
                    || !dataColorIsNaN(this._colorBeforeNaN))
                {
                    this.param1.allowEditDecimals = this.paramSpace.value > 1;
                    this.param2.allowEditDecimals = this.paramSpace.value > 1;
                    this.param3.allowEditDecimals = this.paramSpace.value > 1;

                    const color =
                        this.loading 
                        ? this.getDataColorFromParams()
                        : this._color;


                    switchToSpace(this, toSpace);
                    setDataColorToCurrentSpace(this, color);


                    for (let i = 2; i < 5; i++)
                    {
                        if (this.inputs[i].isConnected) 
                        { 
                            const param = this.inputs[i].param;

                            param.update(); 
                            this._color[i-1] = param.value; 
                        }
                    }


                    this.#init = true;
                }

                this._color    = this.getDataColorFromParams();
                this._oldSpace = toSpace;
            }
        }

    
        this.outputs[0]._data = dataFromDataColor(this._color);


        super.updateData()
    }



    updateNode()
    {
        //log(this.id + '.OpColor.updateNode()');

        
        enableElementText(this.hexbox, !this.isConnected());

        if (this.hexbox != document.activeElement)
        {
            const colBack = dataColor2rgb(this._color);

            this.hexbox.value = 
                isValidRgb(colBack)
                ? rgb2hex(colBack)
                : '?';
        }


        super.updateNode();
    }



    updateHeader()
    {
        //log(this.id + '.OpColor.updateHeader()');

        super.updateHeader();
        

        this.header.style.background = 'transparent';
    
    
        const [colBack, darkText, colInput, colOutput,, textStyle] = this.getHeaderColors();

        this.#colorBack.style.background = 
            this.canShowColor()
            ? colorStyleRgb(colBack)
            : '#ead8eaee';


        const colSpaceBar = 
            darkText 
            ? [0, 0, 0, isValidRgb(colBack) ? (this.header.over ? 3 : 1) * 0.03 : 0.12] 
            : [1, 1, 1, isValidRgb(colBack) ? (this.header.over ? 3 : 1) * 0.05 : 0.24];

        this.paramSpace.control.backColor  = 'transparent';
        this.paramSpace.control.valueColor = colorStyleRgba(colSpaceBar);
        this.paramSpace.control.textColor  = textStyle;
        this.paramSpace.input .color       = colInput;
        this.paramSpace.output.color       = colOutput;
        this.paramSpace.updateControls();

        const colWarning = 
            darkText 
            ? [0, 0, 0, 0.12] 
            : [1, 1, 1, 0.2 ];

        this.warningStyle = colorStyleRgba(colWarning);


        this.updateWarningOverlay();
        this.updateWarningOverlayStyle(colBack, 45);
    }



    updateParamControls()
    {
        const [colBack,,,,] = this.getHeaderColors();

        this.updateAllSliderRanges();

        const isValid = 
               colorSpaceIndex(this._color[0]) > 3
            || isValidRgb(colBack);

        this.updateSlider(this.param1.control, isValid);
        this.updateSlider(this.param2.control, isValid);
        this.updateSlider(this.param3.control, isValid);
    }



    updateSlider(slider, isValid)
    {
        // slider.valueText = 
        //        this.inputs[0].isConnected 
        //     // && this.inputs[0].data.color[0] != this._color[0]
        //     && !isValid 
        //     ? '?' 
        //     : '';

        if (    this.inputs[0].isConnected
            && !isValid)
            slider.setValue(Number.NaN, true, false, false);

        enableElementText(slider.textbox, !this.inputs[0].isConnected);

        slider.update();
    }



    resetAllControlRanges()
    {
        resetSliderRanges(this.param1.control);
        resetSliderRanges(this.param2.control);
        resetSliderRanges(this.param3.control);
    }



    updateAllSliderRanges()
    {
        if (this.paramSpace.value > 3) // warning ranges
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
        const ranges    = [];
 
        
        const precision = 0.01;
        let   open      = false;

        for (let f = 0; f <= 1; f += precision)
        {
            const rgb = getRgb(f);

            if (!open && !isValidRgb(rgb))
            {
                ranges.push(new NumberSliderRange(f, f, 'rgba(255, 0, 0, 0.16)', 0.8));
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
            && !this.inputs[0].isConnected
            && (  !this.paramSpace.input.isConnected
                || this.paramSpace.value == 0);
    }



    toJsonBase(nTab = 0) 
    {
        let   pos = ' '.repeat(nTab);
        const tab = '  ';

        let json = super.toJsonBase(nTab);

        if (!dataColorIsNaN(this._colorBeforeNaN))
            json += ',\n' + pos + tab + '"colorBeforeNaN":\n' + dataColorToJson(this._colorBeforeNaN, 4);

        return json;
    }



    paramsToJson(nTab = 0) 
    {
        let pos = ' '.repeat(nTab);
        
        let json = '';
        
        let first = true;
        for (let i = 0; i < this.params.length; i++)
        {
            const param = this.params[i];

            if (!this.paramIsConsideredDefault(param))
            {
                if (!first) json += ',\n'; first = false;
                json += pos + param.toJson(nTab, i > 0 ? 'c' + i : '');
            }
        }

        if (!first)
            json += '\n';

        return json;
    }



    loadParams(_node)
    {
        if (_node.colorBeforeNaN)
            this._colorBeforeNaN = _node.colorBeforeNaN;

        super.loadParams(_node);
    }
}



// function paramSpace_onbeforechange(paramSpace)
// {
//     if (   paramSpace.value == 0
//         && paramSpace.oldValue > 0)
//     {
//         for (let i = 2; i < paramSpace.op.inputs.length; i++)
//         {
//             const input = paramSpace.op.inputs[i];

//             if (input.isConnected)
//                 paramSpace.op._oldSpaceConnections.push(getConnectionForArrayWithNames(input.connection));
//         }   

//         for (let i = 2; i < paramSpace.op.outputs.length; i++)
//         {
//             const output = paramSpace.op.outputs[i];

//             for (const input of output.connectedInputs)
//                 paramSpace.op._oldSpaceConnections.push(getConnectionForArrayWithNames(input.connection));
//         }   
//     }
// }



// function paramSpace_onchange(paramSpace)
// {
//     // restore the old connections
    
//     if (   paramSpace.value > 0
//         && paramSpace.oldValue == 0)
//     {
//         for (const conn of paramSpace.op._oldSpaceConnections)
//         {
//             const outputOp = nodeFromId(conn.outputOpName);
//             const  inputOp = nodeFromId(conn. inputOpName);

//             if (outputOp && inputOp)
//             {
//                 const output = outputOp.outputs[conn.outputIndex];
//                 const  input =  inputOp. inputs[conn. inputIndex];

//                 uiVariableConnect(outputOp, conn.outputIndex, inputOp, conn.inputIndex);
//             }
//         }

//         paramSpace.op._oldSpaceConnections = [];
//     }

//     //paramSpace.op.pushUpdate();
// }