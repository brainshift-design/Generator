class UParameter
{
    #type;
    get type() { return this.#type; }
    
    #name;
    get name() { return this.#name; }

    _op;      get op()      { return this._op;      }
    _control; get control() { return this._control; }
    _div;     get div()     { return this._div;     }


    
    constructor(name, type)
    {
        this.#type = type;
        this.#name = name;


        this._div = document.createElement('div');

        this.div.style.position = 'relative';
        this.div.style.padding  = 0;
        this.div.style.width    = '100%';
    }



    isDefault() { return false; }


    
    save(nTab) {}
}