const ColorSpaces = 
[
    ['hex',   'Hex'   ],
    ['rgb',   'RGB'   ], 
    ['hsl',   'HSL'   ], 
    ['hsb',   'HSB'   ], 
    ['hclok', 'HCL/ok'],
    ['hclab', 'HCL/ab'],
    ['hcluv', 'HCL/uv'],
    ['oklab', 'okLab' ],
    ['lab',   'Lab'   ],
    ['luv',   'Luv'   ]
];



class ColorSpace
{
    hex   = Object.freeze(0);
    rgb   = Object.freeze(1);
    hsl   = Object.freeze(2);
    hsb   = Object.freeze(3);
    hclok = Object.freeze(4);
    hclab = Object.freeze(5);
    hcluv = Object.freeze(6);
    oklab = Object.freeze(7);
    lab   = Object.freeze(8);
    luv   = Object.freeze(9);
}



class Color
extends Float32Array
{
    get r() { return this[0]; }
    get g() { return this[1]; }
    get b() { return this[2]; }
    get a() { return this[3]; }
    get s() { return this[4]; }

    set r(r) { this[0] = r; }
    set g(g) { this[1] = g; }
    set b(b) { this[2] = b; }
    set a(a) { this[3] = a; }
    set s(s) { this[4] = s; }



    constructor(c = null)
    {
        super(5); // c1, c2, c3, a, s (space)

        if (c)
        {
            this.r = c.r;
            this.g = c.g;
            this.b = c.b;
            this.a = c.a;
            this.s = c.s;
        }
        else
        {
            this.r = 0;
            this.g = 0;
            this.b = 0;
            this.a = 0;
            this.s = ColorSpace.rgb;
        }
    }
}