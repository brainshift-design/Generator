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

            console.assert(
                this.value.type == TEXT_VALUE, 
                'this.value.type must be TEXT_VALUE');

            this.value.value = this.value.value.replaceAll(
                _what.value,
                _with.value);
        }
        else
            this.value = new TextValue();//TextValue.NaN;

            
        this.updateValues =
        [
            [returnValueId, this.value],
            ['what',  _what     ],
            ['with',  _with     ]
        ];

        
        this.validate();

        return this;
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.input) this.input.pushValueUpdates(parse);
        if (this.what ) this.what .pushValueUpdates(parse);
        if (this.with ) this.with .pushValueUpdates(parse);
    }



    invalidate()
    {
        super.invalidate();

        if (this.input) this.input.invalidate();
        if (this.what ) this.what .invalidate();
        if (this.with ) this.with .invalidate();
    }
}
