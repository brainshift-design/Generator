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

                let   start     = input.copy();


                const maxIter = 1000;
                let   iter    = 0;

                
                let   step    = Math.random() * Number.MAX_SAFE_INTEGER/(maxIter+2);//start.value / 2;
                

                this.temp = start.copy();


                genInitNodeProgress(this.nodeId);


                while (Math.abs(diff) > 0.0000001
                    && iter++ < maxIter)
                {
                    console.log('diff =', diff);
                    console.log('step =', step);

                    this.temp.value += step;


                    this.input.altValue = this.altInputValue;
                    this.input.valid    = false;

                    current = (await this.current.eval(parse)).toValue();

                    this.input.altValue = null;


                    diff = target.value - current.value;

                    if (   Math.abs(diff) > Math.abs(prevDiff))
                        //|| Math.sign(diff) != Math.sign(prevDiff))
                        step /= -2;//-(2 + step/1000000);

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
                    console.log('max solve iterations');
                }
            }
            else
                this.value = input;
        }
        else
            this.value = NumberValue.NaN;


        genPushUpdateValue(parse, this.nodeId, 'value',   this.value);
        genPushUpdateValue(parse, this.nodeId, 'current', current   );
        genPushUpdateValue(parse, this.nodeId, 'target',  target    );


        this.validate();

        return this;
    }



    altInputValue = () =>
    {
        return this.temp.copy();
    }



    isCached()
    {
        return super.isCached()
            && this.current.isCached()
            && this.target .isCached();
    }
}
