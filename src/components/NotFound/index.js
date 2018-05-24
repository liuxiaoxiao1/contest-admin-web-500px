/**
 * Created by liuxiaoxiao1 on 2018/2/28.
 */
import React from 'react';
import './index.less'



class NotFound extends React.Component {
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                console.log(values);
                this.props.onLogin(values);
                //this.login(values);
            }
        });
    }


    render() {
        let style = {
            textAlign:'center',
            fontSize: '25px',
            color: '#0099e5'
        }
        return (
            <div style={style}>
                No such page
            </div>
        );
    }
}




export default NotFound;
