varying float vNoise;
varying vec2 vUv;
uniform sampler2D photo;


void main() {

    vec3 color1 = vec3(0.129, 0.607, 0.831); // #219bd4
    vec3 color2 = vec3(0.831, 0.129, 0.717); // #d421b7

    vec3 color = texture2D(photo, vUv).xyz;
    gl_FragColor = vec4( color, 1.0 );

}
