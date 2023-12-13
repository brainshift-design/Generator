class GList
extends GOperator1
{
    cachedValue = null;



    constructor(nodeId, options)
    {
        super(LIST, nodeId, options);
    }



    reset()
    {
        super.reset();

        this.cachedValue = null;
    }



    copy()
    {
        const copy = new GList(this.nodeId, this.options);
        
        copy.copyBase(this);

        if (this.input) 
            copy.input = this.input.copy();
        
        for (const key of this.keys())
        {
            if (this[key] instanceof GValue)
                Object.assign(copy, {[key]: this[key]});
        }

        return copy;
    }



    async eval(parse)
    {
        if (   this.isCached()
            && this.cachedValue)
            return this;


        const input = this.input ? (await this.input.eval(parse)).toValue() : null; 


        if (this.cachedValue)
           this.value = this.cachedValue.copy();

        else
        {
            this.value = input ?? new NullValue();
            this.cachedValue = this.value.copy();
        }


        this.updateValues = [];

        
        if (    this.value.isValid()
            &&  this.value.items
            && !isEmpty(this.value.items))
        {
            for (let i = 0; i < this.value.items.length; i++)
            {
                const item = this.value.items[i];
                
                let valueId = 
                    item.valueId.trim() != ''
                    ? item.valueId
                    : i.toString();

                valueId = getNewNumberId(
                    valueId,
                    id => this.value.items.find(i => 
                           i != item 
                        && i.valueId == id));

                Object.assign(this, {[valueId]: item});
                this.setUpdateValues(parse, [[valueId, item]], true);

                item.sortId = i;
            }

            this.updateValues.sort((a, b) => a.sortId - b.sortId);

            this.setUpdateValues(parse, [['-type-', this.outputType()]], true);
        }
        else
            this.setUpdateValues(parse, [['-type-', new TextValue(LIST_VALUE)]], true);


        // if (this.value.objects)
        //     for (let j = 0; j < this.value.objects.length; j++)
        //         this.value.objects[j].nodeId = this.nodeId;


        this.updateValueObjects();


        this.validate();

        return this;
    }
    
    

    paramFromId(paramId)
    {
        return this.value
            && this.value.items
            && paramId != 'value'
            ? this.value.items.find(i => i.valueId == paramId) //this[paramId]
            : null;
    }



    toValue()
    {
        return this.value.copy();
    }



    invalidateInputs(parse, from, force)
    {
        super.invalidateInputs(parse, from, force);
        
        //this.reset();
    }



    // iterateList(parse, from)
    // {
    //     this.reset();
    //     this.valid = false;
    // }
}