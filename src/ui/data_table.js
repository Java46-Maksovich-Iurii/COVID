export default class DataTable {
    #idTable
    #sortFunc
    #columnsDefinition

    constructor(columnsDefinition, idTable, sortFunc) {
        this.#idTable = document.getElementById(idTable);
        if (!this.#idTable) {
            throw "Table element is not defined"
        }
        this.#sortFunc = sortFunc ?? '';
        this.#columnsDefinition = columnsDefinition;
    }

    showTable(objects) {
        this.#idTable.innerHTML = `${this.#getHeader()}${this.#getBody(objects)}`;
    }
    hideTable() {
        this.#idTable.innerHTML = '';
    }
    #getHeader() {
        return `<thead><tr style="cursor:pointer">${this.#getColumns()}</tr></thead>`
    }
    #getColumns() {
        const columns = this.#columnsDefinition.map(c => `<th onclick="${this.#getSortFn(c)}">${c.displayName}</th>`);
        return columns.join('');
    }
    #getSortFn(column) {
        return this.#sortFunc ? `${this.#sortFunc}('${column.key}')` : ''
    }
    #getBody(objects) {
        return objects.map(o => `<tr>${this.#getRecord(o)}</tr>`).join('');
    }
    #getRecord(object) {
        const record =  this.#columnsDefinition.map(c => `<td>${object[c.key]}</td>`);
        return record.join('');
    }

}