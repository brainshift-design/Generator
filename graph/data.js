function dataFromNumber(num)
{
    return {
        type:  'number',
        value: num 
    };
}



function dataFromColor(space, col)
{
    return {
        type: 'color',
        space: space,
        c0:    col[0], 
        c1:    col[1], 
        c2:    col[2] 
    };
}