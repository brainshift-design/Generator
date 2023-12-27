class GSelectFromList
extends GOperator1
{
    index = null;



    constructor(nodeId, options)
    {
        super(SELECT_FROM_LIST, nodeId, options);
    }



    reset()
    {
        super.reset();

        this.index = null;
    }



    copy()
    {
        const copy = new GSelectFromList(this.nodeId, this.options);
        
        copy.copyBase(this);

        if (this.input) copy.input = this.input.copy();
        if (this.index) copy.index = this.index.copy();
        if (this.value) copy.value = this.value.copy();

        return copy;
    }



    isCached()
    {
        return super.isCached()
            && (  !this.input 
                || this.input.isCached());
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        let index  = this.index ? (await this.index.eval(parse)).toValue() : null;
        let length = 0;


        const input = this.input ? (await this.input.eval(parse)).toValue() : null;
            
        if (   index
            && input
            && input.items
            && input.items.length > 0)
        {
            length = input.items.length;


            index = 
                    index.isValid()
                && index.value > -input.items.length
                && index.value <  input.items.length
                ? new NumberValue(Math.round(index.value))
                : new NumberValue(0);
            

            if (   index.isValid()
                && index.value > -input.items.length
                && index.value <  input.items.length)
            {
                this.value = input.items.at(index.value);

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
        return super.isValid()
            && this.index && this.index.isValid();
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.index) this.index.pushValueUpdates(parse);
    }



    invalidateInputs(parse, from, force)
    {
        super.invalidateInputs(parse, from, force);

        if (this.index) this.index.invalidateInputs(parse, from, force);
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        if (this.index) this.index.iterateLoop(parse);
    }
}