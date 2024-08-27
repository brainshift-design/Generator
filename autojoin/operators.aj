../parameters/Parameter.js

../parameters/NumberParamBase.js
../parameters/NumberParam.js
../parameters/SelectParam.js
../parameters/TextParam.js
../parameters/ColorParam.js
../parameters/FillParam.js
../parameters/ColorStopParam.js
../parameters/GradientParam.js
../parameters/StrokeParam.js
../parameters/ListParam.js
../parameters/RectangleParam.js
../parameters/LineParam.js
../parameters/EllipseParam.js
../parameters/PolygonParam.js
../parameters/StarParam.js
../parameters/TextShapeParam.js
../parameters/PointParam.js
../parameters/VectorPathParam.js
../parameters/ShapeGroupParam.js
../parameters/FrameParam.js
../parameters/RoundCornersParam.js
../parameters/DropShadowParam.js
../parameters/InnerShadowParam.js
../parameters/LayerBlurParam.js
../parameters/BackBlurParam.js


// these have to be added in order because of dependencies

../operators/Input.js
../operators/InputProxy.js
../operators/Output.js
../operators/OutputProxy.js
../operators/Connection.js
../operators/Wire.js
../operators/Operator.js
../operators/Operator node.js
../operators/Operator label.js
../operators/Operator textbox.js
../operators/Operator update.js
../operators/OperatorBase.js
../operators/ResizableBase.js


../operators/flow/OpRepeat.js
../operators/flow/OpFeedback.js
../operators/flow/OpNull.js
../operators/flow/OpVariable.js
../operators/flow/OpVariableGroup.js
../operators/flow/OpCache.js
../operators/flow/OpFreeze.js
../operators/flow/OpTimer.js
../operators/flow/OpGetValueName.js
../operators/flow/OpSetValueName.js
../operators/flow/OpGetListValueNames.js
../operators/flow/OpSetListValueNames.js
../operators/flow/OpSetObjectName.js

../operators/flow/OpCombine.js
../operators/flow/OpListAsItem.js
../operators/flow/OpExtract.js
../operators/flow/OpSetParam.js
../operators/flow/OpGetParam.js
../operators/flow/OpSublist.js
../operators/flow/OpUnique.js
../operators/flow/OpReorderList.js
../operators/flow/OpShiftList.js
../operators/flow/OpReverseList.js
../operators/flow/OpBuckleList.js
../operators/flow/OpSort.js
../operators/flow/OpFilter.js
../operators/flow/OpColumn.js
../operators/flow/OpCell.js
../operators/flow/OpList.js
../operators/flow/OpSelect.js
../operators/flow/OpSelectFromList.js
../operators/flow/OpListCount.js
../operators/flow/OpObjectCount.js
../operators/flow/OpListContains.js
../operators/flow/OpListFind.js
../operators/flow/OpIfElse.js

../operators/number/OpNumber.js
../operators/number/OpBooleanNumber.js
../operators/number/OpSetPrecision.js
../operators/number/OpSign.js
../operators/number/OpAbsolute.js
../operators/number/OpNegative.js
../operators/number/OpRound.js
../operators/number/OpQuantize.js
../operators/number/OpSimpleMinMax.js
../operators/number/OpMinMax.js
../operators/number/OpLimits.js
../operators/number/OpNumberCurve.js
../operators/number/OpNumberMap.js
../operators/number/OpNumberBias.js
../operators/number/OpNaNisNumber.js
../operators/number/OpConstant.js

../operators/number/OpDateTime.js
../operators/number/OpIterate.js
../operators/number/OpSequence.js
../operators/number/OpRange.js
../operators/number/OpWave.js
../operators/number/OpRandom.js
../operators/number/OpNoise.js
../operators/number/OpProbability.js
../operators/number/OpAccumulate.js
../operators/number/OpHold.js
../operators/number/OpInterpolate.js
../operators/number/OpNumberToText.js
../operators/number/OpSolve.js
../operators/number/OpAnimate.js

../operators/number/arithmetic/OpMath.js
../operators/number/arithmetic/OpSimpleMath.js
../operators/number/arithmetic/OpArithmetic.js

../operators/number/boolean/OpBoolean.js
../operators/number/boolean/OpBooleanBase.js
../operators/number/boolean/OpNot.js
../operators/number/boolean/OpAnd.js
../operators/number/boolean/OpOr.js
../operators/number/boolean/OpXor.js

../operators/number/condition/OpCompare.js
../operators/number/condition/OpConditionBase.js
../operators/number/condition/OpEqual.js
../operators/number/condition/OpNotEqual.js
../operators/number/condition/OpLess.js
../operators/number/condition/OpLessOrEqual.js
../operators/number/condition/OpGreater.js
../operators/number/condition/OpGreaterOrEqual.js

