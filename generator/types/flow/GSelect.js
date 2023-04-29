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



    async eval(parse)
    {
        if (this.isCached())
            return this;


        let index = (await this.index.eval(parse)).toValue();


        this.objects = [];

        let length   = 0;


        if (this.input)
        {
            const input = (await this.input.eval(parse)).toValue();

            length = input.items.length;


            if (length > 0)
            {
                index.value = Math.min(index.value, input.items.length-1);

                index = 
                    index.isValid()
                    ? new NumberValue(Math.round(index.value))
                    : new NumberValue(0);

                this.value = input.items[index.value];

                
                const _objects = this.input.objects.filter(o => o.listId == index.value);

                for (let j = 0; j < _objects.length; j++)
                {
                    const obj = _objects[j].copy();

                    obj.nodeId   = this.nodeId;
                    obj.objectId = (index.value+1) * Math.pow(10, getDigitCount(length)) + (j+1);
                    obj.listId   = -1;

                    this.objects.push(obj);
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


        genPushUpdateValue(parse, this.nodeId, 'value',  this.value);
        genPushUpdateValue(parse, this.nodeId, 'length', new NumberValue(length));
        genPushUpdateValue(parse, this.nodeId, 'index',  index);


        this.validate();

        return this;
    }



    toValue()
    {
        return this.value.copy();
    }



    invalidate()
    {
        super.invalidate();

        if (this.input) this.input.invalidate();
        if (this.index) this.index.invalidate();
    }
}