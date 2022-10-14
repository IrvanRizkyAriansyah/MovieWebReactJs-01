import React from 'react';
import {Button} from 'antd';

const ButtonTrailer = (props) => {
    return (
        <Button danger shape="round" size={'large'} ghost={true}
        	style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '6rem'}}
            onClick={props.click}
		> {props.title} </Button> 
    );
};

export default ButtonTrailer;
