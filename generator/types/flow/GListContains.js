class GListContains
extends GOperator2
{
    first;
    last;
    all;



    constructor(nodeId, options)
    {
        super(LIST_CONTAINS, nodeId, options);
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
        const copy = new GListContains(this.nodeId, this.options);

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


        const input0 = await evalListValue(this.input0, parse);
        const input1 = await evalValue    (this.input1, parse);
    

        if (   input0 && input0.isValid() 
            && input1 && input1.isValid())
        {
            if (isValueListOfLists(input0))
            {
                if (isListValueType(input1.type))
                {
                    let result = false;

                    for (const item of input0.items)
                    {
                        if (item.equals(input1))
                        {
                            result = true;
                            break;
                        }
                    }

                    this.value = new NumberValue(result ? 1 : 0, 0, true);
                }
                else // non-list value
                {
                    this.value = new ListValue();

                    for (const item of input0.items)
                    {
                        this.value.items.push(
                            isListValueType(item.type)
                            ? new NumberValue(item.items.find(i => i.equals(input1)) ? 1 : 0, 0, true)
                            : NumberValue.NaN.copy());
                    }
                }
            }
            else
            {
                this.value = new NumberValue(input0.items.find(i => i.equals(input1)) ? 1 : 0, 0, true);
            }
        }
        else                  
        {
            this.value = NumberValue.NaN.copy();
        }
    

        this.setUpdateValues(parse,
        [
            ['type', this.outputType()]
        ]);


        this.validate();

        return this;
    }
}