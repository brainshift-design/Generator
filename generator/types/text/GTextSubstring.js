class GTextSubstring
extends GTextType
{
    input = null;

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

        if (this.input) 
            copy.input = this.input.copy();

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
            
            console.assert(
                this.value.type == TEXT_VALUE, 
                'this.value.type must be TEXT_VALUE');
                
                
            if(start.value <= end.value)
            {
                if (this.options.enabled)
                    this.value.value = this.value.value.substring(start.value, end.value);
            }
            else
                this.value = new TextValue();//TextValue.NaN;
        }
        else
            this.value = new TextValue();//TextValue.NaN;


        this.updateValues =
        [
            ['value',  this.value             ],
            ['length', new NumberValue(length)], // used to set start and end maxima
            ['start',  start                  ],
            ['end',    end                    ]
        ];
        

        this.validate();

        return this;
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.input) this.input.pushValueUpdates(parse);
        if (this.start) this.start.pushValueUpdates(parse);
        if (this.end  ) this.end  .pushValueUpdates(parse);
    }



    invalidateInputs(from)
    {
        super.invalidateInputs(from);

        if (this.input) this.input.invalidateInputs(from);
        if (this.start) this.start.invalidateInputs(from);
        if (this.end  ) this.end  .invalidateInputs(from);
    }
}
