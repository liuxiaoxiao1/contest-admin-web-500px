import React, { Component } from 'react';

export default function asyncComponent(importComponent) {
  class AsyncComponent extends Component {
    constructor(props) {
      super(props);

      this.state = {
        component: null,
      };
    }

    componentDidMount() {
      //const { default: component } = await importComponent();

        // importComponent().then((component) => {
        //     this.setState({
        //         component,
        //     });
        // });
        let me = this;
        importComponent().then((com) => {
          const { default: component } = com;
          /* eslint-disable react/no-did-mount-set-state */
            me.setState({
                component,
            });
        });
      /* eslint-disable react/no-did-mount-set-state */
      // this.setState({
      //   component,
      // });
    }

    render() {
      const C = this.state.component;
      return C ? <C {...this.props} /> : null;
    }
  }

  return AsyncComponent;
}
