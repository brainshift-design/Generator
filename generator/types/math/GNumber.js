class GNumber
extends GOperator
{
    input = null;
    value;
    


    constructor(nodeId, active)
    {
        super(NUMBER, nodeId, active);
    }



    copy()
    {
        const num = new GNumber(this.nodeId, this.active);
        
        num.value = this.value;

        if (this.input) 
            num.input = this.input.copy();
        
        return num;
    }



    eval(parse)
    {
        if (!this.valid)
        {
            this.result = 
                this.input
                ? this.input.eval(parse).copy()
                : this.value.copy();

            this.valid = true;

            console.assert(this.result.valid, 'this.result must be valid');
            genPushUpdateValue(parse, this.nodeId, 'value', this.result);
        }


        return this.result;
    }
}