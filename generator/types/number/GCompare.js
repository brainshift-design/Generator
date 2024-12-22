class GCompare
extends GOperator1
{
    static { GNode.types[NUMBER_COMPARE] = this; }



    operation;
    operand;



    constructor(nodeId, options)
    {
        super(NUMBER_COMPARE, nodeId, options);
    }


    
    reset()
    {
        super.reset();

        this.operation = null;
        this.operand   = null;
    }



    copy()
    {
        const copy = new GCompare(this.nodeId, this.options);

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
        const op      = await evalNumberValue      (this.operation, parse);
        const operand = await evalNumberValue      (this.operand,   parse);

        
        if (   input
            && operand
            && op)
        {
            op.value = Math.min(Math.max(0, op.value), CONDITION_OPS.length-1);

            if (isListValueType(input.type))
            {
                this.value = new ListValue();

                for (let i = 0; i < input.items.length; i++)
                {
                    const item = input.items[i];

                    this.value.items.push(
                        item.type == NUMBER_VALUE
                        ? await getCompareValue(item, operand, op)
                        : NumberValue.NaN());
                }
            }
            else
            {
                this.value = await getCompareValue(input, operand, op);
            }
        }
        else
            this.value = NumberValue.NaN();


        this.setUpdateValues(parse,
        [
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



    static parseRequest(parse)
    {
        const [, nodeId, options, ignore] = genParseNodeStart(parse);
    
    
        const cmp = new GCompare(nodeId, options);
    
    
        let nInputs = -1;
        
        if (!ignore)
        {
            nInputs = parseInt(parse.move());
            consoleAssert(nInputs == 0 || nInputs == 1, 'nInputs must be [0, 1]');
        }
    
        
        if (parse.settings.logRequests) 
            logReq(cmp, parse, ignore, nInputs);
    
    
        if (ignore) 
        {
            genParseNodeEnd(parse, cmp);
            return parse.parsedNodes.find(n => n.nodeId == nodeId);
        }
    
    
        parse.nTab++;
    
    
        if (nInputs == 1)
            cmp.input = genParse(parse);
      
        
        cmp.operation = genParse(parse);
        cmp.operand   = genParse(parse);
    
    
        parse.nTab--;
    
    
        genParseNodeEnd(parse, cmp);
        return cmp;
    }
}



async function getCompareValue(input, operand, op)
{
    switch (op.value)
    {
        case CONDITION_LESS:              return await evalCompareNumberInputs(input, operand, ((a, b) => a <  b));
        case CONDITION_LESS_OR_EQUAL:     return await evalCompareNumberInputs(input, operand, ((a, b) => a <= b));
        case CONDITION_NOT_EQUAL:         return await evalCompareNumberInputs(input, operand, ((a, b) => a != b));
        case CONDITION_EQUAL:             return await evalCompareNumberInputs(input, operand, ((a, b) => a == b));
        case CONDITION_GREATER_OR_EQUAL:  return await evalCompareNumberInputs(input, operand, ((a, b) => a >= b));
        case CONDITION_GREATER:           return await evalCompareNumberInputs(input, operand, ((a, b) => a >  b));
    }
}



async function evalCompareNumberInputs(input, operand, compare) 
{
    if (   input   && input  .isValid() 
        && operand && operand.isValid())
    {
        return new NumberValue(
            compare(input.toNumber(), operand.toNumber()) ? 1 : 0,
            0,
            true);
    }
    else
    {
        return NumberValue.NaN();
    }
}