class GReverseList
extends GOperator1
{
    // cachedValue = null;



    constructor(nodeId, options)
    {
        super(REVERSE_LIST, nodeId, options);
    }


    
    reset()
    {
        super.reset();

        // this.cachedValue = null;
    }



    copy()
    {
        const copy = new GReverseList(this.nodeId, this.options);

        copy.copyBase(this);

        return copy;
    }



    async eval(parse)
    {
        if (   this.isCached())
            //&& this.cachedValue)
            return this;


        const input = this.input ? (await this.input.eval(parse)).toValue() : null;


        this.counts = new ListValue();


        // if (this.cachedValue)
        //     this.value = this.cachedValue.copy();

        // else
        // {
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
                    this.value = input.copy();//.copy();
            }
            else
                this.value = ListValue.NaN.copy();


            // this.cachedValue = this.value.copy();
        // }
    

        this.updateValueObjects();


        this.setUpdateValues(parse, 
        [
            ['type',   this.outputListType()                   ],
            ['length', new NumberValue(this.value.items.length)]
        ]); 
               

        if (parse.settings.showListTooltips)
        {
            this.setUpdateValues(parse,
            [
                ['preview', new ListValue(this.value.items.slice(0, Math.min(this.value.items.length, 11)))]
            ],
            true);
        }


        this.validate();

        return this;
    }
}
