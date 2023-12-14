class GTextTrim
extends GOperator1
{
    start = null;
    end   = null;


    
    constructor(nodeId, options)
    {
        super(TEXT_TRIM, nodeId, options);
    }


    
    reset()
    {
        super.reset();

        this.start = null;
        this.end   = null;
    }



    copy()
    {
        const copy = new GTextTrim(this.nodeId, this.options);

        copy.copyBase(this);

        copy.start = this.start.copy();
        copy.end   = this.end  .copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        const start = (await this.start.eval(parse)).toValue();
        const end   = (await this.end  .eval(parse)).toValue();


        if (this.input)
        {
            const input = (await this.input.eval(parse)).toValue();
            
            if (isListType(input.type))
            {
                this.value = new ListValue();

                for (let i = 0; i < input.items.length; i++)
                {
                    const item = input.items[i];

                    this.value.items.push(
                        item.type == TEXT_VALUE
                        ? getTrimValue(item, start, end, this.options.enabled)
                        : new TextValue());   
                }
            }
            else
            {
                this.value = getTrimValue(input, start, end, this.options.enabled);
            }
        }
        else
            this.value = new TextValue();//TextValue.NaN;


        this.setUpdateValues(parse,
        [
            //['value', this.value       ],
            ['type',  this.outputType()],
            ['start', start            ],
            ['end',   end              ]
        ]);


        this.validate();

        return this;
    }



    isValid()
    {
        return super.isValid()
            && this.start && this.start.isValid()
            && this.end   && this.end  .isValid();
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.start) this.start.pushValueUpdates(parse);
        if (this.end  ) this.end  .pushValueUpdates(parse);
    }



    invalidateInputs(parse, from, force)
    {
        super.invalidateInputs(parse, from, force);

        if (this.start) this.start.invalidateInputs(parse, from, force);
        if (this.end  ) this.end  .invalidateInputs(parse, from, force);
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        if (this.start) this.start.iterateLoop(parse);
        if (this.end  ) this.end  .iterateLoop(parse);
    }
}



function getTrimValue(input, start, end, enabled)
{
    consoleAssert(input.type == TEXT_VALUE, 'input.type must be TEXT_VALUE');
               
    const value = input.copy();

    if (enabled)
    {
        if (start.value.length > 0) value.value = trimCharFromStart(value.value, unescapeString(start.value));
        if (end  .value.length > 0) value.value = trimCharFromEnd  (value.value, unescapeString(end  .value));
    }

    return value;
}