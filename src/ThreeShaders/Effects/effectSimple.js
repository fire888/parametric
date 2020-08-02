const THREE = require('three'); const shader = { vertexShader: [
  'varying vec2 vUv;',
  'varying vec3 LightIntensity;',

  'uniform vec3 LightPosition;',
  
  'void main() {',

    'vUv = uv;',

    //'vec3 tnorm = normalize(LightPosition);',
    //'LightIntensity = vec3(0., .2, 1.);',
    'vec3 dirLight = vec3(0, 1., 0.);',  
    'LightIntensity = vec3(dot(normal, dirLight));',

    //'gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );',
    'gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );',
  '}'
].join( '\n' ),
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
  'iResolution': { type: "v2", value: new THREE.Vector2( 800, 800 ) },
  'tDiffuse': { value: null },
  'LightPosition': { type: 'v3', value: new THREE.Vector4( 50, 50, -50,) },
},
}

exports.effectSimple = function () {
    const mat = new THREE.ShaderMaterial(shader)
    var geoKnot = new THREE.TorusKnotBufferGeometry( 40, 10, 100, 16 );
    var obj = new THREE.Mesh( geoKnot, mat );
    obj.position.set( 0, 0, 0 );
    obj.castShadow = true;
    obj.receiveShadow = true;

    console.log(obj)

    const update = () => {}

    return { 
      update,
      obj,
    }
}





