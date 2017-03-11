import * as React from 'react';
import { Card, CardMedia, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';

import { APP_NAME } from '../../constants/Variables';
import Cover from '../../components/core/cover/Cover';

import * as Styles from './Login.css';

interface IAppProps { }

interface IAppState { }

class Login extends React.Component<IAppProps, IAppState> {
  render() {
    return (
      <div className='layout-column flex'>
        <Cover title={APP_NAME} subTitle='LINE WITH YOU' />
        <div className='layout-column flex a-center'>
          <Card raised={true} className={Styles.cardLogin}>
            <CardTitle title='ログイン' className='f-center' />
          </Card>
        </div>
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
)(Login);
