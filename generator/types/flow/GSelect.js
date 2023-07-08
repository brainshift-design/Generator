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


        let index = (await this.index.eval(parse)).toValue();


        let length   = 0;


        if (this.input)
        {
            const input = (await this.input.eval(parse)).toValue();


            if (   !!input
                && !!input.items
                &&   input.items.length > 0)
            {
                length = input.items.length;


                // index.value = Math.min(Math.max(0, index.value), input.items.length-1);

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
                    this.value.objects = [];

                
                    const _objects = this.input.value.objects.filter(o => o.listId == index.value);

                    for (let j = 0; j < _objects.length; j++)
                    {
                        const obj  = _objects[j].copy();

                        obj.nodeId = this.nodeId;
                        obj.listId = -1;

                        if (obj.objectId != NULL) 
                            obj.objectId += '/';

                        obj.objectId += index.value.toString();

                        
                        this.value.objects.push(obj);
                    }
                }
                else
                {
                    this.value = NullValue;
                    index      = NumberValue.NaN;
                }                    
                //console.log('GSelect.value =', this.value);
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


        this.updateValues =
        [
            ['value',  this.value             ],
            ['length', new NumberValue(length)],
            ['index',  index                  ]
        ];


        this.validate();

        return this;
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.input) this.input.pushValueUpdates(parse);
        if (this.index) this.index.pushValueUpdates(parse);
    }



    toValue()
    {
        return this.value
             ? this.value.copy()
             : null;
    }



    invalidateInputs(from)
    {
        super.invalidateInputs(from);

        if (this.input) this.input.invalidateInputs(from);
        if (this.index) this.index.invalidateInputs(from);
    }
}