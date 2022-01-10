class   OpExponent
extends OpArithmetic
{
    constructor()
    {
        super('exponent', 'exp');
    }
    
    
    
    getResult()
    {
        if (this.inputs.length-1 == 0)
            return 0;
            
        let result = this.inputs[0].data.value;

        for (let i = 1; i < this.inputs.length-1; i++)
            result = Math.pow(result, this.inputs[i].data.value);

        return result;
    }
}