/* 
    the data type 'color' contains four elements: 
        color space 
        c1
        c2
        c3
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
            this.hexbox.style.cursor = this.isConnected ? 'default' : 'text';
            
            for (let i = 1; i < this.params.length; i++)
                enableSliderText(this.params[i].control, false);
        });
    
        this.inputs[0].addEventListener('disconnect', () =>
        {
            for (let i = 1; i < this.params.length; i++)
                if (!this.params[i].input.isConnected) 
                    enableSliderText(this.params[i].control, true);
        });

        
        this.addParam(this.paramSpace = new SelectParam('space', 'space', true, true, OpColorSpaces.map(s => s[1])));
        this.addParam(this.param1     = new NumberParam('c1',    '',      true, true, true, Math.round(this._color[1] * rgbFactor[0])));
        this.addParam(this.param2     = new NumberParam('c2',    '',      true, true, true, Math.round(this._color[2] * rgbFactor[1])));
        this.addParam(this.param3     = new NumberParam('c3',    '',      true, true, true, Math.round(this._color[3] * rgbFactor[2])));

        
        this.paramSpace.control.barTop  = 0.8;


        // this.paramSpace.addEventListener('beforechange', e => paramSpace_onbeforechange(e.target));
        // this.paramSpace.addEventListener('change',       e => paramSpace_onchange(e.target));


        initHexbox(this);


        for (let i = 1; i < this.params.length; i++)
            this.params[i].input.addEventListener('disconnect', () => { enableSliderText(this.params[i].control, !this.inputs[0].isConnected); });
    }



    getDataColorFromParams()
    {
        const col = getNormalColor_(
            getCurrentDataColorSpace(this),
            this.param1.value,
            this.param2.value,
            this.param3.value);
    
        return [
            getCurrentDataColorSpace(this),
            col[0],
            col[1],
            col[2] ];
    }
    
    
    
    setColorParams(color)
    {
        const col = getDataColor(color);

        this.param1.setValue(col[0], false, true, false);
        this.param2.setValue(col[1], false, true, false);
        this.param3.setValue(col[2], false, true, false);
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
        //log(this.name + '.OpColor.updateData()');

        if (this.inputs[0].isConnected) 
        {
            const color = convertDataColorToSpace(
                this.inputs[0].data.color, 
                getCurrentDataColorSpace(this));

            if (this.param1.input.isConnected) color[1] = getNormalValue(this.param1.input.data.value, color[0], 0);
            if (this.param2.input.isConnected) color[2] = getNormalValue(this.param2.input.data.value, color[0], 1);
            if (this.param3.input.isConnected) color[3] = getNormalValue(this.param3.input.data.value, color[0], 2);

            setDataColorToSpace(this, color, OpColorSpaces[this.paramSpace.value][0]);
        }
        else
        {
            const toSpace = OpColorSpaces[this.paramSpace.value][0];

            if (  !this.#init
                || this._oldSpace != toSpace)
            {
                this.param1.allowEditDecimals = this.paramSpace.value > 1;
                this.param2.allowEditDecimals = this.paramSpace.value > 1;
                this.param3.allowEditDecimals = this.paramSpace.value > 1;
             
                const color =
                    this.loaded 
                    ? this.getDataColorFromParams()
                    : this._color;
                    
                setDataColorToCurrentSpace(this, color);

                this.#init = true;
            }

            this._color    = this.getDataColorFromParams();
            this._oldSpace = toSpace;
        }

    
        this.outputs[0]._data = dataFromDataColor(this._color);

        for (const param of this.params.filter(p => p.dataType == 'number'))
            param.valueIsValid = !isValidRgb(dataColor2rgb(this._color));


        super.updateData()
    }



    updateNode()
    {
        //log(this.name + '.OpColor.updateNode()');

        
        this.hexbox.style.fontStyle = this.isConnected() ? 'italic' : 'normal';

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
        //log(this.name + '.OpColor.updateHeader()');

        super.updateHeader();
        

        this.header.style.background = 'transparent';
    
    
        const [colBack, darkText, , textStyle] = this.getHeaderColors();


        const colSpaceBar = 
            darkText 
            ? [0, 0, 0, isValidRgb(colBack) ? 0.06 : 0.12] 
            : [1, 1, 1, isValidRgb(colBack) ? 0.1  : 0.24];

            
        this.#colorBack.style.background = colorStyleRgb(colBack);
                
        this.paramSpace.control.valueColor = colorStyleRgba(colSpaceBar);
        this.paramSpace.control.textColor  = textStyle;
        this.paramSpace.control.backColor  = 'transparent';
        this.paramSpace.control.update();


        const colWarning = 
            darkText 
            ? [0, 0, 0, 0.12] 
            : [1, 1, 1, 0.2 ];

        this.warningStyle = colorStyleRgba(colWarning);
        super.updateWarningOverlayStyle(colBack, 45);
    }



    updateParamControls()
    {
        const [colBack, , colText, ] = this.getHeaderColors();

        this.paramSpace.input .color = colText;
        this.paramSpace.output.color = colText;
        this.paramSpace.updateControls();

        this.updateAllSliderRanges();

        this.updateSlider(this.param1.control, isValidRgb(colBack));
        this.updateSlider(this.param2.control, isValidRgb(colBack));
        this.updateSlider(this.param3.control, isValidRgb(colBack));
    }



    updateSlider(slider, isValid)
    {
        slider.valueText = 
               this.inputs[0].isConnected 
            && this.inputs[0].data.color[0] != this._color[0]
            && !isValid 
            ? '?' 
            : '';

        slider.textbox.style.fontStyle = this.inputs[0].isConnected ? 'italic' : 'normal';

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
        if (this.paramSpace.value > 4) // warning ranges
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
//             const outputOp = graph.nodes.find(n => n.name == conn.outputOpName);
//             const  inputOp = graph.nodes.find(n => n.name == conn. inputOpName);

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