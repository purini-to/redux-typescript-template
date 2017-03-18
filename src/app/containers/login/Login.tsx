import * as React from 'react';
import { Card, CardMedia, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card';
import ProgressBar from 'react-toolbox/lib/progress_bar';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import * as classnames from 'classnames';

import { APP_NAME } from '../../constants/Variables';
import Cover from '../../components/core/cover/Cover';
import LoginForm from '../../components/login/LoginForm';
import { login } from '../../actions/auth/auth';

import Common from '../../models/core/Common';
import Token from '../../models/account/AccessToken';

import * as Styles from './Login.css';

interface IAppProps {
  common: Common;
  token: Token;
  actions?: any;
}

interface IAppState { }

class Login extends React.Component<IAppProps, IAppState> {
  handleSubmit(form: object) {
    if (!this.props.common.wait) {
      this.props.actions.login(form);
    }
  }

  render(): JSX.Element {
    return (
      <div className='layout-column flex'>
        <Cover title={APP_NAME} subTitle='LINE WITH YOU' />
        <div className={Styles.container}>
          <Card raised={true} className={Styles.cardLogin}>
            <i className={classnames('material-icons', Styles.iconLogin)}>account_circle</i>
            <CardTitle title='ログイン' subtitle='あなたのユーザー情報を入力してください'
              className='layout-column f-center center' />
            <CardText>
              <LoginForm onSubmit={this.handleSubmit.bind(this)}
                wait={this.props.common.wait} errMsg={this.props.common.msg} />
            </CardText>
          </Card>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state: any): IAppProps {
  return {
    common: state.common as Common,
    token: state.auth as Token
  };
}

function mapDispatchToProps(dispatch: Dispatch<any>) {
  return {
    actions: bindActionCreators({
      login
    }, dispatch)
  };
}

export default connect<IAppState, {}, IAppProps>(
  mapStateToProps,
  mapDispatchToProps
)(Login);
