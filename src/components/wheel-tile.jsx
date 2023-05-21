export default function WheelTile({ backgroundColor, position, tileCount }) {

    const tileStyle = {
        transform: `rotate(${position}deg)`,
        transformOrigin: 'center'
    }

    return (
            <circle r="125" cx="250" cy="250" fill="transparent"
                stroke={backgroundColor}
                strokeWidth="250"
                strokeDasharray={`calc((100 / ${tileCount}) * 785.4 / 100) 1570`}
                style={tileStyle}/>
    );
}