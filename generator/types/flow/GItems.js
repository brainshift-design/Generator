class GItems
extends GOperator
{
    input = null;



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
            if (this[key] instanceof GValue)
            //    key.length > 4
            //    && key.substring(0, 4) == 'item')
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
            await this.input.eval(parse);

            this.value   = this.input.toValue();
            this.objects = this.input.objects.map(o => o.copy());

            console.log('this.input =', this.input);
            //console.log('this.value =', this.value.toString());
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

                const valueId = 
                    item.valueId != ''
                    ? item.valueId
                    : 'item' + i;

                Object.assign(this, {[valueId]: item});
                this.updateValues.push([valueId, item]);
            }
        }
        else
            this.updateValues.push(['', NullValue]);


        this.updateValues.push(['value', this.value]); // first so it can be separated out in OpItems


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
        return paramId != 'value'
              ? this[paramId]
              : null;
        // if (   paramId.length > 4
        //     && paramId.substring(0, 4) == 'item'
        //     && strIsNum(paramId.substring(4)))
        //     return this[paramId];

        // return null;
    }



    toValue()
    {
        return this.value.copy();
    }



    invalidateInputs()
    {
        super.invalidateInputs();

        if (this.input) this.input.invalidateInputs();
    }
}