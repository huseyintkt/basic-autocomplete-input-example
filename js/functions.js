/**
 * This function makes the location container visible.
 */
const showLocations = () => {
  locationContainerEl.style.display = 'block';
};

/**
 * This function makes the location container invisible.
 */
const hideLocations = () => {
  locationContainerEl.style.display = 'none';
};

/**
 * This function searches according to the value entered in the input.
 */
const handleOnKeyUp = () => {
  const searchValue = searchEl.value;
  createLocationTemplate(filteredLocationList, searchValue);
};

/**
 * @param {String} pLocation
 * This function sets the location selected from the location list to the input.
 */
const setSearchValue = (pLocation) => {
  searchEl.value = pLocation;
  hideLocations();
};

/**
 * This function fetches the data from the db.json file and creates the location template
 */
const getData = () => {
  var req = new XMLHttpRequest();

  req.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      filteredLocationList = JSON.parse(req.response);
      createLocationTemplate(JSON.parse(req.response));
    }
  };

  req.open('GET', './db/data.json', true);
  req.send();
};

/**
 * @param {Array} pLocationList
 * @param {String} pSearchValue
 * This function creates template according to the location list and search value. If there is no suitable location, it shows not found information.
 */
const createLocationTemplate = (pLocationList, pSearchValue = '') => {
  let locationTemplate = '';
  const filteredLocationList = pLocationList.filter((item) =>
    item.location.toLowerCase().includes(pSearchValue.toLowerCase())
  );

  if (filteredLocationList.length === 0) {
    locationTemplate = `<span class="no-results-found">No results found</span>`;
  } else {
    locationTemplate = filteredLocationList
      .map((item) => {
        return `
              <span class="location-item" onclick="setSearchValue('${item.location}')">${item.location}</span>
            `;
      })
      .join('');
  }

  locationContainerEl.innerHTML = locationTemplate;
};

/**
 * @param {Event} e
 * This function displays the selected location.
 */
const showSelectedLocation = (e) => {
  e.preventDefault();
  alert(`Your chosen location is ${searchEl.value}!`);
};
