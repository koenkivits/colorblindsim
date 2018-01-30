import { h, render } from 'preact';
import Daltonize from './components/Daltonize';
import imageUrl from './colorblind.jpg';

if (module.hot) {
    require('preact/debug');
}

const img = <img src={imageUrl} width="600" />;
render(<div>
    {img}
    <Daltonize>
        {img}
    </Daltonize>
</div>, output);
