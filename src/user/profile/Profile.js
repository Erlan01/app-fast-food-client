import React, {Component} from 'react';
import './Profile.css';
import {ACCESS_TOKEN} from "../../constants";

class Profile extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="profile-container">
                <div className="container">
                    <div className="profile-info">
                        <div className="profile-avatar">
                            {
                                this.props.currentUser.imageUrl ? (
                                    <img src={this.props.currentUser.imageUrl} alt={this.props.currentUser.name}/>
                                ) : (
                                    <div className="text-avatar">
                                        <span>{this.props.currentUser.name && this.props.currentUser.name[0]}</span>
                                    </div>
                                )
                            }
                        </div>
                        <div className="profile-name">
                            <h2>{this.props.currentUser.firstName + ' ' + this.props.currentUser.lastName}</h2>
                            <p className="profile-email">{this.props.currentUser.email}</p>
                            <button className={"btn btn-warning"} onClick={() => {navigator.clipboard.writeText(localStorage.getItem(ACCESS_TOKEN))}}>Copy token</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Profile