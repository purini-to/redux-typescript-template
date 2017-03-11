import * as React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import Header from '../components/Header';
import MainSection from '../components/MainSection';
import { addTodo, deleteTodo, editTodo, completeTodo, completeAll, clearCompleted } from '../actions/index';

interface IAppProps { }

interface IAppState { }

class App extends React.Component<IAppProps, IAppState> {
  render() {
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
