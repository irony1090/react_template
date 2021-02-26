import { FC } from "react";
import SwipperJs from './swiper_';

export interface SpringConfig {
  duration: string;
  easeFunction: string;
  delay: string;
}

export type SwipperProps = {
  auto?: any,
  animateHeight?: boolean;
  animateTransitions?: boolean;
  axis?: "x" | "x-reverse" | "y" | "y-reverse";
  containerStyle?: React.CSSProperties;
  disabled?: boolean;
  /*
   * This is the config used to disable lazy loading, if true it will render all the views in first rendering.
   */
  disableLazyLoading?: boolean;
  enableMouseEvents?: boolean;
  hysteresis?: number;
  ignoreNativeScroll?: boolean;
  index?: number;
  onChangeIndex?: (index: number, indexLatest: number) => void;
  onSwitching?: (index: number, type: "move" | "end") => void;
  onTransitionEnd?: () => void;
  resistance?: boolean;
  style?: React.CSSProperties;
  slideStyle?: React.CSSProperties;
  springConfig?: SpringConfig;
  slideClassName?: string;
  threshold?: number;
}
const Swipper:FC<SwipperProps> = ({children, auto, ...swipperProps}) => {
  return (<SwipperJs {...swipperProps} auto={auto}>{children}</SwipperJs>)
}

export default Swipper;