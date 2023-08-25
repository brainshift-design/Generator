class GList
extends GOperator
{
    input = null;



    constructor(nodeId, options)
    {
        super(LIST, nodeId, options);
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


        this.value = this.input ? (await this.input.eval(parse)).toValue() : ListValue.NaN;


        this.updateValues = [];

        
        if (    this.value.isValid()
            && !isEmpty(this.value.items))
        {
            // console.log('this.value.items =', this.value.items);
            console.log('this.value.items.length =', this.value.items.length);
            for (let i = 0; i < this.value.items.length; i++)
            {
                const item = this.value.items[i];
                // console.log('item =', item);
                
                let valueId = 
                    item.valueId.trim() != ''
                    ? item.valueId
                    : i.toString();
                // console.log('valueId =', valueId);

                valueId = getNewNumberId(
                    valueId,
                    id => this.value.items.find(i => 
                           i != item 
                        && i.valueId == id));
                // console.log('valueId =', valueId);

                Object.assign(this, {[valueId]: item});
                // console.log('1');
                this.setUpdateValues(parse, [[valueId, item]], true);
                // console.log('2');

                item.sortId = i;
                // console.log('3');
                // console.log('');
            }

            this.updateValues.sort((a, b) => a.sortId - b.sortId);
        }
        else
            this.setUpdateValues(parse, [['', NullValue]], true);


        console.log('this.value =', this.value);
        //this.updateValues.push(['value', this.value]); // first so it can be separated out in OpList


        if (this.value.objects)
            for (let j = 0; j < this.value.objects.length; j++)
                this.value.objects[j].nodeId = this.nodeId;


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



    invalidateInputs(parse, from)
    {
        super.invalidateInputs(parse, from);

        if (this.input) this.input.invalidateInputs(parse, from);
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        if (this.input) this.input.iterateLoop(parse);
    }
}