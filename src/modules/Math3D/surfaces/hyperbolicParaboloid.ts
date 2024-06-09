import { Point, Edge, Polygon, Surface } from "../entities"
class hyperbolicParaboloid extends Surface {
    constructor(
        count: number = 20,
        a: number = 3,
        b: number = 2,
        color: string = '#00ff00', 
    ){
    const points: Point[] = [];
    const edges: Edge[] = [];
    const polygons: Polygon[] = [];

    //точки
    for (let x = -10; x < 10; x++) {
        for (let y = -10; y < 10; y++) {
            points.push(new Point(
                x,
                y,
                x * x / (a * a) - y * y / (b * b)
            ));
        }
    }

    //ребра
    for (let i = 0; i < points.length; i++) {
        if (i + 1 < points.length && (i + 1) % count !== 0) {
            edges.push(new Edge(
                i,
                i + 1
            ));
        }
        if (i < points.length - count) {
            edges.push(new Edge(
                i,
                i + count
            ));
        }
    }

    //полигоны
    for (let i = 0; i < points.length; i++) {
        if (i % 2 === 0) {
            if (i + 1 + count < points.length && (i + 1) % count !== 0) {
                polygons.push(new Polygon([i, i + 1, i + 1 + count, i + count]));
            }
        } else if (i + 1 + count < points.length && (i + 1) % count !== 0) {
            polygons.push(new Polygon([i, i + 1, i + 1 + count, i + count]));
        }
    }
    super(points, edges, polygons);
    }
}
export default hyperbolicParaboloid;

