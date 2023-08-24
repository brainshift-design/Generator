class GDefine
extends GOperator
{
    inputs = [];



    constructor(nodeId, options)
    {
        super(DEFINE, nodeId, options);
    }


    
    copy()
    {
        const copy = new GDefine(this.nodeId, this.options);

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
            const input = (await this.inputs[i].eval(parse)).toValue();

            if (   input
                && this.options.enabled)            
            {
                if (LIST_VALUES.includes(input.type))
                {
                    for (const item of input.items)
                        _values.push(item.copy());   
                }
                else
                    _values.push(input.copy());
            }
        }
            

        this.value = _values[this.iteration % _values.length];


        this.setUpdateValues(parse,
        [
            ['type', new TextValue(finalTypeFromItems(_values))]
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



    invalidateInputs(parse, from)
    {
        super.invalidateInputs(parse, from);

        this.inputs.forEach(i => i.invalidateInputs(parse, from));
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        this.inputs.forEach(i => i.iterateLoop(parse));
    }
}
