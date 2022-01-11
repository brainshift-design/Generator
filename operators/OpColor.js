const OpColorTypes = 
[
    ['rgb',    'RGB'          ], 
    ['hsv',    'HSV'          ], 
    ['hsl',    'HSL'          ], 
    ['hclokl', 'HCL (OKLab)'  ],
    ['hcllab', 'HCL (CIE Lab)'],
    ['hslluv', 'HCL (CIE Luv)']
];



class   OpColor
extends Operator
{
    #space;
    
    #c1;
    #c2;
    #c3;
    
    #color;



    constructor()
    {
        super('color', 'col', 'color');

        this.addInput (new Input (this.dataType));
        this.setOutput(new Output(this.dataType));

        this.addParam(this.#space = new SelectParam('space', true, true, OpColorTypes.map(t => t[1])));
        this.addParam(this.#c1    = new NumberParam('c1',    true, true, 128, 0, 255));
        this.addParam(this.#c2    = new NumberParam('c2',    true, true, 128, 0, 255));
        this.addParam(this.#c3    = new NumberParam('c3',    true, true, 128, 0, 255));

        this.#space.control.addEventListener('change', () =>
        {
            switch (this.#space.control.value)
            {
                case 0: this.convert2rgb(); break;
                case 1: this.convert2hsv(); break;
                case 2: this.convert2hsl(); break;
                case 3:
                case 4:
                case 5: break;
            }

            this.invalidate(); 
            this.update();
        });

        this.#c1.control.addEventListener('change', () => { this.invalidate(); this.update(); });
        this.#c2.control.addEventListener('change', () => { this.invalidate(); this.update(); });
        this.#c3.control.addEventListener('change', () => { this.invalidate(); this.update(); });

        this.#space.setValue(0); // init all the params with names
        this.switch2rgb();
    }



    col2rgb(space, col)
    {
        switch (space)
        {
            case 0: return col;
            case 1: return hsv2rgb(col);
            case 2: return hsl2rgb(col);
        }
        
        return [0, 0, 0];
    }



    getColor(space)
    {
        switch (space)
        {
            case 0: return this.getColorRgb();
            case 1: 
            case 2: 
            case 3: 
            case 4: 
            case 5: return this.getColorH();
        }
    }



    getColorRgb()
    {
        return [
            this.#c1.value / 255, 
            this.#c2.value / 255, 
            this.#c3.value / 255];
    }



    getColorH()
    {
        return [
            this.#c1.value / 360, 
            this.#c2.value / 100, 
            this.#c3.value / 100];
    }



    switchControls(c1, c2, c3, c1min, c1max, c1wrap, c2min, c2max, c3min, c3max)
    {
        this.#c1.setName(c1, false); 
        this.#c2.setName(c2, false); 
        this.#c3.setName(c3, false);

        this.#c1.control.wrapValue = c1wrap;

        this.#c1.control.min = c1min; this.#c1.control.max = c1max; this.#c1.control.update();
        this.#c2.control.min = c2min; this.#c2.control.max = c2max; this.#c2.control.update();
        this.#c3.control.min = c3min; this.#c3.control.max = c3max; this.#c3.control.update();
    }



    switch2rgb() { this.switchControls('R', 'G', 'B', 0, 255, false, 0, 255, 0, 255); }
    switch2hsv() { this.switchControls('H', 'S', 'V', 0, 360, true,  0, 100, 0, 100); }
    switch2hsl() { this.switchControls('H', 'S', 'L', 0, 360, true,  0, 100, 0, 100); }
    switch2hcl() { this.switchControls('H', 'C', 'L', 0, 360, true,  0, 100, 0, 100); }



    convert2rgb()
    {
        const col = this.getColor(this.#space.oldValue);

        let rgb;

        switch (this.#space.oldValue)
        {
            case 0: rgb = col;          break;
            case 1: rgb = hsv2rgb(col); break;
            case 2: rgb = hsl2rgb(col); break;
        }

        this.switch2rgb();

        this.#c1.setValue(rgb[0] * 255, false, true, false);
        this.#c2.setValue(rgb[1] * 255, false, true, false);
        this.#c3.setValue(rgb[2] * 255, false, true, false);
    }



    convert2hsv()
    {
        const col = this.getColor(this.#space.oldValue);

        let hsv;

        switch (this.#space.oldValue)
        {
            case 0: hsv = rgb2hsv(col);          break;
            case 1: hsv = col;                   break;
            case 2: hsv = rgb2hsv(hsl2rgb(col)); break;
        }

        if (isNaN(hsv[0]))
            hsv[0] = 5/6;
            
        this.switch2hsv();

        this.#c1.setValue(hsv[0] * 360, false, true, true);
        this.#c2.setValue(hsv[1] * 100, false, true, true);
        this.#c3.setValue(hsv[2] * 100, false, true, true);
    }



    convert2hsl()
    {
        const col = this.getColor(this.#space.oldValue);

        let hsl;

        switch (this.#space.oldValue)
        {
            case 0: hsl = rgb2hsl(col);          break;
            case 1: hsl = rgb2hsl(hsv2rgb(col)); break;
            case 2: hsl = col;                   break;
        }

        this.switch2hsl();

        this.#c1.setValue(hsl[0] * 360, false, true, false);
        this.#c2.setValue(hsl[1] * 100, false, true, false);
        this.#c3.setValue(hsl[2] * 100, false, true, false);
    }



    update()
    {
        if (this.valid) 
            return;

        super.update()

        for (const input of this.inputs)
            input.op.update();

        this.#color = dataFromColor(
            this.#space.value, 
            this.getColor(this.#space.value));

        this.output._data = this.#color;

        this.updateNode();

        for (const input of this.output.connectedInputs)
            input.op.update();
    }



    updateNode()
    {
        super.updateNode();


        const colBack = this.col2rgb(this.#space.value, this.getColor(this.#space.value));

        this.header.style.backgroundColor = colorStyle(colBack);

        this.#space.control.backColor     = colorStyle(colBack);

        let colVal = rgb2hsv(colBack);
        colVal[2] = Math.max(0, colVal[2]-0.05);
        colVal = hsv2rgb(colVal);

        this.#space.control.valueColor = colorStyle(colVal);


        const colText = 
    }
}