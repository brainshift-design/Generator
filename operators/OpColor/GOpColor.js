class   GOpColor
extends GOperator
{
    _type;

    _c1;
    _c2;
    _c3;

    _sampled1 = Number.NaN;
    _sampled2 = Number.NaN;
    _sampled3 = Number.NaN;


    constructor()
    {
        super('color', 'color');

        this.addInput (new GInput (this.dataType));
        this.setOutput(new GOutput(this.dataType));

        this.addParam(this._type = new GSelectParam('type', true, colorTypes));
        this.addParam(this._c1   = new GNumberParam('c1',   true, 0, 0, 255));
        this.addParam(this._c2   = new GNumberParam('c2',   true, 0, 0, 255));
        this.addParam(this._c3   = new GNumberParam('c3',   true, 0, 0, 255));
    }


    generate(callerInput)
    {
        if (this.valid) return;
        super.generate(callerInput);


        if (   isNaN(this._sampled1)
            || isNaN(this._sampled2)
            || isNaN(this._sampled3))
        {
            this._sampled1 = this._c1.value;
            this._sampled2 = this._c2.value;
            this._sampled3 = this._c3.value;
        }


        this.output._data = 
        {
            nodeId: this.id,
            opType: this.opType,

            type:   this._type,
            c1:     this._c1,
            c2:     this._c2,
            c3:     this._c3
        };
    }


    refresh()
    {
        super.refresh();
        
        this._sampled = Number.NaN;
    }
}