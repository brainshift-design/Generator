class Input
{
    #dataType;

    _op = null;
    get op() { return this._op; }
    
    _param = null;
    get param() { return this._param; }

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
        this.control.style.pointerEvents = 'auto';

        this.control.addEventListener('pointerdown', e => e.preventDefault());

        this.control.addEventListener('pointerenter', () => graphView.overInput = this);
        this.control.addEventListener('pointerleave', () => graphView.overInput = null);
    }    
    

    get data()
    {
        return (
            this.connected
            ? this.connectedOutput.data
            : null);
    }
}