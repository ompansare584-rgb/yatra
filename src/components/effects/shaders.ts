/**
 * Hand-written GLSL for the sky behind the train window.
 * One full-screen triangle pair, no textures, no loops: a gradient sky, a soft sun,
 * two drifting cloud bands and one hazy distant ridge. Cheap enough to run at reduced resolution.
 */

export const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

export const fragmentShader = /* glsl */ `
  precision mediump float;

  varying vec2 vUv;
  uniform float uTime;
  uniform vec2  uRes;
  uniform float uDark; // 0.0 = daylight, 1.0 = night

  float hash(float n) { return fract(sin(n) * 43758.5453123); }

  float noise(float x) {
    float i = floor(x);
    float f = fract(x);
    f = f * f * (3.0 - 2.0 * f);
    return mix(hash(i), hash(i + 1.0), f);
  }

  void main() {
    float aspect = uRes.x / uRes.y;
    vec2 p = vec2(vUv.x * aspect, vUv.y);

    // Sky gradient (warm horizon, cooler top). Colours follow the site palette.
    vec3 topDay     = vec3(0.81, 0.88, 0.86);
    vec3 horizonDay = vec3(0.96, 0.89, 0.75);
    vec3 topNight     = vec3(0.063, 0.082, 0.110);
    vec3 horizonNight = vec3(0.227, 0.165, 0.133);
    vec3 top     = mix(topDay, topNight, uDark);
    vec3 horizon = mix(horizonDay, horizonNight, uDark);
    vec3 col = mix(horizon, top, smoothstep(0.15, 1.0, vUv.y));

    // Sun (or low moon) with a soft glow.
    vec2 sunPos = vec2(0.72 * aspect, 0.50);
    float d = distance(p, sunPos);
    vec3 sunCol = mix(vec3(1.0, 0.80, 0.45), vec3(0.85, 0.88, 0.95), uDark);
    col += sunCol * smoothstep(0.34, 0.0, d) * 0.28;
    col = mix(col, sunCol, smoothstep(0.075, 0.06, d));

    // Two slow cloud bands drifting at different speeds.
    float drift = uTime * 0.012;
    float c1 = noise(p.x * 2.2 + drift * 2.0 + 3.0);
    float c2 = noise(p.x * 3.4 - drift * 3.0 + 9.0);
    float band1 = smoothstep(0.045, 0.0, abs(vUv.y - (0.72 + c1 * 0.08)));
    float band2 = smoothstep(0.030, 0.0, abs(vUv.y - (0.56 + c2 * 0.06)));
    vec3 cloud = mix(vec3(1.0, 0.97, 0.92), vec3(0.45, 0.40, 0.42), uDark);
    col = mix(col, cloud, (band1 * 0.55 + band2 * 0.4) * (1.0 - uDark * 0.5));

    // A hazy distant ridge on the horizon.
    float ridge = 0.30 + noise(p.x * 1.6 + drift * 0.8 + 21.0) * 0.10;
    vec3 haze = mix(vec3(0.72, 0.68, 0.58), vec3(0.17, 0.17, 0.15), uDark);
    col = mix(col, haze, 1.0 - smoothstep(ridge - 0.006, ridge + 0.006, vUv.y));

    gl_FragColor = vec4(col, 1.0);
  }
`;
