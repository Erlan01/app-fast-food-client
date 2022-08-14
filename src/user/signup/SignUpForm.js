import React, {Component} from 'react';
import {checkPhone, checkVerificationCode, getDistricts, getRegions, signUp} from "../../util/APIUtils";
import {ACCESS_TOKEN, REFRESH_TOKEN} from "../../constants";

class SignUpForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            phoneNumber: '',
            step: 1,
            verificationCode: '',
            regions: [],
            districts: [],
            districtId: ''
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.sendVerificationCode = this.sendVerificationCode.bind(this);
        this.signUp = this.signUp.bind(this)
    }

    componentDidMount() {
        this.getRegionList()
    }

    getRegionList() {
        getRegions()
            .then(response => {
                this.setState({
                    regions: [...response]
                });
            });
    }

    getDistrictByRegion(v) {
        getDistricts(v)
            .then(response => {
                console.log(response)
                this.setState({
                    districts: [...response]
                });
            });
    }

    handleDistrict(v) {
        this.setState({districtId: v})
    }

    handleInputChange(event) {
        const target = event.target;
        const inputName = target.name;
        const inputValue = target.value;

        this.setState({
            [inputName]: inputValue
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        const signUpRequest = Object.assign({}, this.state);

        checkPhone(signUpRequest)
            .then(response => {
                this.setState({
                    step: 2
                })
            }).catch(error => {
        });
    }

    saveTokensAndRedirectToProfile(resp){
        localStorage.setItem(ACCESS_TOKEN, resp.accessToken)
        localStorage.setItem(REFRESH_TOKEN, resp.refreshToken)
        this.props.history.push("/profile")
    }

    sendVerificationCode(event) {
        event.preventDefault();

        checkVerificationCode({verificationCode: this.state.verificationCode, phoneNumber: this.state.phoneNumber})
            .then(response => {
                if (!response.registered) {
                    this.setState({
                        step: 3
                    })
                } else {
                    this.saveTokensAndRedirectToProfile(response)
                }
            });
    }

    signUp(e) {
        e.preventDefault();
        console.log(this.state)
        signUp(
            {
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                districtId: this.state.districtId,
                language: 'UZ',
                phoneNumber: this.state.phoneNumber,
                verificationCode: this.state.verificationCode
            }
        ).then(r =>
            this.saveTokensAndRedirectToProfile(r)
        )
    }

    render() {
        return (
            <div>
                {this.state.step === 1 ?
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-item">
                            <input type="text" name="phoneNumber"
                                   className="form-control" placeholder="Enter phone number"
                                   value={this.state.phoneNumber} onChange={this.handleInputChange} required/>
                        </div>
                        <div className="form-item">
                            <button type="submit" className="btn btn-block btn-primary">Next</button>
                        </div>
                    </form> : ''
                }
                {this.state.step === 2 ?
                    < form onSubmit={this.sendVerificationCode}>
                        <div className="form-item">
                            <input type="number" name="verificationCode"
                                   className="form-control" placeholder="Enter verification code"
                                   value={this.state.verificationCode} onChange={this.handleInputChange} required/>
                        </div>
                        <div className="form-item">
                            <button type="submit" className="btn btn-block btn-primary">Verify</button>
                        </div>
                    </form> : ''
                }

                {this.state.step === 3 ?
                    < form onSubmit={this.signUp}>

                        <div className="form-item">
                            <input type="text" name="firstName"
                                   className="form-control" placeholder="Enter first name"
                                   value={this.state.firstName} onChange={this.handleInputChange} required/>
                        </div>

                        <div className="form-item">
                            <input type="text" name="lastName"
                                   className="form-control" placeholder="Enter last name"
                                   value={this.state.lastName} onChange={this.handleInputChange}/>
                        </div>

                        <select onChange={event => this.getDistrictByRegion(event.target.value)}
                                className="form-select">
                            <option disabled={true} selected>Select region</option>
                            {this.state.regions.map((r) =>
                                <option key={r.id} value={r.id}>{r.name}</option>
                            )}
                        </select>

                        <select onChange={event => this.handleDistrict(event.target.value)}
                                className="form-select mt-3">
                            <option disabled selected>Select district</option>
                            {this.state.districts.map((d) =>
                                <option key={d.id} value={d.id}>{d.name}</option>
                            )}
                        </select>

                        <div className="mt-3 form-item">
                            <button type="submit" className="btn btn-block btn-primary">Sign Up</button>
                        </div>
                    </form> : ''
                }
            </div>
        );
    }
}

SignUpForm.propTypes = {};

export default SignUpForm;