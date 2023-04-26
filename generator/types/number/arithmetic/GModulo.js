class GModulo
extends GArithmetic
{
    constructor(nodeId, options)
    {
        super(NUMBER_MODULO, nodeId, options);
    }


    
    copy()
    {
        const copy = new GModulo(this.nodeId, this.options);
        copy.copyBase(this);
        copy.inputs = this.inputs.map(i => i.copy());
        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;

        this.value = await evalModuloInputs(this.inputs, parse);

        genPushUpdateValue(parse, this.nodeId, 'value', this.value);

        this.validate();

        return this;
    }
}



async function evalModuloInputs(inputs, parse)
{
    if (isEmpty(inputs))
        return NumberValue.NaN;

        
    const value = new NumberValue(0);

        
    if (!isEmpty(inputs))
    {
        const val0 = (await inputs[0].eval(parse)).toValue();

        if (    LIST_VALUES.includes(val0.type)
            && !isEmpty(val0.items))
        {
            const item0 = val0.items[0];

            value.value    = item0.value;
            value.decimals = item0.decimals;

            for (let i = 1; i < val0.items.length; i++)
            {
                const item = val0.items[i];
                
                if (item.type == NUMBER_VALUE)
                {
                    if (item.value == 0) 
                    { 
                        value.value    = Number.NaN; 
                        value.decimals = 0;
                        break; 
                    }

                    value.decimals = Math.max(value.decimals, item.decimals);
                    value.value    = floorTo(value.value % item.value, value.decimals);
                }                    
            }
        }
        else
        {
            if (val0.type != NUMBER_VALUE)
                return NumberValue.NaN;

            value.value    = val0.value;
            value.decimals = val0.decimals;
        }


        for (let i = 1; i < inputs.length; i++)
        {
            const val = (await inputs[i].eval(parse)).toValue();

            if (LIST_VALUES.includes(val.type))
            {
                for (const item of val.items)
                {
                    if (item.type == NUMBER_VALUE)
                    {
                        if (item.value == 0) 
                        { 
                            value.value    = Number.NaN; 
                            value.decimals = 0;
                            break; 
                        }

                        value.decimals = Math.max(value.decimals, item.decimals);
                        value.value    = floorTo(value.value % item.value, value.decimals);
                    }                    
                }
            }
            else
            {
                console.assert(
                    val.type == NUMBER_VALUE, 
                    'val.type must be NUMBER_VALUE');

                if (val.value == 0) 
                { 
                    value.value    = Number.NaN; 
                    value.decimals = 0;
                    break; 
                }

                value.decimals = Math.max(value.decimals, val.decimals);
                value.value    = floorTo(value.value % val.value, value.decimals);
            }
        }
    }


    return value;
}