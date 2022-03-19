export default class DataProcessor {
    #serverData
    constructor(serverData) {
        this.#serverData = serverData;
    }

    async getAllFormatData() {
        const c = await this.#serverData
        const data = Object.entries(c).map(obj => {
            return {
                "continent": obj[0],
                "confirmedCases": this.#getConfirmedCases(obj[1]),
                "confirmedDeath": this.#getDeathCases(obj[1])
            }
        })
        return data;
    }

    #getConfirmedCases(continentData) {
        const confirmedCases = continentData.reduce((casesAcc, currV) => {casesAcc+=currV.confirmed; return casesAcc}, 0);
        const population = continentData.reduce((populationAcc, currV) => {populationAcc+=currV.population; return populationAcc}, 0);
        return (confirmedCases/population) * 100;
    }
    #getDeathCases(continentData) {
        const confirmedDeath = continentData.reduce((deathAcc, currV) => {deathAcc+=currV.deaths; return deathAcc}, 0);
        const population = continentData.reduce((populationAcc, currV) => {populationAcc+=currV.population; return populationAcc}, 0);
        return (confirmedDeath/population) * 100;
    }


}