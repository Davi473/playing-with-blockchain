const categorys = [ "STOCK", "FIIS", "AÇÕES", "ETFS", "CRIPTOS" ];


export default class Category {
    private value: string;

    constructor (category: string) {
        if (!category) throw new Error("Cannot empty value");
        if (!categorys.includes(category.toUpperCase())) throw new Error(`We do not use ${category} categorys`);
        this.value = category.toUpperCase();
    }

    public getValue (): string {
        return this.value;
    }
}