"use strict";

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
var import_jsx_runtime = require("react/jsx-runtime");
var import_animation_helpers = require("@hanzogui/animation-helpers");
var import_core = require("@hanzogui/core");
var import_use_presence = require("@hanzogui/use-presence");
var import_react = __toESM(require("react"), 1);
var import_react_native_reanimated = __toESM(require("react-native-reanimated"), 1);
function _type_of(obj) {
  "@swc/helpers - typeof";

  return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
}
var getDefaultExport = function (module2) {
  var mod = module2;
  if (mod.__esModule || mod[Symbol.toStringTag] === "Module") {
    return mod.default || mod;
  }
  return mod;
};
var Animated = getDefaultExport(import_react_native_reanimated.default);
var resolveDynamicValue = function (value, isDark) {
  if (value !== null && (typeof value === "undefined" ? "undefined" : _type_of(value)) === "object" && "dynamic" in value && _type_of(value.dynamic) === "object") {
    var dynamic = value.dynamic;
    return isDark ? dynamic.dark : dynamic.light;
  }
  return value;
};
var applyAnimation = function (targetValue, config, callback) {
  "worklet";

  var delay = config.delay;
  var animatedValue;
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
var ANIMATABLE_PROPERTIES = {
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
var canAnimateProperty = function (key, value, animateOnly) {
  if (!ANIMATABLE_PROPERTIES[key]) return false;
  if (value === "auto") return false;
  if (typeof value === "string" && value.startsWith("calc")) return false;
  if (animateOnly && !animateOnly.includes(key)) return false;
  return true;
};
function createWebAnimatedComponent(defaultTag) {
  var isText = defaultTag === "span";
  var Component = Animated.createAnimatedComponent(/* @__PURE__ */(0, import_react.forwardRef)(function (propsIn, ref) {
    var _hooks_usePropsTransform;
    var {
      forwardedRef,
      render = defaultTag,
      ...rest
    } = propsIn;
    var hostRef = (0, import_react.useRef)(null);
    var composedRefs = (0, import_core.useComposedRefs)(forwardedRef, ref, hostRef);
    var stateRef = (0, import_react.useRef)({
      get host() {
        return hostRef.current;
      }
    });
    var [, themeState] = (0, import_core.useThemeWithState)({});
    var _themeState_theme, _themeState_name;
    var result = (0, import_core.getSplitStyles)(rest, isText ? import_core.Text.staticConfig : import_core.View.staticConfig, (_themeState_theme = themeState === null || themeState === void 0 ? void 0 : themeState.theme) !== null && _themeState_theme !== void 0 ? _themeState_theme : {}, (_themeState_name = themeState === null || themeState === void 0 ? void 0 : themeState.name) !== null && _themeState_name !== void 0 ? _themeState_name : "", {
      unmounted: false
    }, {
      isAnimated: false,
      noClass: true
    });
    var _result_viewProps;
    var viewProps = (_result_viewProps = result === null || result === void 0 ? void 0 : result.viewProps) !== null && _result_viewProps !== void 0 ? _result_viewProps : {};
    var Element = render;
    var transformedProps = (_hooks_usePropsTransform = import_core.hooks.usePropsTransform) === null || _hooks_usePropsTransform === void 0 ? void 0 : _hooks_usePropsTransform.call(import_core.hooks, render, viewProps, stateRef, false);
    return /* @__PURE__ */(0, import_jsx_runtime.jsx)(Element, {
      ...transformedProps,
      ref: composedRefs
    });
  }));
  Component.acceptRenderProp = true;
  return Component;
}
var AnimatedView = createWebAnimatedComponent("div");
var AnimatedText = createWebAnimatedComponent("span");
function buildTransitionConfig(transition, animations, animationState, styleKeys) {
  var normalized = (0, import_animation_helpers.normalizeTransition)(transition);
  var effectiveKey = (0, import_animation_helpers.getEffectiveAnimation)(normalized, animationState);
  var _animations_effectiveKey;
  var base = effectiveKey ? (_animations_effectiveKey = animations[effectiveKey]) !== null && _animations_effectiveKey !== void 0 ? _animations_effectiveKey : {
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
  var propertyConfigs = {};
  var _iteratorNormalCompletion = true,
    _didIteratorError = false,
    _iteratorError = void 0;
  try {
    for (var _iterator = styleKeys[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var key = _step.value;
      var propAnimation = normalized.properties[key];
      if (typeof propAnimation === "string") {
        var _animations_propAnimation;
        propertyConfigs[key] = (_animations_propAnimation = animations[propAnimation]) !== null && _animations_propAnimation !== void 0 ? _animations_propAnimation : base;
      } else if (propAnimation && (typeof propAnimation === "undefined" ? "undefined" : _type_of(propAnimation)) === "object") {
        var configType = propAnimation.type;
        var _animations_configType;
        var baseForProp = configType ? (_animations_configType = animations[configType]) !== null && _animations_configType !== void 0 ? _animations_configType : base : base;
        propertyConfigs[key] = {
          ...baseForProp,
          ...propAnimation
        };
      } else {
        propertyConfigs[key] = base;
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return != null) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }
  return {
    baseConfig: base,
    propertyConfigs
  };
}
function getStyleKeys(style) {
  var keys = new Set(Object.keys(style));
  if (style.transform && Array.isArray(style.transform)) {
    var _iteratorNormalCompletion = true,
      _didIteratorError = false,
      _iteratorError = void 0;
    try {
      for (var _iterator = style.transform[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var t = _step.value;
        if (t && (typeof t === "undefined" ? "undefined" : _type_of(t)) === "object") {
          keys.add(Object.keys(t)[0]);
        }
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return != null) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  }
  return keys;
}
function createAnimations(animationsConfig) {
  var animations = {};
  for (var key in animationsConfig) {
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
      var sharedValue = (0, import_react_native_reanimated.useSharedValue)(initial);
      return (0, import_react.useMemo)(function () {
        return {
          getInstance() {
            "worklet";

            return sharedValue;
          },
          getValue() {
            "worklet";

            return sharedValue.value;
          },
          setValue(next) {
            var config = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {
                type: "spring"
              },
              onFinish = arguments.length > 2 ? arguments[2] : void 0;
            if (config.type === "direct") {
              sharedValue.value = next;
              onFinish === null || onFinish === void 0 ? void 0 : onFinish();
            } else {
              var cb = onFinish ? function () {
                "worklet";

                (0, import_react_native_reanimated.runOnJS)(onFinish)();
              } : void 0;
              if (import_core.isWeb) {
                sharedValue.value = config.type === "spring" ? (0, import_react_native_reanimated.withSpring)(next, config, cb) : (0, import_react_native_reanimated.withTiming)(next, config, cb);
              } else {
                (0, import_react_native_reanimated.runOnUI)(function () {
                  "worklet";

                  sharedValue.value = config.type === "spring" ? (0, import_react_native_reanimated.withSpring)(next, config, cb) : (0, import_react_native_reanimated.withTiming)(next, config, cb);
                })();
              }
            }
          },
          stop() {
            (0, import_react_native_reanimated.cancelAnimation)(sharedValue);
          }
        };
      }, [sharedValue]);
    },
    // =========================================================================
    // useAnimatedNumberReaction - React to animated value changes
    // =========================================================================
    useAnimatedNumberReaction(param, onValue) {
      var {
        value
      } = param;
      var instance = value.getInstance();
      return (0, import_react_native_reanimated.useAnimatedReaction)(function () {
        return instance.value;
      }, function (next, prev) {
        if (prev !== next) {
          (0, import_react_native_reanimated.runOnJS)(onValue)(next);
        }
      }, [onValue, instance]);
    },
    // =========================================================================
    // useAnimatedNumberStyle - Create animated styles from values
    // =========================================================================
    useAnimatedNumberStyle(val, getStyle) {
      var instance = val.getInstance();
      if (import_core.isWeb) {
        return (0, import_react_native_reanimated.useAnimatedStyle)(function () {
          "worklet";

          return getStyle(instance.value);
        }, [instance, getStyle]);
      }
      var styleVal = (0, import_react_native_reanimated.useDerivedValue)(function () {
        "worklet";

        return getStyle(instance.value);
      });
      return (0, import_react_native_reanimated.useAnimatedStyle)(function () {
        "worklet";

        return styleVal.value;
      });
    },
    useAnimatedNumbersStyle(vals, getStyle) {
      var instances = vals.map(function (v) {
        return v.getInstance();
      });
      return (0, import_react_native_reanimated.useAnimatedStyle)(function () {
        "worklet";

        var currentValues = instances.map(function (inst) {
          return inst.value;
        });
        return getStyle(...currentValues);
      }, import_core.isWeb ? [getStyle, ...instances] : void 0);
    },
    // =========================================================================
    // useAnimations - Main animation hook for components
    // =========================================================================
    useAnimations(animationProps) {
      var {
        props,
        presence,
        style,
        componentState,
        useStyleEmitter,
        themeName,
        stateRef,
        styleState
      } = animationProps;
      var isHydrating = componentState.unmounted === true;
      var isMounting = componentState.unmounted === "should-enter";
      var isEntering = !!componentState.unmounted;
      var isExiting = (presence === null || presence === void 0 ? void 0 : presence[0]) === false;
      var wasEnteringRef = (0, import_react.useRef)(isEntering);
      var justFinishedEntering = wasEnteringRef.current && !isEntering;
      import_react.default.useEffect(function () {
        wasEnteringRef.current = isEntering;
      });
      var _styleState_effectiveTransition;
      var effectiveTransition = (_styleState_effectiveTransition = styleState === null || styleState === void 0 ? void 0 : styleState.effectiveTransition) !== null && _styleState_effectiveTransition !== void 0 ? _styleState_effectiveTransition : props.transition;
      var normalized = (0, import_animation_helpers.normalizeTransition)(effectiveTransition);
      var animationState = isExiting ? "exit" : isMounting || justFinishedEntering ? "enter" : "default";
      var animationKey = (0, import_animation_helpers.getEffectiveAnimation)(normalized, animationState);
      var disableAnimation = isHydrating || !animationKey;
      var isDark = (themeName === null || themeName === void 0 ? void 0 : themeName.startsWith("dark")) || false;
      var sendExitComplete = presence === null || presence === void 0 ? void 0 : presence[1];
      var exitCycleIdRef = (0, import_react.useRef)(0);
      var pendingExitKeysRef = (0, import_react.useRef)(/* @__PURE__ */new Set());
      var exitCompletedRef = (0, import_react.useRef)(false);
      var wasExitingRef = (0, import_react.useRef)(false);
      var justStartedExiting = isExiting && !wasExitingRef.current;
      var justStoppedExiting = !isExiting && wasExitingRef.current;
      var markExitKeyDone = (0, import_core.useEvent)(function (key3, cycleId, finished) {
        if (cycleId !== exitCycleIdRef.current) return;
        if (exitCompletedRef.current) return;
        pendingExitKeysRef.current.delete(key3);
        if (pendingExitKeysRef.current.size === 0) {
          exitCompletedRef.current = true;
          sendExitComplete === null || sendExitComplete === void 0 ? void 0 : sendExitComplete();
        }
      });
      var isExitingRef = (0, import_react_native_reanimated.useSharedValue)(isExiting);
      var exitCycleIdShared = (0, import_react_native_reanimated.useSharedValue)(exitCycleIdRef.current);
      if (justStartedExiting) {
        exitCycleIdRef.current++;
        exitCompletedRef.current = false;
        pendingExitKeysRef.current.clear();
      }
      if (justStoppedExiting) {
        exitCycleIdRef.current++;
        pendingExitKeysRef.current.clear();
      }
      (0, import_core.useIsomorphicLayoutEffect)(function () {
        isExitingRef.value = isExiting;
        exitCycleIdShared.value = exitCycleIdRef.current;
      }, [isExiting, exitCycleIdRef.current]);
      import_react.default.useEffect(function () {
        wasExitingRef.current = isExiting;
      });
      var animatedTargetsRef = (0, import_react_native_reanimated.useSharedValue)(null);
      var staticTargetsRef = (0, import_react_native_reanimated.useSharedValue)(null);
      var transformTargetsRef = (0, import_react_native_reanimated.useSharedValue)(null);
      var {
        animatedStyles,
        staticStyles
      } = (0, import_react.useMemo)(function () {
        var animated = {};
        var staticStyles2 = {};
        var animateOnly2 = props.animateOnly;
        for (var key3 in style) {
          var rawValue = style[key3];
          var value = resolveDynamicValue(rawValue, isDark);
          if (value === void 0) continue;
          if (disableAnimation) {
            staticStyles2[key3] = value;
            continue;
          }
          if (canAnimateProperty(key3, value, animateOnly2)) {
            animated[key3] = value;
          } else {
            staticStyles2[key3] = value;
          }
        }
        if (isMounting) {
          for (var key1 in animated) {
            staticStyles2[key1] = animated[key1];
          }
        }
        return {
          animatedStyles: animated,
          staticStyles: staticStyles2
        };
      }, [disableAnimation, style, isDark, isMounting, props.animateOnly]);
      var {
        baseConfig,
        propertyConfigs
      } = (0, import_react.useMemo)(function () {
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
      var configRef = (0, import_react_native_reanimated.useSharedValue)({
        baseConfig,
        propertyConfigs,
        disableAnimation,
        isHydrating
      });
      (0, import_core.useIsomorphicLayoutEffect)(function () {
        configRef.set({
          baseConfig,
          propertyConfigs,
          disableAnimation,
          isHydrating
        });
      }, [baseConfig, propertyConfigs, disableAnimation, isHydrating]);
      useStyleEmitter === null || useStyleEmitter === void 0 ? void 0 : useStyleEmitter(function (nextStyle, effectiveTransition2) {
        var animateOnly2 = props.animateOnly;
        var animated = {};
        var statics = {};
        var transforms2 = [];
        var transitionToUse = effectiveTransition2 !== null && effectiveTransition2 !== void 0 ? effectiveTransition2 : props.transition;
        var {
          baseConfig: newBase,
          propertyConfigs: newPropertyConfigs
        } = buildTransitionConfig(transitionToUse, animations, animationState, getStyleKeys(nextStyle));
        configRef.set({
          baseConfig: newBase,
          propertyConfigs: newPropertyConfigs,
          disableAnimation: configRef.get().disableAnimation,
          isHydrating: configRef.get().isHydrating
        });
        for (var key3 in nextStyle) {
          var rawValue = nextStyle[key3];
          var value = resolveDynamicValue(rawValue, isDark);
          if (value == void 0) continue;
          if (configRef.get().disableAnimation) {
            statics[key3] = value;
            continue;
          }
          if (key3 === "transform" && Array.isArray(value)) {
            var _iteratorNormalCompletion2 = true,
              _didIteratorError2 = false,
              _iteratorError2 = void 0;
            try {
              for (var _iterator2 = value[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                var t2 = _step2.value;
                if (t2 && (typeof t2 === "undefined" ? "undefined" : _type_of(t2)) === "object") {
                  var tKey2 = Object.keys(t2)[0];
                  var tVal = t2[tKey2];
                  if (typeof tVal === "number" || typeof tVal === "string") {
                    transforms2.push(t2);
                  }
                }
              }
            } catch (err) {
              _didIteratorError2 = true;
              _iteratorError2 = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
                  _iterator2.return();
                }
              } finally {
                if (_didIteratorError2) {
                  throw _iteratorError2;
                }
              }
            }
            continue;
          }
          if (canAnimateProperty(key3, value, animateOnly2)) {
            animated[key3] = value;
          } else {
            statics[key3] = value;
          }
        }
        animatedTargetsRef.set(animated);
        staticTargetsRef.set(statics);
        transformTargetsRef.set(transforms2);
        if (process.env.NODE_ENV === "development" && props.debug && props.debug !== "profile") {
          console.info("[animations-reanimated] useStyleEmitter update", {
            animated,
            statics,
            transforms: transforms2
          });
        }
      });
      var exitKeysRegistered = (0, import_react.useRef)(false);
      if (justStartedExiting && sendExitComplete) {
        var exitKeys = [];
        var animateOnly = props.animateOnly;
        for (var key2 in animatedStyles) {
          if (key2 === "transform") continue;
          if (canAnimateProperty(key2, animatedStyles[key2], animateOnly)) {
            exitKeys.push(key2);
          }
        }
        var transforms = animatedStyles.transform;
        if (transforms && Array.isArray(transforms)) {
          var _iteratorNormalCompletion = true,
            _didIteratorError = false,
            _iteratorError = void 0;
          try {
            for (var _iterator = transforms[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              var t = _step.value;
              if (!t) continue;
              var tKey = Object.keys(t)[0];
              if (tKey) {
                if (animateOnly && !animateOnly.includes(tKey)) {
                  continue;
                }
                exitKeys.push(`transform:${tKey}`);
              }
            }
          } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion && _iterator.return != null) {
                _iterator.return();
              }
            } finally {
              if (_didIteratorError) {
                throw _iteratorError;
              }
            }
          }
        }
        pendingExitKeysRef.current = new Set(exitKeys);
        exitKeysRegistered.current = exitKeys.length > 0;
      }
      import_react.default.useEffect(function () {
        if (!justStartedExiting || !sendExitComplete) return;
        if (!exitKeysRegistered.current && pendingExitKeysRef.current.size === 0) {
          if (!exitCompletedRef.current) {
            exitCompletedRef.current = true;
            sendExitComplete();
          }
        }
      }, [justStartedExiting, sendExitComplete]);
      var animatedStyle = (0, import_react_native_reanimated.useAnimatedStyle)(function () {
        "worklet";

        var _loop = function (key12) {
          if (key12 === "transform") return "continue";
          var targetValue = animatedValues[key12];
          var _config_propertyConfigs_key;
          var propConfig = (_config_propertyConfigs_key = config.propertyConfigs[key12]) !== null && _config_propertyConfigs_key !== void 0 ? _config_propertyConfigs_key : config.baseConfig;
          var callback = void 0;
          if (currentlyExiting) {
            var capturedKey = key12;
            var capturedCycleId = currentCycleId;
            callback = function (finished) {
              "worklet";

              (0, import_react_native_reanimated.runOnJS)(markExitKeyDone)(capturedKey, capturedCycleId, finished !== null && finished !== void 0 ? finished : false);
            };
          }
          result[key12] = applyAnimation(targetValue, propConfig, callback);
        };
        if (disableAnimation || isHydrating) {
          return {};
        }
        var result = {};
        var config = configRef.get();
        var emitterAnimated = animatedTargetsRef.value;
        var emitterStatic = staticTargetsRef.value;
        var emitterTransforms = transformTargetsRef.value;
        var hasEmitterUpdates = emitterAnimated !== null;
        var animatedValues = hasEmitterUpdates ? emitterAnimated : animatedStyles;
        var staticValues = hasEmitterUpdates ? emitterStatic : {};
        var currentlyExiting = isExitingRef.value;
        var currentCycleId = exitCycleIdShared.value;
        for (var key3 in staticValues) {
          result[key3] = staticValues[key3];
        }
        for (var key1 in animatedValues) _loop(key1);
        var transforms2 = hasEmitterUpdates ? emitterTransforms : animatedStyles.transform;
        if (transforms2 && Array.isArray(transforms2)) {
          var validTransforms = [];
          var _iteratorNormalCompletion2 = true,
            _didIteratorError2 = false,
            _iteratorError2 = void 0;
          try {
            var _loop1 = function () {
              var t2 = _step2.value;
              if (!t2) return "continue";
              var keys = Object.keys(t2);
              if (keys.length === 0) return "continue";
              var value = t2[keys[0]];
              if (typeof value === "number" || typeof value === "string") {
                var transformKey = Object.keys(t2)[0];
                var targetValue = t2[transformKey];
                var _config_propertyConfigs_transformKey;
                var propConfig = (_config_propertyConfigs_transformKey = config.propertyConfigs[transformKey]) !== null && _config_propertyConfigs_transformKey !== void 0 ? _config_propertyConfigs_transformKey : config.baseConfig;
                var callback = void 0;
                if (currentlyExiting) {
                  var capturedKey = `transform:${transformKey}`;
                  var capturedCycleId = currentCycleId;
                  callback = function (finished) {
                    "worklet";

                    (0, import_react_native_reanimated.runOnJS)(markExitKeyDone)(capturedKey, capturedCycleId, finished !== null && finished !== void 0 ? finished : false);
                  };
                }
                validTransforms.push({
                  [transformKey]: applyAnimation(targetValue, propConfig, callback)
                });
              }
            };
            for (var _iterator2 = transforms2[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) _loop1();
          } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
                _iterator2.return();
              }
            } finally {
              if (_didIteratorError2) {
                throw _iteratorError2;
              }
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
//# sourceMappingURL=createAnimations.native.js.map
