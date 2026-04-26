import { getEffectiveAnimation, normalizeTransition } from "@hanzogui/animation-helpers";
import { getSplitStyles, hooks, isWeb, Text, useComposedRefs, useEvent, useIsomorphicLayoutEffect, useThemeWithState, View } from "@hanzogui/core";
import { ResetPresence, usePresence } from "@hanzogui/use-presence";
import React, { forwardRef, useMemo, useRef } from "react";
import Animated_, { cancelAnimation, runOnJS, runOnUI, useAnimatedReaction, useAnimatedStyle, useDerivedValue, useSharedValue, withDelay, withSpring, withTiming } from "react-native-reanimated";
import { jsx } from "react/jsx-runtime";
const getDefaultExport = module => {
  const mod = module;
  if (mod.__esModule || mod[Symbol.toStringTag] === "Module") {
    return mod.default || mod;
  }
  return mod;
};
const Animated = getDefaultExport(Animated_);
const resolveDynamicValue = (value, isDark) => {
  if (value !== null && typeof value === "object" && "dynamic" in value && typeof value.dynamic === "object") {
    const dynamic = value.dynamic;
    return isDark ? dynamic.dark : dynamic.light;
  }
  return value;
};
const applyAnimation = (targetValue, config, callback) => {
  "worklet";

  const delay = config.delay;
  let animatedValue;
  if (config.type === "timing") {
    animatedValue = withTiming(targetValue, config, callback);
  } else {
    animatedValue = withSpring(targetValue, config, callback);
  }
  if (delay && delay > 0) {
    animatedValue = withDelay(delay, animatedValue);
  }
  return animatedValue;
};
const ANIMATABLE_PROPERTIES = {
  // Transform
  transform: true,
  // Opacity
  opacity: true,
  // Dimensions
  height: true,
  width: true,
  minWidth: true,
  minHeight: true,
  maxWidth: true,
  maxHeight: true,
  // Background
  backgroundColor: true,
  // Border colors
  borderColor: true,
  borderLeftColor: true,
  borderRightColor: true,
  borderTopColor: true,
  borderBottomColor: true,
  // Border radius
  borderRadius: true,
  borderTopLeftRadius: true,
  borderTopRightRadius: true,
  borderBottomLeftRadius: true,
  borderBottomRightRadius: true,
  // Border width
  borderWidth: true,
  borderLeftWidth: true,
  borderRightWidth: true,
  borderTopWidth: true,
  borderBottomWidth: true,
  // Text
  color: true,
  fontSize: true,
  fontWeight: true,
  lineHeight: true,
  letterSpacing: true,
  // Position
  left: true,
  right: true,
  top: true,
  bottom: true,
  // Margin
  margin: true,
  marginTop: true,
  marginBottom: true,
  marginLeft: true,
  marginRight: true,
  marginHorizontal: true,
  marginVertical: true,
  // Padding
  padding: true,
  paddingTop: true,
  paddingBottom: true,
  paddingLeft: true,
  paddingRight: true,
  paddingHorizontal: true,
  paddingVertical: true,
  // Flex/Gap
  gap: true,
  rowGap: true,
  columnGap: true,
  flex: true,
  flexGrow: true,
  flexShrink: true
};
const canAnimateProperty = (key, value, animateOnly) => {
  if (!ANIMATABLE_PROPERTIES[key]) return false;
  if (value === "auto") return false;
  if (typeof value === "string" && value.startsWith("calc")) return false;
  if (animateOnly && !animateOnly.includes(key)) return false;
  return true;
};
function createWebAnimatedComponent(defaultTag) {
  const isText = defaultTag === "span";
  const Component = Animated.createAnimatedComponent(forwardRef((propsIn, ref) => {
    const {
      forwardedRef,
      render = defaultTag,
      ...rest
    } = propsIn;
    const hostRef = useRef(null);
    const composedRefs = useComposedRefs(forwardedRef, ref, hostRef);
    const stateRef = useRef({
      get host() {
        return hostRef.current;
      }
    });
    const [, themeState] = useThemeWithState({});
    const result = getSplitStyles(rest, isText ? Text.staticConfig : View.staticConfig, themeState?.theme ?? {}, themeState?.name ?? "", {
      unmounted: false
    }, {
      isAnimated: false,
      noClass: true
    });
    const viewProps = result?.viewProps ?? {};
    const Element = render;
    const transformedProps = hooks.usePropsTransform?.(render, viewProps, stateRef, false);
    return /* @__PURE__ */jsx(Element, {
      ...transformedProps,
      ref: composedRefs
    });
  }));
  Component.acceptRenderProp = true;
  return Component;
}
const AnimatedView = createWebAnimatedComponent("div");
const AnimatedText = createWebAnimatedComponent("span");
function buildTransitionConfig(transition, animations, animationState, styleKeys) {
  const normalized = normalizeTransition(transition);
  const effectiveKey = getEffectiveAnimation(normalized, animationState);
  let base = effectiveKey ? animations[effectiveKey] ?? {
    type: "spring"
  } : {
    type: "spring"
  };
  if (normalized.delay) {
    base = {
      ...base,
      delay: normalized.delay
    };
  }
  if (normalized.config) {
    base = {
      ...base,
      ...normalized.config
    };
    if (base.type !== "timing" && normalized.config.duration !== void 0 && normalized.config.damping === void 0 && normalized.config.stiffness === void 0 && normalized.config.mass === void 0) {
      base = {
        ...base,
        type: "timing"
      };
    }
  }
  const propertyConfigs = {};
  for (const key of styleKeys) {
    const propAnimation = normalized.properties[key];
    if (typeof propAnimation === "string") {
      propertyConfigs[key] = animations[propAnimation] ?? base;
    } else if (propAnimation && typeof propAnimation === "object") {
      const configType = propAnimation.type;
      const baseForProp = configType ? animations[configType] ?? base : base;
      propertyConfigs[key] = {
        ...baseForProp,
        ...propAnimation
      };
    } else {
      propertyConfigs[key] = base;
    }
  }
  return {
    baseConfig: base,
    propertyConfigs
  };
}
function getStyleKeys(style) {
  const keys = new Set(Object.keys(style));
  if (style.transform && Array.isArray(style.transform)) {
    for (const t of style.transform) {
      if (t && typeof t === "object") {
        keys.add(Object.keys(t)[0]);
      }
    }
  }
  return keys;
}
function createAnimations(animationsConfig) {
  const animations = {};
  for (const key in animationsConfig) {
    animations[key] = {
      type: "spring",
      ...animationsConfig[key]
    };
  }
  return {
    needsCustomComponent: true,
    View: isWeb ? AnimatedView : Animated.View,
    Text: isWeb ? AnimatedText : Animated.Text,
    isReactNative: true,
    inputStyle: "value",
    outputStyle: "inline",
    avoidReRenders: true,
    animations,
    usePresence,
    ResetPresence,
    // =========================================================================
    // useAnimatedNumber - For imperative animated values
    // =========================================================================
    useAnimatedNumber(initial) {
      const sharedValue = useSharedValue(initial);
      return useMemo(() => ({
        getInstance() {
          "worklet";

          return sharedValue;
        },
        getValue() {
          "worklet";

          return sharedValue.value;
        },
        setValue(next, config = {
          type: "spring"
        }, onFinish) {
          if (config.type === "direct") {
            sharedValue.value = next;
            onFinish?.();
          } else {
            const cb = onFinish ? () => {
              "worklet";

              runOnJS(onFinish)();
            } : void 0;
            if (isWeb) {
              sharedValue.value = config.type === "spring" ? withSpring(next, config, cb) : withTiming(next, config, cb);
            } else {
              runOnUI(() => {
                "worklet";

                sharedValue.value = config.type === "spring" ? withSpring(next, config, cb) : withTiming(next, config, cb);
              })();
            }
          }
        },
        stop() {
          cancelAnimation(sharedValue);
        }
      }), [sharedValue]);
    },
    // =========================================================================
    // useAnimatedNumberReaction - React to animated value changes
    // =========================================================================
    useAnimatedNumberReaction({
      value
    }, onValue) {
      const instance = value.getInstance();
      return useAnimatedReaction(() => instance.value, (next, prev) => {
        if (prev !== next) {
          runOnJS(onValue)(next);
        }
      }, [onValue, instance]);
    },
    // =========================================================================
    // useAnimatedNumberStyle - Create animated styles from values
    // =========================================================================
    useAnimatedNumberStyle(val, getStyle) {
      const instance = val.getInstance();
      if (isWeb) {
        return useAnimatedStyle(() => {
          "worklet";

          return getStyle(instance.value);
        }, [instance, getStyle]);
      }
      const styleVal = useDerivedValue(() => {
        "worklet";

        return getStyle(instance.value);
      });
      return useAnimatedStyle(() => {
        "worklet";

        return styleVal.value;
      });
    },
    useAnimatedNumbersStyle(vals, getStyle) {
      const instances = vals.map(v => v.getInstance());
      return useAnimatedStyle(() => {
        "worklet";

        const currentValues = instances.map(inst => inst.value);
        return getStyle(...currentValues);
      }, isWeb ? [getStyle, ...instances] : void 0);
    },
    // =========================================================================
    // useAnimations - Main animation hook for components
    // =========================================================================
    useAnimations(animationProps) {
      const {
        props,
        presence,
        style,
        componentState,
        useStyleEmitter,
        themeName,
        stateRef,
        styleState
      } = animationProps;
      const isHydrating = componentState.unmounted === true;
      const isMounting = componentState.unmounted === "should-enter";
      const isEntering = !!componentState.unmounted;
      const isExiting = presence?.[0] === false;
      const wasEnteringRef = useRef(isEntering);
      const justFinishedEntering = wasEnteringRef.current && !isEntering;
      React.useEffect(() => {
        wasEnteringRef.current = isEntering;
      });
      const effectiveTransition = styleState?.effectiveTransition ?? props.transition;
      const normalized = normalizeTransition(effectiveTransition);
      const animationState = isExiting ? "exit" : isMounting || justFinishedEntering ? "enter" : "default";
      const animationKey = getEffectiveAnimation(normalized, animationState);
      const disableAnimation = isHydrating || !animationKey;
      const isDark = themeName?.startsWith("dark") || false;
      const sendExitComplete = presence?.[1];
      const exitCycleIdRef = useRef(0);
      const pendingExitKeysRef = useRef(/* @__PURE__ */new Set());
      const exitCompletedRef = useRef(false);
      const wasExitingRef = useRef(false);
      const justStartedExiting = isExiting && !wasExitingRef.current;
      const justStoppedExiting = !isExiting && wasExitingRef.current;
      const markExitKeyDone = useEvent((key, cycleId, finished) => {
        if (cycleId !== exitCycleIdRef.current) return;
        if (exitCompletedRef.current) return;
        pendingExitKeysRef.current.delete(key);
        if (pendingExitKeysRef.current.size === 0) {
          exitCompletedRef.current = true;
          sendExitComplete?.();
        }
      });
      const isExitingRef = useSharedValue(isExiting);
      const exitCycleIdShared = useSharedValue(exitCycleIdRef.current);
      if (justStartedExiting) {
        exitCycleIdRef.current++;
        exitCompletedRef.current = false;
        pendingExitKeysRef.current.clear();
      }
      if (justStoppedExiting) {
        exitCycleIdRef.current++;
        pendingExitKeysRef.current.clear();
      }
      useIsomorphicLayoutEffect(() => {
        isExitingRef.value = isExiting;
        exitCycleIdShared.value = exitCycleIdRef.current;
      }, [isExiting, exitCycleIdRef.current]);
      React.useEffect(() => {
        wasExitingRef.current = isExiting;
      });
      const animatedTargetsRef = useSharedValue(null);
      const staticTargetsRef = useSharedValue(null);
      const transformTargetsRef = useSharedValue(null);
      const {
        animatedStyles,
        staticStyles
      } = useMemo(() => {
        const animated = {};
        const staticStyles2 = {};
        const animateOnly = props.animateOnly;
        for (const key in style) {
          const rawValue = style[key];
          const value = resolveDynamicValue(rawValue, isDark);
          if (value === void 0) continue;
          if (disableAnimation) {
            staticStyles2[key] = value;
            continue;
          }
          if (canAnimateProperty(key, value, animateOnly)) {
            animated[key] = value;
          } else {
            staticStyles2[key] = value;
          }
        }
        if (isMounting) {
          for (const key in animated) {
            staticStyles2[key] = animated[key];
          }
        }
        return {
          animatedStyles: animated,
          staticStyles: staticStyles2
        };
      }, [disableAnimation, style, isDark, isMounting, props.animateOnly]);
      const {
        baseConfig,
        propertyConfigs
      } = useMemo(() => {
        if (isHydrating) {
          return {
            baseConfig: {
              type: "timing",
              duration: 0
            },
            propertyConfigs: {}
          };
        }
        return buildTransitionConfig(props.transition, animations, animationState, getStyleKeys(animatedStyles));
      }, [isHydrating, props.transition, animatedStyles, animationState]);
      const configRef = useSharedValue({
        baseConfig,
        propertyConfigs,
        disableAnimation,
        isHydrating
      });
      useIsomorphicLayoutEffect(() => {
        configRef.set({
          baseConfig,
          propertyConfigs,
          disableAnimation,
          isHydrating
        });
      }, [baseConfig, propertyConfigs, disableAnimation, isHydrating]);
      useStyleEmitter?.((nextStyle, effectiveTransition2) => {
        const animateOnly = props.animateOnly;
        const animated = {};
        const statics = {};
        const transforms = [];
        const transitionToUse = effectiveTransition2 ?? props.transition;
        const {
          baseConfig: newBase,
          propertyConfigs: newPropertyConfigs
        } = buildTransitionConfig(transitionToUse, animations, animationState, getStyleKeys(nextStyle));
        configRef.set({
          baseConfig: newBase,
          propertyConfigs: newPropertyConfigs,
          disableAnimation: configRef.get().disableAnimation,
          isHydrating: configRef.get().isHydrating
        });
        for (const key in nextStyle) {
          const rawValue = nextStyle[key];
          const value = resolveDynamicValue(rawValue, isDark);
          if (value == void 0) continue;
          if (configRef.get().disableAnimation) {
            statics[key] = value;
            continue;
          }
          if (key === "transform" && Array.isArray(value)) {
            for (const t of value) {
              if (t && typeof t === "object") {
                const tKey = Object.keys(t)[0];
                const tVal = t[tKey];
                if (typeof tVal === "number" || typeof tVal === "string") {
                  transforms.push(t);
                }
              }
            }
            continue;
          }
          if (canAnimateProperty(key, value, animateOnly)) {
            animated[key] = value;
          } else {
            statics[key] = value;
          }
        }
        animatedTargetsRef.set(animated);
        staticTargetsRef.set(statics);
        transformTargetsRef.set(transforms);
        if (process.env.NODE_ENV === "development" && props.debug && props.debug !== "profile") {
          console.info("[animations-reanimated] useStyleEmitter update", {
            animated,
            statics,
            transforms
          });
        }
      });
      const exitKeysRegistered = useRef(false);
      if (justStartedExiting && sendExitComplete) {
        const exitKeys = [];
        const animateOnly = props.animateOnly;
        for (const key in animatedStyles) {
          if (key === "transform") continue;
          if (canAnimateProperty(key, animatedStyles[key], animateOnly)) {
            exitKeys.push(key);
          }
        }
        const transforms = animatedStyles.transform;
        if (transforms && Array.isArray(transforms)) {
          for (const t of transforms) {
            if (!t) continue;
            const tKey = Object.keys(t)[0];
            if (tKey) {
              if (animateOnly && !animateOnly.includes(tKey)) {
                continue;
              }
              exitKeys.push(`transform:${tKey}`);
            }
          }
        }
        pendingExitKeysRef.current = new Set(exitKeys);
        exitKeysRegistered.current = exitKeys.length > 0;
      }
      React.useEffect(() => {
        if (!justStartedExiting || !sendExitComplete) return;
        if (!exitKeysRegistered.current && pendingExitKeysRef.current.size === 0) {
          if (!exitCompletedRef.current) {
            exitCompletedRef.current = true;
            sendExitComplete();
          }
        }
      }, [justStartedExiting, sendExitComplete]);
      const animatedStyle = useAnimatedStyle(() => {
        "worklet";

        if (disableAnimation || isHydrating) {
          return {};
        }
        const result = {};
        const config = configRef.get();
        const emitterAnimated = animatedTargetsRef.value;
        const emitterStatic = staticTargetsRef.value;
        const emitterTransforms = transformTargetsRef.value;
        const hasEmitterUpdates = emitterAnimated !== null;
        const animatedValues = hasEmitterUpdates ? emitterAnimated : animatedStyles;
        const staticValues = hasEmitterUpdates ? emitterStatic : {};
        const currentlyExiting = isExitingRef.value;
        const currentCycleId = exitCycleIdShared.value;
        for (const key in staticValues) {
          result[key] = staticValues[key];
        }
        for (const key in animatedValues) {
          if (key === "transform") continue;
          const targetValue = animatedValues[key];
          const propConfig = config.propertyConfigs[key] ?? config.baseConfig;
          let callback;
          if (currentlyExiting) {
            const capturedKey = key;
            const capturedCycleId = currentCycleId;
            callback = finished => {
              "worklet";

              runOnJS(markExitKeyDone)(capturedKey, capturedCycleId, finished ?? false);
            };
          }
          result[key] = applyAnimation(targetValue, propConfig, callback);
        }
        const transforms = hasEmitterUpdates ? emitterTransforms : animatedStyles.transform;
        if (transforms && Array.isArray(transforms)) {
          const validTransforms = [];
          for (const t of transforms) {
            if (!t) continue;
            const keys = Object.keys(t);
            if (keys.length === 0) continue;
            const value = t[keys[0]];
            if (typeof value === "number" || typeof value === "string") {
              const transformKey = Object.keys(t)[0];
              const targetValue = t[transformKey];
              const propConfig = config.propertyConfigs[transformKey] ?? config.baseConfig;
              let callback;
              if (currentlyExiting) {
                const capturedKey = `transform:${transformKey}`;
                const capturedCycleId = currentCycleId;
                callback = finished => {
                  "worklet";

                  runOnJS(markExitKeyDone)(capturedKey, capturedCycleId, finished ?? false);
                };
              }
              validTransforms.push({
                [transformKey]: applyAnimation(targetValue, propConfig, callback)
              });
            }
          }
          if (validTransforms.length > 0) {
            result.transform = validTransforms;
          }
        }
        return result;
      }, isWeb ? [animatedStyles, baseConfig, propertyConfigs, disableAnimation, isHydrating,
      // pass SharedValues so the mapper watches them on web (no babel plugin)
      animatedTargetsRef, staticTargetsRef, transformTargetsRef, isExitingRef, exitCycleIdShared, markExitKeyDone] : void 0);
      if (process.env.NODE_ENV === "development" && props.debug && props.debug !== "profile") {
        console.info("[animations-reanimated] useAnimations", {
          animationKey,
          componentState,
          isExiting,
          animatedStyles,
          staticStyles,
          baseConfig,
          propertyConfigs
        });
      }
      return {
        style: [staticStyles, animatedStyle]
      };
    }
  };
}
export { createAnimations };
//# sourceMappingURL=createAnimations.mjs.map
