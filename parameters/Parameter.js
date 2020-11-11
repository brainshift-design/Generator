class Parameter
{
    #type;
    get type() { return this.#type; }
    
    _op;      get op()      { return this._op;      }
    _control; get control() { return this._control; }
    _div;     get div()     { return this._div;     }
    //_divIO;   get divIO()   { return this._divIO;   }

    constructor(type)
    {
        this.#type = type;

        this._div = document.createElement('div');
        this.div.style.position = 'relative';
        this.div.style.padding  = 0;
        this.div.style.width    = '100%';

        // this._divIO = document.createElement('div');
        // this.divIO.style.position      = 'absolute';
        // this.divIO.style.width         = '100%';
        // this.divIO.style.height        = '100vh';
        // this.divIO.style.padding       = 0;
        // this.divIO.style.margin        = 0;
        // this.divIO.style.pointerEvents = 'none';
        // this.divIO.zIndex              = 10;

        //this.div.appendChild(this.divIO);
    }
}