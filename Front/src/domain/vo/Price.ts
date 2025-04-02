
export default class Price {
    private value: number;

    constructor (price: number) {
        if (price <= 0) throw new Error(`Unable to empty price ${price}`);
        this.value = price;
    }

    public getValue (): number {
        return this.value;
    }
}