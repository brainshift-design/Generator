class GNumber
extends GOperator
{
    input = null;
    value;
    


    constructor(nodeId, options)
    {
        super(NUMBER, nodeId, options);
    }



    copy()
    {
        const num = new GNumber(this.nodeId, this.options);
        
        if (this.input) 
            num.input = this.input.copy();
        
        num.value = this.value;

        return num;
    }



    eval(parse)
    {
        if (this.valid)
            return;


        if (this.input) 
        {
            this.input.eval(parse);
            this.value = this.input.value;
        }
        else
            this.value.eval(parse);

        
        console.assert(this.value.type == NUMBER_VALUE, 'this.value.type must be NUMBER_VALUE');
        genPushUpdateValue(parse, this.nodeId, 'value', this.value);

        
        this.valid = true;
    }



    toValue()
    {
        return this.value;
    }
}