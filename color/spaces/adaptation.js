function d502d65(xyz)
{
    const bradford = 
        [ [ 0.9555766, -0.0230393,  0.0631636 ],
          [-0.0282895,  1.0099416,  0.0210077 ],
          [ 0.0122982, -0.0204830,  1.3299098 ] ];

    return dot3(bradford, xyz);
}



function d652d50(xyz)
{
    const bradford = 
        [ [ 1.0184567, 0.0093864, -0.0213199 ],
          [ 0.0120291, 0.9951460, -0.0072228 ],
          [-0.0039673, 0.0064899,  0.8925936 ] ];

    return dot3(bradford, xyz);
}