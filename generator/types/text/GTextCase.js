class GTextCase
extends GOperator1
{
    static { GNode.types[TEXT_CASE] = this; }



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
        

        if (_case.value == 0) // lower
            value.value = val.toLowerCase();

        else if (_case.value == 1) // Sentence
        {
            const trimmed = val.trim();

            if (trimmed.length > 0)
                value.value = trimmed.charAt(0).toUpperCase() + trimmed.slice(1).toLowerCase();
            else
                value.value = '';
        }

        else if (_case.value == 2) // Capital
        {
            // split by whitespace, filter out empty strings
            const words = val.split(/\s+/).filter(w => w.length > 0);
            
            value.value = words.map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ');
        }

        else if (_case.value == 3) // UPPER
            value.value = val.toUpperCase();

        else if (_case.value == 4) // cAmEl
        {
            // split by whitespace, filter out empty strings
            const words = val.split(/\s+/).filter(w => w.length > 0);

            if (words.length > 0)
            {
                value.value = words[0].toLowerCase();

                for (let j = 1; j < words.length; j++)
                    value.value += words[j].charAt(0).toUpperCase() + words[j].slice(1).toLowerCase();
            }
            else
                value.value = '';
        }

        else if (_case.value == 5) // snake
            value.value = val.toLowerCase().replace(/ /g, '_');
        
        else if (_case.value == 6) // kebab
            value.value = val.toLowerCase().replace(/ /g, '-');
        
        else if (_case.value == 7) // dot
            value.value = val.toLowerCase().replace(/ /g, '.');
        

        return value;
    }
}