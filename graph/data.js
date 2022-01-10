function dataFromNumber(num)
{
    return {
        type:  'number',
        value: num 
    };
}



function dataFromColor(col)
{
    return {
        type: 'color',
        space: col[0],
        c0:    col[1], 
        c1:    col[1], 
        c2:    col[1] 
    };
}