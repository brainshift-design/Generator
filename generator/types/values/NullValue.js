class NullValue
extends GValue
{
    value;



    constructor()
    {
        super(ANY_VALUE);

        this.value = null;
    }



    copy()
    {
        const copy = new NullValue();

        copy.copyBase(this);

        return copy;
    }



    equals(_null)
    {
        return _null
            && this.type  == _null.type
            && this.value == _null.value;
    }



    async eval(parse)
    {
        return this;
    }



    hasInitValue()
    {
        return true;
    }



    isValid()
    {
        return false;
    }



    toValue()
    {
        return this.value;
    }



    toNewValue()
    {
        return this.copy();
    }



    toJson() 
    { 
        return this.toString(); 
    }



    toString()
    {
        return 'NULL';
    }



    toPreviewString()
    {
        return 'NULL';
    }



    toDisplayString()
    {
        return 'NULL';
    }



    toJsonText(options = {})
    {
        let json = '';

        json += 'null';

        return json;
    }



    toJsCode(gen)
    {
        return this.toPreviewString();
    }



    static NaN()
    {
        return this;
    }
}



function parseNullValue(str)
{
    const _null = new NullValue();

    return [_null, 1];
}
