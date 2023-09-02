import { useSelector } from 'react-redux';
import titleize from '../../Utils/utils'
import './Profile.css'

const Profile = () => {
    const currentUser = useSelector(state => state.session.user);    
    const healthData = useSelector(state => state.users.healthData)


    return (
        <div>
            <h2 className="header">Hello, {titleize(currentUser.username)}</h2>
            <div className="profile-info">
                <div>Mass: {Math.round(healthData.mass)} kg</div>
                <div>Height: {Math.round(healthData.height)} cm</div>
                <div>Age: {healthData.age}</div>
                <div>Activity Level: {healthData.activityLevel}</div>
                <div>TDEE: {Math.round(healthData.TDEE)}</div>
            </div>
        </div>
    );
}

export default Profile;