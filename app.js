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
    }); 

};

function buildCharts (name) {
// bar chart 
d3.json('data/samples.json').then((data) => {
    var samples = data.samples
    var values = samples.filter(object=>object.id=== name)
    var ids = values[0].otu_ids
    var labels = values[0].otu_labels
    var sampleValues = values[0].sample_values

    var data = [{
        x: sampleValues.reverse().slice(0,10),
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

function handleSubmit(){
    d3.event.preventDefault();
    var newID = d3.select("#selDataset").node().value;
    console.log(newID);
    buildCharts(newID);
  
}
d3.select("#submit").on("click", handleSubmit);
init();





//bubble chart
//<div id="bubble"></div>
// var trace1 = {
//     x: data.samples.out_ids,
//     y: data.samples.sample_values,
//     text:data.samples.out_labels,
//     mode: 'markers',
//     marker: {
//       size: data.samples.sample_values,
//       color:data.samples.otu_ids,

//     }
//   };
  
//   var data = [trace1];
  
//   var layout = {
//     title: 'Bacteria Cultures Per Sample',
//     xaxis: {title: 'OTU ID'},
//     showlegend: false,
//     };
  
//   Plotly.newPlot('bubble', data, layout);

  //Demographic Info

//<div id="sample-metadata" class="panel-body"></div>



