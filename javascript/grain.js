import * as THREE from "three";

const canvas = document.getElementById("grain");

const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: false
});

renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);

const scene = new THREE.Scene();

const camera = new THREE.OrthographicCamera(
    -1,
    1,
    1,
    -1,
    0,
    1
);

const geometry = new THREE.PlaneGeometry(2,2);

const uniforms = {

    time: {
        value: 0
    },

    resolution: {

        value: new THREE.Vector2(
            window.innerWidth,
            window.innerHeight
        )

    }

};

const material = new THREE.ShaderMaterial({

    transparent: true,

    uniforms,

    vertexShader: `

        void main(){

            gl_Position = vec4(position,1.0);

        }

    `,

    fragmentShader: `

        uniform float time;
        uniform vec2 resolution;

        #define SPEED 2.0
        #define INTENSITY 0.06
        #define VARIANCE 0.5
        #define MEAN 0.0

        float random(vec2 uv)
        {
            return fract(
                sin(dot(uv, vec2(12.9898,78.233)))
                *43758.5453123
            );
        }

        float gaussian(float z,float u,float o)
        {
            return
            (1.0/(o*sqrt(6.28318530718)))
            *
            exp(
                -((z-u)*(z-u))
                /
                (2.0*o*o)
            );
        }

        void main()
        {

            vec2 uv = gl_FragCoord.xy / resolution;

            float seed = dot(
                uv,
                vec2(12.9898,78.233)
            );

            float noise =
                fract(
                    sin(seed)
                    *
                    43758.5453
                    +
                    time*SPEED
                );

            noise =
                gaussian(
                    noise,
                    MEAN,
                    VARIANCE*VARIANCE
                );

            noise *= INTENSITY;

            gl_FragColor =
                vec4(
                    vec3(1.0),
                    noise
                );

        }

    `

});

const mesh = new THREE.Mesh(
    geometry,
    material
);

scene.add(mesh);

window.addEventListener("resize",()=>{

    renderer.setSize(
        window.innerWidth,
        window.innerHeight
    );

    uniforms.resolution.value.set(
        window.innerWidth,
        window.innerHeight
    );

});

const clock = new THREE.Clock();

function animate(){

    uniforms.time.value =
        clock.getElapsedTime();

    renderer.render(
        scene,
        camera
    );

    requestAnimationFrame(
        animate
    );

}

animate();