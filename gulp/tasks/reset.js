import { deleteAsync } from 'del';

const reset = (() => deleteAsync(app.path.clean));

export default reset;
