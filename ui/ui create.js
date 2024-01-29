function createNode(nodeType, creatingButton = null, createdNodeId = -1, options = {})
{
    let node;
 
    switch (nodeType)
    {
        case NULL_NODE:               node = new OpNull();              break;
        case VARIABLE:                node = new OpVariable();          break;
        case VARIABLE_GROUP:          node = new OpVariableGroup();     break;
        case START:                   node = new OpStart();             break;
        case REPEAT:                  node = new OpRepeat();            break;
        case CACHE:                   node = new OpCache();             break;
        case FREEZE:                  node = new OpFreeze();            break;
        case TIMER:                   node = new OpTimer();             break;
        case VALUE_NAME:              node = new OpValueName();         break;
        case GET_LIST_VALUE_NAMES:    node = new OpGetListValueNames(); break;
        case LIST_VALUE_NAMES:        node = new OpListValueNames();    break;
        case OBJECT_NAME:             node = new OpObjectName();        break;

        case COMBINE:                 node = new OpCombine();           break;
        case LIST_AS_ITEM:            node = new OpListAsItem();        break;
        case LIST:                    node = new OpList();              break;
        case LIST_COUNT:              node = new OpListCount();         break;
        case SELECT:                  node = new OpSelect();            break;
        case SELECT_FROM_LIST:        node = new OpSelectFromList();    break;
        case CONTAINS:                node = new OpContains();          break;
        case IF_ELSE:                 node = new OpIfElse();            break;
        case EXTRACT:                 node = new OpExtract();           break;
        case SET_PARAM:               node = new OpSetParam();          break;
        case GET_PARAM:               node = new OpGetParam();          break;
        case SUBLIST:                 node = new OpSublist();           break;
        case UNIQUE:                  node = new OpUnique();            break;
        case REVERSE_LIST:            node = new OpReverseList();       break;
        case REORDER_LIST:            node = new OpReorderList();       break;
        case SORT:                    node = new OpSort();              break;
        case FILTER:                  node = new OpFilter();            break;
        case COLUMN:                  node = new OpColumn();            break;
        case CELL:                    node = new OpCell();              break;
        
        case DEFINE:                  node = new OpDefine();            break;
        case NUMBER_SEQUENCE:         node = new OpSequence();          break;
        case NUMBER_RANGE:            node = new OpRange();             break;
        case NUMBER_WAVE:             node = new OpWave();              break;
        case NUMBER_RANDOM:           node = new OpRandom();            break;
        case NUMBER_NOISE:            node = new OpNoise();             break;
        case NUMBER_PROBABILITY:      node = new OpProbability();       break;
        case NUMBER_ACCUMULATE:       node = new OpAccumulate();        break;

        case NUMBER:                  node = new OpNumber();            break;
        case NUMBER_PRECISION:        node = new OpSetPrecision();      break;
        case NUMBER_SIGN:             node = new OpSign();              break;
        case NUMBER_ABSOLUTE:         node = new OpAbsolute();          break;
        case NUMBER_NEGATIVE:         node = new OpNegative();          break;
        case NUMBER_ROUND:            node = new OpRound();             break;
        case NUMBER_SIMPLE_MINMAX:    node = new OpSimpleMinMax();      break;
        case NUMBER_MINMAX:           node = new OpMinMax();            break;
        case NUMBER_LIMITS:           node = new OpLimits();            break;
        case NUMBER_CURVE:            node = new OpNumberCurve();       break;
        case NUMBER_NAN:              node = new OpNaNisNumber();       break;
        case NUMBER_CONSTANT:         node = new OpConstant();          break;
        case NUMBER_DATETIME:         node = new OpDateTime();          break;

        case NUMBER_INTERPOLATE:      node = new OpInterpolate();       break;
        case NUMBER_TO_TEXT:          node = new OpNumberToText();      break;
        case COLOR_TO_TEXT:           node = new OpColorToText();       break;
        case NUMBER_SOLVE:            node = new OpSolve();             break;
        case NUMBER_ANIMATE:          node = new OpAnimate();           break;

        case NUMBER_MATH:             node = new OpMath();              break;
        case NUMBER_SIMPLE_MATH:      node = new OpSimpleMath();        break;
        case NUMBER_ADD:              node = new OpAdd();               break;
        case NUMBER_SUBTRACT:         node = new OpSubtract();          break;
        case NUMBER_MULTIPLY:         node = new OpMultiply();          break;
        case NUMBER_DIVIDE:           node = new OpDivide();            break;
        case NUMBER_MODULO:           node = new OpModulo();            break;
        case NUMBER_EXPONENT:         node = new OpExponent();          break;

        case NUMBER_BOOLEAN:          node = new OpBoolean();           break;
        case NUMBER_NOT:              node = new OpNot();               break;
        case NUMBER_AND:              node = new OpAnd();               break;
        case NUMBER_OR:               node = new OpOr();                break;
        case NUMBER_XOR:              node = new OpXor();               break;

        case NUMBER_CONDITION:        node = new OpCondition();         break;
        case NUMBER_EQUAL:            node = new OpEqual();             break;
        case NUMBER_NOT_EQUAL:        node = new OpNotEqual();          break;
        case NUMBER_LESS:             node = new OpLess();              break;
        case NUMBER_LESS_OR_EQUAL:    node = new OpLessOrEqual();       break;
        case NUMBER_GREATER:          node = new OpGreater();           break;
        case NUMBER_GREATER_OR_EQUAL: node = new OpGreaterOrEqual();    break;

        case NUMBER_TRIG:             node = new OpTrig();              break;
        case NUMBER_SIN:              node = new OpSine();              break;
        case NUMBER_COS:              node = new OpCosine();            break;
        case NUMBER_TAN:              node = new OpTangent();           break;
        case NUMBER_ATAN2:            node = new OpAtan2();             break;

        case CONVERT_ANGLE:           node = new OpConvertAngle();      break;

        case TEXT:                    node = new OpText();              break;
        case TEXT_LENGTH:             node = new OpTextLength();        break;
        case TEXT_TRIM:               node = new OpTextTrim();          break;
        case TEXT_SUBSTRING:          node = new OpTextSubstring();     break;
        case TEXT_CONTAINS:           node = new OpTextContains();      break;
        case TEXT_CASE:               node = new OpTextCase();          break;
        case TEXT_CHAR:               node = new OpCodeToCharacter();   break;
        case TEXT_UNICODE:            node = new OpCharacterToCode();   break;
        case INDEX_TO_NAME:           node = new OpIndexToName();       break;
        case TEXT_REPLACE:            node = new OpTextReplace();       break;
        case TEXT_JOIN:               node = new OpTextJoin();          break;
        case TEXT_PAD:                node = new OpTextPad();           break;
        case TEXT_COMPARE:            node = new OpTextCompare();       break;
        case TEXT_TO_NUMBER:          node = new OpTextToNumber();      break;
        case TEXT_TO_COLOR:           node = new OpTextToColor();       break;
        case TEXT_SPLIT:              node = new OpTextSplit();         break;
        case TEXT_CSV:                node = new OpTextCSV();           break;
        case TEXT_JSON:               node = new OpTextJson();          break;
        case TEXT_FETCH:              node = new OpTextFetch();         break;
        case TEXT_FILE:               node = new OpTextFile();          break;

        case COLOR:                   node = new OpColor(options);      break;
        case VALID_COLOR:             node = new OpValidColor();        break;
        case CORRECT_COLOR:           node = new OpCorrectColor();      break;
        case COLOR_CONTRAST:          node = new OpColorContrast();     break;
        case COLOR_CONVERT_P3:        node = new OpConvertP3();         break;
        case COLORBLIND:              node = new OpColorBlind();        break;
        case COLOR_INTERPOLATE:       node = new OpColorInterpolate();  break;
        case COLOR_BLEND:             node = new OpColorBlend();        break;

        
        case FILL:                    node = new OpFill();              break;
        case GRADIENT:                node = new OpGradient();          break;
        case COLOR_STOP:              node = new OpColorStop();         break;

        case STROKE:                  node = new OpStroke();            break;

        case ROUND_CORNERS:           node = new OpRoundCorners();      break;
        case DROP_SHADOW:             node = new OpDropShadow();        break;
        case INNER_SHADOW:            node = new OpInnerShadow();       break;
        case LAYER_BLUR:              node = new OpLayerBlur();         break;
        case BACK_BLUR:               node = new OpBackBlur();          break;

        case LAYER_BLEND:             node = new OpLayerBlend();        break;
        case LAYER_MASK:              node = new OpLayerMask();         break;

        case COLOR_STYLE:             node = new OpColorStyle(options); break;

        case RECTANGLE:               node = new OpRectangle();         break;
        case LINE:                    node = new OpLine();              break;
        case ELLIPSE:                 node = new OpEllipse();           break;
        case TRAPEZE:                 node = new OpTrapeze();           break;
        case POLYGON:                 node = new OpPolygon();           break;
        case STAR:                    node = new OpStar();              break;
        case TEXT_SHAPE:              node = new OpTextShape();         break;
        case POINT:                   node = new OpPoint();             break;
        case POINT_CORNER:            node = new OpPointCorner();       break;
        case VECTOR_PATH:             node = new OpVectorPath();        break;
        case VECTOR_VERTEX:           node = new OpVectorVertex();      break;
        case VECTOR_EDGE:             node = new OpVectorEdge();        break;
        case VECTOR_REGION:           node = new OpVectorRegion();      break;
        case VECTOR_NETWORK:          node = new OpVectorNetwork();     break;
        case BOOLEAN:                 node = new OpShapeBoolean();      break;
        case SHAPE_GROUP:             node = new OpShapeGroup();        break;
        case FRAME:                   node = new OpFrame();             break;
        case SHAPE_APPLY:             node = new OpApply();             break;

        case MOVE:                    node = new OpMove();              break;
        case ROTATE:                  node = new OpRotate();            break;
        case SCALE:                   node = new OpScale();             break;
        case SKEW:                    node = new OpSkew();              break;

        case SET_CENTER:                  node = new OpSetCenter();            break;
        case RESET_XFORM:             node = new OpResetTransform();    break;
        
        case MEASURE_POINTS:          node = new OpMeasurePoints();     break;
        case VECTOR_LENGTH:           node = new OpVectorLength();      break;
        case CIRCLE_CENTER:           node = new OpCircleCenter();      break;
        case INTERSECT_LINES:         node = new OpIntersectLines();    break;
        case INTERPOLATE_POINT:       node = new OpInterpolatePoint();  break;
        case POINT_ON_PATH:           node = new OpPointOnPath();       break;

        case PLACE:                   node = new OpPlace();             break;

        case RENDER:                  node = new OpRender();            break;

        case GROUP_NODE:              node = new OpGroupNode();         break;
        case GROUP_PARAM:             node = new OpGroupParam();        break;

        case COMMENT:                 node = new OpComment();           break;
        case COMMENT_ARROW:           node = new OpCommentArrow();      break;
        case PANEL:                   node = new OpPanel();             break;

        default:                      consoleError('Graph.js/createNode() cannot create type ' + nodeType);
    }
    
    node._creatingButton = creatingButton;

    return node;
}