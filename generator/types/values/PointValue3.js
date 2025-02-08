class PointValue3
extends GValue
{
    static { GNode.types[POINT3_VALUE] = this; }



    nodeId;

    x;
    y;
    z;
    smooth;


    sp0 = null; //  sp0 ------- sp1 
    sp1 = null; //  |  \
    sp2 = null; //  |   \
    sp3 = null; // sp2  sp3


    constructor(nodeId,
                x = new NumberValue(0), 
                y = new NumberValue(0),
                z = new NumberValue(0),
                smooth = null)
    {
        super(POINT_VALUE, 'point');

        this.nodeId  = nodeId;

        this.x       = x;
        this.y       = y;
        this.z       = z;
        this.smooth  = smooth;


        this.createDefaultSpace();
    }



    static fromObject(obj)
    {
        return new PointValue3(
            obj.nodeId,
            new NumberValue(obj.x     ), 
            new NumberValue(obj.y     ), 
            new NumberValue(obj.z     ),
            new NumberValue(obj.smooth));
    }



    copy()
    {
        const copy = new PointValue3(
            this.nodeId,
            this.x.copy(), 
            this.y.copy(),
            this.z.copy());

        if (this.smooth) copy.smooth = this.smooth.copy();

        copy.copyBase(this);

        copy.sp0 = clone(this.sp0);
        copy.sp1 = clone(this.sp1);
        copy.sp2 = clone(this.sp2);
        copy.sp3 = clone(this.sp3);

        return copy;
    }



    equals(p)
    {
        return p
            && this.x.equals(p.x)
            && this.y.equals(p.y)
            && this.z.equals(p.z);
    }



    createDefaultSpace(cx = 0, cy = 0, cz = 0)
{
        this.sp0 = point(cx,   cy,   cz  );
        this.sp1 = point(cx+1, cy,   cz  );
        this.sp2 = point(cx,   cy+1, cz  );
        this.sp3 = point(cx,   cy,   cz+1);
    }



    applySpaceTransform2(xform, space)
    {
        this.sp0 = transformPoint2(this.sp0, xform, space);
        this.sp1 = transformPoint2(this.sp1, xform, space);
        this.sp2 = transformPoint2(this.sp2, xform, space);
    }



    applySpaceTransform3(xform, space)
    {
        this.sp0 = transformPoint3(this.sp0, xform, space);
        this.sp1 = transformPoint3(this.sp1, xform, space);
        this.sp2 = transformPoint3(this.sp2, xform, space);
        this.sp3 = transformPoint3(this.sp3, xform, space);
    }



    static create(nodeId, x, y, z = 0)
    {
        return new PointValue3(
            nodeId,
            new NumberValue(x),
            new NumberValue(y),
            new NumberValue(z));

    }



    static fromPoint(nodeId, p)
    {
        return new PointValue3(
            nodeId,
            new NumberValue(p.x),
            new NumberValue(p.y),
            new NumberValue(p.z));
    }



    async eval(parse)
    {
        return this.copy();
    }



    hasInitValue()
    {
        return this.x.hasInitValue()
            && this.y.hasInitValue()
            && this.z.hasInitValue()
            && (  !this.smooth
                || this.smooth.hasInitValue());
    }



    isValid()
    {
        return this.x.isValid()
            && this.y.isValid()
            && this.z.isValid()
            && (  !this.smooth
                || this.smooth.isValid());
    }



    toString()
    {
        return this.x.isValid()
            && this.y.isValid()
            && this.z.isValid()
            ?         this.x.toString()
              + ' ' + this.y.toString()
              + ' ' + this.z.toString()
            : NAN_DISPLAY;
    }



    toPreviewString()
    {
        return this.x.isValid()
            && this.y.isValid()
            && this.z.isValid()
            ?   '('  + this.x.toPreviewString()
              + ', ' + this.y.toPreviewString()
              + ', ' + this.z.toPreviewString()
              + ')'
            : NAN_DISPLAY;
    }



    toDisplayString()
    {
        return this.x.isValid()
            && this.y.isValid()
            && this.z.isValid()
            ?         this.x.toDisplayString()
              + ' ' + this.y.toDisplayString()
              + ' ' + this.z.toDisplayString()
            : NAN_DISPLAY;
    }



    toJsonText(options = {}) // for formatting values as JSON for OpToJson
    {
        const SL  = s => options.singleLine ? ''  : s;
        const SL_ = s => options.singleLine ? ' ' : s;


        let json = '';


        if (options.named)
            json += SL('\n' + TAB(options.tab));


        json += '{' + SL('\n');
        options.tab++;

        const oldNamed = options.named;
        options.named = true;


        json += SL_(TAB(options.tab)) + '"x": ' + this.x.toJsonText(options) + ',' + SL('\n');
        json += SL_(TAB(options.tab)) + '"y": ' + this.y.toJsonText(options) + ',' + SL('\n');
        json += SL_(TAB(options.tab)) + '"z": ' + this.z.toJsonText(options);

        
        if (   this.smooth
            && this.smooth.value != 100)
            json += ',' + SL_('\n' + TAB(options.tab)) + '"smooth": ' + this.smooth.toJsonText(options);


        options.named = oldNamed;

        options.tab--;
        json += SL_('\n' + TAB(options.tab)) + '}';


        options.lastExpanded = !options.singleLine;

        return json;
    }



    toNewValue()
    {
        return this.copy();
    }



    toPoint3()
    {
        return point3(
            this.x.value,
            this.y.value,
            this.z.value);
    }



    toJsCode(gen)
    {
        return '';
    }



    static NaN()
    {
        return new PointValue3(
            '',
            NumberValue.NaN(), 
            NumberValue.NaN(),
            NumberValue.NaN());
    }



    static parseRequest(parse)
    {
        parse.pos++; // POINT3_VALUE
    
        const point = parse.move();
    
        if (parse.settings.logRequests) 
            logReqValue(POINT3_VALUE, point, parse);
    
        return PointValue3.parse(point)[0];
    }



    static parse(str, i = -1)
    {
        if (   i <  0 && str    == NAN_DISPLAY
            || i >= 0 && str[i] == NAN_DISPLAY)
            return [PointValue3.NaN(), 1];


        if (i < 0)
        {
            str = str.split(' ');
            i   = 0;
        }


        const iStart = i;

        const x = NumberValue.parse(str[i]); i += x[1];
        const y = NumberValue.parse(str[i]); i += y[1];
        const z = NumberValue.parse(str[i]); i += z[1];


        const point = new PointValue3(
            '', // set node ID elsewhere
            x[0],
            y[0],
            z[0]);


        return [point, i - iStart];
    }
}