class GBuckleList
extends GOperator1
{
    static { nodeTypes[BUCKLE_LIST] = this; }



    amount;



    constructor(nodeId, options)
    {
        super(BUCKLE_LIST, nodeId, options);
    }


    
    reset()
    {
        super.reset();

        this.buckle = null;
    }



    copy()
    {
        const copy = new GBuckleList(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.amount) copy.amount = this.amount.copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        const input  = await evalListValue  (this.input,  parse);
        const amount = await evalNumberValue(this.amount, parse);

        amount.value = Math.round(amount.value);
        
        
        if (   input
            && input.isValid())
        {
            const _amount = Math.min(amount.value + 1, Math.floor(input.items.length/2));

            if (this.options.enabled)
            {
                const temp1 = 
                [
                    ...input.items.slice(input.items.length - _amount).map(i => i.value),
                    ...input.items.slice(0, _amount)                  .map(i => i.value).map(i => i - input.items[0].value + input.items.at(-1).value)
                ];

                const temp2 = 
                [
                    ...input.items.slice(input.items.length - _amount).map(i => i.value).map(i => i - input.items.at(-1).value + input.items[0].value),
                    ...input.items.slice(0, _amount)                  .map(i => i.value)
                ];

                consoleAssert(
                    temp1.length == temp2.length,
                    'error building list edge blend');

                
                const temp = [];

                for (let i = 0; i < _amount*2; i++)
                    temp.push(new NumberValue(lerp(temp1[i], temp2[i], i/(_amount*2-1))));


                this.value = new ListValue();

                for (let i = 0; i < _amount; i++)
                    this.value.items.push(temp[_amount + i]);

                for (let i = _amount; i < input.items.length - _amount; i++)
                    this.value.items.push(input.items[i]);

                for (let i = 0; i < _amount; i++)
                    this.value.items.push(temp[i]);
            }
            else
                this.value = input;
        }
        else
            this.value = ListValue.NaN();
    

        this.setUpdateValues(parse, 
        [
            ['length', new NumberValue(this.value.items.length)],
            ['amount', amount                                  ]
        ]); 
               

        if (parse.settings.showListTooltips)
        {
            this.setUpdateValues(parse,
            [
                ['preview', new ListValue(this.value.items.slice(0, Math.min(this.value.items.length, 11)))]
            ],
            true);
        }


        this.validate();

        return this;
    }



    static parseRequest(parse)
    {
        const [, nodeId, options, ignore] = genParseNodeStart(parse);
    
    
        const buckle = new GBuckleList(nodeId, options);
       
    
        let nInputs = -1;
        
        if (!ignore)
        {
            nInputs = parseInt(parse.move());
            consoleAssert(nInputs == 0 || nInputs == 1, 'nInputs must be [0, 1]');
        }
    
        
        if (parse.settings.logRequests) 
            logReq(buckle, parse, ignore, nInputs);
    
    
        if (ignore) 
        {
            genParseNodeEnd(parse, buckle);
            return parse.parsedNodes.find(n => n.nodeId == nodeId);
        }
    
    
        parse.nTab++;
    
    
        if (nInputs == 1)
            buckle.input = genParse(parse);
      
    
        buckle.amount = genParse(parse);
    
        
        parse.nTab--;
    
    
        genParseNodeEnd(parse, buckle);
        return buckle;
    }
}
