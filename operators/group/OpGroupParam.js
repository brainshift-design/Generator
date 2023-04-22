class   OpGroupParam
extends OperatorBase
{
    headerCircle;

    circleBack;
    circle;
    icon;

    paramType = 0; // 0 = param
                   // 1 = header
                   // 2 = variable header


    groupParam  = null;
    groupInput  = null;
    groupOutput = null;


    get groupNode() 
    { 
        return graph.currentPage.groupId != NULL
             ? nodeFromId(graph.currentPage.groupId)
             : null;
    }



    constructor()
    {
        super(GROUP_PARAM, 'param', 'parameter');

        this.alwaysLoadParams = true;


        this.addInput (new Input ([ANY_TYPE]));
        this.addOutput(new Output([ANY_TYPE], this.output_genRequest));


        this. inputs[0].addEventListener('connect',    e =>  input_onconnect   (this));
        this. inputs[0].addEventListener('disconnect', e =>  input_ondisconnect(this));

        this.outputs[0].addEventListener('connect',    e => output_onconnect   (this));
        this.outputs[0].addEventListener('disconnect', e => output_ondisconnect(this));


        this.circleBack        = createDiv('headerCircleBack');
        this.circle            = createDiv('headerCircle');

        this.headerCircle      = createDiv('headerCircleWrapper');
        this.headerCircle.over = false;
        this.headerCircle.down = false;


        this.headerCircle.addEventListener('pointerenter', e => 
        { 
            if (   this. inputs[0].connected
                || this.outputs[0].connected)
                return;

            this.headerCircle.over = true;  
            this.updateHeader(); 
        });


        this.headerCircle.addEventListener('pointerleave', e => 
        { 
            this.headerCircle.over = false; 
            this.updateHeader(); 
        });


        this.headerCircle.addEventListener('pointerdown',  e => 
        { 
            e.stopPropagation();
``
            if (e.button == 0)
            {
                hideAllMenus();

                if (   !this. inputs[0].connected
                    && !this.outputs[0].connected)
                {
                    let paramType = this.paramType + 1;
                    if (paramType == 2 /*3*/) paramType = 0;

                    actionManager.do(new ToggleParamHeaderAction(this.id, paramType));
                }
            }
            else
                e.preventDefault();
        });


        this.icon = createDiv('headerIcon');


        this.headerCircle.appendChild(this.circleBack);
        this.headerCircle.appendChild(this.circle);
        this.headerCircle.appendChild(this.icon);
        
        this.label.insertBefore(this.headerCircle, this.labelText);
    }



    output_genRequest(gen)
    {
        const request = [];


        if (   this.node.groupInput)
//            && this.node.groupInput.connected)
        {
            if (this.node.groupParam)
                return this.node.groupParam.genRequest(gen);
            else if (this.node.groupInput.connected)
                return this.node.groupInput.connectedOutput.genRequest(gen);
        }


        // 'this' is the output        

        gen.scope.push({
            nodeId:  this.node.id, 
            paramId: NULL });


        const [_request, ignore] = this.node.genRequestStart(gen);
        if (ignore) return _request;


        request.push(..._request);


        //console.assert(this.groupInput, 'missing group input');
        const input = this.node.groupInput;
            // this.groupInput
            // ? this.groupInput
            // : this.node.inputs[0];


        request.push(input && input.connected ? 1 : 0);

        if (input && input.connected) 
            request.push(...pushInputOrParam(input, gen));


        gen.scope.pop();
        pushUnique(gen.passedNodes, this.node);

        return request;
    }


    
    updateValues(requestId, actionId, updateParamId, paramIds, values)
    {
        super.updateValues(requestId, actionId, updateParamId, paramIds, values);

        if (   graphView.creatingNodes
            || graphView.pastingNodes
            || graphView.loadingNodes
            || graphView.restoringNodes)
            this.setName(this.name);
    }



    updateHeader()
    {
        super.updateHeader();


        if (true) //this.paramValue.value.isValid()
        {
            const colors = this.getHeaderColors();

            //const rgb        = rgbFromType(ANY_TYPE);//this.paramValue.value.toRgba();
            //const rgbaStripe = rgb_a(getStripeBackColor(rgb));
            
            this.circleBack.style.visibility = 'hidden';//'visible';
            //this.circle    .style.background = rgba2style(rgbaStripe);

            // this.headerCircle.style.boxShadow = 
            //     //     darkMode &&  isDark(rgbaStripe, 0.4)
            //     // || !darkMode && !isDark(rgbaStripe, 0.9)
            //     //? 
            //     '0 0 0 1px ' + rgba2style(rgb_a(colors.text, this.headerCircle.over ? 0.7 : 0.35)) +' inset'
                // : 'none';
        }
        else
        {
            this.circleBack  .style.visibility = 'hidden';
            this.circle      .style.background = 'transparent';
            this.headerCircle.style.boxShadow  = '0 0 0 1px var(--figma-color-bg-tertiary) inset';
        }


        this.updateHeaderIcon();
    }

    

    updateHeaderIcon()
    {
        const colors = this.getHeaderColors();

        const rgba       = rgb_a(rgbFromType(ANY_TYPE));
        const rgbaStripe = rgb_a(getStripeBackColor(rgba), rgba[3]);

        const headerStyle = rgba2style(
            rgb_a(
                rgbFromType(ANY_TYPE) //this.paramValue.value.isValid()
                ? (isDark(rgbaStripe) ? [1, 1, 1] : [0, 0, 0])
                : colors.text, 
                this.headerCircle.down 
                ? 1 
                : this.headerCircle.over
                  ? 0.7 
                  : 0.5));

        this.icon.style.display            = 'inline-block';
        this.icon.style.background         = this.paramType == 2
                                             ? 'url(\'data:image/svg+xml;utf8,<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M0 3C0 1.34314 1.34314 0 3 0H9C10.6569 0 12 1.34314 12 3V9C12 10.6569 10.6569 12 9 12H3C1.34314 12 0 10.6569 0 9V3ZM5 2.5H7V5H9.5V7H7V9.5H5V7H2.5V5H5V2.5Z" fill="'+headerStyle+'"/></svg>\')'
                                             : this.paramType == 1
                                               ? 'url(\'data:image/svg+xml;utf8,<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M0 3C0 1.34314 1.34314 0 3 0H9C10.6569 0 12 1.34314 12 3V9C12 10.6569 10.6569 12 9 12H3C1.34314 12 0 10.6569 0 9V3ZM6 8C7.10455 8 8 7.10461 8 6C8 4.89539 7.10455 4 6 4C4.89545 4 4 4.89539 4 6C4 7.10461 4.89545 8 6 8Z" fill="'+headerStyle+'"/></svg>\')'
                                               : 'url(\'data:image/svg+xml;utf8,<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 0H0V12H12V0ZM11 1H1V11H11V1Z" fill="'+headerStyle+'"/><path d="M8 6C8 7.10457 7.10457 8 6 8C4.89543 8 4 7.10457 4 6C4 4.89543 4.89543 4 6 4C7.10457 4 8 4.89543 8 6Z" fill="'+headerStyle+'"/></svg>\')';

        this.icon.style.backgroundPosition = '50% 50%';
        this.icon.style.backgroundRepeat   = 'no-repeat';
    }



    getHeaderColors(options = {})
    {
        const colors = super.getHeaderColors(options);


        if (this.inputs[0].connected)
        {
            if (   this.inputs[0].supportsTypes([COLOR_VALUE])
                || this.inputs[0].supportsTypes([ FILL_VALUE]))
                colors.input  =
                colors.output =
                colors.wire   = this.inputs[0].connectedOutput.wireColor;
            else
                colors.input  =
                colors.output =
                colors.wire   = rgbFromType(this.inputs[0].types[0], true);
        }
        else if (this.outputs[0].connected)
        {
            if (   this.outputs[0].supportsTypes([COLOR_VALUE])
                || this.outputs[0].supportsTypes([ FILL_VALUE]))
                colors.input  =
                colors.output =
                colors.wire   = this.outputs[0].connectedInputs[0].wireColor;
            else
                colors.input  =
                colors.output =
                colors.wire   = rgbFromType(this.outputs[0].types[0], true);
        }


        return colors;
    }



    setName(newName, options = {})
    {
        if (   this.paramType == 0
            && this.groupNode)
        {
            const param = this.groupNode.paramFromId(this.name);

            const paramNodes = graph.pageNodes.filter(n => 
                   n.type == GROUP_PARAM
                && n != this);

            newName = getNewNumberId(
                paramNodes, 
                name => paramNodes.find(n => n.name == name), 
                newName, 
                newName, 
                '');


            if (param)
            {
                param._id = newName;
                param.setName(newName);
            }

        
            const id      = makeNodePath(idFromNodePath(this.id));
            const groupId = makeNodePath(idFromNodePath(this.groupNode.id));


            uiSaveNodes([id]);
            uiSaveNodes([groupId]);
            
            uiUpdateSavedConnectionsToNodeId  ([id], true);
            uiUpdateSavedConnectionsFromNodeId([id], true);
            
            uiUpdateSavedConnectionsToNodeId  ([groupId], true);
            uiUpdateSavedConnectionsFromNodeId([groupId], true);


            nodeFromId(groupId).updateParams();
        }


        super.setName(newName, options);
    }



    setPosition(x, y, updateTransform = true)
    {
        super.setPosition(x, y, updateTransform);

        if (this.groupNode)
        {
            this.groupNode.updateNode();
            graphView.updateNodeWireTransforms([this.groupNode]);
        }
    }



    toJsonBase(nTab = 0) 
    {
        let   pos = ' '.repeat(nTab);
        const tab = HTAB;

        let  json = super.toJsonBase(nTab);

        json += ',\n' + pos + tab + '"paramType": "' +  this.paramType                                 + '"';

        return json;
    }



    loadParams(_node, pasting)
    {
        super.loadParams(_node, pasting);

        if (_node.paramType != undefined) 
            this.paramType = parseInt(_node.paramType);
    }
}



