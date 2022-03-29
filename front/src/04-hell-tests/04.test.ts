import {cheapCourses, predicate} from "./04";

test('should take old men older then 90', () => {
    const ages = [18, 29, 90, 1, 80, 100]
    const oldAges = ages.filter(predicate)

    expect(oldAges.length).toBe(1)
    expect(oldAges[0]).toBe(100)
})

test('should return cheap courses', () => {
    const courses = [
        {title: 'JS', price: 210},
        {title: 'CSS', price: 100},
        {title: 'React', price: 130},
        {title: 'Python', price: 250}
    ]

    const newCourses = cheapCourses(courses)

    expect(newCourses.length).toBe(2)
    expect(newCourses[0].title).toBe('CSS')
    expect(newCourses[1].title).toBe('React')
})