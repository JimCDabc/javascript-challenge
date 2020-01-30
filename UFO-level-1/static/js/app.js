// from data.js
var tableData = data;

// YOUR CODE HERE!
// Console.log the data from data.js
// console.log(tableData);

// function loop through each report and add to the table
function buildHTMLTable(reports) {
  // Get a reference to the table body
  var tbody = d3.select("tbody");
  // Clear table body
  tbody.html("")

  // loop through ech report and add to HTML table body
  reports.forEach((report) => {
    console.log(report)
    var row = tbody.append("tr");
    Object.entries(report).forEach(([key, value]) => {
      var cell = row.append("td");
      cell.text(value);
    });
  });
}

// build initial table from the data
buildHTMLTable(tableData);

// Filter by Date function
function filterbyDate(dataset, inDateStr) {
  // initialize filterdData array
  var filteredData = [];

  // parse the date and check to see if valid date
  var parseDate = d3.timeParse("%m/%d/%Y");
  var inputDate = parseDate(inDateStr);
 
  if (inputDate !== null) {
    console.log(`${inDateStr} parsed to datetime: ${inputDate}`);

    // filter table by date-time that is taken from inputvalue.
    // var filteredData = tableData.filter(report => (parseDate(report.datetime) == inputDate));
    filteredData = 
      dataset.filter(report => (parseDate(report.datetime).getTime() === inputDate.getTime()));

    // console.log(filteredData);
    
  } else {
    console.log(`INPUT ERROR: Invalid date entered: ${inDateStr}`)
  }

  return filteredData
}

// Select the button
var button = d3.select("#filter-btn");

button.on("click", function() {

  // initialize filterdData array to be all the data
  var filteredData = tableData;

  // Select the input element and get the raw HTML node
  var inputElement = d3.select("#datetime");

  // Get the value property of the input element
  var inputDateStr = inputElement.property("value");
 
  // if there is a date value to filter, then filter by date
  if (inputDateStr != "") {
    filteredData = filterbyDate(filteredData, inputDateStr);
  }

  // build the HTML Table
  buildHTMLTable(filteredData);
  
});