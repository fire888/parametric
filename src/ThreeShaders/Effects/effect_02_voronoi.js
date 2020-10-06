const THREE = require('three'); const shader = { vertexShader: `
    varying vec2 vUv;  
  
    void main() {  
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }`,
fragmentShader: [`
    varying vec2 vUv;
    uniform float iGlobalTime;
    uniform vec2 iResolution;

    //voronoi
    //float rand(vec2 co){
    //    return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
    //}

    void main(void) {
        const int pointCount=10;

        float power = 2.1 + sin(iGlobalTime)*sin(iGlobalTime);
        
        vec2 points[pointCount] = vec2[pointCount](
        vec2(0.5 + 0.15*sin(iGlobalTime), 0.5 - 0.25*cos(iGlobalTime)),
        vec2(0.25 + 0.2*sin(iGlobalTime*3.), 0.8+ 0.2*sin(iGlobalTime*3.)),
        vec2(0.635+ 0.2*sin(iGlobalTime*3.), 0.7 + 0.2*sin(iGlobalTime)),
        vec2(0.3+ 0.12*sin(iGlobalTime*3.), 0.3 + 0.1*sin(iGlobalTime)),
        vec2(0.535 + 0.2*sin(iGlobalTime*2.), 0.55 + 0.2*sin(iGlobalTime)),
        vec2(0.85 + 0.15*sin(iGlobalTime*3.), 0.2 + 0.15*sin(2.*iGlobalTime)),
        vec2(0.5 + 0.2*sin(iGlobalTime*3.), 0.5 + 0.2*sin(iGlobalTime)),
        vec2(0.45 + 0.4*sin(iGlobalTime*1.5), 0.9 + 0.8*sin(iGlobalTime)),
        vec2(0.15 + 0.12*sin(iGlobalTime*2.), 0.9 + 0.12*sin(iGlobalTime)),
        vec2(0.3 + 0.1*sin(iGlobalTime*2.), 0.3 + 0.13*sin(iGlobalTime))
       );


       // Normalized pixel coordinates (from 0 to 1)
       vec2 uv = vec2(vUv.x * 2., vUv.y * 2.0 - .5);
       uv.x -= 0.5;
       
       float minDist=2.;
       for(int i=0; i < pointCount; i++){
           minDist = min(distance(uv.xy, points[i]), minDist);      
       }

       minDist *= 2.;
       
       vec3 col = vec3(1.1 -minDist, 1.1 -minDist ,0.8-minDist);
       
       
       col.x = pow(col.x, power);
       col.y = pow(col.y, power);
       col.z = pow(col.z, power);
       gl_FragColor = vec4(col, 1.);
    }`
].join('\n'),
uniforms: {
  'iGlobalTime': { type: "f", value: 1.0 },
  'iResolution': { type: "v2", value: new THREE.Vector2(800, 800) },
  'tDiffuse': { value: null },
},
}



exports.effect_02_voronoi = function () {
    const mat = new THREE.ShaderMaterial(shader)
    const plane = new THREE.PlaneBufferGeometry(200, 200);
    const obj = new THREE.Mesh(plane, mat);
    obj.rotation.x = - Math.PI
    obj.position.set(0, 0, 0);

    const update = () => {
        mat.uniforms.iGlobalTime.value += 0.05;
    }

    return { 
      update,
      obj,
    }
}



/*
void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    const int pointCount=9;
    
    //increase power to decrease blending.
    float power = 2.1 + sin(iTime)*sin(iTime);
    
    vec2 points[pointCount] = vec2[pointCount](
    vec2(0.5 + 0.15*sin(iTime), 0.5 - 0.25*cos(iTime)), 
    vec2(0.25 + 0.2*sin(iTime*3.), 0.8+ 0.2*sin(iTime*3.)),
    vec2(0.635+ 0.2*sin(iTime*3.), 0.7 + 0.2*sin(iTime)),
    vec2(0.3+ 0.12*sin(iTime*3.), 0.3 + 0.1*sin(iTime)),
    vec2(0.535 + 0.2*sin(iTime*2.), 0.55 + 0.2*sin(iTime)),
    vec2(0.85 + 0.15*sin(iTime*3.), 0.2 + 0.15*sin(2.*iTime)),
    vec2(0.5 + 0.2*sin(iTime*3.), 0.5 + 0.2*sin(iTime)),
    vec2(0.45 + 0.4*sin(iTime*1.5), 0.9 + 0.8*sin(iTime)),
    vec2(0.15 + 0.12*sin(iTime*2.), 0.9 + 0.12*sin(iTime))
   );
    
    // Normalized pixel coordinates (from 0 to 1)
    vec2 uv = fragCoord/iResolution.y;
	uv.x -= 0.5;
    
    float minDist=2.;
    for(int i=0; i < pointCount; i++){
    	minDist = min(distance(uv.xy, points[i]), minDist);      
    }
    
    vec3 col = vec3(1.-minDist - 0.5, 1.-minDist ,0.8-minDist);
    
    
    col.x = pow(col.x, power);
    col.y = pow(col.y, power);
    col.z = pow(col.z, power);
 	
    // Output to screen
    fragColor = vec4(col,1.0);
}
*/
