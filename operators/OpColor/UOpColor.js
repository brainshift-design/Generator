class   UOpColor
extends UOperator
{
    #type;

    #c1;
    #c2;
    #c3;



    constructor()
    {
        super('color', 'color');

        this.addInput (new UInput (this.dataType));
        this.setOutput(new UOutput(this.dataType));


        this.addParam(this.#type = new USelectParam('type', true, colorTypes));
        this.addParam(this.#c1   = new UNumberParam('c1',   true, 0, 0, 255));
        this.addParam(this.#c2   = new UNumberParam('c2',   true, 0, 0, 255));
        this.addParam(this.#c3   = new UNumberParam('c3',   true, 0, 0, 255));

        this.#type.control.addEventListener('change', () => { this.updateNode(); });
        this.#c1  .control.addEventListener('change', () => { this.updateNode(); });
        this.#c2  .control.addEventListener('change', () => { this.updateNode(); });
        this.#c3  .control.addEventListener('change', () => { this.updateNode(); });

        this.#type.setValue(0);
    }



    updateNode()
    {
        UOperator.prototype.updateNode.call(this);

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