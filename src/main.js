import _ from 'lodash';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import CovidData from './service/covid-data-mediagroup';
import DataTable from './ui/data_table';
import NavigatorButtons from './ui/navigator_buttons';
import Spinner from './ui/spinner';
import DataProcessor from './service/data_processor';
import FormHandler from './ui/input_form';


const spinner = new Spinner("spinner", "alert");
const dataProvider = new CovidData();
const dataProcessor = new DataProcessor(dataProvider);


const formHandler = new FormHandler("input-country-form", "alert");
// formHandler.fillOptions("country-options", courseData.courses);
// formHandler.fillOptions("period-options", courseData.lectors);
// dataProvider.getContinentCases().then(data=>console.log(data));
// dataProvider.getCountryesList().then(data=>console.log(data));

const continentTableDefinition = [
    { key: 'continent', displayName: 'Continent' },
    { key: 'confirmedCases', displayName: 'Confirmed cases(%)' },
    { key: 'confirmedDeath', displayName: 'Death cases(%)' },
    { key: 'updatedTime', displayName: "Update time" },
    ];
const continentDataTable = new DataTable(continentTableDefinition, "data-table");
const navigator = new NavigatorButtons(["0","1","2","3"]);



window.showFormHistory = async () => {
    const period = [30, 60, 90, 120];
    formHandler.fillOptions("country-options", await dataProcessor.getCountriesList());
    formHandler.fillOptions("period-options", period);
    continentDataTable.hideTable();
    formHandler.show();
    formHandler.addHandler( async (country) => {
        const res = await spinner.awaitWithSpinner(dataProcessor.getCountryHistory(country));
    return res;
})}


window.showContinentTable = async () => {
    navigator.setActive(0);
    formHandler.hide();
    continentDataTable.showTable(await spinner.awaitWithSpinner(dataProcessor.getAllFormatData()));
}