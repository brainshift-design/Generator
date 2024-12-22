class GTextCompare
extends GOperator1
{
    static { GNode.types[TEXT_COMPARE] = this; }



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


        const input   = await evalTextOrListValue(this.input,     parse);
        const op      = await evalNumberValue      (this.operation, parse);
        const operand = await evalTextValue        (this.operand,   parse);

        
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
                        ? await evalCompareTextInputs(item, operand, op)
                        : NumberValue.NaN());
                }
            }
            else
            {
                this.value = await evalCompareTextInputs(input, operand, op);
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


        const cmp = new GTextCompare(nodeId, options);
    

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



async function evalCompareTextInputs(input, operand, op) 
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

    if (   input   && input  .isValid() 
        && operand && operand.isValid())
        return new NumberValue(opFunc(input.value, operand.value) ? 1 : 0, 0, true);
    else                  
        return new NullValue();
}