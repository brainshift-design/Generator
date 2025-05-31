class StrokeSidesValue
extends GValue
{
    static { GNode.types[STROKE_SIDES_VALUE] = this; }



    top;
    left;
    right;
    bottom;
    visible;



    constructor(top     = new NumberValue(0), 
                left    = new NumberValue(0), 
                right   = new NumberValue(0), 
                bottom  = new NumberValue(0), 
                visible = true)
    {
        super(STROKE_SIDES_VALUE, 'strokeSides');

        this.top     = top;
        this.left    = left;
        this.right   = right;
        this.bottom  = bottom;
        this.visible = visible;
    }


    
    copy()
    {
        const copy = new StrokeSidesValue(
            this.top   .copy(),
            this.left  .copy(),
            this.right .copy(),
            this.bottom.copy(),
            this.visible);

        copy.copyBase(this);

        return copy;
    }



    equals(sides)
    {
        return this.top   .equals(sides.tl)
            && this.left  .equals(sides.tr)
            && this.right .equals(sides.bl)
            && this.bottom.equals(sides.br)
            && this.visible === sides.visible;
    }



    async eval(parse)
    {
        return this;
    }



    toString()
    {
        return      this.top   .toString()
            + ' ' + this.left  .toString()
            + ' ' + this.right .toString()
            + ' ' + this.bottom.toString();
    }



    toPreviewString()
    {
        return      this.top   .toPreviewString()
            + ' ' + this.left  .toPreviewString()
            + ' ' + this.right .toPreviewString()
            + ' ' + this.bottom.toPreviewString();
    }



    toDisplayString()
    {
        return      this.top   .toDisplayString()
            + ' ' + this.left  .toDisplayString()
            + ' ' + this.right .toDisplayString()
            + ' ' + this.bottom.toDisplayString();
    }



    isValid()
    {
        return this.top   .isValid()
            && this.left  .isValid()
            && this.right .isValid()
            && this.bottom.isValid();
    }



    toJsonText(options = {}) // for formatting values as JSON for OpToJson
    {
        const { SL, SL_, WSL } = getWhiteSpaceForJson(options);


        let json = '';

        
        if (options.named)
            json += SL('\n' + TAB(options.tab));


        json += '{' + SL('\n');
        options.tab++;

        const oldNamed = options.named;
        options.named = true;


        json += WSL(TAB(options.tab)) + '"top": '    + this.top   .toJsonText(options) + ',' + SL('\n');
        json += SL_(TAB(options.tab)) + '"left": '   + this.left  .toJsonText(options) + ',' + SL('\n');
        json += SL_(TAB(options.tab)) + '"right": '  + this.right .toJsonText(options) + ',' + SL('\n');
        json += SL_(TAB(options.tab)) + '"bottom": ' + this.bottom.toJsonText(options) + SL('\n');


        options.named = oldNamed;

        options.tab--;
        json += WSL(TAB(options.tab)) + '}';


        options.lastExpanded = !options.singleLine;


        return json;
    }



    static NaN()
    {
        return new StrokeSidesValue(
            NumberValue.NaN(),
            NumberValue.NaN(),
            NumberValue.NaN(),
            NumberValue.NaN(),
            false);
    }



    static parseRequest(parse)
    {
        parse.pos++; // STROKE_SIDES_VALUE
    
        const sides = parse.move();
    
        if (parse.settings.logRequests) 
            logReqValue(STROKE_SIDES_VALUE, sides, parse);
    
        return StrokeSidesValue.parse(sides)[0];
    }



    static parse(str, i = -1)
    {
        if (   i <  0 && str    == NAN_DISPLAY
            || i >= 0 && str[i] == NAN_DISPLAY)
            return [StrokeSidesValue.NaN(), 1];


        if (i < 0)
        {
            str = str.split(' ');
            i   = 0;
        }


        const iStart = i;

        const top    = NumberValue.parse(str[i]); i += top   [1];
        const left   = NumberValue.parse(str[i]); i += left  [1];
        const right  = NumberValue.parse(str[i]); i += right [1];
        const bottom = NumberValue.parse(str[i]); i += bottom[1];


        const sides = new StrokeSidesValue(
            top   [0],
            left  [0],
            right [0],
            bottom[0]);


        return [sides, i - iStart];
    }
}



