Operator.prototype.createLabel = function()
{
    this.labelWrapper      = createDiv('nodeLabelWrapper');
  
    this.label             = createDiv('nodeLabel');
    this.label.node        = this;
    
    this.divIcon           = createDiv('nodeIcon');
    this.divIcon.innerHTML = this.icon;

    this.labelText         = createDiv('nodeLabelText');
    this.labelText.node    = this;
    
    this.label       .appendChild(this.divIcon);
    this.label       .appendChild(this.labelText);

    this.labelWrapper.appendChild(this.label);
    this.header      .appendChild(this.labelWrapper);

    


    this.labelWrapper.addEventListener('pointerdown', e =>
    {
        //e.preventDefault();
    });

    
    this.labelWrapper.addEventListener('pointermove', e =>
    {
        if (!this.scrollName)
            return;

        const wrect      = boundingRect(this.labelWrapper);
        const margin     = 14;
        const viewMargin = margin * graph.currentPage.zoom;
        
        const x          = e.clientX - wrect.x;

             if (x <  viewMargin)               this.updateHeaderLabelOffsetX(0);
        else if (x >= wrect.width - viewMargin) this.updateHeaderLabelOffsetX(1);
        else if (x >= viewMargin
              && x <  wrect.width - viewMargin) this.updateHeaderLabelOffsetX((x - viewMargin) / (wrect.width - viewMargin*2));
        else                                    this.updateHeaderLabelOffsetX();
    });
};



Operator.prototype.updateHeaderLabelOffsetX = function(f = this.labelOffsetFactor)
{
    //console.log('updateHeaderLabelOffsetX()');

    this.labelOffsetFactor = Math.min(Math.max(0, f), 1);


    const margin     = 15;
    const viewMargin = margin * graph.currentPage.zoom;

    const wrect      = this.measureData.labelWrapperBounds;
    const rect       = this.measureData.labelBounds;

    const rw         = wrect.width - viewMargin*2;
    const sf         = rw / nozero(rect.width);
    const df         = viewMargin / rect.width / 2;
        
    const s1         = this.labelOffsetFactor * (rect.width - rw) / rect.width;
    const s0         = s1 - df;
    const s2         = s1 + sf;
    const s3         = s2 + df;


    const activeOffset = this.getActiveOffset();
    const defOffset    = this.getDefaultOffset();


    if (rect.width > rw)
    {
        this.label.style.left = 
            11 
            - this.labelOffsetFactor * (rect.width - rw - 1) / graph.currentPage.zoom
            + (this.active ? activeOffset : 0);
            
        this.label.style.transform = 'none';
    }
    else
    {
        this.label.style.left = 
              'calc(50%' 
            + (this.active && this.showActiveArrow ? (' + ' + activeOffset + 'px') : (' + ' + defOffset + 'px')) 
            + ')';

        this.label.style.transform = 'translateX(-50%)';
    }


    const color = 
        this.label.style.color.trim() != ''
        ?  this.label.style.color
        : 'black';

    this.label.style.background = 
          'linear-gradient(90deg, '
        + '#0000 '     + (s0 * 100) + '%, '
        +  color + ' ' + (s1 * 100) + '%, '
        +  color + ' ' + (s2 * 100) + '%, '
        + '#0000 '     + (s3 * 100) + '%)';

    this.label.style.WebkitBackgroundClip = 'text';
    this.label.style.WebkitTextFillColor  = 'transparent';
};