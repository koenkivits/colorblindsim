import { h, Component } from 'preact';

import Daltonizer from '../daltonize/Daltonizer';

export default class Daltonize extends Component {
    constructor(props) {
        super(props);

        //this.canvas = document.createElement('canvas');
		this.daltonizer = new Daltonizer();
	}

	componentDidMount() {
		const daltonizer = this.daltonizer;
		requestAnimationFrame(function frame() {
			daltonizer.render();
			requestAnimationFrame(frame);
		});
	}

	initOriginal(parentNode) {
		const original = parentNode.children[0];
		original.onload = () => {
			this.daltonizer.bindSource(original);
		};
	}

	initCanvas(parentNode) {
		parentNode.appendChild(this.daltonizer.getCanvas());
	}

	render({ children }) {
		return <div>
			<div ref={(div) => this.initOriginal(div)} style={{display: 'none'}}>{ children }</div>
			<div ref={(div) => this.initCanvas(div)}></div>
		</div>;
	}
}
