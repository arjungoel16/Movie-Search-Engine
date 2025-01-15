import { useState } from 'react';
import './LandingPage.css';
import LoginForm from '../../components/LoginForm';

const LandingPage = () => {
  const [showLoginForm, setShowLoginForm] = useState(false);
  // add something to break the endless loop of redirecting the user to the login page -> once user logs in, the user is in an endless loop of being redirected to the login page
        // write a conditional to break the loop -> if user is logged in, redirect user to the components page
        // if (user is logged in) {
        //   return <components />;
        // if (showLoginForm) {
        //   return <LoginForm handleModalClose={() => setShowLoginForm(false)} />;
        // }
        // redirect user to the home page
        // components();

  const handleLoginClick = () => {
    setShowLoginForm(true);
  };

  return (
    <div className="landing-container">
      <h1>MovieMern</h1>
      <h2>Explore the world of Cinema!</h2>
      <p>Welcome to MovieMern, your ultimate movie guide! Dive into a vast library of films from blockbusters to indie gems. Search, rate, and keep track of everything you've watched and loved. Ready to start your cinematic journey? Click below to sign in and get started today.</p>
      <button className="begin-button" onClick={handleLoginClick}>Let's Begin</button>
      {showLoginForm && <LoginForm handleModalClose={function (): void {
        throw new Error('Function not implemented.');
      } } />}
    </div>
  );
}

export default LandingPage;

