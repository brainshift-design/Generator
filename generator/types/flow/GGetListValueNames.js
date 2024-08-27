class GGetListValueNames
extends GOperator1
{
    // cachedValue = null;



    constructor(nodeId, options)
    {
        super(GET_LIST_VALUE_NAMES, nodeId, options);
    }


    
    reset()
    {
        super.reset();

        // this.cachedValue = null;
    }



    copy()
    {
        const copy = new GGetListValueNames(this.nodeId, this.options);

        copy.copyBase(this);

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        const input = await evalListValue(this.input, parse);


        this.counts = new ListValue();


        if (   input
            && input.items)
        {
            if (this.options.enabled)
            {
                this.value = new ListValue();
                this.value.objects = [];

                for (let i = 0; i < input.items.length; i++)
                    this.value.items.push(new TextValue(input.items[i].valueId));

                if (input.objects)
                {
                    for (let i = 0; i < input.objects.length; i++)
                        this.value.objects.push(input.objects[i]);
                }
            }
            else
                this.value = input.copy();
        }
        else
            this.value = new ListValue();


        this.updateValueObjects();


        this.setUpdateValues(parse, 
        [
            ['type',   new TextValue(TEXT_LIST_VALUE)          ],
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
