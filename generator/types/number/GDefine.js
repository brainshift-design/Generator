class GDefine
extends GOperator
{
    inputs = [];


    loopId = NULL;



    constructor(nodeId, options)
    {
        super(NUMBER_DEFINE, nodeId, options);
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
            const val = (await this.inputs[i].eval(parse)).toValue();
    
            if (LIST_VALUES.includes(val.type))
            {
                if (  !isEmpty(val.items)
                    && val.items[0].type != NUMBER_VALUE)
                {
                    for (const item of val.items)
                    {
                        if (item.type == NUMBER_VALUE)
                            _values.push(item);
                    }
                }
            }
            else
            {
                consoleAssert(
                    val.type == NUMBER_VALUE, 
                    'val.type must be NUMBER_VALUE');
 
                _values.push(val);
            }
        }
            

        const repeat    = parse.repeats.find(r => r.repeatId == this.loopId);
        const iteration = repeat ? repeat.iteration : this.iteration;
 

        this.value = _values[iteration % _values.length];


        this.updateValues = [['', NullValue]];
        

        this.validate();

        return this;
    }



    toValue()
    {
        return this.value
             ? this.value.copy()
             : null;
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
}
