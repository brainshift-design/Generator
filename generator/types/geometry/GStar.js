class GStar
extends GOperator
{
    input  = null;

    x      = null;
    y      = null;
    width  = null;
    height = null;
    angle  = null;
    round  = null;
    points = null;
    convex = null;



    constructor(nodeId, active)
    {
        super(STAR, nodeId, active);
    }



    copy()
    {
        const star = new GStar(this.nodeId, this.active);

        if (this.input) 
            star.input = this.input.copy();

        if (this.x     ) star.x      = this.x     .copy();
        if (this.y     ) star.y      = this.y     .copy();
        if (this.width ) star.width  = this.width .copy();
        if (this.height) star.height = this.height.copy();
        if (this.angle ) star.angle  = this.angle .copy();
        if (this.round ) star.round  = this.round .copy();
        if (this.points) star.points = this.points.copy();
        if (this.convex) star.convex = this.convex.copy();

        star.copyBase(this);

        return star;
    }



    isValid()
    {
        return this.input
               ? this.input.isValid()
               : (   this.x     .isValid()
                  && this.y     .isValid()
                  && this.width .isValid()
                  && this.height.isValid()
                  && this.angle .isValid()
                  && this.round .isValid()
                  && this.points.isValid()
                  && this.convex.isValid());
    }

    

    eval(parse)
    {
        if (!this.valid)
        {
            this.result = new GStarValue();


            if (this.input)
            {
                this.result = this.input.eval(parse).copy();
                console.assert(this.result.type == STAR_VALUE);

                if (this.x     ) this.result.x      = this.x     .eval(parse).copy();
                if (this.y     ) this.result.y      = this.y     .eval(parse).copy();
                if (this.width ) this.result.width  = this.width .eval(parse).copy();
                if (this.height) this.result.height = this.height.eval(parse).copy();
                if (this.angle ) this.result.angle  = this.angle .eval(parse).copy();
                if (this.round ) this.result.round  = this.round .eval(parse).copy();
                if (this.points) this.result.points = this.points.eval(parse).copy();
                if (this.convex) this.result.convex = this.convex.eval(parse).copy();
            }
            else
            {
                this.result.x      = this.x     .eval(parse).copy();
                this.result.y      = this.y     .eval(parse).copy();
                this.result.width  = this.width .eval(parse).copy();
                this.result.height = this.height.eval(parse).copy();
                this.result.angle  = this.angle .eval(parse).copy();
                this.result.round  = this.round .eval(parse).copy();
                this.result.points = this.points.eval(parse).copy();
                this.result.convex = this.convex.eval(parse).copy();
            }


            this.result.valid = true;
            this.valid        = true;
           
            
            genPushUpdateValue(parse, this.nodeId, STAR_VALUE, this.result);


            if (this.active)
            {
                genPushUpdateObject(
                    parse,
                    this.nodeId,
                    { 
                        nodeId: this.nodeId,          
                        type:   STAR,
                        id:     0,
                        x:      this.result.x     .value,
                        y:      this.result.y     .value,
                        width:  this.result.width .value,
                        height: this.result.height.value,
                        angle:  this.result.angle .value,
                        round:  Math.max(0, this.result.round.value),
                        points: this.result.points.value,
                        convex: this.result.convex.value
                    });
            }
        }


        return this.result;
    }
}