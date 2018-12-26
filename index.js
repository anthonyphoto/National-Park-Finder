'use strict';

// put your own value below!
const apiKey = 'lxCCwWvBpbmjxn5tGEti4G5Yk7p9VoFxlULBx2uW'; 
const searchURL = 'https://developer.nps.gov/api/v1/parks';


function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}

function displayResults(responseJson) {
  // if there are previous results, remove them
  console.log(responseJson);
  // iterate through the items array

  if (responseJson.data.length === 0) {
    $('#results-list').append(`<h3><font color='red'>No record found</font></h3>`);
    return;
  }

  for (let i = 0; i < responseJson.data.length; i++){
    // for each video object in the items 
    //array, add a list item to the results 
    //list with the video title, description,
    //and thumbnail
    $('#results-list').append(
      `<li><h3>${responseJson.data[i].fullName}</h3>
      <p>${responseJson.data[i].description}</p>
      <a href='${responseJson.data[i].url}'>${responseJson.data[i].url}</a>
      </li>`
    )};
  //display the results section  
  $('#results').removeClass('hidden');
};

function getYouTubeVideos(query, maxResults=10) {
  $('#results-list').empty();
  $('#js-search-states').empty();

  const params = {
    api_key: apiKey,
    stateCode: query,
    limit: maxResults - 1,
  };
  const queryString = formatQueryParams(params)
  const url = searchURL + '?' + queryString;

  console.log(url);

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const searchStates = $('#js-search-states').val();
    const maxResults = $('#js-max-results').val();
    getYouTubeVideos(searchStates, maxResults);
  });
}

$(watchForm);