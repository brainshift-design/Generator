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


            genPushUpdateParamValue(parse, this.nodeId, 'value', this.result);


            this.valid        = true;
            //this.result.valid = true;
        }


        return this.result;
    }
}