import Color from "chroma-js";
import { PencilIcon } from "components/Icons"
import { useNodeStyles } from "./styles"
import { Node, Point } from "types/graphs";
import { DAGEdge } from "./DAGEdge";



export interface NodeProp extends Node {
  height: number;
  width: number;
  onXClick?: () => void;
  onOpenClick?: () => void;
  edge?: {
    color: string;
    loc: Point;
  }
}
export const DAGNode = ({
  loc: [x, y],
  text,
  height,
  width,
  onXClick = () => { },
  onOpenClick = () => { },
  color,
  edge,
}: NodeProp) => {
  const { classes, theme } = useNodeStyles({
    color,
    nodeHeight: height,
    nodeWidth: width,
  });
  return <>
    <foreignObject x={x} y={y} width={width} height={height}>
      <div className={classes.root}>
        <div className={classes.inner}>
          <div className={classes.leftEdge} onClick={onXClick}>
            <button className={classes.buttonDelete}>X</button>
          </div>
          <div className={classes.textWrap}>
            <span className={classes.text}>
              {text}
            </span>
          </div>
          <div className={classes.rightEdge} onClick={onOpenClick}>
            <button className={classes.buttonEdit}>
              <PencilIcon size={1.1} color={Color(theme.primary).set('rgb.g', 200).hex()} />
            </button>
          </div>
        </div>
      </div>
    </foreignObject>
    {edge && <DAGEdge
      p1={[x + width, y + height/ 2]}
      p2={edge.loc}
      direction="1->2"
      color={edge.color}
    />}
  </>
}
