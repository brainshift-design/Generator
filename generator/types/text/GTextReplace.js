class GTextReplace
extends GTextType
{
    input = null;

    what;
    with;



    constructor(nodeId, options)
    {
        super(TEXT_REPLACE, nodeId, options);
    }


    
    copy()
    {
        const copy = new GTextReplace(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.input) 
            copy.input = this.input.copy();

        copy.what  = this.what.copy();
        copy.with  = this.with.copy();

        return copy;
    }



    eval(parse)
    {
        if (this.isCached())
            return this;


        const _what = this.what.eval(parse).toValue();
        const _with = this.with.eval(parse).toValue();


        if (this.input)
        {
            this.value = this.input.eval(parse).toValue();

            console.assert(
                this.value.type == TEXT_VALUE, 
                'this.value.type must be TEXT_VALUE');

            this.value.value = this.value.value.replaceAll(
                _what.value,
                _with.value);
        }
        else
            this.value = TextValue.NaN;

            
        genPushUpdateValue(parse, this.nodeId, 'what',  _what);
        genPushUpdateValue(parse, this.nodeId, 'with',  _with);
        genPushUpdateValue(parse, this.nodeId, 'value', this.value);


        this.validate();

        return this;
    }
}
