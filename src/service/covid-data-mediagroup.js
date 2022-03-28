import _ from 'lodash';

export default class CovidData {
    #baseUrl
    #timeStamp
    #allData
    constructor() {
        this.#baseUrl = 'https://covid-api.mmediagroup.fr/v1/';
        this.#timeStamp = Date.now()
    }

    async #fetchData() {
        if (!this.#allData || Date.now() > (this.#timeStamp + 36000)) {
            this.#timeStamp = Date.now();
            const dataResponse = await fetch(this.#baseUrl + 'cases');
            const data = await dataResponse.json();
            this.#allData = data;
        }
    }

    async getContinentCases() {
        await this.#fetchData();
        const continentData = Object.values(await this.#allData).map(el => el.All).filter(country => !!country.continent && !!country.population)
        return _.groupBy(continentData, 'continent');
    }

    async getCountriesArray() {
        await this.#fetchData();
        return Object.keys(await this.#allData);
    }

    async getCountryHistoryData(countryName) {
        const dataResponse = await fetch(this.#baseUrl + `history?country=${countryName}&status=deaths`);
        const data = await dataResponse.json();
        return data;
    }
}

