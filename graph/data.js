const rgbObject       = hex2rgb('#bee0ff');
const rgbActiveObject = hex2rgb('#18a0fb');
const rgbNumber       = hex2rgb('#ddd');
const rgbActiveNumber = hex2rgb('#787878');
const rgbColor        = hex2rgb('#ddd');//hex2rgb('#cc33cc'); // these are normally
const rgbActiveColor  = hex2rgb('#787878');//hex2rgb('#ff00ff'); // not used



function dataType2rgb(dataType, active)
{
    switch (dataType)
    {
        case 'number': return active ? rgbActiveNumber : rgbNumber;
        case 'color':  return active ? rgbActiveColor  : rgbColor;
        case 'object': return active ? rgbActiveObject : rgbObject;
    }

    return 'magenta';
}



function dataFromNumber(num, dec = -1)
{
    return {
        type:    'number',
        value:    floorTo(num, dec),
        decimals: dec
    };
}



function dataFromDataColor(color)
{
    return {
        type: 'color',
        color: color
    };
}



function dataFromRectangle(x, y, width, height, angle, round)//, nodeId, opType)
{
    return {
        type: 'object',

        //nodeId: nodeId,
        //opType: opType,

        x:      x,
        y:      y,
        width:  width,
        height: height,
        angle:  angle,
        round:  round
        //color: color
    };
}



function isDataColorNaN(color)
{
    return isNaN(color[1])
        || isNaN(color[2])
        || isNaN(color[3]);
}