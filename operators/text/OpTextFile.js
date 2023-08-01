class   OpTextFile
extends ResizableBase
{
    file = null;
 
    paramPath;

    cachedValue = '';



    constructor()
    {
        super(TEXT_FILE, 'file', 'file', iconTextFile, defNodeWidth, true);

        this.canDisable       = true;
        this.iconOffsetY      = -1;

        this.alwaysLoadParams = true;
        this.alwaysSaveParams = true;


        this.addOutput(new Output([TEXT_VALUE], this.output_genRequest));

        this.addParam(this.paramPath = new TextParam('path', 'path', false, false, true));

        setControlFont(this.paramPath.controls[0].textbox, 'Roboto Mono', 10, 'center');

        this.paramPath.controls[0].textbox.defPlaceholder = 'path';


        this.divIcon.style.opacity       = 0.5;
        this.divIcon.style.pointerEvents = 'all';


        this.divIcon.addEventListener('pointerenter', e => 
        { 
            this.divIcon.style.opacity = 1;  
        });


        this.divIcon.addEventListener('pointerleave', e => 
        { 
            this.divIcon.style.opacity = 0.5;  
        });


        this.divIcon.addEventListener('pointerdown',  e => 
        { 
            this.divIcon.style.opacity = 0.5;  
            e.stopPropagation();


            getLocalFile(file => 
            {
                this.file = file;
                this.paramPath.setValue(new TextValue(file.path), false, true);
                this.updateCachedValue();
            });
            

            setTimeout(() => 
            {
                this.divIcon.style.opacity = 1;  
                this.updateHeader(); 
            },
            200);
        });
    }



    setRect(x, y, w, h, updateTransform = true)
    {
        const headerHeight = boundingRect(this.header).height / graph.currentPage.zoom;

        const height = headerHeight + defParamHeight;

        super.setRect(
            x, 
            y, 
            w, 
            height, 
            updateTransform);
    }

    
    
    updateCachedValue()
    {
        if (this.file)
        {
            const reader = new FileReader();
            reader.readAsText(this.file,'UTF-8');

            reader.onload = e => this.cachedValue = e.target.result;
        }
    }



    output_genRequest(gen)
    {
        // 'this' is the output

        gen.scope.push({
            nodeId:  this.node.id, 
            paramId: NULL });

        const [request, ignore] = this.node.genRequestStart(gen);
        if (ignore) return request;

        
        if (this.node.cachedValue == '')
            this.node.updateCachedValue();


        request.push(TEXT_VALUE, encodeURIComponent(this.node.cachedValue));

        
        gen.scope.pop();
        pushUnique(gen.passedNodes, this.node);

        return request;
    }



    updateValues(requestId, actionId, updateParamId, paramIds, values)
    {
        //const value = values[paramIds.findIndex(id => id == 'value')];

        //this.cachedValue = value.value;
        
        super.updateValues(requestId, actionId, updateParamId, paramIds, values);
        
        this.endNodeProgress();
    }



    // updateParams()
    // {
    //     this.paramPath.enableControlText(false);

    //     this.updateParamControls();
    // }



    invalidate()
    {
        this.cachedValue = '';

        super.invalidate();
    }
}