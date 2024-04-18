class GBuckleList
extends GOperator1
{
    amount;



    constructor(nodeId, options)
    {
        super(BUCKLE_LIST, nodeId, options);
    }


    
    reset()
    {
        super.reset();

        this.buckle = null;
    }



    copy()
    {
        const copy = new GBuckleList(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.amount) copy.amount = this.amount.copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        const input  = await evalListValue  (this.input,  parse);
        const amount = await evalNumberValue(this.amount, parse);


        this.counts = new ListValue();


        if (input)
        {
            if (this.options.enabled)
            {
                this.value = new ListValue();
                this.value.objects = [];

                for (let i = input.items.length-1; i >= 0; i--)
                    this.value.items.push(input.items[i]);

                if (input.objects)
                {
                    for (let i = input.objects.length-1; i >= 0; i--)
                        this.value.objects.push(input.objects[i]);
                }
            }
            else
                this.value = input;
        }
        else
            this.value = ListValue.NaN.copy();
    

        // this.updateValueObjects();


        this.setUpdateValues(parse, 
        [
            //['type',   this.outputListType()                   ],
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
