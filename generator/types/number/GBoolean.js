class GBoolean
extends GArithmetic
{
    static { GNode.types[NUMBER_BOOLEAN] = this; }



    operation;



    constructor(nodeId, options)
    {
        super(NUMBER_BOOLEAN, nodeId, options);
    }



    reset()
    {
        super.reset();

        this.operation = null;
    }


   
    copy()
    {
        const copy = new GBoolean(this.nodeId, this.options);

        copy.copyBase(this);

        copy.inputs    = this.inputs.map(i => i.copy());

        if (this.operation) copy.operation = this.operation.copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        let op = await evalNumberValue(this.operation, parse);

        if (op) op = op.toInteger();


        op.value     = 
        op.initValue = Math.min(Math.max(0, op.value), BOOLEAN_OPS.length-1);

        
        switch (op.value)
        {
            case BOOLEAN_NOT: this.value = await evalNandInputs(this.inputs, parse); break;
            case BOOLEAN_XOR: this.value = await evalXorInputs (this.inputs, parse); break;
            case BOOLEAN_OR:  this.value = await evalOrInputs  (this.inputs, parse); break;
            case BOOLEAN_AND: this.value = await evalAndInputs (this.inputs, parse); break;
        }

        
        this.setUpdateValues(parse,
        [
            ['operation', op]
        ]);


        this.validate();

        return this;
    }



    isValid()
    {
        return super.isValid()
            && this.operation && this.operation.isValid();
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.operation) this.operation.pushValueUpdates(parse);
    }



    invalidateInputs(parse, from, force)
    {
        super.invalidateInputs(parse, from, force);

        if (this.operation) this.operation.invalidateInputs(parse, from, force);
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        if (this.operation) this.operation.iterateLoop(parse);
    }



    static parseRequest(parse)
    {
        const [type, nodeId, options, ignore] = genParseNodeStart(parse);
    
    
        const bool = new GBoolean(nodeId, options);
    
        
        let nInputs = 0;
        
        if (!ignore)
            nInputs = parseInt(parse.move());
    
    
        if (parse.settings.logRequests) 
            logReq(bool, parse, ignore, nInputs);
    
    
        if (ignore) 
        {
            genParseNodeEnd(parse, bool);
            return parse.parsedNodes.find(n => n.nodeId == nodeId);
        }
    
    
        parse.nTab++;
    
        for (let i = 0; i < nInputs; i++)
            bool.inputs.push(genParse(parse));
    
    
        bool.operation = genParse(parse);
    
    
        parse.nTab--;
    
            
        genParseNodeEnd(parse, bool);
        return bool;
    }
}



async function evalAndInputs(inputs, parse)
{
    if (isEmpty(inputs))
        return NumberValue.NaN();


    const value = new NumberValue();


    if (!isEmpty(inputs))
    {
        const val0 = await evalNumberOrListValue(inputs[0], parse);
        if (!val0.isValid()) return NumberValue.NaN();


        if (    isListValueType(val0.type)
            && !isEmpty(val0.items))
        {
            const item0 = val0.items[0];

            value.value = item0.toNumber();

            for (let i = 1; i < val0.items.length; i++)
            {
                const item = val0.items[i];
                
                if (item.type == NUMBER_VALUE)
                    value.value = Math.min(value.value, item.toNumber());
            }
        }
        else
        {
            if (val0.type != NUMBER_VALUE)
                return NumberValue.NaN();

            value.value = val0.toNumber();
        }


        for (let i = 1; i < inputs.length; i++)
        {
            const val = await evalNumberOrListValue(inputs[i], parse);
            if (!val.isValid()) return NumberValue.NaN();


            if (isListValueType(val.type))
            {
                for (const item of val.items)
                {
                    if (item.type == NUMBER_VALUE)
                        value.value = Math.min(value.value, item.toNumber());
                }
            }
            else
            {
                consoleAssert(
                    val.type == NUMBER_VALUE, 
                    'val.type must be NUMBER_VALUE');

                value.value = Math.min(value.value, val.toNumber());
            }
        }


        if (value.value != 0)
            value.value = 1;
    }


    return value;
}



