import React from "react";
import { connect } from "react-redux";
import { floorList, imgDetails, getAllElements } from "../store/actions/index";
import { node } from "prop-types";

class Ar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hideAr: true
    };
  }

  componentDidMount() {
    var data = 0;
    if (this.props.history.action === "POP") {
        // console.log("props")
        window.location.href = `/knc/cmb/wayfinding?KNCollege`
      // custom back button implementation
  }
    // this.props.getAllElements(() => {
      let nodes = this.props.allNodes[0].nodes;
      console.log("nodes",nodes)
      // let coords = nodes.map(e => {
      //   if (e.coordinates !== undefined) {
      //     let num = e.coordinates.split(",");
      //     num[0] = Number(num[0]);
      //     num[1] = Number(num[1]);
      //     let arr = [num[0], num[1]];
      //     return arr;
      //   }
      // });
    // })
    window.AFRAME.registerComponent("registerevents1", {
      init: function() {
        this.marker = document.getElementById("animated-marker1");
        this.markerVisible = false;
      },
      tick: function() {
        if (!this.marker) {
          return;
        }
        if (this.marker.object3D.visible) {
          if (!this.markerVisible) {

                        data = this.marker.attributes[6].value;
            if(!data){
              data = this.marker.attributes[7].value
            }
            for (let k=0;k<nodes.length;k++){
              if(data === nodes[k].arValue){
                let utterance = new SpeechSynthesisUtterance(`You are at ${nodes[k].name}`);
                let lang = localStorage.getItem('Language');
                if(lang === "Hindi"){
                  utterance.lang = 'hi-IN'
                }else{
                  utterance.lang = 'en-US'
                }
                window.speechSynthesis.speak(utterance);
              }
            }
            console.log("attributes", this.marker.attributes, data);
            localStorage.setItem("markerVal", data);
            //   let bName = localStorage.getItem('buildingName')
                        setTimeout(()=>{
            window.location.href = `/knc/cmb/wayfinding?KNCollege&&mar=${data}`;
            },2500);
            this.markerVisible = true;
          }
        } else {
          if (this.markerVisbile) {
            this.markerVisible = false;
          }
        }
      }
    });
    window.AFRAME.registerComponent("registerevents2", {
      init: function() {
        this.marker = document.getElementById("animated-marker2");
        this.markerVisible = false;
      },
      tick: function() {
        if (!this.marker) {
          return;
        }
        if (this.marker.object3D.visible) {
          if (!this.markerVisible) {
            // let utterance = new SpeechSynthesisUtterance(`Marker detected.`);
            // window.speechSynthesis.speak(utterance);
                        data = this.marker.attributes[6].value;
            if(!data){
              data = this.marker.attributes[7].value
            }
            for (let k=0;k<nodes.length;k++){
              if(data === nodes[k].arValue){
                let utterance = new SpeechSynthesisUtterance(`You are at ${nodes[k].name}`);
                let lang = localStorage.getItem('Language');
                if(lang === "Hindi"){
                  utterance.lang = 'hi-IN'
                }else{
                  utterance.lang = 'en-US'
                }
                window.speechSynthesis.speak(utterance);
              }
            }
            console.log("attributes", this.marker.attributes, data);
            localStorage.setItem("markerVal", data);
            //   let bName = localStorage.getItem('buildingName')
                        setTimeout(()=>{
            window.location.href = `/knc/cmb/wayfinding?KNCollege&&mar=${data}`;
            },2500);
            this.markerVisible = true;
          }
        } else {
          if (this.markerVisbile) {
            this.markerVisible = false;
          }
        }
      }
    });
    window.AFRAME.registerComponent("registerevents3", {
      init: function() {
        this.marker = document.getElementById("animated-marker3");
        this.markerVisible = false;
      },
      tick: function() {
        if (!this.marker) {
          return;
        }
        if (this.marker.object3D.visible) {
          if (!this.markerVisible) {
            // let utterance = new SpeechSynthesisUtterance(`Marker detected.`);
            // window.speechSynthesis.speak(utterance);
                        data = this.marker.attributes[6].value;
            if(!data){
              data = this.marker.attributes[7].value
            }
            for (let k=0;k<nodes.length;k++){
              if(data === nodes[k].arValue){
                let utterance = new SpeechSynthesisUtterance(`You are at ${nodes[k].name}`);
                let lang = localStorage.getItem('Language');
                if(lang === "Hindi"){
                  utterance.lang = 'hi-IN'
                }else{
                  utterance.lang = 'en-US'
                }
                window.speechSynthesis.speak(utterance);
              }
            }
            console.log("attributes", this.marker.attributes, data);
            localStorage.setItem("markerVal", data);
            //   let bName = localStorage.getItem('buildingName')
                        setTimeout(()=>{
            window.location.href = `/knc/cmb/wayfinding?KNCollege&&mar=${data}`;
            },2500);
            this.markerVisible = true;
          }
        } else {
          if (this.markerVisbile) {
            this.markerVisible = false;
          }
        }
      }
    });

    window.AFRAME.registerComponent("registerevents4", {
      init: function() {
        this.marker = document.getElementById("animated-marker4");
        this.markerVisible = false;
      },
      tick: function() {
        if (!this.marker) {
          return;
        }
        if (this.marker.object3D.visible) {
          if (!this.markerVisible) {
            // let utterance = new SpeechSynthesisUtterance(`Marker detected.`);
            // window.speechSynthesis.speak(utterance);
                        data = this.marker.attributes[6].value;
            if(!data){
              data = this.marker.attributes[7].value
            }
            for (let k=0;k<nodes.length;k++){
              if(data === nodes[k].arValue){
                let utterance = new SpeechSynthesisUtterance(`You are at ${nodes[k].name}`);
                let lang = localStorage.getItem('Language');
                if(lang === "Hindi"){
                  utterance.lang = 'hi-IN'
                }else{
                  utterance.lang = 'en-US'
                }
                window.speechSynthesis.speak(utterance);
              }
            }
            console.log("attributes", this.marker.attributes, data);
            localStorage.setItem("markerVal", data);
            //   let bName = localStorage.getItem('buildingName')
                        setTimeout(()=>{
            window.location.href = `/knc/cmb/wayfinding?KNCollege&&mar=${data}`;
            },2500);
            this.markerVisible = true;
          }
        } else {
          if (this.markerVisbile) {
            this.markerVisible = false;
          }
        }
      }
    });
    window.AFRAME.registerComponent("registerevents5", {
      init: function() {
        this.marker = document.getElementById("animated-marker5");
        this.markerVisible = false;
      },
      tick: function() {
        if (!this.marker) {
          return;
        }
        if (this.marker.object3D.visible) {
          if (!this.markerVisible) {
            // let utterance = new SpeechSynthesisUtterance(`Marker detected.`);
            // window.speechSynthesis.speak(utterance);
                        data = this.marker.attributes[6].value;
            if(!data){
              data = this.marker.attributes[7].value
            }
            for (let k=0;k<nodes.length;k++){
              if(data === nodes[k].arValue){
                let utterance = new SpeechSynthesisUtterance(`You are at ${nodes[k].name}`);
                let lang = localStorage.getItem('Language');
                if(lang === "Hindi"){
                  utterance.lang = 'hi-IN'
                }else{
                  utterance.lang = 'en-US'
                }
                window.speechSynthesis.speak(utterance);
              }
            }
            console.log("attributes", this.marker.attributes, data);
            localStorage.setItem("markerVal", data);
            //   let bName = localStorage.getItem('buildingName')
                        setTimeout(()=>{
            window.location.href = `/knc/cmb/wayfinding?KNCollege&&mar=${data}`;
            },2500);
            this.markerVisible = true;
          }
        } else {
          if (this.markerVisbile) {
            this.markerVisible = false;
          }
        }
      }
    });
    window.AFRAME.registerComponent("registerevents6", {
      init: function() {
        this.marker = document.getElementById("animated-marker6");
        this.markerVisible = false;
      },
      tick: function() {
        if (!this.marker) {
          return;
        }
        if (this.marker.object3D.visible) {
          if (!this.markerVisible) {
            // let utterance = new SpeechSynthesisUtterance(`Marker detected.`);
            // window.speechSynthesis.speak(utterance);
                        data = this.marker.attributes[6].value;
            if(!data){
              data = this.marker.attributes[7].value
            }
            for (let k=0;k<nodes.length;k++){
              if(data === nodes[k].arValue){
                let utterance = new SpeechSynthesisUtterance(`You are at ${nodes[k].name}`);
                let lang = localStorage.getItem('Language');
                if(lang === "Hindi"){
                  utterance.lang = 'hi-IN'
                }else{
                  utterance.lang = 'en-US'
                }
                window.speechSynthesis.speak(utterance);
              }
            }
            console.log("attributes", this.marker.attributes, data);
            localStorage.setItem("markerVal", data);
            //   let bName = localStorage.getItem('buildingName')
                        setTimeout(()=>{
            window.location.href = `/knc/cmb/wayfinding?KNCollege&&mar=${data}`;
            },2500);
            this.markerVisible = true;
          }
        } else {
          if (this.markerVisbile) {
            this.markerVisible = false;
          }
        }
      }
    });
    window.AFRAME.registerComponent("registerevents7", {
      init: function() {
        this.marker = document.getElementById("animated-marker7");
        this.markerVisible = false;
      },
      tick: function() {
        if (!this.marker) {
          return;
        }
        if (this.marker.object3D.visible) {
          if (!this.markerVisible) {
            // let utterance = new SpeechSynthesisUtterance(`Marker detected.`);
            // window.speechSynthesis.speak(utterance);
                        data = this.marker.attributes[6].value;
            if(!data){
              data = this.marker.attributes[7].value
            }
            for (let k=0;k<nodes.length;k++){
              if(data === nodes[k].arValue){
                let utterance = new SpeechSynthesisUtterance(`You are at ${nodes[k].name}`);
                let lang = localStorage.getItem('Language');
                if(lang === "Hindi"){
                  utterance.lang = 'hi-IN'
                }else{
                  utterance.lang = 'en-US'
                }
                window.speechSynthesis.speak(utterance);
              }
            }
            console.log("attributes", this.marker.attributes, data);
            localStorage.setItem("markerVal", data);
            //   let bName = localStorage.getItem('buildingName')
                        setTimeout(()=>{
            window.location.href = `/knc/cmb/wayfinding?KNCollege&&mar=${data}`;
            },2500);
            this.markerVisible = true;
          }
        } else {
          if (this.markerVisbile) {
            this.markerVisible = false;
          }
        }
      }
    });
    window.AFRAME.registerComponent("registerevents8", {
      init: function() {
        this.marker = document.getElementById("animated-marker8");
        this.markerVisible = false;
      },
      tick: function() {
        if (!this.marker) {
          return;
        }
        if (this.marker.object3D.visible) {
          if (!this.markerVisible) {
            // let utterance = new SpeechSynthesisUtterance(`Marker detected.`);
            // window.speechSynthesis.speak(utterance);
                        data = this.marker.attributes[6].value;
            if(!data){
              data = this.marker.attributes[7].value
            }
            for (let k=0;k<nodes.length;k++){
              if(data === nodes[k].arValue){
                let utterance = new SpeechSynthesisUtterance(`You are at ${nodes[k].name}`);
                let lang = localStorage.getItem('Language');
                if(lang === "Hindi"){
                  utterance.lang = 'hi-IN'
                }else{
                  utterance.lang = 'en-US'
                }
                window.speechSynthesis.speak(utterance);
              }
            }
            console.log("attributes", this.marker.attributes, data);
            localStorage.setItem("markerVal", data);
            //   let bName = localStorage.getItem('buildingName')
                        setTimeout(()=>{
            window.location.href = `/knc/cmb/wayfinding?KNCollege&&mar=${data}`;
            },2500);
            this.markerVisible = true;
          }
        } else {
          if (this.markerVisbile) {
            this.markerVisible = false;
          }
        }
      }
    });
    window.AFRAME.registerComponent("registerevents9", {
      init: function() {
        this.marker = document.getElementById("animated-marker9");
        this.markerVisible = false;
      },
      tick: function() {
        if (!this.marker) {
          return;
        }
        if (this.marker.object3D.visible) {
          if (!this.markerVisible) {
            // let utterance = new SpeechSynthesisUtterance(`Marker detected.`);
            // window.speechSynthesis.speak(utterance);
                        data = this.marker.attributes[6].value;
            if(!data){
              data = this.marker.attributes[7].value
            }
            for (let k=0;k<nodes.length;k++){
              if(data === nodes[k].arValue){
                let utterance = new SpeechSynthesisUtterance(`You are at ${nodes[k].name}`);
                let lang = localStorage.getItem('Language');
                if(lang === "Hindi"){
                  utterance.lang = 'hi-IN'
                }else{
                  utterance.lang = 'en-US'
                }
                window.speechSynthesis.speak(utterance);
              }
            }
            console.log("attributes", this.marker.attributes, data);
            localStorage.setItem("markerVal", data);
            //   let bName = localStorage.getItem('buildingName')
                        setTimeout(()=>{
            window.location.href = `/knc/cmb/wayfinding?KNCollege&&mar=${data}`;
            },2500);
            this.markerVisible = true;
          }
        } else {
          if (this.markerVisbile) {
            this.markerVisible = false;
          }
        }
      }
    });
    window.AFRAME.registerComponent("registerevents10", {
      init: function() {
        this.marker = document.getElementById("animated-marker10");
        this.markerVisible = false;
      },
      tick: function() {
        if (!this.marker) {
          return;
        }
        if (this.marker.object3D.visible) {
          if (!this.markerVisible) {
            // let utterance = new SpeechSynthesisUtterance(`Marker detected.`);
            // window.speechSynthesis.speak(utterance);
                        data = this.marker.attributes[6].value;
            if(!data){
              data = this.marker.attributes[7].value
            }
            for (let k=0;k<nodes.length;k++){
              if(data === nodes[k].arValue){
                let utterance = new SpeechSynthesisUtterance(`You are at ${nodes[k].name}`);
                let lang = localStorage.getItem('Language');
                if(lang === "Hindi"){
                  utterance.lang = 'hi-IN'
                }else{
                  utterance.lang = 'en-US'
                }
                window.speechSynthesis.speak(utterance);
              }
            }
            console.log("attributes", this.marker.attributes, data);
            localStorage.setItem("markerVal", data);
            //   let bName = localStorage.getItem('buildingName')
                        setTimeout(()=>{
            window.location.href = `/knc/cmb/wayfinding?KNCollege&&mar=${data}`;
            },2500);
            this.markerVisible = true;
          }
        } else {
          if (this.markerVisbile) {
            this.markerVisible = false;
          }
        }
      }
    });
    window.AFRAME.registerComponent("registerevents11", {
      init: function() {
        this.marker = document.getElementById("animated-marker11");
        this.markerVisible = false;
      },
      tick: function() {
        if (!this.marker) {
          return;
        }
        if (this.marker.object3D.visible) {
          if (!this.markerVisible) {
            // let utterance = new SpeechSynthesisUtterance(`Marker detected.`);
            // window.speechSynthesis.speak(utterance);
                        data = this.marker.attributes[6].value;
            if(!data){
              data = this.marker.attributes[7].value
            }
            for (let k=0;k<nodes.length;k++){
              if(data === nodes[k].arValue){
                let utterance = new SpeechSynthesisUtterance(`You are at ${nodes[k].name}`);
                let lang = localStorage.getItem('Language');
                if(lang === "Hindi"){
                  utterance.lang = 'hi-IN'
                }else{
                  utterance.lang = 'en-US'
                }
                window.speechSynthesis.speak(utterance);
              }
            }
            console.log("attributes", this.marker.attributes, data);
            localStorage.setItem("markerVal", data);
            //   let bName = localStorage.getItem('buildingName')
                        setTimeout(()=>{
            window.location.href = `/knc/cmb/wayfinding?KNCollege&&mar=${data}`;
            },2500);
            this.markerVisible = true;
          }
        } else {
          if (this.markerVisbile) {
            this.markerVisible = false;
          }
        }
      }
    });

    window.AFRAME.registerComponent("registerevents12", {
      init: function() {
        this.marker = document.getElementById("animated-marker12");
        this.markerVisible = false;
      },
      tick: function() {
        if (!this.marker) {
          return;
        }
        if (this.marker.object3D.visible) {
          if (!this.markerVisible) {
            // let utterance = new SpeechSynthesisUtterance(`Marker detected.`);
            // window.speechSynthesis.speak(utterance);
                        data = this.marker.attributes[6].value;
            if(!data){
              data = this.marker.attributes[7].value
            }
            for (let k=0;k<nodes.length;k++){
              if(data === nodes[k].arValue){
                let utterance = new SpeechSynthesisUtterance(`You are at ${nodes[k].name}`);
                let lang = localStorage.getItem('Language');
                if(lang === "Hindi"){
                  utterance.lang = 'hi-IN'
                }else{
                  utterance.lang = 'en-US'
                }
                window.speechSynthesis.speak(utterance);
              }
            }
            console.log("attributes", this.marker.attributes, data);
            localStorage.setItem("markerVal", data);
            //   let bName = localStorage.getItem('buildingName')
                        setTimeout(()=>{
            window.location.href = `/knc/cmb/wayfinding?KNCollege&&mar=${data}`;
            },2500);
            this.markerVisible = true;
          }
        } else {
          if (this.markerVisbile) {
            this.markerVisible = false;
          }
        }
      }
    });
    window.AFRAME.registerComponent("registerevents13", {
      init: function() {
        this.marker = document.getElementById("animated-marker13");
        this.markerVisible = false;
      },
      tick: function() {
        if (!this.marker) {
          return;
        }
        if (this.marker.object3D.visible) {
          if (!this.markerVisible) {
            // let utterance = new SpeechSynthesisUtterance(`Marker detected.`);
            // window.speechSynthesis.speak(utterance);
                        data = this.marker.attributes[6].value;
            if(!data){
              data = this.marker.attributes[7].value
            }
            for (let k=0;k<nodes.length;k++){
              if(data === nodes[k].arValue){
                let utterance = new SpeechSynthesisUtterance(`You are at ${nodes[k].name}`);
                let lang = localStorage.getItem('Language');
                if(lang === "Hindi"){
                  utterance.lang = 'hi-IN'
                }else{
                  utterance.lang = 'en-US'
                }
                window.speechSynthesis.speak(utterance);
              }
            }
            console.log("attributes", this.marker.attributes, data);
            localStorage.setItem("markerVal", data);
            //   let bName = localStorage.getItem('buildingName')
                        setTimeout(()=>{
            window.location.href = `/knc/cmb/wayfinding?KNCollege&&mar=${data}`;
            },2500);
            this.markerVisible = true;
          }
        } else {
          if (this.markerVisbile) {
            this.markerVisible = false;
          }
        }
      }
    });

    window.AFRAME.registerComponent("registerevents14", {
      init: function() {
        this.marker = document.getElementById("animated-marker14");
        this.markerVisible = false;
      },
      tick: function() {
        if (!this.marker) {
          return;
        }
        if (this.marker.object3D.visible) {
          if (!this.markerVisible) {
            // let utterance = new SpeechSynthesisUtterance(`Marker detected.`);
            // window.speechSynthesis.speak(utterance);
                        data = this.marker.attributes[6].value;
            if(!data){
              data = this.marker.attributes[7].value
            }
            for (let k=0;k<nodes.length;k++){
              if(data === nodes[k].arValue){
                let utterance = new SpeechSynthesisUtterance(`You are at ${nodes[k].name}`);
                let lang = localStorage.getItem('Language');
                if(lang === "Hindi"){
                  utterance.lang = 'hi-IN'
                }else{
                  utterance.lang = 'en-US'
                }
                window.speechSynthesis.speak(utterance);
              }
            }
            console.log("attributes", this.marker.attributes, data);
            localStorage.setItem("markerVal", data);
            //   let bName = localStorage.getItem('buildingName')
                        setTimeout(()=>{
            window.location.href = `/knc/cmb/wayfinding?KNCollege&&mar=${data}`;
            },2500);
            this.markerVisible = true;
          }
        } else {
          if (this.markerVisbile) {
            this.markerVisible = false;
          }
        }
      }
    });

    window.AFRAME.registerComponent("registerevents15", {
      init: function() {
        this.marker = document.getElementById("animated-marker15");
        this.markerVisible = false;
      },
      tick: function() {
        if (!this.marker) {
          return;
        }
        if (this.marker.object3D.visible) {
          if (!this.markerVisible) {
            // let utterance = new SpeechSynthesisUtterance(`Marker detected.`);
            // window.speechSynthesis.speak(utterance);
                        data = this.marker.attributes[6].value;
            if(!data){
              data = this.marker.attributes[7].value
            }
            for (let k=0;k<nodes.length;k++){
              if(data === nodes[k].arValue){
                let utterance = new SpeechSynthesisUtterance(`You are at ${nodes[k].name}`);
                let lang = localStorage.getItem('Language');
                if(lang === "Hindi"){
                  utterance.lang = 'hi-IN'
                }else{
                  utterance.lang = 'en-US'
                }
                window.speechSynthesis.speak(utterance);
              }
            }
            console.log("attributes", this.marker.attributes, data);
            localStorage.setItem("markerVal", data);
            //   let bName = localStorage.getItem('buildingName')
                        setTimeout(()=>{
            window.location.href = `/knc/cmb/wayfinding?KNCollege&&mar=${data}`;
            },2500);
            this.markerVisible = true;
          }
        } else {
          if (this.markerVisbile) {
            this.markerVisible = false;
          }
        }
      }
    });

    window.AFRAME.registerComponent("registerevents16", {
      init: function() {
        this.marker = document.getElementById("animated-marker16");
        this.markerVisible = false;
      },
      tick: function() {
        if (!this.marker) {
          return;
        }
        if (this.marker.object3D.visible) {
          if (!this.markerVisible) {
            // let utterance = new SpeechSynthesisUtterance(`Marker detected.`);
            // window.speechSynthesis.speak(utterance);
                        data = this.marker.attributes[6].value;
            if(!data){
              data = this.marker.attributes[7].value
            }
            for (let k=0;k<nodes.length;k++){
              if(data === nodes[k].arValue){
                let utterance = new SpeechSynthesisUtterance(`You are at ${nodes[k].name}`);
                let lang = localStorage.getItem('Language');
                if(lang === "Hindi"){
                  utterance.lang = 'hi-IN'
                }else{
                  utterance.lang = 'en-US'
                }
                window.speechSynthesis.speak(utterance);
              }
            }
            console.log("attributes", this.marker.attributes, data);
            localStorage.setItem("markerVal", data);
            //   let bName = localStorage.getItem('buildingName')
                        setTimeout(()=>{
            window.location.href = `/knc/cmb/wayfinding?KNCollege&&mar=${data}`;
            },2500);
            this.markerVisible = true;
          }
        } else {
          if (this.markerVisbile) {
            this.markerVisible = false;
          }
        }
      }
    });
    window.AFRAME.registerComponent("registerevents17", {
      init: function() {
        this.marker = document.getElementById("animated-marker17");
        this.markerVisible = false;
      },
      tick: function() {
        if (!this.marker) {
          return;
        }
        if (this.marker.object3D.visible) {
          if (!this.markerVisible) {
            // let utterance = new SpeechSynthesisUtterance(`Marker detected.`);
            // window.speechSynthesis.speak(utterance);
                        data = this.marker.attributes[6].value;
            if(!data){
              data = this.marker.attributes[7].value
            }
            for (let k=0;k<nodes.length;k++){
              if(data === nodes[k].arValue){
                let utterance = new SpeechSynthesisUtterance(`You are at ${nodes[k].name}`);
                let lang = localStorage.getItem('Language');
                if(lang === "Hindi"){
                  utterance.lang = 'hi-IN'
                }else{
                  utterance.lang = 'en-US'
                }
                window.speechSynthesis.speak(utterance);
              }
            }
            console.log("attributes", this.marker.attributes, data);
            localStorage.setItem("markerVal", data);
            //   let bName = localStorage.getItem('buildingName')
                        setTimeout(()=>{
            window.location.href = `/knc/cmb/wayfinding?KNCollege&&mar=${data}`;
            },2500);
            this.markerVisible = true;
          }
        } else {
          if (this.markerVisbile) {
            this.markerVisible = false;
          }
        }
      }
    });
    window.AFRAME.registerComponent("registerevents18", {
      init: function() {
        this.marker = document.getElementById("animated-marker18");
        this.markerVisible = false;
      },
      tick: function() {
        if (!this.marker) {
          return;
        }
        if (this.marker.object3D.visible) {
          if (!this.markerVisible) {
            // let utterance = new SpeechSynthesisUtterance(`Marker detected.`);
            // window.speechSynthesis.speak(utterance);
                        data = this.marker.attributes[6].value;
            if(!data){
              data = this.marker.attributes[7].value
            }
            for (let k=0;k<nodes.length;k++){
              if(data === nodes[k].arValue){
                let utterance = new SpeechSynthesisUtterance(`You are at ${nodes[k].name}`);
                let lang = localStorage.getItem('Language');
                if(lang === "Hindi"){
                  utterance.lang = 'hi-IN'
                }else{
                  utterance.lang = 'en-US'
                }
                window.speechSynthesis.speak(utterance);
              }
            }
            console.log("attributes", this.marker.attributes, data);
            localStorage.setItem("markerVal", data);
            setTimeout(()=>{
            window.location.href = `/knc/cmb/wayfinding?KNCollege&&mar=${data}`;
            },2500)
            this.markerVisible = true;
          }
        } else {
          if (this.markerVisbile) {
            this.markerVisible = false;
          }
        }
      }
    });
    window.AFRAME.registerComponent("registerevents19", {
      init: function() {
        this.marker = document.getElementById("animated-marker19");
        this.markerVisible = false;
      },
      tick: function() {
        if (!this.marker) {
          return;
        }
        if (this.marker.object3D.visible) {
          if (!this.markerVisible) {
            // let utterance = new SpeechSynthesisUtterance(`Marker detected.`);
            // window.speechSynthesis.speak(utterance);
                        data = this.marker.attributes[6].value;
            if(!data){
              data = this.marker.attributes[7].value
            }
            for (let k=0;k<nodes.length;k++){
              if(data === nodes[k].arValue){
                let utterance = new SpeechSynthesisUtterance(`You are at ${nodes[k].name}`);
                let lang = localStorage.getItem('Language');
                if(lang === "Hindi"){
                  utterance.lang = 'hi-IN'
                }else{
                  utterance.lang = 'en-US'
                }
                window.speechSynthesis.speak(utterance);
              }
            }
            console.log("attributes", this.marker.attributes, data);
            localStorage.setItem("markerVal", data);
            //   let bName = localStorage.getItem('buildingName')
                        setTimeout(()=>{
            window.location.href = `/knc/cmb/wayfinding?KNCollege&&mar=${data}`;
            },2500);
            this.markerVisible = true;
          }
        } else {
          if (this.markerVisbile) {
            this.markerVisible = false;
          }
        }
      }
    });
    window.AFRAME.registerComponent("registerevents20", {
      init: function() {
        this.marker = document.getElementById("animated-marker20");
        this.markerVisible = false;
      },
      tick: function() {
        if (!this.marker) {
          return;
        }
        if (this.marker.object3D.visible) {
          if (!this.markerVisible) {
            // let utterance = new SpeechSynthesisUtterance(`Marker detected.`);
            // window.speechSynthesis.speak(utterance);
                        data = this.marker.attributes[6].value;
            if(!data){
              data = this.marker.attributes[7].value
            }
            for (let k=0;k<nodes.length;k++){
              if(data === nodes[k].arValue){
                let utterance = new SpeechSynthesisUtterance(`You are at ${nodes[k].name}`);
                let lang = localStorage.getItem('Language');
                if(lang === "Hindi"){
                  utterance.lang = 'hi-IN'
                }else{
                  utterance.lang = 'en-US'
                }
                window.speechSynthesis.speak(utterance);
              }
            }
            console.log("attributes", this.marker.attributes, data);
            localStorage.setItem("markerVal", data);
            //   let bName = localStorage.getItem('buildingName')
                        setTimeout(()=>{
            window.location.href = `/knc/cmb/wayfinding?KNCollege&&mar=${data}`;
            },2500);
            this.markerVisible = true;
          }
        } else {
          if (this.markerVisbile) {
            this.markerVisible = false;
          }
        }
      }
    });
    window.AFRAME.registerComponent("registerevents31", {
      init: function() {
        this.marker = document.getElementById("animated-marker31");
        this.markerVisible = false;
      },
      tick: function() {
        if (!this.marker) {
          return;
        }
        if (this.marker.object3D.visible) {
          if (!this.markerVisible) {
            // let utterance = new SpeechSynthesisUtterance(`Marker detected.`);
            // window.speechSynthesis.speak(utterance);
            // console.log("tokkeche",this.marker.)
            
                        data = this.marker.attributes[6].value;
            if(!data){
              data = this.marker.attributes[7].value
            }
            if(!data){
              data = this.marker.attributes[7].value
            }
            localStorage.setItem("markerVal", data);
            //   let bName = localStorage.getItem('buildingName')
                        setTimeout(()=>{
            window.location.href = `/knc/cmb/wayfinding?KNCollege&&mar=${data}`;
            },2500);
            this.markerVisible = true;
          }
        } else {
          if (this.markerVisbile) {
            this.markerVisible = false;
          }
        }
      }
    });
    window.AFRAME.registerComponent("registerevents32", {
      init: function() {
        this.marker = document.getElementById("animated-marker32");
        this.markerVisible = false;
      },
      tick: function() {
        if (!this.marker) {
          return;
        }
        if (this.marker.object3D.visible) {
          if (!this.markerVisible) {
            // let utterance = new SpeechSynthesisUtterance(`Marker detected.`);
            // window.speechSynthesis.speak(utterance);
                        data = this.marker.attributes[6].value;
            if(!data){
              data = this.marker.attributes[7].value
            }
            for (let k=0;k<nodes.length;k++){
              if(data === nodes[k].arValue){
                let utterance = new SpeechSynthesisUtterance(`You are at ${nodes[k].name}`);
                let lang = localStorage.getItem('Language');
                if(lang === "Hindi"){
                  utterance.lang = 'hi-IN'
                }else{
                  utterance.lang = 'en-US'
                }
                window.speechSynthesis.speak(utterance);
              }
            }
            console.log("attributes", this.marker.attributes, data);
            localStorage.setItem("markerVal", data);
            //   let bName = localStorage.getItem('buildingName')
                        setTimeout(()=>{
            window.location.href = `/knc/cmb/wayfinding?KNCollege&&mar=${data}`;
            },2500);
            this.markerVisible = true;
          }
        } else {
          if (this.markerVisbile) {
            this.markerVisible = false;
          }
        }
      }
    });
    window.AFRAME.registerComponent("registerevents33", {
      init: function() {
        this.marker = document.getElementById("animated-marker33");
        this.markerVisible = false;
      },
      tick: function() {
        if (!this.marker) {
          return;
        }
        if (this.marker.object3D.visible) {
          if (!this.markerVisible) {
            // let utterance = new SpeechSynthesisUtterance(`Marker detected.`);
            // window.speechSynthesis.speak(utterance);
                        data = this.marker.attributes[6].value;
            if(!data){
              data = this.marker.attributes[7].value
            }
            for (let k=0;k<nodes.length;k++){
              if(data === nodes[k].arValue){
                let utterance = new SpeechSynthesisUtterance(`You are at ${nodes[k].name}`);
                let lang = localStorage.getItem('Language');
                if(lang === "Hindi"){
                  utterance.lang = 'hi-IN'
                }else{
                  utterance.lang = 'en-US'
                }
                window.speechSynthesis.speak(utterance);
              }
            }
            console.log("attributes", this.marker.attributes, data);
            localStorage.setItem("markerVal", data);
            //   let bName = localStorage.getItem('buildingName')
                        setTimeout(()=>{
            window.location.href = `/knc/cmb/wayfinding?KNCollege&&mar=${data}`;
            },2500);
            this.markerVisible = true;
          }
        } else {
          if (this.markerVisbile) {
            this.markerVisible = false;
          }
        }
      }
    });
    window.AFRAME.registerComponent("registerevents34", {
      init: function() {
        this.marker = document.getElementById("animated-marker34");
        this.markerVisible = false;
      },
      tick: function() {
        if (!this.marker) {
          return;
        }
        if (this.marker.object3D.visible) {
          if (!this.markerVisible) {
            // let utterance = new SpeechSynthesisUtterance(`Marker detected.`);
            // window.speechSynthesis.speak(utterance);
                        data = this.marker.attributes[6].value;
            if(!data){
              data = this.marker.attributes[7].value
            }
            for (let k=0;k<nodes.length;k++){
              if(data === nodes[k].arValue){
                let utterance = new SpeechSynthesisUtterance(`You are at ${nodes[k].name}`);
                let lang = localStorage.getItem('Language');
                if(lang === "Hindi"){
                  utterance.lang = 'hi-IN'
                }else{
                  utterance.lang = 'en-US'
                }
                window.speechSynthesis.speak(utterance);
              }
            }
            console.log("attributes", this.marker.attributes, data);
            localStorage.setItem("markerVal", data);
            //   let bName = localStorage.getItem('buildingName')
                        setTimeout(()=>{
            window.location.href = `/knc/cmb/wayfinding?KNCollege&&mar=${data}`;
            },2500);
            this.markerVisible = true;
          }
        } else {
          if (this.markerVisbile) {
            this.markerVisible = false;
          }
        }
      }
    });
    window.AFRAME.registerComponent("registerevents35", {
      init: function() {
        this.marker = document.getElementById("animated-marker35");
        this.markerVisible = false;
      },
      tick: function() {
        if (!this.marker) {
          return;
        }
        if (this.marker.object3D.visible) {
          if (!this.markerVisible) {
            // let utterance = new SpeechSynthesisUtterance(`Marker detected.`);
            // window.speechSynthesis.speak(utterance);
                        data = this.marker.attributes[6].value;
            if(!data){
              data = this.marker.attributes[7].value
            }
            for (let k=0;k<nodes.length;k++){
              if(data === nodes[k].arValue){
                let utterance = new SpeechSynthesisUtterance(`You are at ${nodes[k].name}`);
                let lang = localStorage.getItem('Language');
                if(lang === "Hindi"){
                  utterance.lang = 'hi-IN'
                }else{
                  utterance.lang = 'en-US'
                }
                window.speechSynthesis.speak(utterance);
              }
            }
            console.log("attributes", this.marker.attributes, data);
            localStorage.setItem("markerVal", data);
            //   let bName = localStorage.getItem('buildingName')
                        setTimeout(()=>{
            window.location.href = `/knc/cmb/wayfinding?KNCollege&&mar=${data}`;
            },2500);
            this.markerVisible = true;
          }
        } else {
          if (this.markerVisbile) {
            this.markerVisible = false;
          }
        }
      }
    });
    window.AFRAME.registerComponent("registerevents36", {
      init: function() {
        this.marker = document.getElementById("animated-marker36");
        this.markerVisible = false;
      },
      tick: function() {
        if (!this.marker) {
          return;
        }
        if (this.marker.object3D.visible) {
          if (!this.markerVisible) {
            // let utterance = new SpeechSynthesisUtterance(`Marker detected.`);
            // window.speechSynthesis.speak(utterance);
                        data = this.marker.attributes[6].value;
            if(!data){
              data = this.marker.attributes[7].value
            }
            for (let k=0;k<nodes.length;k++){
              if(data === nodes[k].arValue){
                let utterance = new SpeechSynthesisUtterance(`You are at ${nodes[k].name}`);
                let lang = localStorage.getItem('Language');
                if(lang === "Hindi"){
                  utterance.lang = 'hi-IN'
                }else{
                  utterance.lang = 'en-US'
                }
                window.speechSynthesis.speak(utterance);
              }
            }
            console.log("attributes", this.marker.attributes, data);
            localStorage.setItem("markerVal", data);
            //   let bName = localStorage.getItem('buildingName')
                        setTimeout(()=>{
            window.location.href = `/knc/cmb/wayfinding?KNCollege&&mar=${data}`;
            },2500);
            this.markerVisible = true;
          }
        } else {
          if (this.markerVisbile) {
            this.markerVisible = false;
          }
        }
      }
    });
    window.AFRAME.registerComponent("registerevents37", {
      init: function() {
        this.marker = document.getElementById("animated-marker37");
        this.markerVisible = false;
      },
      tick: function() {
        if (!this.marker) {
          return;
        }
        if (this.marker.object3D.visible) {
          if (!this.markerVisible) {
            // let utterance = new SpeechSynthesisUtterance(`Marker detected.`);
            // window.speechSynthesis.speak(utterance);
                        data = this.marker.attributes[6].value;
            if(!data){
              data = this.marker.attributes[7].value
            }
            for (let k=0;k<nodes.length;k++){
              if(data === nodes[k].arValue){
                let utterance = new SpeechSynthesisUtterance(`You are at ${nodes[k].name}`);
                let lang = localStorage.getItem('Language');
                if(lang === "Hindi"){
                  utterance.lang = 'hi-IN'
                }else{
                  utterance.lang = 'en-US'
                }
                window.speechSynthesis.speak(utterance);
              }
            }
            console.log("attributes", this.marker.attributes, data);
            localStorage.setItem("markerVal", data);
            //   let bName = localStorage.getItem('buildingName')
                        setTimeout(()=>{
            window.location.href = `/knc/cmb/wayfinding?KNCollege&&mar=${data}`;
            },2500);
            this.markerVisible = true;
          }
        } else {
          if (this.markerVisbile) {
            this.markerVisible = false;
          }
        }
      }
    });
    window.AFRAME.registerComponent("registerevents38", {
      init: function() {
        this.marker = document.getElementById("animated-marker38");
        this.markerVisible = false;
      },
      tick: function() {
        if (!this.marker) {
          return;
        }
        if (this.marker.object3D.visible) {
          if (!this.markerVisible) {
            // let utterance = new SpeechSynthesisUtterance(`Marker detected.`);
            // window.speechSynthesis.speak(utterance);
                        data = this.marker.attributes[6].value;
            if(!data){
              data = this.marker.attributes[7].value
            }
            for (let k=0;k<nodes.length;k++){
              if(data === nodes[k].arValue){
                let utterance = new SpeechSynthesisUtterance(`You are at ${nodes[k].name}`);
                let lang = localStorage.getItem('Language');
                if(lang === "Hindi"){
                  utterance.lang = 'hi-IN'
                }else{
                  utterance.lang = 'en-US'
                }
                window.speechSynthesis.speak(utterance);
              }
            }
            console.log("attributes", this.marker.attributes, data);
            localStorage.setItem("markerVal", data);
            //   let bName = localStorage.getItem('buildingName')
                        setTimeout(()=>{
            window.location.href = `/knc/cmb/wayfinding?KNCollege&&mar=${data}`;
            },2500);
            this.markerVisible = true;
          }
        } else {
          if (this.markerVisbile) {
            this.markerVisible = false;
          }
        }
      }
    });
    window.AFRAME.registerComponent("registerevents39", {
      init: function() {
        this.marker = document.getElementById("animated-marker39");
        this.markerVisible = false;
      },
      tick: function() {
        if (!this.marker) {
          return;
        }
        if (this.marker.object3D.visible) {
          if (!this.markerVisible) {
            // let utterance = new SpeechSynthesisUtterance(`Marker detected.`);
            // window.speechSynthesis.speak(utterance);
                        data = this.marker.attributes[6].value;
            if(!data){
              data = this.marker.attributes[7].value
            }
            for (let k=0;k<nodes.length;k++){
              if(data === nodes[k].arValue){
                let utterance = new SpeechSynthesisUtterance(`You are at ${nodes[k].name}`);
                let lang = localStorage.getItem('Language');
                if(lang === "Hindi"){
                  utterance.lang = 'hi-IN'
                }else{
                  utterance.lang = 'en-US'
                }
                window.speechSynthesis.speak(utterance);
              }
            }
            console.log("attributes", this.marker.attributes, data);
            localStorage.setItem("markerVal", data);
            //   let bName = localStorage.getItem('buildingName')
                        setTimeout(()=>{
            window.location.href = `/knc/cmb/wayfinding?KNCollege&&mar=${data}`;
            },2500);
            this.markerVisible = true;
          }
        } else {
          if (this.markerVisbile) {
            this.markerVisible = false;
          }
        }
      }
    });
    window.AFRAME.registerComponent("registerevents40", {
      init: function() {
        this.marker = document.getElementById("animated-marker40");
        this.markerVisible = false;
      },
      tick: function() {
        if (!this.marker) {
          return;
        }
        if (this.marker.object3D.visible) {
          if (!this.markerVisible) {
            // let utterance = new SpeechSynthesisUtterance(`Marker detected.`);
            // window.speechSynthesis.speak(utterance);
                        data = this.marker.attributes[6].value;
            if(!data){
              data = this.marker.attributes[7].value
            }
            for (let k=0;k<nodes.length;k++){
              if(data === nodes[k].arValue){
                let utterance = new SpeechSynthesisUtterance(`You are at ${nodes[k].name}`);
                let lang = localStorage.getItem('Language');
                if(lang === "Hindi"){
                  utterance.lang = 'hi-IN'
                }else{
                  utterance.lang = 'en-US'
                }
                window.speechSynthesis.speak(utterance);
              }
            }
            console.log("attributes", this.marker.attributes, data);
            localStorage.setItem("markerVal", data);
            //   let bName = localStorage.getItem('buildingName')
                        setTimeout(()=>{
            window.location.href = `/knc/cmb/wayfinding?KNCollege&&mar=${data}`;
            },2500);
            this.markerVisible = true;
          }
        } else {
          if (this.markerVisbile) {
            this.markerVisible = false;
          }
        }
      }
    });
    window.AFRAME.registerComponent("registerevents41", {
      init: function() {
        this.marker = document.getElementById("animated-marker41");
        this.markerVisible = false;
      },
      tick: function() {
        if (!this.marker) {
          return;
        }
        if (this.marker.object3D.visible) {
          if (!this.markerVisible) {
            // let utterance = new SpeechSynthesisUtterance(`Marker detected.`);
            // window.speechSynthesis.speak(utterance);
                        data = this.marker.attributes[6].value;
            if(!data){
              data = this.marker.attributes[7].value
            }
            for (let k=0;k<nodes.length;k++){
              if(data === nodes[k].arValue){
                let utterance = new SpeechSynthesisUtterance(`You are at ${nodes[k].name}`);
                let lang = localStorage.getItem('Language');
                if(lang === "Hindi"){
                  utterance.lang = 'hi-IN'
                }else{
                  utterance.lang = 'en-US'
                }
                window.speechSynthesis.speak(utterance);
              }
            }
            console.log("attributes", this.marker.attributes, data);
            localStorage.setItem("markerVal", data);
            //   let bName = localStorage.getItem('buildingName')
                        setTimeout(()=>{
            window.location.href = `/knc/cmb/wayfinding?KNCollege&&mar=${data}`;
            },2500);
            this.markerVisible = true;
          }
        } else {
          if (this.markerVisbile) {
            this.markerVisible = false;
          }
        }
      }
    });
    window.AFRAME.registerComponent("registerevents42", {
      init: function() {
        this.marker = document.getElementById("animated-marker42");
        this.markerVisible = false;
      },
      tick: function() {
        if (!this.marker) {
          return;
        }
        if (this.marker.object3D.visible) {
          if (!this.markerVisible) {
            // let utterance = new SpeechSynthesisUtterance(`Marker detected.`);
            // window.speechSynthesis.speak(utterance);
                        data = this.marker.attributes[6].value;
            if(!data){
              data = this.marker.attributes[7].value
            }
            for (let k=0;k<nodes.length;k++){
              if(data === nodes[k].arValue){
                let utterance = new SpeechSynthesisUtterance(`You are at ${nodes[k].name}`);
                let lang = localStorage.getItem('Language');
                if(lang === "Hindi"){
                  utterance.lang = 'hi-IN'
                }else{
                  utterance.lang = 'en-US'
                }
                window.speechSynthesis.speak(utterance);
              }
            }
            console.log("attributes", this.marker.attributes, data);
            localStorage.setItem("markerVal", data);
            //   let bName = localStorage.getItem('buildingName')
                        setTimeout(()=>{
            window.location.href = `/knc/cmb/wayfinding?KNCollege&&mar=${data}`;
            },2500);
            this.markerVisible = true;
          }
        } else {
          if (this.markerVisbile) {
            this.markerVisible = false;
          }
        }
      }
    });
    window.AFRAME.registerComponent("registerevents43", {
      init: function() {
        this.marker = document.getElementById("animated-marker43");
        this.markerVisible = false;
      },
      tick: function() {
        if (!this.marker) {
          return;
        }
        if (this.marker.object3D.visible) {
          if (!this.markerVisible) {
            // let utterance = new SpeechSynthesisUtterance(`Marker detected.`);
            // window.speechSynthesis.speak(utterance);
                        data = this.marker.attributes[6].value;
            if(!data){
              data = this.marker.attributes[7].value
            }
            for (let k=0;k<nodes.length;k++){
              if(data === nodes[k].arValue){
                let utterance = new SpeechSynthesisUtterance(`You are at ${nodes[k].name}`);
                let lang = localStorage.getItem('Language');
                if(lang === "Hindi"){
                  utterance.lang = 'hi-IN'
                }else{
                  utterance.lang = 'en-US'
                }
                window.speechSynthesis.speak(utterance);
              }
            }
            console.log("attributes", this.marker.attributes, data);
            localStorage.setItem("markerVal", data);
            //   let bName = localStorage.getItem('buildingName')
                        setTimeout(()=>{
            window.location.href = `/knc/cmb/wayfinding?KNCollege&&mar=${data}`;
            },2500);
            this.markerVisible = true;
          }
        } else {
          if (this.markerVisbile) {
            this.markerVisible = false;
          }
        }
      }
    });
    window.AFRAME.registerComponent("registerevents44", {
      init: function() {
        this.marker = document.getElementById("animated-marker44");
        this.markerVisible = false;
      },
      tick: function() {
        if (!this.marker) {
          return;
        }
        if (this.marker.object3D.visible) {
          if (!this.markerVisible) {
            // let utterance = new SpeechSynthesisUtterance(`Marker detected.`);
            // window.speechSynthesis.speak(utterance);
                        data = this.marker.attributes[6].value;
            if(!data){
              data = this.marker.attributes[7].value
            }
            for (let k=0;k<nodes.length;k++){
              if(data === nodes[k].arValue){
                let utterance = new SpeechSynthesisUtterance(`You are at ${nodes[k].name}`);
                let lang = localStorage.getItem('Language');
                if(lang === "Hindi"){
                  utterance.lang = 'hi-IN'
                }else{
                  utterance.lang = 'en-US'
                }
                window.speechSynthesis.speak(utterance);
              }
            }
            console.log("attributes", this.marker.attributes, data);
            localStorage.setItem("markerVal", data);
            //   let bName = localStorage.getItem('buildingName')
                        setTimeout(()=>{
            window.location.href = `/knc/cmb/wayfinding?KNCollege&&mar=${data}`;
            },2500);
            this.markerVisible = true;
          }
        } else {
          if (this.markerVisbile) {
            this.markerVisible = false;
          }
        }
      }
    });
    window.AFRAME.registerComponent("registerevents45", {
      init: function() {
        this.marker = document.getElementById("animated-marker45");
        this.markerVisible = false;
      },
      tick: function() {
        if (!this.marker) {
          return;
        }
        if (this.marker.object3D.visible) {
          if (!this.markerVisible) {
            // let utterance = new SpeechSynthesisUtterance(`Marker detected.`);
            // window.speechSynthesis.speak(utterance);
                        data = this.marker.attributes[6].value;
            if(!data){
              data = this.marker.attributes[7].value
            }
            for (let k=0;k<nodes.length;k++){
              if(data === nodes[k].arValue){
                let utterance = new SpeechSynthesisUtterance(`You are at ${nodes[k].name}`);
                let lang = localStorage.getItem('Language');
                if(lang === "Hindi"){
                  utterance.lang = 'hi-IN'
                }else{
                  utterance.lang = 'en-US'
                }
                window.speechSynthesis.speak(utterance);
              }
            }
            console.log("attributes", this.marker.attributes, data);
            localStorage.setItem("markerVal", data);
            //   let bName = localStorage.getItem('buildingName')
                        setTimeout(()=>{
            window.location.href = `/knc/cmb/wayfinding?KNCollege&&mar=${data}`;
            },2500);
            this.markerVisible = true;
          }
        } else {
          if (this.markerVisbile) {
            this.markerVisible = false;
          }
        }
      }
    });
    window.AFRAME.registerComponent("registerevents46", {
      init: function() {
        this.marker = document.getElementById("animated-marker46");
        this.markerVisible = false;
      },
      tick: function() {
        if (!this.marker) {
          return;
        }
        if (this.marker.object3D.visible) {
          if (!this.markerVisible) {
            // let utterance = new SpeechSynthesisUtterance(`Marker detected.`);
            // window.speechSynthesis.speak(utterance);
                        data = this.marker.attributes[6].value;
            if(!data){
              data = this.marker.attributes[7].value
            }
            for (let k=0;k<nodes.length;k++){
              if(data === nodes[k].arValue){
                let utterance = new SpeechSynthesisUtterance(`You are at ${nodes[k].name}`);
                let lang = localStorage.getItem('Language');
                if(lang === "Hindi"){
                  utterance.lang = 'hi-IN'
                }else{
                  utterance.lang = 'en-US'
                }
                window.speechSynthesis.speak(utterance);
              }
            }
            console.log("attributes", this.marker.attributes, data);
            localStorage.setItem("markerVal", data);
            //   let bName = localStorage.getItem('buildingName')
                        setTimeout(()=>{
            window.location.href = `/knc/cmb/wayfinding?KNCollege&&mar=${data}`;
            },2500);
            this.markerVisible = true;
          }
        } else {
          if (this.markerVisbile) {
            this.markerVisible = false;
          }
        }
      }
    });
    window.AFRAME.registerComponent("registerevents47", {
      init: function() {
        this.marker = document.getElementById("animated-marker47");
        this.markerVisible = false;
      },
      tick: function() {
        if (!this.marker) {
          return;
        }
        if (this.marker.object3D.visible) {
          if (!this.markerVisible) {
            // let utterance = new SpeechSynthesisUtterance(`Marker detected.`);
            // window.speechSynthesis.speak(utterance);
                        data = this.marker.attributes[6].value;
            if(!data){
              data = this.marker.attributes[7].value
            }
            for (let k=0;k<nodes.length;k++){
              if(data === nodes[k].arValue){
                let utterance = new SpeechSynthesisUtterance(`You are at ${nodes[k].name}`);
                let lang = localStorage.getItem('Language');
                if(lang === "Hindi"){
                  utterance.lang = 'hi-IN'
                }else{
                  utterance.lang = 'en-US'
                }
                window.speechSynthesis.speak(utterance);
              }
            }
            console.log("attributes", this.marker.attributes, data);
            localStorage.setItem("markerVal", data);
            //   let bName = localStorage.getItem('buildingName')
                        setTimeout(()=>{
            window.location.href = `/knc/cmb/wayfinding?KNCollege&&mar=${data}`;
            },2500);
            this.markerVisible = true;
          }
        } else {
          if (this.markerVisbile) {
            this.markerVisible = false;
          }
        }
      }
    });
    window.AFRAME.registerComponent("registerevents48", {
      init: function() {
        this.marker = document.getElementById("animated-marker48");
        this.markerVisible = false;
      },
      tick: function() {
        if (!this.marker) {
          return;
        }
        if (this.marker.object3D.visible) {
          if (!this.markerVisible) {
            // let utterance = new SpeechSynthesisUtterance(`Marker detected.`);
            // window.speechSynthesis.speak(utterance);
                        data = this.marker.attributes[6].value;
            if(!data){
              data = this.marker.attributes[7].value
            }
            for (let k=0;k<nodes.length;k++){
              if(data === nodes[k].arValue){
                let utterance = new SpeechSynthesisUtterance(`You are at ${nodes[k].name}`);
                let lang = localStorage.getItem('Language');
                if(lang === "Hindi"){
                  utterance.lang = 'hi-IN'
                }else{
                  utterance.lang = 'en-US'
                }
                window.speechSynthesis.speak(utterance);
              }
            }
            console.log("attributes", this.marker.attributes, data);
            localStorage.setItem("markerVal", data);
            //   let bName = localStorage.getItem('buildingName')
                        setTimeout(()=>{
            window.location.href = `/knc/cmb/wayfinding?KNCollege&&mar=${data}`;
            },2500);
            this.markerVisible = true;
          }
        } else {
          if (this.markerVisbile) {
            this.markerVisible = false;
          }
        }
      }
    });
    window.AFRAME.registerComponent("registerevents49", {
      init: function() {
        this.marker = document.getElementById("animated-marker49");
        this.markerVisible = false;
      },
      tick: function() {
        if (!this.marker) {
          return;
        }
        if (this.marker.object3D.visible) {
          if (!this.markerVisible) {
            // let utterance = new SpeechSynthesisUtterance(`Marker detected.`);
            // window.speechSynthesis.speak(utterance);
                        data = this.marker.attributes[6].value;
            if(!data){
              data = this.marker.attributes[7].value
            }
            for (let k=0;k<nodes.length;k++){
              if(data === nodes[k].arValue){
                let utterance = new SpeechSynthesisUtterance(`You are at ${nodes[k].name}`);
                let lang = localStorage.getItem('Language');
                if(lang === "Hindi"){
                  utterance.lang = 'hi-IN'
                }else{
                  utterance.lang = 'en-US'
                }
                window.speechSynthesis.speak(utterance);
              }
            }
            console.log("attributes", this.marker.attributes, data);
            localStorage.setItem("markerVal", data);
            //   let bName = localStorage.getItem('buildingName')
                        setTimeout(()=>{
            window.location.href = `/knc/cmb/wayfinding?KNCollege&&mar=${data}`;
            },2500);
            this.markerVisible = true;
          }
        } else {
          if (this.markerVisbile) {
            this.markerVisible = false;
          }
        }
      }
    });
    window.AFRAME.registerComponent("registerevents50", {
      init: function() {
        this.marker = document.getElementById("animated-marker50");
        this.markerVisible = false;
      },
      tick: function() {
        if (!this.marker) {
          return;
        }
        if (this.marker.object3D.visible) {
          if (!this.markerVisible) {
            // let utterance = new SpeechSynthesisUtterance(`Marker detected.`);
            // window.speechSynthesis.speak(utterance);
                        data = this.marker.attributes[6].value;
            if(!data){
              data = this.marker.attributes[7].value
            }
            for (let k=0;k<nodes.length;k++){
              if(data === nodes[k].arValue){
                let utterance = new SpeechSynthesisUtterance(`You are at ${nodes[k].name}`);
                let lang = localStorage.getItem('Language');
                if(lang === "Hindi"){
                  utterance.lang = 'hi-IN'
                }else{
                  utterance.lang = 'en-US'
                }
                window.speechSynthesis.speak(utterance);
              }
            }
            console.log("attributes", this.marker.attributes, data);
            localStorage.setItem("markerVal", data);
            //   let bName = localStorage.getItem('buildingName')
                        setTimeout(()=>{
            window.location.href = `/knc/cmb/wayfinding?KNCollege&&mar=${data}`;
            },2500);
            this.markerVisible = true;
          }
        } else {
          if (this.markerVisbile) {
            this.markerVisible = false;
          }
        }
      }
    });
    window.AFRAME.registerComponent("registerevents51", {
      init: function() {
        this.marker = document.getElementById("animated-marker51");
        this.markerVisible = false;
      },
      tick: function() {
        if (!this.marker) {
          return;
        }
        if (this.marker.object3D.visible) {
          if (!this.markerVisible) {
            // let utterance = new SpeechSynthesisUtterance(`Marker detected.`);
            // window.speechSynthesis.speak(utterance);
                        data = this.marker.attributes[6].value;
            if(!data){
              data = this.marker.attributes[7].value
            }
            for (let k=0;k<nodes.length;k++){
              if(data === nodes[k].arValue){
                let utterance = new SpeechSynthesisUtterance(`You are at ${nodes[k].name}`);
                let lang = localStorage.getItem('Language');
                if(lang === "Hindi"){
                  utterance.lang = 'hi-IN'
                }else{
                  utterance.lang = 'en-US'
                }
                window.speechSynthesis.speak(utterance);
              }
            }
            console.log("attributes", this.marker.attributes, data);
            localStorage.setItem("markerVal", data);
            //   let bName = localStorage.getItem('buildingName')
                        setTimeout(()=>{
            window.location.href = `/knc/cmb/wayfinding?KNCollege&&mar=${data}`;
            },2500);
            this.markerVisible = true;
          }
        } else {
          if (this.markerVisbile) {
            this.markerVisible = false;
          }
        }
      }
    });
    window.AFRAME.registerComponent("registerevents52", {
      init: function() {
        this.marker = document.getElementById("animated-marker52");
        this.markerVisible = false;
      },
      tick: function() {
        if (!this.marker) {
          return;
        }
        if (this.marker.object3D.visible) {
          if (!this.markerVisible) {
            // let utterance = new SpeechSynthesisUtterance(`Marker detected.`);
            // window.speechSynthesis.speak(utterance);
                        data = this.marker.attributes[6].value;
            if(!data){
              data = this.marker.attributes[7].value
            }
            for (let k=0;k<nodes.length;k++){
              if(data === nodes[k].arValue){
                let utterance = new SpeechSynthesisUtterance(`You are at ${nodes[k].name}`);
                let lang = localStorage.getItem('Language');
                if(lang === "Hindi"){
                  utterance.lang = 'hi-IN'
                }else{
                  utterance.lang = 'en-US'
                }
                window.speechSynthesis.speak(utterance);
              }
            }
            console.log("attributes", this.marker.attributes, data);
            localStorage.setItem("markerVal", data);
            //   let bName = localStorage.getItem('buildingName')
                        setTimeout(()=>{
            window.location.href = `/knc/cmb/wayfinding?KNCollege&&mar=${data}`;
            },2500);
            this.markerVisible = true;
          }
        } else {
          if (this.markerVisbile) {
            this.markerVisible = false;
          }
        }
      }
    });
    window.AFRAME.registerComponent("registerevents53", {
      init: function() {
        this.marker = document.getElementById("animated-marker53");
        this.markerVisible = false;
      },
      tick: function() {
        if (!this.marker) {
          return;
        }
        if (this.marker.object3D.visible) {
          if (!this.markerVisible) {
            // let utterance = new SpeechSynthesisUtterance(`Marker detected.`);
            // window.speechSynthesis.speak(utterance);
                        data = this.marker.attributes[6].value;
            if(!data){
              data = this.marker.attributes[7].value
            }
            for (let k=0;k<nodes.length;k++){
              if(data === nodes[k].arValue){
                let utterance = new SpeechSynthesisUtterance(`You are at ${nodes[k].name}`);
                let lang = localStorage.getItem('Language');
                if(lang === "Hindi"){
                  utterance.lang = 'hi-IN'
                }else{
                  utterance.lang = 'en-US'
                }
                window.speechSynthesis.speak(utterance);
              }
            }
            console.log("attributes", this.marker.attributes, data);
            localStorage.setItem("markerVal", data);
            //   let bName = localStorage.getItem('buildingName')
                        setTimeout(()=>{
            window.location.href = `/knc/cmb/wayfinding?KNCollege&&mar=${data}`;
            },2500);
            this.markerVisible = true;
          }
        } else {
          if (this.markerVisbile) {
            this.markerVisible = false;
          }
        }
      }
    });
    window.AFRAME.registerComponent("registerevents54", {
      init: function() {
        this.marker = document.getElementById("animated-marker54");
        this.markerVisible = false;
      },
      tick: function() {
        if (!this.marker) {
          return;
        }
        if (this.marker.object3D.visible) {
          if (!this.markerVisible) {
            // let utterance = new SpeechSynthesisUtterance(`Marker detected.`);
            // window.speechSynthesis.speak(utterance);
                        data = this.marker.attributes[6].value;
            if(!data){
              data = this.marker.attributes[7].value
            }
            for (let k=0;k<nodes.length;k++){
              if(data === nodes[k].arValue){
                let utterance = new SpeechSynthesisUtterance(`You are at ${nodes[k].name}`);
                let lang = localStorage.getItem('Language');
                if(lang === "Hindi"){
                  utterance.lang = 'hi-IN'
                }else{
                  utterance.lang = 'en-US'
                }
                window.speechSynthesis.speak(utterance);
              }
            }
            console.log("attributes", this.marker.attributes, data);
            localStorage.setItem("markerVal", data);
            //   let bName = localStorage.getItem('buildingName')
                        setTimeout(()=>{
            window.location.href = `/knc/cmb/wayfinding?KNCollege&&mar=${data}`;
            },2500);
            this.markerVisible = true;
          }
        } else {
          if (this.markerVisbile) {
            this.markerVisible = false;
          }
        }
      }
    });
    window.AFRAME.registerComponent("registerevents55", {
      init: function() {
        this.marker = document.getElementById("animated-marker55");
        this.markerVisible = false;
      },
      tick: function() {
        if (!this.marker) {
          return;
        }
        if (this.marker.object3D.visible) {
          if (!this.markerVisible) {
            // let utterance = new SpeechSynthesisUtterance(`Marker detected.`);
            // window.speechSynthesis.speak(utterance);
                        data = this.marker.attributes[6].value;
            if(!data){
              data = this.marker.attributes[7].value
            }
            for (let k=0;k<nodes.length;k++){
              if(data === nodes[k].arValue){
                let utterance = new SpeechSynthesisUtterance(`You are at ${nodes[k].name}`);
                let lang = localStorage.getItem('Language');
                if(lang === "Hindi"){
                  utterance.lang = 'hi-IN'
                }else{
                  utterance.lang = 'en-US'
                }
                window.speechSynthesis.speak(utterance);
              }
            }
            console.log("attributes", this.marker.attributes, data);
            localStorage.setItem("markerVal", data);
            //   let bName = localStorage.getItem('buildingName')
                        setTimeout(()=>{
            window.location.href = `/knc/cmb/wayfinding?KNCollege&&mar=${data}`;
            },2500);
            this.markerVisible = true;
          }
        } else {
          if (this.markerVisbile) {
            this.markerVisible = false;
          }
        }
      }
    });
    window.AFRAME.registerComponent("registerevents56", {
      init: function() {
        this.marker = document.getElementById("animated-marker56");
        this.markerVisible = false;
      },
      tick: function() {
        if (!this.marker) {
          return;
        }
        if (this.marker.object3D.visible) {
          if (!this.markerVisible) {
            // let utterance = new SpeechSynthesisUtterance(`Marker detected.`);
            // window.speechSynthesis.speak(utterance);
                        data = this.marker.attributes[6].value;
            if(!data){
              data = this.marker.attributes[7].value
            }
            for (let k=0;k<nodes.length;k++){
              if(data === nodes[k].arValue){
                let utterance = new SpeechSynthesisUtterance(`You are at ${nodes[k].name}`);
                let lang = localStorage.getItem('Language');
                if(lang === "Hindi"){
                  utterance.lang = 'hi-IN'
                }else{
                  utterance.lang = 'en-US'
                }
                window.speechSynthesis.speak(utterance);
              }
            }
            console.log("attributes", this.marker.attributes, data);
            localStorage.setItem("markerVal", data);
            //   let bName = localStorage.getItem('buildingName')
                        setTimeout(()=>{
            window.location.href = `/knc/cmb/wayfinding?KNCollege&&mar=${data}`;
            },2500);
            this.markerVisible = true;
          }
        } else {
          if (this.markerVisbile) {
            this.markerVisible = false;
          }
        }
      }
    });
    window.AFRAME.registerComponent("registerevents57", {
      init: function() {
        this.marker = document.getElementById("animated-marker57");
        this.markerVisible = false;
      },
      tick: function() {
        if (!this.marker) {
          return;
        }
        if (this.marker.object3D.visible) {
          if (!this.markerVisible) {
            // let utterance = new SpeechSynthesisUtterance(`Marker detected.`);
            // window.speechSynthesis.speak(utterance);
                        data = this.marker.attributes[6].value;
            if(!data){
              data = this.marker.attributes[7].value
            }
            for (let k=0;k<nodes.length;k++){
              if(data === nodes[k].arValue){
                let utterance = new SpeechSynthesisUtterance(`You are at ${nodes[k].name}`);
                let lang = localStorage.getItem('Language');
                if(lang === "Hindi"){
                  utterance.lang = 'hi-IN'
                }else{
                  utterance.lang = 'en-US'
                }
                window.speechSynthesis.speak(utterance);
              }
            }
            console.log("attributes", this.marker.attributes, data);
            localStorage.setItem("markerVal", data);
            //   let bName = localStorage.getItem('buildingName')
                        setTimeout(()=>{
            window.location.href = `/knc/cmb/wayfinding?KNCollege&&mar=${data}`;
            },2500);
            this.markerVisible = true;
          }
        } else {
          if (this.markerVisbile) {
            this.markerVisible = false;
          }
        }
      }
    });
    window.AFRAME.registerComponent("registerevents58", {
      init: function() {
        this.marker = document.getElementById("animated-marker58");
        this.markerVisible = false;
      },
      tick: function() {
        if (!this.marker) {
          return;
        }
        if (this.marker.object3D.visible) {
          if (!this.markerVisible) {
            // let utterance = new SpeechSynthesisUtterance(`Marker detected.`);
            // window.speechSynthesis.speak(utterance);
                        data = this.marker.attributes[6].value;
            if(!data){
              data = this.marker.attributes[7].value
            }
            for (let k=0;k<nodes.length;k++){
              if(data === nodes[k].arValue){
                let utterance = new SpeechSynthesisUtterance(`You are at ${nodes[k].name}`);
                let lang = localStorage.getItem('Language');
                if(lang === "Hindi"){
                  utterance.lang = 'hi-IN'
                }else{
                  utterance.lang = 'en-US'
                }
                window.speechSynthesis.speak(utterance);
              }
            }
            console.log("attributes", this.marker.attributes, data);
            localStorage.setItem("markerVal", data);
            //   let bName = localStorage.getItem('buildingName')
                        setTimeout(()=>{
            window.location.href = `/knc/cmb/wayfinding?KNCollege&&mar=${data}`;
            },2500);
            this.markerVisible = true;
          }
        } else {
          if (this.markerVisbile) {
            this.markerVisible = false;
          }
        }
      }
    });
    window.AFRAME.registerComponent("registerevents59", {
      init: function() {
        this.marker = document.getElementById("animated-marker59");
        this.markerVisible = false;
      },
      tick: function() {
        if (!this.marker) {
          return;
        }
        if (this.marker.object3D.visible) {
          if (!this.markerVisible) {
            // let utterance = new SpeechSynthesisUtterance(`Marker detected.`);
            // window.speechSynthesis.speak(utterance);
                        data = this.marker.attributes[6].value;
            if(!data){
              data = this.marker.attributes[7].value
            }
            for (let k=0;k<nodes.length;k++){
              if(data === nodes[k].arValue){
                let utterance = new SpeechSynthesisUtterance(`You are at ${nodes[k].name}`);
                let lang = localStorage.getItem('Language');
                if(lang === "Hindi"){
                  utterance.lang = 'hi-IN'
                }else{
                  utterance.lang = 'en-US'
                }
                window.speechSynthesis.speak(utterance);
              }
            }
            console.log("attributes", this.marker.attributes, data);
            localStorage.setItem("markerVal", data);
            //   let bName = localStorage.getItem('buildingName')
                        setTimeout(()=>{
            window.location.href = `/knc/cmb/wayfinding?KNCollege&&mar=${data}`;
            },2500);
            this.markerVisible = true;
          }
        } else {
          if (this.markerVisbile) {
            this.markerVisible = false;
          }
        }
      }
    });    window.AFRAME.registerComponent("registerevents60", {
      init: function() {
        this.marker = document.getElementById("animated-marker60");
        this.markerVisible = false;
      },
      tick: function() {
        if (!this.marker) {
          return;
        }
        if (this.marker.object3D.visible) {
          if (!this.markerVisible) {
            // let utterance = new SpeechSynthesisUtterance(`Marker detected.`);
            // window.speechSynthesis.speak(utterance);
                        data = this.marker.attributes[6].value;
            if(!data){
              data = this.marker.attributes[7].value
            }
            for (let k=0;k<nodes.length;k++){
              if(data === nodes[k].arValue){
                let utterance = new SpeechSynthesisUtterance(`You are at ${nodes[k].name}`);
                let lang = localStorage.getItem('Language');
                if(lang === "Hindi"){
                  utterance.lang = 'hi-IN'
                }else{
                  utterance.lang = 'en-US'
                }
                window.speechSynthesis.speak(utterance);
              }
            }
            console.log("attributes", this.marker.attributes, data);
            localStorage.setItem("markerVal", data);
                        setTimeout(()=>{
            window.location.href = `/knc/cmb/wayfinding?KNCollege&&mar=${data}`;
            },2500);
            this.markerVisible = true;
          }
        } else {
          if (this.markerVisbile) {
            this.markerVisible = false;
          }
        }
      }
    });
  // })
  }

  render() {
    return (
      <div>
        {this.state.hideAr ? (
          <div className="mt-5">
            <a-scene arjs="sourceType: webcam; debugUIEnabled: false; detectionMode: mono_and_matrix; matrixCodeType: 3x3;">
              <a-marker
                id="animated-marker1"
                registerevents1
                emitevents="true"
                cursor="rayOrigin: mouse"
                type="barcode"
                value="1"
              >
                <a-entity
                  id="animated-asset1"
                  gltf-model="#animated-asset1"
                  position="0 0 0"
                  scale="0.2 0.2 0.2"
                  animation-mixer
                >
                  {" "}
                </a-entity>
              </a-marker>
              <a-marker
                id="animated-marker2"
                registerevents2
                emitevents="true"
                cursor="rayOrigin: mouse"
                type="barcode"
                value="2"
              >
                <a-entity
                  id="animated-asset2"
                  gltf-model="#animated-asset1"
                  position="0 0 0"
                  scale="0.2 0.2 0.2"
                  animation-mixer
                >
                  {" "}
                </a-entity>
              </a-marker>
              <a-marker
                id="animated-marker3"
                registerevents3
                emitevents="true"
                cursor="rayOrigin: mouse"
                type="barcode"
                value="3"
              >
                <a-entity
                  id="animated-asset3"
                  gltf-model="#animated-asset1"
                  position="0 0 0"
                  scale="0.2 0.2 0.2"
                  animation-mixer
                >
                  {" "}
                </a-entity>
              </a-marker>
              <a-marker
                id="animated-marker4"
                registerevents4
                emitevents="true"
                cursor="rayOrigin: mouse"
                type="barcode"
                value="4"
              >
                <a-entity
                  id="animated-asset4"
                  gltf-model="#animated-asset1"
                  position="0 0 0"
                  scale="0.2 0.2 0.2"
                  animation-mixer
                >
                </a-entity>
              </a-marker>
              <a-marker
                id="animated-marker5"
                registerevents5
                emitevents="true"
                cursor="rayOrigin: mouse"
                type="barcode"
                value="5"
              >
                <a-entity
                  id="animated-asset1"
                  gltf-model="#animated-asset1"
                  position="0 0 0"
                  scale="0.2 0.2 0.2"
                  animation-mixer
                >
                  {" "}
                </a-entity>
              </a-marker>
              <a-marker
                id="animated-marker6"
                registerevents6
                emitevents="true"
                cursor="rayOrigin: mouse"
                type="barcode"
                value="6"
              >
                <a-entity
                  id="animated-asset2"
                  gltf-model="#animated-asset1"
                  position="0 0 0"
                  scale="0.2 0.2 0.2"
                  animation-mixer
                >
                  {" "}
                </a-entity>
              </a-marker>
              <a-marker
                id="animated-marker7"
                registerevents7
                emitevents="true"
                cursor="rayOrigin: mouse"
                type="barcode"
                value="7"
              >
                <a-entity
                  id="animated-asset3"
                  gltf-model="#animated-asset1"
                  position="0 0 0"
                  scale="0.2 0.2 0.2"
                  animation-mixer
                >
                  {" "}
                </a-entity>
              </a-marker>
              <a-marker
                id="animated-marker8"
                registerevents8
                emitevents="true"
                cursor="rayOrigin: mouse"
                type="barcode"
                value="8"
              >
                <a-entity
                  id="animated-asset4"
                  gltf-model="#animated-asset1"
                  position="0 0 0"
                  scale="0.2 0.2 0.2"
                  animation-mixer
                >
                  {" "}
                </a-entity>
              </a-marker>
              <a-marker
                id="animated-marker9"
                registerevents9
                emitevents="true"
                cursor="rayOrigin: mouse"
                type="barcode"
                value="9"
              >
                <a-entity
                  id="animated-asset1"
                  gltf-model="#animated-asset1"
                  position="0 0 0"
                  scale="0.2 0.2 0.2"
                  animation-mixer
                >
                  {" "}
                </a-entity>
              </a-marker>
              <a-marker
                id="animated-marker10"
                registerevents10
                emitevents="true"
                cursor="rayOrigin: mouse"
                type="barcode"
                value="10"
              >
                <a-entity
                  id="animated-asset2"
                  gltf-model="#animated-asset1"
                  position="0 0 0"
                  scale="0.2 0.2 0.2"
                  animation-mixer
                >
                  {" "}
                </a-entity>
              </a-marker>
              <a-marker
                id="animated-marker11"
                registerevents11
                emitevents="true"
                cursor="rayOrigin: mouse"
                type="barcode"
                value="11"
              >
                <a-entity
                  id="animated-asset3"
                  gltf-model="#animated-asset1"
                  position="0 0 0"
                  scale="0.2 0.2 0.2"
                  animation-mixer
                >
                  {" "}
                </a-entity>
              </a-marker>
              <a-marker
                id="animated-marker12"
                registerevents12
                emitevents="true"
                cursor="rayOrigin: mouse"
                type="barcode"
                value="12"
              >
                <a-entity
                  id="animated-asset4"
                  gltf-model="#animated-asset1"
                  position="0 0 0"
                  scale="0.2 0.2 0.2"
                  animation-mixer
                >
                  {" "}
                </a-entity>
              </a-marker>
              <a-marker
                id="animated-marker13"
                registerevents13
                emitevents="true"
                cursor="rayOrigin: mouse"
                type="barcode"
                value="13"
              >
                <a-entity
                  id="animated-asset4"
                  gltf-model="#animated-asset1"
                  position="0 0 0"
                  scale="0.2 0.2 0.2"
                  animation-mixer
                >
                  {" "}
                </a-entity>
              </a-marker>
              <a-marker
                id="animated-marker14"
                registerevents14
                emitevents="true"
                cursor="rayOrigin: mouse"
                type="barcode"
                value="14"
              >
                <a-entity
                  id="animated-asset4"
                  gltf-model="#animated-asset1"
                  position="0 0 0"
                  scale="0.2 0.2 0.2"
                  animation-mixer
                >
                  {" "}
                </a-entity>
              </a-marker>
              <a-marker
                id="animated-marker15"
                registerevents15
                emitevents="true"
                cursor="rayOrigin: mouse"
                type="barcode"
                value="15"
              >
                <a-entity
                  id="animated-asset4"
                  gltf-model="#animated-asset1"
                  position="0 0 0"
                  scale="0.2 0.2 0.2"
                  animation-mixer
                >
                  {" "}
                </a-entity>
              </a-marker>
              <a-marker
                id="animated-marker16"
                registerevents16
                emitevents="true"
                cursor="rayOrigin: mouse"
                type="barcode"
                value="16"
              >
                <a-entity
                  id="animated-asset4"
                  gltf-model="#animated-asset1"
                  position="0 0 0"
                  scale="0.2 0.2 0.2"
                  animation-mixer
                >
                  {" "}
                </a-entity>
              </a-marker>
              <a-marker
                id="animated-marker17"
                registerevents17
                emitevents="true"
                cursor="rayOrigin: mouse"
                type="barcode"
                value="17"
              >
                <a-entity
                  id="animated-asset4"
                  gltf-model="#animated-asset1"
                  position="0 0 0"
                  scale="0.2 0.2 0.2"
                  animation-mixer
                >
                  {" "}
                </a-entity>
              </a-marker>
              <a-marker
                id="animated-marker18"
                registerevents18
                emitevents="true"
                cursor="rayOrigin: mouse"
                type="barcode"
                value="18"
              >
                <a-entity
                  id="animated-asset4"
                  gltf-model="#animated-asset1"
                  position="0 0 0"
                  scale="0.2 0.2 0.2"
                  animation-mixer
                >
                  {" "}
                </a-entity>
              </a-marker>
              <a-marker
                id="animated-marker19"
                registerevents19
                emitevents="true"
                cursor="rayOrigin: mouse"
                type="barcode"
                value="19"
              >
                <a-entity
                  id="animated-asset4"
                  gltf-model="#animated-asset1"
                  position="0 0 0"
                  scale="0.2 0.2 0.2"
                  animation-mixer
                >
                  {" "}
                </a-entity>
              </a-marker>
              <a-marker
                id="animated-marker20"
                registerevents20
                emitevents="true"
                cursor="rayOrigin: mouse"
                type="barcode"
                value="20"
              >
                <a-entity
                  id="animated-asset4"
                  gltf-model="#animated-asset1"
                  position="0 0 0"
                  scale="0.2 0.2 0.2"
                  animation-mixer
                >
                  {" "}
                </a-entity>
              </a-marker>
              <a-marker
                id="animated-marker21"
                registerevents21
                emitevents="true"
                cursor="rayOrigin: mouse"
                type="barcode"
                value="21"
              >
                <a-entity
                  id="animated-asset4"
                  gltf-model="#animated-asset1"
                  position="0 0 0"
                  scale="0.2 0.2 0.2"
                  animation-mixer
                >
                  {" "}
                </a-entity>
              </a-marker>
              <a-marker
                id="animated-marker22"
                registerevents22
                emitevents="true"
                cursor="rayOrigin: mouse"
                type="barcode"
                value="22"
              >
                <a-entity
                  id="animated-asset4"
                  gltf-model="#animated-asset1"
                  position="0 0 0"
                  scale="0.2 0.2 0.2"
                  animation-mixer
                >
                  {" "}
                </a-entity>
              </a-marker>
              <a-marker
                id="animated-marker23"
                registerevents23
                emitevents="true"
                cursor="rayOrigin: mouse"
                type="barcode"
                value="23"
              >
                <a-entity
                  id="animated-asset4"
                  gltf-model="#animated-asset1"
                  position="0 0 0"
                  scale="0.2 0.2 0.2"
                  animation-mixer
                >
                  {" "}
                </a-entity>
              </a-marker>
              <a-marker
                id="animated-marker24"
                registerevents24
                emitevents="true"
                cursor="rayOrigin: mouse"
                type="barcode"
                value="24"
              >
                <a-entity
                  id="animated-asset4"
                  gltf-model="#animated-asset1"
                  position="0 0 0"
                  scale="0.2 0.2 0.2"
                  animation-mixer
                >
                  {" "}
                </a-entity>
              </a-marker>
              <a-marker
                id="animated-marker26"
                registerevents26
                emitevents="true"
                cursor="rayOrigin: mouse"
                type="barcode"
                value="26"
              >
                <a-entity
                  id="animated-asset4"
                  gltf-model="#animated-asset1"
                  position="0 0 0"
                  scale="0.2 0.2 0.2"
                  animation-mixer
                >
                  {" "}
                </a-entity>
              </a-marker>
              <a-marker
                id="animated-marker27"
                registerevents27
                emitevents="true"
                cursor="rayOrigin: mouse"
                type="barcode"
                value="27"
              >
                <a-entity
                  id="animated-asset4"
                  gltf-model="#animated-asset1"
                  position="0 0 0"
                  scale="0.2 0.2 0.2"
                  animation-mixer
                >
                  {" "}
                </a-entity>
              </a-marker>
              <a-marker
                id="animated-marker28"
                registerevents28
                emitevents="true"
                cursor="rayOrigin: mouse"
                type="barcode"
                value="28"
              >
                <a-entity
                  id="animated-asset4"
                  gltf-model="#animated-asset1"
                  position="0 0 0"
                  scale="0.2 0.2 0.2"
                  animation-mixer
                >
                  {" "}
                </a-entity>
              </a-marker>
              <a-marker
                id="animated-marker29"
                registerevents29
                emitevents="true"
                cursor="rayOrigin: mouse"
                type="barcode"
                value="29"
              >
                <a-entity
                  id="animated-asset4"
                  gltf-model="#animated-asset1"
                  position="0 0 0"
                  scale="0.2 0.2 0.2"
                  animation-mixer
                >
                  {" "}
                </a-entity>
              </a-marker>
              <a-marker
                id="animated-marker30"
                registerevents30
                emitevents="true"
                cursor="rayOrigin: mouse"
                type="barcode"
                value="30"
              >
                <a-entity
                  id="animated-asset4"
                  gltf-model="#animated-asset1"
                  position="0 0 0"
                  scale="0.2 0.2 0.2"
                  animation-mixer
                >
                  {" "}
                </a-entity>
              </a-marker>
              <a-marker
                id="animated-marker31"
                registerevents31
                emitevents="true"
                cursor="rayOrigin: mouse"
                type="barcode"
                value="31"
              >
                <a-entity
                  id="animated-asset4"
                  gltf-model="#animated-asset1"
                  position="0 0 0"
                  scale="0.2 0.2 0.2"
                  animation-mixer
                >
                  {" "}
                </a-entity>
              </a-marker>
              <a-marker
                id="animated-marker32"
                registerevents32
                emitevents="true"
                cursor="rayOrigin: mouse"
                type="barcode"
                value="32"
              >
                <a-entity
                  id="animated-asset4"
                  gltf-model="#animated-asset1"
                  position="0 0 0"
                  scale="0.2 0.2 0.2"
                  animation-mixer
                >
                  {" "}
                </a-entity>
              </a-marker>
              <a-marker
                id="animated-marker33"
                registerevents33
                emitevents="true"
                cursor="rayOrigin: mouse"
                type="barcode"
                value="33"
              >
                <a-entity
                  id="animated-asset4"
                  gltf-model="#animated-asset1"
                  position="0 0 0"
                  scale="0.2 0.2 0.2"
                  animation-mixer
                >
                  {" "}
                </a-entity>
              </a-marker>
              <a-marker
                id="animated-marker34"
                registerevents34
                emitevents="true"
                cursor="rayOrigin: mouse"
                type="barcode"
                value="34"
              >
                <a-entity
                  id="animated-asset4"
                  gltf-model="#animated-asset1"
                  position="0 0 0"
                  scale="0.2 0.2 0.2"
                  animation-mixer
                >
                  {" "}
                </a-entity>
              </a-marker>
              <a-marker
                id="animated-marker35"
                registerevents35
                emitevents="true"
                cursor="rayOrigin: mouse"
                type="barcode"
                value="35"
              >
                <a-entity
                  id="animated-asset4"
                  gltf-model="#animated-asset1"
                  position="0 0 0"
                  scale="0.2 0.2 0.2"
                  animation-mixer
                >
                  {" "}
                </a-entity>
              </a-marker>
              <a-marker
                id="animated-marker36"
                registerevents36
                emitevents="true"
                cursor="rayOrigin: mouse"
                type="barcode"
                value="36"
              >
                <a-entity
                  id="animated-asset4"
                  gltf-model="#animated-asset1"
                  position="0 0 0"
                  scale="0.2 0.2 0.2"
                  animation-mixer
                >
                  {" "}
                </a-entity>
              </a-marker>
              <a-marker
                id="animated-marker37"
                registerevents37
                emitevents="true"
                cursor="rayOrigin: mouse"
                type="barcode"
                value="37"
              >
                <a-entity
                  id="animated-asset4"
                  gltf-model="#animated-asset1"
                  position="0 0 0"
                  scale="0.2 0.2 0.2"
                  animation-mixer
                >
                  {" "}
                </a-entity>
              </a-marker>
              <a-marker
                id="animated-marker38"
                registerevents38
                emitevents="true"
                cursor="rayOrigin: mouse"
                type="barcode"
                value="38"
              >
                <a-entity
                  id="animated-asset4"
                  gltf-model="#animated-asset1"
                  position="0 0 0"
                  scale="0.2 0.2 0.2"
                  animation-mixer
                >
                  {" "}
                </a-entity>
              </a-marker>
              <a-marker
                id="animated-marker39"
                registerevents39
                emitevents="true"
                cursor="rayOrigin: mouse"
                type="barcode"
                value="39"
              >
                <a-entity
                  id="animated-asset4"
                  gltf-model="#animated-asset1"
                  position="0 0 0"
                  scale="0.2 0.2 0.2"
                  animation-mixer
                >
                  {" "}
                </a-entity>
              </a-marker>
              <a-marker
                id="animated-marker40"
                registerevents40
                emitevents="true"
                cursor="rayOrigin: mouse"
                type="barcode"
                value="40"
              >
                <a-entity
                  id="animated-asset4"
                  gltf-model="#animated-asset1"
                  position="0 0 0"
                  scale="0.2 0.2 0.2"
                  animation-mixer
                >
                  {" "}
                </a-entity>
              </a-marker>
              <a-marker
                id="animated-marker41"
                registerevents41
                emitevents="true"
                cursor="rayOrigin: mouse"
                type="barcode"
                value="41"
              >
                <a-entity
                  id="animated-asset4"
                  gltf-model="#animated-asset1"
                  position="0 0 0"
                  scale="0.2 0.2 0.2"
                  animation-mixer
                >
                  {" "}
                </a-entity>
              </a-marker>
              <a-marker
                id="animated-marker42"
                registerevents42
                emitevents="true"
                cursor="rayOrigin: mouse"
                type="barcode"
                value="42"
              >
                <a-entity
                  id="animated-asset4"
                  gltf-model="#animated-asset1"
                  position="0 0 0"
                  scale="0.2 0.2 0.2"
                  animation-mixer
                >
                  {" "}
                </a-entity>
              </a-marker>
              <a-marker
                id="animated-marker43"
                registerevents43
                emitevents="true"
                cursor="rayOrigin: mouse"
                type="barcode"
                value="43"
              >
                <a-entity
                  id="animated-asset4"
                  gltf-model="#animated-asset1"
                  position="0 0 0"
                  scale="0.2 0.2 0.2"
                  animation-mixer
                >
                  {" "}
                </a-entity>
              </a-marker>
              <a-marker
                id="animated-marker44"
                registerevents44
                emitevents="true"
                cursor="rayOrigin: mouse"
                type="barcode"
                value="44"
              >
                <a-entity
                  id="animated-asset4"
                  gltf-model="#animated-asset1"
                  position="0 0 0"
                  scale="0.2 0.2 0.2"
                  animation-mixer
                >
                  {" "}
                </a-entity>
              </a-marker>
              <a-marker
                id="animated-marker45"
                registerevents45
                emitevents="true"
                cursor="rayOrigin: mouse"
                type="barcode"
                value="45"
              >
                <a-entity
                  id="animated-asset4"
                  gltf-model="#animated-asset1"
                  position="0 0 0"
                  scale="0.2 0.2 0.2"
                  animation-mixer
                >
                </a-entity>
              </a-marker>
              <a-marker
                id="animated-marker46"
                registerevents46
                emitevents="true"
                cursor="rayOrigin: mouse"
                type="barcode"
                value="46"
              >
                <a-entity
                  id="animated-asset4"
                  gltf-model="#animated-asset1"
                  position="0 0 0"
                  scale="0.2 0.2 0.2"
                  animation-mixer
                >
                </a-entity>
              </a-marker>
              <a-marker
                id="animated-marker47"
                registerevents47
                emitevents="true"
                cursor="rayOrigin: mouse"
                type="barcode"
                value="47"
              >
                <a-entity
                  id="animated-asset4"
                  gltf-model="#animated-asset1"
                  position="0 0 0"
                  scale="0.2 0.2 0.2"
                  animation-mixer
                >
                </a-entity>
              </a-marker>
              <a-marker
                id="animated-marker48"
                registerevents48
                emitevents="true"
                cursor="rayOrigin: mouse"
                type="barcode"
                value="48"
              >
                <a-entity
                  id="animated-asset4"
                  gltf-model="#animated-asset1"
                  position="0 0 0"
                  scale="0.2 0.2 0.2"
                  animation-mixer
                >
                  {" "}
                </a-entity>
              </a-marker>
              <a-marker
                id="animated-marker49"
                registerevents49
                emitevents="true"
                cursor="rayOrigin: mouse"
                type="barcode"
                value="49"
              >
                <a-entity
                  id="animated-asset4"
                  gltf-model="#animated-asset1"
                  position="0 0 0"
                  scale="0.2 0.2 0.2"
                  animation-mixer
                >
                  {" "}
                </a-entity>
              </a-marker>
              <a-marker
                id="animated-marker50"
                registerevents50
                emitevents="true"
                cursor="rayOrigin: mouse"
                type="barcode"
                value="50"
              >
                <a-entity
                  id="animated-asset4"
                  gltf-model="#animated-asset1"
                  position="0 0 0"
                  scale="0.2 0.2 0.2"
                  animation-mixer
                >
                  {" "}
                </a-entity>
              </a-marker>
              <a-marker
                id="animated-marker51"
                registerevents51
                emitevents="true"
                cursor="rayOrigin: mouse"
                type="barcode"
                value="51"
              >
                <a-entity
                  id="animated-asset4"
                  gltf-model="#animated-asset1"
                  position="0 0 0"
                  scale="0.2 0.2 0.2"
                  animation-mixer
                >
                  {" "}
                </a-entity>
              </a-marker>
              <a-marker
                id="animated-marker52"
                registerevents52
                emitevents="true"
                cursor="rayOrigin: mouse"
                type="barcode"
                value="52"
              >
                <a-entity
                  id="animated-asset4"
                  gltf-model="#animated-asset1"
                  position="0 0 0"
                  scale="0.2 0.2 0.2"
                  animation-mixer
                >
                  {" "}
                </a-entity>
              </a-marker>
              <a-marker
                id="animated-marker53"
                registerevents53
                emitevents="true"
                cursor="rayOrigin: mouse"
                type="barcode"
                value="53"
              >
                <a-entity
                  id="animated-asset4"
                  gltf-model="#animated-asset1"
                  position="0 0 0"
                  scale="0.2 0.2 0.2"
                  animation-mixer
                >
                  {" "}
                </a-entity>
              </a-marker>
              <a-marker
                id="animated-marker54"
                registerevents54
                emitevents="true"
                cursor="rayOrigin: mouse"
                type="barcode"
                value="54"
              >
                <a-entity
                  id="animated-asset4"
                  gltf-model="#animated-asset1"
                  position="0 0 0"
                  scale="0.2 0.2 0.2"
                  animation-mixer
                >
                  {" "}
                </a-entity>
              </a-marker>
              <a-marker
                id="animated-marker55"
                registerevents55
                emitevents="true"
                cursor="rayOrigin: mouse"
                type="barcode"
                value="55"
              >
                <a-entity
                  id="animated-asset4"
                  gltf-model="#animated-asset1"
                  position="0 0 0"
                  scale="0.2 0.2 0.2"
                  animation-mixer
                >
                  {" "}
                </a-entity>
              </a-marker>
              <a-marker
                id="animated-marker56"
                registerevents56
                emitevents="true"
                cursor="rayOrigin: mouse"
                type="barcode"
                value="56"
              >
                <a-entity
                  id="animated-asset4"
                  gltf-model="#animated-asset1"
                  position="0 0 0"
                  scale="0.2 0.2 0.2"
                  animation-mixer
                >
                  {" "}
                </a-entity>
              </a-marker>
              <a-marker
                id="animated-marker57"
                registerevents57
                emitevents="true"
                cursor="rayOrigin: mouse"
                type="barcode"
                value="57"
              >
                <a-entity
                  id="animated-asset4"
                  gltf-model="#animated-asset1"
                  position="0 0 0"
                  scale="0.2 0.2 0.2"
                  animation-mixer
                >
                  {" "}
                </a-entity>
              </a-marker>
              <a-marker
                id="animated-marker58"
                registerevents58
                emitevents="true"
                cursor="rayOrigin: mouse"
                type="barcode"
                value="58"
              >
                <a-entity
                  id="animated-asset4"
                  gltf-model="#animated-asset1"
                  position="0 0 0"
                  scale="0.2 0.2 0.2"
                  animation-mixer
                >
                  {" "}
                </a-entity>
              </a-marker>
              <a-marker
                id="animated-marker59"
                registerevents59
                emitevents="true"
                cursor="rayOrigin: mouse"
                type="barcode"
                value="59"
              >
                <a-entity
                  id="animated-asset4"
                  gltf-model="#animated-asset1"
                  position="0 0 0"
                  scale="0.2 0.2 0.2"
                  animation-mixer
                >
                  {" "}
                </a-entity>
              </a-marker>
              <a-marker
                id="animated-marker60"
                registerevents60
                emitevents="true"
                cursor="rayOrigin: mouse"
                type="barcode"
                value="60"
              >
                <a-entity
                  id="animated-asset4"
                  gltf-model="#animated-asset1"
                  position="0 0 0"
                  scale="0.2 0.2 0.2"
                  animation-mixer
                >
                  {" "}
                </a-entity>
              </a-marker>
              <a-marker
                id="animated-marker61"
                registerevents61
                emitevents="true"
                cursor="rayOrigin: mouse"
                type="barcode"
                value="61"
              >
                <a-entity
                  id="animated-asset4"
                  gltf-model="#animated-asset1"
                  position="0 0 0"
                  scale="0.2 0.2 0.2"
                  animation-mixer
                >
                  {" "}
                </a-entity>
              </a-marker>
              <a-marker
                id="animated-marker62"
                registerevents62
                emitevents="true"
                cursor="rayOrigin: mouse"
                type="barcode"
                value="62"
              >
                <a-entity
                  id="animated-asset4"
                  gltf-model="#animated-asset1"
                  position="0 0 0"
                  scale="0.2 0.2 0.2"
                  animation-mixer
                >
                  {" "}
                </a-entity>
              </a-marker>
              <a-marker
                id="animated-marker63"
                registerevents63
                emitevents="true"
                cursor="rayOrigin: mouse"
                type="barcode"
                value="63"
              >
                <a-entity
                  id="animated-asset4"
                  gltf-model="#animated-asset1"
                  position="0 0 0"
                  scale="0.2 0.2 0.2"
                  animation-mixer
                >
                  {" "}
                </a-entity>
              </a-marker>
              <a-marker
                id="animated-marker64"
                registerevents64
                emitevents="true"
                cursor="rayOrigin: mouse"
                type="barcode"
                value="64"
              >
                <a-entity
                  id="animated-asset4"
                  gltf-model="#animated-asset1"
                  position="0 0 0"
                  scale="0.2 0.2 0.2"
                  animation-mixer
                >
                  {" "}
                </a-entity>
              </a-marker>
              <a-entity camera></a-entity>
            </a-scene>
            <div id="overlay5">        <button className="btn btn-danger" onClick={()=>{window.location.href = `/knc/cmb/wayfinding?KNCollege`}} >Back</button>
</div>
          </div>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    getImage: state.imgDetails,
    allNodes: state.getAllElem,
    fList: state.floorList
  };
};

export default connect(mapStateToProps, {
  floorList,
  imgDetails,
  getAllElements
})(Ar);