import React from 'react';
import Spinner from 'react-native-loading-spinner-overlay';

import { appColor } from '../../Constants';

const Loading = (props) => {
    const { isLoading } = props;
    return (
        <Spinner
            visible={isLoading}
            textContent="Loading..."
            textStyle={{ color: appColor }}
        />
    );
};

export default Loading;
