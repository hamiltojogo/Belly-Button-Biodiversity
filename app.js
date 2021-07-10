function init() {    
    // add the ids to the drop down menu
    var id = d3.select('#selDataset');
    d3.json('data/samples.json').then((data) => {
        console.log(data)
        var sampleNames = data.names;
        sampleNames.forEach((name)=> {
            id.append('option').text(name).property('value', name)
        });
        buildCharts(sampleNames[0]);
        buildMetaData(sampleNames[0]);
    }); 
};
//call updatePlotly () when a change takes place
d3.selectAll("#selDataset").on('change', updatePlotly);
//This function is called when a dropdown menu item is selected
function updatePlotly() {
  var dropdownMenu = d3.selectAll("#selDataset");
  console.log(dropdownMenu);
  var newID = dropdownMenu.property('value');
  buildCharts(newID);
  buildMetaData(newID); 
};

function buildCharts (name) {
// bar chart 
d3.json('data/samples.json').then((data) => {
    var samples = data.samples
    var valueArray = samples.filter(object=>object.id=== name)
    var value = valueArray[0]
    var ids = value.otu_ids
    var labels = value.otu_labels
    var sampleValues = value.sample_values.map((quantity)=>parseInt(quantity))
    

    var data = [{
        x: sampleValues.slice(0,10).reverse(),
        y:ids.reverse().slice(0,10).map(otuid=>`OTU ${otuid}`),
        type: 'bar',
        orientation: 'h',
        text: labels.reverse().slice(0,10),
    }];
    var layout = {
        title: 'Top 10 Bacteria Cultures Found',
        xaxis: {title: 'Sample Size'},
        yaxis: {title: 'OTUs'},
    };
    Plotly.newPlot('bar', data, layout);
    //bubble chart
     var trace1 = {
        x: ids,
        y: sampleValues,
        text:labels,
        mode: 'markers',
        marker: {
          size: sampleValues,
          color:ids,
        }
      };  
      var data = [trace1];    
      var layout = {
        title: 'Bacteria Cultures Per Sample',
        xaxis: {title: 'OTU ID'},
        showlegend: false,
        };
      Plotly.newPlot('bubble', data, layout);
});

};
//populate the metadata table 
function buildMetaData (name) {
d3.select("#sample-metadata").selectAll("p").remove();
d3.json('data/samples.json').then((data) =>{
  var metadata = data.metadata
  var filterData = metadata.filter(sampleObject => sampleObject.id == name);
  var info = filterData[0];
  var metaTable = d3.select('#sample-metadata');
  metaTable.html('');
  Object.entries(info).forEach(([key, value]) => {
      metaTable.append('p').text(`${key}: ${value}`)
    });
  })
};


init();






