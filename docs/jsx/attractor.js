// jshint esversion: 6

const board = JXG.JSXGraph.initBoard('jxgbox', { 
    boundingbox: [-5, 5, 5, -5], axis:true
});
const a = board.create('point',[1.4,2],{size:12, color: "#EEEE00", name:'Sun'});
/* console.log(a.X())
 */
function f(t) {
  return [(1+ 0.6*Math.cos(7*t))*2*Math.cos(t),(1+ 0.6*Math.cos(5*t))*2*Math.sin(t)];
}

function mag(v) {
	return Math.sqrt(Math.pow(v[0],2) + Math.pow(v[1],2));
}
const L = 2*Math.PI;

const c = board.create('curve',[(t) => {return f(t)[0];},(t) => {return f(t)[1];},0,L],{strokeWidth: 3});

var g1 = board.create('glider',[a.X,a.Y,c],{color: "#2222FF",size: 6});

var arrowGroup = [];


for(i = -4 ; i <= 4 ; i= i + 0.5) {
	for(j = -4; j <= 4; j += 0.5) {
    const pt1 = board.create('point',[i ,j ],{visible: false});
    const norm = mag([a.X() - pt1[0], a.Y() - pt1[1]]);
		const c1 = board.create('circle',[pt1,0.4],{visible: false});
		const s1 = board.create('line',[pt1,a],{visible: false});
		const pt2 = board.create('intersection',[c1,s1,0],{visible: false});
    arrowGroup.push(board.create('arrow',[pt1,pt2],{color: "red",strokeOpacity: 0.6}));
	}
}

var i = 9;

function dt(t,step=0.1) {
	df = f((t + step) % L);
  xy = f(t);
  v = [a.X() - xy[0],a.Y() - xy[1]];
  return ((df[0] - xy[0]) * v[0] + (df[1] - xy[1]) * v[1])/Math.max(mag(v),1);
}


var timedId = setInterval(() => {
    deltaT = dt(g1.position,0.01);
    g1.position = (g1.position + deltaT) % L;
    g1.prepareUpdate().update(true).updateRenderer();

    // if (deltaT <= 0.005) {
    //   clearInterval(timedId);
    // }
  },100);

