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



    void main(void) {
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


#define PI 100



float message(vec2 U) { // to alter in the icon with the alter message
    vec4 T = vec4(0);   // or: initMsg;
    Cc(83);Cc(111);Cc(117);Cc(110);Cc(100);Cc(32);Cc(105);Cc(110);Cc(115);Cc(105);Cc(100);Cc(101); // message "Sound inside"
    return length(T.yz)==0. ? -1. : T.x; // or: endMsg;
}


//autor desconocido
void mainImage( out vec4 fragColor, in vec2 fragCoord )
{

	vec2 p = ( fragCoord.xy / iResolution.xy ) - 0.5; 
	
	float sx = 0.2 * (p.x + 0.5) * sin( 25.0 * p.x - 10. * iTime);
   
    float dy = 1./ ( 50. * abs(p.y - sx));
	
	dy += 1./ (20. * length(p - vec2(p.x, 0.)));
	
    
        
    if (iResolution.y<2000.)
    {
        float c=message((fragCoord/iResolution.y-vec2(.1,.2))*8.);
        if(c>=0.)
        {
            fragColor=vec4(c);
            return;
        }
    }
    
	fragColor = vec4( (p.x + 0.5) * dy, 0.5 * dy, dy, 1.0 );
    

}



*/

