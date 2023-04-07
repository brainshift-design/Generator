class GCorrectColor
extends GColorType
{
    input        = null;
     
    order        = null;
    margin1      = null;
    margin2      = null;
    margin3      = null;

    corrections  = [];



    constructor(nodeId, options)
    {
        super(CORRECT_COLOR, nodeId, options);
    }


    
    copy()
    {
        const copy = new GCorrectColor(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.input) 
            copy.input = this.input.copy();

        if (this.order  ) copy.order   = this.order  .copy();
        if (this.margin1) copy.margin1 = this.margin1.copy();
        if (this.margin2) copy.margin2 = this.margin2.copy();
        if (this.margin3) copy.margin3 = this.margin3.copy();
        if (this.value  ) copy.value   = this.value  .copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        const order   = this.order   ? (await this.order  .eval(parse)).toValue().toInteger() : null;
        const margin1 = this.margin1 ? (await this.margin1.eval(parse)).toValue()             : null;
        const margin2 = this.margin2 ? (await this.margin2.eval(parse)).toValue()             : null;
        const margin3 = this.margin3 ? (await this.margin3.eval(parse)).toValue()             : null;

    
        if (order)
            order.value = Math.min(Math.max(0, order.value), 5);


        if (this.input)
        {
            const input = (await this.input.eval(parse)).toValue();


            if (this.options.enabled)
            {
                if (   isValid(this.order  ) && this.order  .isValid()
                    && isValid(this.margin1) && this.margin1.isValid()
                    && isValid(this.margin2) && this.margin2.isValid()
                    && isValid(this.margin3) && this.margin3.isValid()
                    && isValid(this.value  ) && this.value  .isValid())
                {
                    genPushUpdateValue(parse, this.nodeId, 'order'  , this.order  );
                    genPushUpdateValue(parse, this.nodeId, 'margin1', this.margin1);
                    genPushUpdateValue(parse, this.nodeId, 'margin2', this.margin2);
                    genPushUpdateValue(parse, this.nodeId, 'margin3', this.margin3);
                    genPushUpdateValue(parse, this.nodeId, 'value'  , this.value  );
                }
                else
                {
                    const rgb = input.toRgb();
                    
                    if (!rgbIsOk(rgb))
                        genInitNodeProgress(this.nodeId);


                    const inputColor = input.toDataColor();


                    const
                  [ closestOrder,
                    closest1,
                    closest2,
                    closest3 ] = findCorrection(
                        this.nodeId,
                        inputColor, 
                        order, margin1, margin2, margin3, 
                        this.order   != null,
                        this.margin1 != null, 
                        this.margin2 != null, 
                        this.margin3 != null); 

                        
                    //if (!stopGenerate)
                    //{
                        if (   closestOrder >= 0 
                            && closestOrder <  6)
                        {
                            this._color = correctColor(
                                inputColor,
                                closestOrder,
                                closest1,
                                closest2,
                                closest3);

                                
                            this.order   = new NumberValue(closestOrder);
                            this.margin1 = new NumberValue(closest1);
                            this.margin2 = new NumberValue(closest2);
                            this.margin3 = new NumberValue(closest3);
                            this.value   = ColorValue.fromDataColor(this._color);

                            genPushUpdateValue(parse, this.nodeId, 'order',   new NumberValue(closestOrder));
                            genPushUpdateValue(parse, this.nodeId, 'margin1', new NumberValue(closest1    ));
                            genPushUpdateValue(parse, this.nodeId, 'margin2', new NumberValue(closest2    ));
                            genPushUpdateValue(parse, this.nodeId, 'margin3', new NumberValue(closest3    ));
                            genPushUpdateValue(parse, this.nodeId, 'value',   this.value);
                        }
                        else
                        {
                            this.order   = NumberValue.NaN;
                            this.margin1 = NumberValue.NaN;
                            this.margin2 = NumberValue.NaN;
                            this.margin3 = NumberValue.NaN;
                            this.value   = ColorValue .NaN;

                            genPushUpdateValue(parse, this.nodeId, 'order',   NumberValue.NaN);
                            genPushUpdateValue(parse, this.nodeId, 'margin1', NumberValue.NaN);
                            genPushUpdateValue(parse, this.nodeId, 'margin2', NumberValue.NaN);
                            genPushUpdateValue(parse, this.nodeId, 'margin3', NumberValue.NaN);
                            genPushUpdateValue(parse, this.nodeId, 'value',   ColorValue .NaN);
                        }
                    //}
                }
            }
            else
            {
                this.order   = NumberValue.NaN;
                this.margin1 = NumberValue.NaN;
                this.margin2 = NumberValue.NaN;
                this.margin3 = NumberValue.NaN;
                this.value   = input;

                genPushUpdateValue(parse, this.nodeId, 'order'  , this.order  );
                genPushUpdateValue(parse, this.nodeId, 'margin1', this.margin1);
                genPushUpdateValue(parse, this.nodeId, 'margin2', this.margin2);
                genPushUpdateValue(parse, this.nodeId, 'margin3', this.margin3);
                genPushUpdateValue(parse, this.nodeId, 'value',   this.value  );
            }
        }
        else
        {
            this.order   = NumberValue.NaN;
            this.margin1 = NumberValue.NaN;
            this.margin2 = NumberValue.NaN;
            this.margin3 = NumberValue.NaN;
            this.value   = ColorValue .NaN;

            genPushUpdateValue(parse, this.nodeId, 'order',   NumberValue.NaN);
            genPushUpdateValue(parse, this.nodeId, 'margin1', NumberValue.NaN);
            genPushUpdateValue(parse, this.nodeId, 'margin2', NumberValue.NaN);
            genPushUpdateValue(parse, this.nodeId, 'margin3', NumberValue.NaN);
            genPushUpdateValue(parse, this.nodeId, 'value',   ColorValue .NaN);
        }


        this.validate();

        return this;
    }
}
