class GVariable
extends GOperator1
{
    variableId    = NULL;
    variableName  = '';
    variableType  = NULL;

    variableValue = new NullValue();



    constructor(nodeId, options)
    {
        super(VARIABLE, nodeId, options);
    }



    reset()
    {
        super.reset();

        this.variableId    = NULL;
        this.variableName  = '';
        this.variableType  = NULL;
        
        this.variableValue = new NullValue();
    }



    copy()
    {
        const copy = new GVariable(this.nodeId, this.options);

        copy.variableId   = this.variableId;
        copy.variableName = this.variableName;
        copy.variableType = this.variableType;

        if (this.variableValue) copy.variableValue = this.variableValue.copy();
        
        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;

        
        const input      = await evalValue(this.input,      parse);
        const paramValue = await evalValue(this.paramValue, parse);


        let varValue = input ?? paramValue;

        if (  !varValue
            || varValue.type == ANY_VALUE)
        {
            switch (this.variableType)
            {
                case 'FLOAT':   varValue = NumberValue.NaN.copy(); varValue.isBool = false; break;
                case 'BOOLEAN': varValue = NumberValue.NaN.copy(); varValue.isBool = true;  break;
                case 'STRING':  varValue = new TextValue();                                 break;
                case 'COLOR':   varValue = ColorValue.NaN.copy();                           break;
                default:                                                                    break;
            }
        }


        this.value = new VariableValue(
            this.nodeId, 
            this.variableId,
            this.variableName,
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