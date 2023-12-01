class   OpDateTime
extends OperatorBase
{
    paramSeconds;
    paramMinutes;
    paramHours;
    paramDayOfWeek;
    paramDate;
    paramMonth;
    paramYear;

    updateTimer = -1;



    constructor()
    {
        super(NUMBER_DATETIME, 'dateTime', 'date & time', iconDateTime);


        this.canDisable   = true;
        this.iconOffsetY  = -4;
        this.subscription = true;

        
        this.addParam(this.paramHours     = new NumberParam('hours',     'hours',    true,  true,  true, 0, 0,  23));
        this.addParam(this.paramMinutes   = new NumberParam('minutes',   'minutes',  true,  true,  true, 0, 0,  59));
        this.addParam(this.paramSeconds   = new NumberParam('seconds',   'seconds',  true,  true,  true, 0, 0,  59));
        this.addParam(this.paramDayOfWeek = new NumberParam('dayOfWeek', 'week day', true,  true,  true, 1, 1,   7));
        this.addParam(this.paramDate      = new NumberParam('date',      'date',     true,  true,  true, 1, 1,  31));
        this.addParam(this.paramMonth     = new NumberParam('month',     'month',    true,  true,  true, 1, 1,  12));
        this.addParam(this.paramYear      = new NumberParam('year',      'year',     true,  true,  true));


        this.setAllParamDividers(0.56);
    }



    genRequest(gen)
    {
        // 'this' is the node

        gen.scope.push({
            nodeId:  this.id, 
            paramId: NULL });

        const [request, ignore] = this.genRequestStart(gen);
        if (ignore) return request;

        
        request.push(...this.paramSeconds  .genRequest(gen));
        request.push(...this.paramMinutes  .genRequest(gen));
        request.push(...this.paramHours    .genRequest(gen));
        request.push(...this.paramDayOfWeek.genRequest(gen));
        request.push(...this.paramDate     .genRequest(gen));
        request.push(...this.paramMonth    .genRequest(gen));
        request.push(...this.paramYear     .genRequest(gen));


        gen.scope.pop();
        pushUnique(gen.passedNodes, this);

        return request;
    }



    
    updateParams()
    {
        this.paramSeconds  .enableControlText(false);
        this.paramMinutes  .enableControlText(false);
        this.paramHours    .enableControlText(false);
        this.paramDayOfWeek.enableControlText(false);
        this.paramDate     .enableControlText(false);
        this.paramMonth    .enableControlText(false);
        this.paramYear     .enableControlText(false);

        this.paramDate.controls[0].setMax(daysInMonth(
            this.paramMonth.value.value,
            this.paramYear .value.value));

        this.updateParamControls();
    }



    updateNode()
    {
        super.updateNode();


        if (this.updateTimer >= 0) 
            clearTimeout(this.updateTimer);


        if (this.enabled)
        {
            const dateTime = new Date();

            const seconds   = dateTime.getSeconds();
            const minutes   = dateTime.getMinutes();
            const hours     = dateTime.getHours();
            const dayOfWeek = dateTime.getDay();
            const date      = dateTime.getDate();
            const month     = dateTime.getMonth()+1;
            const year      = dateTime.getFullYear();

            this.paramSeconds  .setValue(new NumberValue(seconds),   false, true, false);
            this.paramMinutes  .setValue(new NumberValue(minutes),   false, true, false);
            this.paramHours    .setValue(new NumberValue(hours),     false, true, false);
            this.paramDayOfWeek.setValue(new NumberValue(dayOfWeek), false, true, false);
            this.paramDate     .setValue(new NumberValue(date),      false, true, false);
            this.paramMonth    .setValue(new NumberValue(month),     false, true, false);
            this.paramYear     .setValue(new NumberValue(year),      false, true, false);
            
            this.updateTimer = setTimeout(() => this.updateNode(), 100);
        }
    }



    toJsCode(gen)
    {
        return '';
    }
}