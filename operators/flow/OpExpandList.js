class   OpExpandList
extends ResizableBase
{
    scrollbar;
    scroll          = 0;

    oldScroll       = null;
    listScrollTimer = null;

    divider;
    separator;



    constructor()
    {
        super(EXPAND, 'items', 'items', iconExpand);

        this. inputValueType = LIST_VALUE;
        this.outputValueType = LIST_VALUE;
        this.iconOffsetY     = 2;


        this.addInput(new Input(LIST_VALUES));
        this.addOutput(new Output([LIST_VALUE], this.output_genRequest));

        this.alwaysLoadParams = true;
        this.alwaysSaveParams = true;


        this.adjustSizerEvents(this.sizerL);
        this.adjustSizerEvents(this.sizerR);
        this.adjustSizerEvents(this.sizerB);

        this.adjustSizerEvents(this.sizerBL);
        this.adjustSizerEvents(this.sizerBR);


        this.divider = 0.25;

        this.createSeparator();
        this.createScrollbar();


        this.div.addEventListener('wheel', e =>
        {
            if (   getCtrlKey(e)
                || panMode
                || graphView.wheelTimer)
                return;

            e.stopPropagation();

            let dWheelY = e.deltaY;

            if (!isTouchpad(e))
                dWheelY /= 10;


            if (!this.oldScroll)
                this.oldScroll = this.scroll;

            this.updateScroll(-this.scroll + dWheelY);

            if (this.listScrollTimer)
                clearTimeout(this.listScrollTimer);

            this.listScrollTimer = setTimeout(() =>
            {
                actionManager.do(new ScrollListNodeAction(
                    this.id, 
                    this.oldScroll,
                    this.scroll));

                this.listScrollTimer = null;
                this.oldScroll       = null;
            },
            300);
        });
    }



    adjustSizerEvents(sizer)
    {
        sizer.addEventListener('dblclick', e =>
        {
            if (e.button == 0)
            {
                e.stopPropagation();

                this.resizedY = false;
                this.setRectB(this.sizerB, 0, 0);
            }
        });
    }



    createSeparator()
    {
        this.separator = createDiv('itemsSeparator');

        this.separator.down         = false;
        this.separator.sy           = Number.NaN;
        this.separator.spy          = Number.NaN;
        this.separator.style.top    = defHeaderHeight + 'px';
        this.separator.style.height = 'calc(100% - ' + defHeaderHeight + 'px)';

        this.div.appendChild(this.separator);



        this.separator.addEventListener('pointerdown', e =>
        {
            if (e.button == 0)
            {
                e.stopPropagation();

                try
                {
                    this.separator.setPointerCapture(e.pointerId);

                    this.separator.down = true;

                    this.separator.sx  = e.clientX;
                    this.separator.spx = this.divider;
                }
                catch {}
            }
        });



        this.separator.addEventListener('pointermove', e =>
        {
            if (this.separator.down)
            {
                this.divider = 
                      this.separator.spx 
                    +   (e.clientX - this.separator.sx) 
                      / this.measureData.divOffset.width;

                this.divider = Math.min(Math.max(0.1, this.divider), 0.5);

                for (const param of this.params)
                    param.divider = this.divider;

                this.separator.style.left = (this.divider * this.measureData.divOffset.width) + 'px';

                this.updateParamControls();
            }
        });



        this.separator.addEventListener('pointerup', e =>
        {
            if (e.button == 0)
            {
                e.stopPropagation();

                this.separator.down = false;
                this.separator.releasePointerCapture(e.pointerId);

                actionManager.do(new SetListDividerAction(
                    this.id, 
                    this.separator.spx,
                    this.scroll));
            }
        });
    }



    createScrollbar()
    {
        this.scrollbar = createDiv('itemsScroll');

        this.scrollbar.down         = false;
        this.scrollbar.sy           = Number.NaN;
        this.scrollbar.spy          = Number.NaN;
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
                const dy = 
                      this.scrollbar.spy 
                    +   (e.clientY - this.scrollbar.sy) 
                      * this.measureData.paramOffset.height 
                      / (this.measureData.divOffset.height - defHeaderHeight);

                this.updateScroll(dy);
            }
        });



        this.scrollbar.addEventListener('pointerup', e =>
        {
            if (e.button == 0)
            {
                e.stopPropagation();

                this.scrollbar.down = false;
                this.scrollbar.releasePointerCapture(e.pointerId);

                actionManager.do(new ScrollListNodeAction(
                     this.id, 
                    -this.scrollbar.spy,
                     this.scroll));
            }
        });
    }



    updateNode()
    {
        super.updateNode();

        this.separator.style.left = (this.divider * this.measureData.divOffset.width) + 'px';
    }



    updateScroll(dy)
    {
        const maxScroll = 
              this.params.length * defParamHeight 
            - (this.measureData.divOffset.height - defHeaderHeight);

        this.scroll = -Math.min(Math.max(0, dy), maxScroll);

        this.updateScrollbar();


        const wires = [];

        for (const output of this.outputs.filter(o => o.param))
        {
            for (const input of output.connectedInputs)
                wires.push(input.connection.wire);
        }

        graphView.updateWires(wires);
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
            this.scrollbar.style.left = this.measureData.divOffset.width - 20;

            let scrollbarHeight = sqr(totalHeight) / this.measureData.paramOffset.height - 10;

            const scrollbarTop =
                  defHeaderHeight + 5
                -   this.scroll
                  / this.measureData.paramOffset.height
                  * (totalHeight - 5 + Math.min(0, scrollbarHeight - 10));

            scrollbarHeight = Math.max(10, scrollbarHeight);

            this.scrollbar.style.top    = scrollbarTop;
            this.scrollbar.style.height = scrollbarHeight;

            this.scrollbar.style.display = 'block';

            this.paramHolder.style.top = this.scroll;
        }
    }



    setRect(x, y, w, h, updateTransform = true)
    {
        w = Math.max(defNodeWidth,    w);
        h = Math.max(defHeaderHeight, h);

        h = 
                h == defHeaderHeight
            && !this.resizedY
            ? Math.max(defHeaderHeight, defHeaderHeight + this.params.length * defParamHeight)
            : Math.min(h, Math.max(defHeaderHeight, defHeaderHeight + this.params.length * defParamHeight));

        super.setRect(x, y, w, h, updateTransform);

        const maxScroll = 
              this.params.length * defParamHeight 
            - (this.measureData.divOffset.height - defHeaderHeight);

        if (this.scroll < -maxScroll)
            this.scroll = Math.min(-maxScroll, 0);
            
        this.updateBorder();

        if (this.measureData.paramOffset.height == 0)
            setTimeout(() => this.updateScrollbar());
        else
            this.updateScrollbar();


        this.separator.style.left = (this.divider * w) + 'px';
    }



    isOrPrecededByUncached()
    {
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


        if (   (   paramIds.length > 1
                ||    paramIds.length == 1 
                   && paramIds[0] != '')
            && !this.hasConditionOutputs())
        {
            let paramIndex = 0;
            
            for (let i = 0; i < values.length; i++)
            {
                const value   = values[i];
                const valueId = paramIds[i];

                if (valueId == '-type-')
                    continue;

                let oldParam = oldParams.find(p =>
                       p.id == valueId 
                    && p.node
                    && p.node.nodeId == this.nodeId);

                if (   oldParam
                    && oldParam.type != value.type)
                {
                    this.removeParam(oldParam);
                    oldParam = null;
                }


                const found = this.params.find(p => 
                       oldParam 
                    && p.id == oldParam.id);
                
                if (   !oldParam
                    || !found)
                {
                    if (!oldParam)
                    {
                        this.createAndInsertParamByValue(i, value, valueId, true, false, true, true);
                        paramIndex++;
                    }
                    else if (!found)
                    {
                        this.insertParam(i, oldParam, true);
                        paramIndex++;
                    }
                }
                else if (oldParam
                      && found)
                {
                    this.setParamIndex(found, paramIndex);
                    paramIndex++;
                }
            }
        }

        else if (paramIds.length <= 1)
            this.removeAllParams();
    
        
        const type = values[paramIds.findIndex(id => id == '-type-')];

        if (type)
            this.headerOutputs[0].types = [type.value];


        super.updateValues(requestId, actionId, updateParamId, paramIds, values);


        if (   this.params.length < oldParams.length
            && this.scroll < 0)
            this.scroll = Math.min(0, this.scroll + (oldParams.length - this.params.length) * defParamHeight);


        if (this.measureData.divOffset.height - defHeaderHeight == oldParams.length * defParamHeight)
            this.setHeight(defHeaderHeight + this.params.length * defParamHeight, false);


        for (const param of this.params)
            param.divider = this.divider;


        this.updateMeasureData();
        this.updateScrollbar();
    }



    updateParams()
    {
        for (const param of this.params)
        {
            const unknown = 
                   this.isUnknown() 
                && this.headerOutputs[0].isLooped();


            if (   param.type == NUMBER_VALUE
                && param.isBoolean)
            {
                param.enableControlText(false);
                updateParamConditionText(param, param.isUnknown(), true, 1);
            }
            else
                param.enableControlText(false, unknown);
    
                
            param.isNodeValue = true;
        }


        this.updateParamControls();
    }



    setParamIndex(param, index)
    {
        moveInArray(this.params, this.params.indexOf(param), index);
        this.paramHolder.insertBefore(param.div, this.paramHolder.children[index]);

        // if (param. input) moveInArray(this. inputs, this. inputs.indexOf(param. input), index);
        if (param.output) moveInArray(this.outputs, this.outputs.indexOf(param.output), index + 1);
    }



    getHeaderColors(options = {})
    {
        const colors = super.getHeaderColors(options);

        colors.text = isDark(colors.back) ? [1, 1, 1, 1] : [0, 0, 0, 1]; 

        return colors;
    }



    toJsonBase(nTab = 0) 
    {
        let   pos = ' '.repeat(nTab);
        const tab = HTAB;

        return super.toJsonBase(nTab)
             + ',\n' + pos + tab + '"divider": "' + this.divider + '"'
             + ',\n' + pos + tab + '"scroll": "' + this.scroll + '"';
    }



    loadParams(_node, pasting)
    {
        super.loadParams(_node, pasting);

        if (_node.divider) this.divider = parseFloat(_node.divider); else this.divider = 0.25;
        if (_node.scroll ) this.scroll  = parseInt  (_node.scroll );
    }
}