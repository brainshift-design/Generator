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
        const style = new GColorStyle(this.nodeId, this.options);

        return style;
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
            this.evalStyles({rgb: rgb});
        }


        this.validate();

        return this;
    }



    evalStyles(options = {})
    {
        if (!this.options.enabled)
            return;

            
        const style = new FigmaColorStyle(this.nodeId, this.nodeName, 0);

        
        if (!style.paints) 
            style.paints = [];

        style.paints.push([
            'SOLID', 
                    0xff * options.rgb[0]
            + ' ' + 0xff * options.rgb[1]
            + ' ' + 0xff * options.rgb[2]
            + ' ' + 0xff]);


        this.styles = [style];
    }
}