class   OpList
extends ResizableBase
{
    scrollbar;
    scroll = 0;



    constructor()
    {
        super(LIST, 'list', 'list', iconList);

        this.iconOffsetY = 1;


        this.addInput(new Input(LIST_VALUES));
        this.addOutput(new Output([LIST_VALUE], this.output_genRequest));

        this.alwaysLoadParams = true;
        this.alwaysSaveParams = true;


        this.createScrollbar();
    }



    createScrollbar()
    {
        this.scrollbar = createDiv('itemsScroll');

        this.scrollbar.down = false;
        this.scrollbar.sy   = Number.NaN;
        this.scrollbar.spy  = Number.NaN;
        this.scrollbar.style.height = 0;

        this.div.appendChild(this.scrollbar);



        this.scrollbar.addEventListener('pointerdown', e =>
        {
            if (e.button == 0)
            {
                e.stopPropagation();

                try
                {
                    this.scrollbar.setPointerCapture(e.pointerId);

                    this.scrollbar.down = true;

                    this.scrollbar.sy  =  e.clientY;
                    this.scrollbar.spy = -this.scroll;
                }
                catch {}
            }
        });



        this.scrollbar.addEventListener('pointermove', e =>
        {
            if (this.scrollbar.down)
            {
                const totalHeight = this.measureData.divOffset.height - defHeaderHeight;

                const scrollHeight = 
                          (totalHeight - 10)
                        *  totalHeight / this.measureData.paramOffset.height;
        
                const max = 
                      this.measureData.innerOffset.height
                    - scrollHeight
                    - defHeaderHeight;

                this.scroll = -Math.min(Math.max(
                    0, 
                    this.scrollbar.spy + (e.clientY - this.scrollbar.sy)),
                    max);

                    
                this.updateScrollbar();


                const wires = [];

                for (const output of this.outputs.filter(o => o.param))
                {
                    for (const input of output.connectedInputs)
                        wires.push(input.connection.wire);
                }

                graphView.updateWires(wires);
            }
        });



        this.scrollbar.addEventListener('pointerup', e =>
        {
            if (e.button == 0)
            {
                e.stopPropagation();

                this.scrollbar.down = false;
                this.scrollbar.releasePointerCapture(e.pointerId);
            }
        });
    }



    // setSize(w, h, updateTransform = true)
    // {
    //     super.setSize(
    //         w, 
    //         Math.min(h, defHeaderHeight + this.params.length * defParamHeight), 
    //         updateTransform);

    //     this.updateScrollbar();
    //     this.updateNode();
    // }



    setRect(x, y, w, h, updateTransform = true)
    {
        super.setRect(
            x, 
            y, 
            Math.max(defNodeWidth, w), 
            Math.min(
                Math.max(defHeaderHeight, defHeaderHeight + this.params.length * defParamHeight),
                Math.max(h, defHeaderHeight)),
            updateTransform);


        this.updateScrollbar();
        this.updateNode();
    }



    isOrPrecededByUncached()
    {
        // if (this.nodeId == 'list')
        //     console.log('this.outputs[0].isLooped() =', this.outputs[0].isLooped());

        return this.outputs[0].isLooped();
    }



    isOrPrecededByMultiplier()
    {
        return false;
    }



    output_genRequest(gen)
    {
        // 'this' is the output        

        gen.scope.push({
            nodeId:  this.id, 
            paramId: NULL });


        const [request, ignore] = this.node.genRequestStart(gen);
        if (ignore) return request;


        const input = this.node.inputs[0];


        request.push(input.connected ? 1 : 0);

        if (input.connected) 
            request.push(...pushInputOrParam(input, gen));


        gen.scope.pop();
        pushUnique(gen.passedNodes, this.node);

        return request;
    }



    updateValues(requestId, actionId, updateParamId, paramIds, values)
    {
        const oldParams = [...this.params];

        
        const action = actionFromId(actionId);

        if (action)
            pushUnique(oldParams, action.oldOutputParams);


        this.disconnectParamsNotInList(paramIds, true);
        this.removeParamsNotInList(paramIds);


        if (   paramIds.length > 1
            ||    paramIds.length == 1 
               && paramIds[0] != '')
        {
            for (let i = 0; i < values.length; i++)
            {
                const value   = values[i];
                const valueId = paramIds[i];

                if (   valueId == '-type-')
                    continue;

                    
                let param = oldParams.find(p => 
                       p.id == valueId 
                    && p.node
                    && p.node.nodeId == this.nodeId);

                if (   param
                    && param.type != value.type)
                {
                    this.removeParam(param);
                    param = null;
                }

                if (   !param
                    || !this.params.find(p => p.id == param.id))
                {
                    if (!param)
                        this.createAndInsertParamByType(i, value.type, valueId, true, false, true, true);
                    else if (!this.params.find(p => p.id == param.id))
                        this.insertParam(i, param, true);
                }
            }
        }

        else if (paramIds.length <= 1)
            this.removeAllParams();
    
        
        const type = values[paramIds.findIndex(id => id == '-type-')];

        if (type)
            this.headerOutputs[0].types = [type.value];


        super.updateValues(requestId, actionId, updateParamId, paramIds, values);


        this.setHeight(defHeaderHeight + this.params.length * defParamHeight, false);


        for (const param of this.params)
            param.divider = Math.min(120 / this.measureData.divOffset.width, 0.25);


        this.updateMeasureData();
        this.updateScrollbar();
    }



    updateParams()
    {
        for (const param of this.params)
            param.enableControlText(false, this.isUnknown() && this.headerOutputs[0].isLooped());

        this.updateParamControls();
    }



    getHeaderColors(options = {})
    {
        const colors = super.getHeaderColors(options);
        const type   = this.outputs[0].types[0];

        colors.text   = isDark(colors.back) ? [1, 1, 1, 1] : [0, 0, 0, 1]; 

        const gray =
                this.active
            && !this.inputs[0].connected;

        colors.input  = gray ? rgb_a(colors.text, 0.4)  : rgb_a(rgbSaturateHsv(rgbFromType(type, !this.active), 0.5), 0.8);
        colors.output = gray ? rgb_a(colors.text, 0.35) : rgb_a(rgbSaturateHsv(rgbFromType(type, !this.active), 0.5), 0.7);
        colors.wire   = gray ? rgbFromType(ANY_VALUE, true) : rgbFromType(type, true);

        return colors;
    }



    updateScrollbar()
    {
        const totalHeight = this.measureData.divOffset.height - defHeaderHeight;

        
        if (   isEmpty(this.params)
            || this.measureData.paramOffset.height <= totalHeight)
        {
            this.scrollbar.style.display = 'none';
        }
        else
        {
            this.scrollbar.style.display = 'block';
            
            this.scrollbar.style.left = this.measureData.divOffset.width - 20;
            this.scrollbar.style.top  = defHeaderHeight + 5 - this.scroll;

            this.scrollbar.style.height = Math.max(0,
                  (totalHeight - 10)
                *  totalHeight / this.measureData.paramOffset.height
                - 10);

            this.paramHolder.style.top = this.scroll;
        }
    }
}