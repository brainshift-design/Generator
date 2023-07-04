class ShapeGroupValue
extends GValue
{
    items = [];



    constructor(nodeId, items = [])
    {
        super(SHAPE_GROUP_VALUE, nodeId);

        this.items = items;

        //this.objects = children.objects.map(o => o.copy());
    }



    copy()
    {
        const copy = new ShapeGroupValue(
            this.nodeId,
            this.items.map(i => i.copy()));

        copy.copyBase(this);

        return copy;
    }



    equals(group)
    {
        if (!group)                                  return false;
        if (!(group instanceof ShapeGroupValue))     return false;
        if (this.items.length != group.items.length) return false;
            
        for (let i = 0; i < this.items.length; i++)
            if (!this.items[i].equals(group.items[i]))
                return false;

        return true;
    }



    async eval(parse)
    {
        return this;
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



    toValue()
    {
        return this.copy();
    }



    isValid()
    {
        return  this.items
            && !this.items.find(i => !i.isValid());
    }


    
    static NaN = new ShapeGroupValue(
        '',
        ListValue.NaN);
}



function parseShapeGroupValue(str, i = -1)
{
    if (i < 0)
    {
        str = str.split(' ');
        i   = 0;
    }
        

    const iStart = i;

    const group = new ShapeGroupValue();
    

    const nInputs = parseInt(str[i++]);


    for (let j = 0; j < nInputs; j++)
    {
        const type = str[i++];
        
        switch (type)
        {
            case         LIST_VALUE:  
            // case  NUMBER_LIST_VALUE:  
            // case    TEXT_LIST_VALUE:  
            case   SHAPE_LIST_VALUE: { const _list   = parseListValue        (str, i);  i += _list  [1];  group.items.push(_list  [0]);  break; }
 
            // case       NUMBER_VALUE: { const num     = parseNumberValue      (str[i]);  i += num    [1];  group.items.push(num    [0]);  break; }
            // case         TEXT_VALUE: { const text    = parseTextValue        (str[i]);  i += text   [1];  group.items.push(text   [0]);  break; }
            // case        COLOR_VALUE: { const color   = parseColorValue       (str, i);  i += color  [1];  group.items.push(color  [0]);  break; }

            // case         FILL_VALUE: { const fill    = parseFillValue        (str, i);  i += fill   [1];  group.items.push(fill   [0]);  break; }
            // case       STROKE_VALUE: { const stroke  = parseStrokeValue      (str, i);  i += stroke [1];  group.items.push(stroke [0]);  break; }
            // case  DROP_SHADOW_VALUE: { const shadow  = parseDropShadowValue  (str, i);  i += shadow [1];  group.items.push(shadow [0]);  break; }
            // case INNER_SHADOW_VALUE: { const shadow  = parseInnerShadowValue (str, i);  i += shadow [1];  group.items.push(shadow [0]);  break; }
            // case   LAYER_BLUR_VALUE: { const blur    = parseLayerBlurValue   (str, i);  i += blur   [1];  group.items.push(blur   [0]);  break; }
            // case    BACK_BLUR_VALUE: { const blur    = parseBackBlurValue    (str, i);  i += blur   [1];  group.items.push(blur   [0]);  break; }
            // case   LAYER_MASK_VALUE: { const mask    = parseLayerMaskValue   (str[i]);  i += mask   [1];  group.items.push(mask   [0]);  break; }

            case    RECTANGLE_VALUE: { const rect    = parseRectangleValue   (str, i);  i += rect   [1];  group.items.push(rect   [0]);  break; }
            case         LINE_VALUE: { const line    = parseLineValue        (str, i);  i += line   [1];  group.items.push(line   [0]);  break; }
            case      ELLIPSE_VALUE: { const ellipse = parseEllipseValue     (str, i);  i += ellipse[1];  group.items.push(ellipse[0]);  break; }
            case      POLYGON_VALUE: { const poly    = parsePolygonValue     (str, i);  i += poly   [1];  group.items.push(poly   [0]);  break; }
            case         STAR_VALUE: { const star    = parseStarValue        (str, i);  i += star   [1];  group.items.push(star   [0]);  break; }
            case    TEXT_SHAPE_VALUE: { const text    = parseTextShapeValue   (str, i);  i += text   [1];  group.items.push(text   [0]);  break; }
            case        POINT_VALUE: { const point   = parsePointValue       (str, i);  i += point  [1];  group.items.push(point  [0]);  break; }
            case  VECTOR_PATH_VALUE: { const path    = parseVectorPathValue  (str, i);  i += path   [1];  group.items.push(path   [0]);  break; }
            case      BOOLEAN_VALUE: { const path    = parseShapeBooleanValue(str, i);  i += path   [1];  group.items.push(path   [0]);  break; }
            case  SHAPE_GROUP_VALUE: { const _group  = parseShapeGroupValue  (str, i);  i += _group [1];  group.items.push(_group [0]);  break; }
            case        FRAME_VALUE: { const frame   = parseFrameValue       (str, i);  i += frame  [1];  group.items.push(frame  [0]);  break; }
        }
    }

    
    return [
        group, 
        i - iStart];
}
