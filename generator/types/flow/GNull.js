class GNull
extends GOperator1
{
    constructor(nodeId, options)
    {
        super(NULL_NODE, nodeId, options);
    }


    
    copy()
    {
        const copy = new GNull(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.value) copy.value = this.value.copy();
        if (this.input) copy.input = this.input.copy();

        return copy;
    }



    async eval(parse)
    {
        // if (this.isCached())
        //     return this;


        this.value = 
            this.input 
            ? (await this.input.eval(parse)).toNewValue() 
            : new NullValue();


        this.updateValueObjects();


        this.setUpdateValues(parse,
        [
            ['type',  this.outputType()],
            ['value', this.value       ]
        ]);


        this.validate();

        return this;
    }



    toNewValue()
    {
        return this.value
             ? this.value.copy()
             : null;
    }
}
