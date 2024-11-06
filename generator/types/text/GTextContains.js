class GTextContains
extends GOperator1
{
    what;



    constructor(nodeId, options)
    {
        super(TEXT_CONTAINS, nodeId, options);
    }


    
    reset()
    {
        super.reset();

        this.what = null;
    }



    copy()
    {
        const copy = new GTextContains(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.what = null) copy.what = this.what.copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        const input = await evalTextOrListValue(this.input, parse);
        const what  = await evalTextValue      (this.what,  parse);
    

        if (input)
        {
            this.evalInputOrList(
                input, 
                item => evalTextContains(item, what), 
                BooleanValue.NaN());
        }
        else
            this.value = BooleanValue.NaN();
    

        this.setUpdateValues(parse,
        [
            ['type', this.outputType()],
            ['what', what             ]
        ]);


        this.validate();

        return this;
    }



    isValid()
    {
        return super.isValid()
            && this.what && this.what.isValid();
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.what) this.what.pushValueUpdates(parse);
    }



    invalidateInputs(parse, from, force)
    {
        super.invalidateInputs(parse, from, force);

        if (this.what) this.what.invalidateInputs(parse, from, force);
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        if (this.what) this.what.iterateLoop(parse);
    }
}



function evalTextContains(input, what)
{
    return input.type == TEXT_VALUE
         ? new BooleanValue(
               what.value == ''
                   ? false
                   : input.value.includes(what.value))
         : BooleanValue.NaN();
}