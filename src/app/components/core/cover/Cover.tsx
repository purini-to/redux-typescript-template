import * as React from 'react';
import * as classnames from 'classnames';
import { themr } from 'react-css-themr';
import * as Styles from './Cover.css';

interface ICoverProps {
  title: string;
  subTitle?: string;
  className?: string;
  theme?: any;
};

interface ICoverState { };

class Cover extends React.Component<ICoverProps, ICoverState> {
  static propTypes = {
    title: React.PropTypes.string.isRequired,
    subtitle: React.PropTypes.string,
    className: React.PropTypes.string
  };

  render(): JSX.Element {
    const { theme, title, subTitle, ...others } = this.props;
    const className = classnames(theme.root, this.props.className);

    const $subTitle = (subTitle) ? <h3 className={theme.subTitle}>{subTitle}</h3> : null;
    return (
      <div className={className}>
        <div className={theme.container}>
          <h1 className={theme.title}>{title}</h1>
          {$subTitle}
        </div>
      </div>
    );
  }
}

export default themr('ICover', Styles)(Cover);
