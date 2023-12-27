class GSelect
extends GOperator
{
    inputs = [];

    index = null;


    
    constructor(nodeId, options)
    {
        super(SELECT, nodeId, options);
    }



    reset()
    {
        super.reset();

        this.inputs = [];
        
        this.index = null;
    }


   
    copy()
    {
        const copy = new GSelect(this.nodeId, this.options);

        copy.copyBase(this);
        
        copy.inputs = this.inputs.map(i => i.copy());

        if (this.index) copy.index = this.index.copy();
        if (this.value) copy.value = this.value.copy();

        return copy;
    }



    isCached()
    {
        for (const input of this.inputs)
            if (!input.isCached())
                return false;

        return super.isCached();
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;

        let index  = this.index ? (await this.index.eval(parse)).toValue() : null;
        let length = 0;


        const inputs = [];

        for (let i = 0; i < this.inputs.length; i++)
            inputs.push((await this.inputs[i].eval(parse)).toValue());


        if (   index
            && inputs.length > 0)
        {
            length = inputs.length;


            index = 
                   index.isValid()
                && index.value > -inputs.length
                && index.value <  inputs.length
                ? new NumberValue(Math.round(index.value))
                : new NumberValue(0);
            

            if (   index.isValid()
                && index.value > -inputs.length
                && index.value <  inputs.length)
            {
                this.value = inputs.at(index.value);

                if (this.value.objects)
                {
                    for (let i = 0; i < this.value.objects.length; i++)
                    {
                        const obj = this.value.objects[i];

                        obj.nodeId = this.nodeId;
                        obj.listId = -1;

                        obj.objectId = this.nodeId;
                        
                        if (obj.objectId != NULL) 
                            obj.objectId += '/';

                        obj.objectId += index.value.toString();
                    }
                }
            }
            else
            {
                this.value = new NullValue();
                index      = NumberValue.NaN;
            }
        }
        else
        {
            this.value = new NullValue();
            index      = NumberValue.NaN;
        }

        
        const type = this.outputType();

        this.setUpdateValues(parse,
        [
            ['value',      type == COLOR_VALUE 
                        || type == FILL_VALUE 
                        ? this.value 
                        : new NullValue()],
            ['type',    type                   ],
            ['length',  new NumberValue(length)],
            ['index',   index                  ]
        ]);


        if (type.value == TEXT_VALUE && parse.settings.showTextTooltips)
        {
            this.setUpdateValues(parse,
            [
                ['preview', this.value]
            ],
            true);
        }
        else if (isListType(type.value) && parse.settings.showListTooltips)
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



    isValid()
    {
        return !this.inputs.find(i => !i.isValid())
            &&  this.index && this.index.isValid();
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        this.inputs.forEach(i => i.pushValueUpdates(parse));

        if (this.index) this.index.pushValueUpdates(parse);
    }



    invalidateInputs(parse, from, force)
    {
        super.invalidateInputs(parse, from, force);

        this.inputs.forEach(i => i.invalidateInputs(parse, from, force));

        if (this.index) this.index.invalidateInputs(parse, from, force);
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        this.inputs.forEach(i => i.iterateLoop(parse));

        if (this.index) this.index.iterateLoop(parse);
    }
}