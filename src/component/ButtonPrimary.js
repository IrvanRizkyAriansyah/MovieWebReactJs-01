import React from 'react';
import {Button} from 'antd';

const ButtonTrailer = (props) => {
    return (
        <Button danger type="primary" shape="round" size={'large'}
        	style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}
		> {props.title} </Button> 
    );
};

export default ButtonTrailer;
