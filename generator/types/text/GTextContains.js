class GTextContains
extends GOperator2
{
    first;
    last;
    all;



    constructor(nodeId, options)
    {
        super(TEXT_CONTAINS, nodeId, options);
    }


    
    reset()
    {
        super.reset();

        this.first = null;
        this.last  = null;
        this.all   = null;
    }



    copy()
    {
        const copy = new GTextContains(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.first = null) copy.first = this.first.copy();
        if (this.last  = null) copy.last  = this.last .copy();
        if (this.all   = null) copy.all   = this.all  .copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        const input0 = await evalTextValue(this.input0, parse);
        const input1 = await evalTextValue(this.input1, parse);
    

        if (   input0 && input0.isValid() 
            && input1 && input1.isValid())
        {
            if (isListValueType(input0.type))
            {
                this.value = new ListValue();

                for (let i = 0; i < input0.items.length; i++)
                {
                    const item = input0.items[i];

                    this.value.items.push(
                        item.type == TEXT_VALUE
                        ? new BooleanValue(item.value.includes(input1.value))
                        : BooleanValue.NaN());
                }
            }
            else
            {
                this.value = new BooleanValue(input0.value.includes(input1.value));
            }
        }
        else                  
        {
            this.value = BooleanValue.NaN();
        }
    

        this.setUpdateValues(parse,
        [
            ['type', this.outputType()]
        ]);


        this.validate();

        return this;
    }
}