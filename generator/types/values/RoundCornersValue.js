class RoundCornersValue
extends GValue
{
    static { GNode.types[ROUND_CORNERS_VALUE] = this; }



    tl;
    tr;
    bl;
    br;
    visible;



    constructor(tl = new NumberValue(0), 
                tr = new NumberValue(0), 
                bl = new NumberValue(0), 
                br = new NumberValue(0), 
                visible = true)
    {
        super(ROUND_CORNERS_VALUE, 'roundCorners');

        this.tl      = tl;
        this.tr      = tr;
        this.bl      = bl;
        this.br      = br;
        this.visible = visible;
    }


    
    copy()
    {
        const copy = new RoundCornersValue(
            this.tl.copy(),
            this.tr.copy(),
            this.bl.copy(),
            this.br.copy(),
            this.visible);

        copy.copyBase(this);

        return copy;
    }



    equals(corners)
    {
        return this.tl.equals(corners.tl)
            && this.tr.equals(corners.tr)
            && this.bl.equals(corners.bl)
            && this.br.equals(corners.br)
            && this.visible === corners.visible;
    }



    async eval(parse)
    {
        return this;
    }



    toString()
    {
        return      this.tl.toString()
            + ' ' + this.tr.toString()
            + ' ' + this.bl.toString()
            + ' ' + this.br.toString();
    }



    toPreviewString()
    {
        return      this.tl.toPreviewString()
            + ' ' + this.tr.toPreviewString()
            + ' ' + this.bl.toPreviewString()
            + ' ' + this.br.toPreviewString();
    }



    toDisplayString()
    {
        return      this.tl.toDisplayString()
            + ' ' + this.tr.toDisplayString()
            + ' ' + this.bl.toDisplayString()
            + ' ' + this.br.toDisplayString();
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


        json += TAB(options.tab) + '"topLeft": '     + this.tl.toJsonText(options) + ',\n';
        json += TAB(options.tab) + '"topRight": '    + this.tr.toJsonText(options) + ',\n';
        json += TAB(options.tab) + '"bottomLeft": '  + this.bl.toJsonText(options) + ',\n';
        json += TAB(options.tab) + '"bottomRight": ' + this.br.toJsonText(options) + '\n';


        options.named = oldNamed;

        options.tab--;
        json += TAB(options.tab) + '}';


        return json;
    }



    isValid()
    {
        return this.tl.isValid()
            && this.tr.isValid()
            && this.bl.isValid()
            && this.br.isValid();
    }



    static NaN()
    {
        return new RoundCornersValue(
            NumberValue.NaN(),
            NumberValue.NaN(),
            NumberValue.NaN(),
            NumberValue.NaN(),
            false);
    }



    static parseRequest(parse)
    {
        parse.pos++; // ROUND_CORNERS_VALUE
    
        const corners = parse.move();
    
        if (parse.settings.logRequests) 
            logReqValue(ROUND_CORNERS_VALUE, corners, parse);
    
        return RoundCornersValue.parse(corners)[0];
    }



    static parse(str, i = -1)
    {
        if (   i <  0 && str    == NAN_DISPLAY
            || i >= 0 && str[i] == NAN_DISPLAY)
            return [RoundCornersValue.NaN(), 1];
    
    
        if (i < 0)
        {
            str = str.split(' ');
            i   = 0;
        }
    
    
        const iStart = i;
    
        const tl = NumberValue.parse(str[i]); i += tl[1];
        const tr = NumberValue.parse(str[i]); i += tr[1];
        const bl = NumberValue.parse(str[i]); i += bl[1];
        const br = NumberValue.parse(str[i]); i += br[1];
    
    
        const corners = new RoundCornersValue(
            tl[0],
            tr[0],
            bl[0],
            br[0]);
    
    
        return [corners, i - iStart];
    }
}