function input_onconnect(node)
{
    // if (   !node.inputs [0].connected
    //     && !node.outputs[0].connected)
        node.inputs[0].types = [...node.inputs[0].connectedOutput.types];
    
        
    node. inputs[0].types =
    node.outputs[0].types = [...node.inputs[0].connectedOutput.types];
    
    node.outputs[0].div.style.display = 'none';


    if (node.paramType == 0)
    {
        node.groupParam = createParamFromType(
            node.inputs[0].types[0], 
            {
                hasOutput: true,
                id:        node.name,
                name:      node.name,
                showName:  node.name[0] != '.'
            });

        node.groupParam.paramNode = node;

        node.groupOutput = node.groupParam.output;
        node.groupNode.addParam(node.groupParam);
    }
    else if (node.paramType == 1)
    {
        node.groupOutput = new Output([...node.inputs[0].types], node.groupNode.output_genRequest);
        node.groupNode.addOutput(node.groupOutput);
    }
    

    node.groupOutput.paramNode = node;
    node.groupNode.updateNode();
}



function input_ondisconnect(node)
{
    // if (!graph.pageNodes.find(n => 
    //            n.type      == GROUP_PARAM
    //         && n.paramType == 1
    //         && (   !isEmpty(n. inputs) && n. inputs[0].connected 
    //             || !isEmpty(n.outputs) && n.outputs[0].connected)))
    //     node.inputs[0].types = [ANY_TYPE];


    node.outputs[0].types = [ANY_TYPE];
    node. inputs[0].types = [ANY_TYPE];

    node.outputs[0].div.style.display = 'inline-block';


    if (node.groupOutput.connected)
        node.groupOutput.connectedInputs.forEach(i => uiDisconnect(i));


    if (node.paramType == 0)
    {
        node.groupNode.removeParam(node.groupParam);
        node.groupOutput.paramNode = null;
    }
    else if (node.paramType == 1)
    {
        node.groupNode.removeOutput(node.groupOutput);
        node.groupOutput.paramNode = null;
    }


    node.groupNode.updateNode();
}



