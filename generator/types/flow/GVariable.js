class GVariable
extends GOperator1
{
    static { GNode.types[VARIABLE] = this; }



    variableId     = NULL;
    variableType   = NULL;
    variableName   = '';
    variableValues = [];
    aliasIds       = [];
    aliasNames     = [];
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
        this.variableType   = NULL;
        this.variableName   = '';
        this.variableValues = [];
        this.aliasIds       = [];
        this.aliasNames     = [];
        this.variableTemp   = false;

        this.paramValues    = [];
    }



    copy()
    {
        const copy = new GVariable(this.nodeId, this.options);

        copy.variableId     = this.variableId;
        copy.variableType   = this.variableType;
        copy.variableName   = this.variableName;
        copy.variableValues = this.variableValues.map(v => v.copy());
        copy.aliasIds       = [...this.aliasIds];
        copy.aliasNames     = [...this.aliasNames];
        copy.variableTemp   = this.variableTemp;

        copy.paramValues    = this.paramValues   .map(p => p.copy());
        
        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;

        
        const input = await evalValue(this.input, parse);

        let paramValues = await Promise.all(
            this.paramValues.map(async p => 
            {
                switch (this.variableType)
                {
                    case 'FLOAT':   return await evalNumberValue(p, parse);
                    case 'BOOLEAN': return await evalNumberValue(p, parse);
                    case 'STRING':  return await evalTextValue  (p, parse);
                    case 'COLOR':   return await evalColorValue (p, parse);
                }
            }));


        let varValues = [];
        
       
        if (input)
        {
            varValues = [input];
        }
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
            [...this.aliasIds],
            [...this.aliasNames],
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
                this.value.variableValues.map(v => v.copy()),
                [...this.value.aliasIds]);

            this.value.objects.push(_var);
        }

        
        await super.evalObjects(parse);
    }



    isValid()
    {
        return !this.paramValues.some(p => p == NULL); 
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



    static parseRequest(parse)
    {
        const [, nodeId, options, ignore] = genParseNodeStart(parse);
    
    
        const variable = new GVariable(nodeId, options);
    
    
        let nInputs = -1;
        
    
        if (!ignore)
        {
            nInputs = parseInt(parse.move());
            consoleAssert(nInputs == 0 || nInputs == 1, 'nInputs must be [0, 1]');
        }
    
    
        if (parse.settings.logRequests) 
            logReq(variable, parse, ignore);
    
    
        if (ignore) 
        {
            genParseNodeEnd(parse, variable);
            return parse.parsedNodes.find(n => n.nodeId == nodeId);
        }
    
    
        parse.nTab++;
        parse.inParam = false;
    
    
        if (nInputs == 1)
            variable.input = genParse(parse);
    
        
        variable.variableId   = parse.move();
        variable.variableType = parse.move();
        variable.variableName = decodeURIComponent(parse.move());
    
    
        const nVars = parseInt(parse.move());
    
        for (let i = 0; i < nVars; i++)
        {
            switch (variable.variableType)
            {
                case 'FLOAT':   
                    variable.variableValues.push(parseFloat(parse.move()));
                    break;
                    
                case 'BOOLEAN': 
                    variable.variableValues.push(parseBool(parse.move()));
                    break;
                    
                case 'STRING':  
                    variable.variableValues.push(decodeURIComponent(parse.move()));
                    break;
                    
                case 'COLOR':
                {
                    const color = parse.move()
                        .split(' ')
                        .map(s => parseFloat(s));
    
                    variable.variableValues.push(
                    {
                        r: color[0],
                        g: color[1],
                        b: color[2],
                        a: color[3]
                    });
                    break;
                }
            }
        }
    
    
        const nAliases = parseInt(parse.move());
    
        for (let i = 0; i < nAliases; i++)
            variable.aliasIds.push(parse.move());
    
        for (let i = 0; i < nAliases; i++)
            variable.aliasNames.push(parse.move());
    
    
        variable.variableTemp = parseBool(parse.move());
    
    
        variable.aliasIds   = variable.aliasIds  .map(id   => id   == NULL_VALUE ? NULL : id  );
        variable.aliasNames = variable.aliasNames.map(name => name == NULL_VALUE ? NULL : name);
    
    
        if (parse.settings.logRequests) 
        {
            logReqString(variable.variableId   == NULL ? NULL_VALUE : variable.variableId,   parse);
            logReqString(variable.variableType == NULL ? NULL_VALUE : variable.variableType, parse);
            logReqString(variable.variableName != ''   ? '\'' + variable.variableName + '\'' : '\'\'', parse);
            
    
            for (const varVal of variable.variableValues)
            {
                switch (variable.variableType)
                {
                    case 'FLOAT':   
                        logReqString(varVal ? varVal.toString() : NULL_VALUE, parse);
                        break;
                        
                    case 'BOOLEAN': 
                        logReqString(varVal ? boolToString(varVal) : NULL_VALUE, parse);
                        break;
                        
                    case 'STRING':  
                        logReqString(varVal ?? NULL_VALUE, parse);
                        break;
                        
                    case 'COLOR':
                        logReqString(
                                    varVal.r.toString()
                            + ' ' + varVal.g.toString()
                            + ' ' + varVal.b.toString()
                            + ' ' + varVal.a.toString(),
                            parse);
                        break;
                }
            }
    
    
            if (variable.aliasIds.length > 0)
            {
                for (const aliasId of variable.aliasIds)
                    logReqString(aliasId == NULL ? NULL_VALUE : aliasId, parse);
            }
    
    
            if (variable.aliasNames.length > 0)
            {
                for (const aliasName of variable.aliasNames)
                    logReqString(aliasName == NULL ? NULL_VALUE : aliasName, parse);
            }
    
    
            logReqString(variable.variableTemp ? 'temp' : 'existing', parse);
        }
    
    
        const nParams = parseInt(parse.move());
    
        for (let i = 0; i < nParams; i++)
            variable.paramValues.push(variable['value'+i] = genParse(parse));
    
        
        parse.nTab--;
    
        
        genParseNodeEnd(parse, variable);
        return variable;
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

            if (   _value
                && _value.r)
            {
                _value = 
                [
                    _value.r,
                    _value.g,
                    _value.b,
                    _value.a
                ];
            }


            if (  !_value
                || rgbIsNaN(_value))
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
