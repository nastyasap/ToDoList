import {CityType} from "../02-hell-tests/02";

const ages = [18, 29, 90, 1, 80, 100]
export type CourseType = {
    title: string,
    price: number
}
const courses = [
    {title: 'JS', price: 210},
    {title: 'CSS', price: 100},
    {title: 'React', price: 130},
    {title: 'Python', price: 250}
]

export const predicate = (age: number) => {
    return age > 90
}

export const cheapCourses = (course: CourseType[]) =>
    course.filter(pr => pr.price < 150)

export function demolishHousesOnTheStreet(city: CityType, street: string) {
    city.houses = city.houses.filter
    (h => h.address.street.title !== street )
}

