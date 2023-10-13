class GReverseList
extends GOperator1
{
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
                this.value.objects = [];

                for (let i = input.items.length-1; i >= 0; i--)
                    this.value.items.push(input.items[i]);//.copy());

                if (input.objects)
                {
                    for (let i = input.objects.length-1; i >= 0; i--)
                        this.value.objects.push(input.objects[i]);
                }
            }
            else
                this.value = input;//.copy();
        }
        else
            this.value = ListValue.NaN.copy();


        this.updateValueObjects();


        this.setUpdateValues(parse, 
        [
            ['preview', new ListValue(this.value.items.slice(0, Math.min(this.value.items.length, 10)))],
            ['type',    this.outputListType()                                                          ],
            ['length',  new NumberValue(this.value.items.length)                                       ]
        ]); 
               

        this.validate();

        return this;
    }
}
