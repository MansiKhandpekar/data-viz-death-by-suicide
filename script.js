d3.csv("./data/data_suicide_rate.csv").then(function(data) {

    console.log(data);

    // DEFINE DIMENSIONS AND GENERATE SVG

    const width = document.querySelector("#chart").clientWidth;
    const height = document.querySelector("#chart").clientHeight;
    const margin = {top: 40, left: 60, right: 40, bottom: 120};

    const svg = d3.select("#chart")
        .append("svg")
        .attr("width", width)
        .attr("height", height);

    //FILTER DATA

    const data_Bel = data.filter(function(d){
        return (d.country == "Belgium")
    });
    const data_Bel_f = data.filter(function(d){
        return d.country == "Belgium" && d.sex == "Female" ;
    });
    const data_Bel_m = data.filter(function(d){
        return d.country == "Belgium" && d.sex == "Male" ;
    });

    console.log(data_Bel, data_Bel_f);

    const data_Jap = data.filter(function(d){
        return (d.country == "Japan")
    });
    const data_Jap_f = data_Jap.filter(function(d){
        return d.sex == "Female" ;
    });
    const data_Jap_m = data_Jap.filter(function(d){
        return d.sex == "Male" ;
    });

    console.log(data_Jap, data_Jap_f,data_Jap_m);

    const data_Swe = data.filter(function(d){
        return (d.country == "Sweden")
    });
    const data_Swe_f = data_Swe.filter(function(d){
        return d.sex == "Female" ;
    });
    const data_Swe_m = data_Swe.filter(function(d){
        return d.sex == "Male" ;
    });

    const data_Ind = data.filter(function(d){
        return (d.country == "India")
    });
    const data_Ind_f = data_Ind.filter(function(d){
        return d.sex == "Female" ;
    });
    const data_Ind_m = data_Ind.filter(function(d){
        return d.sex == "Male" ;
    });

    const data_Usa = data.filter(function(d){
        return (d.country == "United States of America");
    });
    const data_Usa_f = data_Usa.filter(function(d){
        return d.sex == "Female" ;
    });
    const data_Usa_m = data_Usa.filter(function(d){
        return d.sex == "Male" ;
    });

    const data_SKo = data.filter(function(d){
        return (d.country == "Republic of Korea")
    });
    const data_SKo_f = data_SKo.filter(function(d){
        return d.sex == "Female" ;
    });
    const data_SKo_m = data_SKo.filter(function(d){
        return d.sex == "Male" ;
    });

    const data_Chn = data.filter(function(d){
        return (d.country == "China")
    });
    const data_Chn_f = data_Chn.filter(function(d){
        return d.sex == "Female" ;
    });
    const data_Chn_m = data_Chn.filter(function(d){
        return d.sex == "Male" ;
    });

    const data_Kaz = data.filter(function(d){
        return (d.country == "Kazakhstan")
    });
    const data_Kaz_f = data_Kaz.filter(function(d){
        return d.sex == "Female" ;
    });
    const data_Kaz_m = data_Kaz.filter(function(d){
        return d.sex == "Male" ;
    });

    const filterAll = data.filter(function(d){
        return (d.country == "Belgium" || d.country == "Japan" || d.country == "Sweden" || d.country == "India" || d.country == "United States of America" || d.country == "Republic of Korea" || d.country == "China" || d.country == "Kazakhstan");
    });

    console.log(filterAll)


    //CALCULATE MINIMUM AND MAXIMUM VALUES

    const numeric = {
        min_all: d3.min(filterAll, function(d){ return +d.low; }),
        max_all: d3.max(filterAll, function(d){ return +d.high; })
    }


    //DEFINE SCALES

    const xScale = d3.scaleLinear()
        .domain([1999, 2020])
        .range([margin.left, width-margin.right]);

    const yScale = d3.scaleLinear()
        .domain([numeric.min_all, numeric.max_all])
        .range([height-margin.bottom, margin.top]);

    svg.append("text")
        .attr("class","axisLabel")
        .attr("x", margin.left + (width-margin.left-margin.right)/2)
        .attr("y", height - 80)
        .attr("text-anchor","middle")
        .attr("font-family", "Source Sans Pro")
        .attr("font-weight",500)
        .attr("font-size", 20)
        .style("fill", "white")
        .text("Year");

    svg.append("text")
        .attr("class","axisLabel")
        .attr("x", -(height-margin.bottom)/2)
        .attr("y", 30)
        .attr("text-anchor","middle")
        .attr("transform","rotate(-90)")
        .attr("font-family", "Source Sans Pro")
        .attr("font-weight", 500)
        .attr("font-size", 20)
        .style("fill", "white")
        .text("Suicide Rate");


    //DRAW AXES

    const xAxis = svg.append("g")
        .style("font-size", "12px")
        .style("font-weight", 100)
        .attr("class","axis")
        .attr("transform", `translate(0,${height-margin.bottom})`)
        .call(d3.axisBottom().scale(xScale).tickFormat(d3.format("Y")));

    const yAxis = svg.append("g")
        .style("font-size", "12px")
        .style("font-weight", 100)
        .attr("class","axis")
        .attr("transform", `translate(${margin.left},0)`)
        .call(d3.axisLeft().scale(yScale));

    const line = d3.line()
        .x(function(d) { return xScale(d.year); })
        .y(function(d) { return yScale(d.numeric); })
        .curve(d3.curveLinear);


    //DRAW POINTS

    let g_male = svg.append("g");

        let pathM = g_male.append("path")
            .datum(data_Bel_m, function(d) { return d.numeric; })
                .attr("d", function(d) { return line(d); })
                .attr("stroke","#B6D0E2")
                .attr("fill","none")
                .attr("stroke-width", 1.5)
                .attr("stroke-opacity", 0.5);

        g_male.selectAll("circle")
            .data(data_Bel_m, function(d) { return d.numeric; })
            .enter()
            .append("circle")
                .attr("cx", function(d) { return xScale(d.year); })
                .attr("cy", function(d) { return yScale(d.numeric); })
                .attr("r", 10)
                .attr("fill", "#B6D0E2")
                // .attr("fill-opacity", 0.8);
        
    let g_female = svg.append("g");

        let pathF = g_female.append("path")
            .datum(data_Bel_f, function(d) { return d.numeric; })
                .attr("d", function(d) { return line(d); })
                .attr("stroke","pink")
                .attr("fill","none")
                .attr("stroke-width", 1.5)
                .attr("stroke-opacity", 0.5);

        g_female.selectAll("circle")
            .data(data_Bel_f, function(d) { return d.numeric; })
            .enter()
            .append("circle")
                .attr("cx", function(d) { return xScale(d.year); })
                .attr("cy", function(d) { return yScale(d.numeric); })
                .attr("r", 10)
                .attr("fill", "pink");


    //TOOLTIP

        const tooltip = d3.select("#chart")
            .append("div")
            .attr("class", "tooltip");

            svg.selectAll("circle").on("mouseover", function(e, d) {
        
                let cx = +d3.select(this).attr("cx")+15;
                let cy = +d3.select(this).attr("cy")-10;
        
                tooltip.style("visibility","visible") 
                    .style("left", `${cx}px`)
                    .style("top", `${cy}px`)
                    .html(`<b>Country:</b> ${d.country}<br><b>Region:</b> ${d.WHO_region}<br><b>Suicide rate:</b> ${Math.round(d.numeric)}<br><b>High:</b> ${Math.round(d.high)}<br><b>Low</b>: ${Math.round(d.low)}<br><b>Sex:</b> ${d.sex}<br>`);
                
                d3.select(this)
                    .attr("stroke", "white")
                    .attr("stroke-width",3);
            }).on("mouseout", function() {
        
                tooltip.style("visibility","hidden");
        
                d3.select(this)
                    .attr("stroke","none")
                    .attr("stroke-width",0);
            });

    //DATA UPDATE

        d3.select("#Bel").on("click", function() {

            xScale.domain([1999, 2020]);
            yScale.domain([numeric.min_all, numeric.max_all])

            pathF.datum(data_Bel_f, function(d) { return d.numeric; })
                .transition()
                .duration(1500)
                .attr("d", function(d) { return line(d); });

            let circleF = g_female.selectAll("circle")
                .data(data_Bel_f);

            circleF.transition() 
                .duration(1500)
                .attr("cx", function(d) { return xScale(d.year); })
                .attr("cy", function(d) { return yScale(d.numeric); })
                .attr("r",10)
                .attr("fill","pink");

            pathM.datum(data_Bel_m, function(d) { return d.numeric; })
                .transition()
                .duration(1500)
                .attr("d", function(d) { return line(d); });

            let circleM = g_male.selectAll("circle")
                .data(data_Bel_m);

            circleM.transition() 
                .duration(1500)
                .attr("cx", function(d) { return xScale(d.year); })
                .attr("cy", function(d) { return yScale(d.numeric); })
                .attr("r",10)
                .attr("fill","#B6D0E2");

            yAxis.transition()
                .duration(2000)
                .delay(250)
                .call(d3.axisLeft().scale(yScale));
        });


        d3.select("#Jap").on("click", function() {

            xScale.domain([1999, 2020]);
            yScale.domain([numeric.min_all, numeric.max_all])

            pathF.datum(data_Jap_f, function(d) { return d.numeric; })
                .transition()
                .duration(1500)
                .attr("d", function(d) { return line(d); });

            let circleF = g_female.selectAll("circle")
                .data(data_Jap_f);

            circleF.transition() 
                .duration(1500)
                .attr("cx", function(d) { return xScale(d.year); })
                .attr("cy", function(d) { return yScale(d.numeric); })
                .attr("r",10)
                .attr("fill","pink");

            pathM.datum(data_Jap_m, function(d) { return d.numeric; })
                .transition()
                .duration(1500)
                .attr("d", function(d) { return line(d); });

            let circleM = g_male.selectAll("circle")
                .data(data_Jap_m);

            circleM.transition() 
                .duration(1500)
                .attr("cx", function(d) { return xScale(d.year); })
                .attr("cy", function(d) { return yScale(d.numeric); })
                .attr("r",10)
                .attr("fill","#B6D0E2");

            yAxis.transition()
                .duration(2000)
                .delay(250)
                .call(d3.axisLeft().scale(yScale));
        });


        d3.select("#Swe").on("click", function() {

            xScale.domain([1999, 2020]);
            yScale.domain([numeric.min_all, numeric.max_all])

            pathF.datum(data_Swe_f, function(d) { return d.numeric; })
                .transition()
                .duration(1500)
                .attr("d", function(d) { return line(d); });

            let circleF = g_female.selectAll("circle")
                .data(data_Swe_f);

            circleF.transition() 
                .duration(1500)
                .attr("cx", function(d) { return xScale(d.year); })
                .attr("cy", function(d) { return yScale(d.numeric); })
                .attr("r",10)
                .attr("fill","pink");

            pathM.datum(data_Swe_m, function(d) { return d.numeric; })
                .transition()
                .duration(1500)
                .attr("d", function(d) { return line(d); });

            let circleM = g_male.selectAll("circle")
                .data(data_Swe_m);

            circleM.transition() 
                .duration(1500)
                .attr("cx", function(d) { return xScale(d.year); })
                .attr("cy", function(d) { return yScale(d.numeric); })
                .attr("r",10)
                .attr("fill","#B6D0E2");

                yAxis.transition()
                .duration(2000)
                .delay(250)
                .call(d3.axisLeft().scale(yScale));
        });


        d3.select("#Ind").on("click", function() {

            xScale.domain([1999, 2020]);
            yScale.domain([numeric.min_all, numeric.max_all])

            pathF.datum(data_Ind_f, function(d) { return d.numeric; })
                .transition()
                .duration(1500)
                .attr("d", function(d) { return line(d); });

            let circleF = g_female.selectAll("circle")
                .data(data_Ind_f);

            circleF.transition() 
                .duration(1500)
                .attr("cx", function(d) { return xScale(d.year); })
                .attr("cy", function(d) { return yScale(d.numeric); })
                .attr("r",10)
                .attr("fill","pink");

            pathM.datum(data_Ind_m, function(d) { return d.numeric; })
                .transition()
                .duration(1500)
                .attr("d", function(d) { return line(d); });

            let circleM = g_male.selectAll("circle")
                .data(data_Ind_m);

            circleM.transition() 
                .duration(1500)
                .attr("cx", function(d) { return xScale(d.year); })
                .attr("cy", function(d) { return yScale(d.numeric); })
                .attr("r",10)
                .attr("fill","#B6D0E2");

                yAxis.transition()
                .duration(2000)
                .delay(250)
                .call(d3.axisLeft().scale(yScale));
        });

        d3.select("#Usa").on("click", function() {

            xScale.domain([1999, 2020]);
            yScale.domain([numeric.min_all, numeric.max_all])

            pathF.datum(data_Usa_f, function(d) { return d.numeric; })
                .transition()
                .duration(1500)
                .attr("d", function(d) { return line(d); });

            let circleF = g_female.selectAll("circle")
                .data(data_Usa_f);

            circleF.transition() 
                .duration(1500)
                .attr("cx", function(d) { return xScale(d.year); })
                .attr("cy", function(d) { return yScale(d.numeric); })
                .attr("r",10)
                .attr("fill","pink");

            pathM.datum(data_Usa_m, function(d) { return d.numeric; })
                .transition()
                .duration(1500)
                .attr("d", function(d) { return line(d); });

            let circleM = g_male.selectAll("circle")
                .data(data_Usa_m);

            circleM.transition() 
                .duration(1500)
                .attr("cx", function(d) { return xScale(d.year); })
                .attr("cy", function(d) { return yScale(d.numeric); })
                .attr("r",10)
                .attr("fill","#B6D0E2");

                yAxis.transition()
                .duration(2000)
                .delay(250)
                .call(d3.axisLeft().scale(yScale));
        });

        d3.select("#SKo").on("click", function() {

            xScale.domain([1999, 2020]);
            yScale.domain([numeric.min_all, numeric.max_all])

            pathF.datum(data_SKo_f, function(d) { return d.numeric; })
                .transition()
                .duration(1500)
                .attr("d", function(d) { return line(d); });

            let circleF = g_female.selectAll("circle")
                .data(data_SKo_f);

            circleF.transition() 
                .duration(1500)
                .attr("cx", function(d) { return xScale(d.year); })
                .attr("cy", function(d) { return yScale(d.numeric); })
                .attr("r",10)
                .attr("fill","pink");

            pathM.datum(data_SKo_m, function(d) { return d.numeric; })
                .transition()
                .duration(1500)
                .attr("d", function(d) { return line(d); });

            let circleM = g_male.selectAll("circle")
                .data(data_SKo_m);

            circleM.transition() 
                .duration(1500)
                .attr("cx", function(d) { return xScale(d.year); })
                .attr("cy", function(d) { return yScale(d.numeric); })
                .attr("r",10)
                .attr("fill","#B6D0E2");

                yAxis.transition()
                .duration(2000)
                .delay(250)
                .call(d3.axisLeft().scale(yScale));
        });

        d3.select("#Chn").on("click", function() {

            xScale.domain([1999, 2020]);
            yScale.domain([numeric.min_all, numeric.max_all])

            pathF.datum(data_Chn_f, function(d) { return d.numeric; })
                .transition()
                .duration(1500)
                .attr("d", function(d) { return line(d); });

            let circleF = g_female.selectAll("circle")
                .data(data_Chn_f);

            circleF.transition() 
                .duration(1500)
                .attr("cx", function(d) { return xScale(d.year); })
                .attr("cy", function(d) { return yScale(d.numeric); })
                .attr("r",10)
                .attr("fill","pink");

            pathM.datum(data_Chn_m, function(d) { return d.numeric; })
                .transition()
                .duration(1500)
                .attr("d", function(d) { return line(d); });

            let circleM = g_male.selectAll("circle")
                .data(data_Chn_m);

            circleM.transition() 
                .duration(1500)
                .attr("cx", function(d) { return xScale(d.year); })
                .attr("cy", function(d) { return yScale(d.numeric); })
                .attr("r",10)
                .attr("fill","#B6D0E2");

                yAxis.transition()
                .duration(2000)
                .delay(250)
                .call(d3.axisLeft().scale(yScale));
        });


        d3.select("#Kaz").on("click", function() {

            xScale.domain([1999, 2020]);
            yScale.domain([numeric.min_all, numeric.max_all])

            pathF.datum(data_Kaz_f, function(d) { return d.numeric; })
                .transition()
                .duration(1500)
                .attr("d", function(d) { return line(d); });

            let circleF = g_female.selectAll("circle")
                .data(data_Kaz_f);

            circleF.transition() 
                .duration(1500)
                .attr("cx", function(d) { return xScale(d.year); })
                .attr("cy", function(d) { return yScale(d.numeric); })
                .attr("r",10)
                .attr("fill","pink");

            pathM.datum(data_Kaz_m, function(d) { return d.numeric; })
                .transition()
                .duration(1500)
                .attr("d", function(d) { return line(d); });

            let circleM = g_male.selectAll("circle")
                .data(data_Kaz_m);

            circleM.transition() 
                .duration(1500)
                .attr("cx", function(d) { return xScale(d.year); })
                .attr("cy", function(d) { return yScale(d.numeric); })
                .attr("r",10)
                .attr("fill","#B6D0E2");

                yAxis.transition()
                .duration(2000)
                .delay(250)
                .call(d3.axisLeft().scale(yScale));
        });


        d3.selectAll(".gender--option").on("click", function () {
            let isChecked = d3.select(this).property("checked");
            let thisSex = d3.select(this).property("value");
        if (thisSex == "Male") {
            console.log("Male: ", isChecked);
        if (isChecked) {
            g_male.attr("opacity", 1);
            } else {
            g_male.attr("opacity", 0);
            }
            } else 
        if (thisSex == "Female") {
            console.log("Female: ", isChecked);
        if (isChecked) {
            g_female.attr("opacity", 1);
            } else {
            g_female.attr("opacity", 0);
            }
            } else {
            // do nothing
            }
        });


});