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


        genPushUpdateValue(parse, this.nodeId, 'value', this.value);
        genPushUpdateValue(parse, this.nodeId, 'start', start);
        genPushUpdateValue(parse, this.nodeId, 'end',   end);
        


        this.validate();

        return this;
    }



    invalidate()
    {
        super.invalidate();

        if (this.input) this.input.invalidate();
        if (this.start) this.start.invalidate();
        if (this.end  ) this.end  .invalidate();
    }
}
