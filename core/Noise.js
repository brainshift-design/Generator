const INTER_STEP   = 0,
      INTER_LINEAR = 1,
      INTER_COSINE = 2,
      INTER_CUBIC  = 3;



class NoiseSeed
{
    initial;
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
        this.current = (this.current + 0x7ed55d16) + (this.current << 12);
        this.current = (this.current ^ 0xc761c23c) ^ (this.current >> 19);
        this.current = (this.current + 0x165667b1) + (this.current <<  5);
        this.current = (this.current + 0xd3a2646c) ^ (this.current <<  9);
        this.current = (this.current + 0xfd7046c5) + (this.current <<  3);
        this.current = (this.current ^ 0xb55a4f09) ^ (this.current >> 16);
    }    
    


    next()
    {
        const seed = this.current;
        this.rotate();
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

	seed = new NoiseSeed();

	v0;
	v1;
	v2;
	v3;

	step = 0;


    constructor(seed = 0)
    {
        this.seed.set(seed);
        this.reset();
    }


    next(scale = 1)
    {
        //scale = Math.pow(Phi, scale) / Phi;
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

        switch (this.interpolation)
        {
            case INTER_STEP:
            {
                next = this.v1;
                break;
            }
            case INTER_LINEAR:
            {
                next = this.v1 + this.step * (this.v2 - this.v1);
                break;
            }
            case INTER_COSINE:
            {
                const ft = this.step * Math.PI;
                const f  = (1 - Math.cos(ft)) * 0.5;
                
                next = this.v1 + f * (this.v2 - this.v1);
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

                next = this.clip 
                    ? Math.max(0, Math.min(val, 1)) 
                    : val;

                break;
            }
        }

        this.step += 1 / scale;

        return next;
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
    return x / -0x7fffffff;
}