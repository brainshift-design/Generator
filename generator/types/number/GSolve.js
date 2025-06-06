class GSolve
extends GOperator1
{
    static { GNode.types[NUMBER_SOLVE] = this; }



    current          = null;
    target           = null;

    currentConnected = false;

    terminalIds      = [];


    
    constructor(nodeId, options)
    {
        super(NUMBER_SOLVE, nodeId, options);
    }


    
    reset()
    {
        super.reset();

        this.current          = null;
        this.target           = null;

        this.currentConnected = false;

        this.terminalIds      = [];
    }



    copy()
    {
        const copy = new GSolve(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.current) copy.current = this.current.copy();
        if (this.target ) copy.target  = this.target .copy();

        copy.terminalIds = [...this.terminalIds];

        return copy;
    }



    isCached()
    {
        return super.isCached()
            && this.current.isCached()
            && this.target .isCached();
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        let input   = await evalNumberValue(this.input,   parse);
        let current = await evalNumberValue(this.current, parse);
        let target  = await evalNumberValue(this.target,  parse);


        if (   input
            && this.input.type == PARAM
            && target.isValid())
        {
            consoleAssert(
                 input.type == NUMBER_VALUE, 
                'input.type must be NUMBER_VALUE');


            if (this.options.enabled)
            {
                let   diff     = target.value - current.value;
                let   prevDiff = 0;


                let   _input   = current.isValid() ? input.value : 0;
                let   step     = 10;


                let   iter     = 0;
                const maxIter  = parse.settings.maxSolveIterations;
                

                genInitNodeProgress(this.nodeId);


                parse.totalProgress += maxIter;


                const inParamValue = this.input.node[this.input.paramId];


                parse.solvers.push(this);


                while (iter++ < maxIter)
                {
                    _input += step;


                    if (inParamValue)
                    {
                        if (inParamValue.parent)
                        {
                            inParamValue.parent.updateValueFromParam(
                                this.input.paramId, 
                                new NumberValue(
                                    _input,
                                     input.decimals));
                        }
                        else
                            inParamValue.value = _input;
                        

                        this.input  .invalidateInputs(parse, this, true);
                        this.current.invalidateInputs(parse, this, true);

                        current = await evalNumberValue(this.current, parse);


                        if (   current.isValid()
                            && target.isValid())
                        {
                            diff = target.toNumber() - current.value;

                            if (Math.abs(diff) < 0.00001)
                                break;

                            if (   Math.abs (diff) >  Math.abs (prevDiff)
                                || Math.sign(diff) != Math.sign(prevDiff))
                                step /= -2;

                            prevDiff = diff;
                        }
                        else
                        {
                            diff = 0;
                            _input -= step;
                            step /= -2;
                        }
                    }
                    

                    parse.currentProgress++;
                    genUpdateNodeProgress(parse, this.nodeId, iter / maxIter);
                }


                parse.solvers.pop();


                this.current.invalidateInputs(parse, this, true);
                current = await evalNumberValue(this.current, parse);


                if (current && target)
                    current.decimals = target.decimals;


                if (   iter < maxIter
                    && Math.abs(diff) < 0.0000001)
                    parse.currentProgress += maxIter - iter;
                // else
                //     console.warn('max solve iterations');


                this.value = inParamValue
                    ? new NumberValue(current.value, target.decimals)
                    : NumberValue.NaN();
            }
            else
                this.value = NumberValue.NaN();
        }
        else
            this.value = NumberValue.NaN();


        if (!this.currentConnected)
            current = NumberValue.NaN();


        this.setUpdateValues(parse,
        [
            ['current', current],
            ['target',  target ]
        ]);


        this.validate();


        if (this.input)
            pushUnique(parse.terminalIds, this.terminalIds);


        return this;
    }



    isValid()
    {
        return super.isValid()
            && this.current && this.current.isValid()
            && this.target  && this.target .isValid();
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.current) this.current.pushValueUpdates(parse);
        if (this.target ) this.target .pushValueUpdates(parse);
    }



    invalidateInputs(parse, from, force)
    {
        super.invalidateInputs(parse, from, force);

        if (this.current) this.current.invalidateInputs(parse, from, force);
        if (this.target ) this.target .invalidateInputs(parse, from, force);
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        if (this.current) this.current.iterateLoop(parse);
        if (this.target ) this.target .iterateLoop(parse);
    }


    static parseRequest(parse)
    {
        const [, nodeId, options, ignore] = genParseNodeStart(parse);
    
    
        const solve = new GSolve(nodeId, options);
       
    
        let nTerminals = -1;
    
        nTerminals = parseInt(parse.move());
        consoleAssert(nTerminals >= 0, 'nTerminals must be >= 0');
    
        for (let i = 0; i < nTerminals; i++)
            solve.terminalIds.push(parse.move());
    
    
        solve.currentConnected = parseInt(parse.move()) > 0;
    
    
        let nInputs = -1;
        
        if (!ignore)
        {
            nInputs = parseInt(parse.move());
            consoleAssert(nInputs == 0 || nInputs == 1, 'nInputs must be [0, 1]');
        }
 
        
        if (parse.settings.logRequests) 
            logReqSolve(solve, parse, ignore, nInputs);
    
    
        if (ignore) 
        {
            genParseNodeEnd(parse, solve);
            return parse.parsedNodes.find(n => n.nodeId == nodeId);
        }
    
    
        parse.nTab++;
    
    
        if (nInputs == 1)
            solve.input = genParse(parse);
    
        
        solve.current = genParse(parse);
        solve.target  = genParse(parse);
    
        
        parse.nTab--;
    
    
        genParseNodeEnd(parse, solve);
        return solve;
    }
}
