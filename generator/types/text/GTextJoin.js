class GTextJoin
extends GOperator
{
    static { GNode.types[TEXT_JOIN] = this; }



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


        const inputs = await Promise.all(this.inputs.map(async i => await evalTextOrListValue(i, parse)));
        const _with  = await evalTextValue(this.with, parse);


        this.value = await evalJoinInputs(inputs, _with, parse);

        
        this.setUpdateValues(parse,
        [
            ['type', this.outputType()],
            ['with',  _with           ]
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

        if (this.with) this.with.pushValueUpdates(parse);
    }



    invalidateInputs(parse, from, force)
    {
        super.invalidateInputs(parse, from, force);

        this.inputs.forEach(i => i.invalidateInputs(parse, from, force));

        if (this.with) this.with.invalidateInputs(parse, from, force);
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        this.inputs.forEach(i => i.iterateLoop(parse));

        if (this.with) this.with.iterateLoop(parse);
    }



    static parseRequest(parse, newNode)
    {
        const [type, nodeId, options, ignore] = genParseNodeStart(parse);


        const join = new GTextJoin(nodeId, options);


        let nInputs = 0;
        
        if (!ignore)
            nInputs = parseInt(parse.move());


        if (parse.settings.logRequests) 
            logReq(join, parse, ignore, nInputs);


        if (ignore) 
        {
            genParseNodeEnd(parse, join);
            return parse.parsedNodes.find(n => n.nodeId == nodeId);
        }


        parse.nTab++;


        for (let i = 0; i < nInputs; i++)
            join.inputs.push(genParse(parse));


        join.with = genParse(parse);

        
        parse.nTab--;

            
        genParseNodeEnd(parse, join);
        return join;
    }
}



async function evalJoinInputs(inputs, _with, parse)
{
    if (isEmpty(inputs))
        return new TextValue();


    const allAreLists = allInputsAreCondensedLists(inputs);
    const w           = escapeString(_with.value);

    if (allAreLists) return await evalJoinListInputs(inputs, w, parse);
    else             return await evalJoinItemInputs(inputs, w, parse);
}



async function evalJoinListInputs(inputs, _with, parse)
{
    const value = new ListValue();

    
    for (const input of inputs)
    {
        if (!input) continue;

        console.assert(
             isListValueType(input.type), 
            `input is ${input.type}, must be a list`);

        if (allInputsAreCondensedLists(input.items))
            value.items.push(...(await evalJoinListInputs(input.items, _with, parse)).items);
        else
            value.items.push(await evalJoinItemInputs(input.items, _with, parse));
    }


    return value;
}



async function evalJoinItemInputs(inputs, _with, parse)
{
    const value = new TextValue();

        
    for (let i = 0; i < inputs.length; i++)
    {
        const input = await evalTextOrListValue(inputs[i], parse);
        if (!input) continue;


        if (i > 0)
            value.value += _with;


        if (isListValueType(input.type))
        {
            for (let j = 0; j < input.items.length; j++)
            {
                if (j > 0)
                    value.value += _with;


                const item = input.items[j];

                if (item.type == TEXT_VALUE)
                    value.value += item.value;
            }
        }
        else
        {
            consoleAssert(input.type == TEXT_VALUE, 'val.type must be TEXT_VALUE');

            value.value += input.value;
        }
    }


    return value;
}