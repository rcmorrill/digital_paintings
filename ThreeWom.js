
 var scaleYhue = d3.scale.linear().domain([100,146]).range([height,0])
  var scaleYsat = d3.scale.linear().domain([12,130]).range([height,0])
  var scaleYbright = d3.scale.linear().domain([70,200]).range([height,0])

document.getElementById('hue').focus();



d3.csv ('paintings/ThreeWomen/ThreeWomen.csv',parse,dataLoaded);

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
    .attr("xlink:href", function(d){return 'paintings/ThreeWomen/images/'+ d.label})
    .attr('x',function(d){return d.x})
    .attr('y',function(d){return d.y})
    .attr('width',50)
    .attr("height", 50)
    //.attr('opacity',.4)
        .on( 'mouseenter', function() {
            // select element in current context
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

document.getElementById("high").src="paintings/ThreeWomen/images/2Q== (6).jpg";
document.getElementById("med").src="paintings/ThreeWomen/images/9k=.jpg";
document.getElementById("low").src="paintings/ThreeWomen/images/Z (3).jpg";


highAnchor.text('hue');
lowAnchor.text('hue');

// d3.selectAll('.swatch')
// .classed('noDisplay',true)
 $('div.swatch').remove();

var colorss = d3.colorColor()
d3.select('#hue').call(colorss)

}



function pictureBright(){

document.getElementById("high").src="paintings/ThreeWomen/images/images (6).jpg";
document.getElementById("med").src="paintings/ThreeWomen/images/images.jpg";
document.getElementById("low").src="paintings/ThreeWomen/images/2Q== (5).jpg";


highAnchor.text('brightness');
lowAnchor.text('brightness');

// d3.selectAll('.swatch')
// .classed('noDisplay',true)
 $('div.swatch').remove();


var colorss = d3.colorColor()
d3.select('#hue').call(colorss)

}



function pictureSat(){

document.getElementById("high").src="paintings/ThreeWomen/images/9k= (4).jpg";
document.getElementById("med").src="paintings/ThreeWomen/images/2Q== (4).jpg";
document.getElementById("low").src="paintings/ThreeWomen/images/2Q== (5).jpg";

highAnchor.text('saturation');
lowAnchor.text('saturation');

// d3.selectAll('.swatch')
// .classed('noDisplay',true)
 $('div.swatch').remove();


var colorss = d3.colorColor()
d3.select('#hue').call(colorss)

}




