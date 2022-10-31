class Random
{
    seed;
    last;



    constructor(seed = 0xb9ef7ca4)
    { 
        this.seed = seed; 
        this.last = seed;
    }



    copy()
    {
        return new Random(this.seed);
    }



    next()
    {
        this.last = this.seed;
        
        this.seed = (this.seed + 0x7ed55d16) + (this.seed << 12);
        this.seed = (this.seed ^ 0xc761c23c) ^ (this.seed >> 19);
        this.seed = (this.seed + 0x165667b1) + (this.seed <<  5);
        this.seed = (this.seed + 0xd3a2646c) ^ (this.seed <<  9);
        this.seed = (this.seed + 0xfd7046c5) + (this.seed <<  3);
        this.seed = (this.seed ^ 0xb55a4f09) ^ (this.seed >> 16);

        return this.seed / -0x7fffffff;
    }

	/*	Using Thomas Wang's 64-bit int hashing algorithm to generate
		predictable pseudo-random values that work with clip regions.  */

	//#define HASH(x)	\
	//	(x) = (~(x)) + ((x) << 21); \
	//	(x) = (x) ^ ((x) >> 24); \
	//	(x) = ((x) + ((x) << 3)) + ((x) << 8); \
	//	(x) = (x) ^ ((x) >> 14); \
	//	(x) = ((x) + ((x) << 2)) + ((x) << 4); \
	//	(x) = (x) ^ ((x) >> 28); \
	//	(x) = (x) + ((x) << 31);
}