class   OpTextFile
extends ResizableBase
{
    file        = null;
    cachedValue = '';
 
    paramPath;




    constructor()
    {
        super(TEXT_FILE, 'file', 'file', iconTextFile, defNodeWidth, true);

        this.subscription      = true;
        this.canDisable        = true;
        this.iconOffsetY       = -1;
        this.alwaysLoadParams  = true;
        this.alwaysSaveParams  = true;
        this.showHeaderTooltip = true;
        this.alwaysShowIcon    = true;


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
                let path = 
                    file.path != '' 
                    ? file.path 
                    : file.name;

                const filePath = new TextValue(this.updateFilePath(path));


                this.file = file;

                this.update
                this.paramPath.setValue(filePath, false, true);
                this.updateCachedValue(true);
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
        this.updatePathParam();

        super.setRect(
            x, 
            y, 
            w, 
            Math.max(defHeaderHeight + defParamHeight, h), 
            updateTransform);
    }

    
    
    updateCachedValue(update)
    {
        if (this.file)
        {
            const reader = new FileReader();
            reader.readAsText(this.file,'UTF-8');

            reader.onload = e => 
            {
                this.cachedValue = e.target.result;

                if (update)
                    pushUpdate(null, [this]);
            };
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

        
        // if (this.node.cachedValue == '')
        //     this.node.updateCachedValue(true);


        request.push(TEXT_VALUE, encodeURIComponent(this.node.cachedValue));
        //request.push(...this.node.paramPath.genRequest(gen));

        
        gen.scope.pop();
        pushUnique(gen.passedNodes, this.node);

        return request;
    }



    updateValues(requestId, actionId, updateParamId, paramIds, values)
    {
        //const value = values[paramIds.findIndex(id => id == 'value')];

        //this.cachedValue = value.value;
        
        super.updateValues(requestId, actionId, updateParamId, paramIds, values);
        
        this.endProgress();
    }



    updateParams()
    {
        this.paramPath.enableControlText(false);

        this.updateParamControls();
        this.updatePathParam();
    }



    updatePathParam()
    {
        this.paramPath.div.style.width  = this.div.offsetWidth;
        this.paramPath.div.style.height = this.div.offsetHeight - Math.max(defHeaderHeight, this.header.offsetHeight);    
    }



    // invalidate()
    // {
    //     //this.cachedValue = '';

    //     super.invalidate();
    // }



    toJsonBase(nTab = 0) 
    {
        let   pos = ' '.repeat(nTab);
        const tab = HTAB;

        return super.toJsonBase(nTab)
             + ',\n' + pos + tab + '"path": "'        + encodeURIComponent(this.paramPath.value.toString()) + '"'
             + ',\n' + pos + tab + '"cachedValue": "' + encodeURIComponent(this.cachedValue               ) + '"';
    }



    loadParams(_node, pasting)
    {
        if (!pasting)
        {
            super.loadParams(_node, pasting);
            
            let path = decodeURIComponent(_node.path);

            path = this.updateFilePath(path);
            
            this.paramPath.setValue(new TextValue(path, false, true, false));
            this.cachedValue = decodeURIComponent(_node.cachedValue);
        }
        else
        {
            this.name        = this.defName;
            this.cachedValue = '';
        }
    }



    updateFilePath(path)
    {
        let copy = path;

        ['/', '\\', '_', '-']
            .forEach(c => copy = copy.replaceAll(c, c + '​'));

        return copy;
    }
}