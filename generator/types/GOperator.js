class GOperator
extends GNode
{
    nodeId;
    nodeName;

    topLevel;

    value;
    
    customParams = []; // [[name, GValue]]
    options      = {};
    updateValues = [];

   
    
    constructor(type, nodeId, options)
    {
        super(type, options);

        this.nodeId   = nodeId;
        this.nodeName = options.nodeName;

        this.options  = clone(options);

        this.valid    = false;
        this.topLevel = false;

        this.value    = null;
    }



    reset()
    {
        this.customParams = [];
        this.options      = {};
        this.updateValues = [];
    }



    copyBase(base)
    {
        super.copyBase(base);
        
        this.nodeId   = base.nodeId;
        this.nodeName = base.nodeName;

        this.copyCustomParams(base);

        this.options  = clone(base.options);

        this.valid    = base.valid;
        this.topLevel = base.topLevel;

        if (base.value) this.value = base.value.copy();
    }



    copyCustomParams(base)
    {
        for (const param of base.customParams)
            this.customParams.push([param[0], param[1].copy()]);
    }



    paramFromId(paramId)
    {
        return paramId == 'value'
            ?  this.value
            :  this[paramId];
    }



    isCached()
    {
        return this.options.cached
            && this.valid;
    }



    async eval(parse)
    {
        // calculate and add value update here

        return this;
    }



    async evalObjects(parse)
    {

    }



    evalInputOrList(input, evalFunc, nan)
    {
        if (isListValueType(input.type))
        {
            this.value = new ListValue();
    
            for (const item of input.items)
                this.value.items.push(evalFunc(item));
        }
        else
            this.value = evalFunc(input);
    }



    copyObjects(value, listId = -1)
    {
        const objects = getValidObjects(value);
        const copies  = [];
                        
        for (let i = 0; i < objects.length; i++)
        {
            const obj = copyFigmaObject(objects[i]);
    
            obj.nodeId   = this.nodeId;
            obj.listId   = listId;
            
            obj.objectId = obj.objectId + OBJECT_SEPARATOR + this.nodeId;
    
            copies.push(obj);
        }

        return copies;
    }
    
    

    outputType()
    {
        return this.value
            ? new TextValue(
                isListValueType(this.value.type)
                ? finalListTypeFromValues(this.value.items)
                : this.value.type)
            : new TextValue(ANY_VALUE);
    }



    outputListType()
    {
        return this.outputType();
    }



    toNewValue()
    {
        return this.value
             ? this.value.copy()
             : null;
    }



    invalidateInputs(parse, from, force)
    {
        super.invalidateInputs(parse, from, force);

        if (this.unknown)
            this.valid = false;

        this.iterated = false;
    }



    initLoop(parse, nodeId)
    {
        this.loopId           = nodeId;
        this.currentIteration = 0;
    }



    invalidateLoop(parse, nodeId)
    {
        this.valid = false;
    }



    iterateLoop(parse)
    {
        const repeatIndex = parse.repeats.findIndex(r => r.repeatId == this.loopId);
        
        if (   (   repeatIndex < 0
                || repeatIndex == parse.repeats.length-1)
            && !this.iterated)
        {
            this.currentIteration++;
            this.iterated = true;
        }
    }



    iterateCache(parse, from)
    {

    }



    resetLoop(parse, nodeId)
    {
        this.valid            = false;
        this.currentIteration = 0;
    }    



    setUpdateValues(parse, values, add = false)
    {
        if (   (    parse.repeats.length == 0
                ||  this.unknown && parse.repeats[0].total == 0
                || !this.unknown
                ||  parse.repeats.at(-1).currentIteration == 0
                ||  parse.repeats.at(-1).currentIteration == parse.repeats.at(-1).total-1)
            && parse.solvers.length == 0)
        {
            if (add) this.updateValues.push(...values);
            else     this.updateValues = [...values];
        }
        else if (!add)
            this.updateValues = [];
    }



    pushValueUpdates(parse)
    {        
        if (!this.updateValues)
            return;

        for (const value of this.updateValues)
            genPushUpdateValue(parse, this.nodeId, value[0], value[1]);

        this.updateValues = [];
    }



    updateValueObjects()
    {
        if (   !this.value
            || !this.value.objects)
            return;


        for (let i = 0; i < this.value.objects.length; i++)
        {
            const obj     =  this.value.objects[i];

            obj.nodeId    =  this.nodeId;
            obj.objectId +=  OBJECT_SEPARATOR + this.nodeId;
            obj.listId    = -1;
        }
    }



    updateValueFromParam(paramId, value)
    {
        this[paramId] = value;        
    }



    setConditionInput(input)
    {

    }
}



function allInputsAreCondensedLists(inputs)
{
    for (const input of inputs)
    {
        if (   !input
            ||    !isValueListOfCondensedLists(input)
               && !isListValueType(input)
               &&  input.condensed !== true) 
            return false;
    }

    return true;
}



