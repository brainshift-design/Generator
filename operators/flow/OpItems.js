class   OpItems
extends ResizableBase
{
    scrollbar;
    scroll = 0;



    constructor()
    {
        super(ITEMS, 'items', 'items', iconItems);

        this.iconOffsetY = 1;


        this.addInput (new Input(LIST_VALUES));
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

        this.div.appendChild(this.scrollbar);


        this.scrollbar.addEventListener('pointerdown', e =>
        {
            if (e.button == 0)
            {
                e.stopPropagation();

                this.scrollbar.down = true;

                this.scrollbar.sy  = e.clientY;
                this.scrollbar.spy = this.scroll;

                this.scrollbar.setPointerCapture(e.pointerId);
            }
        });


        this.scrollbar.addEventListener('pointermove', e =>
        {
            if (this.scrollbar.down)
            {
                const max = 
                      this.measureData.paramOffset.height 
                    - this.measureData.innerOffset.height 
                    - 10;

                this.scroll = Math.min(Math.max(
                    0, 
                    this.scrollbar.spy + e.clientY - this.scrollbar.sy),
                    max);

                this.updateScrollbar();
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



    setSize(w, h, updateTransform = true)
    {
        super.setSize(
            w, 
            Math.min(h, defHeaderHeight + this.params.length * defParamHeight), 
            updateTransform);

        this.updateScrollbar();
    }



    setRect(x, y, w, h, updateTransform = true)
    {
        super.setRect(
            x, 
            y, 
            w, 
            Math.min(h, defHeaderHeight + this.params.length * defParamHeight), 
            updateTransform);

        this.updateScrollbar();
    }



    output_genRequest(gen)
    {
        // 'this' is the output        

    //     return this.node.genRequest(gen);
    // }



    // genRequest(gen)
    // {
        // 'this' is the node

        gen.scope.push({
            nodeId:  this.node.id, 
            paramId: NULL });


        const [request, ignore] = this.node.genRequestStart(gen);
        if (ignore) return request;


        const input = this.node.inputs[0];


        request.push(input.connected ? 1 : 0);

        if (input.connected) 
            request.push(...pushInputOrParam(input, gen));


        gen.scope.pop();
        pushUnique(gen.passedNodes, this);

        return request;
    }



    updateValues(requestId, actionId, updateParamId, paramIds, values)
    {
        //logFunction('OpItems.updateValues()');

        const oldParams = [...this.params];
        //console.log('oldParams =', [...oldParams]);

        const action = actionFromId(actionId);

        if (action)
            pushUnique(oldParams, action.oldOutputParams);

        // console.log('action =', action);

        const oldParamConns = this.getAllParamConnections();


        this.disconnectParamsNotInList(paramIds, true);
        this.removeParamsNotInList(paramIds);


        if (   paramIds.length > 1
            ||    paramIds.length == 1 
               && paramIds[0] != '')
        {
            for (let i = 0; i < values.length - 1; i++) 
            {
                const value   = values[i];
                const valueId = paramIds[i];
    
                if (  !value.isValid()
                    || valueId == 'value') 
                    continue;

                    
                const param = oldParams.find(p => 
                       p.id   == valueId
                    && p.type == value.type);

                    
                // if (   param
                //     && paramIds.includes(param.id))
                // {
                //     this.addParam(param, true);

                //     const _conn = oldParamConns.find(c =>
                //            c.outputNodeId == this.id
                //         && c.outputId     == param.id);

                //     if (_conn)
                //     {
                //         const inputNode = nodeFromId(_conn.inputNodeId);

                //         const conn = uiConnect(
                //             param.output, 
                //             inputNode.inputFromId(_conn.inputId));

                //         uiSaveConn(conn);
                //     }
                // }
                // else

                if (!param)
                    this.createAndAddParamByType(value.type, valueId, true, false, true, true);
            }
        }

        else if (paramIds.length <= 1)
            this.removeAllParams();
    
        
        super.updateValues(requestId, actionId, updateParamId, paramIds, values);


        const value = values[paramIds.findIndex(id => id == 'value')];

        if (LIST_VALUES.includes(value.type))
            this.outputs[0].types = [finalListTypeFromItems(value.items)];
    }



    updateParams()
    {
        for (const param of this.params)
            param.enableControlText(false);

        this.updateParamControls();
    }



    updateNode()
    {
        super.updateNode();

        this.updateScrollbar();
    }



    updateScrollbar()
    {
        const totalHeight = this.measureData.divOffset.height - defHeaderHeight;

        
        if (this.measureData.paramOffset.height <= totalHeight)
        {
            this.scrollbar.style.display = 'none';
        }
        else
        {
            this.scrollbar.style.display = 'block';
            
            this.scrollbar.style.left = this.measureData.divOffset.width - 20;
            this.scrollbar.style.top  = defHeaderHeight + 5 + this.scroll;

            this.scrollbar.style.height = 
                  (totalHeight - 10)
                *  totalHeight / this.measureData.paramOffset.height;

            this.paramHolder.style.top = -this.scroll;
        }
    }
}