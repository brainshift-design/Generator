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
    ['hclluv', 'HCL Luv']
];



class   OpColor
extends Operator
{
    _color;

    _space;
    
    _c1;
    _c2;
    _c3;

    hexbox;


    constructor()
    {
        super('color', 'col', 'color', 80);

        this._color = ['rgb', 0.5, 0.5, 0.5];


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

        
        this.initHexbox();

        
        setTimeout(() => 
        {
            this._space.setValue(0); // init all the params with names
        });
    }



    initHexbox()
    {
        this.hexbox = document.createElement('INPUT');
        
        this.hexbox.setAttribute('type', 'text');
        
        this.hexbox.style.textAlign = 'center';
        this.hexbox.style.width     = '100%';
        this.hexbox.style.height    = 26;
        
        this.hexbox.op      = this;
        this.hexbox.editing = false;
        
        
        this.hexbox.addEventListener('pointerdown', onHexboxPointerDown);
        this.hexbox.addEventListener('pointerup',   onHexboxPointerUp);
        this.hexbox.addEventListener('focusout',    onHexboxFocusOut);
        this.hexbox.addEventListener('input',       onHexboxInput);
        this.hexbox.addEventListener('keydown',     onHexboxKeyDown);
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
        const colBack = dataColor2rgb(this._color);

        let colVal = rgb2hsv(colBack);
        colVal[2]  = Math.max(0, colVal[2]-0.05);
        colVal     = hsv2rgb(colVal);
        
        const darkText = rgb2okhcl(colBack)[2] > 0.71;
        const colText  = darkText ? [0, 0, 0, 0.24] : [1, 1, 1, 0.4];


        this.inner .style.backgroundColor = colorStyleRgb (colBack);
        this.header.style.backgroundColor = colorStyleRgb (colBack);
        this.label .style.color           = colorStyleRgba(colText);


        this._space.control.backColor  = colBack;
        this._space.control.valueColor = colVal;
        this._space.control.textColor  = colText;
        this._space.control.update();


        this.inputs [0].wireColor = colBack;
        this.outputs[0].wireColor = colBack;
        

        const colIn  = colorStyleRgba(colText, darkText ? 0.12 : 0.24);
        const colOut = colorStyleRgba(colText, darkText ? 0.08 : 0.16);


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
}