// import React from 'react';
// import {fabric} from  'fabric';

// class FabricCanvas extends React.Component{
//     constructor(props){
//         super(props);
//         this.state = {}
//     }

//       componentDidMount(){
//         var canvas = new fabric.Canvas('canvas');
 
//         var rect = new fabric.Rect({
//             top : 100,
//             left : 100,
//             width : 60,
//             height : 70,
//             fill : 'red'
//         });
 
//         canvas.add(rect);

//         canvas.on({
//             'touch:gesture': function(e) {
//                 console.log("touched")
//                 if (e.e.touches && e.e.touches.length == 1) {
//                     console.log("touched")
//                     // pausePanning = true;
//                     // var point = new fabric.Point(e.self.x, e.self.y);
//                     // if (e.self.state == "start") {
//                     //     zoomStartScale = self.canvas.getZoom();
//                     // }
//                     // var delta = zoomStartScale * e.self.scale;
//                     // self.canvas.zoomToPoint(point, delta);
//                     // pausePanning = false;
//                 }
//             },
//             'object:selected': function() {
//                 // pausePanning = true;
//             },
//             'selection:cleared': function() {
//                 // pausePanning = false;
//             },
//             'touch:drag': function(e) {
//                 // if (pausePanning == false && undefined != e.e.layerX && undefined != e.e.layerY) {
//                 //     currentX = e.e.layerX;
//                 //     currentY = e.e.layerY;
//                 //     xChange = currentX - lastX;
//                 //     yChange = currentY - lastY;
    
//                 //     if( (Math.abs(currentX - lastX) <= 50) && (Math.abs(currentY - lastY) <= 50)) {
//                 //         var delta = new fabric.Point(xChange, yChange);
//                 //         canvas.relativePan(delta);
//                 //     }
    
//                 //     lastX = e.e.layerX;
//                 //     lastY = e.e.layerY;
//                 // }
//             }
//         });
//       }

//     render(){
//         return(
//             <div>
//         <canvas id="canvas" width="300" height="300"></canvas>
//             </div>
//         )
//     }
// }

// export default FabricCanvas;