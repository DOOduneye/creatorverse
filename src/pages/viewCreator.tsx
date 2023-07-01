import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import supabase from '../client';

import type { ContentCreator } from "../types";

const SocialMedia = {
    youtube: ['fa-youtube', 'https://www.youtube.com/@'],
    instagram: ['fa-instagram', 'https://www.instagram.com/'],
    twitter: ['fa-twitter', 'https://twitter.com/@'],
}

const ViewCreator = () => {
    const { id } = useParams<{ id: string }>();
    const [creator, setCreator] = useState<ContentCreator>({} as ContentCreator);
    const [modal, setModal] = useState(false);

    useEffect(() => {
        const getCreator = async () => {
            const { data: creator, error } = await supabase
                .from('creators')
                .select('*')
                .eq('id', id)
                .single();

            if (error) throw new Error(error.message);
            else setCreator(creator);
        };

        getCreator();
    }, [id]);

    const verifyDelete = () => {
        setModal(true);
    };

    const deleteCreator = async () => {
        const { data: _, error } = await supabase
            .from('creators')
            .delete()
            .eq('id', id);

        if (error) throw new Error(error.message);
        else window.location.href = '/';
    };


    return (
        <>
            <div className='container'>
                <div className="view">
                    <img src={creator.image} alt={creator.name} className="creator_image" />

                    <div className="creator_content">
                        <h1>{creator.name}</h1>
                        <p>{creator.description}</p>
                        <div className='social_media'>
                            {creator.social_media?.youtube && (
                                <a href={`${SocialMedia.youtube[1]}${creator.social_media.youtube}`} target="_blank" rel="noreferrer">
                                    <i className={`fab ${SocialMedia.youtube[0]}`}></i> {creator.social_media.youtube}
                                </a>

                            )}
                            {creator.social_media?.instagram && (
                                <a href={`${SocialMedia.instagram[1]}${creator.social_media.instagram}`} target="_blank" rel="noreferrer">
                                    <i className={`fab ${SocialMedia.instagram[0]}`}></i> {creator.social_media.instagram}
                                </a>
                            )}
                            {creator.social_media?.twitter && (
                                <a href={`${SocialMedia.twitter[1]}${creator.social_media.twitter}`} target="_blank" rel="noreferrer">
                                    <i className={`fab ${SocialMedia.twitter[0]}`}></i> {creator.social_media.twitter}
                                </a>
                            )}
                        </div>
                    </div>
                </div>

                <div className="creator_buttons">
                    <button style={{ marginTop: "1rem" }} onClick={() => window.location.href = `/creators/edit/${id}`}>Edit</button>
                    <button className='secondary' style={{ marginTop: "1rem" }} onClick={verifyDelete}>Delete</button>
                </div>
            </div>

            {modal && (
                <div className="modal" id="deleteModal">
                    <div className="modal-overlay"></div>
                    <div className="modal-content">
                        <h2>Confirmation</h2>
                        <p>Are you sure you want to delete this creator?</p>
                        <div className="modal-actions">
                            <button id="cancelButton" className="button" onClick={() => setModal(false)}>Cancel</button>
                            <button id="confirmButton" className="button danger" onClick={deleteCreator}>Confirm</button>
                        </div>
                    </div>
                </div>
            )}
        </>

    )
}

export default ViewCreator