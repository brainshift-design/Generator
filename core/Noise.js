const INTER_STEP   = 0,
      INTER_LINEAR = 1,
      INTER_COSINE = 2,
      INTER_CUBIC  = 3;


class NoiseSeed
{
    initial = 0;
    current;

    constructor()
    {
        this.reset();
    }

    set(seed)
    {
        this.initial = seed;
        this.current = seed;
    }

    rotate()
    {
        this.current ^= (this.current << 13);
        this.current  = (this.current >> 17);
        this.current ^= (this.current <<  5);
    }

    next()
    {
        const seed = this.current;
        rotate();
        return seed;
    }

    reset()
    {
        this.current = this.initial;
    }
};


class Noise
{
	interpolation = INTER_CUBIC;
	clip = false;

	seed;

	v0;
	v1;
	v2;
	v3;

	step = 0;


    constructor(seed = 0)
    {
        this.seed.set(seed);
        reset();
    }


    next(scale = 1)
    {
        // changing the scale linearly only has a visible "regular" effect when 
        // the values are relatively small, so I set the scale as a power of Phi
        scale = Math.pow(Phi, scale) / Phi;
        scale = Math.max(1, scale);

        var next = this.v1;

        if (this.step >= 1)
        {
            // get the next random value
        
            this.seed.rotate();

            this.v0 = this.v1;
        //------------------------
            this.v1 = this.v2;
            this.v2 = this.v3;
        //------------------------
            this.v3 = normalizeSeed(this.seed.current);

            this.step -= 1;
        }

        // get the next 'noise' value

        switch (interpolation)
        {
            case INTER_STEP:
            {
                this.next = this.v1;
                break;
            }
            case INTER_LINEAR:
            {
                this.next = this.v1 + this.step * (this.v2 - this.v1);
                break;
            }
            case INTER_COSINE:
            {
                const ft = this.step * Math.PI;
                const f  = (1 - Math.cos(ft)) * 0.5;
                
                this.next = this.v1 + f * (this.v2 - this.v1);
                
                break;
            }
            case INTER_CUBIC:
            {
                const p = (this.v3 - this.v2) - (this.v0 - this.v1);
                const q = (this.v0 - this.v1) - p;
                const r =  this.v2 - this.v0;
                const s =  this.v1;

                const val = 
                      p * cube(this.step) 
                    + q * sqr(this.step) 
                    + r * this.step 
                    + s;

                this.next = this.clip 
                    ? Math.max(0, Math.min(val, 1)) 
                    : val;

                break;
            }
        }

        this.step += 1 / scale;

        return this.next;
    }

   
    reset()
    {
        this.seed.reset();

        this.v0 = normalizeSeed(this.seed.current); this.seed.rotate();
        this.v1 = normalizeSeed(this.seed.current); this.seed.rotate();
        this.v2 = normalizeSeed(this.seed.current); this.seed.rotate();
        this.v3 = normalizeSeed(this.seed.current); this.seed.rotate();

        this.step = 0;
    }
}


function normalizeSeed(x)
{
    return (x & 0xFFFF) / 0xFFFF;
}