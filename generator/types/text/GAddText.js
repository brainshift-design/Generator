class GAddText
extends GOperator1
{
    static { GNode.types[TEXT_ADD] = this; }



    text;
    prefix;



    constructor(nodeId, options)
    {
        super(TEXT_ADD, nodeId, options);
    }


    
    reset()
    {
        super.reset();

        this.text   = null;
        this.prefix = null;
    }



    copy()
    {
        const copy = new GAddText(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.text  ) copy.text   = this.text  .copy();
        if (this.prefix) copy.prefix = this.prefix.copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        this.value = new NumberValue(0);


        const input  = await evalTextOrListValue(this.input,  parse);
        const text   = await evalTextValue      (this.text,   parse);
        const prefix = await evalNumberValue    (this.prefix, parse);


        if (input)
        {
            if (this.options.enabled)
            {
                this.evalInputOrList(
                    input, 
                    item => GAddText.getEvalValue(item, text, prefix), 
                    new TextValue());
            }
            else
                this.value = input;
        }
        else
            this.value = TextValue.NaN();


        this.setUpdateValues(parse,
        [
            ['type',   this.outputType()],
            ['text',   text             ],
            ['prefix', prefix           ]
        ]);


        this.validate();

        return this;
    }



    isValid()
    {
        return super.isValid()
            && this.text   && this.text  .isValid()
            && this.prefix && this.prefix.isValid();
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.text  ) this.text  .pushValueUpdates(parse);
        if (this.prefix) this.prefix.pushValueUpdates(parse);
    }



    invalidateInputs(parse, from, force)
    {
        super.invalidateInputs(parse, from, force);

        if (this.text  ) this.text  .invalidateInputs(parse, from, force);
        if (this.prefix) this.prefix.invalidateInputs(parse, from, force);
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        if (this.text  ) this.text  .iterateLoop(parse);
        if (this.prefix) this.prefix.iterateLoop(parse);
    }



    static parseRequest(parse)
    {
        const [, nodeId, options, ignore] = genParseNodeStart(parse);
    
    
        const addText = new GAddText(nodeId, options);
       
    
        let nInputs = -1;
        
        if (!ignore)
        {
            nInputs = parseInt(parse.move());
            consoleAssert(nInputs == 0 || nInputs == 1, 'nInputs must be [0, 1]');
        }
    
        
        if (parse.settings.logRequests) 
            logReq(addText, parse, ignore, nInputs);
    
    
        if (ignore) 
        {
            genParseNodeEnd(parse, addText);
            return parse.parsedNodes.find(n => n.nodeId == nodeId);
        }
    
    
        parse.nTab++;
    
    
        if (nInputs == 1)
            addText.input = genParse(parse);
    
        addText.text   = genParse(parse);
        addText.prefix = genParse(parse);
    
        
        parse.nTab--;
    
    
        genParseNodeEnd(parse, addText);
        return addText;
    }
    



    static getEvalValue(input, text, prefix)
    {
        const textValue = escapeString(text.value);

        return new TextValue(
            prefix.value > 0
                ? textValue + input.value
                : input.value + textValue);
    }
}