// 1. Функция sum принимает параметром целые положительные
// числа (неопределённое кол-во) и возвращает их сумму (rest).

export function sum(...nums: Array<number>): number {
    console.log(nums)
    //...здесь пишем код.
    // В return стоит "заглушка", чтоб typescript не ругался

    return nums.reduce((el, acc) => acc + el)
}


// 2. Функция getTriangleType принимает три параметра:
// длины сторон треугольника.
// Функция должна возвращать:
//  - "10", если треугольник равносторонний,
//  - "01", если треугольник равнобедренный,
//  - "11", если треугольник обычный,
//  - "00", если такого треугольника не существует.

export function getTriangleType(a: number, b: number, c: number): string {
    //...здесь пишем код.
    // В return стоит "заглушка", чтоб typescript не ругался
    if (a + b > c && a + c > b && b + c > a) {
        if (a === b && b === c && c === a) return '10'
        if (a === b || b === c || c === a) return '01'
        else return '11'
    } else return '00'
}


// 3. Функция getSum принимает параметром целое число и возвращает
// сумму цифр этого числа

export function getSum(number: number): number {
    //...здесь пишем код.
    // В return стоит "заглушка", чтоб typescript не ругался
    return number.toString().split('').reduce((a, b) => a + Number(b), 0)
}


// 4. Функция isEvenIndexSumGreater принимает  параметром массив чисел.
// Если сумма чисел с чётными ИНДЕКСАМИ!!! (0 как чётный индекс) больше
// суммы чисел с нечётными ИНДЕКСАМИ!!!, то функция возвращает true.
// В противном случае - false.

export const isEvenIndexSumGreater = (arr: Array<number>): boolean => {
    //...здесь пишем код.
    // В return стоит "заглушка", чтоб typescript не ругался
    let evenSum = 0
    let oddSum = 0
    for (let i = 1; i < arr.length; i += 2) {
        evenSum += arr[i - 1]
        oddSum += arr[i]
    }
    return evenSum > oddSum
}

// 5. Функция getSquarePositiveIntegers принимает параметром массив чисел и возвращает новый массив. 
// Новый массив состоит из квадратов целых положительных чисел, котрые являются элементами исходгого массива.
// Исходный массив не мутирует.


export function getSquarePositiveIntegers(array: Array<number>): Array<number> {
    //...здесь пишем код.
    // В return стоит "заглушка", чтоб typescript не ругался
    const newArray = array.filter(n => n > 0 && n % 2 === 0)
    return newArray.map(n => n ** 2)
}

// 6. Функция принимает параметром целое не отрицательное число N и возвращает сумму всех чисел от 0 до N включительно
// Попробуйте реализовать функцию без использования перебирающих методов.

export function sumFirstNumbers(N: number): number {
    //...здесь пишем код.
    // В return стоит "заглушка", чтоб typescript не ругался
    if (N === 0) return 0
    else return N + sumFirstNumbers(N - 1)
    // return N === 0 ? N : N + sumFirstNumbers(N - 1)
}

// ...и "лапку" вверх!!!!


// Д.З.:
// 7. Функция-банкомат принимает параметром целое натуральное число (сумму).
// Возвращает массив с наименьшим количеством купюр, которыми можно выдать эту
// сумму. Доступны банкноты следующих номиналов:
// const banknotes = [1000, 500, 100, 50, 20, 10, 5, 2, 1].
// Считаем, что количество банкнот каждого номинала не ограничено


