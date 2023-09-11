import './Team.css'
import { AiFillGithub, AiFillLinkedin } from 'react-icons/ai';
import stefan from '../../assets/stefan.jpg';
import nico from '../../assets/nico.png';
import elliot from '../../assets/elliot.jpg';

const Team = () => {
    return (
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
    )
}

export default Team;