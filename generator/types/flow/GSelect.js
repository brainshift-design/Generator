class GSelect
extends GOperator
{
    input = null;
    
    index;



    constructor(nodeId, options)
    {
        super(SELECT, nodeId, options);
    }



    copy()
    {
        const copy = new GSelect(this.nodeId, this.options);
        
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


        let index = this.index ? (await this.index.eval(parse)).toValue() : null;


        let length = 0;


        if (this.input)
        {
            const input = (await this.input.eval(parse)).toValue();
            

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
                    this.value = NullValue.copy();
                    index      = NumberValue.NaN;
                }
            }
            else
            {
                this.value = NullValue.copy();
                index      = NumberValue.NaN;
            }
        }
        else
        {
            this.value = NullValue.copy();
            index      = NumberValue.NaN;
        }


        this.setUpdateValues(parse,
        [
            ['preview', this.value             ],
            ['type',    this.outputType()      ],
            ['length',  new NumberValue(length)],
            ['index',   index                  ]
        ]);


        this.validate();

        return this;
    }



    isValid()
    {
        return this.input && this.input.isValid()
            && this.index && this.index.isValid();
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.input) this.input.pushValueUpdates(parse);
        if (this.index) this.index.pushValueUpdates(parse);
    }



    invalidateInputs(parse, from, force)
    {
        super.invalidateInputs(parse, from, force);

        if (this.input) this.input.invalidateInputs(parse, from, force);
        if (this.index) this.index.invalidateInputs(parse, from, force);
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        if (this.input) this.input.iterateLoop(parse);
        if (this.index) this.index.iterateLoop(parse);
    }
}