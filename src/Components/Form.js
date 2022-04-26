import React, { Component } from 'react';

class Form extends Component {

    constructor(props){
        super(props)

        this.state = {

            formData : [],
            formItems : [
                {
                    type: "text",
                    required: true,
                    field: "first_name",
                    label : "First Name",
                    minimum : 1,
                    dataType : 'string',
                    value : ''

                },

                {
                    type: "text",
                    required: true,
                    field: "last_name",
                    label : "Last Name",
                    minimum : 1,
                    dataType : 'string',
                    value : ''


                },
                {
                    type: "number",
                    required: true,
                    field: "age",
                    label : "Age",
                    dataType : 'number',
                    value : 18,


                },
                {
                    type: "email",
                    required: true,
                    field: "email",
                    label : "Email",
                    dataType : 'string',
                    value : ""


                },
                {
                    type: "phone",
                    required: true,
                    field: "phone",
                    minimum : 10,
                    maximum : 10,
                    label : "Phone",
                    dataType : 'string',
                    value : ''


                },
            ],

            errors :{
                first_name : false,
                last_name : false,
                age : false,
                email : false,
                phone : false,
            },

            formError : true,
            formSubmitStatus : false,
        }
    }

    handler = (key, event) => {
      const inputAttributes = this.state.formItems[key];
      const value = event.target.value;

    };



    inputChangedHandler = (key, event) => {

        this.setState(prevState => {
            let formItems = Object.assign({}, prevState.formItems);  
            formItems[key].value = event.target.value;                                      
            return { formItems };                                 
          })
        
    }

    //change state function changes the state value of errors of individual fields

    changeState = (value,status) => {
        this.setState(prevState => {
            let errors = Object.assign({}, prevState.errors);  
            errors[value.field] = status;                                      
            return { errors };                                 
            })
    }


        validateForm = () => {
            

            for (const [key, value] of Object.entries(this.state.formItems)) {
                
                if(value.value == ''){

                    this.setState({formError : true})
                    this.changeState(value, true)
                    
                }else{
            
                    if(value.type === "text"){
                        if(typeof value.value !== "string"){
                        
                            
                            this.setState({formError : true})
                
                        }else{
                        
                            this.changeState(value, false)
                            this.setState({formError : false})

                        }
                      }else if(value.type === "email"){
                
                        var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
                        if(!value.value.match(mailformat)){
                        
                            
                            this.setState({formError : true})
                            
                        }else{
                            this.changeState(value, false)

                            this.setState({formError : false})

                        }
                
                      }
                      else if(value.type === "phone"){

                        if((value.value.length != value.minimum) || (value.value.length != value.maximum)){
                        
                            this.changeState(value, true)

                            this.setState({formError : true})
                            
                        }else{
                            this.changeState(value, false)
 
                            this.setState({formError : false})

                        }
                
                      }
                      else if(value.type === "number"){
                
                        if(typeof parseInt(value.value) !== "number"){
                            
                            
                            this.setState({formError : true})
                
                        }else{
                            this.changeState(value, false)

                            this.setState({formError : false})

                        }
                
                      }
                      else{
                        this.setState({formError : false})

                      }
            
                  }

            }
    }

    handleSubmit(event) {

        event.preventDefault();

        //form validation below
        this.validateForm()

        // Once the form is validated and doesn't have any error. the form data is stored in another state variable or you can call
        // an API end point.
        if(this.state.formError){

            this.setState({ 
                formData: [...this.state.formData, this.state.formItems] 
           })

           this.setState({formSubmitStatus : true})
        }

      }

    render() {

        
        return (
            <form onSubmit={this.handleSubmit.bind(this)} className="form"> 
              {Object.entries(this.state.formItems).map(([key, value]) => (

                    <div class="form-group">
                        <input key={key} type={`${value.type}`} 
                            name={`${value.field}`} defaultValue={`${value.value}`} 
                            is_required={`${value.required}`} 
                            onBlur={this.handler.bind(this,key)} 
                            onChange={this.inputChangedHandler.bind(this, key)}/>
                        <label for="input" className="control-label">{`${value.label}`}</label><i class="bar"></i>
                        {this.state.errors[value.field] ? (
                             <p className = "text-danger">Field Must be properly filled.</p>
                         ) : <p></p>}
                    </div>
                    
                ))}
                <div>
                {this.state.formError ? (
                             <p></p>
                         ) : <p>Form Submitted Succesfully.</p>}
                </div>
                <div>

                    <input type = "submit" value = "Submit"/>
                    <input type = "button" value="Reset" />

                </div>
            </form>
          );
      }
}

export default Form;
