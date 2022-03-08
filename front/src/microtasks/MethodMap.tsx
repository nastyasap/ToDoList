type TopCarType = {
    topCar: Array<ObjectFromArray>
}

type ObjectFromArray = {
    manufacturer: string,
    model: string
}

export const TopCar = (props: TopCarType) => {
    return (
        <>
            <table>
                {props.topCar.map((el, index) => {

                    return (
                        <td key={index}>
                            <th>{el.manufacturer}</th>
                            <th>{el.model}</th>
                        </td>)
                })}
            </table>
        </>
    )
}