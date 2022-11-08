class FigmaObject
{
    type;

    id          = 0;

    fills       = [];
    strokeFills = [];

    strokeWeight;
    strokeFit;
    strokeJoin;
    strokeMiter;



    constructor(type)
    {
        this.type = type;
    }



    copyBase(base)
    {
        this.type         = base.type;
        this.id           = base.id;
               
        this.fills        = clone(base.fills);
        this.strokeFills  = clone(base.strokeFills);

        this.strokeWeight = base.strokeWeight;
        this.strokeFit    = base.strokeFit;
        this.strokeJoin   = base.strokeJoin;
        this.strokeMiter  = base.strokeMiter;
    }
}