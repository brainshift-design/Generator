function genFindCorrection(nodeId, inputColor)//, max1, max2, max3)
{
    const color = inputColor
    const hcl   = rgb2hclokl(invalid2validRgb(dataColor2array(convert2rgb(color))));//dataColor2array(color);//dataColor2rgb(color);
    

    let closestHcl   = null;

    let closestOrder = -1,
        closest1     = -1,
        closest2     = -1,
        closest3     = -1;
        
    let step1        = 10,
        step2        = 10,
        step3        = 10;

    let progress     = 0,
        total        = 6 * step1 * step2 * step3;


    for (let order = 0; order < 6; order++)
    {
        const [max1, max2, max3] = getValidateMax(order);

        for (let m1 = 0; m1 < max1; m1 += max1/step1)
        {
            for (let m2 = 0; m2 < max2; m2 += max2/step2)
            {
                for (let m3 = 0; m3 < max3; m3 += max3/step3)
                {
                    const _color = adjustColor(color, order, m1, m2, m3);
                    const _hcl   = dataColor2array(_color);//rgb2hclokl(dataColor2rgb(_color));

                    if (   isValidRgb(dataColor2array(convert2rgb(_color)))
                        && (  !closestHcl
                            || rgbDistance(hcl, _hcl) < rgbDistance(hcl, closestHcl)))
                    {
                        closestHcl   = _hcl;
                        
                        closestOrder = order;
                        closest1     = m1;
                        closest2     = m2;
                        closest3     = m3;
                    }

                    progress++;
                }
            }

            genPostMessageToUi(
            {
                msg:      'uiUpdateFindCorrection',
                nodeId:   nodeId,
                progress: progress / total
            });
        }
    }


    genPostMessageToUi(
    {
        msg:         'uiEndFindCorrection',
        nodeId:       nodeId,
        success:      closestHcl != null,
        closestOrder: closestOrder,
        closest1:     closest1,
        closest2:     closest2,
        closest3:     closest3
    });
}