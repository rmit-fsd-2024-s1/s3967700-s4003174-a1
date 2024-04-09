import React from "react";
import { useNavigate } from "react-router-dom";

function MyProfile(props) {
    const navigate = useNavigate();

    const [profile, setProfile] = React.useState({
        username: props.username,
        email: "user@example.com", // Placeholder value
        bio: "This is a bio", // Placeholder value
    });

    // Handler for potentially updating profile info
    const handleProfileUpdate = (updatedProfile) => {
        setProfile(updatedProfile);

    };

    return (
        <div>
            <h1>My Profile</h1>
            <hr />
            <div>
                <label>Username:</label> <span>{profile.username}</span>
            </div>
            <div>
                <label>Email:</label> <span>{profile.email}</span>
            </div>
            <div>
                <label>Bio:</label> <span>{profile.bio}</span>
            </div>
            {/* Example button to navigate to an edit profile page or trigger an inline edit */}
            <button onClick={() => navigate("/edit-profile")}>Edit Profile</button>
        </div>
    );
}

export default MyProfile;
