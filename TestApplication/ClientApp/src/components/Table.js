import React from "react";
import { Table as StrapTable} from 'reactstrap';
import "./Table.css";

const Table = ({people, actions}) => {
    return (
        <StrapTable>
            <thead>
                <tr>
                    <th>User Id</th>
                    <th>Date Registration</th>
                    <th>Date Last Activity</th>
                    { actions && <th className="table__th_actions">Actions</th>}
                </tr>
            </thead>
            <tbody>
            {
                people?.map(item => 
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.registration}</td>
                        <td>{item.lastActivity}</td>
                        {
                            actions &&
                                <td>
                                    {
                                        Object.keys(actions).map(key => actions[key].renderElement(item, key))
                                    }
                                </td>
                        }
                    </tr>
                )
            }
            </tbody>
        </StrapTable>
    )
    
};

export default Table;