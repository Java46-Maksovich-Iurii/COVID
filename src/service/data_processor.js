export default class DataProcessor {
    #dataProvider
    constructor(dataProvider) {
        this.#dataProvider = dataProvider;
    }

    async getAllFormatData() {
        const promiseData = await this.#dataProvider.getContinentCases();
        const data = Object.entries(promiseData).map(obj => {
            return {
                "continent": obj[0],
                "confirmedCases": this.#getConfirmedCases(obj[1]),
                "confirmedDeath": this.#getDeathCases(obj[1]),
                "updatedTime": this.#getUpdateDate(obj[1])
            }
        })
        return data;
    }

    #getConfirmedCases(continentData) {
        const confirmedCases = continentData.reduce((casesAcc, currV) => {casesAcc+=currV.confirmed; return casesAcc}, 0);
        const population = continentData.reduce((populationAcc, currV) => {populationAcc+=currV.population; return populationAcc}, 0);
        return ((confirmedCases/population) * 100).toFixed(2);
    }
    #getDeathCases(continentData) {
        const confirmedDeath = continentData.reduce((deathAcc, currV) => {deathAcc+=currV.deaths; return deathAcc}, 0);
        const population = continentData.reduce((populationAcc, currV) => {populationAcc+=currV.population; return populationAcc}, 0);
        return ((confirmedDeath/population) * 100).toFixed(2);
    }
    #getUpdateDate(continentData) {
        let updatedDate = 'not availible';
        let count = 0;
        do {
            updatedDate = continentData[count].updated;
            count++;
        } while (!updatedDate);
        return updatedDate;
    }
    async getCountriesList() {
        const countryList = await this.#dataProvider.getCountriesArray();
        return countryList;
    }
    async getCountryHistory(country) {
        const dataHistory = await this.#dataProvider.getCountryHistoryData(country.country);
        console.log(dataHistory.All);
        console.log(country);
        return;
    }
}
