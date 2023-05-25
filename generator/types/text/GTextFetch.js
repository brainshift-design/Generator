//var fetchResolve = null;
//fetchResponse = null;



class GTextFetch
extends GTextType
{
    input = null;

    request;



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

        copy.request = this.request.copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        const request = (await this.request.eval(parse)).toValue();


        genInitNodeProgress(this.nodeId);


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
                ? new TextValue() //TextValue.NaN
                : new TextValue(e.message);
        }


        this.updateValues =
        [
            [returnValueId,   this.value],
            ['request', request   ]
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



    invalidate()
    {
        super.invalidate();

        if (this.input  ) this.input  .invalidate();
        if (this.request) this.request.invalidate();
    }
}



// function genFetchResponse(result, response)
// {
//     console.assert(fetchResolve, 'fetchResolve cannot be null');
//     fetchResolve(response);
//     console.log('resolve');
// }