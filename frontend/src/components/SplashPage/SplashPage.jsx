import './SplashPage.css';
import { AiFillGithub, AiFillLinkedin } from 'react-icons/ai';
import stefan from '../../assets/stefan.jpg';
import nico from '../../assets/nico.png';
import elliot from '../../assets/elliot.jpg';
import analytics from '../../assets/analytics.png'
import food from '../../assets/food.jpg'
import lifting from '../../assets/lifting.jpeg'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useSelector } from 'react-redux';

const SplashPage = () => {
    const history = useHistory();
    const loggedIn = useSelector(state => !!state.session.user);
    const handleClick = () => {
        if (loggedIn) history.push('/nutrition');
        else history.push('/signup');
        window.scrollTo(0, 0);
    }

    return (
        <div className="splash-container">

            <div
                className="parallax-image"
                style={{ backgroundImage: `url(${lifting})` }}
                alt='lifting'
            ></div>
            <div className='instructions-container'>
                <h1 className='splash-header'>Record Your Reps</h1>
                <ul className='instructions-list'>
                    <li className="instructions-list-item">
                    <div className="instructions-subheader">Using a Template Workout</div>
                        <ol>
                            <li>Choose a Reps-N-Recipe or personal template.</li>
                            <li>Click "Start", adjust reps, weights, and sets as needed.</li>
                            <li>Modify exercises if desired.</li>
                        </ol>
                    </li>
                    <li className="instructions-list-item">
                    <div className="instructions-subheader">Building a New Workout</div>
                        <ol>
                            <li>Click "Create New Workout".</li>
                            <li>Add exercises, searching by name or filtering by muscle group.</li>
                            <li>Use gifs for rep guidance.</li>
                        </ol>
                    </li>
                    <li className="instructions-list-item">
                    <div className="instructions-subheader">Saving a Workout Template</div>
                        <ol>
                            <li>Finish your workout and click "Finish Workout".</li>
                            <li>To save for later, click "Save as Template" and title it.</li>
                            <li>Find it later in "Your Previous Workouts" for reuse.</li>
                        </ol>
                    </li>
                </ul>
            </div>
            <div
                className="parallax-image"
                style={{ backgroundImage: `url(${food})` }}
                alt='food'
            ></div>
            <div className='instructions-container'>
                <h1 className='splash-header'>Navigate Your Nutrition</h1>
                <ul className='instructions-list'>
                    <li className="instructions-list-item">
                    <div className="instructions-subheader">Look Up Your Meal</div>
                        <ol>
                            <li>Search meals with Spoonacular: ingredient, product, menu item, or recipe.</li>
                            <li>Choose the item and input servings.</li>
                            <li>Instantly see your updated daily nutrition pie chart.</li>
                        </ol>
                    </li>
                    <li className="instructions-list-item">
                    <div className="instructions-subheader">Track Your Daily Nutrition</div>
                        <ol>
                            <li>After adding a meal, view calorie and macro breakdown.</li>
                            <li>Toggle calendar dates to see past nutrition data.</li>
                            <li>Easily adjust servings or delete items as needed.</li>
                        </ol>
                    </li>
                    <li className="instructions-list-item">
                    <div className="instructions-subheader">Get a Random Daily Meal Plan</div>
                        <ol>
                            <li>Our suggestions are based on the <a href="https://reference.medscape.com/calculator/846/mifflin-st-jeor-equation">Mifflin-St Jeor</a> equation.</li>
                            <li>Specify your dietary preferences or exclusions.</li>
                            <li>Click to regenerate plans and access linked recipes.</li>
                        </ol>
                    </li>
                </ul>
            </div>
            <div
                className="parallax-image"
                style={{ backgroundImage: `url(${analytics})` }}
                alt='analytics'
            ></div>
            <div className='instructions-container'>
                <h1 className='splash-header'>Graph Your Growth</h1>
                <ul className='instructions-list'>
                <li className="instructions-list-item">
                <div className="instructions-subheader">View Your Profile</div>
                    <ol>
                        <li>Quickly glance at your stats and goals on your profile.</li>
                        <li>Update health data and set goals via the top-right health form.</li>
                        <li>Modify your weight and auto-refresh the progress graph.</li>
                    </ol>
                </li>
                <li className="instructions-list-item">
                    <div className="instructions-subheader">Chart Your Progress</div>
                    <ol>
                        <li>Use the top-right button for various progress charts: weight, calories, macronutrients, or <a href="https://www.nfpt.com/blog/calculating-a-clients-1rm#:~:text=This%20formula%20states%20that%20an,performed%20for%20the%20given%20exercise.">estimated 1-rep-max</a>.</li>
                        <li>Adjust the time period of data with the left dropdown menu.</li>
                        <li>Toggle between kilograms and pounds for weight data.</li>
                    </ol>
                </li>
                <li className="instructions-list-item">
                    <div className="instructions-subheader">Track Exercise Growth</div>
                    <ol>
                        <li>Custom charts showcase your detailed exercise progression.</li>
                        <li>Select a specific exercise from the dropdown; use filters to refine.</li>
                        <li>Switch between pounds/kilograms and view up to 3 months of progress.</li>
                    </ol>
                </li>
                </ul>
            </div>
            <div className="team-members-container">
                <div className="team-member">
                    <img 
                        className="team-member-image"
                        src={stefan} 
                        alt="stefan">
                    </img>
                    <h2 className="header">Stefan Lazarevic</h2>
                    <div className="social-media-container">
                        <a
                            className="social-media-icons"
                            target="_blank"
                            href="https://github.com/stefanlazarevic97"
                        >
                            <AiFillGithub className="social-media-icons" />
                        </a>
                        <a 
                            className="social-media-icons"
                            target="_blank"
                            href="https://www.linkedin.com/in/stefan-lazarevic-a5b60413a/"
                        >
                            <AiFillLinkedin className="social-media-icons" />
                        </a>
                    </div>
                </div>
                <div className="team-member">
                    <img 
                        className="team-member-image"
                        src={nico} 
                        alt="nico">
                    </img>
                    <h2 className="header">Nico Carlier</h2>
                    <div className="social-media-container">    
                        <a
                            className="social-media-icons"
                            target="_blank"
                            href="https://github.com/ncar285"
                        >
                            <AiFillGithub className="social-media-icons" />
                        </a>
                        <a
                            className="social-media-icons"
                            target="_blank"
                            href="https://www.linkedin.com/in/nicholas-carlier-ba8473193/"
                        >
                            <AiFillLinkedin className="social-media-icons" />
                        </a>
                    </div>
                </div>
                <div className="team-member">
                    <img
                        className="team-member-image"
                        src={elliot}
                        alt="elliot">    
                    </img>
                    <h2 className="header">Elliot Chang</h2>
                    <div className="social-media-container">    
                        <a
                            className="social-media-icons"
                            target="_blank"
                            href="https://github.com/elliotchang126"
                        >
                            <AiFillGithub className="social-media-icons" />
                        </a>
                        <a
                            className="social-media-icons"
                            target="_blank"
                            href="https://www.linkedin.com/in/elliotchang126/"
                        >
                            <AiFillLinkedin className="social-media-icons" />
                        </a>
                    </div>
                </div>
            </div>
            <div className="splash-button-container">
                <button 
                    className="splash-button"
                    onClick={handleClick}
                >
                    Start your journey!
                </button>
            </div>
        </div>
    )
}

export default SplashPage;  