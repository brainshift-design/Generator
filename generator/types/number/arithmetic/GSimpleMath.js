class GSimpleMath
extends GOperator1
{
    operation;
    operand;
    invert;



    constructor(nodeId, options)
    {
        super(NUMBER_SIMPLE_MATH, nodeId, options);
    }


    
    reset()
    {
        super.reset();

        this.operation = null;
        this.operand   = null;
        this.invert    = null;
    }



    copy()
    {
        const copy = new GRound(this.nodeId, this.options);

        copy.copyBase(this);

        copy.operation = this.operation.copy();
        copy.operand   = this.operand  .copy();
        copy.invert    = this.invert   .copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        this.value = new NumberValue(0);


        const input   = this.input     ? (await this.input    .eval(parse)).toValue() : null;
        const op      = this.operation ? (await this.operation.eval(parse)).toValue() : null;
        const operand = this.operand   ? (await this.operand  .eval(parse)).toValue() : null;
        const invert  = this.invert    ? (await this.invert   .eval(parse)).toValue() : null;


        op.value    = Math.min(Math.max(0, Math.round(op.value)), MATH_OPS.length-1);
        op.decimals = 0;


        if (input)
        {
            if (this.options.enabled)
            {
                if (isListType(input.type))
                {
                    this.value = new ListValue();

                    for (let i = 0; i < input.items.length; i++)
                    {
                        const item = input.items[i];

                        this.value.items.push(
                            item.type == NUMBER_VALUE
                            ? getSimpleMathValue(item, operand, op, invert, this.options.enabled)
                            : NumberValue.NaN.copy());   
                    }
                }
                else
                {
                    this.value = getSimpleMathValue(input, operand, op, invert, this.options.enabled);
                }
            }
            else
                this.value = input;
        }
        else
            this.value = NumberValue.NaN.copy();


        this.setUpdateValues(parse,
        [
            //['value',     this.value       ],
            ['type',      this.outputType()],
            ['operation', op               ],
            ['operand',   operand          ],
            ['invert',    invert           ]
        ]);


        this.validate();

        return this;
    }



    isValid()
    {
        return super.isValid()
            && this.operation && this.operation.isValid()
            && this.operand   && this.operand  .isValid()
            && this.invert    && this.invert   .isValid();
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.operation) this.operation.pushValueUpdates(parse);
        if (this.operand  ) this.operand  .pushValueUpdates(parse);
        if (this.invert   ) this.invert   .pushValueUpdates(parse);
    }



    invalidateInputs(parse, from, force)
    {
        super.invalidateInputs(parse, from, force);

        if (this.operation) this.operation.invalidateInputs(parse, from, force);
        if (this.operand  ) this.operand  .invalidateInputs(parse, from, force);
        if (this.invert   ) this.invert   .invalidateInputs(parse, from, force);
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        if (this.operation) this.operation.iterateLoop(parse);
        if (this.operand  ) this.operand  .iterateLoop(parse);
        if (this.invert   ) this.invert   .iterateLoop(parse);
    }
}



function getSimpleMathValue(input, operand, op, invert, enabled)
{
    consoleAssert(
        input.type == NUMBER_VALUE, 
        'input.type is ' + input.type + ', must be NUMBER_VALUE');


    if (enabled)
    {
        op.value = Math.min(Math.max(0, Math.floor(op.value)), MATH_OPS.length-1);

        const maxDecimals = Math.max(input.decimals, operand.decimals);

        switch (op.value)
        {
            case 0: // % 
                return invert.value == 0
                    ? new NumberValue(input.value % operand.value, maxDecimals)
                    : new NumberValue(operand.value % input.value, maxDecimals);

            case 1: // /
                if (      operand.value == 0
                       && invert .value == 0
                    ||    input  .value == 0
                       && invert .value == 1)
                    return NumberValue.NaN.copy();
                else
                    return invert.value == 0
                        ? new NumberValue(input.value / operand.value, maxDecimals)
                        : new NumberValue(operand.value / input.value, maxDecimals);

            case 2: // -
                return invert.value == 0
                    ? new NumberValue(input.value - operand.value, maxDecimals)
                    : new NumberValue(operand.value - input.value, maxDecimals);

            case 3: // +
                return invert.value == 0
                    ? new NumberValue(input.value + operand.value, maxDecimals)
                    : new NumberValue(operand.value + input.value, maxDecimals);

            case 4: // *
                return invert.value == 0
                    ? new NumberValue(input.value * operand.value, maxDecimals)
                    : new NumberValue(operand.value * input.value, maxDecimals);

            case 5: // eˣ
                return invert.value == 0
                    ? new NumberValue(Math.pow(input.value, operand.value), maxDecimals)
                    : new NumberValue(Math.pow(operand.value, input.value), maxDecimals);
        }


        consoleError('invalid math operation');
        return input;
    }
    else
        return input;
}