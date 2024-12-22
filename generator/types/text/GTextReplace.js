class GTextReplace
extends GOperator1
{
    static { GNode.types[TEXT_REPLACE] = this; }



    what  = null;
    with  = null;
    regex = null;



    constructor(nodeId, options)
    {
        super(TEXT_REPLACE, nodeId, options);
    }


    
    reset()
    {
        super.reset();

        this.what  = null;
        this.with  = null;
        this.regex = null;
    }



    copy()
    {
        const copy = new GTextReplace(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.what ) copy.what  = this.what .copy();
        if (this.with ) copy.with  = this.with .copy();
        if (this.regex) copy.regex = this.regex.copy();

        if (this.value) copy.value = this.value.copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        const  input = await evalTextOrListValue(this.input, parse);
        const _what  = await evalTextValue      (this.what,  parse);
        const _with  = await evalTextValue      (this.with,  parse);
        const _regex = await evalNumberValue    (this.regex, parse);


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
                            ? GTextReplace.getEvalValue(item, _what, _with, _regex)
                            : new TextValue());   
                    }
                }
                else
                {
                    this.value = GTextReplace.getEvalValue(input, _what, _with, _regex);
                }
            }
            else
                this.value = input.copy();
        }
        else
            this.value = new TextValue();


        this.setUpdateValues(parse,
        [
            //['value',  this.value       ],
            ['type',   this.outputType()],
            ['what',  _what             ],
            ['with',  _with             ],
            ['regex', _regex            ]
        ]);

        
        this.validate();

        return this;
    }



    isValid()
    {
        return super.isValid()
            && this.what  && this.what .isValid()
            && this.with  && this.with .isValid()
            && this.regex && this.regex.isValid();
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.what ) this.what .pushValueUpdates(parse);
        if (this.with ) this.with .pushValueUpdates(parse);
        if (this.regex) this.regex.pushValueUpdates(parse);
    }



    invalidateInputs(parse, from, force)
    {
        super.invalidateInputs(parse, from, force);

        if (this.what ) this.what .invalidateInputs(parse, from, force);
        if (this.with ) this.with .invalidateInputs(parse, from, force);
        if (this.regex) this.regex.invalidateInputs(parse, from, force);
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        if (this.what ) this.what .iterateLoop(parse);
        if (this.with ) this.with .iterateLoop(parse);
        if (this.regex) this.regex.iterateLoop(parse);
    }



    static parseRequest(parse)
    {
        const [, nodeId, options, ignore] = genParseNodeStart(parse);
    
    
        const replace = new GTextReplace(nodeId, options);
       
    
        let nInputs = -1;
        
        if (!ignore)
        {
            nInputs = parseInt(parse.move());
            consoleAssert(nInputs == 0 || nInputs == 1, 'nInputs must be [0, 1]');
        }
    
        
        if (parse.settings.logRequests) 
            logReq(replace, parse, ignore, nInputs);
    
    
        if (ignore) 
        {
            genParseNodeEnd(parse, replace);
            return parse.parsedNodes.find(n => n.nodeId == nodeId);
        }
    
    
        parse.nTab++;
    
    
        if (nInputs == 1)
            replace.input = genParse(parse);
    
        replace.what  = genParse(parse);
        replace.with  = genParse(parse);
        replace.regex = genParse(parse);
    
        
        parse.nTab--;
    
    
        genParseNodeEnd(parse, replace);
        return replace;
    }



    static getEvalValue(input, _what, _with, _regex)
    {
        consoleAssert(input.type == TEXT_VALUE, 'input.type must be TEXT_VALUE');

        const value = new TextValue();

        
        if (_regex.value > 0)
        {
            try
            {
                value.value = input.value.replace(
                    new RegExp(unescapeRegexPattern(_what.value), 'gu'),
                    unescapeRegexReplacement(_with.value));
            }
            catch (e)
            {
                uiNotify(e.message, {error: true});
            }
        }
        else if (input.value)
        {
            value.value = input.value.replaceAll(
                escapeString(_what.value),
                escapeString(_with.value));
        }


        return value;
    }
}