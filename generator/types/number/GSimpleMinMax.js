class GSimpleMinMax
extends GOperator1
{
    operand;
    operation;



    constructor(nodeId, options)
    {
        super(NUMBER_SIMPLE_MINMAX, nodeId, options);
    }


    
    reset()
    {
        super.reset();

        this.operand   = null;
        this.operation = null;
    }



    copy()
    {
        const copy = new GRound(this.nodeId, this.options);

        copy.copyBase(this);

        copy.operand   = this.operand  .copy();
        copy.operation = this.operation.copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        this.value = new NumberValue(0);

        
        const operand = (await this.operand  .eval(parse)).toValue();
        const op      = (await this.operation.eval(parse)).toValue();


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
                        ? getSimpleMinMaxValue(item, operand, op, this.options.enabled)
                        : NumberValue.NaN.copy());   
                }
            }
            else
            {
                this.value = getSimpleMinMaxValue(input, operand, op, this.options.enabled);
            }
        }
        else
            this.value = NumberValue.NaN.copy();


        this.setUpdateValues(parse,
        [
            ['value',     this.value       ],
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
            && this.operand   && this.operation.isValid()
            && this.operation && this.operand  .isValid();
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.operand  ) this.operand  .pushValueUpdates(parse);
        if (this.operation) this.operation.pushValueUpdates(parse);
    }



    invalidateInputs(parse, from, force)
    {
        super.invalidateInputs(parse, from, force);

        if (this.operand  ) this.operand  .invalidateInputs(parse, from, force);
        if (this.operation) this.operation.invalidateInputs(parse, from, force);
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        if (this.operand  ) this.operand  .iterateLoop(parse);
        if (this.operation) this.operation.iterateLoop(parse);
    }
}



function getSimpleMinMaxValue(input, operand, op, enabled)
{
    consoleAssert(
        input.type == NUMBER_VALUE, 
        'input.type is ' + input.type + ', must be NUMBER_VALUE');


    if (enabled)
    {
        op.value = Math.min(Math.max(0, Math.floor(op.value)), 1);

        return new NumberValue(op.value == 0
            ? Math.min(input.toNumber(), operand.toNumber())
            : Math.max(input.toNumber(), operand.toNumber()));
    }
    else
        return input;
}