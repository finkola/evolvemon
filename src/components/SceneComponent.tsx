/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import "@babylonjs/loaders/glTF";
import { MeshBuilder } from "@babylonjs/core/Meshes";
import {
  DirectionalLight,
  Engine,
  FreeCamera,
  HemisphericLight,
  Scene,
  Vector3,
} from "@babylonjs/core";
import { useLayoutEffect, useRef } from "react";

const createScene = (canvas: any) => {
  const engine = new Engine(canvas);
  const scene = new Scene(engine);

  const camera = new FreeCamera("camera1", new Vector3(11, 40, 40), scene);
  camera.setTarget(Vector3.Zero());
  camera.attachControl(canvas, true);

  const light = new DirectionalLight("dir01", new Vector3(0, -1, 1), scene);
  light.position = new Vector3(0, 50, -100);

  const box = MeshBuilder.CreateBox("box", {}, scene);
  //const peasant = SceneLoader.ImportMesh();

  //const shadowGenerator = new ShadowGenerator(1024, light);

  new HemisphericLight("light", Vector3.Up(), scene);

  return scene;
};

export const SceneComponent = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  //const { data, status } = useLoadAssets(scene);

  useLayoutEffect(() => {
    if (!canvasRef.current) {
      return;
    }
    const canvas = canvasRef.current;
    const scene = createScene(canvas);

    let timerId: number;
    //Frame-rate to draw sprites at
    const renderFps = 120;
    let renderStart = 0;
    const renderFrameDuration = 1000 / renderFps;
    //Frame-rate for physics, and collision calculations
    const simFps = 60;
    let previous = 0;
    const simFrameDuration = 1000 / simFps;
    let lag = 0;

    canvas.width = 1600;
    canvas.height = 1200;

    //Game Loop
    timerId = requestAnimationFrame(draw);

    function draw(timestamp: number) {
      timerId = requestAnimationFrame(draw);

      if (!timestamp) {
        timestamp = 0;
      }
      let elapsed = timestamp - previous;
      if (elapsed > 1000) {
        elapsed = simFrameDuration;
      }
      lag += elapsed;

      //Logic
      while (lag >= simFrameDuration) {
        lag -= simFrameDuration;
      }
      //Rendering
      const lagOffset = lag / simFrameDuration;
      if (timestamp >= renderStart) {
        scene.render();
        renderStart = timestamp + renderFrameDuration;
      }
      previous = timestamp;
    }
    //Cleanup function triggers when useLayoutEffect is called again.
    return () => {
      cancelAnimationFrame(timerId);
    };
  }, []);

  return (
    <div
      style={{
        display: "flex",
        margin: "20px 0 20px 0",
        border: "3px solid #1d257a",
        width: "1620px",
        height: "1220px",
      }}
    >
      <canvas ref={canvasRef}></canvas>
    </div>
  );
};
