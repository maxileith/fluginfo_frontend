import TUseSearchParams from "../api/types/TUseSearchParams";

class searchParamMock implements URLSearchParams {
    append(name: string, value: string): void {
        throw new Error("Method not implemented. 1");
    }
    delete(name: string): void {}
    entries(): IterableIterator<[string, string]> {
        throw new Error("Method not implemented. 2");
    }
    forEach<TThis = this>(
        callback: (
            this: TThis,
            value: string,
            name: string,
            searchParams: this
        ) => void,
        thisArg?: TThis
    ): void {
        throw new Error("Method not implemented. 3");
    }
    get(name: string): string | null {
        return null;
    }
    getAll(name: string): string[] {
        throw new Error("Method not implemented. 4");
    }
    has(name: string): boolean {
        throw new Error("Method not implemented. 5");
    }
    keys(): IterableIterator<string> {
        throw new Error("Method not implemented. 6");
    }
    set(name: string, value: string): void {}
    sort(): void {
        throw new Error("Method not implemented. 7");
    }
    toString(): string {
        return "";
    }
    values(): IterableIterator<string> {
        throw new Error("Method not implemented. 8");
    }
    [Symbol.iterator](): IterableIterator<[string, string]> {
        throw new Error("Method not implemented. 9");
    }
}

const useSearchParamsMock: TUseSearchParams = () => {
    return [new searchParamMock(), () => {}];
};
export default useSearchParamsMock;
