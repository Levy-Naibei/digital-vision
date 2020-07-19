import React, {useEffect, useState} from "react";
import {Card, Avatar, notification, Modal, Tag } from 'antd';
import Truncate from "react-truncate";
import { FolderAddOutlined, HeartOutlined, HeartFilled, CommentOutlined  } from '@ant-design/icons';
import '../assets/css/Show.scss';
import { useMutation } from "@apollo/client";
import {ADD_TV_SHOW_TO_SCHEDULE, FAVORITE_SHOW} from "../queries/ShowMutations";
import jwt from 'jsonwebtoken';
import {GET_ALL_SHOWS_IN_SCHEDULE} from "../queries/ShowQueries";

const { Meta } = Card;

/**
 * this component is responsible for listing all our shows
 * @param props
 * @returns {*}
 * @constructor
 */
const ShowCardComponent = (props) => {
    const [heartIcon, setHeartIcon ] = useState(false);
    const [displayModal, setShowModal ] = useState(false);
    const [displayHeart, setDisplayHeart]  = useState(false);
    const [AddTvShowToSchedule] = useMutation(ADD_TV_SHOW_TO_SCHEDULE);
    const [favoriteShow, { data: favoriteShowData }] = useMutation(FAVORITE_SHOW);

    const useMountEffect = (fn) => useEffect(fn, []);

    useEffect(() => {
        if(heartIcon) {
            showAddedToFavorites()
        }
    });

    useMountEffect(() => {
        if(props.favorite) {
            setDisplayHeart(true);
        }
    })


    const showModal= (value) => {
        setShowModal(value);
    };

    const showAddScheduleNotification = () => {
        notification['info']({
            message: 'Added To Show Schedule',
            description:
                'This show was successfully added to your watch schedule',
        });
    };

    const toggleHeartIcon = () => {
        setHeartIcon(!heartIcon);
    };

     function showAddedToFavorites() {
        favoriteShow({ variables: { id: props._id }, refetchQueries: [{
            query: GET_ALL_SHOWS_IN_SCHEDULE
            }]});
        if(favoriteShowData) {
            notification['info']({
                message: 'Added To Favorites',
                description: 'This show was successfully added to your favorite shows',
            });
        }
     }

    return (
        <>
        <Card
            style={{ width: 300 }}
            hoverable={true}
            className="show-card"
            cover={
                <div className="show-card-img" onClick={() => {
                    showModal(true);
                }}>
                    <img
                        alt="logo"
                        src={props?.image?.medium ?? props.image ?? 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png' }
                    />
                </div>
            }
            actions={[
                <span onClick={
                    () => {
                        AddTvShowToSchedule({ variables: {
                                userEmail: jwt.decode(localStorage.getItem('token')).email,
                                name: props.name,
                                url: props.url,
                                summary: props.summary,
                                image: props.image.medium,
                                premiered: props.premiered
                            }}).then(() => {
                            showAddScheduleNotification()
                        });
                    }}><FolderAddOutlined key="Add To Schedule"/></span>,
                props.schedule ? <span onClick={() => {
                    toggleHeartIcon();
                }}> {
                    heartIcon || displayHeart ? <HeartFilled key="setting"/>: <HeartOutlined key="setting" />
                } </span>: <></>,
                <span onClick={() => {
                    notification['info']({
                        message: 'Comments Feature',
                        description: 'Comments coming soon!',
                    });
                }}> <CommentOutlined key="comment" />,</span>
            ]}
        >
            <Meta
                avatar={<Avatar src={props?.image?.medium ?? props.image ?? 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png' } />}
                title={props.name}
                description={<Truncate lines={2} ellipsis={<span> ... </span>}>
                    <div dangerouslySetInnerHTML={{__html: props.summary}}/>
                </Truncate>}
            />
        </Card>
            {
                displayModal ? <Modal
                    title="Movie Details"
                    visible={displayModal}
                    onCancel={() => setShowModal(false)}
                    onOk={() => setShowModal(false)}
                >
                    <p> { props.name }</p>
                    <img src={props.image?.medium ?? props.image ?? 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png' } alt="joke"/>
                    { props.genres ?  <p> { props.genres.map((genre) => <Tag> { genre }</Tag>)  }</p>: <></>}
                    <p> { props.url }</p>
                </Modal>: <></>
            }
            </>
    )
}

export default ShowCardComponent;
