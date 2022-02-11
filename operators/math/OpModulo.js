class   OpModulo
extends OpArithmetic
{
    constructor()
    {
        super('modulo', 'mod', '%');
    }
    
    
    
    getResult()
    {
        if (this.inputs.length-1 == 0)
            return 0;

        let result = this.inputs[0].data.value;

        for (let i = 1; i < this.inputs.length-1; i++)
        {
            const div = this.inputs[i].data.value;
            if (div == 0) return Number.NaN;
            result %= div;
        }

        return result;
    }
}