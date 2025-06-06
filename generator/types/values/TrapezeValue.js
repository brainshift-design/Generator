class TrapezeValue
extends ShapeValue
{
    x;
    y;
    width;
    height;
    round;
    bias;



    constructor(nodeId,
                x      = new NumberValue(0), 
                y      = new NumberValue(0), 
                width  = new NumberValue(0), 
                height = new NumberValue(0), 
                round  = new NumberValue(0),
                bias   = new NumberValue(0))
    {
        super(TRAPEZE_VALUE, nodeId, 'trapeze');

        this.x      = x;
        this.y      = y;
        this.width  = width;
        this.height = height;
        this.round  = round;
        this.bias   = bias;
    }



    static fromObject(obj)
    {
        return new TrapezeValue(
            obj.nodeId,
            new NumberValue(obj.x     ), 
            new NumberValue(obj.y     ), 
            new NumberValue(obj.width ), 
            new NumberValue(obj.height), 
            new NumberValue(obj.round ),
            new NumberValue(obj.bias  ));
    }



    copy()
    {
        const copy = new TrapezeValue(
            this.nodeId,
            this.x     .copy(), 
            this.y     .copy(), 
            this.width .copy(), 
            this.height.copy(), 
            this.round .copy(),
            this.bias  .copy());

        copy.copyBase(this);

        return copy;
    }



    equals(rect)
    {
        return rect
            && this.x     .equals(rect.x     )
            && this.y     .equals(rect.y     )
            && this.width .equals(rect.width )
            && this.height.equals(rect.height)
            && this.round .equals(rect.round )
            && this.bias  .equals(rect.bias  );
    }



    async eval(parse)
    {
        return this.copy();
    }



    toString()
    {
        return      this.x     .toString()
            + ' ' + this.y     .toString()
            + ' ' + this.width .toString()
            + ' ' + this.height.toString()
            + ' ' + this.round .toString()
            + ' ' + this.bias  .toString()
            + ' ' + super.toString();
    }



    toPreviewString()
    {
        return 'trapeze';
            //        this.x     .toPreviewString()
            //+ ' ' + this.y     .toPreviewString()
            //+ ' ' + this.width .toPreviewString()
            //+ ' ' + this.height.toPreviewString()
            //+ ' ' + this.round .toPreviewString()
            //+ ' ' + this.bias  .toPreviewString();
    }



    toDisplayString()
    {
        return      this.x     .toDisplayString()
            + ' ' + this.y     .toDisplayString()
            + ' ' + this.width .toDisplayString()
            + ' ' + this.height.toDisplayString()
            + ' ' + this.round .toDisplayString()
            + ' ' + this.bias  .toDisplayString();
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


        json += WSL(TAB(options.tab)) + '"x": '      + this.x     .toJsonText(options) + ',' + SL('\n');
        json += SL_(TAB(options.tab)) + '"y": '      + this.y     .toJsonText(options) + ',' + SL('\n');
        json += SL_(TAB(options.tab)) + '"width": '  + this.width .toJsonText(options) + ',' + SL('\n');
        json += SL_(TAB(options.tab)) + '"height": ' + this.height.toJsonText(options) + ',' + SL('\n');
        json += SL_(TAB(options.tab)) + '"round": '  + this.round .toJsonText(options) + ',' + SL('\n');
        json += SL_(TAB(options.tab)) + '"bias": '   + this.bias  .toJsonText(options) + ',' + SL('\n');


        json += this.toBaseJsonText(options);


        options.named = oldNamed;

        options.tab--;
        json += WSL(TAB(options.tab)) + '}';


        options.lastExpanded = !options.singleLine;


        return json;
    }



    toNewValue()
    {
        return this.copy();
    }



    hasInitValue()
    {
        return super.hasInitValue()
            && this.x     .hasInitValue()
            && this.y     .hasInitValue()
            && this.width .hasInitValue()
            && this.height.hasInitValue()
            && this.round .hasInitValue()
            && this.bias  .hasInitValue();
    }


    
    isValid()
    {
        return super.isValid()
            && this.x     .isValid()
            && this.y     .isValid()
            && this.width .isValid()
            && this.height.isValid()
            && this.round .isValid()
            && this.bias  .isValid();
    }


    
    static NaN()
    {
        return new TrapezeValue(
            '',
            NumberValue.NaN(),
            NumberValue.NaN(),
            NumberValue.NaN(),
            NumberValue.NaN(),
            NumberValue.NaN(),
            NumberValue.NaN());
    }
    
    
    
    static parse(str, i = -1)
    {
        if (   i <  0 && str    == NAN_DISPLAY
            || i >= 0 && str[i] == NAN_DISPLAY)
            return [TrapezeValue.NaN(), 1];
    
    
        if (i < 0)
        {
            str = str.split(' ');
            i   = 0;
        }
    
    
        const iStart = i;
    
        const x      = NumberValue.parse(str[i]); i += x     [1];
        const y      = NumberValue.parse(str[i]); i += y     [1];
        const width  = NumberValue.parse(str[i]); i += width [1];
        const height = NumberValue.parse(str[i]); i += height[1];
        const round  = NumberValue.parse(str[i]); i += round [1];
        const bias   = NumberValue.parse(str[i]); i += bias  [1];
    
    
        const rect = new TrapezeValue(
            '', // set node ID elsewhere
            x     [0],
            y     [0],
            width [0],
            height[0],
            round [0],
            bias  [0]);
    
    
        i = ShapeValue.parse(str, i, rect);
    
        
        return [rect, i - iStart];
    }
}
