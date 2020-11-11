class Parameter
{
    #type;
    get type() { return this.#type; }
    
    _op;      get op()      { return this._op;      }
    _control; get control() { return this._control; }
    _div;     get div()     { return this._div;     }

    constructor(type)
    {
        this.#type = type;

        this._div = document.createElement('div');
        this.div.style.position = 'relative';
        this.div.style.padding  = 0;
        this.div.style.width    = '100%';
    }
}