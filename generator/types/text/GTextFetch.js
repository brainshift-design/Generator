class GTextFetch
extends GOperator
{
    request;
    cachedValue;



    constructor(nodeId, options)
    {
        super(TEXT_FETCH, nodeId, options);
    }


    
    reset()
    {
        super.reset();

        this.request     = null;
        this.cachedValue = null;
    }



    copy()
    {
        const copy = new GTextFetch(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.request    ) copy.request     = this.request    .copy();
        if (this.cachedValue) copy.cachedValue = this.cachedValue.copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        const request     = await evalTextValue(this.request,     parse);
        const cachedValue = await evalTextValue(this.cachedValue, parse);

        
        genInitNodeProgress(this.nodeId);


        if (cachedValue.value == '')
        {
            try 
            {
                const response = await fetch(request.value);
                const content  = await response.text();
                
                this.value = new TextValue(content);
            }
            catch (e)
            {
                this.value = 
                    request.value.trim() == NULL
                    ? new TextValue()
                    : new TextValue('invalid request');
            }
        }
        else
        {
            this.value = this.cachedValue.copy();
        }


        this.setUpdateValues(parse,
        [
            ['value',   this.value],
            ['request', request   ]
        ]);
        
        
        if (parse.settings.showTextTooltips)
        {
            this.setUpdateValues(parse,
            [
                ['preview', this.value]
            ],
            true);
        }


        this.validate();

        return this;
    }



    isValid()
    {
        return this.request && this.request.isValid();
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.request) this.request.pushValueUpdates(parse);
    }



    invalidateInputs(parse, from, force)
    {
        super.invalidateInputs(parse, from, force);

        if (this.request) this.request.invalidateInputs(parse, from, force);

        this.cachedValue = new TextValue();
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        if (this.request) this.request.iterateLoop(parse);
    }
}