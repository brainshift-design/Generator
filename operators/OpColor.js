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

        this.#space.control.addEventListener('change', () => { this.updateNode(); });
        this.#c1   .control.addEventListener('change', () => { this.updateNode(); });
        this.#c2   .control.addEventListener('change', () => { this.updateNode(); });
        this.#c3   .control.addEventListener('change', () => { this.updateNode(); });

        this.#space.setValue(0);
    }



    update()
    {
        if (this.valid) 
            return;

        super.update()

        for (const input of this.inputs)
            input.op.update();

        this.#color = this.getColor();

        this.output._data = dataFromColor(this.#color);

        this.updateNode();

        for (const input of this.output.connectedInputs)
            input.op.update();
    }



    getColor()
    {
        switch (this.#space.value)
        {
            case 0: return this.getColorRgb();
            case 1: break;
            case 2: break;
            case 3: break;
            case 4: break;
            case 5: break;
        }
    }



    getColorRgb()
    {
        return [
            this.#c1.value / 255, 
            this.#c2.value / 255, 
            this.#c3.value / 255];
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