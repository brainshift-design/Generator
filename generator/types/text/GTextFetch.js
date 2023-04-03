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


        genQueueMessageToUi(
        {
            cmd:   'uiInitNodeProgress',
            nodeId: this.nodeId
        });


        try 
        {
            await fetch(request.value)
                .then(response => response.text())
                .then(text => this.value = new TextValue(text));
        }
        catch (e)
        {
            this.value = 
                this.request.value.trim() == NULL
                ? TextValue.NaN
                : this.value = new TextValue(e.message);
        }


        genPushUpdateValue(parse, this.nodeId, 'value',   this.value);
        genPushUpdateValue(parse, this.nodeId, 'request', request   );

        
        this.validate();

        return this;
    }
}



// function genFetchResponse(result, response)
// {
//     console.assert(fetchResolve, 'fetchResolve cannot be null');
//     fetchResolve(response);
//     console.log('resolve');
// }