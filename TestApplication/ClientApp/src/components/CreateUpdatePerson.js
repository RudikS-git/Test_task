import React, {useState, useEffect} from 'react';
import { Button, Form, FormGroup, Label } from 'reactstrap';
import DatePicker from 'reactstrap-date-picker';
import { convertStrDateToDate, toISOStringTracking } from '../utils/dateConverter';
import "./CreateUpdatePerson.css";

const CreateUpdatePerson = ({savePerson, cancel, form}) => {
    
    const [state, setState] = useState({registration: null, lastActivity: null})
    
    useEffect(() => {
        if(form) {
            setState(form);
        }
    }, [form])
    
     return (
         <Form className="cup">
             <h1>{form? "Edit person":"New person"}</h1>
             <FormGroup>
                 <Label>Registration</Label>
                 <DatePicker 
                     value={toISOStringTracking(convertStrDateToDate(state.registration))}
                     maxDate={toISOStringTracking(convertStrDateToDate(state.lastActivity)) || toISOStringTracking(new Date())}
                     dateFormat="DD.MM.YYYY" 
                     onChange={value => setState({...state, registration: (new Date(value)).toLocaleDateString("ru-Ru") }) }
                 />
             </FormGroup>
             
             <FormGroup>
                 <Label>Last Activity</Label>
                 <DatePicker
                     value={toISOStringTracking(convertStrDateToDate(state.lastActivity))}
                     minDate={toISOStringTracking(convertStrDateToDate(state.registration))}
                     maxDate={toISOStringTracking(new Date())}
                     dateFormat="DD.MM.YYYY"
                     onChange={value => setState({...state, lastActivity: (new Date(value)).toLocaleDateString("ru-Ru") }) }
                 />
             </FormGroup>
             
             <div className="cup__btn-group">
                 <Button 
                     className="btn-primary" 
                     onClick={() => savePerson(state)}
                     disabled={!state.registration || !state.lastActivity}
                 >
                     {form? "Update":"Add"}
                 </Button>
                 <Button className="btn-second"  onClick={() => cancel()}>Cancel</Button>
             </div>
         </Form>
     )
}

export default CreateUpdatePerson;