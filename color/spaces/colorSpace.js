// Observer = 2°

const D65 = [0.95047, 1, 1.08883]; 

function createColorSpace(R, G, B, Y, W, gamma, degamma, regamma, luminance)
{
    return {    
        R:         R,
        G:         G,
        B:         B,

        Y:         Y,

        W:         W,

        lin2xyz:   rgbMatrix(R, G, B, W),
        xyz2lin:   inverse(rgbMatrix(R, G, B, W)),

        gamma:     gamma,
        degamma:   degamma,
        regamma:   regamma,
        
        luminance: luminance
    };
}


function rgbMatrix(R, G, B, W)
{
    const C0 = colorVector(R);
    const C1 = colorVector(G);
    const C2 = colorVector(B);

    const M = [ [ C0[0], C1[0], C2[0] ], 
                [ C0[1], C1[1], C2[1] ], 
                [ C0[2], C1[2], C2[2] ] ];

    const S = mulv3m3(W, inverse(M));

    return [ [ S[0]*C0[0], S[1]*C1[0], S[2]*C2[0] ],
             [ S[0]*C0[1], S[1]*C1[1], S[2]*C2[1] ],
             [ S[0]*C0[2], S[1]*C1[2], S[2]*C2[2] ] ];
}


function colorVector(c)
{
    const x = c[0],
          y = c[1];

    return [x/y, 1, (1-x-y)/y];
}
