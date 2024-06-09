import React, { useEffect } from "react";
import Graph, { TWIN3D } from "../../modules/Graph/Graph";
import { Math3D, Ellipsoid, Pyramid, Cone, Cube, Sphere, Torus, Point, Edge, Polygon, EDistance, Surface, Light, Cylinder, ellipticalCylinder, ellipticalParaboloid, hyperboliccylinder, hyperbolicParaboloid, oneSheetedHyperboloid, paraboliccylinder, twoSheetedHyperboloid } from "../../modules/Math3D"
import Checkbox3D from "./Checkbox3D/Checkbox3D";
import Select3D from "./Select3D/Select3D";


export enum ECustom {
    canMove = 'canMove',
    mouse0 = 'mouse0',
    mouse1 = 'mouse1',
    mouse2 = 'mouse2',
    drawPoints = 'drawPoints',
    drawEdges = 'drawEdges',
    drawPolygons = 'drawPolygons'
}

export enum EScene {
    ellipsoid = 'ellipsoid',
    pyramid = 'pyramid',
    sphere = 'sphere',
    cone = 'cone',
    cube = 'cube',
    torus = 'torus',
    cylinder = 'cylinder',
    ellipticalCylinder = 'ellipticalCylinder',
    ellipticalParaboloid = 'ellipticalParaboloid',
    hyperboliccylinder = 'hyperboliccylinder',
    hyperbolicParaboloid = 'hyperbolicParaboloid',
    oneSheetedHyperboloid = 'oneSheetedHyperboloid',
    paraboliccylinder = 'paraboliccylinder',
    twoSheetedHyperboloid = 'twoSheetedHyperboloid'
}

