class GTextCase
extends GOperator1
{
    case;


    
    constructor(nodeId, options)
    {
        super(TEXT_CASE, nodeId, options);
    }


    
    reset()
    {
        super.reset();

        this.case = null;
    }



    copy()
    {
        const copy = new GTextCase(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.case) copy.case = this.case.copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        const input = await evalTextOrListValue(this.input, parse);
        const _case = await evalNumberValue    (this.case,  parse);


        if (input)
        {
            if (this.options.enabled)
            {
                if (isListValueType(input.type))
                {
                    this.value = new ListValue();

                    for (let i = 0; i < input.items.length; i++)
                    {
                        const item = input.items[i];

                        this.value.items.push(
                            item.type == TEXT_VALUE
                            ? GTextCase.getEvalValue(item, _case)
                            : new TextValue());   
                    }
                }
                else
                {
                    this.value = GTextCase.getEvalValue(input, _case);
                }
            }
            else
                this.value = input.copy();
        }
        else
            this.value = new TextValue();


        this.setUpdateValues(parse,
        [
            //['value', this.value        ],
            ['type',   this.outputType()],
            ['case',  _case             ]
        ]);


        this.validate();

        return this;
    }



    isValid()
    {
        return super.isValid()
            && this.case && this.case.isValid();
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.case) this.case.pushValueUpdates(parse);
    }



    invalidateInputs(parse, from, force)
    {
        super.invalidateInputs(parse, from, force);

        if (this.case) this.case.invalidateInputs(parse, from, force);
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        if (this.case) this.case.iterateLoop(parse);
    }



    static parseRequest(parse)
    {
        const [, nodeId, options, ignore] = genParseNodeStart(parse);
    
    
        const _case = new GTextCase(nodeId, options);
       
    
        let nInputs = -1;
        
        if (!ignore)
        {
            nInputs = parseInt(parse.move());
            consoleAssert(nInputs == 0 || nInputs == 1, 'nInputs must be [0, 1]');
        }
    
        
        if (parse.settings.logRequests) 
            logReq(_case, parse, ignore, nInputs);
    
    
        if (ignore) 
        {
            genParseNodeEnd(parse, _case);
            return parse.parsedNodes.find(n => n.nodeId == nodeId);
        }
    
    
        parse.nTab++;
    
    
        if (nInputs == 1)
            _case.input = genParse(parse);
    
        _case.case = genParse(parse);
    
        
        parse.nTab--;
    
    
        genParseNodeEnd(parse, _case);
        return _case;
    }



    static getEvalValue(input, _case)
    {
        consoleAssert(input.type == TEXT_VALUE, 'input.type must be TEXT_VALUE');

        const val   = input.value;
        const value = new TextValue();
        

        if (_case.value == 0) 
            value.value = val.toLowerCase();

        else if (_case.value == 1)
        {
            if (val.length > 0) value.value += val.substring(0, 1).toUpperCase();
            if (val.length > 1) value.value += val.substring(1)   .toLowerCase();
        }

        else if (_case.value == 2)
        {
            let i = 0;
            while (i < val.length)
            {
                while (i < val.length
                    && /\s/.test(val.charAt(i)))
                    value.value += val.charAt(i++);

                if (i < val.length)
                    value.value += val.charAt(i++).toUpperCase();

                while (i < val.length
                    && !/\s/.test(val.charAt(i)))
                    value.value += val.charAt(i++).toLowerCase();
            }
        }

        else if (_case.value == 3) 
            value.value = val.toUpperCase();


        return value;
    }
}