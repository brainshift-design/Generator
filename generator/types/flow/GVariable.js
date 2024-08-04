class GVariable
extends GOperator1
{
    variableId    = NULL;
    //variableName  = '';
    variableValue = null;

    //variableVariableTemp  = false;



    constructor(nodeId, options)
    {
        super(VARIABLE, nodeId, options);
    }



    reset()
    {
        super.reset();

        this.variableValue = new NullValue();
    }



    copy()
    {
        const copy = new GVariable(this.nodeId, this.options);

        if (this.variableValue) copy.variableValue = this.variableValue.copy();
        
        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;

        
        const input      = await evalValue(this.input,         parse);
        const paramValue = await evalValue(this.variableValue, parse);

        const varValue   = input; // TODO figure out whether to send input or paramValue


        this.value = new VariableValue(
            this.nodeId, 
            this.variableId,
            getNewNumberId(
                parse.parsedNodes.find(n => n.nodeId == this.nodeId).nodeName,
                newId => parse.parsedNodes.find(n => n.nodeId == newId) != null),
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


        if (//   this.value.variableId   != NULL
            //&& this.value.variableName != ''
            //&&  
                  this.value.variableValue 
               && this.value.variableValue.isValid())
        {
            const _var = new FigmaVariable(
                this.nodeId,
                this.value.variableId,
                this.value.variableName,
                this.value.variableValue);

            this.value.objects.push(_var);
        }

        
        await super.evalObjects(parse);
    }



    isValid()
    {
        return this.variableValue 
            && this.variableValue != NULL;
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.variableValue) this.variableValue.pushValueUpdates(parse);
    }



    invalidateInputs(parse, from, force)
    {
        super.invalidateInputs(parse, from, force);

        if (this.variableValue) this.variableValue.invalidateInputs(parse, from, force);
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        if (this.variableValue) this.variableValue.iterateLoop(parse);
    }
}