../operators/number/trigonometric/OpTrig.js
../operators/number/trigonometric/OpTrigBase.js
../operators/number/trigonometric/OpSine.js
../operators/number/trigonometric/OpCosine.js
../operators/number/trigonometric/OpTangent.js
../operators/number/trigonometric/OpAtan2.js

../operators/number/OpConvertAngle.js


../operators/color/OpColorBase.js


../operators/text/OpText.js
../operators/text/OpTextLength.js
../operators/text/OpTextTrim.js
../operators/text/OpTextSubstring.js
../operators/text/OpTextContains.js
../operators/text/OpTextFind.js
../operators/text/OpTextCase.js
../operators/text/OpCodeToCharacter.js
../operators/text/OpCharacterToCode.js
../operators/text/OpIndexToName.js
../operators/text/OpTextReplace.js
../operators/text/OpTextJoin.js
../operators/text/OpAddText.js
../operators/text/OpTextPad.js
../operators/text/OpTextSplit.js
../operators/text/OpTextCompare.js
../operators/text/OpParseCSV.js
../operators/text/OpParseJson.js
../operators/text/OpTextFetch.js
../operators/text/OpTextFile.js
../operators/text/OpTextToNumber.js
../operators/text/OpTextToColor.js
../operators/text/OpColorToText.js


../operators/color/OpColor.js
../operators/color/OpColor spaces.js
../operators/color/OpColor convert.js
../operators/color/OpValidColor.js
../operators/color/OpCorrectColor.js
../operators/color/OpColorContrast.js
../operators/color/OpColorDeltaE.js
../operators/color/OpColorblind.js
../operators/color/OpColorScheme.js
../operators/color/OpColorInterpolate.js
../operators/color/OpColorBlend.js


../operators/layer/OpColorStyle.js
../operators/layer/OpFill.js
../operators/layer/OpColorStop.js
../operators/layer/OpGradient.js
../operators/layer/OpStroke.js
../operators/layer/OpStrokeSides.js
../operators/layer/OpRoundCorners.js
../operators/layer/OpDropShadow.js
../operators/layer/OpInnerShadow.js
../operators/layer/OpLayerBlur.js
../operators/layer/OpBackBlur.js
../operators/layer/OpLayerBlend.js
../operators/layer/OpLayerMask.js


../operators/shape/OpShapeBase.js
../operators/shape/OpShape.js
../operators/shape/OpRectangle.js
//../operators/shape/OpRectangleExt.js
../operators/shape/OpLine.js
../operators/shape/OpEllipse.js
../operators/shape/OpTrapeze.js
../operators/shape/OpPolygon.js
../operators/shape/OpStar.js
../operators/shape/OpTextShape.js
../operators/shape/OpPoint.js
../operators/shape/OpPointCorner.js
../operators/shape/OpVectorPath.js
../operators/shape/OpVectorVertex.js
../operators/shape/OpVectorEdge.js
../operators/shape/OpVectorRegion.js
../operators/shape/OpVectorNetwork.js
../operators/shape/OpArcPath.js
../operators/shape/OpWavePath.js
../operators/shape/OpShapeGroup.js
../operators/shape/OpFrame.js
../operators/shape/OpApply.js

../operators/shape/OpMove.js
../operators/shape/OpAffine.js
../operators/shape/OpRotate.js
../operators/shape/OpScale.js
../operators/shape/OpSkew.js
../operators/shape/OpShowCenter.js
../operators/shape/OpSetCenter.js
../operators/shape/OpResetTransform.js

../operators/shape/OpJoinPaths.js
../operators/shape/OpReorientPaths.js
../operators/shape/OpMeasureVector.js
../operators/shape/OpPointAngle.js
../operators/shape/OpVector.js
../operators/shape/OpCircleCenter.js
../operators/shape/OpArcFromPoints.js
../operators/shape/OpPathLength.js
../operators/shape/OpPointAlongPath.js
../operators/shape/OpClosestPointOnPath.js
../operators/shape/OpIntersectLines.js
../operators/shape/OpInterpolatePoint.js
../operators/shape/OpReversePath.js
../operators/shape/OpBlendPath.js

../operators/shape/boolean/OpShapeBooleanBase.js
../operators/shape/boolean/OpShapeBoolean.js
../operators/shape/boolean/OpShapeUnion.js
../operators/shape/boolean/OpShapeSubtract.js
../operators/shape/boolean/OpShapeIntersect.js
../operators/shape/boolean/OpShapeExclude.js

../operators/shape/OpPlace.js

../operators/shape/OpPersist.js
../operators/shape/OpExport.js


../operators/group/OpGroupNode.js
../operators/group/OpGroupParam.js


../operators/OpComment.js
../operators/OpCommentArrow.js
../operators/OpPanel.js


../Graph/GraphPage.js
../Graph/Graph.js
../Graph/Graph nodes.js
../Graph/Graph tree.js
../Graph/Graph pages.js

