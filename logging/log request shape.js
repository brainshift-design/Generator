function logReqShape(node, parse, ignore)
{
    parse.log += parse.tab + node.type;
    parse.log += logReqNodeId(node, ignore);
}