async function evalNandInputs(inputs, parse)
{
    if (isEmpty(inputs))
        return NumberValue.NaN();


    const value = new NumberValue();


    if (!isEmpty(inputs))
    {
        const val0 = await evalNumberOrListValue(inputs[0], parse);
        if (!val0.isValid()) return NumberValue.NaN();

        if (    isListValueType(val0.type)
            && !isEmpty(val0.items))
        {
            const item0 = val0.items[0];

            value.value = item0.toNumber() != 0 ? 0 : 1;

            for (let i = 1; i < val0.items.length; i++)
            {
                const item = val0.items[i];
                
                if (   item.type == NUMBER_VALUE
                    && item.toNumber() == 0)
                    value.value = 1;
            }
        }
        else
        {
            if (val0.type != NUMBER_VALUE)
                return NumberValue.NaN();

            value.value = val0.toNumber() != 0 ? 0 : 1;
        }


        for (let i = 1; i < inputs.length; i++)
        {
            const val = await evalNumberOrListValue(inputs[i], parse);
            if (!val.isValid()) return NumberValue.NaN();

            if (isListValueType(val.type))
            {
                for (const item of val.items)
                {
                    if (   item.type == NUMBER_VALUE
                        && item.toNumber() == 0)
                        value.value = 1;
                }
            }
            else
            {
                consoleAssert(
                    val.type == NUMBER_VALUE, 
                    'val.type must be NUMBER_VALUE');

                if (val.toNumber() == 0)
                    value.value = 1;
            }
        }
    }


    return value;
}



async function evalOrInputs(inputs, parse)
{
    if (isEmpty(inputs))
        return NumberValue.NaN();


    const value = new NumberValue();


    if (!isEmpty(inputs))
    {
        const val0 = await evalNumberOrListValue(inputs[0], parse);
        if (!val0.isValid()) return NumberValue.NaN();

        if (    isListValueType(val0.type)
            && !isEmpty(val0.items))
        {
            const item0 = val0.items[0];

            value.value = item0.toNumber();

            for (let i = 1; i < val0.items.length; i++)
            {
                const item = val0.items[i];
                
                if (item.type == NUMBER_VALUE)
                    value.value = Math.max(value.value, item.toNumber());
            }
        }
        else
        {
            if (val0.type != NUMBER_VALUE)
                return NumberValue.NaN();

            value.value = val0.toNumber();
        }


        for (let i = 1; i < inputs.length; i++)
        {
            const val = await evalNumberOrListValue(inputs[i], parse);
            if (!val.isValid()) return NumberValue.NaN();

            if (isListValueType(val.type))
            {
                for (const item of val.items)
                {
                    if (item.type == NUMBER_VALUE)
                        value.value = Math.max(value.value, item.toNumber());
                }
            }
            else
            {
                consoleAssert(
                    val.type == NUMBER_VALUE, 
                    'val.type must be NUMBER_VALUE');
                    
                value.value = Math.max(value.value, val.toNumber());
            }
        }


        if (value.value != 0)
            value.value = 1;
    }


    return value;
}



async function evalXorInputs(inputs, parse)
{
    if (isEmpty(inputs))
        return NumberValue.NaN();


    const value = new NumberValue(0);


    let flipped;

    if (!isEmpty(inputs))
    {
        const val0 = await evalNumberOrListValue(inputs[0], parse);
        if (!val0.isValid()) return NumberValue.NaN();

        if (    isListValueType(val0.type)
            && !isEmpty(val0.items))
        {
            const item0 = val0.items[0];

            flipped = item0.toNumber() != 0;

            for (let i = 1; i < val0.items.length; i++)
            {
                const item = val0.items[i];
                
                if (   item.type == NUMBER_VALUE
                    && item.toNumber() != 0)
                    flipped++;
            }
        }
        else
        {
            if (val0.type != NUMBER_VALUE)
                return NumberValue.NaN();

            flipped = val0.toNumber() != 0;
        }


        for (let i = 1; i < inputs.length; i++)
        {
            const val = await evalNumberOrListValue(inputs[i], parse);
            if (!val.isValid()) return NumberValue.NaN();

            if (isListValueType(val.type))
            {
                for (const item of val.items)
                {
                    if (   item.type == NUMBER_VALUE
                        && item.toNumber() != 0)
                        flipped++;
                    }
            }
            else
            {
                consoleAssert(
                    val.type == NUMBER_VALUE, 
                    'val.type must be NUMBER_VALUE');
                    
                if (val.toNumber() != 0)
                    flipped++;
            }
        }


        value.value = flipped == 1 ? 1 : 0;
    }


    return value;
}