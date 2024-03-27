class ListValue
extends GValue
{
    items;

    condensed = false;



    constructor(items = [])
    {
        super(LIST_VALUE);

        if (items)
        {
            this.items = [];

            for (const item of items)
            {
                this.items.push(item.copy());

                if (   this.objects
                    && item.objects)
                    this.objects.push(...item.objects.map(o => o.copy()));
            }
        }
    }



    copy()
    {
        const copy = new ListValue(this.items);

        copy.copyBase(this);

        copy.condensed = this.condensed;

        return copy;
    }



    equals(list)
    {
        if (!list)                                  return false;
        if (!(list instanceof ListValue))           return false;
        if (this.items.length != list.items.length) return false;
            
        for (let i = 0; i < this.items.length; i++)
            if (!this.items[i].equals(list.items[i]))
                return false;

        return true;
    }



    async eval(parse)
    {
        return this.copy();
    }



    toValue()
    {
        return this.copy();
    }



    hasInitValue()
    {
        if (!this.items)
            return false;
            
        for (const item of this.items)
            if (!item.hasInitValue())
                return false;

        return true;
    }



    isValid()
    {
        //console.log('invalid =', this.items.find(i => !i.isValid()));
        return  this.items;
        //    && !this.items.find(i => !i.isValid());
    }



    toJson()
    {
        if (!this.items)
            return '';


        let str = '';
        
        
        str += this.items.length;

        for (let i = 0; i < this.items.length; i++)
        {
            const item = this.items[i];

            str += ' ' + item.type + ' ';
            str += item.toJson();
        }


        return str;
    }



    toString()
    {
        if (!this.items)
            return '';


        let str = '';
        
        
        str += this.items.length;

        for (let i = 0; i < this.items.length; i++)
        {
            const item = this.items[i];

            str += ' ' + item.type + ' ';
            str += item.toString();
        }


        return str;
    }



    toPreviewString()
    {
        if (!this.items)
            return '';


        const nItems = Math.min(this.items.length, 10);


        let str = '';

        for (let i = 0; i < nItems; i++)
        {
            if (i > 0) 
                str += '<br/>';


            const item = this.items[i];

            if (isListValueType(item.type))
                // str += 'list [' + item.items.length + ']';
            {
                for (let j = 0; j < item.items.length; j++)
                {
                    if (j > 0) 
                        str += ', ';
                    
                    str += item.items[j].toPreviewString();
                }
            }
            else
                str += item.toPreviewString();
        }

        if (this.items.length > 10) 
            str += '<br/>. . .';
        
        return str;
    }



    toDisplayString()
    {
        if (!this.items)
            return '';


        let str = '';
        
        
        str += this.items.length;

        for (let i = 0; i < this.items.length; i++)
        {
            const item = this.items[i];

            str += ' ' + item.type + ' ';
            str += item.toDisplayString();
        }


        return str;
    }



    getNaN()
    {
        return ListValue.NaN.copy();
    }



    static NaN = Object.freeze(new ListValue(null));
}



