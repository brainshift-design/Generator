/* 
    the data type 'color' contains four elements: 
        color space 
        c1
        c2
        c3
*/


const OpColorSpaces = 
[
    ['hex',    'Hex'    ],
    ['rgbhex', '#RGB'   ],
    ['rgb',    'RGB'    ], 
    ['hsv',    'HSV'    ], 
    ['hsl',    'HSL'    ], 
    ['hclokl', 'HCL OKL'],
    ['hcllab', 'HCL Lab'],
    ['hclluv', 'HCL Luv'],
    ['oklab',  'OKLab'  ],
    ['lab',    'Lab'    ],
    ['luv',    'Luv'    ]
];


const rgbFactor   = [255, 255, 255];
const hs_Factor   = [360, 100, 100];
const hclFactor   = [360, 100, 100];
const oppFactor   = [100, 100, 100];

const rgbScale    = [255, 255, 255];
const hs_Scale    = [360, 100, 100];
const hcloklScale = [360,  51, 100];
const hcllabScale = [360, 100, 100];
const hclluvScale = [360, 100, 100];
const oklabScale  = [100,  30,  30];
const labScale    = [100, 100, 100];
const luvScale    = [100, 150, 150];


class   OpColor
extends Operator
{
    paramSpace;
    
    param1;
    param2;
    param3;

    #colorBack;
    #warningOverlay;

    hexbox;


    _color;

    #init = false;


    constructor()
    {
        super('color', 'col', 'color', 80);

        this._color = ['rgb', 0.5, 0.5, 0.5];


        this.#colorBack = document.createElement('div');
        this.#colorBack.className = 'colorBack';
        this.inner.appendChild(this.#colorBack);


        this.addInput (new Input (this.dataType));
        this.addOutput(new Output(this.dataType));


        this.inputs[0].addEventListener('connect', () =>
        {
            this.param1.control.style.fontStyle = 'italic'; this.param1.control.pointerEvents = false;
            this.param2.control.style.fontStyle = 'italic'; this.param2.control.pointerEvents = false;
            this.param3.control.style.fontStyle = 'italic'; this.param3.control.pointerEvents = false;
        });
    
        
        this.inputs[0].addEventListener('disconnect', () =>
        {
            if (!this.param1.input.isConnected) { this.param1.control.style.fontStyle = 'normal'; this.param1.control.pointerEvents = true; }
            if (!this.param2.input.isConnected) { this.param2.control.style.fontStyle = 'normal'; this.param2.control.pointerEvents = true; }
            if (!this.param3.input.isConnected) { this.param3.control.style.fontStyle = 'normal'; this.param3.control.pointerEvents = true; }
        });


        this.addParam(this.paramSpace = new SelectParam('space', true, true, OpColorSpaces.map(s => s[1])));
        this.addParam(this.param1    = new NumberParam('c1', true, true, true, Math.round(this._color[1] * rgbFactor[0]), 0, 255));
        this.addParam(this.param2    = new NumberParam('c2', true, true, true, Math.round(this._color[2] * rgbFactor[1]), 0, 255));
        this.addParam(this.param3    = new NumberParam('c3', true, true, true, Math.round(this._color[3] * rgbFactor[2]), 0, 255));

        this.paramSpace.control.barHeight = 0.2;
        

        // this._space.addEventListener('change', () => 
        // {
        //     this.param1.allowEditDecimals = this.paramSpace.value > 1;
        //     this.param2.allowEditDecimals = this.paramSpace.value > 1;
        //     this.param3.allowEditDecimals = this.paramSpace.value > 1;

        //     setDataColorToCurrentSpace(this, this._color);
        // });
        

        initHexbox(this);


        this.#warningOverlay = document.createElement('div');
        this.#warningOverlay.className = 'colorWarningOverlay';
        this.inner.appendChild(this.#warningOverlay);


        setTimeout(() => { this.paramSpace.setValue(0); }); // init all the params with names
    }



    getNormalColorFromParams()
    {
        if (this.paramSpace.value == 0)
        {
            const rgb = hex2rgb(this.hexbox.value);

            return [
                'rgb',
                rgb[0],
                rgb[1],
                rgb[2] ];
        }
        else
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
    }
    
    
    
    getNormalColorFromParamsWithOnlyInput1(space)
    {
        if (this.paramSpace.value == 0)
        {
            const rgb = hex2rgb(this.hexbox.value);

            return [
                'rgb',
                rgb[0],
                rgb[1],
                rgb[2] ];
        }
        else
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
    }
    
    
    
    setColorParams(color, dispatchEvents)
    {
        const col = getDataColor(color);
        
        this.param1.setValue(col[0], false, true, dispatchEvents);
        this.param2.setValue(col[1], false, true, dispatchEvents);
        this.param3.setValue(col[2], false, true, dispatchEvents);
    }



    getHeaderColor() 
    {
        return dataColor2rgb(this._color); 
    }



    update()
    {
        if (!this.needsUpdate())
            return;

            
        this.updateParams(false);


        if (this.inputs[0].isConnected) 
        {
            const color = convertDataColorToSpace(
                this.inputs[0].data.color, 
                getCurrentDataColorSpace(this));

            if (this.param1.input.isConnected) color[1] = getNormalValue(this.param1.input.data.value, color[0], 0);
            if (this.param2.input.isConnected) color[2] = getNormalValue(this.param2.input.data.value, color[0], 1);
            if (this.param3.input.isConnected) color[3] = getNormalValue(this.param3.input.data.value, color[0], 2);

            setDataColorToCurrentSpace(this, color);
        }
        else
        {
            if (  !this.#init
                || this._color[0] != OpColorSpaces[this.paramSpace.value][0])
            {
                this.param1.allowEditDecimals = this.paramSpace.value > 1;
                this.param2.allowEditDecimals = this.paramSpace.value > 1;
                this.param3.allowEditDecimals = this.paramSpace.value > 1;
                
                setDataColorToCurrentSpace(this, this._color);

                this.#init = true;
            }

            this._color = this.getNormalColorFromParams();
        }

    
        this.outputs[0]._data = dataFromDataColor(this._color);

        for (const param of this.params.filter(p => p.dataType == 'number'))
            param.valueIsValid = !isValidRgb(dataColor2rgb(this._color));


        super.update()

        this.updateOutputWires();
    }



    updateNode()
    {
        const colBack       = dataColor2rgb(this._color);
 
        const darkText      = rgb2hclokl(colBack)[2] > 0.71;
 
        const colText       = darkText ? [0, 0, 0, 0.24] : [1, 1, 1, 0.4];
        const colWarning    = darkText ? [0, 0, 0, 0.12] : [1, 1, 1, 0.2];
        const colSpaceVal   = darkText ? [0, 0, 0, 0.06] : [1, 1, 1, 0.1];
 
        const textStyle     = colorStyleRgba(colText);
        const warningStyle  = colorStyleRgba(colWarning);

        
        this.#colorBack.style.background = colorStyleRgb(colBack);
        this.label     .style.color      = textStyle;

        
        this.paramSpace.control.valueColor = colorStyleRgba(colSpaceVal);
        this.paramSpace.control.textColor  = textStyle;
        this.paramSpace.control.backColor  = 'transparent';
        this.paramSpace.control.update();


        this.hexbox.value = 
            isValidRgb(colBack)
            ? rgb2hex(colBack)
            : '?';

        this.hexbox.style.fontStyle = 
            this.inputs[0].isConnected
            ? 'italic'
            : 'normal';


        this.updateControls(colBack);


        this.#warningOverlay.style.background =
            isValidRgb(colBack)
            ? 'transparent'
            : 'repeating-linear-gradient('
              + '-45deg, '
              + 'transparent 0 7px,'
              +  warningStyle + ' 7px 14px)';


        this.inputs [0].wireColor = colBack;
        this.outputs[0].wireColor = colBack;

        
        const colIn  = colorStyleRgba(colText, darkText ? 0.08 : 0.16);
        const colOut = colorStyleRgba(colText, darkText ? 0.06 : 0.12);

        this.inputs [0].color = colIn;
        this.outputs[0].color = colOut;
        
        this.inputs [0].updateControl();
        this.outputs[0].updateControl();


        this.paramSpace.input .color = colIn;
        this.paramSpace.output.color = colOut;

        this.paramSpace.input .updateControl();
        this.paramSpace.output.updateControl();


        super.updateNode();
    }



    updateHeader()
    {
        this.header.style.background = 'transparent';
    }



    updateControls(rgb)
    {
        this.updateAllControlRanges();

        this.updateSlider(this.param1.control, isValidRgb(rgb));
        this.updateSlider(this.param2.control, isValidRgb(rgb));
        this.updateSlider(this.param3.control, isValidRgb(rgb));
    }



    updateSlider(slider, isValid)
    {
        slider.valueText = 
               this.inputs[0].isConnected 
            && this.inputs[0].data.color[0] != this._color[0]
            && !isValid 
            ? '?' 
            : '';

        slider.update();
    }



    resetAllControlRanges()
    {
        resetSliderRanges(this.param1.control);
        resetSliderRanges(this.param2.control);
        resetSliderRanges(this.param3.control);
    }



    updateAllControlRanges()
    {
        if (this.paramSpace.value > 4) // warning ranges
        {
            this.updateControlRanges(this.param1.control, f =>
                dataColor2rgb([
                    this._color[0],
                    (this.param1.control.min + f * (this.param1.control.max - this.param1.control.min)) / getColorSpaceFactor(this._color[0])[0],
                    this._color[2],
                    this._color[3]]));

            this.updateControlRanges(this.param2.control, f =>
                dataColor2rgb([
                    this._color[0],
                    this._color[1],
                    (this.param2.control.min + f * (this.param2.control.max - this.param2.control.min)) / getColorSpaceFactor(this._color[0])[1],
                    this._color[3]]));

            this.updateControlRanges(this.param3.control, f =>
                dataColor2rgb([
                    this._color[0],
                    this._color[1],
                    this._color[2],
                    (this.param3.control.min + f * (this.param3.control.max - this.param3.control.min)) / getColorSpaceFactor(this._color[0])[2]]));
        }
        else // no warning ranges
        {
            this.resetAllControlRanges();
        }
    }



    updateControlRanges(slider, getRgb)
    {
        const ranges = [];
 
        
        const precision = 0.01;
        let   open      = false;

        for (let f = 0; f <= 1; f += precision)
        {
            const rgb = getRgb(f);

            if (!open && !isValidRgb(rgb))
            {
                ranges.push(new NumberSliderRange(f, f, 'rgba(255, 0, 0, 0.2)', 0.8));
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



    paramsToJson(nTab = 0) 
    {
        let pos = ' '.repeat(nTab);
        
        let json = '';
        
        let first = true;
        for (const param of this.params)
        {
            if (   !param.isDefault()
                && (   !param.input
                    || !param.input.isConnected)
                && !this.inputs[0].isConnected)
            {
                if (!first) json += ',\n'; first = false;
                json += pos + param.toJson(nTab);
            }
        }

        if (!first)
            json += '\n';

        return json;
    }
}