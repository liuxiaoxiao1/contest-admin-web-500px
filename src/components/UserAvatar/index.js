import React from 'react';
import PropTypes from 'prop-types';
import defaultAvatar from '../../assets/images/default_tx.png';

import './index.less';


class UserAvatar extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    render() {
        let me = this;
        const { showUserName, userInfo } = me.props;

        let avatarUrl = ''
        if(userInfo) {
            avatarUrl = userInfo.avatarUrl ? userInfo.avatarUrl : defaultAvatar
        }

        //TODO: 要判断一下头像的有无，没有的话给出默认头像

        return (
            <div className={`user-avatar-container ${me.props.classStr}`}>
                <a href="javascript:void(0)" className="nav-avatar avatar-small">
                    <img src={avatarUrl} alt=""/>
                    {
                        showUserName && (<span className="nick-name">
                            {userInfo.nickname}
                         </span>)
                    }
                </a>

            </div>

        );
    }
}
UserAvatar.defaultProps = {
    showUserName: true,
    classStr: ''
}
UserAvatar.propTypes = {
    userInfo: PropTypes.object,
    showUserName: PropTypes.bool,  //.isRequired
    classStr: PropTypes.string,
}

export default UserAvatar;
