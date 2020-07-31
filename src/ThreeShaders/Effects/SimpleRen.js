const THREE = require('three')

exports.effectSimple = function () {
    console.log('SIMPLE EFFECT')
    const effect = new THREE.ShaderMaterial(shader)
    return effect
}

const shader = {
    uniforms: {
      'iGlobalTime': { type: "f", value: 1.0 },
      'iResolution': { type: "v2", value: new THREE.Vector2( 800, 800 ) },
      'tDiffuse': { value: null },
    },
    vertexShader: [
      'varying vec2 vUv;',
      'void main() {',
        'vUv = uv;',
        'gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );',
      '}'
    ].join( '\n' ),
    fragmentShader: [
      'varying vec2 vUv;',
      'uniform float iGlobalTime;',
      'uniform vec2 iResolution;',
    
      'void main(void) {',
        'vec3 col = vec3(1., .3, 0.);',
        'gl_FragColor = vec4(col, 1.);',
      '}'
    ].join('\n')
}



