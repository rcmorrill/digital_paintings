
var scaleYhue = d3.scale.linear().domain([80,167]).range([height,0])
var scaleYsat = d3.scale.linear().domain([20,150]).range([height,0])
var scaleYbright = d3.scale.linear().domain([80,175]).range([height,0])





document.getElementById('hue').focus();



d3.csv ('paintings/starryNight/starryNight.csv',parse,dataLoaded);

function parse(d){


      return{
        r: 7,
        bright: +d.brightness_median,
        sat: +d.saturation_median,
        hue: +d.hue_median,
        label: d.filename,
        key: d.key,
      }
}

function dataLoaded(err,data){


var nodes = plot.selectAll ('.node')
  .data(data, function(d){return d.label});



var nodesEnter= nodes.enter()
    .append("image")
    .attr("class", "node")
    .attr("xlink:href", function(d){return 'paintings/starryNight/images/'+ d.label})
    .attr('x',function(d){return d.x})
    .attr('y',height/2)
    .attr('width',50)
    .attr("height", 50)
    //.attr('opacity',.4)
        .on( 'mouseenter', function() {
            // select element in current context
            // var xy = d3.mouse(document.getElementById('plot'));
            // //this finds the xy of the mouse in relation to this element
            // //console.log(xy);

            // var left = xy[0]*.05, top = xy[1]-120;

            // console.log(left,top);


            plot.append("image")
            .attr('d',d3.select(this).attr('d'))
            .attr("xlink:href", d3.select(this).attr("xlink:href"))
               .attr("height", 200)
               .attr("width", 200)
               // .attr('x',left +'px')
               // .attr('y',top +'px')
               .attr('x',width*.2)
               .attr('y',height*.8)
               .attr("class","bigPic")


            d3.select( this )
              .transition()
              .attr("height", function(d){  return 70})
              .attr("width", 60)

          })
          // set back
          .on( 'mouseleave', function() {
            d3.select( this )
              .attr("height", 40)
              .attr("width", 40);
              d3.select('.bigPic').remove();
          })





nodes.exit().remove();

nodes.transition()
  force.nodes(data)
    .on('tick',hueForce)
    .start();

    d3.select('#bright').on('click',function(){
      force.stop()
        .on('tick',brightForce)
        .start()

    });

    d3.select('#hue').on('click',function(){
      force.stop()
        .on('tick',hueForce)
        .start()

    });

    d3.select('#sat').on('click',function(){
      force.stop()
        .on('tick',satForce)
        .start()

    });






function brightForce(e){
    var q = d3.geom.quadtree(data),
        i = 0,
        n = data.length;

    while( ++i<n ){
        q.visit(collide(data[i]));
    }
 nodes
        .each(function(d){
        var focus = {};
           focus.x = width*.4;
           focus.y = d.bright;

            d.x += (focus.x-d.x)*(e.alpha*.1);
            d.y += (focus.y-d.y)*(e.alpha*.1);
        })
       .attr('y',function(d){return scaleYbright(d.y)})
       .attr('x',function(d){return d.x})


}//END onForceTick Function

function satForce(e){
    var q = d3.geom.quadtree(data),
        i = 0,
        n = data.length;

    while( ++i<n ){
        q.visit(collide(data[i]));
    }
 nodes
        .each(function(d){
        var focus = {};
           focus.x = width*.4;
           focus.y = d.sat;

            d.x += (focus.x-d.x)*(e.alpha*.1);
            d.y += (focus.y-d.y)*(e.alpha*.1);
        })
       .attr('y',function(d){return scaleYsat(d.y)})
       .attr('x',function(d){return d.x})


}//END onForceTick Function
function hueForce(e){
    var q = d3.geom.quadtree(data),
        i = 0,
        n = data.length;

    while( ++i<n ){
        q.visit(collide(data[i]));
    }
 nodes
        .each(function(d){
        var focus = {};
           focus.x = width*.4;
           focus.y = d.hue;

            d.x += (focus.x-d.x)*(e.alpha*.1);
            d.y += (focus.y-d.y)*(e.alpha*.1);
        })
       .attr('y',function(d){return scaleYhue(d.y)})
       .attr('x',function(d){return d.x})


}//END onForceTick Function


}//end data loaded






/*--------------reruning palette analysis and changing images ---------------*/



var colorss = d3.colorColor()
d3.select('#hue').call(colorss)


function pictureHue(){

document.getElementById("high").src="paintings/starryNight/images/images (4).jpg";
document.getElementById("med").src="paintings/starryNight/images/images (7).jpg";
document.getElementById("low").src="paintings/starryNight/images/2Q== (2).jpg";

highAnchor.text('hue');
lowAnchor.text('hue');




// var rect = plot.append('rect')
//     .attr('x',width)
//     .attr('y',10)
//     .attr('width',15)
//     .attr('height',15)
//     .attr('fill','rgb(107, 109, 138)')


// d3.selectAll('.swatch')
// .classed('noDisplay',true)
 $('div.swatch').remove();

var colorss = d3.colorColor()
d3.select('#hue').call(colorss)





}



function pictureBright(){

document.getElementById("high").src="paintings/starryNight/images/images (9).jpg";
document.getElementById("med").src="paintings/starryNight/images/9k= (4).jpg";
document.getElementById("low").src="paintings/starryNight/images/9k=.jpg";


highAnchor.text('brightness');
lowAnchor.text('brightness');

// d3.selectAll('.swatch')
// .classed('noDisplay',true)
 $('div.swatch').remove();


var colorss = d3.colorColor()
d3.select('#hue').call(colorss)

}



function pictureSat(){

document.getElementById("high").src="paintings/starryNight/images/images (12).jpg";
document.getElementById("med").src="paintings/starryNight/images/images (1).jpg";
document.getElementById("low").src="paintings/starryNight/images/images (5).jpg";

highAnchor.text('saturation');
lowAnchor.text('saturation');


// d3.selectAll('.swatch')
// .classed('noDisplay',true)
 $('div.swatch').remove();


var colorss = d3.colorColor()
d3.select('#hue').call(colorss)

}



