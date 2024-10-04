class GTextCompare
extends GOperator2
{
    operation;
    operand;



    constructor(nodeId, options)
    {
        super(TEXT_COMPARE, nodeId, options);
    }


    
    reset()
    {
        super.reset();

        this.operation = null;
        this.operand   = null;
    }



    copy()
    {
        const copy = new GTextCompare(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.operation) copy.operation = this.operation.copy();
        if (this.operand  ) copy.operand   = this.operand  .copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        const input   = await evalNumberOrListValue(this.input,     parse);
        const op      = await evalNumberValue    (this.operation, parse);
        const operand = await evalTextValue      (this.operand,   parse);

        
        if (   input
            && op)
        {
            op.value = Math.min(Math.max(0, op.value), CONDITION_OPS.length-1);

            if (isListValueType(input.type))
            {
                this.value = new ListValue();

                for (const item of input.items)
                {
                    this.value.items.push(
                        item.type == TEXT_VALUE
                        ? await evalCompareTextInputs(item, operand, op, parse)
                        : NumberValue.NaN());
                }
            }
            else
            {
                this.value = await evalCompareTextInputs(input, operand, op, parse);
            }
        }
        else
            this.value = NumberValue.NaN();


        this.setUpdateValues(parse,
        [
            ['type',      this.outputType()],
            ['operand',   operand          ],
            ['operation', op               ]
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



async function evalCompareTextInputs(input0, input1, op, parse) 
{
    let opFunc = null;

    switch (op.value)
    {
        case CONDITION_LESS:              opFunc = (a, b) => a <  b;  break;
        case CONDITION_LESS_OR_EQUAL:     opFunc = (a, b) => a <= b;  break;
        case CONDITION_NOT_EQUAL:         opFunc = (a, b) => a != b;  break;
        case CONDITION_EQUAL:             opFunc = (a, b) => a == b;  break;
        case CONDITION_GREATER_OR_EQUAL:  opFunc = (a, b) => a >= b;  break;
        case CONDITION_GREATER:           opFunc = (a, b) => a >  b;  break;
    }


    if (   input0 && input0.isValid() 
        && input1 && input1.isValid())
        return new NumberValue(opFunc(input0.value, input1.value) ? 1 : 0, 0, true);
    else                  
        return new NullValue();
}