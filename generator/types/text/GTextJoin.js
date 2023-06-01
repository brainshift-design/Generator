class GTextJoin
extends GTextType
{
    inputs = [];

    with;


    
    constructor(nodeId, options)
    {
        super(TEXT_JOIN, nodeId, options);
    }


    
    copy()
    {
        const copy = new GTextJoin(this.nodeId, this.options);
        copy.copyBase(this);
        
        copy.inputs = this.inputs.map(i => i.copy());
        copy.with   = this.with;

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        const _with = (await this.with.eval(parse)).toValue();

        this.value = await evalJoinInputs(this.inputs, _with, parse);

        
        this.updateValues = 
        [
            ['value', this.value],
            ['with',  _with     ]
        ];


        this.validate();

        return this;
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



async function evalJoinInputs(inputs, _with, parse)
{
    if (isEmpty(inputs))
        return new TextValue();//TextValue.NaN;


    const value = new TextValue();


    for (let i = 0; i < inputs.length; i++)
    {
        if (i > 0)
            value.value += _with.value;

            
        const val = (await inputs[i].eval(parse)).toValue();

        if (LIST_VALUES.includes(val.type))
        {
            for (let j = 0; j < val.items.length; j++)
            {
                if (j > 0)
                    value.value += _with.value;


                const item = val.items[j];

                if (item.type == TEXT_VALUE)
                    value.value += item.value;
            }
        }
        else
        {
            console.assert(
                val.type == TEXT_VALUE, 
                'val.type must be TEXT_VALUE');

            value.value += val.value;
        }
    }


    return value;
}