export function getBanknoteList(amountOfMoney: number): Array<number> {
    //solution_1
    // let amount1000 = Math.trunc(amountOfMoney / 1000)
    // let amount500 = Math.trunc((amountOfMoney - 1000 * amount1000) / 500)
    // let amount100 = Math.trunc((amountOfMoney - 1000 * amount1000 - 500 * amount500) / 100)
    // let amount50 = Math.trunc((amountOfMoney - 1000 * amount1000 - 500 * amount500 - 100 * amount100) / 50)
    // let amount20 = Math.trunc((amountOfMoney - 1000 * amount1000 - 500 * amount500 - 100 * amount100 - 50 * amount50) / 20)
    // let amount10 = Math.trunc((amountOfMoney - 1000 * amount1000 - 500 * amount500 - 100 * amount100 - 50 * amount50 - 20 * amount20) / 10)
    // let amount5 = Math.trunc((amountOfMoney - 1000 * amount1000 - 500 * amount500 - 100 * amount100 - 50 * amount50
    //     - 20 * amount20 - 10 * amount10) / 5)
    // let amount2 = Math.trunc((amountOfMoney - 1000 * amount1000 - 500 * amount500 - 100 * amount100 - 50 * amount50
    //     - 20 * amount20 - 10 * amount10 - 5 * amount5) / 2)
    // let amount1 = amountOfMoney - 1000 * amount1000 - 500 * amount500 - 100 * amount100 - 50 * amount50
    //     - 20 * amount20 - 10 * amount10 - 5 * amount5 - 2 * amount2
    //
    // let arr = []
    // for (let i = 0; i < amount1000; i++) {
    //     arr.push(1000)
    // }
    // for (let i = 0; i < amount500; i++) {
    //     arr.push(500)
    // }
    // for (let i = 0; i < amount100; i++) {
    //     arr.push(100)
    // }
    // for (let i = 0; i < amount50; i++) {
    //     arr.push(50)
    // }
    // for (let i = 0; i < amount20; i++) {
    //     arr.push(20)
    // }
    // for (let i = 0; i < amount10; i++) {
    //     arr.push(10)
    // }
    // for (let i = 0; i < amount5; i++) {
    //     arr.push(5)
    // }
    // for (let i = 0; i < amount2; i++) {
    //     arr.push(2)
    // }
    // for (let i = 0; i < amount1; i++) {
    //     arr.push(1)
    // }
    // return arr


    //solution_2
    // let currentAmountOfMoney = amountOfMoney;
    // let result: number[] = [];
    // while (currentAmountOfMoney !== 0) {
    //     if (currentAmountOfMoney >= 1000) {
    //         currentAmountOfMoney -= 1000
    //         result.push(1000)
    //     } else if (currentAmountOfMoney >= 500) {
    //         currentAmountOfMoney -= 500
    //         result.push(500)
    //     } else if (currentAmountOfMoney >= 100) {
    //         currentAmountOfMoney -= 100
    //         result.push(100)
    //     } else if (currentAmountOfMoney >= 50) {
    //         currentAmountOfMoney -= 50
    //         result.push(50)
    //     } else if (currentAmountOfMoney >= 20) {
    //         currentAmountOfMoney -= 20
    //         result.push(20)
    //     } else if (currentAmountOfMoney >= 10) {
    //         currentAmountOfMoney -= 10
    //         result.push(10)
    //     } else if (currentAmountOfMoney >= 5) {
    //         currentAmountOfMoney -= 5
    //         result.push(5)
    //     } else if (currentAmountOfMoney >= 2) {
    //         currentAmountOfMoney -= 2
    //         result.push(2)
    //     } else if (currentAmountOfMoney >= 1) {
    //         currentAmountOfMoney -= 1
    //         result.push(1)
    //     }
    // }
    // return result;


    //solution_3
    let currentAmountOfMoney = amountOfMoney;
    let result: number[] = [];
    const banknots = [1000, 500, 100, 50, 20, 10, 5, 2, 1]
    while (currentAmountOfMoney !== 0) {
        let banknote = banknots.find(banknote => banknote <= currentAmountOfMoney)!
        result.push(banknote)
        currentAmountOfMoney -= banknote
    }
    return result


    //solution_4
    // return [1000, 500, 100, 50, 20, 10, 5, 2, 1].reduce((acc: number[], banknote) => {
    //     const banknotesCount = Math.floor(amountOfMoney / banknote);
    //     for (let i = 0; i < banknotesCount; i++) {
    //         acc.push(banknote)
    //     }
    //     amountOfMoney = amountOfMoney % banknote;
    //     return acc;
    // }, [])



}