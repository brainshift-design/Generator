class VectorPathValue
extends ShapeValue
{
    static { GNode.types[VECTOR_PATH_VALUE] = this; }



    points;
    closed;
    degree;
    winding;
    round;



    constructor(nodeId,
                points  = new ListValue(), 
                closed  = new NumberValue(0), 
                degree  = new NumberValue(0), 
                winding = new NumberValue(0), 
                round   = new NumberValue(0))
    {
        super(VECTOR_PATH_VALUE, nodeId, 'vectorPath');

        this.valueId = 'vectorPath';

        this.points  = points ?? new ListValue();
        this.closed  = closed;
        this.degree  = degree;
        this.winding = winding;
        this.round   = round;
    }



    static fromObject(obj)
    {
        return new VectorPathValue(
            obj.nodeId,
            new ListValue(obj.points.map(p => PointValue.fromPoint(obj.nodeId, p))), 
            new NumberValue(obj.closed ), 
            new NumberValue(obj.degree ), 
            new NumberValue(obj.winding), 
            new NumberValue(obj.round  ));
    }



    copy()
    {
        const copy = new VectorPathValue(
            this.nodeId,
            this.points .copy(), 
            this.closed .copy(), 
            this.degree .copy(), 
            this.winding.copy(), 
            this.round  .copy());

        copy.copyBase(this);

        return copy;
    }



    equals(rect)
    {
        return rect
            && this.points .equals(rect.points )
            && this.closed .equals(rect.closed )
            && this.degree .equals(rect.degree )
            && this.winding.equals(rect.winding)
            && this.round  .equals(rect.round  );
    }



    async eval(parse)
    {
        return this.copy();
    }



    toString()
    {
        return      this.points .toString()
            + ' ' + this.closed .toString()
            + ' ' + this.degree .toString()
            + ' ' + this.winding.toString()
            + ' ' + this.round  .toString()
            + ' ' + super.toString();
    }



    toPreviewString()
    {
        return      this.points .toPreviewString()
            + ' ' + this.closed .toPreviewString()
            + ' ' + this.degree .toPreviewString()
            + ' ' + this.winding.toPreviewString()
            + ' ' + this.round  .toPreviewString();
    }



    toDisplayString()
    {
        return      this.points .toDisplayString()
            + ' ' + this.closed .toDisplayString()
            + ' ' + this.degree .toDisplayString()
            + ' ' + this.winding.toDisplayString()
            + ' ' + this.round  .toDisplayString();
    }



    toNewValue()
    {
        return this.copy();
    }



    hasInitValue()
    {
        return super.hasInitValue()
            && this.points .hasInitValue()
            && this.closed .hasInitValue()
            && this.degree .hasInitValue()
            && this.winding.hasInitValue()
            && this.round  .hasInitValue();
    }


    
    isValid()
    {
        return super.isValid()
            && this.points  && this.points .isValid()
            && this.closed  && this.closed .isValid()
            && this.degree  && this.degree .isValid()
            && this.winding && this.winding.isValid()
            && this.round   && this.round  .isValid();
    }



    toJsonText(options = {}) // for formatting values as JSON for OpToJson
    {
        const { WS, SL, SL_, WSL } = getWhiteSpaceForJson(options);


        let json = '';

        
        if (options.named)
            json += SL('\n' + TAB(options.tab));


        json += '{' + SL('\n');
        options.tab++;

        const oldNamed     = options.named;
        options.named      = true;

       
        const quote = options.quoteValues ? '"' : '';

        const oldShowNames = options.showNames;
        options.showNames = false;
        json += WSL(TAB(options.tab)) + '"points": '   + this.points .toJsonText(options) + ',' + SL('\n');
        options.showNames = oldShowNames;

        json += SL(WS('\n'));
        json += SL_(TAB(options.tab)) + '"closed": '   + quote + boolToString(this.closed.value > 0) + quote + ',' + SL('\n');
        json += SL_(TAB(options.tab)) + '"degree": "'  + PathDegrees [this.degree .value] + '",' + SL('\n');
        json += SL_(TAB(options.tab)) + '"winding": "' + PathWindings[this.winding.value] + '",' + SL('\n');
        json += SL_(TAB(options.tab)) + '"round": '    + this.round  .toJsonText(options) + ',' + SL('\n');


        json += this.toBaseJsonText(options);


        options.named     = oldNamed;

        options.tab--;
        json += WSL(TAB(options.tab)) + '}';


        options.lastExpanded = !options.singleLine;


        return json;
    }



   
    static NaN()
    {
        return new VectorPathValue(
            '',
            ListValue  .NaN(),
            NumberValue.NaN(),
            NumberValue.NaN(),
            NumberValue.NaN(),
            NumberValue.NaN());
    }



    static parseRequest(parse)
    {
        parse.pos++; // VECTOR_PATH_VALUE
    
        const path = parse.move();
    
        if (parse.settings.logRequests) 
            logReqValue(VECTOR_PATH_VALUE, path, parse);
    
        return VectorPathValue.parse(path)[0];
    }



    static parse(str, i = -1)
    {
        if (   i <  0 && str    == NAN_DISPLAY
            || i >= 0 && str[i] == NAN_DISPLAY)
            return [VectorPathValue.NaN(), 1];


        if (i < 0)
        {
            str = str.split(' ');
            i   = 0;
        }


        const iStart = i;

        const points  = ListValue.parse  (str, i); i += points [1];
        const closed  = NumberValue.parse(str[i]); i += closed [1];
        const degree  = NumberValue.parse(str[i]); i += degree [1];
        const winding = NumberValue.parse(str[i]); i += winding[1];
        const round   = NumberValue.parse(str[i]); i += round  [1];

        const path = new VectorPathValue(
            '', // set node ID elsewhere
            points [0],
            closed [0],
            degree [0],
            winding[0],
            round  [0]);


        i = ShapeValue.parse(str, i, path);

        
        return [path, i - iStart];
    }
}