class GToJson
extends GOperator1
{
    quoteValues = null;
    snowNames   = null;
    singleLine  = null;
    whiteSpace  = null;



    constructor(nodeId, options)
    {
        super(TO_JSON, nodeId, options);
    }


    
    reset()
    {
        super.reset();

        this.quoteValues = null;
        this.showNames   = null;
        this.singleLine  = null;
        this.whiteSpace  = null;
    }



    copy()
    {
        const copy = new GToJson(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.quoteValues) copy.quoteValues = this.quoteValues.copy();
        if (this.showNames  ) copy.showNames   = this.showNames  .copy();
        if (this.singleLine ) copy.singleLine  = this.singleLine .copy();
        if (this.whiteSpace ) copy.whiteSpace  = this.whiteSpace .copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        const input       = await evalValue      (this.input,       parse);
        const quoteValues = await evalNumberValue(this.quoteValues, parse);
        const showNames   = await evalNumberValue(this.showNames,   parse);
        const singleLine  = await evalNumberValue(this.singleLine,  parse);
        const whiteSpace  = await evalNumberValue(this.whiteSpace,  parse);


        if (input)
        {
            let json = '';
            
            json += input.toJsonText(
            {
                tab:          0,
                named:        false,
                forceBraces:  false,
                lastExpanded: false,
                quoteValues:  quoteValues.value > 0,
                showNames:    showNames  .value > 0,
                singleLine:   singleLine .value > 0,
                whiteSpace:   whiteSpace .value > 0
            });

            this.value = new TextValue(json);
        }
        else
            this.value = new TextValue('');


        this.setUpdateValues(parse,
        [
            ['type',        this.outputType()],
            ['quoteValues', quoteValues      ],
            ['showNames',   showNames        ],
            ['singleLine',  singleLine       ],
            ['whiteSpace',  whiteSpace       ]
        ]);


        this.validate();

        return this;
    }



    toValue()
    {
        return this.value
             ? this.value.copy()
             : null;
    }



    isValid()
    {
        return this.quoteValues && this.quoteValues.isValid()
            && this.showNames   && this.showNames  .isValid()
            && this.singleLine  && this.singleLine .isValid()
            && this.whiteSpace  && this.whiteSpace .isValid();
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.quoteValues) this.quoteValues.pushValueUpdates(parse);
        if (this.showNames  ) this.showNames  .pushValueUpdates(parse);
        if (this.singleLine ) this.singleLine .pushValueUpdates(parse);
        if (this.whiteSpace ) this.whiteSpace .pushValueUpdates(parse);
    }



    invalidateInputs(parse, from, force)
    {
        super.invalidateInputs(parse, from, force);

        if (this.quoteValues) this.quoteValues.invalidateInputs(parse, from, force);
        if (this.showNames  ) this.showNames  .invalidateInputs(parse, from, force);
        if (this.singleLine ) this.singleLine .invalidateInputs(parse, from, force);
        if (this.whiteSpace ) this.whiteSpace .invalidateInputs(parse, from, force);
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        if (this.quoteValues) this.quoteValues.iterateLoop(parse);
        if (this.showNames  ) this.showNames  .iterateLoop(parse);
        if (this.singleLine ) this.singleLine .iterateLoop(parse);
        if (this.whiteSpace ) this.whiteSpace .iterateLoop(parse);
    }
}
