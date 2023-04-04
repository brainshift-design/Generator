class GColorBlend
extends GColorType
{
    input0 = null;
    input1 = null;

    mode;
    opacity;
    gamma;


    constructor(nodeId, options)
    {
        super(COLOR_BLEND, nodeId, options);
    }


    
    copy()
    {
        const copy = new GColorBlend(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.input0) copy.input0 = this.input0.copy();
        if (this.input1) copy.input1 = this.input1.copy();

        copy.mode    = this.mode   .copy();
        copy.opacity = this.opacity.copy();
        copy.gamma   = this.gamma  .copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        const mode    = (await this.mode   .eval(parse)).toValue().toInteger();
        const opacity = (await this.opacity.eval(parse)).toValue();
        const gamma   = (await this.gamma  .eval(parse)).toValue();


        if (   this.input0 
            && this.input1)
        {
            const input0 = (await this.input0.eval(parse)).toValue();
            const input1 = (await this.input1.eval(parse)).toValue();

            console.assert(
                opacity.type == NUMBER_VALUE, 
                'this.result.type must be NUMBER_VALUE');

            const opacity = opacity.value / 100;


            const modeIndex  = Math.min(Math.max(0, mode.value), BlendModes.length-1);
            const gammaValue = Math.max(0.0001, gamma.value);

            const _space = colorSpace(modeIndex);

            const _color = this.blend(
                modeIndex,
                convertDataColorToSpace(input0.toDataColor(), _space),
                convertDataColorToSpace(input1.toDataColor(), _space),
                opacity,
                gammaValue);


            // allow interpolating invalid colors,
            // so no valid color check here

            this.value = ColorValue.fromDataColor(_color, modeIndex);
        }

        else if (this.input0) 
            this.value = (await this.input0.eval(parse)).toValue();

        else if (this.input1) 
            this.value = (await this.input1.eval(parse)).toValue();
            
        else 
            this.value = ColorValue.NaN;


        genPushUpdateValue(parse, this.nodeId, 'value',   this.value);
        genPushUpdateValue(parse, this.nodeId, 'mode',    mode );
        genPushUpdateValue(parse, this.nodeId, 'opacity', opacity);
        genPushUpdateValue(parse, this.nodeId, 'gamma',   gamma );


        this.validate();
        
        return this;
    }



    blend(mode, col0, col1, opacity, gamma)
    {
        mode = 1;
        
        if (   mode <= 1
            || mode >  6) // hex, rgb, okLab, lab, luv
        {
            const r0 = Math.pow(col0[1], gamma);  const r1 = Math.pow(col1[1], gamma);
            const g0 = Math.pow(col0[2], gamma);  const g1 = Math.pow(col1[2], gamma);
            const b0 = Math.pow(col0[3], gamma);  const b1 = Math.pow(col1[3], gamma);

            gamma = Math.max(0.01, gamma);

            return [
                colorSpace(mode),
                Math.pow(lerp(r0, r1, opacity), 1/gamma),
                Math.pow(lerp(g0, g1, opacity), 1/gamma),
                Math.pow(lerp(b0, b1, opacity), 1/gamma) ];
        }
        else // hsv/hsl/hcl
        {
            const h0 = col0[1] * Tau;  const h1 = col1[1] * Tau;
            const c0 = col0[2];        const c1 = col1[2];
            const l0 = col0[3];        const l1 = col1[3];

            return [
                colorSpace(mode),
                normalAngle(h0 + angleDiff(h0, h1) * opacity) / Tau,
                lerp(c0, c1, opacity),
                lerp(l0, l1, opacity) ];
        }
    }
}
