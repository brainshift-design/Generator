class ListValue
extends GValue
{
    static 
    {
        GNode.types[       LIST_VALUE] = 
        GNode.types[NUMBER_LIST_VALUE] = 
        GNode.types[  TEXT_LIST_VALUE] = 
        GNode.types[ SHAPE_LIST_VALUE] = this;
    }



    items;

    condensed = false;



    constructor(items = [])
    {
        super(LIST_VALUE);


        if (!items)
            return;


        this.items = [];


        for (let i = 0; i < items.length; i++)
        {
            const item = items[i];
            const copy = item.copy();

            if (copy.valueId == NULL)
                copy.valueId = i.toString();

            this.items.push(copy);

            if (   this.objects
                && item.objects)
                this.objects.push(...item.objects.map(o => o.copy()));
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



    toNewValue()
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



    toJsonText(options = {})
    {
        let json = '';


        let hasNamed = false;

        if (options.showNames === true)
        {
            for (let i = 0; i < this.items.length; i++)
            {
                if (this.items[i].valueId != i)
                {
                    hasNamed = true;
                    break;
                }
            }
        }


        const OB = hasNamed || options.forceBraces === true ? '{' : '[';
        const CB = hasNamed || options.forceBraces === true ? '}' : ']';


        if (this.items.length > 0)
        {
            if (options.named)
                json += '\n' + TAB(options.tab);
    

            json += OB + '\n';


            const oldNamed = options.named;
            options.named = hasNamed;


            const WS = s => 
                   options.whiteSpace 
                && options.lastExpanded 
                    ? s 
                    : '';


            let lastItemExpanded = null;

            for (let i = 0; i < this.items.length; i++)
            {
                const item = this.items[i];

                options.tab++;


                const itemJson = item.toJsonText(options);
                const expanded = itemJson.includes('\n');
                

                if (   i > 0
                    && options.whiteSpace
                    && (   expanded
                        || lastItemExpanded))
                    json += '\n';

                    
                json += TAB(options.tab);


                if (hasNamed)
                    json += '"' + item.valueId + '": ';


                json += itemJson;


                if (i < this.items.length-1)
                    json += ',';

                json += '\n';


                options.tab--;

                lastItemExpanded = expanded;
            }


            json += TAB(options.tab) + CB;


            options.named = oldNamed;

            options.lastExpanded = json.includes('\n');
        }
        else
        {
            json += OB + CB;
            options.lastExpanded = false;
        }


        return json;
    }



    static NaN()
    {
        return new ListValue();//null);
    }



    static parseRequest(parse)
    {
        parse.pos++; // LIST_VALUE

        const list = parse.move();

        if (parse.settings.logRequests) 
            logReqValue(LIST_VALUE, list, parse);

        return ListValue.parse(list)[0];
    }



    static parse(str, i = -1)
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
                case    SHAPE_LIST_VALUE: { const _list   = ListValue        .parse(str, i);  i += _list  [1];  list.items.push(_list  [0]);  break; }
    
                case        NUMBER_VALUE: { const num     = NumberValue      .parse(str[i]);  i += num    [1];  list.items.push(num    [0]);  break; }
                case          TEXT_VALUE: { const text    = TextValue        .parse(str[i]);  i += text   [1];  list.items.push(text   [0]);  break; }
                case         COLOR_VALUE: { const color   = ColorValue       .parse(str, i);  i += color  [1];  list.items.push(color  [0]);  break; }
 
                case          FILL_VALUE: { const fill    = FillValue        .parse(str, i);  i += fill   [1];  list.items.push(fill   [0]);  break; }
                case    COLOR_STOP_VALUE: { const stop    = ColorStopValue   .parse(str, i);  i += stop   [1];  list.items.push(stop   [0]);  break; }
                case      GRADIENT_VALUE: { const grad    = GradientValue    .parse(str, i);  i += grad   [1];  list.items.push(grad   [0]);  break; }
                case        STROKE_VALUE: { const stroke  = StrokeValue      .parse(str, i);  i += stroke [1];  list.items.push(stroke [0]);  break; }
                case   DROP_SHADOW_VALUE: { const shadow  = DropShadowValue  .parse(str, i);  i += shadow [1];  list.items.push(shadow [0]);  break; }
                case  INNER_SHADOW_VALUE: { const shadow  = InnerShadowValue .parse(str, i);  i += shadow [1];  list.items.push(shadow [0]);  break; }
                case    LAYER_BLUR_VALUE: { const blur    = LayerBlurValue   .parse(str, i);  i += blur   [1];  list.items.push(blur   [0]);  break; }
                case     BACK_BLUR_VALUE: { const blur    = BackBlurValue    .parse(str, i);  i += blur   [1];  list.items.push(blur   [0]);  break; }
                case   LAYER_BLEND_VALUE: { const layer   = LayerBlendValue  .parse(str, i);  i += layer  [1];  list.items.push(layer  [0]);  break; }
                case    LAYER_MASK_VALUE: { const mask    = LayerMaskValue   .parse(str[i]);  i += mask   [1];  list.items.push(mask   [0]);  break; }

                case     RECTANGLE_VALUE: { const rect    = RectangleValue   .parse(str, i);  i += rect   [1];  list.items.push(rect   [0]);  break; }
                case          LINE_VALUE: { const line    = LineValue        .parse(str, i);  i += line   [1];  list.items.push(line   [0]);  break; }
                case       ELLIPSE_VALUE: { const ellipse = EllipseValue     .parse(str, i);  i += ellipse[1];  list.items.push(ellipse[0]);  break; }
                case       TRAPEZE_VALUE: { const trapeze = TrapezeValue     .parse(str, i);  i += trapeze[1];  list.items.push(trapeze[0]);  break; }
                case       POLYGON_VALUE: { const poly    = PolygonValue     .parse(str, i);  i += poly   [1];  list.items.push(poly   [0]);  break; }
                case          STAR_VALUE: { const star    = StarValue        .parse(str, i);  i += star   [1];  list.items.push(star   [0]);  break; }
                case    TEXT_SHAPE_VALUE: { const text    = TextShapeValue   .parse(str, i);  i += text   [1];  list.items.push(text   [0]);  break; }
                case         POINT_VALUE: { const point   = PointValue       .parse(str, i);  i += point  [1];  list.items.push(point  [0]);  break; }
                case        POINT3_VALUE: { const point3  = PointValue3      .parse(str, i);  i += point3 [1];  list.items.push(point3 [0]);  break; }
                case VECTOR_VERTEX_VALUE: { const vertex  = VectorVertexValue.parse(str, i);  i += vertex [1];  list.items.push(vertex [0]);  break; }
                case   VECTOR_PATH_VALUE: { const path    = VectorPathValue  .parse(str, i);  i += path   [1];  list.items.push(path   [0]);  break; }
                case SHAPE_BOOLEAN_VALUE: { const bool    = ShapeBooleanValue.parse(str, i);  i += bool   [1];  list.items.push(bool   [0]);  break; }
                case   SHAPE_GROUP_VALUE: { const group   = ShapeGroupValue  .parse(str, i);  i += group  [1];  list.items.push(group  [0]);  break; }
                case         FRAME_VALUE: { const frame   = FrameValue       .parse(str, i);  i += frame  [1];  list.items.push(frame  [0]);  break; }
            }
        }

        
        return [
            list, 
            i - iStart];
    }
}



