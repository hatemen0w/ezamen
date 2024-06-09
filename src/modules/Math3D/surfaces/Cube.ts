import { Point, Edge, Polygon, Surface } from "../entities"

class Cube extends Surface {
    constructor(edge: number = 5, center: Point = new Point()) {
        super([
            new Point(edge + center.x, edge + center.y, edge + center.z),
            new Point(edge + center.x, -edge + center.y, edge + center.z),
            new Point(-edge + center.x, -edge + center.y, edge + center.z),
            new Point(-edge + center.x, edge + center.y, edge + center.z),
            new Point(edge + center.x, edge + center.y, -edge + center.z),
            new Point(edge + center.x, -edge + center.y, -edge + center.z),
            new Point(-edge + center.x, -edge + center.y, -edge + center.z),
            new Point(-edge + center.x, edge + center.y, -edge + center.z)
        ], [
            new Edge(0, 1),
            new Edge(1, 2),
            new Edge(2, 3),
            new Edge(3, 0),
            new Edge(0, 4),
            new Edge(1, 5),
            new Edge(2, 6),
            new Edge(3, 7),
            new Edge(4, 5),
            new Edge(5, 6),
            new Edge(6, 7),
            new Edge(7, 4),
        ], [
            new Polygon([0, 1, 2, 3], '#00ff00'),
            new Polygon([0, 4, 5, 1], '#00ff00'),
            new Polygon([0, 3, 7, 4], '#00ff00'),
            new Polygon([6, 5, 4, 7], '#00ff00'),
            new Polygon([6, 7, 3, 2], '#00ff00'),
            new Polygon([6, 2, 1, 5], '#00ff00')
        ],
            center
        );
    }
}

export default Cube;