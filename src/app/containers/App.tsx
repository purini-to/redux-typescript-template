import * as React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';

interface IAppProps { }

interface IAppState { }

class App extends React.Component<IAppProps, IAppState> {
  render(): JSX.Element {
    return (
      <div className='layout-column flex'>
        {this.props.children}
      </div>
    );
  }
}

function mapStateToProps(state: any): IAppProps {
  return {};
}

function mapDispatchToProps(dispatch: Dispatch<any>) {
  return {
    actions: bindActionCreators({}, dispatch)
  };
}

export default connect<IAppState, {}, IAppProps>(
  mapStateToProps,
  mapDispatchToProps
)(App);
