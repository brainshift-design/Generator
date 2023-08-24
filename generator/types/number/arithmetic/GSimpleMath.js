class GSimpleMath
extends GOperator1
{
    operation;
    operand;



    constructor(nodeId, options)
    {
        super(NUMBER_SIMPLE_MATH, nodeId, options);
    }


    
    copy()
    {
        const copy = new GRound(this.nodeId, this.options);

        copy.copyBase(this);

        copy.operation = this.operation.copy();
        copy.operand   = this.operand  .copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        this.value = new NumberValue(0);

        
        const op      = (await this.operation.eval(parse)).toValue();
        const operand = (await this.operand  .eval(parse)).toValue();


        if (this.input)
        {
            this.value = (await this.input.eval(parse)).toValue();

            consoleAssert(
                this.value.type == NUMBER_VALUE, 
                'this.value.type must be NUMBER_VALUE');

            
            if (this.options.enabled)
            {
                op.value = Math.min(Math.max(0, op.value), MATH_OPS.length-1);

                switch (op.value)
                {
                    case 0: 
                        this.value = new NumberValue(
                            this.value.value - operand.value,
                            Math.max(this.value.decimals, operand.decimals));
                        break;

                    case 1: 
                        this.value = new NumberValue(
                            this.value.value + operand.value,
                            Math.max(this.value.decimals, operand.decimals));
                        break;

                    case 2: 
                        this.value = new NumberValue(
                            this.value.value % operand.value,
                            Math.max(this.value.decimals, operand.decimals));
                        break;

                    case 3: 
                        if (operand.value == 0)
                            this.value = NumberValue.NaN;
                        else
                        {
                            const val = this.value.value / operand.value;

                            this.value = new NumberValue(
                                val, 
                                Math.max(Math.max(this.value.decimals, operand.decimals)), decDigits(val));
                        }
                        break;

                    case 4: 
                        this.value = new NumberValue(
                            this.value.value * operand.value,
                            Math.max(this.value.decimals, operand.decimals));
                        break;

                    case 5: 
                        this.value = new NumberValue(
                            Math.pow(this.value.value, operand.value),
                            Math.max(this.value.decimals, operand.decimals));
                        break;
                }
            }
        }
        else
            this.value = NumberValue.NaN;


        this.setUpdateValues(parse,
        [
            ['value',     this.value],
            ['operation', op        ],
            ['operand',   operand   ]
        ]);


        this.validate();

        return this;
    }



    isValid()
    {
        return super.isValid()
            && this.operation && this.operation.isValid()
            && this.operand   && this.operand  .isValid();
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.operation) this.operation.pushValueUpdates(parse);
        if (this.operand  ) this.operand  .pushValueUpdates(parse);
    }



    invalidateInputs(parse, from)
    {
        super.invalidateInputs(parse, from);

        if (this.operation) this.operation.invalidateInputs(parse, from);
        if (this.operand  ) this.operand  .invalidateInputs(parse, from);
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        if (this.operation) this.operation.iterateLoop(parse);
        if (this.operand  ) this.operand  .iterateLoop(parse);
    }
}
