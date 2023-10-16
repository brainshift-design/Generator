class GTextJoin
extends GOperator
{
    inputs = [];

    with = null;


    
    constructor(nodeId, options)
    {
        super(TEXT_JOIN, nodeId, options);
    }



    reset()
    {
        super.reset();

        this.inputs = [];
        
        this.with = null;
    }


   
    copy()
    {
        const copy = new GTextJoin(this.nodeId, this.options);
        copy.copyBase(this);
        
        copy.inputs = this.inputs.map(i => i.copy());
        copy.with   = this.with;

        return copy;
    }



    isCached()
    {
        for (const input of this.inputs)
            if (!input.isCached())
                return false;

        return super.isCached();
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        const _with = (await this.with.eval(parse)).toValue();

        this.value = await evalJoinInputs(this.inputs, _with, parse);

        
        this.setUpdateValues(parse,
        [
            ['value', this.value],
            ['with',  _with     ]
        ]);


        this.validate();

        return this;
    }



    isValid()
    {
        return !this.inputs.find(i => !i.isValid())
            && this.with && this.with.isValid();
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



async function evalJoinInputs(inputs, _with, parse)
{
    if (isEmpty(inputs))
        return new TextValue();//TextValue.NaN;


    const value = new TextValue();
    const w     = unescapeString(_with.value);

    for (let i = 0; i < inputs.length; i++)
    {
        const val = (await inputs[i].eval(parse)).toValue();
        if (!val) continue;


        if (i > 0)
            value.value += w;


        if (isListType(val.type))
        {
            for (let j = 0; j < val.items.length; j++)
            {
                if (j > 0)
                    value.value += w;


                const item = val.items[j];

                if (item.type == TEXT_VALUE)
                    value.value += item.value;
            }
        }
        else
        {
            consoleAssert(val.type == TEXT_VALUE, 'val.type must be TEXT_VALUE');

            value.value += val.value;
        }
    }


    return value;
}