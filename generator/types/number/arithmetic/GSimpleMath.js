class GSimpleMath
extends GOperator1
{
    static { GNode.types[NUMBER_SIMPLE_MATH] = this; }



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
        const copy = new GSimpleMath(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.operation) copy.operation = this.operation.copy();
        if (this.operand  ) copy.operand   = this.operand  .copy();
        if (this.invert   ) copy.invert    = this.invert   .copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        const input   = await evalNumberOrListValue(this.input,     parse);
        const op      = await evalNumberValue      (this.operation, parse);
        const operand = await evalNumberValue      (this.operand,   parse);
        const invert  = await evalNumberValue      (this.invert,    parse);


        if (   op
            && op.isValid())
        {
            op.value    = Math.min(Math.max(0, Math.round(op.value)), MATH_OPS.length-1);
            op.decimals = 0;
        }


        if (   input
            && op)
        {
            if (this.options.enabled)
            {
                if (isListValueType(input.type))
                {
                    this.value = new ListValue();

                    for (let i = 0; i < input.items.length; i++)
                    {
                        const item = input.items[i];

                        this.value.items.push(
                            item.type == NUMBER_VALUE
                            ? getSimpleMathValue(item, operand, op, invert, this.options.enabled)
                            : NumberValue.NaN());   
                    }
                }
                else
                {
                    this.value = getSimpleMathValue(input, operand, op, invert, this.options.enabled);
                }
            }
            else
                this.value = input.copy();
        }
        else
            this.value = NumberValue.NaN();


        this.setUpdateValues(parse,
        [
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



    static parseRequest(parse)
    {
        const [, nodeId, options, ignore] = genParseNodeStart(parse);
    
    
        const smath = new GSimpleMath(nodeId, options);
       
    
        let nInputs = -1;
        
        if (!ignore)
        {
            nInputs = parseInt(parse.move());
            consoleAssert(nInputs == 0 || nInputs == 1, 'nInputs must be [0, 1]');
        }
    
        
        if (parse.settings.logRequests) 
            logReq(smath, parse, ignore, nInputs);
    
    
        if (ignore) 
        {
            genParseNodeEnd(parse, smath);
            return parse.parsedNodes.find(n => n.nodeId == nodeId);
        }
    
    
        parse.nTab++;
    
    
        if (nInputs == 1)
            smath.input = genParse(parse);
    
        smath.operation = genParse(parse);
        smath.operand   = genParse(parse);
        smath.invert    = genParse(parse);
    
        
        parse.nTab--;
    
    
        genParseNodeEnd(parse, smath);
        return smath;
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

        let value;

        
        switch (op.value)
        {
            case 0: // % 
                value = new NumberValue(
                    invert.value == 0
                        ? input.toNumber() % operand.toNumber()
                        : operand.toNumber() % input.toNumber());
                break;

            case 1: // /
                if (      operand.value == 0
                       && invert .value == 0
                    ||    input  .value == 0
                       && invert .value == 1)
                    value = NumberValue.NaN();
                else
                    value = new NumberValue(
                        invert.value == 0
                            ? input.toNumber() / operand.toNumber()
                            : operand.toNumber() / input.toNumber());
                break;

            case 2: // -
                value = new NumberValue(
                    invert.value == 0
                        ? input.toNumber() - operand.toNumber()
                        : operand.toNumber() - input.toNumber());
                break;

            case 3: // +
                value = new NumberValue(
                    invert.value == 0
                        ? input.toNumber() + operand.toNumber()
                        : operand.toNumber() + input.toNumber());
                break;

            case 4: // *
                value = new NumberValue(
                    invert.value == 0
                        ? input.toNumber() * operand.toNumber()
                        : operand.toNumber() * input.toNumber());
                break;

            case 5: // eˣ
                value = new NumberValue(
                    invert.value == 0
                        ? Math.pow(input.toNumber(), operand.toNumber())
                        : Math.pow(operand.toNumber(), input.toNumber()));
                break;

            default:
                consoleError('invalid math operation');
        }


        value.decimals = Math.max(value.decimals, maxDecimals);

        return value;
    }
    else
        return input;
}