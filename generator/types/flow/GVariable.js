class GVariable
extends GOperator1
{
    linkedId    = NULL;
    linkedType  = NULL;
    linkedName  = '';
    //linkedValue = NULL;
   
    paramValue  = null;

    //linkedVariableTemp  = false;



    constructor(nodeId, options)
    {
        super(VARIABLE, nodeId, options);
    }



    reset()
    {
        super.reset();

        this.paramValue = new NullValue();
    }



    copy()
    {
        const copy = new GVariable(this.nodeId, this.options);

        if (this.paramValue) copy.paramValue = this.paramValue.copy();
        
        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;

        
        const input      = await evalValue(this.input,      parse);
        const paramValue = await evalValue(this.paramValue, parse);

        const varValue   = input; // TODO figure out whether to send input or paramValue

        this.value = new VariableValue(
            this.nodeId, 
            this.linkedId,
            this.linkedType,
            this.linkedName,
            varValue);


        this.setUpdateValues(parse,
        [
            ['value', this.value]
        ]);


        await this.evalVariable(parse);


        this.validate();

        return this;
    }



    async evalVariable(parse, options = {})
    {
        if (!this.options.enabled)
            return;
     
        
        this.value.objects = [];


        if (   this.value.linkedId   != NULL
            && this.value.linkedType != NULL
            && this.value.linkedName != ''
            && this.value.paramValue.isValid())
        {
            const _var = new FigmaVariable(
                this.nodeId,
                this.variableId,
                this.variableType,
                this.variableName,
                this.paramValue);

            this.value.objects.push(_var);
        }

        
        await super.evalObjects(parse);
    }



    isValid()
    {
        return this.paramValue 
            && this.paramValue != NULL;
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.paramValue) this.paramValue.pushValueUpdates(parse);
    }



    invalidateInputs(parse, from, force)
    {
        super.invalidateInputs(parse, from, force);

        if (this.paramValue) this.paramValue.invalidateInputs(parse, from, force);
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        if (this.paramValue) this.paramValue.iterateLoop(parse);
    }
}