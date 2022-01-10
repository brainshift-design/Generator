class   OpMultiply
extends OpArithmetic
{
    constructor()
    {
        super('multiply', 'mul');
    }
    
    
    
    getResult()
    {
        if (this.inputs.length-1 == 0)
            return 0;

        let result = 1;

        for (let i = 0; i < this.inputs.length-1; i++)
            result *= this.inputs[i].data.value;

        return result;
    }
}