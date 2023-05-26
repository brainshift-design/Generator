class GTextFetch
extends GTextType
{
    input = null;
    
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

        if (this.input) 
            copy.input = this.input.copy();

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
        // console.log('cachedValue =', cachedValue);

        
        genInitNodeProgress(this.nodeId);


        if (cachedValue.value == '')
        {
            try 
            {
                await fetch(request.value)
                    .then(response => response.text())
                    .then(text => this.value = new TextValue(text));
            }
            catch (e)
            {
                this.value = 
                    request.value.trim() == NULL
                    ? new TextValue()
                    : new TextValue(e.message);
            }
        }
        else
        {
            this.value = this.cachedValue.copy();
        }


        this.updateValues =
        [
            [returnValueId, this.value],
            ['request',     request   ]
        ];
        
        
        this.validate();

        return this;
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.input  ) this.input  .pushValueUpdates(parse);
        if (this.request) this.request.pushValueUpdates(parse);
    }



    invalidateInputs()
    {
        super.invalidateInputs();

        if (this.input  ) this.input  .invalidateInputs();
        if (this.request) this.request.invalidateInputs();
    }
}