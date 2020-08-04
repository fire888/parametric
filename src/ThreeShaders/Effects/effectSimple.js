const THREE = require('three'); const shader = { vertexShader: `
    varying vec2 vUv;
    varying vec3 LightIntensity;
    
    uniform vec3 LightPosition;
  
  
  
    void getEyeSpace(out vec3 norm, out vec4 pos) {
        norm = normal;
        pos = modelViewMatrix * vec4(position, 1.0);
    }
  
  
  
    vec3 phongModel( vec4 pos, vec3 norm ) {
        vec4 lightPos = vec4(0., 0, -800., 1.);
        
        vec3 Kd = vec3(.5, 1., 1.); // material diffuse
        vec3 Ld = vec3(1., 1., 1.); // light intensity
        vec3 Ks = vec3(0.5, 0.1, 0.1); // light
        float Shininess = 0.01;
    
        vec3 s = vec3(normalize(lightPos - pos));
        vec3 v = normalize(-pos.xyz);
        vec3 r = reflect(-s, norm);
        
        float sDotN = max(dot(s, norm), 0.);
        vec3 spec = vec3(0.);
        if (sDotN > 0.)  spec = Ks * vec3(   max(pow( dot(v, r), 0.), Shininess ));
        
        LightIntensity = Ld * Kd * vec3(max(dot(norm, s), 0.0)) + spec;
        return LightIntensity;
    }
  
  
  
    void main() {  
        vUv = uv;
        
        vec3 eyeNorm;
        vec4 eyePos;
          
        getEyeSpace(eyeNorm, eyePos);
        vec3 LightIntensity = phongModel(eyePos, eyeNorm);
        
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`,
fragmentShader: [
  'varying vec2 vUv;',
  'varying vec3 LightIntensity;',
  'uniform float iGlobalTime;',
  'uniform vec2 iResolution;',

  'void main(void) {',
    'vec3 col = LightIntensity;',
    'gl_FragColor = vec4(col, 1.);',
  '}'
].join('\n'),
uniforms: {
  'iGlobalTime': { type: "f", value: 1.0 },
  'iResolution': { type: "v2", value: new THREE.Vector2(800, 800) },
  'tDiffuse': { value: null },
  'LightPosition': { type: 'v3', value: new THREE.Vector4(50, 50, -50,) },
},
}



exports.effectSimple = function () {
    const mat = new THREE.ShaderMaterial(shader)
    const geoKnot = new THREE.TorusKnotBufferGeometry(40, 10, 100, 16);
    const obj = new THREE.Mesh(geoKnot, mat);
    obj.position.set(0, 0, 0);
    obj.castShadow = true;
    obj.receiveShadow = true;

    const update = () => {}

    return { 
      update,
      obj,
    }
}




// TESH ////////////////////////////////////////


// EASY SHOW
/*
 const shader = { vertexShader:
 `varying vec2 vUv;
 varying vec3 LightIntensity;

 uniform vec3 LightPosition;

 void main() {

 vUv = uv;

 vec4 lightPos = vec4(0., 400, -400., 1.);

 vec4 eyeCoords = modelViewMatrix * vec4(position, 1.0);
 vec3 s = normalize(vec3(lightPos - eyeCoords));

 vec3 Kd = vec3(.5, 1., 1.); // material diffuse
 vec3 Ld = vec3(1., 1., 1.); // light intensity



 LightIntensity = Ld * Kd * vec3(max(dot(normal, s), 0.0));

 gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
 }`,
 fragmentShader: [
 'varying vec2 vUv;',
 'varying vec3 LightIntensity;',
 'uniform float iGlobalTime;',
 'uniform vec2 iResolution;',

 'void main(void) {',
 'vec3 col = LightIntensity;',
 'gl_FragColor = vec4(col, 1.);',
 '}'
 ].join('\n'),
 uniforms: {
 'iGlobalTime': { type: "f", value: 1.0 },
 'iResolution': { type: "v2", value: new THREE.Vector2(800, 800) },
 'tDiffuse': { value: null },
 'LightPosition': { type: 'v3', value: new THREE.Vector4(50, 50, -50,) },
 },
 }
*/