async function evalValue(_value, parse, nan = () => new NullValue())
{
    if (!_value)
        return null;
    
    const evaluated = await _value.eval(parse);
    
    let value = 
        _value 
            ? evaluated.toNewValue() 
            : null;

    if (   (    value 
            && !value.isValid())
        && nan) 
        value = nan();

    return value;
}



async function evalValueOrList(_value, parse) 
{ 
    let value = await evalValue(_value, parse);

    if (   value
        && value.type == LIST_VALUE)
    {
        const condensed = value.condensed;
        
        value = new ListValue(value.items);
        value.condensed = condensed;
    }
    
    return value;                
}



async function evalNumberValue(_value, parse) 
{ 
    let value = await evalValue(_value, parse, () => NumberValue.NaN()); 

    if (   value
        && value.type == TEXT_VALUE)
        value = new NumberValue(parseFloat(value.value));

    return value;                
}



async function evalBooleanNumberValue(_value, parse) 
{ 
    let value = await evalValue(_value, parse, () => NumberValue.NaN()); 

    if (   value
        && value.type == TEXT_VALUE)
    {
        if (stringIsNumber(value.value)) 
            value = new BooleanValue(parseFloat(value.value) > 0);
        else        
        {
                 if (value.value.trim().toLowerCase() == 'true' ) value = new BooleanValue(true);
            else if (value.value.trim().toLowerCase() == 'false') value = new BooleanValue(false);
            else                                                  value = BooleanValue.NaN();
        }
    }

    return value;                
}



async function evalNumberOrListValue(_value, parse) 
{ 
    let value = await evalValue(_value, parse, () => NumberValue.NaN()); 

    if (   value
        && value.type == TEXT_VALUE)
        value = new NumberValue(parseFloat(value.value));

    else if (value
          && value.type == LIST_VALUE
          && finalListTypeFromValues(value.items) == TEXT_LIST_VALUE)
    {
        const condensed = value.condensed;

        value = new ListValue(value.items.map(i => new NumberValue(parseFloat(i.value))));
        value.condensed = condensed;
    }

    return value;                
}



async function evalTextValue(_value, parse) 
{ 
    let value = await evalValue(_value, parse, () => new TextValue());

    if (   value
        && value.type == NUMBER_VALUE)
        value = new TextValue(numToString(value.value, value.decimals));

    return value;                
}



async function evalTextOrListValue(_value, parse) 
{ 
    let value = await evalValue(_value, parse, () => new TextValue());

    if (   value
        && value.type == NUMBER_VALUE)
        value = new TextValue(numToString(value.value, value.decimals));

    else if (value
          && value.type == LIST_VALUE
          && finalListTypeFromValues(value.items) == NUMBER_LIST_VALUE)
    {
        const condensed = value.condensed;
        
        value = new ListValue(value.items.map(i => new TextValue(numToString(i.value, i.decimals))));
        value.condensed = condensed;
    }
    
    return value;                
}



async function evalColorValue(_value, parse)
{ 
    let value = await evalValue(_value, parse, () => ColorValue.NaN()); 

    if (   value
        && value.type == FILL_VALUE)
        value = value.color;

    else if (value
          && value.type == COLOR_STOP_VALUE)
        value = value.fill.color;

    return value;
}



async function evalFillValue(_value, parse)
{ 
    let value = await evalValue(_value, parse, null); //() => FillValue.NaN());
    
    if (   value
        && value.type == COLOR_VALUE)
        value = new FillValue(value);

    if (   value
        && value.type == COLOR_STOP_VALUE)
        value = value.fill;

    return value; 
}



async function evalStrokeValue   (_value, parse) { return await evalValue(_value, parse, () => StrokeValue   .NaN()); }
async function evalColorStopValue(_value, parse) { return await evalValue(_value, parse, () => ColorStopValue.NaN()); }



async function evalColorStopOrListValue(_value, parse)
{
    let value = await evalValue(_value, parse, () => ColorStopValue.NaN());


    if (   value
        && value.type == COLOR_VALUE)
        value = new ColorStopValue(new FillValue(value));

    else if (value
          && value.type == FILL_VALUE)
        value = new ColorStopValue(value);

    else if (value
          && value.type == LIST_VALUE
          && finalListTypeFromValues(value.items) == COLOR_LIST_VALUE)
    {
        const condensed = value.condensed;

        value = new ListValue(value.items.map(i => new ColorStopValue(new FillValue(i))));
        value.condensed = condensed;
    }

    else if (value
          && value.type == LIST_VALUE
          && finalListTypeFromValues(value.items) == FILL_LIST_VALUE)
    {
        const condensed = value.condensed;

        value = new ListValue(value.items.map(i => new ColorStopValue(i)));
        value.condensed = condensed;
    }

    else if (value
          && value.type == LIST_VALUE) // mixed list
    {
        // const condensed = value.condensed;

        // value = new ListValue(value.items.map(i => new NumberValue(parseFloat(i.value))));
        // value.condensed = condensed;
    }


    return value;                
}



