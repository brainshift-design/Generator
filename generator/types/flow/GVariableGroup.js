class GVariableGroup
extends GOperator
{
    input = null;



    constructor(nodeId, options)
    {
        super(VARIABLE_GROUP, nodeId, options);
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
        if (this.isCached())
            return this;


        this.value = this.input ? (await this.input.eval(parse)).toValue() : ListValue.NaN.copy();


        this.updateValues = [];

        
        // if (    this.value.isValid()
        //     && !isEmpty(this.value.items))
        // {
        //     for (let i = 0; i < this.value.items.length; i++)
        //     {
        //         const item = this.value.items[i];
                
        //         let valueId = 
        //             item.valueId.trim() != ''
        //             ? item.valueId
        //             : i.toString();

        //         valueId = getNewNumberId(
        //             valueId,
        //             id => this.value.items.find(i => 
        //                    i != item 
        //                 && i.valueId == id));

        //         Object.assign(this, {[valueId]: item});
        //         this.setUpdateValues(parse, [[valueId, item]], true);

        //         item.sortId = i;
        //     }

        //     this.updateValues.sort((a, b) => a.sortId - b.sortId);
        // }
        // else
            this.setUpdateValues(parse, [['', new NullValue()]], true);


        // if (this.value.objects)
        //     for (let j = 0; j < this.value.objects.length; j++)
        //         this.value.objects[j].nodeId = this.nodeId;


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



    isValid()
    {
        return this.input && this.input.isValid();
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.input) this.input.pushValueUpdates(parse);
    }



    invalidateInputs(parse, from, force)
    {
        super.invalidateInputs(parse, from, force);

        if (this.input) this.input.invalidateInputs(parse, from, force);
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        if (this.input) this.input.iterateLoop(parse);
    }
}