class GTextCharacter
extends GTextType
{
    input = null;

    code;


    
    constructor(nodeId, options)
    {
        super(TEXT_CHAR, nodeId, options);
    }


    
    copy()
    {
        const copy = new GTextCharacter(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.input) 
            copy.input = this.input.copy();

        copy.code = this.code.copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        const code = (await this.code.eval(parse)).toValue();


        this.value = new TextValue(String.fromCharCode(code.value));


        if (parse.isLastRepeat())
        {
            genPushUpdateValue(parse, this.nodeId, 'value', this.value);
            genPushUpdateValue(parse, this.nodeId, 'code',  code);
        }


        this.validate();

        return this;
    }



    invalidate()
    {
        super.invalidate();

        if (this.input) this.input.invalidate();
        if (this.code ) this.code .invalidate();
    }
}
