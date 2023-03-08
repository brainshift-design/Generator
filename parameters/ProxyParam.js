class   ProxyParam
extends Parameter
{
    refParam;

    controls = [];


    constructor(param)
    {
        super(param.type, param.node.id + '_' + param.id);

        this.refParam = param;

        this.div.style.boxShadow = '0 0 0 1px green inset';

        switch (param.type)
        {
            case NUMBER_VALUE: 
            {
                this.controls = [param.control.copy()];
                this.div.appendChild(this.controls[0]);
                break;
            }
        }

    }



    updateControls()
    {

    }
}