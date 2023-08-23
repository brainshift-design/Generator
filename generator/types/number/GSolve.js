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
                let   prevDiff  = 0;


                let   start     = input.copy();
                let   step      = Number.MAX_SAFE_INTEGER;


                const maxIter = 1000;
                let   iter    = 0;
                

                genInitNodeProgress(this.nodeId);


                this.temp = new NumberValue(Number.MIN_SAFE_INTEGER);


                parse.totalProgress += maxIter;


                while (iter++ < maxIter)
                {
                    // console.log('step =', step);
                    // console.log('diff =', diff);
                    // console.log('prevDiff =', prevDiff);
                    
                    this.temp.value += step;

                    // console.log('this.temp.value =', this.temp.value);
                    // console.log('');

                    //console.log('this.input.type =', this.input.type);
                    if (this.input.type == PARAM)
                        this.input.node[this.input.paramId].value = this.temp.value;
                    // else
                    //     this.input.value = this.temp.value;

                        
                    this.current.invalidateInputs(parse, this);
                    current = (await this.current.eval(parse)).toValue();


                    // console.log('this.temp.value =', this.temp.value);
                    // console.log('target.value =', target.value);
                    // console.log('current.value =', current.value);
                    // console.log('');

                    if (!current.isValid())
                        diff = Number.MAX_SAFE_INTEGER;
                    else
                        diff = target.value - current.value;

                    if (Math.abs(diff) < 0.0000001)
                        break;
                        

                    if (   Math.abs (diff) >  Math.abs (prevDiff)
                        || Math.sign(diff) != Math.sign(prevDiff))
                        step /= -3; //= -Math.sign(step) * Math.pow(Math.abs(step), 0.75);

                    prevDiff = diff;


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
                    genPushUpdateValue(parse, this.input.nodeId, 'value', start);
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
}
