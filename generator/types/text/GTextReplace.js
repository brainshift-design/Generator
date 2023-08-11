class GTextReplace
extends GOperator1
{
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

        copy.what  = this.what .copy();
        copy.with  = this.with .copy();

        copy.value = this.value.copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        const _what = (await this.what.eval(parse)).toValue();
        const _with = (await this.with.eval(parse)).toValue();


        if (this.input)
        {
            this.value = (await this.input.eval(parse)).toValue();

            consoleAssert(this.value.type == TEXT_VALUE, 'this.value.type must be TEXT_VALUE');

            this.value.value = this.value.value.replaceAll(
                unescapeString(_what.value),
                unescapeString(_with.value));
        }
        else
            this.value = new TextValue();//TextValue.NaN;

            
        this.setUpdateValues(parse,
        [
            ['value', this.value],
            ['what',  _what     ],
            ['with',  _with     ]
        ]);

        
        this.validate();

        return this;
    }



    isValid()
    {
        return super.isValid()
            && this.what && this.what.isValid()
            && this.with && this.with.isValid();
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.what ) this.what .pushValueUpdates(parse);
        if (this.with ) this.with .pushValueUpdates(parse);
    }



    invalidateInputs(from)
    {
        super.invalidateInputs(from);

        if (this.what ) this.what .invalidateInputs(from);
        if (this.with ) this.with .invalidateInputs(from);
    }
}
