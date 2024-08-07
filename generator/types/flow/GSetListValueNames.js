class GSetListValueNames
extends GOperator2
{
    constructor(nodeId, options)
    {
        super(SET_LIST_VALUE_NAMES, nodeId, options);
    }


    
    copy()
    {
        const copy = new GSetListValueNames(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.value) copy.value = this.value.copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        const input0 = await evalListValue(this.input0, parse);
        const input1 = await evalListValue(this.input1, parse);

        
        if (   this.options.enabled
            && input0
            && input1
            && input0.items
            && input1.items)
        {
            for (let i = 0; i < input0.items.length && i < input1.items.length; i++)
                input0.items[i].valueId = input1.items[i].value;

            this.value = input0;
        }
        else if (input0)
            this.value = input0;
        else
            this.value = new ListValue();


        this.updateValueObjects();


        this.setUpdateValues(parse,
        [
            ['type', this.outputListType()]
        ]);


        this.validate();

        return this;
    }
}
