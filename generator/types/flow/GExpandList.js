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

                if (item.type == LIST_VALUE)
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


        genPushUpdateValue(parse, this.nodeId, 'value', this.value);



        this.validate();

        return this;
    }



    toValue()
    {
        return this.value.copy();
    }
}