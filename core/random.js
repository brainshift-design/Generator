class Random
{
    seed;
    last;



    constructor(seed = 0, last = seed)//(seed = 0xb9ef7ca4, last = seed)
    { 
        this.seed = seed; 
        this.last = last;
    }



    copy()
    {
        return new Random(this.seed, this.last);
    }



    next()
    {
        this.last = this.seed;
        
        // this.seed = (this.seed + 0x7ed55d16) + (this.seed << 12);
        // this.seed = (this.seed ^ 0xc761c23c) ^ (this.seed >> 19);
        // this.seed = (this.seed + 0x165667b1) + (this.seed <<  5);
        // this.seed = (this.seed + 0xd3a2646c) ^ (this.seed <<  9);
        // this.seed = (this.seed + 0xfd7046c5) + (this.seed <<  3);
        // this.seed = (this.seed ^ 0xb55a4f09) ^ (this.seed >> 16);

        return this.seed++;// / -0x7fffffff;
    }

}