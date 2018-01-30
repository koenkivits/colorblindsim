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

        const canvas = this.daltonizer.getCanvas();
        canvas.style.height = '100%';
        canvas.style.width = '100%';
        canvas.style.position = 'absolute';
        canvas.style.top = '0';
        canvas.style.left = '0';
        parentNode.appendChild(this.daltonizer.getCanvas());
    }

    initCanvas(parentNode) {
    }

    render({ children }) {
        return <div>
            <div ref={(div) => this.initOriginal(div)} style={{display: 'inline-block', position: 'relative'}}>
                { children }
            </div>
            <div ref={(div) => this.initCanvas(div)}></div>
        </div>;
    }
}
