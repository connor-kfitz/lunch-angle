export default function WheelTile({ title, backgroundColor, position, key }) {
    
    const tileStyle = {
        backgroundColor: backgroundColor,
        transform: `rotate(${position}deg)`
    }

    console.log(position)

    return (
        <div className="wheel__quarter" style={tileStyle}>
        </div>
    );
}