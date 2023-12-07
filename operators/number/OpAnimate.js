class   OpAnimate
extends OperatorBase //WithValue
{
    paramFrom;
    paramTo;
    paramCurve;
    paramRepeat;
    paramLength;
    paramTime;


    btnPlay;

    playing = false;

    startTime;
    paramTimeStart = 0;
    //prevTime;



    constructor()
    {
        super(NUMBER_ANIMATE, 'anim', 'animate', '');


        this.subscription = true;
        this.iconOffsetY  = -1;
        //this.cached = false;
        

        this.addOutput(new Output([NUMBER_VALUE], this.output_genRequest));

        //this.addParam(this.paramValue);
        this.addParam(this.paramFrom   = new NumberParam('from',   'from',   true,  true, true, 0, Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER, 0));
        this.addParam(this.paramTo     = new NumberParam('to',     'to',     true,  true, true, 1, Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER, 0));
        this.addParam(this.paramRepeat = new SelectParam('repeat', 'repeat', false, true, true, ['once', 'repeat', 'ping-pong']));
        this.addParam(this.paramCurve  = new SelectParam('curve',  'curve',  true,  true, true, ['step', 'linear', 'ease in', 'ease out', 'smooth'], 1));
        this.addParam(this.paramLength = new NumberParam('length', 'length', true,  true, true, 5, 0, Number.MAX_SAFE_INTEGER, 0));
        this.addParam(this.paramTime   = new NumberParam('time',   'time',   true,  true, true, 0, 0, Number.MAX_SAFE_INTEGER, 1));


        this.paramLength.controls[0].suffix = ' sec';
        this.paramTime  .controls[0].suffix = ' sec';


        this.btnPlay      = createDiv('btnAnimatePlay');
        this.btnPlay.over = false;
        this.btnPlay.down = false;


        this.btnPlay.addEventListener('pointerenter', e => 
        { 
            this.btnPlay.over = true;  
            this.updateHeader(); 
        });


        this.btnPlay.addEventListener('pointerleave', e => 
        { 
            this.btnPlay.over = false; 
            this.updateHeader(); 
        });


        this.btnPlay.addEventListener('pointerdown',  e => 
        { 
            e.stopPropagation();

            if (e.button == 0)
            {
                hideAllMenus();

                this.playing = !this.playing;
                this.updateHeader();


                if (this.playing) // start playback
                {
                    this.startTime      = Date.now();
                    this.paramTimeStart = this.paramTime.value.value;

                    let   time   = this.paramTimeStart + (Date.now() - this.startTime) / 1000;
                    const length = this.paramLength.value.value;

                    if (time >= length)
                    {
                        this.paramTime.setValue(new NumberValue(0), false, false, false);
                        this.paramTimeStart = 0;
                    }
                        
                    this.updatePlayback();
                }
            }
            else
                e.preventDefault();
        });


        this.label.insertBefore(this.btnPlay, this.labelText);


        this.paramFrom  .divider = 0.48;
        this.paramTo    .divider = 0.48;
        this.paramRepeat.divider = 0.48;
        this.paramCurve .divider = 0.48;
        this.paramLength.divider = 0.48;
        this.paramTime  .divider = 0.48;


        this.paramTime.controls[0].addEventListener('change', e =>
        {
            if (this.playing)
            {
                this.startTime      = Date.now();
                this.paramTimeStart = this.paramTime.value.value;
            }
        });
    }



    output_genRequest(gen)
    {
        // 'this' is the output

        gen.scope.push({
            nodeId:  this.node.id, 
            paramId: NULL });

        const [request, ignore] = this.node.genRequestStart(gen);
        if (ignore) return request;

        
        request.push(...this.node.paramFrom  .genRequest(gen));
        request.push(...this.node.paramTo    .genRequest(gen));
        request.push(...this.node.paramCurve .genRequest(gen));
        request.push(...this.node.paramRepeat.genRequest(gen));
        request.push(...this.node.paramLength.genRequest(gen));
        request.push(...this.node.paramTime  .genRequest(gen));


        gen.scope.pop();
        pushUnique(gen.passedNodes, this.node);

        return request;
    }



    // updateValues(requestId, actionId, updateParamId, paramIds, values)
    // {
    //     super.updateValues(requestId, actionId, updateParamId, paramIds, values);

    //     // if (this.playing)
    //     //     this.updatePlayback();
    // }



    updateParams()
    {
        //this.paramValue .enableControlText(false);
        this.paramFrom  .enableControlText(true, this.paramFrom  .isUnknown());
        this.paramTo    .enableControlText(true, this.paramTo    .isUnknown());
        this.paramCurve .enableControlText(true, this.paramCurve .isUnknown());
        this.paramRepeat.enableControlText(true, this.paramRepeat.isUnknown());
        this.paramLength.enableControlText(true, this.paramLength.isUnknown());
        this.paramTime  .enableControlText(true, this.paramTime  .isUnknown());

        this.paramTime.controls[0].setMax(this.paramLength.value.value);
        //this.paramTime.controls[0].setDecimals(this.paramLength.controls[0].decimals);

        this.updateParamControls();
    }



    updateHeader()
    {
        super.updateHeader();

        this.updatePlayIcon();
    }



    updatePlayIcon()
    {
        const colors = this.getHeaderColors();

        const headerStyle = rgba2style(
            rgb_a(
                colors.text, 
                this.btnPlay.down 
                ? 1 
                : this.btnPlay.over
                  ? 1 
                  : 0.5));

        this.btnPlay.style.display            = 'inline-block';
        this.btnPlay.style.background         = !this.playing
                                                ? 'url(\'data:image/svg+xml;utf8,<svg width="9" height="13" viewBox="0 0 9 13" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 6.5L1.47008e-07 13L7.15256e-07 -3.93402e-07L9 6.5Z" fill="'+headerStyle+'"/></svg>\')'
                                                : 'url(\'data:image/svg+xml;utf8,<svg width="9" height="9" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="9" height="9" fill="'+headerStyle+'"/></svg>\')';

        this.btnPlay.style.backgroundPosition = '50% 50%';
        this.btnPlay.style.backgroundRepeat   = 'no-repeat';
    }



    updatePlayback(update = true)
    {
        let   time   = this.paramTimeStart + (Date.now() - this.startTime) / 1000;
        const length = this.paramLength.value.value;


        switch (this.paramRepeat.value.value)
        {
            case 0:
                if (time >= length)
                {
                    time = length;
                    this.playing = false;
                    this.updatePlayIcon();
                }
                
                break;

            case 1:
                if (time > length)
                    time %= length;

                break;

            case 2:
                if (Math.floor(time / length) % 2 > 0)
                    time = length - (time % length);
                if (time > length)
                    time %= length;

                break;
        }


        this.paramTime.setValue(
            new NumberValue(
                time, 
                this.paramTime.controls[0].decimals),
            false);

        
        if (update)
            pushUpdate(null, [this], false);
    }
}