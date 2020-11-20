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


    static NaN  = new Rect(Number.NaN, Number.NaN, Number.NaN, Number.NaN);
    static Zero = new Rect(0, 0, 0, 0);


    get isNaN()
    {
        return isNaN(this.x)
            || isNaN(this.y)
            || isNaN(this.w)
            || isNaN(this.h);
    }

	get isEmpty()
	{
		return (
			   this.w == 0
			|| this.h == 0);
	}

    expandFromRect(rect)
    {
        if (this.isEmpty) return rect;
        if (rect.isEmpty) return this;
        
        const r = AbsRect(
            Math.min(this.t, rect.t),
            Math.min(this.l, rect.l),
            Math.max(this.b, rect.b),
            Math.max(this.r, rect.r));

        this.x = r.x;
        this.y = r.y;
        this.w = r.w;
        this.h = r.h;
    }
}


class   AbsRect
extends Rect
{
    constructor(t, l, b, r)
    {
        super(l, t, r-l, b-t);
    }
}


function rectsIntersect(rect1, rect2)
{
    return !(
           rect1.left   >= rect2.right
        || rect1.right  <= rect2.left
        || rect1.top    >= rect2.bottom
        || rect1.bottom <= rect2.top); 
}
