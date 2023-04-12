class GraphPage
{
    id;
    name;


    button;

    btnIcon;
    btnName;
    btnClose;



    _pan = point(0, 0);
        
    get pan() { return this._pan; }
    set pan(pan)
    {
        if (this._pan == pan) return;

        this._pan = pan;
        
        uiSavePages(
            [this.id],
            [this.toJson()]);//uiSaveGraphView();

        graphView.updatePanAndZoom(true);
    }
    

    _zoom = 1;
    
    get zoom() { return this._zoom; }
    set zoom(zoom)
    {
        if (this._zoom == zoom) return;

        let pos = point(
            window.innerWidth /2,
            window.innerHeight/2);

        pos.y -= getTopHeight();

        const _pan = subv(this.pan, mulvs(subv(pos, this.pan), zoom / this.zoom - 1));

        this.setPanAndZoom(_pan, zoom);
    }


    setPanAndZoom(pan, zoom)
    {
        if (  (   pan  != this._pan
               || zoom != this._zoom)
            && zoom >= 0.02
            && zoom <= 50)
        {
            graphView.oldZoom = this.zoom;
    
            this._zoom = zoom;
            this._pan  = pan;
    
            
            uiSavePages(
                [this.id],
                [this.toJson()]);//uiSaveGraphView();
       
    
            graphView.panZoomTimer = setTimeout(() => 
            {
                graphView.updatePanAndZoom(this.zoom != graphView.oldZoom);
                graphView.panZoomTimer = null;
            });
        }
    };
    
    
    
    constructor(id, name)
    {
        this.id       = id;
        this.name     = name;

        this.button   = createDiv('page');

        this.btnIcon  = createDiv('pageIcon');
        this.btnName  = createDiv('pageName');
        this.btnClose = createDiv('pageClose');


        this.button  .appendChild(this.btnIcon);
        this.button  .appendChild(this.btnName);
        this.button  .appendChild(this.btnClose);



        this.button.addEventListener('pointerenter', e => 
        { 
            graph.overIndex = graph.pages.indexOf(this); 
            graph.updatePages(); 
        });
        
        
        this.button.addEventListener('pointerleave', e => 
        { 
            graph.overIndex = -1;
            graph.updatePages(); 
        });
        
        
        this.button.addEventListener('pointerdown' , e => 
        { 
            graph.pageIndex = graph.pages.indexOf(this); 
            graph.updatePages(); 
        });



        this.btnClose.addEventListener('pointerenter', e => 
        { 
            this.btnClose.style.opacity = 1;    
        });
        
        
        this.btnClose.addEventListener('pointerleave', e => 
        { 
            this.btnClose.style.opacity = 0.65; 
        });
        
        
        this.btnClose.addEventListener('pointerup', e => 
        { 
            /*nothing for now, TODO*/ 
            graph.updatePages(); 
        });
    }



    update()
    {
        const index = graph.pages.indexOf(this);

        const isCurrent = 
               index == graph.pageIndex
            || index == graph.overIndex;

        this.btnIcon .innerHTML           = iconPage;
        this.btnName .innerHTML           = this.name;
        this.btnClose.innerHTML           = iconPageClose;
        
        this.button  .style.background    = isCurrent ? '#2c2c2c' : (document.hasFocus() ? '#202020' : '#383838');
        
        this.btnIcon .style.display       = this.button.offsetWidth >= 75 ? 'inline-block' : 'none';
        this.btnIcon .style.opacity       = isCurrent ? 1 : 0.35;
        
        this.btnName .style.color         = isCurrent ? '#fffffff0' : '#fff6';
        this.btnName .style.fontWeight    = isCurrent ? 600 : 500;

        this.btnClose.style.pointerEvents = isCurrent && graph.pages.length > 1 ? 'all' : 'none';
        //this.btnClose.style.visibility    = isCurrent && graph.pages.length > 1 ? 'visible' : 'hidden';
        this.btnClose.style.opacity       = isCurrent && graph.pages.length > 1 ? 0.65 : 0;    }



    toJson()
    {
        const tab = '\n' + HTAB;

        return '{'
            + tab + '"id": "'   + this.id    + '",'
            + tab + '"name": "' + this.name  + '",'
            + tab + '"zoom": "' + graph.currentPage.zoom  + '",'
            + tab + '"panx": "' + graph.currentPage.pan.x + '",'
            + tab + '"pany": "' + graph.currentPage.pan.y + '"'
            + '\n}';
    }


    
    load(json)
    {
        this._pan  = point(0, 0);
        this._zoom = 1;
    
        
        if (json)
        {
            const data = JSON.parse(json);

            this.id   = data.id;
            this.name = data.name;


            this._pan = point( 
                parseFloat(data.panx), 
                parseFloat(data.pany));
    
            if (isNaN(this.pan.x)) this._pan.x = 0;
            if (isNaN(this.pan.y)) this._pan.y = 0;
    
            
            this._zoom = parseFloat(data.zoom);
            if (isNaN(this.zoom)) this._zoom = 1;
        }
    }
}