function handleLegacyNode(_node, genVersion)
{
    // update legacy node names

    if (_node.type == 'CDENSE'                       ) _node.type = LIST_AS_ITEM;
    if (_node.type == 'SEL'                          ) _node.type = SELECT_FROM_LIST;
    if (_node.type == 'EXTRP'                        ) _node.type = GET_PARAM;
    if (_node.type == 'CENTR'                        ) _node.type = SET_CENTER;
    if (_node.type == 'DEFINE'                       ) _node.type = ITERATE;
    if (_node.type == 'START'                        ) _node.type = FEEDBACK;
    if (_node.type == 'RENDER'                       ) _node.type = RETAIN;
    if (_node.type == 'VNAME'                        ) _node.type = SET_VALUE_NAME;
    if (_node.type == 'VNAMES'                       ) _node.type = SET_LIST_VALUE_NAMES;
    if (_node.type == 'ONAME'                        ) _node.type = SET_OBJECT_NAME;
    if (_node.type == 'TCONT'    && genVersion <  441) _node.type = TEXT_FIND;
    if (_node.type == 'LCONT'    && genVersion <  441) _node.type = LIST_FIND;
    if (_node.type == 'LIST'     && genVersion <  441) _node.type = ITEMS;
    if (_node.type == 'EXPAND'   && genVersion == 441) _node.type = ITEMS;
    if (_node.type == 'CMB'      && genVersion <  441) _node.type = LIST;
    if (_node.type == 'TJSON'    && genVersion <  441) _node.type = PARSE_JSON;
    if (_node.type == 'TCSV'     && genVersion <  441) _node.type = PARSE_CSV;
    if (_node.type == 'COND'     && genVersion <  441) _node.type = NUMBER_COMPARE;
    if (_node.type == 'NANISNUM' && genVersion <  441) _node.type = NUMBER_IS_NAN;
    if (_node.type == 'RETAIN'   && genVersion <  441) _node.type = RETAIN;
    if (_node.type == 'LSTSEL'   && genVersion <  441) _node.type = SELECT;


    // remove 'showCenter' param from everything

    if (_node.params)
    {
        const foundIndex = _node.params.findIndex(p => p[1] == 'showCenter');

        if (foundIndex > -1)
            _node.params.splice(foundIndex, 1);
    }


    // handle math order of operations switch in version 339

    if (   (   _node.type == NUMBER_MATH
            || _node.type == NUMBER_SIMPLE_MATH)
        && genVersion == 0)
    {
        if (!_node.params)
            _node.params = [];
        
        let param = _node.params.find(p => p[1] == 'operation');

        if (!param)
            param = [NUMBER_VALUE, 'operation', '1,0'];

            
        switch (param[2])
        {
            case '0,0': param[2] = '2,0'; break;
            case '1,0': param[2] = '3,0'; break;
            case '2,0': param[2] = '0,0'; break;
            case '3,0': param[2] = '1,0'; break;
        }

        const value = _node.params.find(p => p[1] == 'value');

        if (value) 
            removeFromArray(_node.params, param);
    }

    else if (_node.type == TEXT_SPLIT
          && genVersion == 0)
    {
        if (!_node.params)
            _node.params = [];

        let parts = _node.params.find(p => p[1] == 'parts');

        if (parts)
            removeFromArray(_node.params, parts);
    }

    else if (   _node.type == COLOR
             && genVersion < 441) 
    {
        if (!_node.params)
            _node.params = [];

        const paramSpace = _node.params.find(p => p[1] == 'space');

        if (paramSpace)
        {
                 if (paramSpace[2] == '2,0') paramSpace[2] =  '3,0';
            else if (paramSpace[2] == '3,0') paramSpace[2] =  '2,0';
            else if (paramSpace[2] == '4,0') paramSpace[2] =  '9,0';
            else if (paramSpace[2] == '5,0') paramSpace[2] = '10,0';
            else if (paramSpace[2] == '6,0') paramSpace[2] = '11,0';
            else if (paramSpace[2] == '7,0') paramSpace[2] = '12,0';
            else if (paramSpace[2] == '8,0') paramSpace[2] = '13,0';
            else if (paramSpace[2] == '9,0') paramSpace[2] = '14,0';
        }
    }

    else if (   _node.type == COLOR_INTERPOLATE
             && genVersion < 441) 
    {
        if (!_node.params)
            _node.params = [];

        const paramSpace = _node.params.find(p => p[1] == 'space');

        if (paramSpace)
        {
                 if (paramSpace[2] == '2,0') paramSpace[2] =  '3,0';
            else if (paramSpace[2] == '3,0') paramSpace[2] =  '2,0';
            else if (paramSpace[2] == '4,0') paramSpace[2] =  '9,0';
            else if (paramSpace[2] == '5,0') paramSpace[2] = '10,0';
            else if (paramSpace[2] == '6,0') paramSpace[2] = '11,0';
            else if (paramSpace[2] == '7,0') paramSpace[2] = '12,0';
            else if (paramSpace[2] == '8,0') paramSpace[2] = '13,0';
            else if (paramSpace[2] == '9,0') paramSpace[2] = '14,0';
        }
    }

    else if (   _node.type == COLOR_TO_TEXT
             && genVersion < 441) 
    {
        if (!_node.params)
            _node.params = [];

        const paramSpace = _node.params.find(p => p[1] == 'format');

        if (paramSpace)
        {
            if (paramSpace[2] == '3,0') paramSpace[2] = '12,0';
        }
    }

    else if (   _node.type == NUMBER_ACCUMULATE
             && genVersion < 441) 
    {
        if (!_node.params)
            _node.params = [];

        const paramWhen = _node.params.find(p => p[1] == 'when');

        if (paramWhen)
        {
                 if (paramWhen[2] == '0,0') paramWhen[2] = '1,0';
            else if (paramWhen[2] == '1,0') paramWhen[2] = '0,0';
        }
    }

    else if (   (   _node.type == MOVE
                 || _node.type == ROTATE
                 || _node.type == SCALE
                 || _node.type == SKEW)
             && genVersion < 425) 
    {
        if (!_node.params)
            _node.params = [];

        const paramAffectSpace = _node.params.find(p => p[1] == 'affectSpace');

        if (!paramAffectSpace)
            _node.params.push(["NUM#", "affectSpace", "2,0"]);
        else
            paramAffectSpace[2] = paramAffectSpace[2] == '1,0' ? '2,0' : '1,0';
    }

    else if (_node.type == ELLIPSE
          && _node.params
          && _node.params.length > 0)
    {
        const paramFrom = _node.params.find(p => p[1] == 'from');
        if (paramFrom) paramFrom[1] = 'start';

        const paramTo = _node.params.find(p => p[1] == 'to');
        if (paramTo) paramTo[1] = 'sweep';
    }

    else if (_node.type == COLOR_BLEND
          && _node.params
          && _node.params.length > 0)
    {
        const paramFrom = _node.params.find(p => p[1] == 'opacity');
        if (paramFrom) paramFrom[1] = 'amount';
    }

    else if (_node.type == ITEM_COUNT
          && _node.params
          && _node.params.length > 0
          &&  genVersion < 442)
    {
        const paramFrom = _node.params.find(p => p[1] == 'start');
        if (paramFrom) paramFrom[1] = 'base';
    }

    else if (_node.type == VALID_COLOR
          && _node.params
          && _node.params.length > 0
          &&  genVersion < 441)
    {
        const paramFrom = _node.params.find(p => p[1] == 'quality');
        if (paramFrom) paramFrom[1] = 'method';
    }

    else if (_node.type == GRADIENT
          && _node.params
          && _node.params.length > 0)
    {
        const paramType = _node.params.find(p => p[1] == 'type');
        if (paramType) paramType[1] = 'gradType';

        const paramPosition = _node.params.find(p => p[1] == 'position');

        if (   genVersion < 423
            && paramPosition
            && paramPosition[2] == '3,0')
            paramPosition[1] = '4,0';

        const paramTo = _node.params.find(p => p[1] == 'to');
        if (paramTo) paramTo[1] = 'sweep';

        const paramAspect = _node.params.find(p => p[1] == 'aspect');

        if (paramAspect) 
        {
            if (   genVersion >= 398
                && genVersion <  413)
            {
                const value = NumberValue.parse(paramAspect[2]);
                value.value = 100/(value.value/100);
                paramAspect[2] = value.toString();
            }
        }
    }

    else if (_node.type == TEXT_SHAPE
          && _node.params
          && _node.params.length > 0)
    {
        const paramAlignH = _node.params.find(p => p[1] == 'alignH');
        if (paramAlignH) paramAlignH[1] = 'alignX';

        const paramAlignY = _node.params.find(p => p[1] == 'alignV');
        if (paramAlignY) paramAlignY[1] = 'alignY';
    }

    else if (_node.type == NUMBER_WAVE)
    {
        if (!_node.useWavelength)
            _node.useWavelength = false;
    }

    else if (_node.type == IF_ELSE
          && genVersion < 441)
    {
        if (!_node.params)
            _node.params = [];

        const paramCondition = _node.params.find(p => p[1] == 'condition');
        
        if (paramCondition) 
        {
            const value = NumberValue.parse(paramCondition[2]);

            if (value[0].value > 0) value[0].value = 0;
            else                    value[0].value = 1;

            paramCondition[2] = value[0].toString();
        }
        else
        {
            _node.params.push(
            [
                NUMBER_VALUE,
                'condition',
                '1,0'
            ]);
        }
    }

    else if (_node.type == REPEAT
          && genVersion < 441)
    {
        if (!_node.params)
            _node.params = [];

        const paramCount = _node.params.find(p => p[1] == 'count');
        
        if (!paramCount) 
        {
            _node.params.push(
            [
                NUMBER_VALUE,
                'count',
                '5,0'
            ]);
        }
    }

    else if (_node.type == ITEM_COUNT
          && genVersion < 441)
    {
        if (_node.params)
            removeFromArrayWhere(_node.params, p => p[1] == 'value');
    }

    else if (_node.type == NUMBER_SEQUENCE
          && genVersion < 441)
    {
        if (!_node.params)
            _node.params = [];

        const paramAdd = _node.params.find(p => p[1] == 'add');
        
        if (!paramAdd) 
        {
            _node.params.push(
            [
                NUMBER_VALUE,
                'add',
                '10,0'
            ]);
        }
    }
}



