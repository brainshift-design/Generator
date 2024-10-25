class GVariable
extends GOperator1
{
    variableId     = NULL;
    variableName   = '';
    variableType   = NULL;
    variableValues = [];
    variableTemp   = false;

    paramValues    = [];



    constructor(nodeId, options)
    {
        super(VARIABLE, nodeId, options);
    }



    reset()
    {
        super.reset();

        this.variableId     = NULL;
        this.variableName   = '';
        this.variableType   = NULL;
        this.variableValues = [];
        this.variableTemp   = false;

        this.paramValues    = [];
    }



    copy()
    {
        const copy = new GVariable(this.nodeId, this.options);

        copy.variableId     = this.variableId;
        copy.variableName   = this.variableName;
        copy.variableType   = this.variableType;
        copy.variableValues = this.variableValues.map(v => v.copy());
        copy.variableTemp   = this.variableTemp;

        copy.paramValues    = this.paramValues   .map(p => p.copy());
        
        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;

        
        const input       = await evalValue(this.input, parse);
        let   paramValues = await Promise.all(this.paramValues.map(async p => await evalValue(p, parse)));


        let varValues = [];
        
       
        if (input)
            varValues = [input];

        else if (this.variableValues.length > 0
              && this.variableValues.every(v => isValid(v)))
        {
            for (const varVal of this.variableValues)
                varValues.push(getVariableValue(this.variableType, varVal, true, parse));
        }
        else if (paramValues.length > 0)
        {
            for (const paramVal of paramValues)
                varValues.push(getVariableValue(this.variableType, paramVal.toValue(), false, parse));
        }


        for (let i = 0; i < varValues.length; i++)
        {
            if (  !varValues[i]
                || varValues[i].type == ANY_VALUE)
            {
                switch (this.variableType)
                {
                    case 'FLOAT':   varValues[i] =  NumberValue.NaN(); break;
                    case 'BOOLEAN': varValues[i] = BooleanValue.NaN(); break;
                    case 'STRING':  varValues[i] =    TextValue.NaN(); break;
                    case 'COLOR':   varValues[i] =    FillValue.NaN(); break;
                    default:                                           break;
                }
            }
        }


        this.value = new VariableValue(
            this.nodeId, 
            this.variableId,
            this.variableName,
            varValues,
            [],
            this.variableTemp);


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


        if (this.value.variableValues.every(v => v.isValid()))
        {
            const _var = new FigmaVariable(
                this.nodeId,
                this.value.variableId,
                this.value.variableName,
                this.value.variableValues.map(v => v.copy()));

            this.value.objects.push(_var);
        }

        
        await super.evalObjects(parse);
    }



    isValid()
    {
        return !this.paramValues.any(p => p == NULL); 
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        this.paramValues.forEach(p => p.pushValueUpdates(parse));
    }



    invalidateInputs(parse, from, force)
    {
        super.invalidateInputs(parse, from, force);

        this.paramValues.forEach(p => p.invalidateInputs(parse, from, force));
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        this.paramValues.forEach(p => p.iterateLoop(parse));
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
            let _value = value;

            if (_value.r)
            {
                _value = 
                [
                    _value.r,
                    _value.g,
                    _value.b,
                    _value.a
                ];
            }


            if (rgbIsNaN(_value))
                _value = parse.settings.colorVarNullValue;


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