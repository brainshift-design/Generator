class GTextJoin
extends GTextType
{
    inputs = [];


    
    constructor(nodeId, options)
    {
        super(TEXT_JOIN, nodeId, options);
    }


    
    copy()
    {
        const copy = new GTextJoin(this.nodeId, this.options);
        copy.copyBase(this);
        copy.inputs = this.inputs.map(i => i.copy());
        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        this.value = await evalJoinInputs(this.inputs, parse);
        
        genPushUpdateValue(parse, this.nodeId, 'value', this.value);


        this.validate();

        return this;
    }
}



async function evalJoinInputs(inputs, parse)
{
    if (isEmpty(inputs))
        return new TextValue();//TextValue.NaN;


    const value = new TextValue();


    for (let i = 0; i < inputs.length; i++)
    {
        const val = (await inputs[i].eval(parse)).toValue();

        if (LIST_VALUES.includes(val.type))
        {
            for (const item of val.items)
        {
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