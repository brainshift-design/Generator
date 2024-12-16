class GIndexToName
extends GOperator
{
    name;
    index;


    
    constructor(nodeId, options)
    {
        super(INDEX_TO_NAME, nodeId, options);
    }


    
    reset()
    {
        super.reset();

        this.index = null;
    }



    copy()
    {
        const copy = new GIndexToName(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.name ) copy.name  = this.name .copy();
        if (this.index) copy.index = this.index.copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        const name  = await evalTextValue  (this.name,  parse);
        const index = await evalNumberValue(this.index, parse);


        switch (name.value)
        {
            case 0: this.value = new TextValue(
                [
                    'monday', 
                    'tuesday', 
                    'wednesday', 
                    'thursday', 
                    'friday', 
                    'saturday', 
                    'sunday'
                ] 
                [index.value-1]);

                break;

            case 1: this.value = new TextValue(
                [
                    'january', 
                    'february', 
                    'march', 
                    'april', 
                    'may', 
                    'june', 
                    'july',
                    'august',
                    'september',
                    'october',
                    'november',
                    'december'
                ] 
                [index.value-1]);

                break;

            case 2:
                this.value = new TextValue(figUniqueFontNames[index.value]);
                break;

        }


        this.setUpdateValues(parse,
        [
            //['value', this.value],
            ['name',  name      ],
            ['index', index     ]
        ]);


        this.validate();

        return this;
    }



    isValid()
    {
        return super.isValid()
            && this.index && this.index.isValid()
            && this.name  && this.name .isValid();
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.index) this.index.pushValueUpdates(parse);
        if (this.name ) this.name .pushValueUpdates(parse);
    }



    invalidateInputs(parse, from, force)
    {
        super.invalidateInputs(parse, from, force);

        if (this.index) this.index.invalidateInputs(parse, from, force);
        if (this.name ) this.name .invalidateInputs(parse, from, force);
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        if (this.index) this.index.iterateLoop(parse);
        if (this.name ) this.name .iterateLoop(parse);
    }



    static parseRequest(parse)
    {
        const [, nodeId, options, ignore] = genParseNodeStart(parse);
    
    
        const index = new GIndexToName(nodeId, options);
       
    
        let nInputs = -1;
        
        if (!ignore)
        {
            nInputs = parseInt(parse.move());
            consoleAssert(nInputs == 0 || nInputs == 1, 'nInputs must be [0, 1]');
        }
    
        
        if (parse.settings.logRequests) 
            logReq(index, parse, ignore, nInputs);
    
    
        if (ignore) 
        {
            genParseNodeEnd(parse, index);
            return parse.parsedNodes.find(n => n.nodeId == nodeId);
        }
    
    
        parse.nTab++;
    
    
        index.name  = genParse(parse);
        index.index = genParse(parse);
    
        
        parse.nTab--;
    
    
        genParseNodeEnd(parse, index);
        return index;
    }
}
