class GSolve
extends GNumberType1
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
            && current.isValid()
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
                let   prevDiff  = diffStart;


                let   start     = input.copy();
                let   step      = Number.MAX_SAFE_INTEGER;


                const maxIter = 1000;
                let   iter    = 0;
                

                genInitNodeProgress(this.nodeId);


                this.temp = new NumberValue(Number.MIN_SAFE_INTEGER);


                while (iter++ < maxIter)
                {
                    this.temp.value += step;
                    // console.log('this.temp.value =', this.temp.value);
                    //console.log('diff =', step);
                    console.log('step =', step);

                    this.input.feedbackValue = this.getFeedbackValue;
                    this.input.valid = false;

                    // if (this.input.type == PARAM)
                    //     this.input.node.valid = false;
                        
                    current = (await this.current.eval(parse)).toValue();

                    this.input.feedbackValue = null;


                    diff = target.value - current.value;

                    if (   /*Math.abs(diff) < 0.0000001
                        && */Math.abs(step) < 0.0000001)
                        break;
                        

                    if (   Math.abs (diff) >  Math.abs (prevDiff)
                        || Math.sign(diff) != Math.sign(prevDiff))
                        step /= -2;

                    prevDiff = diff;


                    genUpdateNodeProgress(this.nodeId, iter / maxIter);
                }


                if (iter < maxIter)
                {
                    input = (await this.input.eval(parse)).toValue();
                    this.value = input;
                }
                else
                {
                    this.value = NumberValue.NaN;
                    genPushUpdateValue(parse, this.input.nodeId, 'value', start);
                    console.log('max solve iterations');
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
            ['value',   this.value],
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



    getFeedbackValue = () => this.temp.copy();



    invalidateInputs(from)
    {
        super.invalidateInputs(from);

        if (this.current) this.current.invalidateInputs(from);
        if (this.target ) this.target .invalidateInputs(from);
    }
}
