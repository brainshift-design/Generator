const SimpleColorSpaces = 
[
    ['hex',   'Hex'   ],
    ['rgb',   'RGB'   ], 
    ['hsl',   'HSL'   ], 
    ['hsv',   'HSB'   ], 
    ['hclok', 'HCL/ok']
];


const AdvancedColorSpaces = 
[
    ['hex',   'Hex'         ],
    ['rgb',   'RGB'         ], 
    ['lin',   'RGB/linear'  ], 
    ['p3',    'RGB/P3'      ], 
    ['a98',   'RGB/Adobe98' ], 
    ['pro',   'RGB/ProPhoto'], 
    ['2020',  'RGB/rec.2020'], 
    ['hsl',   'HSL'         ], 
    ['hsv',   'HSB'         ], 
    ['hclok', 'HCL/ok'      ],
    ['hclab', 'HCL/ab'      ],
    ['hcluv', 'HCL/uv'      ],
    ['oklab', 'okLab'       ],
    ['lab',   'Lab'         ],
    ['luv',   'Luv'         ],
    ['xyz',   'XYZ'         ],
    ['xyz50', 'XYZ/D50'     ],
    ['xyz65', 'XYZ/D65'     ]
];



function getColorSpaces(allSpaces)
{
    return allSpaces
         ? AdvancedColorSpaces
         : SimpleColorSpaces;
}



function colorSpace     (index, allSpaces) { return getColorSpaces(allSpaces)[index][0]; }
function colorSpaceIndex(space, allSpaces) { return getColorSpaces(allSpaces).findIndex(s => s[0] == space); }



class ColorSpace
{
    hex         = Object.freeze( 0);
    rgb         = Object.freeze( 1);
    lrgb        = Object.freeze( 2);
    rgbp3       = Object.freeze( 3);
    rgba98      = Object.freeze( 4);
    rgbprophoto = Object.freeze( 5);
    rgbrec2020  = Object.freeze( 6);
    hsl         = Object.freeze( 7);
    hsv         = Object.freeze( 8);
    hclok       = Object.freeze( 9);
    hclab       = Object.freeze(10);
    hcluv       = Object.freeze(11);
    oklab       = Object.freeze(12);
    lab         = Object.freeze(13);
    luv         = Object.freeze(14);
    xyz         = Object.freeze(15);
    xyzd50      = Object.freeze(16);
    xyzd65      = Object.freeze(17);
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