function init() {
    
    // add the ids to the drop down menu
    var id = d3.select('#selDataset');
    d3.json('data/samples.json').then((data) => {
        var sampleNames = data.names;
        sampleNames.forEach((name)=> {
            id.append('option').text(name).property('value', name)
        });
    });


};

init();

    


// D3.selectAll("#selDataset").on("change", getData);


// function getData() {
//     var dropdownMenu = d3.select("#selDataset");
//     // Assign the value of the dropdown menu option to a variable
//     var dataset = dropdownMenu.property("value");
//     // Initialize an empty array for the country's data
//     var data = [];
  
//     if (dataset == 'us') {
//         data = us;
//     }
//     else if (dataset == 'uk') {
//         data = uk;
//     }
//     else if (dataset == 'canada') {
//         data = canada;
//     }
  

