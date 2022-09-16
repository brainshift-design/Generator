function logReqShape(node, parse)
{
    parse.log += parse.tab + node.type;
    parse.log += logReqNodeId(node);
}
