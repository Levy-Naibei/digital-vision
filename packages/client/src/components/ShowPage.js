import React, { useState } from 'react';
import '../assets/css/ShowList.scss';
import '../assets/css/Navbar.scss';
import ShowCardComponent from "./Show";
import { useQuery } from "@apollo/client";
import { GET_ALL_SHOWS, GET_ALL_SHOWS_IN_SCHEDULE } from "../queries/ShowQueries";
import { Input } from "antd";
import jwt from 'jsonwebtoken';
import { useHistory } from "react-router";

const ShowListComponent = () => {
    const history = useHistory();
    const [initialLoad, setInitialLoad] = useState(true);
    const [ searchValue, setSearchValue ] = useState("");
    const [user, setUser] = useState("");
    const currentUser = jwt.decode(localStorage.getItem('token'));

    const { loading, error, data} = useQuery(GET_ALL_SHOWS, {
        variables: { name: searchValue}
    });
    const { loading: fetching, error: err, data: dt } = useQuery(GET_ALL_SHOWS_IN_SCHEDULE, {
        variables: { userEmail: user }, fetchPolicy: "no-cache"
    });

    const onSearchHandler = (value) => {
        setSearchValue(value);
    }

    return (
        <>
        <div className="navbar">
            <span className="navbar-title" onClick={() => setInitialLoad(true)}> TVMaze </span>
            <Input.Search
                className="navbar-search"
                placeholder="Search show by name"
                onSearch={value => onSearchHandler(value)}
                style={{ width: 400, height: 40 }}
            />
            <span
                className="navbar-schedule"
                onClick={() => {
                    setInitialLoad(false);
                    setUser(currentUser.email)
                }}
            >Watch Schedule</span>
            <span className="navbar-logout" onClick={() => {
                localStorage.setItem('token', "");
                history.replace('/');
            }}> Logout </span>
        </div>
        <div className="show-page-main">
            { loading? <div>
               Loading...
            </div>: error ?
                <div> Error...</div>
                : data && initialLoad  ? data.getAllShows.map((show, ind) => {
                   return (
                           <ShowCardComponent key={ind} { ...show } />
                   )
                }): <></>
            }
            {
                fetching ?
                    <></>
                    :
                    err ? <div>Error....</div> : dt && !initialLoad ? dt.getAllShowsInUserSchedule.map((show, ind) => {
                        const showProps = { ...show, schedule: true }
                        return (
                            <ShowCardComponent key={ind} {...showProps }/>
                        )
                    }): <></>
            }
        </div>
        </>
    )
}

const ShowPageComponent = () => {
    return (
        <>
            <ShowListComponent/>
        </>
    )
}

export default ShowPageComponent;
