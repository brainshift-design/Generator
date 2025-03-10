class GGetParam
extends GOperator1
{
    static { GNode.types[GET_PARAM] = this; }



    name = null;


    
    constructor(nodeId, options)
    {
        super(GET_PARAM, nodeId, options);
    }


    
    reset()
    {
        super.reset();

        this.name  = null;
    }



    copy()
    {
        const copy = new GGetParam(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.name) copy.name = this.name.copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        const input = await evalValue    (this.input, parse);
        const name  = await evalTextValue(this.name,  parse);


        if (   input
            && name
            && name.value.trim() != '')
        {
            if (this.options.enabled)
            {
                if (isListValueType(input.type))
                {
                    this.value = new ListValue();

                    for (let i = 0; i < input.items.length; i++)
                        this.value.items.push(getGetParamValue(input.items[i], name));
                }
                else
                    this.value = getGetParamValue(input, name);
            }
            else
                this.value = input.copy();
        }
        else
        {
            this.value = new NullValue();
        }


        this.updateValueObjects();


        const type = this.outputType();
        
        this.setUpdateValues(parse,
        [
            ['value', this.value],
            ['type',  type      ],
            ['name',  name      ]
        ]);
        

        if (type.value == TEXT_VALUE && parse.settings.showTextTooltips)
        {
            this.setUpdateValues(parse,
            [
                ['preview', this.value]
            ],
            true);
        }
        else if (isListValueType(type.value)   && parse.settings.showListTooltips)
        {
            this.setUpdateValues(parse,
            [
                ['preview', new ListValue(this.value.items.slice(0, Math.min(this.value.items.length, 11)))]
            ],
            true);
        }


        this.validate();

        return this;
    }



    isValid()
    {
        return super.isValid()
            && this.name && this.name.isValid();
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.name) this.name.pushValueUpdates(parse);
    }



    invalidateInputs(parse, from, force)
    {
        super.invalidateInputs(parse, from, force);

        if (this.name) this.name.invalidateInputs(parse, from, force);
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        if (this.name) this.name.iterateLoop(parse);
    }



    static parseRequest(parse)
    {
        const [, nodeId, options, ignore] = genParseNodeStart(parse);
    
    
        const extr = new GGetParam(nodeId, options);
       
    
        let nInputs = -1;
        
        if (!ignore)
        {
            nInputs = parseInt(parse.move());
            consoleAssert(nInputs == 0 || nInputs == 1, 'nInputs must be [0, 1]');
        }
    
        
        if (parse.settings.logRequests) 
            logReq(extr, parse, ignore, nInputs);
    
    
        if (ignore) 
        {
            genParseNodeEnd(parse, extr);
            return parse.parsedNodes.find(n => n.nodeId == nodeId);
        }
    
    
        parse.nTab++;
    
    
        if (nInputs == 1)
            extr.input = genParse(parse);
    
        extr.name = genParse(parse);
    
        
        parse.nTab--;
    
    
        genParseNodeEnd(parse, extr);
        return extr;
    }
}



function getGetParamValue(input, name)
{
    let nameValue = name.value.trim();


    if (    input
        && !input[nameValue])
    {
             if (input[name.value.toUpperCase()]) nameValue = name.value.toUpperCase();
        else if (input[name.value.toLowerCase()]) nameValue = name.value.toLowerCase();
    }


    let value = null;

    if (   input
        && input[nameValue])
    {
        value = input[nameValue];//.copy();
    }
    else
    {
        const customIndex = input.customParams.findIndex(p => p[0] == nameValue);

        value =
            customIndex > -1
            ? input.customParams[customIndex][1]//.copy()
            : new NullValue();
    }


    if (   input
        && input[nameValue]
        && input[nameValue].objects 
        && this.value.objects)
        value.objects.push(...input[nameValue].objects);


    return value;
}