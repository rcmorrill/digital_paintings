
var scaleYhue = d3.scale.linear().domain([85,130]).range([0,100])
var scaleYsat = d3.scale.linear().domain([30,145]).range([0,100])
var scaleYbright = d3.scale.linear().domain([130,207]).range([0,100])
var scaleY = d3.scale.linear().domain([0,100]).range([height,0])


document.getElementById('hue').focus();



d3.csv ('paintings/LesDem/LesDem.csv',parse,dataLoaded);

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
    .attr("xlink:href", function(d){return 'paintings/LesDem/images/'+ d.label})
    .attr('x',function(d){return d.x})
    .attr('y',height/2)
    .attr('width',43)
    .attr("height", 43)
    //.attr('opacity',.4)
        .on( 'mouseenter', function() {
 

              d3.selectAll('.node')
               .attr('width',43)
               .attr("height", 43)

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
              .attr("height",  70)
              .attr("width", 70)
              
          })
          // set back
          .on( 'mouseleave', function() {
            d3.select( this )
              .attr("height", 43)
              .attr("width", 43);
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
           focus.y = scaleYbright(d.bright);

            d.x += (focus.x-d.x)*(e.alpha*.1);
            d.y += (focus.y-d.y)*(e.alpha*.1);
        })
       .attr('y',function(d){return scaleY(d.y)})
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
           focus.y = scaleYsat(d.sat);

            d.x += (focus.x-d.x)*(e.alpha*.1);
            d.y += (focus.y-d.y)*(e.alpha*.1);
        })

       .attr('y',function(d){return scaleY(d.y)})
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
           focus.y = scaleYhue(d.hue);

            d.x += (focus.x-d.x)*(e.alpha*.1);
            d.y += (focus.y-d.y)*(e.alpha*.1);
        })
       .attr('y',function(d){return scaleY(d.y)})
       .attr('x',function(d){return d.x})


}//END onForceTick Function


}//end data loaded






/*--------------reruning palette analysis and changing images ---------------*/



var colorss = d3.colorColor()
d3.select('#hue').call(colorss)


function pictureHue(){

document.getElementById("high").src="paintings/LesDem/images/2Q== (2).jpg";
document.getElementById("med").src="paintings/LesDem/images/images (14).jpg";
document.getElementById("low").src="paintings/LesDem/images/Z (4).jpg";

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

document.getElementById("high").src="paintings/LesDem/images/2Q== (1).jpg";
document.getElementById("med").src="paintings/LesDem/images/images (7).jpg";
document.getElementById("low").src="paintings/LesDem/images/images (14).jpg";


highAnchor.text('brightness');
lowAnchor.text('brightness');

// d3.selectAll('.swatch')
// .classed('noDisplay',true)
 $('div.swatch').remove();


var colorss = d3.colorColor()
d3.select('#hue').call(colorss)

}



function pictureSat(){

document.getElementById("high").src="paintings/LesDem/images/images.jpg";
document.getElementById("med").src="paintings/LesDem/images/images (3).jpg";
document.getElementById("low").src="paintings/LesDem/images/images (1).jpg";

highAnchor.text('saturation');
lowAnchor.text('saturation');


// d3.selectAll('.swatch')
// .classed('noDisplay',true)
 $('div.swatch').remove();


var colorss = d3.colorColor()
d3.select('#hue').call(colorss)

}



