class GNumber
extends GOperator
{
    input = null;


    constructor(nodeId, active)
    {
        super(NUMBER, nodeId, active);

        this.result = new GNumberValue(0);
    }



    eval(parse)
    {
        if (!this.valid)
        {
            if (this.input)
                this.result = this.input.eval(parse);


            this.valid = true;
            //this.result.valid = true;


            console.assert(this.result.valid);
            genPushUpdateParamValue(parse, this.nodeId, 'value', this.result);
        }


        return this.result;
    }
}