function parseListValue(str, i = -1)
{
    if (i < 0)
    {
        str = str.split(' ');
        i   = 0;
    }
        
    
    const iStart  = i;
    const nInputs = parseInt(str[i++]);
    
    
    const list = new ListValue();


    for (let j = 0; j < nInputs; j++)
    {
        const type = str[i++];

        switch (type)
        {
            case          LIST_VALUE:  
            case   NUMBER_LIST_VALUE:  
            case     TEXT_LIST_VALUE:  
            case    SHAPE_LIST_VALUE: { const _list   = parseListValue        (str, i);  i += _list  [1];  list.items.push(_list  [0]);  break; }
 
            case        NUMBER_VALUE: { const num     = parseNumberValue      (str[i]);  i += num    [1];  list.items.push(num    [0]);  break; }
            case          TEXT_VALUE: { const text    = parseTextValue        (str[i]);  i += text   [1];  list.items.push(text   [0]);  break; }
            case         COLOR_VALUE: { const color   = parseColorValue       (str, i);  i += color  [1];  list.items.push(color  [0]);  break; }

            case          FILL_VALUE: { const fill    = parseFillValue        (str, i);  i += fill   [1];  list.items.push(fill   [0]);  break; }
            case    COLOR_STOP_VALUE: { const stop    = parseColorStopValue   (str, i);  i += stop   [1];  list.items.push(stop   [0]);  break; }
            case      GRADIENT_VALUE: { const grad    = parseGradientValue    (str, i);  i += grad   [1];  list.items.push(grad   [0]);  break; }
            case        STROKE_VALUE: { const stroke  = parseStrokeValue      (str, i);  i += stroke [1];  list.items.push(stroke [0]);  break; }
            case   DROP_SHADOW_VALUE: { const shadow  = parseDropShadowValue  (str, i);  i += shadow [1];  list.items.push(shadow [0]);  break; }
            case  INNER_SHADOW_VALUE: { const shadow  = parseInnerShadowValue (str, i);  i += shadow [1];  list.items.push(shadow [0]);  break; }
            case    LAYER_BLUR_VALUE: { const blur    = parseLayerBlurValue   (str, i);  i += blur   [1];  list.items.push(blur   [0]);  break; }
            case     BACK_BLUR_VALUE: { const blur    = parseBackBlurValue    (str, i);  i += blur   [1];  list.items.push(blur   [0]);  break; }
            case   LAYER_BLEND_VALUE: { const layer   = parseLayerBlendValue  (str, i);  i += layer  [1];  list.items.push(layer  [0]);  break; }
            case    LAYER_MASK_VALUE: { const mask    = parseLayerMaskValue   (str[i]);  i += mask   [1];  list.items.push(mask   [0]);  break; }

            case     RECTANGLE_VALUE: { const rect    = parseRectangleValue   (str, i);  i += rect   [1];  list.items.push(rect   [0]);  break; }
            case          LINE_VALUE: { const line    = parseLineValue        (str, i);  i += line   [1];  list.items.push(line   [0]);  break; }
            case       ELLIPSE_VALUE: { const ellipse = parseEllipseValue     (str, i);  i += ellipse[1];  list.items.push(ellipse[0]);  break; }
            case       TRAPEZE_VALUE: { const trapeze = parseTrapezeValue     (str, i);  i += trapeze[1];  list.items.push(trapeze[0]);  break; }
            case       POLYGON_VALUE: { const poly    = parsePolygonValue     (str, i);  i += poly   [1];  list.items.push(poly   [0]);  break; }
            case          STAR_VALUE: { const star    = parseStarValue        (str, i);  i += star   [1];  list.items.push(star   [0]);  break; }
            case    TEXT_SHAPE_VALUE: { const text    = parseTextShapeValue   (str, i);  i += text   [1];  list.items.push(text   [0]);  break; }
            case         POINT_VALUE: { const point   = parsePointValue       (str, i);  i += point  [1];  list.items.push(point  [0]);  break; }
            case   VECTOR_PATH_VALUE: { const path    = parseVectorPathValue  (str, i);  i += path   [1];  list.items.push(path   [0]);  break; }
            case SHAPE_BOOLEAN_VALUE: { const bool    = parseShapeBooleanValue(str, i);  i += bool   [1];  list.items.push(bool   [0]);  break; }
            case   SHAPE_GROUP_VALUE: { const group   = parseShapeGroupValue  (str, i);  i += group  [1];  list.items.push(group  [0]);  break; }
            case         FRAME_VALUE: { const frame   = parseFrameValue       (str, i);  i += frame  [1];  list.items.push(frame  [0]);  break; }
        }
    }

    
    return [
        list, 
        i - iStart];
}



function getItemTypes(items, debug)
{
    const types = [];

    for (const item of items)
    {
        if (   item.type ==        LIST_VALUE
            || item.type == NUMBER_LIST_VALUE
            || item.type ==   TEXT_LIST_VALUE
            || item.type ==  SHAPE_LIST_VALUE)
            pushUnique(types, finalListTypeFromItems(item.items, debug));

        else
            pushUnique(types, item.type);
    }

    return types;
}



function finalTypeFromItems(items)
{
    return finalTypeFromTypes(getItemTypes(items));
}



function finalListTypeFromItems(items)
{
    return finalListTypeFromTypes(getItemTypes(items));
}



function finalTypeFromTypes(types)
{
    let _type = ANY_VALUE;

    for (const type of types)
    {
        if (_type == ANY_VALUE)
            _type = type;

        else if (    SHAPE_VALUES.includes(_type) 
                 && !SHAPE_VALUES.includes( type))
        {
            _type = ANY_VALUE;
            break; 
        }
        else if (   !SHAPE_VALUES.includes(_type) 
                 && _type != type)
        {
            _type = ANY_VALUE;
            break; 
        }
    }

    return _type;
}



function finalListTypeFromTypes(types)
{
    let _type = finalTypeFromTypes(types);
    
         if (  _type == NUMBER_VALUE)      return NUMBER_LIST_VALUE;
    else if (  _type ==   TEXT_VALUE)      return   TEXT_LIST_VALUE;
    else if (SHAPE_VALUES.includes(_type)) return  SHAPE_LIST_VALUE;
    else                                   return        LIST_VALUE;
}