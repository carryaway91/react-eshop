import React, { Component } from 'react';
import Input from '../UI/Input/Input'
import styles from './ContactInfo.module.css'
import Button from '../UI/Button/Button'
import * as actionCreators from '../../store/actions/index'
import {connect} from 'react-redux'
class ContactInfo extends Component {
    state = {
        contactForm: {
            name: {
                inputType: 'input',
                inputAttrs: {
                    type: 'text',
                    placeholder: 'Enter your name'
                },
                value: '',
                validationRules: {
                    required: true
                },
                isValid: false,
                error: false
            },
            address: {
                inputType: 'input',
                inputAttrs: {
                    type: 'text',
                    placeholder: 'Enter your address'
                },
                value: '',
                validationRules: {
                    required: true
                },
                isValid: false,
                error: false
            },
            city: {
                inputType: 'input',
                inputAttrs: {
                    type: 'text',
                    placeholder: 'City'
                },
                value: '',
                validationRules: {
                    required: true
                },
                isValid: false,
                error: false
            },
            postal: {
                inputType: 'input',
                inputAttrs: {
                    type: 'text',
                    placeholder: 'Postal code'
                },
                value: '',
                validationRules: {
                    required: true
                },
                isValid: false,
                error: false
            },
            country: {
                inputType: 'input',
                inputAttrs: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validationRules: {
                    required: true
                },
                isValid: false,
                error: false
            }
        },
        formActive: true,
        validForm: false
    }

    checkValidation = (value, rules) => {
        let valid = true
        if(rules.required) {
            valid = value.trim() != ''
        }
        return valid
    }

    handleInput = (e, inputType) => {
        const copiedContactForm = { ...this.state.contactForm}
        const copyInput = { ...copiedContactForm[inputType] }

        copyInput.isValid = this.checkValidation(e.target.value, copyInput.validationRules)
        copyInput.value = e.target.value
        copiedContactForm[inputType] = copyInput
        this.setState({
            contactForm: copiedContactForm
        })
    }

    submitContactData = (e) => {
        e.preventDefault()
        const copiedContactForm = { ...this.state.contactForm }
        /** prejdem vsetkymi inputmi */
            for(let key in copiedContactForm) {
                /** ak su ich value prazdne nastavime im error, a celemu formu ze je invalid */
                if(!copiedContactForm[key].isValid) {
                    copiedContactForm[key].error = true
                } else {
                    copiedContactForm[key].error = false
                }
            }
           
            this.setState({ 
                ...this.state,
                contactForm: copiedContactForm
            })

            this.checkFormValidity()
    }
    
    checkFormValidity = () => {
        let validValues = []
        
        for(let key in this.state.contactForm) {
            validValues.push(this.state.contactForm[key].isValid)
        }
        
        let checkValidity = validValues.every(v => v === true)
        
        if(checkValidity) {
            this.addContactInfo()
            this.setState({ formActive: false, validForm: true })
        } else {
            this.setState({ validForm: false})
        }

    
    }

    addContactInfo = () => {
        const userInfo = {
            name: this.state.contactForm.name.value,
            address: this.state.contactForm.address.value
        }   
        this.props.addContactInfo(userInfo)
        }
    
    render() {
        let formArray = [] 

        for(let key in this.state.contactForm) {
            formArray.push({
                id: key,
                config: this.state.contactForm[key]
            })
        }
        let form = null
        if(this.state.formActive) {
            form = formArray.map(element => (
                <Input 
                    key={element.id}
                    label={element.id}
                    elementType={element.config.inputType}
                    elementAttrs={element.config.inputAttrs}
                    value={element.config.value}
                    changed={(e) => this.handleInput(e, element.id)}
                    error={element.config.error}
                    isValid={element.config.isValid}
                />
            ))
        } else {
            form = (
            <p>Name: { this.state.contactForm.name.value }</p>
            )
        }

        let contactSheet = (
            <div className={styles.ContactSheet}>
                <strong>{ this.state.contactForm.name.value }</strong>
                <p>{ this.state.contactForm.address.value }</p>
                <p>{` ${this.state.contactForm.city.value}, ${this.state.contactForm.postal.value}, ${this.state.contactForm.country.value} `}</p>
                <Button clicked={() => this.setState(p =>{ return { formActive: !p.formActive}})}>Edit</Button>
            </div>
        )
        return (
            <div className={styles.Contact}>
                <h2 className={styles.ContactHeader}>Contact</h2>
                { this.state.formActive ? (
                <form style={{ marginRight: '2rem'}} onSubmit={(e) => this.submitContactData(e)}>
                    { form }
                    <Button>Confirm</Button>
                </form>
                ) :  contactSheet 
                }
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addContactInfo: (info) => dispatch(actionCreators.addUserInfo(info))
    }
}

export default connect(null, mapDispatchToProps)(ContactInfo);
