<!DOCTYPE html>
<?php 
include('Constants.php');
$floor = $_GET['floor'];
$building = $_GET['building'];
$x = $building.$floor;
?>

<html>

<head>
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
    <script type="text/javascript" src="lib/bs/jquery.min.js"></script>
    <link href="lib/bs/css/bootstrap.min.css" rel="stylesheet">
    <script type="text/javascript" src="lib/bs/js/bootstrap.min.js"></script>
    <!-- <script src="https://aframe.io/releases/0.8.0/aframe.min.js"></script> -->
    <!-- <script src="https://cdn.rawgit.com/jeromeetienne/AR.js/1.6.0/aframe/build/aframe-ar.js"></script> -->

    <!-- <script src="https://twitter.github.io/typeahead.js/releases/latest/typeahead.bundle.js" integrity="sha256-9LeEGfQ5kyFt9Jn2EfwXqdBII40MS8iOC2YRF4T/T14=" crossorigin="anonymous"></script>
    <script src="https://code.jquery.com/jquery-3.4.1.min.js" integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo=" crossorigin="anonymous"></script> -->
    <!-- <script src="https://code.jquery.com/jquery-3.4.1.min.js" integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo=" crossorigin="anonymous"></script> -->
    <!-- <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" rel="stylesheet"> -->
    <!-- <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.js"></script> -->
    <!-- <script src="https://twitter.github.io/typeahead.js/releases/latest/typeahead.bundle.js" crossorigin="anonymous"></script>  -->
    <!-- <script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/typeahead.js/0.10.4/typeahead.bundle.min.js"></script> -->
    <!-- <script src="lib/aframe/dist/aframe-master.min.js"></script> -->
    <!-- <script src="lib/arjs/aframe/build/aframe-ar.js"></script> -->
    <script type="text/javascript" src="bootstrap3-typeahead.js"></script>
    <script src='https://code.responsivevoice.org/responsivevoice.js'></script>

    <link href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous">
    <link rel="stylesheet" href="styles.css" />
    <!-- <link href="styles.css" rel="stylesheet" >    -->
    <script>
        var cords = [];
        var chords = [];
        var connected = [];
        var connected_nodes = [];
        var src_tag, dest_tag;
        var src_bool = false,
            dest_bool = false;
        var src = -1,
            dest = -1;
        var sel = 0;
        var prev = -1;
        var select;
        var short;
        let marker = null;
        var t = [];
        var curr = 0;
        var submit = true;
        var l = 0;
        var n = 0;
        var next = null;
        var prev = null;
        var unique = null;
        // var data = 0;
        let abc = '<?php echo $x ?>';
        console.log("aaa",a)
        <?php
        $sql = "SELECT JSON_string FROM maps_data WHERE name = '$x' and version = '0' limit 1";
        $result = mysqli_query($conn, $sql);
        $row = mysqli_fetch_assoc($result);
        ?>

        <?php
        $sqln = "SELECT JSON_string FROM maps_data where name = '$x' and version = '0'";
        $resultn = mysqli_query($conn, $sqln);
        $rown = mysqli_fetch_assoc($resultn);
        ?>
        var tr = '<?php echo $row['JSON_string']; ?>';

        let obj = JSON.parse(tr);


        document.addEventListener("DOMContentLoaded", function(event) {

        if (window.DeviceOrientationEvent) {
            window.addEventListener('deviceorientation', function(eventData) {
              // gamma: Tilting the device from left to right. Tilting the device to the right will result in a positive value.
            var tiltLR = eventData.gamma;
            
            // beta: Tilting the device from the front to the back. Tilting the device to the front will result in a positive value.
            var tiltFB = eventData.beta;
            
            // alpha: The direction the compass of the device aims to in degrees.
            var dir = eventData.alpha
            
            // Call the function to use the data on the page.
            deviceOrientationHandler(tiltLR, tiltFB, dir);
            }, false);
            } else {
            };
        
            function deviceOrientationHandler(tiltLR, tiltFB, dir) {
            //   document.getElementById("tiltLR").innerHTML = Math.ceil(tiltLR);
            //   document.getElementById("tiltFB").innerHTML = Math.ceil(tiltFB);
            //   document.getElementById("direction").innerHTML = Math.ceil(dir);

              if((Math.ceil(dir) > 0) && (Math.ceil(dir) <= 90)){
                //   if((Math.ceil(tiltLR) >= 0) && (Math.ceil(tiltFB) > 0)){
                    document.getElementById("direction").innerHTML = "West" + Math.ceil(dir);
                //   }else if((Math.ceil(tiltLR) >= 0) && (Math.ceil(tiltFB) < 0)){
                    // document.getElementById("direction").innerHTML = "South" + "negative" + Math.ceil(dir);
                //   }else{
                //       console.log("")
                //   }
              }else if((Math.ceil(dir) > 90) && (Math.ceil(dir) <= 180)){
                    document.getElementById("direction").innerHTML = "South" + "negative" + Math.ceil(dir);

                // if((Math.ceil(tiltLR) > 0) && (Math.ceil(tiltFB) >0)){
                //     document.getElementById("direction").innerHTML = "East" + Math.ceil(dir) + Math.ceil(tiltFB);
                //   }else if((Math.ceil(tiltLR) >= 0) && (Math.ceil(tiltFB) < 0)){
                //     document.getElementById("direction").innerHTML = "North" + Math.ceil(dir) + "negative" + Math.ceil(tiltFB);
                //   }else{
                //       console.log("")
                //   }
              }else if((Math.ceil(dir) > 180) && (Math.ceil(dir) <= 270)){
                    document.getElementById("direction").innerHTML = "East" + "negative" + Math.ceil(dir);
              }else if((Math.ceil(dir) > 270) && (Math.ceil(dir) <= 360)){
                    document.getElementById("direction").innerHTML = "North" + "negative" + Math.ceil(dir);
              }
            
              // Rotate the disc of the compass.
              var compassDisc = document.getElementById("compassDiscImg");
              compassDisc.style.webkitTransform = "rotate("+ dir +"deg)";
              compassDisc.style.MozTransform = "rotate("+ dir +"deg)";
              compassDisc.style.transform = "rotate("+ dir +"deg)";
            }
        });

        function back(){
            window.location = 'landing.php';
        }

        function myFunction(){
            var z = '<?php echo $x; ?>';
            b = z + ".jpg";
            var a = "images/" + b;
            var elem = document.getElementById("example2");
            elem.style.background = "url('" + a + "')";
            elem.style.backgroundRepeat = "no-repeat";
            elem.style.backgroundSize = "100% 100%";
            let srcval = localStorage.getItem('src');
            let destval = localStorage.getItem('dest');
            let source = localStorage.getItem('source');
            let destination = localStorage.getItem('destination');
            marker = localStorage.getItem('marker_value');

            let val = null;
            if(marker != null){
                document.getElementById("source").value = source;
                document.getElementById("destination").value = destination;
                reset();
            // let cur = null;            
             let obj = JSON.parse(tr);
                for(var b = 0; b < obj.cords.length ; b++){
                   if(marker == obj.cords[b].marker){
                     val = obj.cords[b].value;
                   }
                }
                src = srcval;
                dest = destval;
                // var tr = '{"cords":[{"value":5626,"connected_nodes":[4726],"Tags":["entry"]},{"value":3226,"connected_nodes":[4726,3229,2226],"Tags":[]},{"value":3229,"connected_nodes":[3226],"Tags":["stairs","help desk"]},{"value":2226,"connected_nodes":[3226,2240],"Tags":[]},{"value":2240,"connected_nodes":[2226],"Tags":[]},{"value":4726,"connected_nodes":[3226,5626,4750],"Tags":[]},{"value":4750,"connected_nodes":[4726],"Tags":["gents washroom","ladies washroom"]}]}'
                for(var b=0;b<obj.cords.length;b++){
                cords[b] = obj.cords[b].value;
                for(var c=0;c<obj.cords[b].connected_nodes.length;c++){
                   connected_nodes[b][c] = obj.cords[b].connected_nodes[c];
                 }
                }
                document.getElementById("example2").style.opacity = 0.8;
                shortest_path();
                red(src);
                yellow(val)
                red(dest);
                short  = unique.reverse()
                let name = null;
                let count = 0;
                let curDesc = null;
                let notFound = false;
                for(let i=0;i<short.length;i++){
                    count = count + 1;
                    if(val === short[i].value){
                        notFound = false;
                        // if(short[i+1] != null || short[i+1] != undefined || short[i-1] != null || short[i-1] != undefined ){
                            prev = short[i-1]
                            curDesc = short[i].description;
                            name = short[i].name
                            cur = i;
                            next = short[i+1];
                        // }                    
                    }else{
                        notFound = true
                    }
                }
                            let nxName = next.name;
                            let prName = prev.name;

                    if (src > dest - 20){
                                let dist = Math.abs(short[cur].value - short[cur + 1].value)            
                                if (short[cur].x === short[cur + 1].x) {
                                responsiveVoice.speak(`Your current location is ${name}.from here  go straight take ${dist/10}  steps  and move towards  ${nxName}. Your previous location was ${prName}`);
                                        // responsiveVoice.speak(`From  ${short[cur].name}  go straight take ${dist/10}  steps  and move towards  ${short[cur+1].name}`);
                                } else if (short[cur].y === short[cur + 1].y) {
                                    if (dist > 0) {
                                responsiveVoice.speak(`Your current location is ${name}.from here  turn right and take ${dist/10}  steps  and move towards  ${nxName}. Your previous location was ${prName}`);
                                        // responsiveVoice.speak(`From  ${short[cur].name}  turn right and take ${dist/10}  steps  and move towards  ${short[cur+1].name}`);
                                    } else {
                                responsiveVoice.speak(`Your current location is ${name}.from here  turn left and take ${dist/10}  steps  and move towards  ${nxName}. Your previous location was ${prName}`);
                                        // responsiveVoice.speak(`From  ${short[cur].name}  turn left and take ${dist/10}  steps  and move towards  ${short[cur+1].name}`);
                                    }
                                } else {
                                    console.log("not in path")
                                }
                        }

                    document.getElementById("current").style.display = "block";
                    document.getElementById("next").style.display = "block";
                    document.getElementById("previous").style.display = "block";
                    document.getElementById("startp").style.display = "block";
                    document.getElementById("endp").style.display = "block";
                    document.getElementById("startp").innerHTML = `<i class="fa fa-map-marker"></i>` +" Source: " + source  ;
                    document.getElementById("endp").innerHTML = `<i class="fa fa-map-marker"></i>` + " Destination: " + destination;
                    if(name != null ){
                    document.getElementById("current").innerHTML = `<i class="fa fa-dot-circle-o"></i>` + " Current Location: " + name;
                    document.getElementById("next").innerHTML = `<i class="fa fa-arrow-up"></i>` + " Next Location: "+ next.name;
                    document.getElementById("previous").innerHTML = `<i class="fa fa-arrow-down"></i>` + " Previous Location: "+ prev.name;
                }                   
                let end = short[short.length-1].name
            }
            
            }


            for (var temp = 0; temp < 3600; temp++) {
                connected[temp] = [];
            }
            for (var temp = 0; temp < 3600; temp++) {
                connected_nodes[temp] = [];
            }
            // var obj = JSON.parse(tr);
            for (var b = 0; b < obj.cords.length; b++) {
                chords[b] = obj.cords[b].value;
                for (var i = 0; i < obj.cords[b].connected_nodes.length; i++) {
                    connected[b][i] = obj.cords[b].connected_nodes[i];
                }
            }
            function openNav() {
                document.getElementById("mySidenav").style.width = "250px";
            }
            function closeNav() {
                document.getElementById("mySidenav").style.width = "0";
            }
            let data = [];
            for (let i = 0; i < obj.cords.length; i++) {
                data.push(obj.cords[i].name)
            }
            $(document).ready(function() {
                $('#source').typeahead({
                    source: data
                });
            });
            $(document).ready(function() {
                $('#destination').typeahead({
                    source: data
                });
            });

            // When the user clicks on div, open the popup
            $(function() {
                $("#but1").click(function() {
                    $(".fullscreen-container").fadeTo(200, 1);
                });
                $("#but2").click(function() {
                    $(".fullscreen-container").fadeOut(200);
                });
            });
            $(function() {

                $("#bt2").click(function() {
                    $(".full-container").fadeOut(200);
                });
            });

            $(function() {
                $("#btnSub").click(function() {style="z-index:-1;"
                    //  alert("hello");
                    var tag = document.getElementById("complaint").value;
                    var comp = $("input[name='prob']:checked").val();
                    if (comp == 'Other') {
                        comp = "Other: " + document.getElementById("otherdata").value;
                    }
                    // alert(tag);
                    var val;
                    var obj = JSON.parse(tr);
                    var img = '<?php echo $x; ?>';
                    //  alert(img);
                    for (var b = 0; b < obj.cords.length; b++) {
                        for (var c = 0; c < obj.cords[b].Tags.length; c++) {
                            // alert( obj.cords[b].Tags[c]);
                            if (tag == obj.cords[b].Tags[c]) {
                                val = obj.cords[b].value;
                            }
                        }
                    }
                    $.post("complaint.php", //Required URL of the page on server
                        { // Data Sending With Request To Server
                            value: val,
                            map: img,
                            complaint: comp,
                            tag: tag
                        },
                        function(response, status) { // Required Callback Function
                            //alert("*----Received Data----*nnResponse : " + response+"nnStatus : " + status);//"response" receives - whatever written in echo of above PHP script.
                            $(".fullscreen-container").fadeOut(200);
                            $("#form")[0].reset();

                        });
                });
            });

            var img = '<?php echo $x; ?>';


            //alert(nd);
            var nod = $.ajax({
                type: 'POST',
                url: "node.php",
                data: {
                    map: img
                },
                dataType: 'json',
                context: document.body,
                global: false,
                async: false,
                success: function(data) {
                    return data;
                }
            }).responseText;

            //alert(nod);
            var a = nod.length;
            var tt = JSON.parse(nod);

            function handleSubmit() {
                reset();
                localStorage.clear()
                sr = document.getElementById("source").value;
                des = document.getElementById("destination").value;

                document.getElementById("startp").innerHTML = `<i class="fa fa-map-marker"></i> Source:   ${sr}`;
                document.getElementById("endp").innerHTML = `<i class="fa fa-map-marker"></i> Destination:   ${des}`;
                document.getElementById("current").style.display = "none";
                document.getElementById("next").style.display = "none";
                document.getElementById("previous").style.display = "none";
                responsiveVoice.speak("You have selected source as " + document.getElementById("source").value + ". and your destination is  " + document.getElementById("destination").value);

                // endspeak();
                var obj = JSON.parse(tr);
                cur = 0;
                submit = true
                for (var b = 0; b < obj.cords.length; b++) {
                    // for (var c = 0; c < obj.cords[b].Tags.length; c++) {
                        // alert( obj.cords[b].Tags[c]);
                        if (sr == obj.cords[b].name) {
                            localStorage.setItem("source", obj.cords[b].name)
                            src = obj.cords[b].value;
                            // alert("hello");
                        }
                        if (des == obj.cords[b].name) {
                            localStorage.setItem("destination", obj.cords[b].name)
                            dest = obj.cords[b].value;
                        }
                    // }
                }
                localStorage.setItem('src', src)
                localStorage.setItem('dest', dest)
                // var tr = '{"cords":[{"value":5626,"connected_nodes":[4726],"Tags":["entry"]},{"value":3226,"connected_nodes":[4726,3229,2226],"Tags":[]},{"value":3229,"connected_nodes":[3226],"Tags":["stairs","help desk"]},{"value":2226,"connected_nodes":[3226,2240],"Tags":[]},{"value":2240,"connected_nodes":[2226],"Tags":[]},{"value":4726,"connected_nodes":[3226,5626,4750],"Tags":[]},{"value":4750,"connected_nodes":[4726],"Tags":["gents washroom","ladies washroom"]}]}'
                var obj = JSON.parse(tr);
                for (var b = 0; b < obj.cords.length; b++) {
                    cords[b] = obj.cords[b].value;
                    for (var c = 0; c < obj.cords[b].connected_nodes.length; c++) {
                        connected_nodes[b][c] = obj.cords[b].connected_nodes[c];
                    }
                }
                document.getElementById("example2").style.opacity = 0.8;
                //  console.log(src+" "+dest);
                shortest_path();
                red(src);
                red(dest);
                short = unique.reverse();
                let start = short[0].name
                let end = short[short.length - 1].name
                document.getElementById("example2").style.opacity = 0.8;
            }
            var shortest_path_var = [];
        function shortest_path() {
            var pred = [];
            var dist = [];
            if (BFS(pred, dist) == false) {
                alert("selected nodes are not connected");
                return;
            }
            var path = [];
            var crawl = dest;
            path.push(crawl);
            var ai = 1;
            while (pred[find(crawl, cords)] != -1) {
                path.push(pred[find(crawl, cords)]);
                crawl = pred[find(crawl, cords)];
                ai++;
                if (ai == 1000)
                    return;
            }

            shortest_path_var = path;
            for (var b = 0; b < (path.length); b++) {
                let pr = null,
                    nex = null;
                let tem = path[b];
                if (b < (path.length - 1)) {
                    nex = path[b + 1];
                }
                if (b > 0) pr = path[b - 1];
                t[b] = {}
                var obj = JSON.parse(tr);
                for (let j = 0; j < obj.cords.length; j++) {

                    if (tem == obj.cords[j].value) {
                        t[b]['value'] = obj.cords[j].value;
                        t[b]['description'] = obj.cords[j].description;
                        t[b]['name'] = obj.cords[j].name;
                        t[b]['Tags'] = obj.cords[j].Tags;

                    }
                }
                for (let j = 0; j < cords.length; j++) {
                    if (tem == cords[j]) {
                        t[b]['x'] = mod(tem);
                        t[b]['y'] = div(tem);
                        break;
                    }
                }
                if (path[b + 1] !== undefined) {
                    make_path(path[b], path[b + 1]);
                }
                blue(path[b]);
            }
            
            for (var b = path.length - 1; b >= 0; b--) {
                for (var c = 0; c < obj.cords.length; c++) {
                    if (i == obj.cords[c].value) {
                        document.getElementById("name").innerHTML = obj.cords[c].name;
                        document.getElementById("description").innerHTML = obj.cords[c].description;
                        document.getElementById("tags").innerHTML = obj.cords[c].Tags;
                    }
                    yellow(b);
                }
            }

             unique = t.filter((arr, index, self) =>
                index === self.findIndex((s) => (s.value === arr.value)))
        }

        function mod(a) {
            return (a % 100);
        }

        function sl(a, b) {
            var ax = mod(a);
            var ay = div(a);
            var bx = mod(b);
            var by = div(b);
            var slope = (by - ay) / (bx - ax);
            return slope;
        }

        function div(a) {
            return Math.floor(a / 100);
        }

        function BFS(pred, dist) {
            var queue = [];
            var visited = [];
            for (var b = 0; b < cords.length; b++) {
                visited[b] = false;
                dist[b] = 100000;
                pred[b] = -1;
            }
            visited[find(src, cords)] = true;
            dist[find(src, cords)] = 0;
            queue.push(src);
            var o = 0;
            while (queue.length != 0) {
                var u = queue.shift();
                //equivalent to pop
                var inde = find(u, cords);
                o++;
                for (var b = 0; b < connected_nodes[inde].length; b++) {
                    if (length(u, connected_nodes[inde][b]) + dist[find(u, cords)] < dist[find(connected_nodes[inde][b], cords)]) {
                        visited[find(connected_nodes[inde][b], cords)] = true;
                        dist[find(connected_nodes[inde][b], cords)] = dist[find(u, cords)] + length(u, connected_nodes[inde][b]);
                        pred[find(connected_nodes[inde][b], cords)] = u;
                        queue.push(connected_nodes[inde][b]);
                        o++;
                        if (o > 100)
                            return false;
                    }
                }
                if (o > 100)
                    return false;
            }
            if (dist[find(dest, cords)] == 100000)
                return false;
            return true;
        }

        function length(A, B) {
            var x1 = Math.floor(A / 100);
            var x2 = Math.floor(B / 100);
            var y1 = A % 100;
            var y2 = B % 100;
            var z = Math.pow((x2 - x1), 2) + Math.pow((y2 - y1), 2);
            // console.log("A,B:"+A+" "+B+"z: "+z);
            return Math.sqrt(z);
        }

        function find(key, array) { //returns the index at which key is store in array
            for (var i = 0; i < array.length; i++) {
                if (array[i] == key) {
                    return i;
                }
            }
            return -1;
        }

        function greenify(i) {
            document.getElementById(i).style.backgroundColor = "lawngreen";
        }

        function make_path(x, y) {
            var a, b, c, d, e, f, g;
            a = Math.floor(x / 100);
            b = x % 100;
            c = Math.floor(y / 100);
            d = y % 100;
            e = Math.floor((a + c) / 2);
            f = Math.floor((b + d) / 2);
            if (e == a & f == b) {
                g = 100 * c + b;
                greenify(g);
            } else if (e == c & f == d) {
                g = 100 * a + d;
                greenify(g);
            } else {
                g = 100 * e + f;
                greenify(g);
                make_path(g, x);
                make_path(g, y);
            }
        }

        function blue(i) {
            document.getElementById(i).style.backgroundColor = "blue";
        }

        function red(i) {
            document.getElementById(i).style.backgroundColor = "red";
        }

        function yellow(i) {
            document.getElementById(i).style.opacity = "1";
            document.getElementById(i).style.backgroundColor = "#ffcb00";
        }

        function reset() {
            var kk = 0;
            for (var ii = 0; ii < 60; ii++) {
                for (var jj = 0; jj < 60; jj++) {
                    kk = 100 * ii + jj;
                    document.getElementById(kk).style.backgroundColor = "";
                }
            }
        }

        function clk(i) {
            if (find(i, chords) != -1) {
                select = i;
                //
                if (sel == 1) {
                    red(prev);
                    sel = 0;
                }
                for (var c = 0; c < obj.cords.length; c++) {
                    if (i == obj.cords[c].value) {
                        $(".full-container").fadeTo(200, 1);
                        var img = '<?php echo $x; ?>';
                        var test;
                        var cp = $.ajax({
                            type: 'POST',
                            url: "getcomplaint.php",
                            data: {
                                map: img,
                                value: i
                            },

                            context: document.body,
                            global: false,
                            async: false,
                            success: function(data) {
                                return data;
                            }
                        }).responseText;
                        var cpj = JSON.parse(cp);
                        var nde = $.ajax({
                            type: 'POST',
                            url: "getnode.php",
                            data: {
                                map: img,
                                value: i
                            },

                            context: document.body,
                            global: false,
                            async: false,
                            success: function(data) {
                                return data;
                            }
                        }).responseText;
                        var ob = JSON.parse(nde);
                        document.getElementById("n").innerHTML = " " + ob.name;
                        document.getElementById("d").innerHTML = ob.Description;
                        document.getElementById("t").innerHTML = ob.Tags;
                        if (cpj == null) {
                            document.getElementById('cpl').innerHTML = " ";
                        } else {
                            document.getElementById('cpl').innerHTML = cpj.complaint + " at " + cpj.Tag;
                        }
                        document.getElementById("ad").src = "audio/" + ob.audio;
                        document.getElementById("preview").src = "img/" + ob.image;
                    }
                    yellow(i);
                }
                sel = 1;
                prev = i;
            } else {
                red(prev);
            }
        }

        /*Next Click */
        function Next() {
            if (l < short.length) {
                if (src > dest - 20) {
                    if (submit === false) {
                        if (cur != 0) {
                            if (short[cur].x === short[cur + 1].x) {
                                let dist = Math.abs(short[cur].value - short[cur + 1].value)
                                document.getElementById("demo").innerHTML = "From " + short[cur].name + " go straight take" + dist / 100 + "steps" + " " + "and move towards" + " " + short[cur + 1].name;
                            } else if (short[cur].y === short[cur + 1].y) {
                                let dist = short[cur].value - short[cur + 1].value
                                if (dist > 0) {
                                    document.getElementById("demo").innerHTML = " From" + short[cur].name + "turn left take" + dist / 100 + "steps" + " " + "and move towards" + " " + short[cur + 1].name;
                                } else {
                                    document.getElementById("demo").innerHTML = "From" + short[cur].name + "turn right take" + Math.abs(dist / 100) + "steps" + " " + "and move towards" + " " + short[cur + 1].name;
                                }
                            } else {
                                return;
                            }
                            cur++;
                        }
                    } else {
                        if (short[l].x === short[l + 1].x) {
                            let dist = Math.abs(short[l].value - short[l + 1].value)
                            // green(short[l].value);
                            document.getElementById("demo").innerHTML = "From " + short[l].name + " go straight take" + dist / 100 + "steps" + " " + "and move towards" + " " + short[l + 1].name;
                        } else if (short[l].y === short[l + 1].y) {
                            let dist = short[l].value - short[l + 1].value
                            // green(short[l].value);
                            if (dist > 0) {
                                document.getElementById("demo").innerHTML = " From" + short[l].name + "turn left take" + dist / 100 + "steps" + " " + "and move towards" + " " + short[l + 1].name;
                            } else {
                                document.getElementById("demo").innerHTML = "From" + short[l].name + "turn right take" + Math.abs(dist / 100) + "steps" + " " + "and move towards" + " " + short[l + 1].name;
                            }
                        } else {
                            return;
                        }
                        l++;
                    }
                }
            }
            console.log("lll",l,cur)
        }

        /*Previous*/
        function Previous() {
            if (l < short.length) {
                if (src > dest - 20) {
                    if (submit === false) {
                        if (cur != 0) {
                            if (short[cur].x === short[cur - 1].x) {
                                let dist = Math.abs(short[cur].value - short[cur - 1].value)
                                document.getElementById("demoz").innerHTML = "From " + short[cur].name + " go straight take" + dist / 100 + "steps" + " " + "and move towards" + " " + short[cur - 1].name;
                            } else if (short[cur].y === short[cur - 1].y) {
                                let dist = short[cur].value - short[cur - 1].value
                                if (dist > 0) {
                                    document.getElementById("demoz").innerHTML = " From" + short[cur].name + "turn left take" + dist / 100 + "steps" + " " + "and move towards" + " " + short[cur - 1].name;
                                } else {
                                    document.getElementById("demoz").innerHTML = "From" + short[cur].name + "turn right take" + Math.abs(dist / 100) + "steps" + " " + "and move towards" + " " + short[cur - 1].name;
                                }
                            } else {
                                return;
                            }
                            cur--;
                        }
                    } else {
                        if (short[l - 1].x === short[l].x) {
                            let dist = Math.abs(short[l].value - short[l - 1].value)
                            yellow(short[l].value);
                            document.getElementById("demoz").innerHTML = "From " + short[l].name + " go straight take" + dist / 100 + "steps" + " " + "and move towards" + " " + short[l - 1].name;
                        } else if (short[l].y === short[l - 1].y) {
                            let dist = short[l].value - short[l - 1].value
                            yellow(short[l].value);
                            if (dist > 0) {
                                document.getElementById("demoz").innerHTML = " From" + short[l].name + "turn left take" + dist / 100 + "steps" + " " + "and move towards" + " " + short[l - 1].name;
                            } else {
                                document.getElementById("demoz").innerHTML = "From" + short[l].name + "turn right take" + Math.abs(dist / 100) + "steps" + " " + "and move towards" + " " + short[l - 1].name;
                            }
                        } else {
                            return;
                        }
                        l--;
                    }
                }
            }
        }

        /* speak text */
        function speaksource() {
            if (l == 1) {
                responsiveVoice.speak($("#source").value.text());
            }
        }

        function speaknext() {
            responsiveVoice.speak($("#demo").text());
        }

        function speakprevious() {
            responsiveVoice.speak($("#demoz").text());
        }

        function endspeak() {
            if (l == short.length - 3) {
                responsiveVoice.speak($("#destination").value.text());
            }
        }
        /* Compass */
        function modalclk(){
            $('#mymodal').modal('show')
            responsiveVoice.speak($("#modal-title").text());
        }



        function arjs(){
            console.log("arjs clicked")
            window.location.href = 'arjs.php';
        }
    </script>
