class Rect
{
    x;
    y;
    w;
    h;


    get l() { return this.x;            }
    get c() { return this.x + this.w/2; }
    get r() { return this.x + this.w;   }

    get t() { return this.y;            }
    get m() { return this.y + this.h/2  }
    get b() { return this.y + this.h;   }

    get tl() { return {x: this.l, y: this.t}; }
    get tc() { return {x: this.c, y: this.t}; }
    get tr() { return {x: this.r, y: this.t}; }
    get ml() { return {x: this.l, y: this.m}; }
    get mc() { return {x: this.c, y: this.m}; }
    get cm() { return {x: this.c, y: this.m}; }
    get mr() { return {x: this.r, y: this.m}; }
    get bl() { return {x: this.l, y: this.b}; }
    get bc() { return {x: this.c, y: this.b}; }
    get br() { return {x: this.r, y: this.b}; }


    get width()  { return this.w; }
    get height() { return this.h; }

    get left()   { return this.l; }
    get center() { return this.c; }
    get right()  { return this.r; }
    
    get top()    { return this.t; }
    get middle() { return this.m; }
    get bottom() { return this.b; }

    get topLeft()      { return this.tl; }
    get topCenter()    { return this.tc; }
    get topRight()     { return this.tr; }
    get middleLeft()   { return this.ml; }
    get middleCenter() { return this.mc; }
    get centerMiddle() { return this.cm; }
    get middleRight()  { return this.mr; }
    get bottomLeft()   { return this.bl; }
    get bottomCenter() { return this.bc; }
    get bottomRight()  { return this.br; }



    constructor(x, y, w, h)
    {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }



    static fromTypical(typ)
    {
        return new Rect(typ.x, typ.y, typ.width, typ.height); 
    }



    // w & h are kept 0 so that isEmpty() works logically on NaN rects
    static get NaN() { return new Rect(Number.NaN, Number.NaN, 0, 0) };
    static get Zero() { return new Rect(0, 0, 0, 0); }



    get isNaN()
    {
        return isNaN(this.x)
            || isNaN(this.y)
            || isNaN(this.w)
            || isNaN(this.h);
    }



	get isEmpty()
	{
		return (this.w == 0
			 || this.h == 0);
	}



    assign(rect)
    {
        this.x = rect.x;
        this.y = rect.y;
        this.w = rect.w;
        this.h = rect.h;
    }



    expandFromRect(rect)
    {
        if (rect.isNaN  ) return this;
        if (rect.isEmpty) return this;

        if (this.isNaN  ) this.assign(rect);
        if (this.isEmpty) return rect;
        
        const newRect = new AbsRect(
            Math.min(this.l, rect.l),
            Math.min(this.t, rect.t),
            Math.max(this.r, rect.r),
            Math.max(this.b, rect.b));

        this.assign(newRect);
    }
}


class   AbsRect
extends Rect
{
    constructor(l, t, r, b)
    {
        super(l, t, r-l, b-t);
    }
}