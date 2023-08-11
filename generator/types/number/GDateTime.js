class GDateTime
extends GOperator
{
    seconds   = null;
    minutes   = null;
    hours     = null;
    dayOfWeek = null;
    date      = null;
    month     = null;
    year      = null;


    
    constructor(nodeId, options)
    {
        super(NUMBER_LIMITS, nodeId, options);
    }


    
    copy()
    {
        const copy = new GLimits(this.nodeId, this.options);
        
        copy.copyBase(this);
        
        copy.seconds   = this.seconds  .copy();
        copy.minutes   = this.minutes  .copy();
        copy.hours     = this.hours    .copy();
        copy.dayOfWeek = this.dayOfWeek.copy();
        copy.date      = this.date     .copy();
        copy.month     = this.month    .copy();
        copy.year      = this.year     .copy();

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



    invalidateInputs(from)
    {
        super.invalidateInputs(from);

        if (this.year     ) this.year     .invalidateInputs(from);
        if (this.month    ) this.month    .invalidateInputs(from);
        if (this.date     ) this.date     .invalidateInputs(from);
        if (this.dayOfWeek) this.dayOfWeek.invalidateInputs(from);
        if (this.hours    ) this.hours    .invalidateInputs(from);
        if (this.minutes  ) this.minutes  .invalidateInputs(from);
        if (this.seconds  ) this.seconds  .invalidateInputs(from);
    }
}
