varying vec2 vTextureCoord;
uniform sampler2D uSampler;
uniform highp vec4 inputSize;
uniform highp vec4 outputFrame;
uniform vec2 dimensions;

vec2 normalizedCoord( vec2 coord )
{
    return (coord * inputSize.xy + outputFrame.xy) / dimensions.xy;
}

void main(void)
{
    vec4 color = texture2D(uSampler, vTextureCoord);
    vec2 coord = normalizedCoord(vTextureCoord);
    if (color.a != 0.0) {
        color.r -= coord.y / 4.0;
        color.g -= coord.y / 4.0;
        color.b -= coord.y / 4.0;
    }
    gl_FragColor = color;
}