async function evalGradientValue      (_value, parse) { return await evalValue(_value, parse, () => GradientValue      .NaN()); }

async function evalListValue          (_value, parse) { return await evalValue(_value, parse, () => ListValue          .NaN()); }

async function evalRectangleValue     (_value, parse) { return await evalValue(_value, parse, () => RectangleValue     .NaN()); }
async function evalLineValue          (_value, parse) { return await evalValue(_value, parse, () => LineValue          .NaN()); }
async function evalPolygonValue       (_value, parse) { return await evalValue(_value, parse, () => PolygonValue       .NaN()); }
async function evalTextShapeValue     (_value, parse) { return await evalValue(_value, parse, () => TextShapeValue     .NaN()); }



async function evalPointValue(_value, parse) 
{
    let value = await evalValue(_value, parse, () => PointValue.NaN());

    if (   value
        && value.type == POINT3_VALUE)
        value = new PointValue(value.x, value.y);

    return await evalValue(_value, parse, () => PointValue.NaN()); 
}



async function evalPointValue3        (_value, parse) { return await evalValue(_value, parse, () => PointValue3        .NaN()); }
async function evalVectorPathValue    (_value, parse) { return await evalValue(_value, parse, () => VectorPathValue    .NaN()); }
async function evalArcPathValue       (_value, parse) { return await evalValue(_value, parse, () => ArcPathValue       .NaN()); }
async function evalWavePathValue      (_value, parse) { return await evalValue(_value, parse, () => WavePathValue      .NaN()); }
async function evalVectorVertexValue  (_value, parse) { return await evalValue(_value, parse, () => VectorVertexValue  .NaN()); }
async function evalVectorEdgeValue    (_value, parse) { return await evalValue(_value, parse, () => VectorEdgeValue    .NaN()); }
async function evalVectorRegionValue  (_value, parse) { return await evalValue(_value, parse, () => VectorRegionValue  .NaN()); }

async function evalFrameValue         (_value, parse) { return await evalValue(_value, parse, () => FrameValue         .NaN()); }

async function evalInnerShadowValue   (_value, parse) { return await evalValue(_value, parse, () => InnerShadowValue   .NaN()); }
async function evalLayerBlurValue     (_value, parse) { return await evalValue(_value, parse, () => LayerBlurValue     .NaN()); }
async function evalStrokeSidesValue   (_value, parse) { return await evalValue(_value, parse, () => StrokeSidesValue   .NaN()); }
async function evalRoundedCornersValue(_value, parse) { return await evalValue(_value, parse, () => RoundedCornersValue.NaN()); }



async function evalPointOrListValue(_value, parse) 
{ 
    let value = await evalValue(_value, parse, () => PointValue.NaN()); 

    if (   value
        && value.type == LIST_VALUE)
    {
        const finalListType = finalListTypeFromValues(value.items);

        if (finalListType == POINT_LIST_VALUE)
        {
            const condensed = value.condensed;
            
            value = new ListValue(
                finalListType == POINT3_LIST_VALUE
                ? value.items.map(p => PointValue.fromPointValue3(p))
                : value.items.map(p => p.copy()));

            value.condensed = condensed;
        }
        else if (finalListType == POINT3_LIST_VALUE)
        {
            const condensed = value.condensed;
            const objects   = value.objects;

            value = new ListValue(
                finalListType == POINT3_LIST_VALUE
                ? value.items.map(p => PointValue.fromPointValue3(p))
                : value.items.map(p => p.copy()));

            value.condensed = condensed;
            value.objects   = objects.map(o => FigmaPoint.fromPoint3(o));
        }
    }

    return value;                
}



async function evalPoint3OrListValue(_value, parse) 
{ 
    let value = await evalValue(_value, parse, () => PointValue3.NaN()); 

    if (   value
        && value.type == POINT_VALUE)
        value = new PointValue3(value.x, value.y, value.z || 0);

    else if (value
          && value.type == LIST_VALUE
          && finalListTypeFromValues(value.items) == POINT3_LIST_VALUE)
    {
        const condensed = value.condensed;
        
        value = new ListValue(value.items.map(i => new PointValue3(i.x, i.y, i.z || 0)));
        value.condensed = condensed;
    }
    
    return value;                
}



async function evalVectorVertexOrListValue(_value, parse) 
{ 
    let value = await evalValue(_value, parse, () => VectorVertexValue.NaN()); 

    if (   value
        && value.type == POINT_VALUE)
        value = new VectorVertexValue(value.x, value.y);

    else if (value
          && value.type == LIST_VALUE
          && finalListTypeFromValues(value.items) == VECTOR_VERTEX_LIST_VALUE)
    {
        const condensed = value.condensed;
        
        value = new ListValue(value.items.map(i => new VectorVertexValue(i.x, i.y)));
        value.condensed = condensed;
    }
    
    return value;                
}
