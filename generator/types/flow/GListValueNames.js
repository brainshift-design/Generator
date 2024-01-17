class GListValueNames
extends GOperator2
{
    constructor(nodeId, options)
    {
        super(LIST_VALUE_NAMES, nodeId, options);
    }


    
    copy()
    {
        const copy = new GListValueNames(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.value) copy.value = this.value.copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        const input0 = this.input0 ? (await this.input0.eval(parse)).toValue() : null;
        const input1 = this.input1 ? (await this.input1.eval(parse)).toValue() : null;

        
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



        this.updateValueObjects();


        this.setUpdateValues(parse,
        [
            ['type', this.outputListType()]
        ]);


        this.validate();

        return this;
    }
}
