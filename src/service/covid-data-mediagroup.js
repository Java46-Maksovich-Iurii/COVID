import _ from 'lodash';

export default class CovidData {
    #baseUrl
    constructor() {
        this.#baseUrl = 'https://covid-api.mmediagroup.fr/v1/';
    }

    async #getData() {
        return await fetch(this.#baseUrl + 'cases');
    }
    async getContinentCases() {
        const dataResponse = await this.#getData();
        const data = await dataResponse.json();
        const continentData = Object.values(data).map(el => el.All).filter(contry => !!contry.continent);
        return _.groupBy(continentData, 'continent');
    }

}