class GReverseList
extends GOperator
{
    input  = null;


    
    constructor(nodeId, options)
    {
        super(REVERSE_LIST, nodeId, options);
    }


    
    copy()
    {
        const copy = new GReverseList(this.nodeId, this.options);

        copy.copyBase(this);

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        const input = this.input ? (await this.input.eval(parse)).toValue() : null;


        this.counts = new ListValue();


        if (input)
        {
            if (this.options.enabled)
            {
                this.value = new ListValue();

                for (let i = input.items.length-1; i >= 0; i--)
                {
                    this.value.items.push(input.items[i].copy());
                    this.value.objects.push(...input.items[i].objects);
                }
            }
            else
                this.value = input.copy();
        }
        else
            this.value = new ListValue();//TextValue.NaN;


        this.updateValueObjects();


        this.setUpdateValues(parse, [['length', new NumberValue(this.value.items.length)]]); 
               

        this.validate();

        return this;
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.input) this.input.pushValueUpdates(parse);
    }



    invalidateInputs(from)
    {
        super.invalidateInputs(from);

        if (this.input) this.input.invalidateInputs(from);
    }
}
