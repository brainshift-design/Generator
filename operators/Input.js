class Input
{
    _op;
    #dataType;
    
    control;
  
    connectedOutput = null;
    connection      = null;
    
    connecting      = false;
    

    get connected() { return this.connectedOutput != null; }


    constructor(dataType)
    {
        this.#dataType = dataType;

        this.control = document.createElement('div');
        this.control.className = 'input';

        this.control.addEventListener('pointerdown', e => e.preventDefault());

        this.control.addEventListener('pointerenter', e => this._op.graph.overInput = this);
        this.control.addEventListener('pointerleave', e => this._op.graph.overInput = null);
    }    
    

    get data()
    {
        return (
            this.connected
            ? this.connectedOutput.data
            : null);
    }
}