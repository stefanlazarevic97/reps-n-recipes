import './SplashPage.css';
import { AiFillGithub, AiFillLinkedin } from 'react-icons/ai';
import stefan from '../../assets/stefan.jpg';
import nico from '../../assets/nico.png';
import elliot from '../../assets/elliot.jpg';
import analytics from '../../assets/analytics.png'
import food from '../../assets/food.png'
import lifting from '../../assets/lifting.png'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const SplashPage = () => {
    const history = useHistory();
    
    const handleClick = () => {
        history.push('/signup');
    }

    return (
        <div className="splash-container">

            <img
                className="parallax-image"
                src={lifting}
                alt='lifting'>
            </img>
            <div className='instructions-container'>
                <h1 className='header'>Record Your Reps</h1>
                <ul className='instructions-list'>
                    <li className="instructions-list-item">
                        <div className="instructions-subheader">Complete a template workout</div>
                        <ol>
                            <li>Select from Reps-N-Recipe templates (left panel) or your personal workout templates (right panel).</li>
                            <li>Click "Start Template."</li>
                            <li>Enter repetitions and weights as you complete sets.</li>
                            <li>Add or remove sets to make it your own!</li>
                            <li>Add or remove entire exercises.</li>
                        </ol>
                    </li>
                    <li className="instructions-list-item">
                        <div className="instructions-subheader">Build an empty workout</div>
                        <ol>
                            <li>Hit "Create New Workout."</li>
                            <li>Add new exercises as you work out:
                                <ul className='instructions-pro-tips'>
                                    <li>You can search for exercises by name.</li>
                                    <li>You can filter exercises by muscle group.</li>
                                    <li>View how to perform a rep with the gifs.</li>
                                </ul>
                            </li>
                            <li>Remove and add sets as you go.</li>
                        </ol>
                    </li>
                    <li className="instructions-list-item">
                        <div className="instructions-subheader">Save your workout as a template</div>
                        <ol>
                            <li>Click "Finish Workout."</li>
                            <li>If you wish to save the workout for later click "Save as Template."</li>
                            <li>Give your workout a title so you can find it later.</li>
                            <li>See the new workout appear in "Your Previous Workouts!"</li>
                            <li>Select it later to re-perform the workout.</li>
                        </ol>
                    </li>
                </ul>
            </div>
            <img
                className="parallax-image"
                src={food}
                alt='food'>
            </img>
            <div className='instructions-container'>
                <h1 className='header'>Navigate Your Nutrition</h1>
                <ul className='instructions-list'>
                    <li className="instructions-list-item">
                        <div className="instructions-subheader">Look Up Your Meal</div>
                        <ol>
                            <li>
                                Using the Spoonacular API, search your meal by ingredient, product, menu item, or recipe.
                            </li>
                            <li>
                                Select the item you're looking for, and input the number of servings.
                            </li>
                        </ol>
                    </li>
                    <li className="instructions-list-item">
                        <div className="instructions-subheader">Visualize Your Daily Nutrition</div>
                        <ol>
                            <li>
                                After inputting your meal, see the calorie total and macro breakdown.
                            </li>
                            <li>
                                Change calendar dates to view your daily nutritional history.
                            </li>
                            <li>
                                Decided to have seconds? Update your servings with a click of a button.
                            </li>
                            <li>
                                Changed your mind? Delete the food from your inputed nutrition.
                            </li>
                        </ol>
                    </li>
                    <li className="instructions-list-item">
                        <div className="instructions-subheader">Generate a Random Meal Plan for the Day!</div>
                        <ol>
                            <li>
                                Filled out our health form? We prefill this generator with by adjusting your total daily energy expenditure, calculated using the <a href="https://reference.medscape.com/calculator/846/mifflin-st-jeor-equation">Mifflin-St Jeor</a> equation, based on your goals.
                            </li>
                            <li>
                                Dietary restrictions? Select one of the diets from the dropdown, or exclude them with the dietary exclusions form.
                            </li>
                            <li>
                                Not a fan? Generate a new meal plan by pressing the button again. Click on the meal to be taken to the recipe page!
                            </li>
                        </ol>
                    </li>
                </ul>
            </div>
            <img
                className="parallax-image"
                src={analytics}
                alt='analytics'>
            </img>
            <div className='instructions-container'>
                <h1 className='header'>Graph Your Growth</h1>
                <ul className='instructions-list'>
                <li className="instructions-list-item">
                        <div className="instructions-subheader">View Your Profile</div>
                        <ol>
                            <li>
                                Your profile is a quick an easy way to view your stats and goals.
                            </li>
                            <li>
                                Getting closer to hitting your weight goal? Update your weight, which automatically updates the graph!
                            </li>
                        </ol>
                    </li>
                    <li className="instructions-list-item">
                        <div className="instructions-subheader">Chart Your Progress</div>
                        <ol>
                            <li>
                                Click on the top right graph button to bring up a dropdown. Select what progress chart you want to see ranging from weight, calories, macros, and exercise history.
                            </li>
                            <li>
                                Used our app for a while? use the dropdown selection on the left to change the time period you're looking at!
                            </li>
                            <li>
                                With a simple switch, view your weight progress in kilograms and pounds.
                            </li>
                        </ol>
                    </li>
                    <li className="instructions-list-item">
                        <div className="instructions-subheader">View Your Exercise Progress</div>
                        <ol>
                            <li>
                                Exercises are a bit more nuanced, so we tailored the chart for you to really see how much you've grown.
                            </li>
                            <li>
                                After selecting the chart, use the dropdown to select the exercise you wish to view. Use our filter to narrow down the exercise!
                            </li>
                            <li>
                                Easily switch between pounds and kilograms as well as the last 30 days or last 3 months of progress.
                            </li>
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
                            href="https://github.com/stefanlazarevic97"
                        >
                            <AiFillGithub className="social-media-icons" />
                        </a>
                        <a 
                            className="social-media-icons"
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
                            href="https://github.com/ncar285"
                        >
                            <AiFillGithub className="social-media-icons" />
                        </a>
                        <a
                            className="social-media-icons"
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
                            href="https://github.com/elliotchang126"
                        >
                            <AiFillGithub className="social-media-icons" />
                        </a>
                        <a
                            className="social-media-icons"
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