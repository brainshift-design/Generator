class GAdd
extends GOperator
{
    inputs = [];



    constructor(nodeId, active)
    {
        super(NUMBER_ADD, nodeId, active);
    }


    
    copy()
    {
        const add = new GAdd(this.nodeId, this.active);
        add.inputs = this.inputs.map(i => i.copy());
        return add;
    }



    eval(parse)
    {
        if (!this.valid)
        {
            this.result = new NumberValue(0);


            for (const _input of this.inputs)
            {
                const input = _input.eval(parse).copy();

                console.assert(
                    input.type == NUMBER_VALUE, 
                    'this.result.type must be NUMBER_VALUE');

                this.result.value   += input.value;
                this.result.decimals = Math.max(this.result.decimals, input.decimals);
            }
            
            
            this.result.valid = true;
            this.valid        = true;


            genPushUpdateValue(parse, this.nodeId, 'value', this.result);
        }


        return this.result;
    }
}
