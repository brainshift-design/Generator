class GLess
extends GArithmetic
{
    constructor(nodeId, options)
    {
        super(NUMBER_LESS, nodeId, options);
    }


    
    copy()
    {
        const lt = new GLess(this.nodeId, this.options);
        lt.copyBase(this);
        lt.inputs = this.inputs.map(i => i.copy());
        return lt;
    }



    eval(parse)
    {
        if (this.isCached())
            return this;

        this.value = evalLessInputs(this.inputs, parse);
        
        genPushUpdateValue(parse, this.nodeId, 'value', this.value);

        this.validate();

        return this;
    }
}



function evalLessInputs(val0, val1) 
{ 
    return new NumberValue(val0.value <  val1.value ? 1 : 0); 
}
