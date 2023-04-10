class SetParamSettingAction
extends Action
{
    nodeId;
    paramId;


    get param() 
    { 
        return graph.nodeFromId(this.nodeId).params
               .find(p => p.id == this.paramId); 
    } 

    get node() { return this.param.node; } 


    setting;

    oldValue;
    newValue;



    constructor(param, setting, value)
    {
        super(
            SET_PARAM_SETTING_ACTION,
            'SET PARAM SETTING ' + param.node.id + '.' + param.id + '[' + setting + '] = ' + value);

        this.nodeId     = param.node.id;
        this.paramId    = param.id;
  
        this.setting    = setting;
        this.newValue   = value;

        this.selfUpdate = true;
    }



    do(updateNodes)
    {
        switch (this.setting)
        {
            case 'align': 
                this.oldValue = this.param.controls[0].getTextAlignment();
                break;
        }


        this.name = 
             'SET PARAM SETTING ' 
            + this.param.node.id 
            + '.' + this.param.id 
            + '[' + this.setting + ']'
            + ' = ' + this.newValue
            + ' (old value = ' + this.oldValue + ')';


        this.param.updateSetting(this.setting, this.newValue);
        this.node.updateNode();
        
        uiSaveNodes(graph, [this.nodeId]);

        //pushUpdateFromParam(this, [this.param.node], this.param);
    }



    undo(updateNodes)
    {
        this.param.updateSetting(this.setting, this.oldValue);
        this.node.updateNode();

        uiSaveNodes(graph, [this.nodeId]);
    }



    redo(updateNodes)
    {
        this.param.updateSetting(this.setting, this.newValue);
        this.node.updateNode();

        uiSaveNodes(graph, [this.nodeId]);
   }
}