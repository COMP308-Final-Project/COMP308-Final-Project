import React from "react";
import { Unity, useUnityContext } from "react-unity-webgl";

export default function FitnessGame() {
  const { unityProvider } = useUnityContext({
    loaderUrl: "FitnessGameBuild/Build/FitnessGameBuild.loader.js",
    dataUrl: "FitnessGameBuild/Build/FitnessGameBuild.data",
    frameworkUrl: "FitnessGameBuild/Build/FitnessGameBuild.framework.js",
    codeUrl: "FitnessGameBuild/Build/FitnessGameBuild.wasm",
  });

  return (
    <div>
      <h1>Fitness Game</h1>
      <Unity
        unityProvider={unityProvider}
        style={{ width: 960, height: 540 }}
      />
    </div>
  );
}
