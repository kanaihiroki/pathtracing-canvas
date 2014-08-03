import {render} from "render";
// var render = require("./render");

function main(args) {
    console.log("main");
	render(640, 480, 16);
}

window.onload = main;
