class GVariable
extends GOperator1
{
    variableId    = NULL;
    variableName  = '';
    variableType  = NULL;
    variableValue = null;

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
        this.variableValue = null;

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
        
        //console.log('input =', input);
        
        if (input)
            varValue = input;

        else if (isValid(this.variableValue))
            varValue = getVariableValue(this.variableType, this.variableValue, true, parse);

        else if (paramValue)
        {
            varValue = getVariableValue(this.variableType, paramValue.toValue(), false, parse);
        }

        if (  !varValue
            || varValue.type == ANY_VALUE)
        {
            switch (this.variableType)
            {
                case 'FLOAT':   varValue =  NumberValue.NaN(); break;
                case 'BOOLEAN': varValue = BooleanValue.NaN(); break;
                case 'STRING':  varValue =    TextValue.NaN(); break;
                case 'COLOR':   varValue =    FillValue.NaN(); break;
                default:                                       break;
            }
        }


        this.value = new VariableValue(
            this.nodeId, 
            this.variableId,
            this.variableName,
            varValue);


        this.setUpdateValues(parse,
        [
            ['value',      this.value],
            ['paramValue', paramValue]
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


        if (   this.value.variableValue 
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



function getVariableValue(type, value, colorFromFigma, parse)
{
    switch (type)
    {
        case 'FLOAT':
        {
            const _value = 
                   value
                && !isNaN(value)
                    ? value
                    : parse.settings.numberVarNullValue;

            // two decimals is Figma's precision limit
            return new NumberValue(
                _value, 
                Math.min(decDigits(roundTo(_value, 2)), 2));
        }

        case 'BOOLEAN': 
        {
            const _value = 
                   value
                && !isNaN(value)
                    ? value
                    : parse.settings.boolVarNullValue;

            return new BooleanValue(_value > 0);
        }

        case 'STRING': 
            return new TextValue(value);

        case 'COLOR': 
        {
            let _value =
                   value
                && !rgbIsNaN(value)
                    ? value
                    : parse.settings.colorVarNullValue;


            if (_value.length == 3)
            {
                if (colorFromFigma)
                    _value.a = 1;
                else
                    _value.push(1);
            }


            if (colorFromFigma)
            {
                return _value.a == 1
                    ? ColorValue.fromRgb(
                        [_value.r * 0xff, 
                         _value.g * 0xff, 
                         _value.b * 0xff]) 
                    : FillValue.fromRgb(
                        [_value.r * 0xff, 
                         _value.g * 0xff, 
                         _value.b * 0xff], 
                         _value.a * 100); 
            }
            else
            {
                return _value[3] == 1
                    ? ColorValue.fromRgb(
                        [_value[0] * 0xff, 
                         _value[1] * 0xff, 
                         _value[2] * 0xff]) 
                    : FillValue.fromRgb(
                        [_value[0] * 0xff, 
                         _value[1] * 0xff, 
                         _value[2] * 0xff], 
                         _value[3] * 100); 
            }
        }

        default:
            console.error('invalid variable type \'' + type + '\'');
            return null;
    }
}