class BooleanValue
extends NumberValue
{
    constructor(value)
    {
        if (!isValid(value))
        {
            console.assert(false, 'must specify a boolean value');
            console.trace();
        }
        
        super(value ? 1 : 0, 0, true);
    }



    static NaN()
    {
        return NumberValue.NaN();
    }
}