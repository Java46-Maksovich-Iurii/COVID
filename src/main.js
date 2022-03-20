import _ from 'lodash';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import CovidData from './service/covid-data-mediagroup';
import DataTable from './ui/data_table';
import NavigatorButtons from './ui/navigator_buttons';
import Spinner from './ui/spinner';
import DataProcessor from './service/data_processor';

const spinner = new Spinner("spinner", "alert");
const dataProvider = new CovidData();
const dataProcessor = new DataProcessor(dataProvider.getContinentCases());

//dataProvider.getContinentCases().then(data=>console.log(data));

const continentTableDefinition = [
    { key: 'continent', displayName: 'Continent' },
    { key: 'confirmedCases', displayName: 'Confirmed cases(%)' },
    { key: 'confirmedDeath', displayName: 'Death cases(%)' },
    // { key: 'updateData', displayName: "Update time" },
    ];
const continentDataTable = new DataTable(continentTableDefinition, "data-table");
const navigator = new NavigatorButtons(["0","1","2","3"]);




window.showContinentTable = async () => {
    navigator.setActive(0);
    continentDataTable.showTable(await spinner.awaitWithSpinner(dataProcessor.getAllFormatData()));
}