class GDefine
extends GOperator
{
    inputs = [];


    iteration = 0;
    loopId    = NULL;



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
            

        const iteration = this.iteration++;


        this.value = _values[iteration % _values.length];


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



    invalidateInputs(from)
    {
        super.invalidateInputs(from);

        this.inputs.forEach(i => i.invalidateInputs(from));
    }



    invalidateLoop(parse, nodeId)
    {
        super.invalidateLoop(parse, nodeId);

        this.iteration = 0;
    }
}
