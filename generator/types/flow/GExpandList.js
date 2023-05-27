class GExpandList
extends GOperator
{
    input = null;



    constructor(nodeId, options)
    {
        super(LIST_EXPAND, nodeId, options);
    }



    copy()
    {
        const copy = new GItems(this.nodeId, this.options);
        
        copy.copyBase(this);

        if (this.input) 
            copy.input = this.input.copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;



        if (this.input)
        {
            const input = (await this.input.eval(parse)).toValue();


            this.value = new ListValue();

            for (const item of input.items)
            {
                this.value.items.push(item);   

                if (LIST_VALUES.includes(item.type))
                {
                    for (const listItem of item.items)
                        this.value.items.push(listItem);
                }
            }
        }
        else
        {
            this.value = ListValue.NaN;
        }



        this.updateValues = [['value', this.value]];


        this.validate();

        return this;
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.input) this.input.pushValueUpdates(parse);
    }



    toValue()
    {
        return this.value.copy();
    }



    invalidateInputs()
    {
        super.invalidateInputs();

        if (this.input) this.input.invalidateInputs();
    }
}