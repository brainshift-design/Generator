class GSolve
extends GNumberType
{
    input = null;

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

        if (this.input) 
            copy.input = this.input.copy();

        copy.current = this.current.copy();
        copy.target  = this.target .copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        let   current = (await this.current.eval(parse)).toValue();
        const target  = (await this.target .eval(parse)).toValue();


        //console.log('this.input =', this.input);
        if (this.input)
        {
            let input = (await this.input.eval(parse)).toValue();

            console.assert(
                input.type == NUMBER_VALUE, 
                'input.type must be NUMBER_VALUE');


            if (this.options.enabled)
            {
                const diffStart = target.value - current.value;
                let   diff      = diffStart;
                let   prevDiff  = diffStart;

                let   start     = input.copy();//new NumberValue(Number.MIN_SAFE_INTEGER);//input.copy();
                let   step      = Number.MAX_SAFE_INTEGER;//start.value / 2;
//console.log('start =', start);

                const maxIter = 1000;
                let   iter    = 0;

                
                

                this.temp = input.copy();//start.copy();


                genInitNodeProgress(this.nodeId);


                //let signFlip = 5;

                while (iter++ < maxIter)
                {
                    this.temp.value += step;
                    console.log('this.temp.value =', this.temp.value);


                    this.input.feedbackValue = this.getFeedbackValue;
                    this.input.valid = false;

                    current = (await this.current.eval(parse)).toValue();

                    this.input.feedbackValue = null;


                    diff = target.value - current.value;

                    if (Math.abs(step) < 0.0000001)
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
            this.value = NumberValue.NaN;

        
        // TODO push good result value to input 

        genPushUpdateValue(parse, this.nodeId, 'value',   this.value);
        genPushUpdateValue(parse, this.nodeId, 'current', current   );
        genPushUpdateValue(parse, this.nodeId, 'target',  target    );


        this.validate();

        return this;
    }



    getFeedbackValue = () => this.temp.copy();



    isCached()
    {
        return super.isCached()
            && this.current.isCached()
            && this.target .isCached();
    }
}
