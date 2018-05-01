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
                    $.ajax({
                        type: "GET",
                        url:url,
                        dataType: 'json',
                        timeout: 5000,
                    }).done(function( data, textStatus, jqXHR ) {//data van los datos
                        if ( console && console.log ) {
                            console.log( "La solicitud Ajax login se ha completado correctamente.");
                            //document.getElementById("token").innerHTML = data["token"];
                            //document.getElementById("nombre").innerHTML = data["Usuario"];
                            //document.getElementById("nombre").innerHTML = localStorage.setItem("Nom");

                            if (window.localStorage) {
                              localStorage.setItem("token", data["token"]);
                              localStorage.setItem("nombre", data["Usuario"]);
                            }else {
                                console.log("Ha fallado");
                            }
                            window.location.replace("http://localhost:8001/inicio.html");                        
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
                            window.location.replace("http://localhost:8001/index.html");
                        }
                    }).fail(function( jqXHR, textStatus, errorThrown) {
                        if ( console && console.log ) {
                            console.log( "La solicitud a fallado: " +  textStatus);
                            alert("Registro completo!");
                            window.location.replace("http://localhost:8001/index.html");
                        }
                    });
                // avoid to execute the actual submit of the form.
                });
            //logout
            $(".logout").click(function() {
                var tok = localStorage.getItem("token");
                var us = localStorage.getItem("nombre");
                var url = 'http://localhost:8000/api/logout/'+tok+'/'+us;
                $.ajax({
                    type: "GET",
                    url:url,
                    dataType: 'json',
                    timeout: 5000,
                }).done(function( data, textStatus, jqXHR ) {//data van los datos
                    if ( console && console.log ) {
                        console.log(data["mensaje"]);//Bien has salido!
                    }
                }).fail(function( jqXHR, textStatus, errorThrown) {
                    if ( console && console.log ) {
                        console.log( "La solicitud a fallado:" +  textStatus);
                    }
                });

            });  

            //Mostrar todas las partidas
            $(".p").click(function() {
                var x = String($(this).text());
                if(x == "Partida 1"){
                    var partida = "1";
                }else if(x == "Partida 2"){
                    var partida = "2";
                }else if(x == "Partida 3"){
                    var partida = "3";
                }else{
                    var partida = "4";
                }
                var tok = localStorage.getItem("token");
                var us = localStorage.getItem("nombre");
                var url = 'http://localhost:8000/api/partida/add/'+partida+"/"+tok+"/"+us;
                console.log(url);
                $.ajax({
                    type: "GET",
                    url:url,
                    dataType: 'json',
                    timeout: 5000,
                }).done(function( data, textStatus, jqXHR ) {//data van los datos
                    if ( console && console.log ) {
                        if(data["mensaje"] == "7"){
                            alert("Pardida llena");
                        }else if(data["mensaje"] == "2"){
                            window.location.replace("http://localhost:8001/partida.html"); 
                        }else if(data["mensaje"] == "1"){
                            alert("User 1 ya estas jugando a una partida!");
                        }else if(data["mensaje"] == "1.1"){
                            alert("User 2 ya estas jugando a una partida!");
                        }else if(data["mensaje"] == "100" ){
                            alert("Bienvenido a tu partida! Jugador 1");
                            var users = "1";
                            if (window.localStorage) {
                              localStorage.setItem("idUser", users);  
                              localStorage.setItem("idPartida", partida);  
                              localStorage.setItem("enemigo", data["userEnemigo"]);
                              console.log("Entro!");
                              console.log(localStorage.getItem("idPartida"))
                            }else {
                                console.log("Ha fallado");
                            }
                            window.location.replace("http://localhost:8001/partida.html");        
                        }else if(data["mensaje"] == "200"){
                            alert("Bienvenido a tu partida! Jugador 2");
                            var users = "2";
                            if (window.localStorage) {
                              localStorage.setItem("idUser", users);  
                              localStorage.setItem("idPartida", partida);
                              localStorage.setItem("enemigo", data["userEnemigo"]);
                              console.log("Entro!");
                            }else {
                                console.log("Ha fallado");
                            }
                            window.location.replace("http://localhost:8001/partida.html");
                        }
                    }
                }).fail(function( jqXHR, textStatus, errorThrown) {
                    if ( console && console.log ) {
                        console.log( "La solicitud a fallado:" +  textStatus);
                    }
                });
            });
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        //this.receivedEvent('deviceready');
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

function partidas(){
    var url = 'http://localhost:8000/api/partidas';
    $.ajax({
        type: "GET",
        url:url,
        dataType: 'json',
        timeout: 5000,
    }).done(function( data, textStatus, jqXHR ) {//data van los datos
        if ( console && console.log ) {
            document.getElementById("pt1").innerHTML = "Partida: "+data["partida1"]["id"]+" Usuarios conectados: "+data["partida1"]["info"];
            document.getElementById("pt2").innerHTML = "Partida: "+data["partida2"]["id"]+" Usuarios conectados: "+data["partida2"]["info"];
            document.getElementById("pt3").innerHTML = "Partida: "+data["partida3"]["id"]+" Usuarios conectados: "+data["partida3"]["info"];
            document.getElementById("pt4").innerHTML = "Partida: "+data["partida4"]["id"]+" Usuarios conectados: "+data["partida4"]["info"];
        }
    }).fail(function( jqXHR, textStatus, errorThrown) {
        if ( console && console.log ) {
            console.log( "La solicitud a fallado: partidas " +  textStatus);
        }
    });
}