class Random
{
    seed;
    index; // for next()

    cache;



    constructor(seed = 0)
    { 
        this.seed  = seed; 
        this.index = 0;
        
        this.updateCache(256);
    }



    copy()
    {
        return new Random(this.seed, this.last);
    }



    updateCache(size)
    {
        this.cache = new Int32Array(size);

        let seed = this.seed;
        let last = seed;

        for (let i = 0; i < size; i++)
            this.cache[i] = seed = this.generate(seed, last);
    }



    next()
    {
        if (this.index >= this.cache.length)
            this.updateCache(nextPow2(this.index));

        return this.cache[this.index++] / -0x7fffffff;
    }



    get(index)
    {
        if (index >= this.cache.length)
            this.updateCache(nextPow2(index+1));

        return this.cache[index] / -0x7fffffff;
    }



    generate(seed, last)
    {
        last = seed;
        
        seed = (seed + 0x7ed55d16) + (seed << 12);
        seed = (seed ^ 0xc761c23c) ^ (seed >> 19);
        seed = (seed + 0x165667b1) + (seed <<  5);
        seed = (seed + 0xd3a2646c) ^ (seed <<  9);
        seed = (seed + 0xfd7046c5) + (seed <<  3);
        seed = (seed ^ 0xb55a4f09) ^ (seed >> 16);

        return seed;
    }
}