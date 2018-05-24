import React from 'react';
import './Layout.less';
import '../common.less'
import Header from '../Header';
import Footer from '../Footer';

class Layout extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { navSwitcher } = this.props;
      console.log('props2', this.props)
    // console.log('---navSwitcher', navSwitcher);
    return (
      <div className={navSwitcher ? 'content_wrapper show_left_menu' : 'content_wrapper'}>
        <Header {...this.props}/>
        {this.props.children}
        <Footer />
      </div>
    );
  }
}



export default Layout;
