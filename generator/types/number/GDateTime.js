class GDateTime
extends GNumberType
{
    year         = null;
    month        = null;
    date         = null;
    dayOfWeek    = null;
    hours        = null;
    minutes      = null;
    seconds      = null;
    milliseconds = null;


    
    constructor(nodeId, options)
    {
        super(NUMBER_LIMITS, nodeId, options);
    }


    
    copy()
    {
        const copy = new GLimits(this.nodeId, this.options);

        copy.copyBase(this);

        copy.year         = this.year        .copy();
        copy.month        = this.month       .copy();
        copy.date         = this.date        .copy();
        copy.dayOfWeek    = this.dayOfWeek   .copy();
        copy.hours        = this.hours       .copy();
        copy.minutes      = this.minutes     .copy();
        copy.seconds      = this.seconds     .copy();
        copy.milliseconds = this.milliseconds.copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        if (this.options.enabled)
        {
            const dateTime = new Date();

            const year         = new NumberValue(dateTime.getFullYear()    );
            const month        = new NumberValue(dateTime.getMonth()+1     );
            const date         = new NumberValue(dateTime.getDate()        );
            const dayOfWeek    = new NumberValue(dateTime.getDay()         );
            const hours        = new NumberValue(dateTime.getHours()       );
            const minutes      = new NumberValue(dateTime.getMinutes()     );
            const seconds      = new NumberValue(dateTime.getSeconds()     );
            const milliseconds = new NumberValue(dateTime.getMilliseconds());


            this.updateValues =
                [['year'        , year        ],
                 ['month'       , month       ],
                 ['date'        , date        ],
                 ['dayOfWeek'   , dayOfWeek   ],
                 ['hours'       , hours       ],
                 ['minutes'     , minutes     ],
                 ['seconds'     , seconds     ],
                 ['milliseconds', milliseconds]];
        }
        else
            this.updateValues = [];

        
        this.validate();

        return this;
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.year        ) this.year        .pushValueUpdates(parse);
        if (this.month       ) this.month       .pushValueUpdates(parse);
        if (this.date        ) this.date        .pushValueUpdates(parse);
        if (this.dayOfWeek   ) this.dayOfWeek   .pushValueUpdates(parse);
        if (this.hours       ) this.hours       .pushValueUpdates(parse);
        if (this.minutes     ) this.minutes     .pushValueUpdates(parse);
        if (this.seconds     ) this.seconds     .pushValueUpdates(parse);
        if (this.milliseconds) this.milliseconds.pushValueUpdates(parse);
    }



    isCached()
    {
        return super.isCached()
            && (!this.year         || this.year        .isCached())
            && (!this.month        || this.month       .isCached())
            && (!this.date         || this.date        .isCached())
            && (!this.dayOfWeek    || this.dayOfWeek   .isCached())
            && (!this.hours        || this.hours       .isCached())
            && (!this.minutes      || this.minutes     .isCached())
            && (!this.seconds      || this.seconds     .isCached())
            && (!this.milliseconds || this.milliseconds.isCached());
    }



    invalidateInputs()
    {
        super.invalidateInputs();

        if (this.year        ) this.year        .invalidateInputs();
        if (this.month       ) this.month       .invalidateInputs();
        if (this.date        ) this.date        .invalidateInputs();
        if (this.dayOfWeek   ) this.dayOfWeek   .invalidateInputs();
        if (this.hours       ) this.hours       .invalidateInputs();
        if (this.minutes     ) this.minutes     .invalidateInputs();
        if (this.seconds     ) this.seconds     .invalidateInputs();
        if (this.milliseconds) this.milliseconds.invalidateInputs();
    }
}