</head>

<body onload="myFunction()">
    <nav class="navbar navbar-light bg-secondary navigation">
        <!-- <a class="navbar-brand">Navbar</a> -->
        <div class="d-flex">
            <div>
                <!-- <div id="mySidenav" class="sidenav">
                    <a href="javascript:void(0)" class="closebtn" onclick="closeNav()">&times;</a>
                    <a href="#">About</a>
                    <a href="#">Services</a>
                    <a href="#">Clients</a>
                    <a href="#">Contact</a>
                </div> -->
                <span  style="font-size:30px;cursor:pointer" class="fa fa-long-arrow-left" onclick="back()"></span>
                <!-- <span style="font-size:30px;cursor:pointer" onclick="back()"><i class="glyphicon glyphicon-arrow-left"></i></span> -->
                <!-- <span style="font-size:30px;cursor:pointer" onclick="openNav()"><i class="glyphicon glyphicon-arrow-left"></i></span> -->
            </div>
            <div class="ml-3 respo">
                <div class="d-flex flex-row align-items-center">
                    <div class="d-flex flex-column">
                        <input class="form-control mr-sm-2 mb-1 typeahead" id="source" type="search" placeholder="Source" aria-label="Search">
                        <input class="form-control mr-sm-2 typeahead" type="search" id="destination" placeholder="Destination" aria-label="Search">
                    </div>
                        <button type="button" class="btn btn-primary btn-sm mt-5 ml-2" onclick="handleSubmit()">Find Path</button>
                </div>
            </div>
        </div>
    </nav>
    <!-- <div class="shadow-lg p-1 mb-2 bg-white rounded"></div> -->
    <div>
        <div class="d-flex justify-content-center">
        <button type="button" class="btn btn-dark artag" onclick="arjs()" ><i class="fa fa-camera" aria-hidden="true"></button></i>
        <button type="button" id="compassDiscImg" class="btn btn-dark mgnt" ><i class="fa fa-compass" aria-hidden="true"></i></button>
        <div id="example2" style="z-index:-999;">
                <div class="grid-container" style="z-index:1;">
                    <script type="text/javascript">
                        for (var i = 0; i < 60; i++) {
                            for (var j = 0; j < 60; j++) {
                                var k = 100 * i + j;
                                document.write("<div class=\"grid-item\" id = \"" + k + "\" onclick =\"clk(" +
                                    k + ")\"></div>");
                            }
                        }
                    </script>
                </div>
            </div>
        </div>
    </div>
        <div class="d-flex flex-column justify-content-center text-capitalize">
            <span><p id="startp" class="ml-5"></p></span>
			<span><p id="next" class="ml-5"></p></span>
            <span><p id="current" class="ml-5"></p></span>
			<span><p id="previous" class="ml-5"></p></span>
            <span><p id="endp" class="ml-5"></p></span>
        </div>
</body>

</html><!-- <div class="orientation-data">
    <div>Richting: <span id="direction"></span></div>
        <div><span id="tiltFB"></span></div>
        <div> <span id="tiltLR"></span></div>
    </div> -->
    <!-- <div class="way">
        <div class="d-flex justify-content-center">
            <button type="button" class="btn btn-secondary mr-1" type="button" data-toggle="modal" data-target="#mymodal" onclick="modalclk();">Directions</button>
        </div>
    </div> -->

    <!-- <div class="modal fade" id="mymodal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="modal-title">
                    </h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>

                <div class="modal-body" id="data">
                        <div id="demo" class="directions fill-flex" style="padding: 1vh 1vw;"><br/></div>
                </div>

                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div> -->