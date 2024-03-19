class GSolve
extends GOperator1
{
    current = null;
    target  = null;

    temp    = null;


    
    constructor(nodeId, options)
    {
        super(NUMBER_LIMITS, nodeId, options);
    }


    
    reset()
    {
        super.reset();

        this.current = null;
        this.target  = null;
        this.temp    = null;
    }



    copy()
    {
        const copy = new GSolve(this.nodeId, this.options);

        copy.copyBase(this);

        copy.current = this.current.copy();
        copy.target  = this.target .copy();

        return copy;
    }



    isCached()
    {
        return super.isCached()
            && this.current.isCached()
            && this.target .isCached();
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        let   input   = await evalNumberValue(this.input,   parse);
        let   current = await evalNumberValue(this.current, parse);
        const target  = await evalNumberValue(this.target,  parse);


        if (   input
            && current.isValid()
            && target .isValid())
        {
            consoleAssert(
                input.type == NUMBER_VALUE, 
                'input.type must be NUMBER_VALUE');


            if (this.options.enabled)
            {
                let   diff      = target.value - current.value;
                let   prevDiff  = 0;


                let   temp      = 0;
                let   step      = Number.MAX_SAFE_INTEGER/65536;


                let   iter      = 0;
                const maxIter   = 1000;
                

                genInitNodeProgress(this.nodeId);


                parse.totalProgress += maxIter;


                while (iter++ < maxIter)
                {
                    temp += step;


                    if (this.input.type == PARAM)
                    {
                        this.input.node[this.input.paramId].value    = temp;
                        this.input.node[this.input.paramId].decimals = decDigits(temp);
                    }

                        
                    this.current.invalidateInputs(parse, this);
                    current = await evalNumberValue(this.current, parse);


                    // if (!current.isValid())
                    //     diff = Number.MAX_SAFE_INTEGER;
                    // else
                    if (current.isValid())
                    {
                        diff = target.value - current.value;
                        //console.log('diff =', diff);

                        if (Math.abs(diff) < 0.0000001)
                            break;
                            

                        if (   Math.abs (diff) >  Math.abs (prevDiff)
                            || Math.sign(diff) != Math.sign(prevDiff))
                            step /= -2;

                        // console.log('step =', step);
                        // console.log('');

                        prevDiff = diff;
                    }
                        

                    parse.currentProgress++;
                    genUpdateNodeProgress(parse, this.nodeId, iter / maxIter);
                }


                if (iter < maxIter)
                {
                    parse.currentProgress += maxIter - iter;

                    input = await evalNumberValue(this.input, parse);
                    this.value = input.copy();
                }
                else
                {
                    this.value = NumberValue.NaN.copy();
                    console.warn('max solve iterations');
                }
            }
            else
                this.value = input.copy();
        }
        else
        {
            if (this.input) 
                await this.input.eval(parse);

            this.value = NumberValue.NaN.copy();
        }

        
        // TODO push good result value to input 

        this.setUpdateValues(parse,
        [
            //['value',   this.value],
            ['current', current   ],
            ['target',  target    ]
        ]);


        this.validate();

        return this;
    }



    isValid()
    {
        return super.isValid()
            && this.current && this.current.isValid()
            && this.target  && this.target .isValid();
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.current) this.current.pushValueUpdates(parse);
        if (this.target ) this.target .pushValueUpdates(parse);
    }



    invalidateInputs(parse, from, force)
    {
        super.invalidateInputs(parse, from, force);

        if (this.current) this.current.invalidateInputs(parse, from, force);
        if (this.target ) this.target .invalidateInputs(parse, from, force);
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        if (this.current) this.current.iterateLoop(parse);
        if (this.target ) this.target .iterateLoop(parse);
    }
}
