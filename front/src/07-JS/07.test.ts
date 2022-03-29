type ManType = {
    name: string
    age: number
    lessons: Array<{ title: string }>
    address: {
        street: {
            title: string
        }
    }
}

let props: ManType;

beforeEach(() => {
    props = {
        name: 'Nastya',
        age: 24,
        lessons: [{title: '1'}, {title: '2'}],
        address: {
            street: {
                title: 'Street'
            }
        }
    }
})


test('', () => {
    /* const age = props.age
     const lessons = props.lessons*/
    const {age: a, lessons: l} = props //деструктуризация, т.е. создаем две переменных с псевдонимами а и л,
        //которые находятся в пропс


    expect(a).toBe(24)
    expect(l.length).toBe(2)
})