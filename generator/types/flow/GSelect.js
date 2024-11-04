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

        const _inputs = await Promise.all(this.inputs.map(async i => await evalValue(i, parse)));
        let    index  = await evalNumberValue(this.index, parse);
        let    length = 0;


        const inputs = [];

        for (const input of _inputs)
        {
            if (    isListValueType(input.type)
                && !input.condensed)
            {
                for (const item of input.items)
                    inputs.push(item);
            }
            else
                inputs.push(input);
        }


        if (inputs.length > 0)
        {
            length = inputs.length;


            index = 
                   index.isValid()
                && index.value >= -inputs.length
                && index.value <   inputs.length
                ? new NumberValue(Math.round(index.value))
                : new NumberValue(0);
            

            if (   index.isValid()
                && index.value >= -inputs.length
                && index.value <   inputs.length)
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

                        if (this.value.objects.length > 1)
                        {
                            obj.objectId += '/';
                            obj.objectId += i.toString();
                        }
                    }
                }
            }
            else
            {
                this.value = new NullValue();
            }
        }
        else
        {
            this.value = new NullValue();
        }

        
        const type = this.outputType();

        this.setUpdateValues(parse,
        [
            ['value',      type == COLOR_VALUE 
                        || type == FILL_VALUE 
                        ? this.value 
                        : new NullValue()      ],
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
        else if (isListValueType(type.value) && parse.settings.showListTooltips)
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