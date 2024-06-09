import { Point, Edge, Polygon, Surface } from "../entities";

class Cylinder extends Surface {
    constructor(
        radius: number = 5,
        height: number = 10,
        color: string = '#00ff00',
        center: Point = new Point(),
        verticalSegments: number = 20,
        horizontalSegments: number = 20
    ) {
        const vertices: Point[] = [];
        const edges: Edge[] = [];
        const polygons: Polygon[] = [];

        const halfHeight = height / 2;

        // Vertices
        for (let i = 0; i <= verticalSegments; i++) {
            const theta = (i * 2 * Math.PI) / verticalSegments;
            const sinTheta = Math.sin(theta);
            const cosTheta = Math.cos(theta);

            for (let j = 0; j <= horizontalSegments; j++) {
                const phi = (j * Math.PI * 2) / horizontalSegments;
                const x = radius * Math.cos(phi) + center.x;
                const y = halfHeight - (i / verticalSegments) * height + center.y;
                const z = radius * Math.sin(phi) + center.z;
                vertices.push(new Point(x, y, z));
            }
        }

        // Edges
        for (let i = 0; i < verticalSegments; i++) {
            for (let j = 0; j < horizontalSegments; j++) {
                const a = i * (horizontalSegments + 1) + j;
                const b = a + horizontalSegments + 1;
                const c = a + 1;
                const d = b + 1;

                edges.push(new Edge(a, b));
                edges.push(new Edge(b, d));
                edges.push(new Edge(d, c));
                edges.push(new Edge(c, a));
            }
        }

        // Side polygons

        for (let i = 0; i < verticalSegments; i++) {
            for (let j = 0; j < horizontalSegments; j++) {
                const a = i * (horizontalSegments + 1) + j;
                const b = a + horizontalSegments + 1;
                const c = a + 1;
                const d = b + 1;

                polygons.push(new Polygon([a, b, d, c], color));
            }
        }

        // Top and bottom polygons
        const topCenter = new Point(center.x, center.y + halfHeight, center.z);
        const bottomCenter = new Point(center.x, center.y - halfHeight, center.z);

        for (let i = 0; i < verticalSegments; i++) {
            const a = i * (horizontalSegments + 1);
            const b = (i + 1) * (horizontalSegments + 1);
            polygons.push(new Polygon([a, b, b + 1, a + 1], color)); // Top polygon
            polygons.push(new Polygon([a, a + 1, b + 1, b], color)); // Bottom polygon
        }

        super(vertices, edges, polygons, center);
    }
}

export default Cylinder;
