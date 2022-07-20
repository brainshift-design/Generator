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
            // else
            //     this.result = new                


            this.valid = true;

            console.log('GNumber.nodeId = ', this.nodeId);
            console.log('GNumber.result = ', this.result);
console.log('0 parse.updateValues = ', [...parse.updateValues]);
            console.assert(this.result.valid);
            genPushUpdateValue(parse, this.nodeId, 'value', this.result);
            console.log('1 parse.updateValues = ', [...parse.updateValues]);
        }


        return this.result;
    }
}