/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
        //FUnciones sobre el html

            //$(document).ready(function(e) {
                //Login
                $("#submitbutton").click(function() {
                    var email = document.getElementById("email").value;
                    var pass = document.getElementById("pass").value;
                    var url = 'http://localhost:8000/api/login/'+email+'/'+pass; // TO-DO REVISAR.
                    console.log(email);
                    console.log(pass);
                    console.log(url);
                    $.ajax({
                        type: "GET",
                        url:url,
                        dataType: 'json',
                        timeout: 5000,
                    }).done(function( data, textStatus, jqXHR ) {//data van los datos
                        if ( console && console.log ) {
                            console.log( "La solicitud se ha completado correctamente."+data["Usuario"]+"---"+data["token"]);
                            window.location.replace("#page3");
                            document.getElementById("token").innerHTML = data["token"];
                            document.getElementById("nombre").innerHTML = data["Usuario"];
                        }
                    }).fail(function( jqXHR, textStatus, errorThrown) {
                        if ( console && console.log ) {
                            console.log( "La solicitud a fallado: " +  textStatus);
                            window.location.replace("#page1");
                            alert("Datos incorrectos");

                        }
                    });
                // avoid to execute the actual submit of the form.
                });
            //});
            $("#registro").click(function() {
                    console.log("1");
                    var Nname = document.getElementById("NewName").value;
                    var Nemail = document.getElementById("NewEmail").value;
                    var Npass = document.getElementById("NewPassword").value;
                    var url = 'http://localhost:8000/api/registrar/'+Nname+'/'+Nemail+'/'+Npass;
                    $.ajax({
                        type: "GET",
                        url:url,
                        dataType: 'jsonp',
                        timeout: 5000,
                    }).done(function( data, textStatus, jqXHR ) {//data van los datos
                        if ( console && console.log ) {
                            console.log( "La solicitud se ha completado correctamente.");
                            alert("Registro completado!");
                            window.location.replace("#page1")
                        }
                    }).fail(function( jqXHR, textStatus, errorThrown) {
                        if ( console && console.log ) {
                            console.log( "La solicitud a fallado: " +  textStatus);
                            alert("Registro completado!");
                            window.location.replace("#page1")
                        }
                    });
                // avoid to execute the actual submit of the form.
                });

            //Mostrar todas las partidas
            setInterval('livePartidas()','4000');
            function livePartidas()
                {
                var url = 'http://localhost:8000/api/partidas';
                $.ajax({
                    type: "GET",
                    url:url,
                    dataType: 'jsonp',
                    timeout: 5000,
                }).done(function( data, textStatus, jqXHR ) {//data van los datos
                    if ( console && console.log ) {
                        document.getElementById("pt1").innerHTML = data["partida1"][0]+"-"+data["partida1"][1]+"-"+data["partida1"][2]+"-"+data["partida1"][3];
                        document.getElementById("pt2").innerHTML = data["partida2"][0]+"-"+data["partida2"][1]+"-"+data["partida2"][2]+"-"+data["partida2"][3];
                        document.getElementById("pt3").innerHTML = data["partida3"][0]+"-"+data["partida3"][1]+"-"+data["partida3"][2]+"-"+data["partida3"][3];
                        document.getElementById("pt4").innerHTML = data["partida4"][0]+"-"+data["partida4"][1]+"-"+data["partida4"][2]+"-"+data["partida4"][3];
                    }
                }).fail(function( jqXHR, textStatus, errorThrown) {
                    if ( console && console.log ) {
                        console.log( "La solicitud a fallado: partidas " +  textStatus);
                    }
                });
            }
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
        //cuando el hardware este terminado

    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

app.initialize();