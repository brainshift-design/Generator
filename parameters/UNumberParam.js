class   UNumberParam
extends UParameter
{
    defaultValue;
    
    
    get value()      { return this._control.value;    }
    set value(value) { this._control.setValue(value); }
    
    get oldValue()   { return this._control.oldValue; }

    
    setValue(value, fireChangeEvent = true, confirm = true) 
    { 
        this._control.setValue(value, fireChangeEvent, confirm); 
    }


    input; 

    

    get valueText() { return this.control.valueText; }
    set valueText(text) 
    {
        this.control.valueText = text;
        this.control.update();
    }


    
    constructor(name, 
                value     = 0, 
                min       = Number.MIN_SAFE_INTEGER, 
                max       = Number.MAX_SAFE_INTEGER,
                decimals  = 0,
                dragScale = 0.01)
    {
        super(name, 'number');

        this._control = document.createElement('div');
        this.control.param  = this;
        this.control.zIndex = 0;

        this.defaultValue = value;

        initSlider(
            this.control,
            100,       // width
            20,        // height
            this.name, 
            min,
            max,
            value,     // default
            dragScale, // drag scale
            1,         // wheel step
            decimals,  // decimals
            0,         // acceleration
            '');       // suffix

        this.div.appendChild(this.control);

        this.input = new UInput('number');
        this.input._param = this;
        this.input.control.style.float     = 'left';
        this.input.control.style.position  = 'absolute';
        this.input.control.style.top       = '50%';
        this.input.control.style.transform = 'translateY(-50%)';
        this.div.appendChild(this.input.control);



        this.control.addEventListener('change', e =>
        {
            this.op.valid = false;
            uiSetParam(this, this.value);
        });



        this.control.addEventListener('confirm', e =>
        {
            this.op.valid = false;
            actionManager.do(new SetValueAction(this, this.value));
        });



        this.input.addEventListener('connect', e =>
        {
            this.control.style.fontStyle = 'italic';
            this.control.inputConnected  = true;
        });


        
        this.input.addEventListener('disconnect', e =>
        {
            this.control.style.fontStyle = 'normal';
            this.control.inputConnected  = false;
        });
    }



    save(nTab)
    {
        let   pos = ' '.repeat(nTab);
        const tab = '  ';
        
        let save = 
              pos + '"param" :\n'
            + pos + '{\n';

        save +=         pos + tab + '"type" : "' + this.type + '"';
        save += ',\n' + pos + tab + '"name" : "' + this.name + '"';

        if (this.value != this.defaultValue)
            save += ',\n' + pos + tab + '"value" : "' + this.value + '"';
        
        save += '\n' + pos + '}';

        return save;
    }
}