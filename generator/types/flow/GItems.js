class GItems
extends GOperator
{
    input = null;

    //item0
    //item1
    //item2
    //...



    constructor(nodeId, options)
    {
        super(ITEMS, nodeId, options);
    }



    copy()
    {
        const copy = new GItems(this.nodeId, this.options);
        
        copy.copyBase(this);

        if (this.input) 
            copy.input = this.input.copy();
        
        for (const key of this.keys())
        {
            if (   key.length > 4
                && key.substring(0, 4) == 'item')
                Object.assign(copy, {[key]: this[key]});
        }

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        if (this.input)
        {
            //if (!this.input.value)
                await this.input.eval(parse);

            this.value   = this.input.toValue();
            this.objects = clone(this.input.objects);
        }
        else
        {
            this.value   = ListValue.NaN;
            this.objects = [];
        }


        this.updateValues = [];


        if (    this.value.isValid()
            && !isEmpty(this.value.items))
        {
            for (let i = 0; i < this.value.items.length; i++)
            {
                const item = this.value.items[i];

                Object.assign(this, {['item' + i]: item});
                this.updateValues.push(['item' + i, item]);
            }
        }
        else
            this.updateValues.push(['', NullValue]);


        this.updateValues.push(['value', this.value]);


        for (let j = 0; j < this.objects.length; j++)
            this.objects[j].nodeId = this.nodeId;


        this.validate();

        return this;
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.input) this.input.pushValueUpdates(parse);
    }



    paramFromId(paramId)
    {
        if (   paramId.length > 4
            && paramId.substring(0, 4) == 'item'
            && strIsNum(paramId.substring(4)))
            return this[paramId];

        return null;
    }



    toValue()
    {
        return this.value.copy();
    }



    invalidate()
    {
        super.invalidate();

        if (this.input) this.input.invalidate();
    }
}