class GStroke
extends GOperator
{
    fill   = null;
    weight = null;
    fit    = null;
    join   = null;
    miter  = null;



    constructor(nodeId, active)
    {
        super(STROKE, nodeId, active);
    }



    copy()
    {
        const stroke = new GStroke(this.nodeId, this.active);

        if (this.input) 
            stroke.input = this.input.copy();

        if (this.fill  ) stroke.fill   = this.fill  .copy();
        if (this.weight) stroke.weight = this.weight.copy();
        if (this.fit   ) stroke.fit    = this.fit   .copy();
        if (this.join  ) stroke.join   = this.join  .copy();
        if (this.miter ) stroke.miter  = this.miter .copy();

        return stroke;
    }



    eval(parse)
    {
        if (!this.valid)
        {
            const fill   = this.fill  .eval(parse).copy();
            const weight = this.weight.eval(parse).copy();
            const fit    = this.fit   .eval(parse).copy();
            const join   = this.join  .eval(parse).copy();
            const miter  = this.miter .eval(parse).copy();            

            if (this.input)
            {
                this.result = this.input.eval(parse).copy();

                console.assert(
                    this.result.type == STROKE_VALUE,
                    'GStroke this.result.type must be STROKE_VALUE');

                if (this.fill  ) this.result.fill   = fill;
                if (this.weight) this.result.weight = weight;
                if (this.fit   ) this.result.fit    = fit;
                if (this.join  ) this.result.join   = join;
                if (this.miter ) this.result.miter  = miter;
            }
            else
            {
                this.result = new StrokeValue(fill, weight, fit, join, miter);
            }
        

            genPushUpdateValue(parse, this.nodeId, 'value',  this.result);

            genPushUpdateValue(parse, this.nodeId, 'fill',   fill  );
            genPushUpdateValue(parse, this.nodeId, 'weight', weight);
            genPushUpdateValue(parse, this.nodeId, 'fit',    fit   );
            genPushUpdateValue(parse, this.nodeId, 'join',   join  );
            genPushUpdateValue(parse, this.nodeId, 'miter',  miter );


            this.result.valid = true;
            this.valid        = true;
        }


        return this.result;
    }
}