// Initializes the page with a default plot
function init() {


    // Use D3 fetch to read the JSON file
   
    d3.json("data/samples.json").then((samples) => {
        // console.log(samples);
        //create trace for bar chart 
        var trace1 = {
            x: samples.samples.sample_values,
            y: samples.samples.otu_ids,
            type: 'bar',
            text:samples.samples.out_labes

        };

        var data = [trace1];

        var layout = {
            title: 'Top 10 OTUs in ---',
            xaxis: {title: 'sample'},
            yaxis: {title: 'OTUs'}

        };

        // Plot the chart to a div tag with id "plot"
        Plotly.newPlot("bar", data, layout);

    });





};

init();