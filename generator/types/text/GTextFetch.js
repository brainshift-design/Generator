class GTextFetch
extends GOperator
{
    request;
    cachedValue;



    constructor(nodeId, options)
    {
        super(TEXT_FETCH, nodeId, options);
    }


    
    copy()
    {
        const copy = new GTextFetch(this.nodeId, this.options);

        copy.copyBase(this);

        copy.request     = this.request    .copy();
        copy.cachedValue = this.cachedValue.copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        const request     = (await this.request    .eval(parse)).toValue();
        const cachedValue = (await this.cachedValue.eval(parse)).toValue();

        
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
                // const parts = e.message.split(':');
                
                this.value = 
                    request.value.trim() == NULL
                    ? new TextValue()
                    : new TextValue('invalid request');//parts[Math.min(1, parts.length-1)]);
            }
        }
        else
        {
            this.value = this.cachedValue.copy();
        }


        this.setUpdateValues(parse,
        [
            ['preview', this.value],
            ['value',   this.value],
            ['request', request   ]
        ]);
        
        
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



    invalidateInputs(parse, from)
    {
        super.invalidateInputs(parse, from);

        if (this.request) this.request.invalidateInputs(parse, from);

        this.cachedValue = new TextValue();
    }
}