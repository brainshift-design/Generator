class ListValue
extends GValue
{
    items;



    constructor(items = [])
    {
        super(LIST_VALUE);

        if (items)
        {
            this.items = [];
            
            for (const item of items)
                this.items.push(item.copy());
        }
    }



    copy()
    {
        const copy = new ListValue(this.items);

        copy.copyBase(this);

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
        return this;
    }



    isValid()
    {
        return this.items
            && !this.items.find(i => !i.isValid());
    }



    toValue()
    {
        return this.copy();
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
        return ListValue.NaN;
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
        

    const iStart = i;

    const list = new ListValue();
    

    const nInputs = parseInt(str[i++]);


    for (let j = 0; j < nInputs; j++)
    {
        const type = str[i++];
        
        switch (type)
        {
            case      NUMBER_VALUE: { const num     = parseNumberValue    (str[i]);  i += num    [1];  list.items.push(num    [0]);  break; }
            case        TEXT_VALUE: { const text    = parseTextValue      (str[i]);  i += text   [1];  list.items.push(text   [0]);  break; }
            case       COLOR_VALUE: { const col     = parseColorValue     (str, i);  i += col    [1];  list.items.push(col    [0]);  break; }
            case        FILL_VALUE: { const fill    = parseFillValue      (str, i);  i += fill   [1];  list.items.push(fill   [0]);  break; }
            case      STROKE_VALUE: { const stroke  = parseStrokeValue    (str, i);  i += stroke [1];  list.items.push(stroke [0]);  break; }
            case   RECTANGLE_VALUE: { const rect    = parseRectangleValue (str, i);  i += rect   [1];  list.items.push(rect   [0]);  break; }
            case        LINE_VALUE: { const line    = parseLineValue      (str, i);  i += line   [1];  list.items.push(line   [0]);  break; }
            case     ELLIPSE_VALUE: { const ellipse = parseEllipseValue   (str, i);  i += ellipse[1];  list.items.push(ellipse[0]);  break; }
            case     POLYGON_VALUE: { const poly    = parsePolygonValue   (str, i);  i += poly   [1];  list.items.push(poly   [0]);  break; }
            case        STAR_VALUE: { const star    = parseStarValue      (str, i);  i += star   [1];  list.items.push(star   [0]);  break; }
            case   TEXTSHAPE_VALUE: { const star    = parseTextShapeValue (str, i);  i += star   [1];  list.items.push(star   [0]);  break; }
            case        LIST_VALUE:  
            case NUMBER_LIST_VALUE:  
            case   TEXT_LIST_VALUE:  
            case  SHAPE_LIST_VALUE: { const _list  = parseListValue  (str, i); i += _list [1]; list.items.push(_list [0]); break; }
        }
    }
 

    return [
        list, 
        i - iStart];
}