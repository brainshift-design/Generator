class GTextCharacter
extends GTextType1
{
    code;


    
    constructor(nodeId, options)
    {
        super(TEXT_CHAR, nodeId, options);
    }


    
    copy()
    {
        const copy = new GTextCharacter(this.nodeId, this.options);

        copy.copyBase(this);

        copy.code = this.code.copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        const code = (await this.code.eval(parse)).toValue();


        this.value = new TextValue(String.fromCharCode(code.value));


        this.updateValues =
        [
            ['value', this.value],
            ['code',  code      ]
        ];


        this.validate();

        return this;
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.code) this.code.pushValueUpdates(parse);
    }



    invalidateInputs(from)
    {
        super.invalidateInputs(from);

        if (this.code) this.code.invalidateInputs(from);
    }
}
