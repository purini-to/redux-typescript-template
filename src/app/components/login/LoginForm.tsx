import * as React from 'react';
import * as classnames from 'classnames';
import { Dispatch } from 'redux';
import { Field, reduxForm, FormProps, FormErrors } from 'redux-form';
import Input from 'react-toolbox/lib/input';
import { Button } from 'react-toolbox/lib/button';
import { themr } from 'react-css-themr';

import * as Styles from './LoginForm.css';

interface IFormFields {
  username?: string;
  password?: string;
}

interface ILoginFormProps extends FormProps<IFormFields, {}, {}> {
  dispatch?: Dispatch<{}>;
  // submitHandler<FormData extends DataShape, P, S>
  // tslint:disable-next-line:max-line-length
  onSubmit: (values: IFormFields, dispatch: Dispatch<{}>, props: ILoginFormProps) => void | FormErrors<FormData> | Promise<any>;
  theme?: any;
  className?: string;
}

interface ILoginFormState { };

class LoginForm extends React.Component<ILoginFormProps, ILoginFormState> {
  renderInput(field: any) {
    const hasError = !!field.meta.error && !!field.meta.touched;

    return (
      <Input
        type={field.type}
        label={field.placeholder}
        error={hasError ? field.meta.error : null}
        className={field.className}
        {...field.input} />
    );
  }

  public render(): JSX.Element {
    const { handleSubmit, onSubmit, invalid, theme } = this.props;
    const className = classnames('layout-column', 'f-center', theme.root, this.props.className);

    return (
      <form className={className} onSubmit={handleSubmit!(onSubmit)}>
        <Field name='username' component={this.renderInput} placeholder='ユーザー名'
          type='text' required className={theme.inputContainer} />
        <Field name='password' component={this.renderInput} placeholder='パスワード'
          type='password' required className={theme.inputContainer} />
        <div className={classnames('layout', 'f-center', theme.actions)}>
          <Button label='ログイン' className='flex' disabled={invalid} raised accent type='submit' />
        </div>
      </form>
    );
  }
}

function validate(values: IFormFields, props: ILoginFormProps): FormErrors<IFormFields> {
  const { username, password } = values;

  const errors: FormErrors<IFormFields> = {};

  if (!username) {
    errors.username = '入力必須項目です';
  }

  if (!password) {
    errors.password = '入力必須項目です';
  }

  return errors;
};


export default themr('ILoginForm', Styles)(reduxForm({
  form: 'LoginForm',
  validate
})(LoginForm));
