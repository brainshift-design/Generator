class GColorStyle
extends GColorType
{
    style;



    constructor(nodeId, options)
    {
        super(COLOR_STYLE, nodeId, options);
    }



    copy()
    {
        const style = new GColorStyle(this.nodeId, this.options);

        return style;
    }



    eval(parse)
    {
        if (this.isCached())
            return this;


        this.value = this.value.eval(parse).toValue();
      

        if (this.value.isValid())
        {
            const rgb = this.value.toRgb();
            this.evalObjects({rgb: rgb});
        }


        genPushUpdateValue(parse, this.nodeId, 'value', this.value);


        this.validate();

        return this;
    }



    evalObjects(options = {})
    {
        if (!this.options.enabled)
            return;

            
        this.style = new FigmaColorStyle(this.nodeId, -1);

        
        if (!this.style.fills) 
            this.style.fills = [];

        this.style.fills.push([
            'SOLID', 
                    0xff * options.rgb[0]
            + ' ' + 0xff * options.rgb[1]
            + ' ' + 0xff * options.rgb[2]
            + ' ' + 0xff]);
    }
}