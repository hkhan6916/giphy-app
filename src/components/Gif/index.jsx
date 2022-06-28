import React from 'react';

const GifImage = ({ src }) => {
    console.log('rendering');
    return <img alt='gif' src={src} />;
};

export default React.memo(GifImage);
