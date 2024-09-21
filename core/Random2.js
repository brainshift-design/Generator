class Random2
{
    seed;
    cache;

    width;
    height;



    constructor(seed = 0)
    { 
        this.seed  = seed; 
        this.updateCache(256, 16);
    }



    copy()
    {
        return new Random(this.seed);
    }



    updateCache(width, height)
    {
        if (   width  <= this.width
            && height <= this.height)
            return;

        this.width  = width;
        this.height = height;
        
        const seeds = new Array(this.width);
        this.cache  = new Array(this.width);


        let seed = this.seed;

        for (let i = 0; i < this.width; i++)
        {
            seeds[i] = seed;
            seed = this.generate1(seed);
        }


        for (let i = 0; i < this.width; i++)
        {
            this.cache[i] = new Array(this.height);
            seed = seeds[i];

            for (let j = 0; j < this.height; j++)
            {
                this.cache[i][j] = seed;
                seed = this.generate2(seed);
            }
        }
    }



    get(x, y)
    {          
if (   x >= this.width 
              && y >= this.height) this.updateCache(nextPow2(x+1), nextPow2(y+1));
        else if (x >= this.width ) this.updateCache(nextPow2(x+1), this.height  );
        else if (y >= this.height) this.updateCache(this.width,    nextPow2(y+1));

        return this.cache[x][y] / -0x7fffffff;
    }



    generate1(seed)
    {
        seed = (seed + 0x7ed55d16) + (seed << 12);
        seed = (seed ^ 0xc761c23c) ^ (seed >> 19);
        seed = (seed + 0x165667b1) + (seed <<  5);
        seed = (seed + 0xd3a2646c) ^ (seed <<  9);
        seed = (seed + 0xfd7046c5) + (seed <<  3);
        seed = (seed ^ 0xb55a4f09) ^ (seed >> 16);

        return seed;
    }



    generate2(seed)
    {
        seed = (seed + 0x7f4a7c13) + (seed << 12);
        seed = (seed ^ 0xe17a1465) ^ (seed >> 19);
        seed = (seed + 0x59f89f1b) + (seed <<  5);
        seed = (seed + 0xac564b05) ^ (seed <<  9);
        seed = (seed + 0x65291958) + (seed <<  3);
        seed = (seed ^ 0x4ab1db4f) ^ (seed >> 16);
    
        return -seed;
    }
}