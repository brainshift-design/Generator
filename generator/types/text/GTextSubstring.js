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
                this.value = TextValue.NaN;
        }
        else
            this.value = TextValue.NaN;


        genPushUpdateValue(parse, this.nodeId, 'length', new NumberValue(length)); // used to set start and end maxima
        genPushUpdateValue(parse, this.nodeId, 'start',  start);
        genPushUpdateValue(parse, this.nodeId, 'end',    end);
        
        genPushUpdateValue(parse, this.nodeId, 'value', this.value);


        this.validate();

        return this;
    }
}
