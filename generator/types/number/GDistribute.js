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

        
        this.updateValues =
        [
            ['from',  from ],
            ['start', start],
            ['end',   end  ]
        ];


        if (  !isEmpty(parse.repeats)
            && parse.repeats.at(-1).nodeId == this.repeatNodeId)
        {
            const repeat = parse.repeats.at(-1);

            this.current.value += step;

            // if (   parse.repeats.length == 1
            //     && parse.repeats[0].iteration == parse.repeats[0].repeat.total-1)
            // {
            //     if (   this.repeatNodeId != NULL
            //         && parse.repeats[0].nodeId != this.repeatNodeId)
            //         console.warn('Generator: Invalid nested repeat on \'' + this.nodeId + '\'');
    
            //     //parse.repeats.pop();
            // }
                   
            // if (repeat.iteration == repeat.total-1)
            // {
            //     // if (parse.repeats.at(-1).nodeId != this.repeatNodeId)
            //     //     console.warn('Generator: Invalid nested repeat on \'' + this.nodeId + '\'');
            //     // else
            //         parse.repeats.pop();
            // }
        }


        this.validate();

        return this;
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.start) this.start.pushValueUpdates(parse);
        if (this.end  ) this.end  .pushValueUpdates(parse);
    }



    invalidate()
    {
        super.invalidate();

        if (this.start) this.start.invalidate();
        if (this.end  ) this.end  .invalidate();
    }
}
