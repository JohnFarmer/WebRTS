package main

import (
	"log"
	"strconv"

	"net/http"
	"./sockserver"
)

var (
	port = 1234
	web_resources_prefix = "./www/"
)

func main() {
	log.Println("Server Running on port:", port);

	http.Handle("/js/",
		http.StripPrefix("/js/",
			http.FileServer(http.Dir(web_resources_prefix + "js"))))
	http.Handle("/css/",
		http.StripPrefix("/css/",
			http.FileServer(http.Dir(web_resources_prefix + "css"))))
	http.Handle("/",
		http.StripPrefix("/",
			http.FileServer(http.Dir(web_resources_prefix))))

	sockserver.Start()
	
	http.ListenAndServe("localhost:" + strconv.Itoa(port), nil)
}
