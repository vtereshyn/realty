import { FunctionComponent } from 'react';
import { useHistory } from 'react-router-dom';

import CreateUser from '../../components/Manage/Users/Create';

import { pathByComponentName } from '../../routes';

const SignupScreen: FunctionComponent = () => {
  const history = useHistory();

  function onMutationCompleted() {
    history.replace(pathByComponentName.LoginScreen);
  }

  return <CreateUser onMutationCompleted={onMutationCompleted} />;
};

export default SignupScreen;
