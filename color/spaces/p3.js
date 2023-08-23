function srgb2p3(rgb)
{
    const p3 = 
        [ [ 0.8225, 0.1774, 0      ],
          [ 0.0332, 0.9669, 0      ],
          [ 0.0171, 0.0724, 0.9108 ] ];

    rgb = degamma(rgb);

    return regamma(dot3(p3, rgb));
}



function p32srgb(rgb) 
{
    const invp3 = 
        [ [ 1.2249, -0.2247, 0      ],
          [-0.0420,  1.0419, 0      ],
          [-0.0197, -0.0786, 1.0979 ] ];
  
    rgb = dot3(invp3, degamma(rgb));
  
    return regamma(rgb);
}