class   GOpNumber
extends GOperator
{
    _value;

    _sampled = Number.NaN;


    
    constructor()
    {
        super('number', 'number');

        this.setOutput(new GOutput(this.dataType));

        this.addParam(this._value = new GNumberParam('', true, false));
    }



    generate(callerInput)
    {
        if (this.valid) return;
        super.generate(callerInput);


        if (isNaN(this._sampled))
            this._sampled = this._value.value;

        this.output._data = 
        {
            nodeId: this.id,
            opType: this.opType,

            value:  this._sampled
        };
    }



    refresh()
    {
        super.refresh();
        
        this._sampled = Number.NaN;
    }
}