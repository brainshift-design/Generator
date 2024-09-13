class GIterate
extends GOperator
{
    inputs = [];



    constructor(nodeId, options)
    {
        super(ITERATE, nodeId, options);
    }


    
    reset()
    {
        super.reset();

        this.input = [];
    }



    copy()
    {
        const copy = new GIterate(this.nodeId, this.options);

        copy.copyBase(this);

        copy.inputs = this.inputs.map(i => i.copy());

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        const _values = [];

        for (let i = 0; i < this.inputs.length; i++)
        {
            const input = await evalValue(this.inputs[i], parse);

            if (   input
                && this.options.enabled)            
            {
                if (isListValueType(input.type))
                {
                    if (input.condensed === true)
                        _values.push(input.copy());
                    else
                    {
                        for (const item of input.items)
                            _values.push(item.copy());   
                    }
                }
                else
                    _values.push(input.copy());
            }
        }
            

        this.value = 
            _values.length > 0
                ? _values[this.currentIteration % _values.length]
                : new NullValue();


        if (   this.value 
            && this.value.objects)
        {
            for (let i = 0; i < this.value.objects.length; i++)
            {
                const obj = this.value.objects[i];
    
                obj.nodeId = this.nodeId;
                obj.listId = -1;
    
                obj.objectId = this.nodeId;
                
                if (obj.objectId != NULL) 
                    obj.objectId += '/';
    
                obj.objectId += i.toString();
            }
        }


        this.evalObjects(parse);
        

        const type =
               _values.length > 1
            && finalListTypeFromValues(_values) == LIST_VALUE
                ? new TextValue(ANY_VALUE)
                : this.outputType();


        this.setUpdateValues(parse,
        [
            ['type', type]
        ]);
        

        this.validate();

        return this;
    }



    toValue()
    {
        return this.value
             ? this.value.copy()
             : null;
    }



    isValid()
    {
        return !this.inputs.find(i => !i.isValid());
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        this.inputs.forEach(i => i.pushValueUpdates(parse));
    }



    invalidateInputs(parse, from, force)
    {
        super.invalidateInputs(parse, from, force);

        this.inputs.forEach(i => i.invalidateInputs(parse, from, force));
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        this.inputs.forEach(i => i.iterateLoop(parse));
    }
}
