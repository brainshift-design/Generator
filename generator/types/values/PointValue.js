class PointValue
extends GValue
{
    nodeId;

    x;
    y;
    smooth;


    sp0 = null; //  sp0 ------- sp1 
    sp1 = null; //   |
    sp2 = null; //  sp2



    constructor(nodeId,
                x = new NumberValue(0), 
                y = new NumberValue(0),
                smooth = null)
    {
        super(POINT_VALUE);

        this.nodeId  = nodeId;

        this.x       = x;
        this.y       = y;
        this.smooth  = smooth;


        this.createDefaultSpace();
    }



    static fromObject(obj)
    {
        return new PointValue(
            obj.nodeId,
            new NumberValue(obj.x     ), 
            new NumberValue(obj.y     ), 
            new NumberValue(obj.smooth));
    }



    copy()
    {
        const copy = new PointValue(
            this.nodeId,
            this.x.copy(), 
            this.y.copy());

        if (this.smooth) copy.smooth = this.smooth.copy();

        copy.copyBase(this);

        copy.sp0 = clone(this.sp0);
        copy.sp1 = clone(this.sp1);
        copy.sp2 = clone(this.sp2);

        return copy;
    }



    equals(p)
    {
        return p
            && this.x.equals(p.x)
            && this.y.equals(p.y);
    }



    createDefaultSpace(cx = 0, cy = 0)
{
        this.sp0 = point(cx,   cy  );
        this.sp1 = point(cx+1, cy  );
        this.sp2 = point(cx,   cy+1);
    }



    applySpaceTransform(xform, space)
    {
        this.sp0 = transformPoint(this.sp0, xform, space);
        this.sp1 = transformPoint(this.sp1, xform, space);
        this.sp2 = transformPoint(this.sp2, xform, space);
    }



    static create(nodeId, x, y)
    {
        return new PointValue(
            nodeId,
            new NumberValue(x),
            new NumberValue(y));
    }



    static fromPoint(nodeId, p)
    {
        return new PointValue(
            nodeId,
            new NumberValue(p.x),
            new NumberValue(p.y));
    }



    async eval(parse)
    {
        return this.copy();
    }



    hasInitValue()
    {
        return this.x.hasInitValue()
            && this.y.hasInitValue()
            && (  !this.smooth
                || this.smooth.hasInitValue());
    }



    isValid()
    {
        return this.x.isValid()
            && this.y.isValid()
            && (  !this.smooth
                || this.smooth.isValid());
    }



    toString()
    {
        return this.x.isValid()
            && this.y.isValid()
            ?         this.x.toString()
              + ' ' + this.y.toString()
            : NAN_DISPLAY;
    }



    toPreviewString()
    {
        return this.x.isValid()
            && this.y.isValid()
            ?   '(' + this.x.toPreviewString()
              + ', ' + this.y.toPreviewString()
              + ')'
            : NAN_DISPLAY;
    }



    toDisplayString()
    {
        return this.x.isValid()
            && this.y.isValid()
            ?         this.x.toDisplayString()
              + ' ' + this.y.toDisplayString()
            : NAN_DISPLAY;
    }



    toJsonText(options = {}) // for formatting values as JSON for OpToJson
    {
        let json = '';

        
        if (options.named)
            json += '\n' + TAB(options.tab);


        json += '{\n';
        options.tab++;

        const oldNamed = options.named;
        options.named = true;


        json += TAB(options.tab) + '"x": ' + this.x.toJsonText(options) + ',\n';
        json += TAB(options.tab) + '"y": ' + this.y.toJsonText(options);

        if (  !this.smooth
            || this.smooth.value == 100)
            json += '\n';
        else
            json += 
                  ',\n' 
                + TAB(options.tab) + '"smooth": ' + this.smooth.toJsonText(options) + '\n';


        options.named = oldNamed;

        options.tab--;
        json += TAB(options.tab) + '}';


        return json;
    }



    toValue()
    {
        return this.copy();
    }



    toPoint()
    {
        return point(
            this.x.value,
            this.y.value);
    }



    toJsCode(gen)
    {
        return '';//this.toPreviewString();
    }



    static NaN()
    {
        return new PointValue(
            '',
            NumberValue.NaN(), 
            NumberValue.NaN());
    }
}



function parsePointValue(str, i = -1)
{
    if (   i <  0 && str    == NAN_DISPLAY
        || i >= 0 && str[i] == NAN_DISPLAY)
        return [PointValue.NaN(), 1];


    if (i < 0)
    {
        str = str.split(' ');
        i   = 0;
    }


    const iStart = i;

    const x = parseNumberValue(str[i]); i += x[1];
    const y = parseNumberValue(str[i]); i += y[1];


    const point = new PointValue(
        '', // set node ID elsewhere
        x[0],
        y[0]);


    return [point, i - iStart];
}
