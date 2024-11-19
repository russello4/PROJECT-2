let table;
let filteredTable;
 
function preload() {
  table = loadTable('./assets/bassrecord2024.csv', 'csv', 'header');
}
 
function setup() {
  createCanvas(750, 650);
  noLoop();
 
  const buttons = document.querySelectorAll('#button-holder button');
  for (const button of buttons) {
    button.addEventListener('click', handleButtonClick);
  }
}
 
function draw() {
  background('green');
 
  if (!table) return;
 
  const dataToDraw = filteredTable || table;
  const numRows = dataToDraw.getRowCount();
  const Weight = dataToDraw.getColumn('Bass_WeightLbs');
  const USRegion = dataToDraw.getColumn('USRegion');
  const USstate = dataToDraw.getColumn('state');
 
  for (let i = 0; i < numRows; i++) {
    const X = 100;
    const Y = 25 + (i * 12);
    const W = Weight[i] * 20;
    const H = 10;
 
   //region colors
    switch (USRegion[i]) {
      case 'North East':
        fill('red');
        break;
      case 'South East':
        fill('blue');
        break;
      case 'Midwest':
        fill('orange');
        break;
      case 'Outlier':
        fill('teal');
        break;
      case 'West':
        fill('purple');
        break;
      case 'South West':
        fill('hotpink');
        break;
      default:
        fill(220);
    }
 
    rect(X, Y, W, H);
 
    fill('white');
    textSize(8);
    text(USRegion[i] + ' - ' + USstate[i] + ' - ' + Weight[i] + ' lbs', X + 10, Y + 8);
  }
}
 
function handleButtonClick(event) {
  const clickedButtonId = event.target.id;
 
  // region button mapping
  const regionMapping = {
    northEastButton: 'North East',
    southEastButton: 'South East',
    midwestButton: 'Midwest',
    outlierButton: 'Outlier',
    westButton: 'West',
    southWestButton: 'South West',
    allButton: 'All'
  };
 
  const regionToFilter = regionMapping[clickedButtonId];
 
  if (regionToFilter === 'All') {
    filteredTable = null;
  } else if (regionToFilter) {
    const filteredRows = table.getRows().filter(row => row.get('USRegion') === regionToFilter);
 
   //table filter
    filteredTable = new p5.Table();
    filteredTable.columns = table.columns;
 
    for (const row of filteredRows) {
      const newRow = filteredTable.addRow();
      for (const column of table.columns) {
        newRow.set(column, row.get(column));
      }
    }
  }
 
  redraw();
}