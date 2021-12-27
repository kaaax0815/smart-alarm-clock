import { Link } from 'react-router-dom';

function Start(): JSX.Element {
  return (
    <div>
      <h1>List of available Programs</h1>
      <ul>
        <li>
          <Link to="/face">Face</Link>
        </li>
      </ul>
    </div>
  );
}

export default Start;
