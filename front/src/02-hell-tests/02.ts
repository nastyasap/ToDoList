export type CityType = {
    title: string;
    houses: Array<HousesType>;
    governmentBuildings: Array<GovernmentsBuildingsType>;
    citizensNumbers: number
};

type HousesType = {
    id ?: number;
    buildedAt: number;
    repaired: boolean;
    address: AddressType
};

type AddressType = {
    number ?: number;
    street: streetType
};

type streetType = {
    title: string
};

export type GovernmentsBuildingsType = {
    type: string;
    budget: number;
    staffCount: number;
    address: AddressType
};