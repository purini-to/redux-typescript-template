import * as React from 'react';
import { Card, CardMedia, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card';
import ProgressBar from 'react-toolbox/lib/progress_bar';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import * as classnames from 'classnames';

import Common from '../../models/core/Common';
import Token from '../../models/account/AccessToken';

import * as Styles from './Talk.css';

interface IAppProps {
  common: Common;
  actions?: any;
}

interface IAppState { }

class Talk extends React.Component<IAppProps, IAppState> {

  render(): JSX.Element {
    return (
      <div className='layout-column flex'>
        <h1>Talk Component</h1>
      </div>
    );
  }
}

function mapStateToProps(state: any): IAppProps {
  return {
    common: state.common as Common
  };
}

function mapDispatchToProps(dispatch: Dispatch<any>) {
  return {
    actions: bindActionCreators({
    }, dispatch)
  };
}

export default connect<IAppState, {}, IAppProps>(
  mapStateToProps,
  mapDispatchToProps
)(Talk);
