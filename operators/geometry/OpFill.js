class   OpFill
extends OpGeometryBase
{
    paramValue;


    
    constructor()
    {
        super(FILL, 'rect', 90);


        this.addInput(new Input(GEOMETRY_TYPES));
        this.addOutput(new Output(GEOMETRY_VALUE, this.output_genRequest));


        this.addParam(this.paramValue = new ColorParam('value', '', true, true, true));
    }
    
    
    
    output_genRequest(gen)
    {
        // 'this' is the output

        if (!isEmpty(this.cache))
            return this.cache;


        gen.scope.push({
            nodeId:  this.node.id, 
            paramId: '' });

        const [request, ignore] = this.node.genRequestStart(gen);
        if (ignore) return request;

        
        const input = this.node.inputs[0];

        // const paramIds = [];


        // if (input.connected)
        // {
        //     request.push(...pushInputOrParam(input, gen));


        //     for (const param of this.node.params)
        //         if (param.input && param.input.connected) 
        //             paramIds.push(param.id);

        //     request.push(paramIds.join(','));


        //     if (this.node.paramX     .input.connected) request.push(...this.node.paramX     .genRequest(gen));
        //     if (this.node.paramY     .input.connected) request.push(...this.node.paramY     .genRequest(gen));
        //     if (this.node.paramWidth .input.connected) request.push(...this.node.paramWidth .genRequest(gen));
        //     if (this.node.paramHeight.input.connected) request.push(...this.node.paramHeight.genRequest(gen));
        //     if (this.node.paramAngle .input.connected) request.push(...this.node.paramAngle .genRequest(gen));
        //     if (this.node.paramRound .input.connected) request.push(...this.node.paramRound .genRequest(gen));
        // }
        // else
        // {
        //     request.push(
        //         ...this.node.paramX     .genRequest(gen),
        //         ...this.node.paramY     .genRequest(gen),
        //         ...this.node.paramWidth .genRequest(gen),
        //         ...this.node.paramHeight.genRequest(gen),
        //         ...this.node.paramAngle .genRequest(gen),
        //         ...this.node.paramRound .genRequest(gen));
        // }


        gen.scope.pop();
        pushUnique(gen.passedNodes, this.node);

        return request;
    }



    updateValues(updateParamId, paramIds, values)
    {
        const rect = values[paramIds.findIndex(id => id == RECTANGLE_VALUE)];

        this.paramX     .setValue(rect.x,      false, true, false);
        this.paramY     .setValue(rect.y,      false, true, false);
        this.paramWidth .setValue(rect.width,  false, true, false);
        this.paramHeight.setValue(rect.height, false, true, false);
        this.paramAngle .setValue(rect.angle,  false, true, false);
        this.paramRound .setValue(rect.round,  false, true, false);

        super.updateValues(updateParamId, paramIds, values);
    }



    updateNode()
    {
        this.btnProportional.style.left = 45;
        this.btnProportional.style.top  = 79;

        super.updateNode();
    }



    updateRound()
    {
        const control = this.paramRound.control;
        const min     = Math.min(this.paramWidth.value, this.paramHeight.value);

        control.setMin(0);
        control.setMax(min/2);

        this.paramRound.control.update();
    }

    

    toJsonBase(nTab = 0) 
    {
        let   pos = ' '.repeat(nTab);
        const tab = TAB;

        let json = 
               super.toJsonBase(nTab)
             + ',\n' + pos + tab + '"proportional": "' + boolString(this.btnProportional.enabled) + '"';

        if (this.btnProportional.enabled)
        {
            json +=
                  ',\n' + pos + tab + '"refWidth": "'  + this.refWidth  + '"'
                + ',\n' + pos + tab + '"refHeight": "' + this.refHeight + '"';
        }

        return json;
    }



    loadParams(_node)
    {
        super.loadParams(_node);

        // if (_node.proportional)
        // {
            this.btnProportional.enabled = isTrue(_node.proportional);
            this.btnProportional.updateBackground(false);

            if (this.btnProportional.enabled)
            {
                this.refWidth  = parseFloat(_node.refWidth);
                this.refHeight = parseFloat(_node.refHeight);
            }
        //}
    }
}