class GDateTime
extends GOperator
{
    static { nodeTypes[NUMBER_DATETIME] = this; }



    seconds   = null;
    minutes   = null;
    hours     = null;
    dayOfWeek = null;
    date      = null;
    month     = null;
    year      = null;
    
    
    
    constructor(nodeId, options)
    {
        super(NUMBER_DATETIME, nodeId, options);
    }


    
    reset()
    {
        super.reset();
        
        this.seconds   = null;
        this.minutes   = null;
        this.hours     = null;
        this.dayOfWeek = null;
        this.date      = null;
        this.month     = null;
        this.year      = null;
    }



    copy()
    {
        const copy = new GLimits(this.nodeId, this.options);
        
        copy.copyBase(this);
        
        if (this.seconds  ) copy.seconds   = this.seconds  .copy();
        if (this.minutes  ) copy.minutes   = this.minutes  .copy();
        if (this.hours    ) copy.hours     = this.hours    .copy();
        if (this.dayOfWeek) copy.dayOfWeek = this.dayOfWeek.copy();
        if (this.date     ) copy.date      = this.date     .copy();
        if (this.month    ) copy.month     = this.month    .copy();
        if (this.year     ) copy.year      = this.year     .copy();

        return copy;
    }    
    
    
    
    isCached()
    {
        return super.isCached()
            && (!this.year      || this.year     .isCached())
            && (!this.month     || this.month    .isCached())
            && (!this.date      || this.date     .isCached())
            && (!this.dayOfWeek || this.dayOfWeek.isCached())
            && (!this.hours     || this.hours    .isCached())
            && (!this.minutes   || this.minutes  .isCached())
            && (!this.seconds   || this.seconds  .isCached())
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        this.updateValues = [];

        
        if (this.options.enabled)
        {
            const dateTime = new Date();

            const seconds   = new NumberValue(dateTime.getSeconds() );
            const minutes   = new NumberValue(dateTime.getMinutes() );
            const hours     = new NumberValue(dateTime.getHours()   );
            const dayOfWeek = new NumberValue(dateTime.getDay()     );
            const date      = new NumberValue(dateTime.getDate()    );
            const month     = new NumberValue(dateTime.getMonth()   );
            const year      = new NumberValue(dateTime.getFullYear());


            this.setUpdateValues(parse,
            [
                ['seconds',   seconds  ],
                ['minutes',   minutes  ],
                ['hours',     hours    ],
                ['dayOfWeek', dayOfWeek],
                ['date',      date     ],
                ['month',     month    ],
                ['year',      year     ]
            ]);    
        }    

        
        this.validate();

        return this;
    }    



    isValid()
    {
        return this.year      && this.year     .isValid()
            && this.month     && this.month    .isValid()
            && this.date      && this.date     .isValid()
            && this.dayOfWeek && this.dayOfWeek.isValid()
            && this.hours     && this.hours    .isValid()
            && this.minutes   && this.minutes  .isValid()
            && this.seconds   && this.seconds  .isValid();
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.year     ) this.year     .pushValueUpdates(parse);
        if (this.month    ) this.month    .pushValueUpdates(parse);
        if (this.date     ) this.date     .pushValueUpdates(parse);
        if (this.dayOfWeek) this.dayOfWeek.pushValueUpdates(parse);
        if (this.hours    ) this.hours    .pushValueUpdates(parse);
        if (this.minutes  ) this.minutes  .pushValueUpdates(parse);
        if (this.seconds  ) this.seconds  .pushValueUpdates(parse);
    }    



    invalidateInputs(parse, from, force)
    {
        super.invalidateInputs(parse, from, force);

        if (this.year     ) this.year     .invalidateInputs(parse, from, force);
        if (this.month    ) this.month    .invalidateInputs(parse, from, force);
        if (this.date     ) this.date     .invalidateInputs(parse, from, force);
        if (this.dayOfWeek) this.dayOfWeek.invalidateInputs(parse, from, force);
        if (this.hours    ) this.hours    .invalidateInputs(parse, from, force);
        if (this.minutes  ) this.minutes  .invalidateInputs(parse, from, force);
        if (this.seconds  ) this.seconds  .invalidateInputs(parse, from, force);
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        if (this.year     ) this.year     .iterateLoop(parse);
        if (this.month    ) this.month    .iterateLoop(parse);
        if (this.date     ) this.date     .iterateLoop(parse);
        if (this.dayOfWeek) this.dayOfWeek.iterateLoop(parse);
        if (this.hours    ) this.hours    .iterateLoop(parse);
        if (this.minutes  ) this.minutes  .iterateLoop(parse);
        if (this.seconds  ) this.seconds  .iterateLoop(parse);
    }    



    static parseRequest(parse)
    {
        const [, nodeId, options, ignore] = genParseNodeStart(parse);
    
    
        const dateTime = new GDateTime(nodeId, options);
    
    
        if (parse.settings.logRequests) 
            logReq(dateTime, parse, ignore);
    
    
        if (ignore) 
        {
            genParseNodeEnd(parse, dateTime);
            return parse.parsedNodes.find(n => n.nodeId == nodeId);
        }
    
    
        parse.nTab++;
    
    
        dateTime.seconds   = genParse(parse);
        dateTime.minutes   = genParse(parse);
        dateTime.hours     = genParse(parse);
        dateTime.dayOfWeek = genParse(parse);
        dateTime.date      = genParse(parse);
        dateTime.month     = genParse(parse);
        dateTime.year      = genParse(parse);
    
    
        parse.nTab--;
    
    
        genParseNodeEnd(parse, dateTime);
        return dateTime;
    }
}
