class GDistribute
extends GNumberType
{
    start;
    end;

    current      = null;


    init         = false;
    
    repeaNodetId = NULL;



    constructor(nodeId, options)
    {
        super(NUMBER_DISTRIBUTE, nodeId, options);
    }


    
    copy()
    {
        const copy = new GDistribute(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.start  ) copy.start   = this.start  .copy();
        if (this.end    ) copy.step    = this.end    .copy();

        if (this.current) copy.current = this.current.copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;
            

        // input not used for evaluation


        const start = (await this.start.eval(parse)).toValue();
        const end   = (await this.end  .eval(parse)).toValue();
    

        if (!this.init)
        {
            this.current = start.copy();
            this.init    = true;
        }
        

        this.value = new NumberValue(
            this.current.value,
            Math.max(start.decimals, end.decimals));

        
        if (parse.isLastRepeat())
        {
            genPushUpdateValue(parse, this.nodeId, 'start', start);
            genPushUpdateValue(parse, this.nodeId, 'end',   end  );
        }


        const step = 
            !isEmpty(parse.repeats)
            ? (end.toNumber() - start.toNumber()) / Math.max(1, parse.repeats.at(-1).total - 1)
            : 0;


        if (!parse.repeats.find(r => r.nodeId == this.repeatNodeId))
            this.current.value = (start.toNumber() + end.toNumber()) / 2; //+= step;

        else if (!isEmpty(parse.repeats)
               && parse.repeats.at(-1).nodeId == this.repeatNodeId)
        {
            const repeat = parse.repeats.at(-1);

            this.current.value += step;
                
            if (repeat.iteration == repeat.total-1)
            {
                // if (parse.repeats.at(-1).nodeId != this.repeatNodeId)
                //     console.warn('Generator: Invalid nested repeat on \'' + this.nodeId + '\'');
                // else
                    parse.repeats.pop();
            }
        }


        this.validate();

        return this;
    }



    invalidate()
    {
        super.invalidate();

        if (this.start) this.start.invalidate();
        if (this.end  ) this.end  .invalidate();
    }
}
