function Card({ style, index, eventHandler }) {
    return (
        <div
            id={index}
            key={index}
            name="card"
            className="col-sm-2 card"
            style={style}
            onClick={eventHandler}
        >&nbsp;
        </div>

    )
}

export default Card