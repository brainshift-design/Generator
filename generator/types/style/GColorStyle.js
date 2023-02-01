class GColorStyle
extends GObjectBase
{
    style;



    constructor(nodeId, options)
    {
        super(COLOR_STYLE, nodeId, options);
    }



    copy()
    {
        const copy = new GColorStyle(this.nodeId, this.options);

        copy.style = this.style.copy();
        
        return copy;
    }



    eval(parse)
    {
        if (this.isCached())
            return this;

            
        this.value = this.value.eval(parse).toValue();
      

        genPushUpdateValue(parse, this.nodeId, 'value', this.value);


        if (this.value.isValid())
        {
            const rgb = this.value.toRgb();
            this.evalStyle({rgb: rgb});
        }


        this.validate();

        return this;
    }



    evalStyle(options = {})
    {
        if (!this.options.enabled)
            return;

            
        const style = new FigmaColorStyle(this.nodeId, this.nodeName);

        
        if (!style.paints) 
            style.paints = [];

        style.paints.push([
            'SOLID', 
                    0xff * options.rgb[0]
            + ' ' + 0xff * options.rgb[1]
            + ' ' + 0xff * options.rgb[2]
            + ' ' + 0xff]);


        this.style = style;
    }
}