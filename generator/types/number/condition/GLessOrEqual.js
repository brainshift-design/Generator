class GLessOrEqual
extends GArithmetic
{
    constructor(nodeId, options)
    {
        super(NUMBER_LESS_OR_EQUAL, nodeId, options);
    }


    
    copy()
    {
        const le = new GLessOrEqual(this.nodeId, this.options);
        le.copyBase(this);
        le.inputs = this.inputs.map(i => i.copy());
        return le;
    }



    eval(parse)
    {
        if (this.isCached())
            return this;

        this.value = evalLessOrEqualInputs(this.inputs, parse);
        
        genPushUpdateValue(parse, this.nodeId, 'value', this.value);

        this.validate();

        return this;
    }
}



function evalLessOrEqualInputs(val0, val1) 
{ 
    return new NumberValue(val0.value <= val1.value ? 1 : 0); 
}
