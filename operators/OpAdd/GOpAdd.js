class   GOpAdd
extends GOperator
{
    _value;



    constructor()
    {
        super('add', 'number');

        this.addInput(new GInput(this.dataType));
        this.addInput(new GInput(this.dataType));
 
        this.setOutput(new GOutput(this.dataType));

        this.addParam(this._value = new GNumberParam('', false, false));
    }



    generate(callerInput)
    {
        if (this.valid) return;
        super.generate(callerInput);


        let add =
              this.inputs[0].value
            + this.inputs[1].value;

        this.output._data = 
        {
            nodeId: this.id,
            opType: this.opType,

            value:  add
        };
    }



    refresh()
    {
        super.refresh();
    }
}