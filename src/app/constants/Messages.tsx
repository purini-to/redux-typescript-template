import * as types from './ActionTypes';

export default {
  [types.UNAUTHORIZED]: 'ユーザー名またはパスワードに誤りがあります',
  [types.THROW_ERROR]: 'システムエラーが発生しました\n管理者にお問い合わせ下さい'
};
