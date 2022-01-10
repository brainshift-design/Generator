const colorTypes = ['RGB', 'HSV', 'HSL', 'HCL (OKLab)', 'HCL (CIE Lab)', 'HCL (CIE Luv)'];



class   OpColor
extends Operator
{
    #type;

    #c1;
    #c2;
    #c3;



    constructor()
    {
        super('color', 'color');

        this.addInput (new Input (this.dataType));
        this.setOutput(new Output(this.dataType));


        this.addParam(this.#type = new SelectParam('type', true, colorTypes));
        this.addParam(this.#c1   = new NumberParam('c1',   true, 0, 0, 255));
        this.addParam(this.#c2   = new NumberParam('c2',   true, 0, 0, 255));
        this.addParam(this.#c3   = new NumberParam('c3',   true, 0, 0, 255));

        this.#type.control.addEventListener('change', () => { this.updateNode(); });
        this.#c1  .control.addEventListener('change', () => { this.updateNode(); });
        this.#c2  .control.addEventListener('change', () => { this.updateNode(); });
        this.#c3  .control.addEventListener('change', () => { this.updateNode(); });

        this.#type.setValue(0);
    }



    updateNode()
    {
        super.updateNode();
        //Operator.prototype.updateNode.call(this);

        switch (this.#type)
        {
            case 0: this.#c1.name = 'R'; this.#c2.name = 'G'; this.#c3.name = 'B'; break;
            case 1: this.#c1.name = 'H'; this.#c2.name = 'S'; this.#c3.name = 'V'; break;
            case 2: this.#c1.name = 'H'; this.#c2.name = 'S'; this.#c3.name = 'L'; break;
            case 3: 
            case 4: 
            case 5: this.#c1.name = 'H'; this.#c2.name = 'C'; this.#c3.name = 'L'; break;
        }

        this.header.style.backgroundColor = colorStyle_(
            this.#c1.value,
            this.#c2.value,
            this.#c3.value);
    }
}