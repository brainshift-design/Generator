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



    eval(parse)
    {
        if (this.isCached())
            return this;


        const request = this.request.eval(parse).toValue();


        this.value = TextValue.NaN;

        console.log('1');
        (async () =>
        {
            try 
            {
                this.value = new TextValue((await fetch(request.value)).text());
                console.log('2');
            }
            catch (e)
            {
                console.log('e.message =', e.message);
                this.value = new TextValue(e.message);
                console.log('3');
            }
        })();
        console.log('4');


        genPushUpdateValue(parse, this.nodeId, 'request', request   );
        genPushUpdateValue(parse, this.nodeId, 'value',   this.value);

        
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