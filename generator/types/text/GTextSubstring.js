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



    eval(parse)
    {
        if (this.isCached())
            return this;


        const start = this.start.eval(parse).toValue();
        const end   = this.end  .eval(parse).toValue();


        if (this.input)
        {
            this.value = this.input.eval(parse).toValue();

            console.assert(
                this.value.type == TEXT_VALUE, 
                'this.value.type must be TEXT_VALUE');


            if (this.options.enabled)
                this.value.value = this.value.value.substring(start.value, end.value+1);
        }
        else
            this.value = TextValue.NaN;


        genPushUpdateValue(parse, this.nodeId, 'value', this.value);
        genPushUpdateValue(parse, this.nodeId, 'start', start);
        genPushUpdateValue(parse, this.nodeId, 'end',   end);


        this.validate();

        return this;
    }
}
