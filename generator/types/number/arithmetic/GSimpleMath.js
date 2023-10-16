class GSimpleMath
extends GOperator1
{
    operation;
    operand;



    constructor(nodeId, options)
    {
        super(NUMBER_SIMPLE_MATH, nodeId, options);
    }


    
    reset()
    {
        super.reset();

        this.operation = null;
        this.operand   = null;
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
            const input = (await this.input.eval(parse)).toValue();

            if (isListType(input.type))
            {
                this.value = new ListValue();

                for (let i = 0; i < input.items.length; i++)
                {
                    const item = input.items[i];

                    this.value.items.push(
                        item.type == NUMBER_VALUE
                        ? getSimpleMathValue(item, operand, op, this.options.enabled)
                        : NumberValue.NaN.copy());   
                }
            }
            else
            {
                this.value = getSimpleMathValue(input, operand, op, this.options.enabled);
            }
        }
        else
            this.value = NumberValue.NaN.copy();


        this.setUpdateValues(parse,
        [
            ['value',     this.value       ],
            ['type',      this.outputType()],
            ['operation', op               ],
            ['operand',   operand          ]
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



    invalidateInputs(parse, from, force)
    {
        super.invalidateInputs(parse, from, force);

        if (this.operation) this.operation.invalidateInputs(parse, from, force);
        if (this.operand  ) this.operand  .invalidateInputs(parse, from, force);
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        if (this.operation) this.operation.iterateLoop(parse);
        if (this.operand  ) this.operand  .iterateLoop(parse);
    }
}



function getSimpleMathValue(input, operand, op, enabled)
{
    consoleAssert(
        input.type == NUMBER_VALUE, 
        'input.type must be NUMBER_VALUE');


    if (enabled)
    {
        op.value = Math.min(Math.max(0, op.value), MATH_OPS.length-1);

        switch (op.value)
        {
            case 0: 
                return new NumberValue(input.toNumber() - operand.toNumber());

            case 1: 
                return new NumberValue(input.toNumber() + operand.toNumber());

            case 2: 
                return new NumberValue(input.toNumber() % operand.toNumber());

            case 3: 
                if (operand.value == 0)
                    return NumberValue.NaN.copy();
                else
                    return new NumberValue(input.toNumber() / operand.toNumber());

            case 4: 
                return new NumberValue(input.toNumber() * operand.toNumber());

            case 5: 
                return new NumberValue(Math.pow(input.toNumber(), operand.toNumber()));
        }


        console.error('invalid math result')
        return input;
    }
    else
        return input;
}