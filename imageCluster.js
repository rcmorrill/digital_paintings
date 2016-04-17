
var margin = {t:50,r:50,b:50,l:50};
var width = document.getElementById('cluster').clientWidth-margin.l-margin.r,
  height = document.getElementById('cluster').clientHeight-margin.t-margin.b;



var plot = d3.select('.cluster')
  .append('svg')
  .attr('width',width+margin.l+margin.r)
  .attr('height',height+margin.t+margin.b)
  .append('g')
  .attr('class','plot')
  .attr('transform', 'translate ('+margin.l+','+margin.r+')');



  var scaleX = d3.scale.linear().domain([0,10]).range([0,width])
 

var force = d3.layout.force()
    .size([width,height])
    .charge(0)
    .gravity(0);

var axisX = d3.svg.axis()
    .orient('bottom')
    .tickValues([0,2,4,6,8,10])
    .scale(scaleX);

/*----------------labels--------*/

plot.append('text')
  .text('highest')
  .attr('class','labels')
  .attr('x',width)
  .attr('y',height*.01)
  .attr('fill','rgb(123,123,123)')

plot.append('text')
  .text('median')
  .attr('class','labels')
  .attr('x',width)
  .attr('y',height*.03)
  .attr('fill','rgb(123,123,123)')

var highAnchor = plot.append('text')
  .text('hue')
  .attr('class','labels')
  .attr('x',width)
  .attr('y',height*.05)
  .attr('fill','rgb(123,123,123)')

plot.append('text')
  .text('value')
  .attr('class','labels')
  .attr('x',width)
  .attr('y',height*.07)
  .attr('fill','rgb(123,123,123)')

plot.append('text')
  .text('lowest')
  .attr('class','labels')
  .attr('x',width)
  .attr('y',height*.71)
  .attr('fill','rgb(123,123,123)')

plot.append('text')
  .text('median')
  .attr('class','labels')
  .attr('x',width)
  .attr('y',height*.73)
  .attr('fill','rgb(123,123,123)')


var lowAnchor = plot.append('text')
  .text('hue')
  .attr('class','labels')
  .attr('x',width)
  .attr('y',height*.75)
  .attr('fill','rgb(123,123,123)')

plot.append('text')
  .text('value')
  .attr('class','labels')
  .attr('x',width)
  .attr('y',height*.77)
  .attr('fill','rgb(123,123,123)')







plot.append('rect')
  .attr('x',width*.95)
  .attr('y',0)
  .attr('height',height*.75)
  .attr('width','1px')
  .attr('fill','gray')





function collide(dataPoint){
    var nr = dataPoint.r + 2,
        nx1 = dataPoint.x - nr,
        ny1 = dataPoint.y - nr,
        nx2 = dataPoint.x + nr,
        ny2 = dataPoint.y + nr;

    return function(quadPoint,x1,y1,x2,y2){
        if(quadPoint.point && (quadPoint.point !== dataPoint)){
            var x = dataPoint.x - quadPoint.point.x,
                y = dataPoint.y - quadPoint.point.y,
                l = Math.sqrt(x*x+y*y),
                r = nr + quadPoint.point.r;
            if(l<r){
                l = (l-r)/l*.1;
                dataPoint.x -= x*= l;
                dataPoint.y -= y*= (l*.05);
                quadPoint.point.x += x;
                quadPoint.point.y += (y*.05);
            }
        }
        return x1>nx2 || x2<nx1 || y1>ny2 || y2<ny1;
    }
}






