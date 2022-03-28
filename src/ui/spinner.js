export default class Spinner {
    #spinnerElement
    #alertElement
    constructor(idSpinnerParent, idAlert) {
        this.#spinnerElement = document.getElementById(idSpinnerParent);
        this.#alertElement = document.getElementById(idAlert);
    }

async awaitWithSpinner(promise) {
    this.#startSpinner();
    try {
        const response = await promise;
        this.#stopSpinner();
        return response;
    } catch (err) {
        this.#stopSpinner();
        this.#alertElement.innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
        <strong>Error: </strong> ${err}<br>Server is unavailible, repeat later please</br>  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>`;
    }
}

#startSpinner () {
    this.#spinnerElement.innerHTML = `<div class="d-flex justify-content-center">
    <div class="spinner-border" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>`
}                                                                                                 

#stopSpinner () {
    this.#spinnerElement.innerHTML = ""
}

}