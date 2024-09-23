class GItems
extends GOperator1
{
    cachedValue = null;



    constructor(nodeId, options)
    {
        super(ITEMS, nodeId, options);
    }



    reset()
    {
        super.reset();

        this.cachedValue = null;
    }



    copy()
    {
        const copy = new GItems(this.nodeId, this.options);
        
        copy.copyBase(this);

        if (this.input) copy.input = this.input.copy();
        
        for (const key of this.keys())
        {
            if (this[key] instanceof GValue)
                Object.assign(copy, {[key]: this[key]});
        }

        return copy;
    }



    paramFromId(paramId)
    {
        let param =
               this.value
            && this.value.items
            && paramId != 'value'
            ? this.value.items.find(i => i.valueId == paramId)
            : null;

        if (!param)
            param = this[paramId];

        return param;
    }



    async eval(parse)
    {
        if (   this.isCached()
            && this.cachedValue)
            return this;


        const input = await evalListValue(this.input, parse); 


        if (this.cachedValue)
           this.value = this.cachedValue.copy();

        else
        {
            this.value       = input ?? new NullValue();
            this.cachedValue = this.value.copy();
        }


        this.updateValues = [];


        if (    this.value.isValid()
            &&  this.value.items
            && !isEmpty(this.value.items))
        {
            const valueIds = [];


            for (let i = 0; i < this.value.items.length; i++)
            {
                const item = this.value.items[i];
                
                let valueId = 
                    item.valueId.trim() != ''
                    ? item.valueId
                    : i.toString();

                valueId = getNewNumberId(
                    valueId,
                    id => valueIds.filter(_id => _id == id).length,
                    valueId,
                    '',
                    1,
                    true);

                valueIds.push(valueId);
            }


            for (let i = 0; i < this.value.items.length; i++)
            {
                let valueId = valueIds[i];

                const item = this.value.items[i];
                
                Object.assign(this, {[valueId]: item});
                this.setUpdateValues(parse, [[valueId, item]], true);

                item.sortId = i;
            }


            this.updateValues.sort((a, b) => a.sortId - b.sortId);


            this.setUpdateValues(parse, [['-type-', this.outputType()]], true);
        }
        else
            this.setUpdateValues(parse, [['-type-', new TextValue(LIST_VALUE)]], true);


        this.updateValueObjects();


        this.validate();

        return this;
    }
    
    

    toValue()
    {
        return this.value.copy();
    }



    iterateCache(parse, from)
    {
        this.cachedValue = null;
    }
}