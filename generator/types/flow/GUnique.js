class GUnique
extends GOperator1
{
    counts  = null;
    indices = null;


    
    constructor(nodeId, options)
    {
        super(UNIQUE, nodeId, options);
    }


    
    reset()
    {
        super.reset();

        this.counts  = null;
        this.indices = null;
    }



    copy()
    {
        const copy = new GUnique(this.nodeId, this.options);

        copy.copyBase(this);

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        const input = this.input ? (await this.input.eval(parse)).toValue() : null;


        this.counts  = new ListValue();
        this.indices = new ListValue();


        if (input)
        {
            if (this.options.enabled)
            {
                this.value = new ListValue();

                for (let i = 0; i < input.items.length; i++)
                {
                    const item       = input.items[i];
                    const foundIndex = this.value.items.findIndex(i => i.equals(item));

                    if (foundIndex < 0)
                    {
                        this.value.items.push(item.copy());

                        if (   this.value.objects
                            && item.objects)
                            this.value.objects.push(...item.objects);

                        this.counts.items.push(new NumberValue(1));
                        this.indices.items.push(new ListValue([new NumberValue(i)]));
                    }
                    else
                    {
                        this.counts .items[foundIndex].value++;
                        this.indices.items[foundIndex].items.push(new NumberValue(i));
                    }
                }
            }
            else
                this.value = input.copy();
        }
        else
            this.value = new ListValue();//TextValue.NaN;


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



    isValid()
    {
        return super.isValid()
            && this.counts && this.counts.isValid();
    }
}
