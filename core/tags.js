function isTagKey(key, tag) 
{
    return key.substring(0, tag.length+1) == tag + ' ';
}



function noTag(key, tag)
{
    return key.substring(tag.length+1);
}



function isPageKey(key) { return isTagKey(key, pageTag) }
function isNodeKey(key) { return isTagKey(key, nodeTag); }
function isConnKey(key) { return isTagKey(key, connTag); }



function noPageTag(key) { return noTag(key, pageTag); }
function noNodeTag(key) { return noTag(key, nodeTag); }
function noConnTag(key) { return noTag(key, connTag); }