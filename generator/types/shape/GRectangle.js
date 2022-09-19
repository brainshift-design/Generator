class GRectangle
extends GShapeBase
{
    input  = null;

    x      = null;
    y      = null;
    width  = null;
    height = null;
    angle  = null;
    round  = null;



    constructor(nodeId, active)
    {
        super(RECTANGLE, nodeId, active);
    }



    copy()
    {
        const rect = new GRectangle(this.nodeId, this.active);

        if (this.input) 
            rect.input = this.input.copy();

        if (this.x     ) rect.x      = this.x     .copy();
        if (this.y     ) rect.y      = this.y     .copy();
        if (this.width ) rect.width  = this.width .copy();
        if (this.height) rect.height = this.height.copy();
        if (this.angle ) rect.angle  = this.angle .copy();
        if (this.round ) rect.round  = this.round .copy();

        rect.copyFromeBase(this);

        return rect;
    }



    eval(parse)
    {
        if (this.valid)
            return;


        if (this.x     ) this.x     .eval(parse);
        if (this.y     ) this.y     .eval(parse);
        if (this.width ) this.width .eval(parse);
        if (this.height) this.height.eval(parse);
        if (this.angle ) this.angle .eval(parse);
        if (this.round ) this.round .eval(parse);


        this.evalBase(parse, this.input);


        if (this.input)
            this.input.eval(parse);


        genPushUpdateValue(parse, this.nodeId, 'x',      this.input ? this.input.x      : this.x     );
        genPushUpdateValue(parse, this.nodeId, 'y',      this.input ? this.input.y      : this.y     );
        genPushUpdateValue(parse, this.nodeId, 'width',  this.input ? this.input.width  : this.width );
        genPushUpdateValue(parse, this.nodeId, 'height', this.input ? this.input.height : this.height);
        genPushUpdateValue(parse, this.nodeId, 'angle',  this.input ? this.input.angle  : this.angle );
        genPushUpdateValue(parse, this.nodeId, 'round',  this.input ? this.input.round  : this.round );


        this.evalObjects();


        this.valid = true;
    }



    evalObjects()
    {
        this.objects = 
        [{
            type:   RECTANGLE,
            id:     0,
            x:                  (this.input ? this.input.x      : this.x     ).value,
            y:                  (this.input ? this.input.y      : this.y     ).value,
            width:              (this.input ? this.input.width  : this.width ).value,
            height:             (this.input ? this.input.height : this.height).value,
            angle:              (this.input ? this.input.angle  : this.angle ).value,
            round:  Math.max(0, (this.input ? this.input.round  : this.round ).value)
        }];

        
        super.evalObjects();
    }
}