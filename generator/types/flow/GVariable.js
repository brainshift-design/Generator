class GVariable
extends GOperator1
{
    linkedVariableId    = NULL;
    linkedVariableType  = NULL;
    linkedVariableName  = '';
    linkedVariableTemp  = false;

    linkedVariableValue = new NullValue();



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

        
        const variableValue = await evalValue(this.variableValue, parse);


        this.value = new VariableValue(
            this.nodeId, 
            this.linkedVariableId,
            this.linkedVariableType,
            this.linkedVariableName,
            variableValue);


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


        if (   this.value.variableId   != NULL
            && this.value.variableType != NULL
            && this.value.variableName != ''
            && this.value.variableValue.isValid())
        {
            const _var = new FigmaVariable(
                this.nodeId,
                this.variableId,
                this.variableType,
                this.variableName,
                this.variableValue);

            this.value.objects.push(_var);
        }

        
        await super.evalObjects(parse);
    }



    isValid()
    {
        return this.variableValue && this.variableValue.isValid();
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