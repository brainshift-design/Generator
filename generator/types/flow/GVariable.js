class GVariable
extends GOperator1
{
    variableId    = NULL;
    variableName  = '';
    variableType  = NULL;
    variableValue = null;//new NullValue();

    paramValue    = null;



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
        this.variableValue = null;//new NullValue();

        this.paramValue    = null;
    }



    copy()
    {
        const copy = new GVariable(this.nodeId, this.options);

        copy.variableId   = this.variableId;
        copy.variableName = this.variableName;
        copy.variableType = this.variableType;

        if (this.variableValue) copy.variableValue = this.variableValue.copy();
        if (this.paramValue   ) copy.paramValue    = this.paramValue   .copy();
        
        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;

        
        const input      = await evalValue(this.input,      parse);
        const paramValue = await evalValue(this.paramValue, parse);


        let varValue;
        
        
        if (input)
            varValue = input;

        else if (this.variableValue)
        {
            switch (this.variableType)
            {
                case 'FLOAT': 
                    varValue = new NumberValue(
                        this.variableValue, 
                        Math.min(decDigits(roundTo(this.variableValue, 2)), 2));

                    break;

                case 'BOOLEAN': 
                    varValue = new NumberValue(this.variableValue ? 1 : 0);
                    varValue.isBool = true;
                    break;

                case 'STRING': 
                    varValue = new TextValue(this.variableValue);
                    break;

                case 'COLOR': 
                    varValue = 
                        this.variableValue.a == 1
                            ? ColorValue.fromRgb(
                                [this.variableValue.r * 0xff, 
                                this.variableValue.g * 0xff, 
                                this.variableValue.b * 0xff]) 
                            : FillValue.fromRgb(
                                [this.variableValue.r * 0xff, 
                                this.variableValue.g * 0xff, 
                                this.variableValue.b * 0xff], 
                                this.variableValue.a * 100); 
                        break;

                default:
                    break;
            }
        }

        else if (paramValue) 
            varValue = paramValue;


        if (  !varValue
            || varValue.type == ANY_VALUE)
        {
            switch (this.variableType)
            {
                case 'FLOAT':   varValue = NumberValue.NaN(); varValue.isBool = false; break;
                case 'BOOLEAN': varValue = NumberValue.NaN(); varValue.isBool = true;  break;
                case 'STRING':  varValue = new TextValue();                                 break;
                case 'COLOR':   varValue = FillValue.NaN();//ColorValue.NaN();                           break;
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