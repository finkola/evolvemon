import { type Scene, SceneLoader } from "@babylonjs/core";
import { useQuery } from "@tanstack/react-query";

export const useLoadAssets = (scene: Scene | undefined) => {
  return useQuery({
    queryKey: ["assets", scene?.uid],
    queryFn: async () => {
      const res = SceneLoader.ImportMeshAsync(
        "",
        "https://shdw-drive.genesysgo.net/AKD4TY8YKRzSkKpd6us4xYAFKdrCdC1D3D8P5Pe8yCLb/peasant.gltf",
        "peasant.gltf"
      );
      return res;
    },
    enabled: !!scene,
  });
};