function output_onconnect(node)
{
    // console.log('XXX =', node.outputs[0].connectedInputs[0]);
    // if (   !node.inputs [0].connected
    //     && !node.outputs[0].connected)
        node.outputs[0].types = [...node.outputs[0].connectedInputs[0].types];

    node.inputs[0].div.style.display = 'none';


    if (node.paramType == 0)
    {
        node.groupParam = createParamFromType(
            node.outputs[0].types[0], 
            {
                hasInput: true,
                id:       node.name,
                name:     node.name,
                showName: node.name[0] != '.'
            });

        node.groupParam.paramNode = node;

        node.groupInput = node.groupParam.input;
        node.groupNode.addParam(node.groupParam);
    }
    else if (node.paramType == 1)
    {
        node.groupInput = new Input([...node.outputs[0].types]);
        node.groupNode.addInput(node.groupInput);
    }
    
    
    node.groupInput.paramNode = node;
    node.groupNode.updateNode();
}



function output_ondisconnect(node)
{
    // if (!graph.pageNodes.find(n => 
    //            n.type      == GROUP_PARAM
    //         && n.paramType == 1
    //         && (   !isEmpty(n. inputs) && n. inputs[0].connected 
    //             || !isEmpty(n.outputs) && n.outputs[0].connected)))
    //     node.outputs[0].types = [ANY_TYPE];

    node.outputs[0].types = [ANY_TYPE];
    node. inputs[0].types = [ANY_TYPE];

    node.inputs[0].div.style.display = 'inline-block';

    
    if (node.groupInput.connected)
        uiDisconnect(node.groupInput);


    if (node.paramType == 0) 
    {
        node.groupParam.paramNode = null;

        node.groupNode.removeParam(node.groupParam);
        node.groupParam = null;
    }
    else if (node.paramType == 1) 
        node.groupNode.removeInput(node.groupInput);


    node.groupInput.types     = [ANY_TYPE];
    node.groupInput.paramNode = null;
    node.groupInput           = null;


    node.groupNode.updateNode();
}