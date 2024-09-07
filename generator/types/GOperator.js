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
    
            for (let i = 0; i < input.items.length; i++)
            {
                const item = input.items[i];
    
                this.value.items.push(evalFunc(item));
                    // item.type == nan.type
                    // ? evalFunc(item)
                    // : nan);   
            }
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
                ? finalListTypeFromItems(this.value.items)
                : this.value.type)
            : new TextValue(ANY_VALUE);
    }



    outputListType()
    {
        return this.outputType();
        //return this.value
        //     ? new TextValue(finalListTypeFromItems(this.value.items))
        //     : TextValue.NaN.copy();
    }



    toValue()
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
        
        // if (this.nodeId == 'sequence')
        // {
        //     console.log('repeatIndex = ', repeatIndex);
        //     console.log('this.iterated = ', this.iterated);
        // }

        if (   (   repeatIndex < 0
                || repeatIndex == parse.repeats.length-1)
            && !this.iterated)
        {
            //console.log('iterating');
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
        if (    parse.repeats.length == 0
            ||  this.unknown && parse.repeats[0].total == 0
            || !this.unknown
            ||  parse.repeats.at(-1).currentIteration == 0
            ||  parse.repeats.at(-1).currentIteration == parse.repeats.at(-1).total-1)
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

        //if (this.isValid())
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



    // updateValueObjectsFromInput(input)
    // {
    //     const inputObjects = this.copyObjects(input);
            
    //     for (const obj of inputObjects)
    //     {
    //         obj.objectId += OBJECT_SEPARATOR + i;
    //         obj.itemIndex = i;
    //     }

    //     this.value.objects.push(...inputObjects);
    // }



    setConditionInput(input)
    {

    }
}



function allInputsAreCondensedLists(inputs)
{
    for (const input of inputs)
    {
        if (   !isValueListOfCondensedLists(input)
            && !isListValueType(input)
            && input.condensed !== true) 
            return false;
    }

    return true;
}



async function evalValue(_value, parse, nan = () => new NullValue())
{
    let value = 
        _value 
        ? (await _value.eval(parse)).toValue() 
        : null;

    if (   (    value 
            && !value.isValid())
        && nan) 
        value = nan();

    return value;
}



async function evalNumberValue(_value, parse) 
{ 
    let value = await evalValue(_value, parse, () => NumberValue.NaN.copy()); 

    if (   value
        && value.type == TEXT_VALUE)
        value = new NumberValue(parseFloat(value.value));

    return value;                
}



async function evalNumberOrListValue(_value, parse) 
{ 
    let value = await evalValue(_value, parse, () => NumberValue.NaN.copy()); 

    if (   value
        && value.type == TEXT_VALUE)
        value = new NumberValue(parseFloat(value.value));

    else if (value
          && value.type == LIST_VALUE
          && finalListTypeFromItems(value.items) == TEXT_LIST_VALUE)
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
          && finalListTypeFromItems(value.items) == NUMBER_LIST_VALUE)
    {
        const condensed = value.condensed;
        
        value = new ListValue(value.items.map(i => new TextValue(numToString(i.value, i.decimals))));
        value.condensed = condensed;
    }
    
    return value;                
}



async function evalColorValue(_value, parse)
{ 
    let value = await evalValue(_value, parse, () => ColorValue.NaN.copy()); 

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
    let value = await evalValue(_value, parse, () => FillValue.NaN.copy());
    
    if (   value
        && value.type == COLOR_VALUE)
        value = new FillValue(value);

    if (   value
        && value.type == COLOR_STOP_VALUE)
        value = value.fill;

    return value; 
}



async function evalStrokeValue        (_value, parse) { return await evalValue(_value, parse, () => StrokeValue        .NaN.copy()); }
async function evalColorStopValue     (_value, parse) { return await evalValue(_value, parse, () => ColorStopValue     .NaN.copy()); }



async function evalColorStopOrListValue(_value, parse) 
{ 
    let value = await evalValue(_value, parse, () => ColorStopValue.NaN.copy()); 


    if (   value
        && value.type == COLOR_VALUE)
        value = new ColorStopValue(new FillValue(value));

    else if (value
          && value.type == FILL_VALUE)
        value = new ColorStopValue(value);

    else if (value
          && value.type == LIST_VALUE
          && finalListTypeFromItems(value.items) == COLOR_LIST_VALUE)
    {
        const condensed = value.condensed;

        value = new ListValue(value.items.map(i => new ColorStopValue(new FillValue(i))));
        value.condensed = condensed;
    }

    else if (value
          && value.type == LIST_VALUE
          && finalListTypeFromItems(value.items) == FILL_LIST_VALUE)
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



async function evalGradientValue      (_value, parse) { return await evalValue(_value, parse, () => GradientValue      .NaN.copy()); }

async function evalListValue          (_value, parse) { return await evalValue(_value, parse, () => ListValue          .NaN.copy()); }

async function evalRectangleValue     (_value, parse) { return await evalValue(_value, parse, () => RectangleValue     .NaN.copy()); }
async function evalLineValue          (_value, parse) { return await evalValue(_value, parse, () => LineValue          .NaN.copy()); }
async function evalPolygonValue       (_value, parse) { return await evalValue(_value, parse, () => PolygonValue       .NaN.copy()); }
async function evalTextShapeValue     (_value, parse) { return await evalValue(_value, parse, () => TextShapeValue     .NaN.copy()); }

async function evalPointValue         (_value, parse) { return await evalValue(_value, parse, () => PointValue         .NaN.copy()); }
async function evalVectorPathValue    (_value, parse) { return await evalValue(_value, parse, () => VectorPathValue    .NaN.copy()); }
async function evalArcPathValue       (_value, parse) { return await evalValue(_value, parse, () => ArcPathValue       .NaN.copy()); }
async function evalWavePathValue      (_value, parse) { return await evalValue(_value, parse, () => WavePathValue      .NaN.copy()); }
async function evalVectorVertexValue  (_value, parse) { return await evalValue(_value, parse, () => VectorVertexValue  .NaN.copy()); }
async function evalVectorEdgeValue    (_value, parse) { return await evalValue(_value, parse, () => VectorEdgeValue    .NaN.copy()); }
async function evalVectorRegionValue  (_value, parse) { return await evalValue(_value, parse, () => VectorRegionValue  .NaN.copy()); }

async function evalFrameValue         (_value, parse) { return await evalValue(_value, parse, () => FrameValue         .NaN.copy()); }

async function evalInnerShadowValue   (_value, parse) { return await evalValue(_value, parse, () => InnerShadowValue   .NaN.copy()); }
async function evalLayerBlurValue     (_value, parse) { return await evalValue(_value, parse, () => LayerBlurValue     .NaN.copy()); }
async function evalStrokeSidesValue   (_value, parse) { return await evalValue(_value, parse, () => StrokeSidesValue   .NaN.copy()); }
async function evalRoundedCornersValue(_value, parse) { return await evalValue(_value, parse, () => RoundedCornersValue.NaN.copy()); }
