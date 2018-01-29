import { h } from 'preact';
import Daltonizer from './daltonize/Daltonizer';

const img = document.querySelector("img");
img.onload = function() {
	const dalton = new Daltonizer();
	document.body.appendChild(dalton.getCanvas());
	dalton.bindSource(img);
	dalton.render();
}
