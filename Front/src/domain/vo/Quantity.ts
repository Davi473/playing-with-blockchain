
export default class Quantity {
    private value: number;

    constructor (quantity: number) {
        if (quantity <= 0) throw new Error(`Unable to empty quantity ${quantity}`);
        this.value = quantity;
    }

    public getValue (): number {
        return this.value;
    }
}