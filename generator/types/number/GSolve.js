class GSolve
extends GOperator1
{
    current;
    target;

    temp;


    
    constructor(nodeId, options)
    {
        super(NUMBER_LIMITS, nodeId, options);
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


        let   current = (await this.current.eval(parse)).toValue();
        const target  = (await this.target .eval(parse)).toValue();


        if (   this.input
            //&& current.isValid()
            && target .isValid())
        {
            let input = (await this.input.eval(parse)).toValue();

            consoleAssert(
                input.type == NUMBER_VALUE, 
                'input.type must be NUMBER_VALUE');


            if (this.options.enabled)
            {
                const diffStart = target.value - current.value;
                let   diff      = diffStart;
                let   prevDiff  = 0;


                let   temp      = 0;
                let   step      = Number.MAX_SAFE_INTEGER/2;


                let   iter      = 0;
                const maxIter   = 1000;
                

                genInitNodeProgress(this.nodeId);


                parse.totalProgress += maxIter;


                while (iter++ < maxIter)
                {
                    temp += step;


                    if (this.input.type == PARAM)
                        this.input.node[this.input.paramId].value = temp;
                        
                    this.current.invalidateInputs(parse, this);
                    current = (await this.current.eval(parse)).toValue();


                    if (!current.isValid())
                        diff = Number.MIN_SAFE_INTEGER;
                    else
                        diff = target.value - current.value;

                    
                    if (Math.abs(diff) < 0.0000001)
                        break;
                        

                    if (   Math.abs (diff) >  Math.abs (prevDiff)
                        || Math.sign(diff) != Math.sign(prevDiff))
                        step /= -2;


                    prevDiff = diff;
                    console.log('diff =', diff);
                    console.log('');


                    parse.currentProgress++;


                    genUpdateNodeProgress(parse, this.nodeId, iter / maxIter);
                }


                if (iter < maxIter)
                {
                    parse.currentProgress += maxIter - iter;

                    input = (await this.input.eval(parse)).toValue();
                    this.value = input;
                }
                else
                {
                    this.value = NumberValue.NaN;
                    console.warn('max solve iterations');
                }
            }
            else
                this.value = input;
        }
        else
        {
            if (this.input) 
                await this.input.eval(parse);

            this.value = NumberValue.NaN;
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



    invalidateInputs(parse, from)
    {
        super.invalidateInputs(parse, from);

        if (this.current) this.current.invalidateInputs(parse, from);
        if (this.target ) this.target .invalidateInputs(parse, from);
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        if (this.current) this.current.iterateLoop(parse);
        if (this.target ) this.target .iterateLoop(parse);
    }
}
