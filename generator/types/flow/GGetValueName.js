class GGetValueName
extends GOperator1
{
    constructor(nodeId, options)
    {
        super(GET_VALUE_NAME, nodeId, options);
    }


    
    copy()
    {
        const copy = new GGetValueName(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.value) copy.value = this.value.copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        this.value = new TextValue(
            this.input 
            ? (await this.input.eval(parse)).toValue().valueId
            : '');

        
        this.setUpdateValues(parse,
        [
            ['type', this.outputType()]
        ]);


        this.validate();

        return this;
    }



    toValue()
    {
        return this.value
             ? this.value.copy()
             : null;
    }
}
