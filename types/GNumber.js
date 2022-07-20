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
        if (this.input) num.input = this.input.copy();
        return num;
    }



    eval(parse)
    {
        if (!this.valid)
        {
            if (this.input)
                this.result = this.input.eval(parse).copy();
            else
                this.result = this.value.copy();


            this.result.valid = true;
            this.valid        = true;

            console.assert(this.result.valid);
            genPushUpdateValue(parse, this.nodeId, 'value', this.result);
        }


        return this.result;
    }
}