var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all) __defProp(target, name, {
    get: all[name],
    enumerable: true
  });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from)) if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
      get: () => from[key],
      enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
    });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
// If the importer is in node compatibility mode or this is not an ESM
// file that has been converted to a CommonJS file using a Babel-
// compatible transform (i.e. "__esModule" has not been set), then set
// "default" to the CommonJS "module.exports" for node compatibility.
isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", {
  value: mod,
  enumerable: true
}) : target, mod));
var __toCommonJS = mod => __copyProps(__defProp({}, "__esModule", {
  value: true
}), mod);
var createAnimations_exports = {};
__export(createAnimations_exports, {
  createAnimations: () => createAnimations
});
module.exports = __toCommonJS(createAnimations_exports);
var import_animation_helpers = require("@hanzogui/animation-helpers");
var import_core = require("@hanzogui/core");
var import_use_presence = require("@hanzogui/use-presence");
var import_react = __toESM(require("react"), 1);
var import_react_native_reanimated = __toESM(require("react-native-reanimated"), 1);
var import_jsx_runtime = require("react/jsx-runtime");
const getDefaultExport = module2 => {
  const mod = module2;
  if (mod.__esModule || mod[Symbol.toStringTag] === "Module") {
    return mod.default || mod;
  }
  return mod;
};
const Animated = getDefaultExport(import_react_native_reanimated.default);
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
    animatedValue = (0, import_react_native_reanimated.withTiming)(targetValue, config, callback);
  } else {
    animatedValue = (0, import_react_native_reanimated.withSpring)(targetValue, config, callback);
  }
  if (delay && delay > 0) {
    animatedValue = (0, import_react_native_reanimated.withDelay)(delay, animatedValue);
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
  const Component = Animated.createAnimatedComponent((0, import_react.forwardRef)((propsIn, ref) => {
    const {
      forwardedRef,
      render = defaultTag,
      ...rest
    } = propsIn;
    const hostRef = (0, import_react.useRef)(null);
    const composedRefs = (0, import_core.useComposedRefs)(forwardedRef, ref, hostRef);
    const stateRef = (0, import_react.useRef)({
      get host() {
        return hostRef.current;
      }
    });
    const [, themeState] = (0, import_core.useThemeWithState)({});
    const result = (0, import_core.getSplitStyles)(rest, isText ? import_core.Text.staticConfig : import_core.View.staticConfig, themeState?.theme ?? {}, themeState?.name ?? "", {
      unmounted: false
    }, {
      isAnimated: false,
      noClass: true
    });
    const viewProps = result?.viewProps ?? {};
    const Element = render;
    const transformedProps = import_core.hooks.usePropsTransform?.(render, viewProps, stateRef, false);
    return /* @__PURE__ */(0, import_jsx_runtime.jsx)(Element, {
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
  const normalized = (0, import_animation_helpers.normalizeTransition)(transition);
  const effectiveKey = (0, import_animation_helpers.getEffectiveAnimation)(normalized, animationState);
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
    View: import_core.isWeb ? AnimatedView : Animated.View,
    Text: import_core.isWeb ? AnimatedText : Animated.Text,
    isReactNative: true,
    inputStyle: "value",
    outputStyle: "inline",
    avoidReRenders: true,
    animations,
    usePresence: import_use_presence.usePresence,
    ResetPresence: import_use_presence.ResetPresence,
    // =========================================================================
    // useAnimatedNumber - For imperative animated values
    // =========================================================================
    useAnimatedNumber(initial) {
      const sharedValue = (0, import_react_native_reanimated.useSharedValue)(initial);
      return (0, import_react.useMemo)(() => ({
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

              (0, import_react_native_reanimated.runOnJS)(onFinish)();
            } : void 0;
            if (import_core.isWeb) {
              sharedValue.value = config.type === "spring" ? (0, import_react_native_reanimated.withSpring)(next, config, cb) : (0, import_react_native_reanimated.withTiming)(next, config, cb);
            } else {
              (0, import_react_native_reanimated.runOnUI)(() => {
                "worklet";

                sharedValue.value = config.type === "spring" ? (0, import_react_native_reanimated.withSpring)(next, config, cb) : (0, import_react_native_reanimated.withTiming)(next, config, cb);
              })();
            }
          }
        },
        stop() {
          (0, import_react_native_reanimated.cancelAnimation)(sharedValue);
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
      return (0, import_react_native_reanimated.useAnimatedReaction)(() => instance.value, (next, prev) => {
        if (prev !== next) {
          (0, import_react_native_reanimated.runOnJS)(onValue)(next);
        }
      }, [onValue, instance]);
    },
    // =========================================================================
    // useAnimatedNumberStyle - Create animated styles from values
    // =========================================================================
    useAnimatedNumberStyle(val, getStyle) {
      const instance = val.getInstance();
      if (import_core.isWeb) {
        return (0, import_react_native_reanimated.useAnimatedStyle)(() => {
          "worklet";

          return getStyle(instance.value);
        }, [instance, getStyle]);
      }
      const styleVal = (0, import_react_native_reanimated.useDerivedValue)(() => {
        "worklet";

        return getStyle(instance.value);
      });
      return (0, import_react_native_reanimated.useAnimatedStyle)(() => {
        "worklet";

        return styleVal.value;
      });
    },
    useAnimatedNumbersStyle(vals, getStyle) {
      const instances = vals.map(v => v.getInstance());
      return (0, import_react_native_reanimated.useAnimatedStyle)(() => {
        "worklet";

        const currentValues = instances.map(inst => inst.value);
        return getStyle(...currentValues);
      }, import_core.isWeb ? [getStyle, ...instances] : void 0);
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
      const wasEnteringRef = (0, import_react.useRef)(isEntering);
      const justFinishedEntering = wasEnteringRef.current && !isEntering;
      import_react.default.useEffect(() => {
        wasEnteringRef.current = isEntering;
      });
      const effectiveTransition = styleState?.effectiveTransition ?? props.transition;
      const normalized = (0, import_animation_helpers.normalizeTransition)(effectiveTransition);
      const animationState = isExiting ? "exit" : isMounting || justFinishedEntering ? "enter" : "default";
      const animationKey = (0, import_animation_helpers.getEffectiveAnimation)(normalized, animationState);
      const disableAnimation = isHydrating || !animationKey;
      const isDark = themeName?.startsWith("dark") || false;
      const sendExitComplete = presence?.[1];
      const exitCycleIdRef = (0, import_react.useRef)(0);
      const pendingExitKeysRef = (0, import_react.useRef)(/* @__PURE__ */new Set());
      const exitCompletedRef = (0, import_react.useRef)(false);
      const wasExitingRef = (0, import_react.useRef)(false);
      const justStartedExiting = isExiting && !wasExitingRef.current;
      const justStoppedExiting = !isExiting && wasExitingRef.current;
      const markExitKeyDone = (0, import_core.useEvent)((key, cycleId, finished) => {
        if (cycleId !== exitCycleIdRef.current) return;
        if (exitCompletedRef.current) return;
        pendingExitKeysRef.current.delete(key);
        if (pendingExitKeysRef.current.size === 0) {
          exitCompletedRef.current = true;
          sendExitComplete?.();
        }
      });
      const isExitingRef = (0, import_react_native_reanimated.useSharedValue)(isExiting);
      const exitCycleIdShared = (0, import_react_native_reanimated.useSharedValue)(exitCycleIdRef.current);
      if (justStartedExiting) {
        exitCycleIdRef.current++;
        exitCompletedRef.current = false;
        pendingExitKeysRef.current.clear();
      }
      if (justStoppedExiting) {
        exitCycleIdRef.current++;
        pendingExitKeysRef.current.clear();
      }
      (0, import_core.useIsomorphicLayoutEffect)(() => {
        isExitingRef.value = isExiting;
        exitCycleIdShared.value = exitCycleIdRef.current;
      }, [isExiting, exitCycleIdRef.current]);
      import_react.default.useEffect(() => {
        wasExitingRef.current = isExiting;
      });
      const animatedTargetsRef = (0, import_react_native_reanimated.useSharedValue)(null);
      const staticTargetsRef = (0, import_react_native_reanimated.useSharedValue)(null);
      const transformTargetsRef = (0, import_react_native_reanimated.useSharedValue)(null);
      const {
        animatedStyles,
        staticStyles
      } = (0, import_react.useMemo)(() => {
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
      } = (0, import_react.useMemo)(() => {
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
      const configRef = (0, import_react_native_reanimated.useSharedValue)({
        baseConfig,
        propertyConfigs,
        disableAnimation,
        isHydrating
      });
      (0, import_core.useIsomorphicLayoutEffect)(() => {
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
      const exitKeysRegistered = (0, import_react.useRef)(false);
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
      import_react.default.useEffect(() => {
        if (!justStartedExiting || !sendExitComplete) return;
        if (!exitKeysRegistered.current && pendingExitKeysRef.current.size === 0) {
          if (!exitCompletedRef.current) {
            exitCompletedRef.current = true;
            sendExitComplete();
          }
        }
      }, [justStartedExiting, sendExitComplete]);
      const animatedStyle = (0, import_react_native_reanimated.useAnimatedStyle)(() => {
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

              (0, import_react_native_reanimated.runOnJS)(markExitKeyDone)(capturedKey, capturedCycleId, finished ?? false);
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

                  (0, import_react_native_reanimated.runOnJS)(markExitKeyDone)(capturedKey, capturedCycleId, finished ?? false);
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
      }, import_core.isWeb ? [animatedStyles, baseConfig, propertyConfigs, disableAnimation, isHydrating,
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