class GSimpleMinMax
extends GOperator1
{
    static { nodeTypes[NUMBER_SIMPLE_MINMAX] = this; }



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
        const copy = new GSimpleMinMax(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.operand  ) copy.operand   = this.operand  .copy();
        if (this.operation) copy.operation = this.operation.copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        this.value = new NumberValue(0);

        
        const input   = await evalNumberOrListValue(this.input,     parse);
        const operand = await evalNumberValue      (this.operand,   parse);
        const op      = await evalNumberValue      (this.operation, parse);


        if (input)
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
                            ? getSimpleMinMaxValue(item, operand, op, this.options.enabled)
                            : NumberValue.NaN());   
                    }
                }
                else
                {
                    this.value = getSimpleMinMaxValue(input, operand, op, this.options.enabled);
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



    static parseRequest(parse)
    {
        const [, nodeId, options, ignore] = genParseNodeStart(parse);


        const sminmax = new GSimpleMinMax(nodeId, options);
    

        let nInputs = -1;
        
        if (!ignore)
        {
            nInputs = parseInt(parse.move());
            consoleAssert(nInputs == 0 || nInputs == 1, 'nInputs must be [0, 1]');
        }

        
        if (parse.settings.logRequests) 
            logReq(sminmax, parse, ignore, nInputs);


        if (ignore) 
        {
            genParseNodeEnd(parse, sminmax);
            return parse.parsedNodes.find(n => n.nodeId == nodeId);
        }


        parse.nTab++;


        if (nInputs == 1)
            sminmax.input = genParse(parse);

        sminmax.operand   = genParse(parse);
        sminmax.operation = genParse(parse);

        
        parse.nTab--;


        genParseNodeEnd(parse, sminmax);
        return sminmax;
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
            ? Math.min(input.value, operand.toNumber())
            : Math.max(input.value, operand.toNumber()));
    }
    else
        return input;
}