class   UOpColor
extends UOperator
{
    #r;
    #g;
    #b;


    
    constructor()
    {
        super('color', 'color');

        this.addInput (new UInput (this.dataType));
        this.setOutput(new UOutput(this.dataType));

        this.addParam(this.#r = new UNumberParam('R', true, 0, 0, 255));
        this.addParam(this.#g = new UNumberParam('G', true, 0, 0, 255));
        this.addParam(this.#b = new UNumberParam('B', true, 0, 0, 255));


        this.#r.control.addEventListener('change', () => { this.updateNode(); });
        this.#g.control.addEventListener('change', () => { this.updateNode(); });
        this.#b.control.addEventListener('change', () => { this.updateNode(); });
    }



    updateNode()
    {
        this.header.style.backgroundColor = colorStyle_(
            this.#r.value,
            this.#g.value,
            this.#b.value);
    }
}