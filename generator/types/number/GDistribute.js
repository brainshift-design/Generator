class GDistribute
extends GNumberType
{
    from;
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

        if (this.from   ) copy.from    = this.from   .copy();
        if (this.start  ) copy.start   = this.start  .copy();
        if (this.end    ) copy.end     = this.end    .copy();

        if (this.current) copy.current = this.current.copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;
            

        // input not used for evaluation


        const from  = (await this.from .eval(parse)).toValue();
        const start = (await this.start.eval(parse)).toValue();
        const end   = (await this.end  .eval(parse)).toValue();
    

        const repeat = parse.repeats.find(r => r.nodeId == this.repeatNodeId);

        const step = 
            repeat
            ? (end.toNumber() - start.toNumber()) / Math.max(1, parse.repeats.at(-1).total - (from.value == 1 ? 1 : 0))
            : 0;


        if (!this.init)
        {
            if (  !repeat
                || repeat.total <= 1)
            {
                switch (from.value)
                {
                    case 0: this.current = start.copy();                                             break;
                    case 1: this.current = new NumberValue((start.toNumber() + end.toNumber()) / 2); break;
                    case 2: this.current = end.copy();                                               break;
                }
            }
            else
            {
                this.current = start.copy();

                if (from.value == 2)
                    this.current.value += step;
            }


            this.init = true;
        }
        

        this.value = new NumberValue(
            this.current.value,
            Math.max(start.decimals, end.decimals));

        
        if (parse.isLastRepeat())
        {
            genPushUpdateValue(parse, this.nodeId, 'start', start);
            genPushUpdateValue(parse, this.nodeId, 'end',   end  );
            genPushUpdateValue(parse, this.nodeId, 'from',  from );
        }


        if (  !isEmpty(parse.repeats)
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
