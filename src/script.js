import { h, render } from 'preact';

import Daltonizer from './daltonize/Daltonizer';
import Daltonize from './components/Daltonize';

import imageUrl from './colorblind.jpg';

const img = <img src={imageUrl} width="600" />;
render(<div>
    {img}
    <Daltonize>
        {img}
    </Daltonize>
</div>, output);
