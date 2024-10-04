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



function parseNumberValue(str)
{
         if (str === 'true' ) return [new BooleanValue(true ), 1];
    else if (str === 'false') return [new BooleanValue(false), 1];

    else
    {
        if (str.indexOf(',') < 0)
        {
            consoleError('number value \'' + str + '\' missing \',\'');
            console.trace();
        }


        const parts = str.split(',');

        const num = new NumberValue(
            parseNum(parts[0]),
            parseNum(parts[1]));

        return [num, 1];
    }
}



function parseSimpleNumberValue(str)
{
         if (str === 'true' ) return [new BooleanValue(true ), 1];
    else if (str === 'false') return [new BooleanValue(false), 1];

    const num = 
        str == NAN_DISPLAY
        ? NumberValue.NaN()
        : NumberValue.fromString(str);

    return [num, 1];
}