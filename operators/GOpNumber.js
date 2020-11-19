class   GOpNumber
extends GOperator
{
    _value;

    _sampled = Number.NaN;


    constructor()
    {
        super('number', 'NUM');

        this.setOutput(new GOutput(this.dataType));

        this.addParam(this._value = new GNumberParam(''));
    }


    generate(callerInput)
    {
        if (this.valid) return;
        // if (   this._valid
        //     && (  !this._value.input.connected
        //         || this._value.input.connectedOutput.op.opType == 'random')) 
        //     return;

        super.generate(callerInput);
        console.log('generate number');
        console.log(this._sampled);


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