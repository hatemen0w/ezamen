import { Point, Edge, Polygon, Surface } from "../entities";

class Sphere extends Surface {
    constructor(
        radius: number = 5,
        color: string = '#00ff00', 
        center: Point = new Point(), 
        verticalSegments: number = 20, 
        horizontalSegments: number = 20
    ) {
        const vertices: Point[] = [];
        const edges: Edge[] = [];
        const polygons: Polygon[] = [];

        for (let i = 0; i <= verticalSegments; i++) {
            const theta = (i * Math.PI) / verticalSegments;
            const sinTheta = Math.sin(theta);
            const cosTheta = Math.cos(theta);

            for (let j = 0; j <= horizontalSegments; j++) {
                const phi = (j * 2 * Math.PI) / horizontalSegments;
                const sinPhi = Math.sin(phi);
                const cosPhi = Math.cos(phi);

                const x = radius * sinTheta * cosPhi + center.x;
                const y = radius * cosTheta + center.y;
                const z = radius * sinTheta * sinPhi + center.z;

                vertices.push(new Point(x, y, z));
            }
        }

        for (let i = 0; i < verticalSegments; i++) {
            for (let j = 0; j < horizontalSegments; j++) {
                const first = i * (horizontalSegments + 1) + j;
                const second = first + horizontalSegments + 1;
                
                edges.push(new Edge(first, second));
                edges.push(new Edge(second, first + 1));
            }
        }

        for (let i = 0; i < verticalSegments; i++) {
            for (let j = 0; j < horizontalSegments; j++) {
                const first = i * (horizontalSegments + 1) + j;
                const second = first + horizontalSegments + 1;

                polygons.push(new Polygon([first, second, second + 1, first + 1], color));
            }
        }

        super(vertices, edges, polygons, center);
    }
}

export default Sphere;
