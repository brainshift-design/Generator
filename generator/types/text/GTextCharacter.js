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



    eval(parse)
    {
        if (this.isCached())
            return this;


        const code = this.code.eval(parse).toValue();


        this.value = new TextValue(String.fromCharCode(code.value));


        genPushUpdateValue(parse, this.nodeId, 'value', this.value);
        genPushUpdateValue(parse, this.nodeId, 'code',  code);


        this.validate();

        return this;
    }
}