function getValueTypes(values, debug)
{
    const types = [];

    for (const value of values)
    {
        if (   value.type ==        LIST_VALUE
            || value.type == NUMBER_LIST_VALUE
            || value.type ==   TEXT_LIST_VALUE
            || value.type ==  SHAPE_LIST_VALUE)
            pushUnique(types, finalListTypeFromValues(value.items, debug));

        else
            pushUnique(types, value.type);
    }

    return types;
}



function finalTypeFromValues(values)
{
    return finalTypeFromTypes(getValueTypes(values));
}



function finalListTypeFromValues(values)
{
    return finalListTypeFromTypes(getValueTypes(values));
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
            return ANY_VALUE;

        else if (   !SHAPE_VALUES.includes(_type) 
                 && _type != type)
            return ANY_VALUE;
    }

    return _type;
}



function finalListTypeFromTypes(types)
{
    let _type = finalTypeFromTypes(types);
    
         if (  _type ==        NUMBER_VALUE)  return     NUMBER_LIST_VALUE;
    else if (  _type ==          TEXT_VALUE)  return       TEXT_LIST_VALUE;
    else if (  _type ==    COLOR_STOP_VALUE)  return COLOR_STOP_LIST_VALUE;
    else if (  _type ==          FILL_VALUE)  return       FILL_LIST_VALUE;
    else if (  _type ==         COLOR_VALUE)  return      COLOR_LIST_VALUE;
    else if (  _type ==         POINT_VALUE)  return      POINT_LIST_VALUE;
    else if (  _type ==        POINT3_VALUE)  return     POINT3_LIST_VALUE;
    else if (  _type == VECTOR_VERTEX_VALUE)  return   VECTOR_VERTEX_VALUE;
    else if (SHAPE_VALUES.includes(_type))    return      SHAPE_LIST_VALUE;
    else if ( PATH_VALUES.includes(_type))    return       PATH_LIST_VALUE;
    else                                      return            LIST_VALUE;
}