function handleLegacyConnection(_conn, outputNode, inputNode, genVersion)
{
    if (_conn.outputId == 'parts')
        _conn.outputId = 'h0';
    
    else if (outputNode.type == ITEM_COUNT
         && _conn.outputId == 'value'
         && genVersion < 441)
        _conn.outputId = 'h0';

    else if (outputNode.type == COLOR_CONTRAST
         && _conn.outputId == 'contrast'
         && genVersion < 442)
        _conn.outputId = 'h0';

    else if (inputNode.type == NUMBER_COMPARE
         && _conn.inputId == 'h1'
         && genVersion < 441)
        _conn.inputId = 'operand';

    else if (inputNode.type == TEXT_CONTAINS
         && _conn.inputId == 'h1'
         && genVersion < 441)
        _conn.inputId = 'what';

    else if (inputNode.type == IF_ELSE
          && genVersion < 441)
    {
             if (_conn.inputId == 'h0') _conn.inputId = 'h1';
        else if (_conn.inputId == 'h1') _conn.inputId = 'h0';
    }
}



function uiUpdateLegacyNodes()
{
    const params = [];
    const values = [];


    for (const node of graph.currentPage.nodes)
    {
        if (   node.type == NUMBER_MATH
            || node.type == NUMBER_SIMPLE_MATH)
        {
            switch (node.paramOperation.value.value)
            {
                case 0:  params.push(node.paramOperation);  values.push(new NumberValue(2));  break;
                case 1:  params.push(node.paramOperation);  values.push(new NumberValue(3));  break;
                case 2:  params.push(node.paramOperation);  values.push(new NumberValue(0));  break;
                case 3:  params.push(node.paramOperation);  values.push(new NumberValue(1));  break;
            }
        }
    }


    actionManager.do(new SetMultipleValuesAction(params, values, true));
}
