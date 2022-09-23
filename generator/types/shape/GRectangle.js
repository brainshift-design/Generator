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

        rect.copyFromBase(this);

        return rect;
    }



    isValid()
    {
        return this.x     .isValid()
            && this.y     .isValid()
            && this.width .isValid()
            && this.height.isValid()
            && this.angle .isValid()
            && this.round .isValid();
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


        if (this.input)
            this.input.eval(parse);


        const x      = this.x      ? this.x      : this.input ? this.input.x      : null;
        const y      = this.y      ? this.y      : this.input ? this.input.y      : null;
        const width  = this.width  ? this.width  : this.input ? this.input.width  : null;
        const height = this.height ? this.height : this.input ? this.input.height : null;
        const angle  = this.angle  ? this.angle  : this.input ? this.input.angle  : null;
        const round  = this.round  ? this.round  : this.input ? this.input.round  : null;


        if (x     ) genPushUpdateValue(parse, this.nodeId, 'x',      x     );
        if (y     ) genPushUpdateValue(parse, this.nodeId, 'y',      y     );
        if (width ) genPushUpdateValue(parse, this.nodeId, 'width',  width );
        if (height) genPushUpdateValue(parse, this.nodeId, 'height', height);
        if (angle ) genPushUpdateValue(parse, this.nodeId, 'angle',  angle );
        if (round ) genPushUpdateValue(parse, this.nodeId, 'round',  round );


        if (    this.input
            && !this.active) this.objects = this.input.objects;
        else                 this.evalObjects();


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