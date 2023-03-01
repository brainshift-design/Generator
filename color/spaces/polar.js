const hclok_C_scale = 0.89;


function opp2pol(opp) // opponent to polar
{
    // either lab or luv, 
    // the polar transformation is the same

    const l = opp[0], 
          a = opp[1], 
          b = opp[2];

    const h = Math.atan2(b, a);
    const c = Math.sqrt(a*a + b*b);

    return [h, c, l];
}



function pol2opp(pol) // polar to opponent
{
    // either lab or luv, 
    // the polar transformation is the same

    const h = pol[0], 
          c = pol[1], 
          l = pol[2];

    const a = c * Math.cos(h);
    const b = c * Math.sin(h);

    return [l, a, b];
}