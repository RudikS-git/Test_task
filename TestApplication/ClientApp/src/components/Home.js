import React, { useState, useEffect } from 'react';
import { Alert, Button } from 'reactstrap';
import { NotificationManager } from 'react-notifications';

import Table from "./Table";
import CreateUpdatePerson from "./CreateUpdatePerson";
import EditIcon from "../svg/EditIcon";
import DeleteIcon from "../svg/DeleteIcon";
import ChartBar from "./ChartBar";
import {doRequest} from "../utils/doRequest";

import "./Home.css";

const Home = () => {

    const [state, setState] = useState({isLoading: true, people: [], errorMessage: null});
    const [rollingRetention, setRollingRetention] = useState(null);
    const [peopleLifeTime, setPeopleLifeTime] = useState([]);
    const [form, setForm] = useState({ isOpen: false, data: null });
    
    useEffect(() => {

        const getPeople = async () => {
            const {data, success, error} = await doRequest(
                () => fetch("api/person/")
            );

            if(success) {
                setState({...state, people: data, isLoading: false });
            }
            else {
                setState({ ...state, errorMessage: error, isLoading: false });
            }
        }
        
        getPeople();
    }, [])
    
    const savePeople = async (people) => {
        const {data, success, error} = await doRequest(
            () => fetch("api/person/", {
                method: "put",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(people)
            })
        );

        if(success) {
            state.people = data;
            setState({...state});
            NotificationManager.success("People have been saved");
        }
        else {
            setState({ ...state, errorMessage: error, isLoading: false });
        }
    }
    
    const calculatePeople = async () => {
        const {data, success, error} = await doRequest(
            () => fetch("api/person/CalculateRolling")
        );

        if(success) {
            setRollingRetention(data.toFixed(2));
        }
        else {
            setState({ ...state, errorMessage: error, isLoading: false });
        }
    }
    
    const calculatePeopleLifeTime = async () => {
        const {data, success, error} = await doRequest(
            () => fetch("api/person/CalculatePeopleLifeTime")
        );

        if(success) {
            setPeopleLifeTime(data);
        }
        else {
            setState({ ...state, errorMessage: error, isLoading: false });
        }
    }
    
    const calculateHandler = async () => {
        await calculatePeople();
        await calculatePeopleLifeTime();
        NotificationManager.success("Calculation completed");
    }
    
    const deletePerson = async (id) => {
        const {data, success, error} = await doRequest(
            () => fetch(`api/person/${id}`, {method: "delete"})
        );

        if(success) {
            state.people = state.people.filter(it => it.id != id);
            setState({...state});
            NotificationManager.success("Person has been removed");
        }
        else {
            setState({ ...state, errorMessage: error, isLoading: false });
        }
    }
    
    const editPerson = (person) => {
        const index = state.people.findIndex(item => item.id == person.id);
        
        if(index != null) { // index can be 0
            state.people[index] = person;
            setState({...state});
            cancelForm();
            NotificationManager.success("Person has been edited");
        }
    }
    
    const addPerson = (person) => {
        state.people.push(person);
        setState({...state });
        cancelForm();
        NotificationManager.success("Person has been added");
    }
    
    const cancelForm = () => {
        setForm({isOpen: false});
    }

    const actions = {
        "edit": {
            renderElement: (item, key) => {
                return (
                    <Button key={key} onClick={() => setForm({isOpen: true, data: item})} color="link">
                        <EditIcon />
                    </Button>
                )
            }
        },
        "delete": {
            renderElement: (item, key) => {
                return (
                    <Button key={key} onClick={() => deletePerson(item.id)} color="link">
                        <DeleteIcon />
                    </Button>

                )
            }
        }
    };
    
    if(state.isLoading) {
        return (
            <Alert color="primary">
                Loading...
            </Alert>
        )
    }

    if(form.isOpen) {
        return <CreateUpdatePerson 
                    form={form.data} 
                    cancel={cancelForm} 
                    savePerson={form.data? editPerson:addPerson}
                />;
    }
    
    return (
      <div className="main">
          <h1 className="main__header">People</h1>
        <Table people={state.people} actions={actions}/>
          <div className="main__btn-group">
              <Button className="btn-primary" onClick={() => setForm({isOpen: true})} disabled={state.isLoading}>Add new person</Button>
              <Button className="btn-primary" onClick={() => savePeople(state.people)} disabled={state.isLoading}>Save</Button>
          </div>
          
        <div className="main__calculations">
            { rollingRetention != null && 
                <div>Rolling Retention 7 day:
                    <strong> {rollingRetention}%</strong>
                </div>
            }
            { peopleLifeTime && <ChartBar peopleLifeTime={peopleLifeTime}/> }
        </div>

          <div className="main__btn-group">
              <Button className="btn-second" color="secondary" onClick={calculateHandler} disabled={state.isLoading}>Calculate</Button>
          </div>
      </div>
    );
};

export default Home;
