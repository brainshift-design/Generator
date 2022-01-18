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


const rgbFactorR = 255;
const rgbFactorG = 255;
const rgbFactorB = 255;

const hs_FactorH = 360;
const hs_FactorS = 100;
const hs_Factor_ = 100;

const oppFactorL = 100;
const oppFactor1 = 100;
const oppFactor2 = 100;

const hclFactorH = 360;
const hclFactorC = 100;
const hclFactorL = 100;



class   OpColor
extends Operator
{
    _color;

    _space;
    
    _c1;
    _c2;
    _c3;

    #colorBack;
    #warningOverlay;

    hexbox;


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
            this._c1.control.style.fontStyle = 'italic'; this._c1.control.pointerEvents = false;
            this._c2.control.style.fontStyle = 'italic'; this._c2.control.pointerEvents = false;
            this._c3.control.style.fontStyle = 'italic'; this._c3.control.pointerEvents = false;

            this.pushUpdate();
        });
    
        
        this.inputs[0].addEventListener('disconnect', () =>
        {
            if (!this._c1.input.isConnected) { this._c1.control.style.fontStyle = 'normal'; this._c1.control.pointerEvents = true; }
            if (!this._c2.input.isConnected) { this._c2.control.style.fontStyle = 'normal'; this._c2.control.pointerEvents = true; }
            if (!this._c3.input.isConnected) { this._c3.control.style.fontStyle = 'normal'; this._c3.control.pointerEvents = true; }

            this.pushUpdate();
        });


        this.addParam(this._space = new SelectParam('space', true, true, OpColorSpaces.map(s => s[1])));
        this.addParam(this._c1    = new NumberParam('c1',    true, true, this._color[1], 0, 255));
        this.addParam(this._c2    = new NumberParam('c2',    true, true, this._color[2], 0, 255));
        this.addParam(this._c3    = new NumberParam('c3',    true, true, this._color[3], 0, 255));


        this._space.addEventListener('change', () => 
        {
            this._c1.allowEditDecimals = this._space.value > 1;
            this._c2.allowEditDecimals = this._space.value > 1;
            this._c3.allowEditDecimals = this._space.value > 1;

            setDataColorToCurrentSpace(this, this._color);

            this.pushUpdate();
        });
        

        this._c1.addEventListener('change', () => this.pushUpdate());
        this._c2.addEventListener('change', () => this.pushUpdate());
        this._c3.addEventListener('change', () => this.pushUpdate());

        
        initHexbox(this);


        this.#warningOverlay = this.control = document.createElement('div');
        this.#warningOverlay.className = 'colorWarningOverlay';
        this.inner.appendChild(this.#warningOverlay);


        setTimeout(() => 
        {
            this._space.setValue(0); // init all the params with names
        });
    }



    getNormalColorFromParams()
    {
        if (this._space.value == 0)
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
                this._c1.value,
                this._c2.value,
                this._c3.value);
        
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
        
        this._c1.setValue(col[0], false, true, dispatchEvents);
        this._c2.setValue(col[1], false, true, dispatchEvents);
        this._c3.setValue(col[2], false, true, dispatchEvents);
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

            if (this._c1.input.isConnected) color[1] = getNormalValue(this._c1.input.data.value, color[0], 0);
            if (this._c2.input.isConnected) color[2] = getNormalValue(this._c2.input.data.value, color[0], 1);
            if (this._c3.input.isConnected) color[3] = getNormalValue(this._c3.input.data.value, color[0], 2);

            setDataColorToCurrentSpace(this, color);
        }

        else if (this.inputs[1].isConnected) 
            switchToSpace(this, OpColorSpaces[this.inputs[1].data.value][0]);

        else
            this._color = this.getNormalColorFromParams();

    
        this.outputs[0]._data = dataFromDataColor(this._color);


        super.update()

        this.updateOutputWires();
    }



    updateNode()
    {
        const colBack      = dataColor2rgb(this._color);

        const darkText     = rgb2hclokl(colBack)[2] > 0.71;

        const colText      = darkText ? [0, 0, 0, 0.24] : [1, 1, 1, 0.4];
        const colWarning   = darkText ? [0, 0, 0, 0.12] : [1, 1, 1, 0.2];

        const textStyle    = colorStyleRgba(colText);
        const warningStyle = colorStyleRgba(colWarning);

        
        this.#colorBack.style.background = colorStyleRgb(colBack);
        this.label     .style.color      = textStyle;

        
        this._space.control.valueColor = warningStyle;
        this._space.control.textColor  = textStyle;
        this._space.control.backColor  = 'transparent';
        this._space.control.update();
        

        this.#warningOverlay.style.background =
            isValidRgb(colBack)
            ? 'transparent'
            :   'repeating-linear-gradient('
              + '-45deg, '
              + 'transparent 0 7px,'
              +  warningStyle + ' 8px 15px,'
              + 'transparent 16px';


        this.inputs [0].wireColor = colBack;
        this.outputs[0].wireColor = colBack;
        

        const colIn  = colorStyleRgba(colText, darkText ? 0.08 : 0.16);
        const colOut = colorStyleRgba(colText, darkText ? 0.06 : 0.12);


        this.inputs [0].color = colIn;
        this.outputs[0].color = colOut;
        
        this.inputs [0].updateControl();
        this.outputs[0].updateControl();


        this._space.input .color = colIn;
        this._space.output.color = colOut;

        this._space.input .updateControl();
        this._space.output.updateControl();


        super.updateNode();
    }



    updateHeader()
    {
        this.header.style.background = 'transparent';
    }
}