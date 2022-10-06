import React from 'react';
import {Button} from 'antd';
import {PlayCircleOutlined} from '@ant-design/icons'

const ButtonTrailer = (props) => {
    return (
        <Button danger shape="round" size={'large'} ghost={true}
        	style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '6rem'}}
		> {props.title} </Button> 
    );
};

export default ButtonTrailer;
