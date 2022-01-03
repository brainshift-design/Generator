class   GOpColor
extends GOperator
{
    _r;
    _g;
    _b;

    _rSampled = Number.NaN;
    _gSampled = Number.NaN;
    _bSampled = Number.NaN;


    constructor()
    {
        super('color', 'color');

        this.addInput (new GInput (this.dataType));
        this.setOutput(new GOutput(this.dataType));

        this.addParam(this._r = new GNumberParam('r', true, 0, 0, 255));
        this.addParam(this._g = new GNumberParam('g', true, 0, 0, 255));
        this.addParam(this._b = new GNumberParam('b', true, 0, 0, 255));
    }


    generate(callerInput)
    {
        if (this.valid) return;
        super.generate(callerInput);


        if (   isNaN(this._rSampled)
            || isNaN(this._gSampled)
            || isNaN(this._bSampled))
        {
            this._rSampled = this._r.value;
            this._gSampled = this._g.value;
            this._bSampled = this._b.value;
        }


        this.output._data = 
        {
            nodeId: this.id,
            opType: this.opType,

            r:      this._r,
            g:      this._g,
            b:      this._b
        };
    }


    refresh()
    {
        super.refresh();
        
        this._sampled = Number.NaN;
    }
}