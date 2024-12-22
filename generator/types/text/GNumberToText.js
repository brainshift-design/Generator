class GNumberToText
extends GOperator1
{
    static { GNode.types[NUMBER_TO_TEXT] = this; }



    base;
    trim;
    decimals;
    thousands;


    
    constructor(nodeId, options)
    {
        super(NUMBER_TO_TEXT, nodeId, options);
    }


    
    reset()
    {
        super.reset();

        this.base      = null;
        this.trim      = null;
        this.decimals  = null;
        this.thousands = null;
    }



    copy()
    {
        const copy = new GNumberToText(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.base     ) copy.base      = this.base     .copy();
        if (this.trim     ) copy.trim      = this.trim     .copy();
        if (this.decimals ) copy.decimals  = this.decimals .copy();
        if (this.thousands) copy.thousands = this.thousands.copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        const input     = await evalNumberValue(this.input,     parse);
        const base      = await evalNumberValue(this.base,      parse);
        const trim      = await evalNumberValue(this.trim,      parse);
        const decimals  = await evalTextValue  (this.decimals,  parse);
        const thousands = await evalTextValue  (this.thousands, parse);


        if (input)
        {
            if (isListValueType(input.type))
            {
                this.value = new ListValue();

                for (let i = 0; i < input.items.length; i++)
                {
                    const item = input.items[i];

                    this.value.items.push(
                        item.type == NUMBER_VALUE
                        ? getNumberToTextValue(item, base, trim, decimals, thousands)
                        : TextValue.NaN());   
                }
            }
            else
            {
                this.value = getNumberToTextValue(input, base, trim, decimals, thousands);
            }
        }
        else
            this.value = TextValue.NaN();


        this.setUpdateValues(parse,
        [
            ['type',      this.outputType()],
            ['base',      base             ],
            ['trim',      trim             ],
            ['decimals',  decimals         ],
            ['thousands', thousands        ]
        ]);


        this.validate();

        return this;
    }



    isValid()
    {
        return super.isValid()
            && this.base      && this.base     .isValid()
            && this.trim      && this.trim     .isValid()
            && this.decimals  && this.decimals .isValid()
            && this.thousands && this.thousands.isValid();
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.base     ) this.base     .pushValueUpdates(parse);
        if (this.trim     ) this.trim     .pushValueUpdates(parse);
        if (this.decimals ) this.decimals .pushValueUpdates(parse);
        if (this.thousands) this.thousands.pushValueUpdates(parse);
    }



    invalidateInputs(parse, from, force)
    {
        super.invalidateInputs(parse, from, force);

        if (this.base     ) this.base     .invalidateInputs(parse, from, force);
        if (this.trim     ) this.trim     .invalidateInputs(parse, from, force);
        if (this.decimals ) this.decimals .invalidateInputs(parse, from, force);
        if (this.thousands) this.thousands.invalidateInputs(parse, from, force);
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        if (this.base     ) this.base     .iterateLoop(parse);
        if (this.trim     ) this.trim     .iterateLoop(parse);
        if (this.decimals ) this.decimals .iterateLoop(parse);
        if (this.thousands) this.thousands.iterateLoop(parse);
    }



    static parseRequest(parse)
    {
        const [, nodeId, options, ignore] = genParseNodeStart(parse);
    
    
        const num2text = new GNumberToText(nodeId, options);
       
    
        let nInputs = -1;
        
        if (!ignore)
        {
            nInputs = parseInt(parse.move());
            consoleAssert(nInputs == 0 || nInputs == 1, 'nInputs must be [0, 1]');
        }
    
    
        if (parse.settings.logRequests) 
            logReq(num2text, parse, ignore, nInputs);
    
    
        if (ignore) 
        {
            genParseNodeEnd(parse, num2text);
            return parse.parsedNodes.find(n => n.nodeId == nodeId);
        }
    
    
        parse.nTab++;
    
    
        if (nInputs == 1)
            num2text.input = genParse(parse);
    
        num2text.base      = genParse(parse);
        num2text.trim      = genParse(parse);
        num2text.decimals  = genParse(parse);
        num2text.thousands = genParse(parse);
    
        
        parse.nTab--;
    
    
        genParseNodeEnd(parse, num2text);
        return num2text;
    }
}



function getNumberToTextValue(input, base, trim, decimals, thousands)
{
    return input.isValid()
         ? new TextValue(numToString(
              input.value, 
              (trim.value > 0 ? -1 : 1) * input.decimals, 
              base.value == 1, 
              decimals.value, 
              thousands.value))
         : new TextValue('?');
}