const Graph3D: React.FC = () => {
    let graph: Graph | null = null;
    const WIN: TWIN3D = {
        left: -5,
        bottom: -5,
        width: 10,
        height: 10,
        center: new Point(0, 0, -30),
        camera: new Point(0, 0, -50),
    }
    const math3D: Math3D = new Math3D({ WIN });
    const light = new Light(-40, 15, 0, 1500);
    const canvasId = 'graph3DCanvas';
    let scene: Surface[] = [];
    let dx: number = 0;
    let dy: number = 0;

    const custom = {
        [ECustom.canMove]: false,
        [ECustom.mouse0]: false,
        [ECustom.mouse1]: false,
        [ECustom.mouse2]: false,
        [ECustom.drawPoints]: true,
        [ECustom.drawEdges]: true,
        [ECustom.drawPolygons]: true
    }

    const scenes = {
        [EScene.ellipsoid]: [new Ellipsoid()],
        [EScene.pyramid]: [new Pyramid()],
        [EScene.sphere]: [new Sphere()],
        [EScene.cone]: [new Cone()],
        [EScene.cube]: [new Cube()],
        [EScene.torus]: [new Torus()],
        [EScene.cylinder]: [new Cylinder()],
        [EScene.ellipticalCylinder]: [new ellipticalCylinder()],
        [EScene.ellipticalParaboloid]: [new ellipticalParaboloid()],
        [EScene.hyperboliccylinder]: [new hyperboliccylinder()],
        [EScene.hyperbolicParaboloid]: [new hyperbolicParaboloid()],
        [EScene.oneSheetedHyperboloid]: [new oneSheetedHyperboloid()],
        [EScene.paraboliccylinder]: [new paraboliccylinder()],
        [EScene.twoSheetedHyperboloid]: [new twoSheetedHyperboloid()]
    }

    const mouseup = (event: MouseEvent): void => {
        switch (event.button) {
            case 0:
                custom.mouse0 = false;
                break;
            case 1:
                custom.mouse1 = false;
                break;
            case 2:
                custom.mouse2 = false;
                break;
        }
    }

    const mouseleave = (): void => {
        custom.mouse0 = false;
        custom.mouse1 = false;
        custom.mouse2 = false;
    }

    const mousedown = (event: MouseEvent): void => {
        switch (event.button) {
            case 0:
                custom.mouse0 = true;
                break;
            case 1:
                custom.mouse1 = true;
                break;
            case 2:
                custom.mouse2 = true;
                break;
        }
    }

    const wheel = (event: WheelEvent): void => {
        event.preventDefault();
        const delta = (event.deltaY < 0) ? 1.2 : 0.8;
        const matrix = math3D.zoom(delta);
        scene.forEach(surface => {
            surface.points.forEach(point => math3D.transform(matrix, point));
            math3D.transform(matrix, surface.center);
        });
    }

    const mousemove = (event: MouseEvent): void => {
        if (custom.mouse0 || custom.mouse2) {
            const gradus = Math.PI / 180 / 4;
            const matrix = math3D.getTransform(
                math3D.rotateOx((dy - event.offsetY) * gradus),
                custom.mouse2 ?
                    math3D.rotateOz((dx - event.offsetX) * gradus) :
                    math3D.rotateOy((dx - event.offsetX) * gradus)
            );
            scene.forEach((surface: Surface) => {
                surface.points.forEach((point: Point) => math3D.transform(matrix, point))
                math3D.transform(matrix, surface.center);
            });
        }
        if (custom.mouse1) {
            const offset = 0.05;
            const matrix = math3D.move(
                (dx - event.offsetX) * -offset,
                (dy - event.offsetY) * offset,
                0
            );
            scene.forEach((surface: Surface) => {
                surface.points.forEach((point: Point) => math3D.transform(matrix, point));
                math3D.transform(matrix, surface.center);
            });
        }
        dx = event.offsetX;
        dy = event.offsetY;
    }

    const lightvaluechange = (event: React.ChangeEvent<HTMLInputElement>): any => {
        light.lumen = Number(event.target.value)
    }

    const renderScene = (fps: number): void => {
        if (graph) {
            graph.clear();

            if (custom.drawPolygons) {
                const polygons: Polygon[] = [];
                scene.forEach((surface: Surface, index: number) => {
                    math3D.calcDistance(surface, WIN.camera, EDistance.distance);
                    math3D.calcDistance(surface, light, EDistance.lumen);
                    surface.polygons.forEach((polygon: Polygon, indexOfPolygon: number) => {
                        polygon.indexOfPolygon = indexOfPolygon;
                        polygon.index = index;
                        polygons.push(polygon);
                    });
                });
                math3D.sortByArtistAlgorithm(polygons);
                polygons.forEach(polygon => {
                    const points = polygon.points.map(
                        index => new Point(
                            math3D.xs(scene[polygon.index].points[index]),
                            math3D.ys(scene[polygon.index].points[index])
                        )
                    );
                    const lumen = math3D.calcIllumination(polygon.lumen, light.lumen);
                    let { r, g, b } = polygon.color;
                    r = Math.round(r * lumen);
                    g = Math.round(g * lumen);
                    b = Math.round(b * lumen);
                    if (graph){
                        if (polygon.visibility){
                        graph.polygon(points, polygon.rgbToHex(r, g, b));
                        // graph.text((points[0].x+points[2].x)/2,(points[0].y+points[2].y)/2,polygon.indexOfPolygon.toString(), 'black')
                }}});
            }

            if (custom.drawEdges) {
                scene.forEach((surface: Surface) => {
                    surface.edges.forEach((edge: Edge) => {
                        const point1 = surface.points[edge.p1];
                        const point2 = surface.points[edge.p2];
                        if (graph)
                            graph.line(math3D.xs(point1), math3D.ys(point1), math3D.xs(point2), math3D.ys(point2));
                    });
                });
            }

            if (custom.drawPoints) {
                scene.forEach((surface: Surface) => {
                    surface.points.forEach((point: Point, index: number) => {
                        if (graph) {
                            // graph.text(math3D.xs(point), math3D.ys(point),index.toString(),'black') //ИНДЕКС ТОЧЕК
                            graph.point(math3D.xs(point), math3D.ys(point));
                        }
                    });
                });
            }

            graph.text(WIN.left, WIN.bottom, fps.toString());
        }
    }

    const changeValue = (flag: ECustom, value: boolean): void => {
        custom[flag] = value;
    }

    const changeScene = (flag: EScene) => {
        scene = scenes[flag];
    }

    useEffect(() => {
        graph = new Graph({
            id: canvasId,
            width: 600,
            height: 600,
            WIN,
            callbacks: { wheel, mousemove, mouseleave, mouseup, mousedown }
        });

        const interval = setInterval(() => {
            scene.forEach(surface => surface.doAnimation(math3D));
        }, 50);

        let currentFPS = 0;
        let FPS = 0;
        let timestamp = Date.now();
        let idLoop: number;

        const animLoop = () => {
            FPS++;
            const currentTimestamp = Date.now();
            if (currentTimestamp - timestamp >= 1000) {
                timestamp = currentTimestamp;
                currentFPS = FPS;
                FPS = 0;
            }

            renderScene(currentFPS);

            idLoop = window.requestAnimationFrame(animLoop);
        }

        animLoop();

        return () => {
            graph = null;
            window.cancelAnimationFrame(idLoop);
            clearInterval(interval);
        }
    }, [graph]);

    changeScene(EScene.ellipsoid);

    return (<div>
        <canvas id={canvasId}></canvas>
        <div>
            <Checkbox3D
                text="Точки"
                id="points"
                custom={ECustom.drawPoints}
                customValue={custom[ECustom.drawPoints]}
                changeValue={changeValue}
            />
            <Checkbox3D
                text="Ребра"
                id="edges"
                custom={ECustom.drawEdges}
                customValue={custom[ECustom.drawEdges]}
                changeValue={changeValue}
            />
            <Checkbox3D
                text="Полигоны"
                id="polygons"
                custom={ECustom.drawPolygons}
                customValue={custom[ECustom.drawPolygons]}
                changeValue={changeValue}
            />
            <label htmlFor="lightrange">Яркость:</label>
            <input type="range" id="lightrange" name="light" min="0" max="3000" defaultValue='1500' onChange={lightvaluechange} />
        </div>
        <Select3D
            scenes={[
                { scene: EScene.ellipsoid, text: "Элипсоид" },
                // { scene: EScene.pyramid, text: "Пирамида" },
                { scene: EScene.cone, text: "Конус" },
                { scene: EScene.sphere, text: "Сфера" },
                { scene: EScene.cube, text: "Куб" },
                { scene: EScene.torus, text: "Тор" },
                { scene: EScene.cylinder, text: "Цилиндр" },
                { scene: EScene.ellipticalCylinder, text: "Элиптический цилиндр" },
                { scene: EScene.ellipticalParaboloid, text: "Элиптический параболойд" },
                { scene: EScene.hyperboliccylinder, text: "Гиберолический цилиндр" },
                { scene: EScene.hyperbolicParaboloid, text: "Гиберолический параболойд" },
                { scene: EScene.oneSheetedHyperboloid, text: "Однополосный гиберболойд" },
                { scene: EScene.paraboliccylinder, text: "Пароболический цилиндр" },
                { scene: EScene.twoSheetedHyperboloid, text: "Двухполосный гиберболойд" },
            ]}
            id="selectedSurface"
            changeScene={changeScene}
        />
    </div>);
}

export default Graph3D;
