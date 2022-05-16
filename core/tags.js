const nodeTag = 'G_NODE';
const connTag = 'G_CONN';



function isTagKey(key, tag) 
{
    return key.substring(0, tag.length+1) == tag + ' ';
}



function noTag(key, tag)
{
    return key.substring(tag.length+1);
}



function isNodeKey(key) { return isTagKey(key, nodeTag); }
function isConnKey(key) { return isTagKey(key, connTag); }



function noNodeTag(key) { return noTag(key, nodeTag); }
function noConnTag(key) { return noTag(key, connTag); }