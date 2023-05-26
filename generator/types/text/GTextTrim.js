class GTextTrim
extends GTextType
{
    input = null;

    start;
    end;


    
    constructor(nodeId, options)
    {
        super(TEXT_TRIM, nodeId, options);
    }


    
    copy()
    {
        const copy = new GTextTrim(this.nodeId, this.options);

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


        if (this.input)
        {
            this.value = (await this.input.eval(parse)).toValue();
            
            console.assert(
                this.value.type == TEXT_VALUE, 
                'this.value.type must be TEXT_VALUE');
                
                
            if (this.options.enabled)
            {
                if (start.value.length > 0) this.value.value = trimCharFromStart(this.value.value, start.value);
                if (end  .value.length > 0) this.value.value = trimCharFromEnd  (this.value.value, end  .value);
            }
        }
        else
            this.value = new TextValue();//TextValue.NaN;


        this.updateValues =
        [
            [returnValueId, this.value],
            ['start', start     ],
            ['end',   end       ]
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



    invalidateInputs()
    {
        super.invalidateInputs();

        if (this.input) this.input.invalidateInputs();
        if (this.start) this.start.invalidateInputs();
        if (this.end  ) this.end  .invalidateInputs();
    }
}
