class Output
{
    #dataType;

    _op = null;
    get op() { return this._op; }

    _param = null;
    get param() { return this._param; }
    
    _data = {};

    control;
    
    connectedInputs = [];
    
    connecting      = false;
    
    get connected() { return this.connectedInputs.length > 0; }


    constructor(dataType)
    {
        this.#dataType = dataType;
        
        this.control = document.createElement('div');
        this.control.className = 'output';
        this.control.style.pointerEvents = 'auto';

        this.control.addEventListener('pointerenter', e => graphView.overOutput = this);
        this.control.addEventListener('pointerleave', e => graphView.overOutput = null);
    }
    

    get data() 
    {
        if (!this.op.valid)
            this.op.generate();

        return this._data;
    }
}