class   OpMinMax
extends OperatorBase
{
    #paramMin;
    #paramMax;



    constructor()
    {
        super('minmax', 'limits', NUMBER, 70);

        this.addInput (new Input (this.dataType));
        this.addOutput(new Output(this.dataType));

        this.addParam(this.#paramMin = new NumberParam('min', 'min', true, true, true, 0));
        this.addParam(this.#paramMax = new NumberParam('max', 'max', true, true, true));
        
        // this.#paramMin.addEventListener('change', () =>
        // {
        //     if (this.#paramMin.value > this.#paramMax.value)
        //         this.#paramMin.setValue(this.#paramMax.value, false, true, false);
        // });

        // this.#paramMax.addEventListener('change', () => 
        // {
        //     if (this.#paramMax.value < this.#paramMin.value)
        //         this.#paramMax.setValue(this.#paramMin.value, false, true, false);
        // });
    }
}