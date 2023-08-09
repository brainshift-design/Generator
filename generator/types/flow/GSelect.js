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


        if (   this.input
            && index
            && index.isValid())
        {
            const input = (await this.input.eval(parse)).toValue();


            if (   input
                && input.items
                && input.items.length > 0)
            {
                length = input.items.length;


                index = 
                       index.isValid()
                    && index.value >= 0
                    && index.value <  input.items.length
                    ? new NumberValue(Math.round(index.value))
                    : new NumberValue(0);


                if (   index.isValid()
                    && index.value >= 0
                    && index.value < input.items.length)
                {
                    this.value = input.items[index.value].copy();
                
                    for (const obj of this.value.objects)
                    {
                        obj.nodeId = this.nodeId;
                        obj.listId = -1;

                        if (obj.objectId != NULL) 
                            obj.objectId += '/';

                        obj.objectId += index.value.toString();
                    }
                }
                else
                {
                    this.value = NullValue;
                    index      = NumberValue.NaN;
                }                    
            }
            else
            {
                this.value = NullValue;
                index      = NumberValue.NaN;
            }
        }
        else
        {
            this.value = null;//NullValue;
            index      = null;//NumberValue.NaN;
        }


        this.setUpdateValues(parse,
        [
            ['type',   this.value ? new TextValue(this.value.type) : null],
            ['length', new NumberValue(length)                           ],
            ['index',  index                                             ]
        ]);


        this.validate();

        return this;
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.input) this.input.pushValueUpdates(parse);
        if (this.index) this.index.pushValueUpdates(parse);
    }



    invalidateInputs(from)
    {
        super.invalidateInputs(from);

        if (this.input) this.input.invalidateInputs(from);
        if (this.index) this.index.invalidateInputs(from);
    }
}