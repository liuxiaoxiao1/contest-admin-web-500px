import React from 'react';
import {Popover} from 'antd';

import {
    Link,
    NavLink
} from 'react-router-dom'
import './NavUser.less';
import UserAvatar from '../UserAvatar'



class Header extends React.Component {

    constructor(props) {
        super(props);
        const {location} = props;
        this.state = {visible: false}

    }

    componentDidMount() {

    }

    showChange(state) {
        //下面是通过mobx更改数据
         //User.addNum1()
        // this.setState({
        //     visible: true,
        // });
        //下面调整popover的代码 还不太行
        // if(state) {
        //     $('.nav-avatar-pop').addClass('correct-class')
        // }else {
        //     $('.nav-avatar-pop').removeClass('correct-class')
        //
        // }


    }



    render() {
        let me = this;
        const {match, store} = me.props;

        console.log('BBBuserStore', store);

        const content = (
            <div className="profile-content">
                <div className="content-per" onClick={me.props.logout}>退出</div>
            </div>
        );

        return (
            <Popover overlayClassName="nav-avatar-pop" placement="bottom" title={''} content={content}
                     trigger="click" onVisibleChange={this.showChange}>
                <div>
                    <UserAvatar userInfo={store.user} showUserName/>
                </div>


            </Popover>


        );
    }
}


export default Header;
