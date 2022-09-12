const settings =
{
    showNodeId:       false, // instead of name
    
    logMessages:      false,

    logActions:       true, 

    logRawLoading:    false, 
    logRawSaving:     false, 
    
    logLoading:       false, 

    logRawRequests:   false, 
    logRawValues:     false, 
    
    logRequests:      true, 
    logValueUpdates:  true, 
    logObjectUpdates: true
};



function updateSetting(settingName, value)
{
    settings[settingName] = value;
    uiSetLocalData(settingName, boolString(value));
}