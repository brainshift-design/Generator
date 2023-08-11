class GTextSubstring
extends GOperator1
{
    start;
    end;


    
    constructor(nodeId, options)
    {
        super(TEXT_SUBSTRING, nodeId, options);
    }


    
    copy()
    {
        const copy = new GTextSubstring(this.nodeId, this.options);

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

        let   length = 0;


        if (this.input)
        {
            const input = (await this.input.eval(parse)).toValue();
            
            length = input.value.length;
            
            this.value = input.copy();
            
            consoleAssert(this.value.type == TEXT_VALUE, 'this.value.type must be TEXT_VALUE');
                
                
            const _end =
                end.isValid()
                ? end
                : new NumberValue(input.value.length);


            if (start.value <= _end.value)
            {
                if (this.options.enabled)
                    this.value.value = this.value.value.substring(start.value, _end.value);
            }
            else
                this.value = new TextValue();//TextValue.NaN;
        }
        else
            this.value = new TextValue();//TextValue.NaN;


        this.setUpdateValues(parse,
        [
            ['value',  this.value             ],
            ['length', new NumberValue(length)], // used to set start and end maxima
            ['start',  start                  ],
            ['end',    end                    ]
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



    invalidateInputs(from)
    {
        super.invalidateInputs(from);

        if (this.start) this.start.invalidateInputs(from);
        if (this.end  ) this.end  .invalidateInputs(from);
    }
}
