class GColorStyle
extends GShapeBase
{
    input = null;



    constructor(nodeId, options)
    {
        super(COLOR_STYLE, nodeId, options);
    }



    copy()
    {
        const style = new GColorStyle(this.nodeId, this.options);

        if (this.input) 
            style.input = this.input.copy();

        return style;
    }



    eval(parse)
    {
        if (this.isCached())
            return this;

            
        if (this.input)
        {
            const input = this.input.eval(parse).toValue();
            const rgb   = input.toRgb();

            this.evalObjects({rgb: rgb});
        }


        genPushUpdateValue(parse, this.nodeId, '', NullValue);


        this.validate();

        return this;
    }



    evalObjects(options = {})
    {
        if (!this.options.enabled)
            return;

            
        const style = new FigmaColorStyle(this.nodeId, -1);

        
        if (!style.fills) 
            style.fills = [];

        style.fills.push([
            'SOLID', 
                    0xff * options.rgb[0]
            + ' ' + 0xff * options.rgb[1]
            + ' ' + 0xff * options.rgb[2]
            + ' ' + 0xff]);


        this.objects = [style];

        
        super.evalObjects();
    }
}