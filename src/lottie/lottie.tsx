import lottie, { AnimationItem } from "lottie-web";
import React, { useEffect, useMemo, useRef } from "react";
import { v4 as uuid } from "uuid";

export type LottieProps = {
  height?: number | string;
  width?: number | string;
  image?: unknown;
  path?: string;
  animationData?: unknown;
  loop?: boolean;
  pause?: boolean;
  viewBoxSize?: string;
} & React.HTMLAttributes<HTMLDivElement>;

function useHandlePause(pause: boolean, id: string) {
  useEffect(() => {
    if (pause) {
      lottie.pause(id);
    }
    if (!pause) {
      lottie.play(id);
    }
  }, [pause, id]);
}

export const Lottie = (props: LottieProps) => {
  const {
    height = "100%",
    width = "100%",
    image,
    animationData,
    path,
    loop,
    viewBoxSize,
    pause = false,
    ...divProps
  } = props;
  const ref = useRef<HTMLDivElement>(null);
  const id = useMemo(uuid, []);
  const controls = useRef<AnimationItem>(null);
  useEffect(() => {
    if (ref.current) {
      // @ts-ignore
      const internalControls = lottie.loadAnimation({
        name: id,
        path,
        animationData,
        container: ref.current,
        loop,
        rendererSettings: {
          viewBoxSize,
          preserveAspectRatio: "xMidYMid slice",
        },
      });
      // @ts-ignore
      controls.current = internalControls;
      return () => {
        internalControls.destroy(id);
      };
    }
  }, [ref]);
  useHandlePause(pause, id);
  useEffect(() => {
    if (controls.current) {
      controls.current.setLoop(loop ?? true);
    }
  }, [loop, controls.current]);
  return useMemo(
    () => (
      <div
        key={"same-element"}
        {...divProps}
        style={{ width: width, height: height }}
        ref={ref}
      />
    ),
    [],
  );
};
