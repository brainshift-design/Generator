const OBJ_RECT = 1;


const MAX_OBJECTS = 0x10000;

var _nextObjId = 0;

var objects  = new Array(MAX_OBJECTS);
var nObjects = 0;



function newObjectId()
{
    var id = _nextObjId;

    var looped = false;

    while (id < MAX_OBJECTS
        && !!gobjects[id])
    {
        id++;

        if (id == MAX_OBJECTS)
        {
            if (looped)
                return -1;

            id     = 0
            looped = true;
        }
    }

    _nextObjId == id + 1;
    
    return id;
}