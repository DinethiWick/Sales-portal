import LoginComponent from "./screens/Login";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Root(props) {
  return (
    <div>
      <ToastContainer/>
      <LoginComponent/>
    </div>
  );
}
