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
                 if (this.control.oldValue == 0 && this.control.value == 1) this.convertRgb2hsv();
            else if (this.control.oldValue == 0 && this.control.value == 2) this.convertRgb2hsl();

            this.invalidate(); 
            this.update();
        });

        this.#c1.control.addEventListener('change', () => { this.invalidate(); this.update(); });
        this.#c2.control.addEventListener('change', () => { this.invalidate(); this.update(); });
        this.#c3.control.addEventListener('change', () => { this.invalidate(); this.update(); });

        this.#space.setValue(0); // init all the params with names
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



    getColor(space)
    {
        switch (space)
        {
            case 0: return this.getColorRgb();
            case 1: return this.getColorHsv();
            case 2: return this.getColorHsl();
            case 3: return [0, 0, 0];
            case 4: return [0, 0, 0];
            case 5: return [0, 0, 0];
        }
    }



    getColorRgb()
    {
        return [
            this.#c1.value / 255, 
            this.#c2.value / 255, 
            this.#c3.value / 255];
    }



    getColorHsv()
    {
        return [
            this.#c1.value / 360, 
            this.#c2.value / 100, 
            this.#c3.value / 100];
    }



    getColorHsl()
    {
        return [
            this.#c1.value / 360, 
            this.#c2.value / 100, 
            this.#c3.value / 100];
    }



    updateNode()
    {
        super.updateNode();

        switch (this.#space.value)
        {
            case 0: this.#c1.setName('R', false); this.#c2.setName('G', false); this.#c3.setName('B', false); break;
            case 1: this.#c1.setName('H', false); this.#c2.setName('S', false); this.#c3.setName('V', false); break;
            case 2: this.#c1.setName('H', false); this.#c2.setName('S', false); this.#c3.setName('L', false); break;
            case 3: 
            case 4: 
            case 5: this.#c1.setName('H', false); this.#c2.setName('C', false); this.#c3.setName('L', false); break;
        }

        this.header.style.backgroundColor = colorStyle(this.getColor());
    }
}