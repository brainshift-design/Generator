class ShapeGroupValue
extends GValue
{
    items = [];



    constructor(nodeId, items = [])
    {
        super(SHAPE_GROUP_VALUE, 'group');

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



    toPreviewString()
    {
        if (!this.items)
            return '';


        let str = '';
        
        
        str += this.items.length;

        for (let i = 0; i < this.items.length; i++)
        {
            const item = this.items[i];

            str += ' ' + item.type + ' ';
            str += item.toPreviewString();
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



    toNewValue()
    {
        return this.copy();
    }



    isValid()
    {
        return  this.items
            && !this.items.find(i => !i.isValid());
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


            const WS  = s => options.whiteSpace ? s : '';


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
        return new ShapeGroupValue(
            '',
            ListValue.NaN());
        }
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
            case          LIST_VALUE:  
            case    SHAPE_LIST_VALUE: { const _list   = parseListValue        (str, i);  i += _list  [1];  group.items.push(_list  [0]);  break; }
 
            case     RECTANGLE_VALUE: { const rect    = parseRectangleValue   (str, i);  i += rect   [1];  group.items.push(rect   [0]);  break; }
            case          LINE_VALUE: { const line    = parseLineValue        (str, i);  i += line   [1];  group.items.push(line   [0]);  break; }
            case       ELLIPSE_VALUE: { const ellipse = parseEllipseValue     (str, i);  i += ellipse[1];  group.items.push(ellipse[0]);  break; }
            case       TRAPEZE_VALUE: { const ellipse = parseTrapezeValue     (str, i);  i += ellipse[1];  group.items.push(ellipse[0]);  break; }
            case       POLYGON_VALUE: { const poly    = parsePolygonValue     (str, i);  i += poly   [1];  group.items.push(poly   [0]);  break; }
            case          STAR_VALUE: { const star    = parseStarValue        (str, i);  i += star   [1];  group.items.push(star   [0]);  break; }
            case    TEXT_SHAPE_VALUE: { const text    = parseTextShapeValue   (str, i);  i += text   [1];  group.items.push(text   [0]);  break; }
            case         POINT_VALUE: { const point   = parsePointValue       (str, i);  i += point  [1];  group.items.push(point  [0]);  break; }
            case   VECTOR_PATH_VALUE: { const path    = parseVectorPathValue  (str, i);  i += path   [1];  group.items.push(path   [0]);  break; }
            case SHAPE_BOOLEAN_VALUE: { const path    = parseShapeBooleanValue(str, i);  i += path   [1];  group.items.push(path   [0]);  break; }
            case   SHAPE_GROUP_VALUE: { const _group  = parseShapeGroupValue  (str, i);  i += _group [1];  group.items.push(_group [0]);  break; }
            case         FRAME_VALUE: { const frame   = parseFrameValue       (str, i);  i += frame  [1];  group.items.push(frame  [0]);  break; }
        }
    }

    
    return [
        group, 
        i - iStart];
}
