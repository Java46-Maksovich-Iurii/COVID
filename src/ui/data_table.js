export default class DataTable {
    #idTable
    #columnsDefinition

    constructor(columnsDefinition, idTable) {
        this.#idTable = document.getElementById(idTable);
        if (!this.#idTable) {
            throw "Table element is not defined"
        }
        this.#columnsDefinition = columnsDefinition;
    }

    showTable(objects) {
        this.#idTable.innerHTML = `${this.#getHeader()}${this.#getBody(objects)}`;
    }
    hideTable() {
        this.#idTable.innerHTML = '';
    }
    #getHeader() {
        return `<thead><tr style="cursor:pointer">${this.#getColumns()}</tr></thead>`;
    }
    #getColumns() {
        const columns = this.#columnsDefinition.map(c => `<th>${c.displayName}</th>`);
        return columns.join('');
    }
    #getBody(objects) {
        return objects.map(o => `<tr>${this.#getRecord(o)}</tr>`).join('');
    }
    #getRecord(object) {
        object[this.#columnsDefinition[1].key] = object[this.#columnsDefinition[1].key].toFixed(2);
        object[this.#columnsDefinition[2].key] = object[this.#columnsDefinition[2].key].toFixed(2);
        const record =  this.#columnsDefinition.map(c => `<td>${object[c.key]}</td>`);
        return record.join('');
    }

}