import { Point, Edge, Polygon, Surface } from "../entities";

class HyperbolicCylinder extends Surface {
    constructor(
        count: number = 10,
        color: string = '#00ff00',
    ) {
        const points: Point[] = [];
        const edges: Edge[] = [];
        const polygons: Polygon[] = [];

        // Points
        let size = 5;
        for (let i = -count; i < count; i++) {
            for (let j = 0; j < count; j++) {
                const x = i + size / count;
                const y = x * x / size;
                const z = j - size;
                points.push(new Point(x, y, z));
            }
        }
        size = -5;
        for (let i = -count; i < count; i++) {
            for (let j = 0; j < count; j++) {
                const x = i - size / count;
                const y = x * x / size;
                const z = j + size;
                points.push(new Point(x, y, z));
            }
        }

        // Edges
        for (let i = 0; i < points.length / 2 - count; i++) {
            if (i + 1 < points.length && (i + 1) % count !== 0) {
                edges.push(new Edge(i, i + 1));
            } else if ((i + 1) % count === 0) {
                edges.push(new Edge(i, i + 1 - count));
            }
            if (i < points.length - count) {
                edges.push(new Edge(i, i + count));
            }
        }
        for (let i = points.length / 2; i < points.length; i++) {
            if (i + 1 < points.length && (i + 1) % count !== 0) {
                edges.push(new Edge(i, i + 1));
            } else if ((i + 1) % count === 0) {
                edges.push(new Edge(i, i + 1 - count));
            }
            if (i < points.length - count) {
                edges.push(new Edge(i, i + count));
            }
        }

        // Polygons with checkerboard pattern
        const halfCount = points.length / 2;
        for (let i = 0; i < halfCount - count; i++) {
            if (i + 1 + count < halfCount && (i + 1) % count !== 0) {
                const polygonColor = ((Math.floor(i / count) + i % count) % 2 === 0) ? color : 'black';
                polygons.push(new Polygon([i, i + 1, i + 1 + count, i + count], polygonColor));
            } else if (i + count < halfCount && (i + 1) % count === 0) {
                const polygonColor = ((Math.floor(i / count) + i % count) % 2 === 0) ? color : 'black';
                polygons.push(new Polygon([i, i + 1 - count, i + 1, i + count], polygonColor));
            }
        }
        for (let i = halfCount; i < points.length - count; i++) {
            if (i + 1 + count < points.length && (i + 1) % count !== 0) {
                const polygonColor = ((Math.floor((i - halfCount) / count) + (i - halfCount) % count) % 2 === 0) ? color : 'black';
                polygons.push(new Polygon([i, i + 1, i + 1 + count, i + count], polygonColor));
            } else if (i + count < points.length && (i + 1) % count === 0) {
                const polygonColor = ((Math.floor((i - halfCount) / count) + (i - halfCount) % count) % 2 === 0) ? color : 'black';
                polygons.push(new Polygon([i, i + 1 - count, i + 1, i + count], polygonColor));
            }
        }

        super(points, edges, polygons);
    }
}

export default HyperbolicCylinder;
