import { FunctionComponent } from 'react';
import { useHistory } from 'react-router-dom';

import CreateUser from '../../components/Manage/Users/Create';

const CreateUserScreen: FunctionComponent = () => {
  const history = useHistory();

  function onMutationCompleted() {
    history.goBack();
  }

  return <CreateUser onMutationCompleted={onMutationCompleted} />;
};

export default CreateUserScreen;
