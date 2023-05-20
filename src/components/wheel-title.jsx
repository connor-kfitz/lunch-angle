
export default function WheelTitle({ title, position, tileCount }) {

    const titleStyle = {
        transform: `rotate(${position + (360 / tileCount / 2)}deg)`
    }

    return (
        <text x="65%" y="52%" className="wheel__title" fill="#fff" style={titleStyle}>{title}</text>
    );
}