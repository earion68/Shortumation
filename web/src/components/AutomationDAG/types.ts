

export type Point = [number, number];
export interface Node {
    loc: Point;
    text: JSX.Element | string;
}
export interface Edge {
    from: string;
    to: string;
    direction: '1->2' | '1<->2' | '1<-2';
}
export type EdgeDirection = Edge['direction'];
export interface DAG {
    nodes: Record<string,Node>;
    edges: Array<Edge>;
}
export interface NormalizedDag extends DAG {
    // overflow: boolean;
}