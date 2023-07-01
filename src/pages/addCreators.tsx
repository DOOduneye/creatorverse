import { useState } from 'react';

import supabase from '../client';
import type { ContentCreator } from '../types';

const addCreator = async ({ name, image, description, social_media }: ContentCreator) => {
    const { data: _, error } = await supabase
        .from("creators")
        .insert([
            {
                name,
                image,
                description,
                social_media
            },
        ]);

    if (error) throw new Error(error.message);
    else window.location.href = "/";
};

const AddCreator = () => {
    const [name, setName] = useState("");
    const [image, setImage] = useState("");
    const [description, setDescription] = useState("");
    const [socialMedia, setSocialMedia] = useState({
        youtube: "",
        instagram: "",
        twitter: "",
    });
    const [error, setError] = useState("");

    const handleSubmit = (e: any) => {
        e.preventDefault();

        if (!name || !image || !description) {
            setError("Please fill in all required fields.");
            return;
        }

        if (!socialMedia.youtube && !socialMedia.instagram && !socialMedia.twitter) {
            setError("Please provide at least one social media link.");
            return;
        }

        setError("");

        addCreator({
            name,
            image,
            description,
            social_media: socialMedia,
        } as ContentCreator);
    };

    return (
        <form className="container add_creators" onSubmit={handleSubmit}>
            <label htmlFor="name">
                Name
                <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Name"
                    required
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                />
            </label>

            <label htmlFor="image">
                Image
                <input
                    type="text"
                    id="image"
                    name="image"
                    placeholder="Image"
                    required
                    onChange={(e) => setImage(e.target.value)}
                    value={image}
                />
                <small>Provide a link to an image of your creator. Be sure to include the http://</small>
            </label>


            <label htmlFor="description">
                Description
                <textarea
                    id="description"
                    name="description"
                    placeholder="Description"
                    required
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                    style={{ height: '200px', resize: 'vertical' }}
                />
                <small>Provide a description of the creator. Who are they? What makes them interesting?</small>
            </label>

            <h2>Social Media Links</h2>
            <small>Provide at least one social media link for your creator.</small>

            <label htmlFor="youtube">
                <i className="fab fa-youtube"></i> YouTube
                <input
                    type="text"
                    id="youtube"
                    name="youtube"
                    placeholder="YouTube"
                    onChange={(e) => setSocialMedia({ ...socialMedia, youtube: e.target.value })}
                    value={socialMedia.youtube}
                />
                <small>The creator's YouTube handle (without the @)</small>
            </label>

            <label htmlFor="instagram">
                <i className="fab fa-instagram"></i> Instagram
                <input
                    type="text"
                    id="instagram"
                    name="instagram"
                    placeholder="Instagram"
                    onChange={(e) => setSocialMedia({ ...socialMedia, instagram: e.target.value })}
                    value={socialMedia.instagram}
                />
                <small>The creator's Instagram handle (without the @)</small>
            </label>

            <label htmlFor="twitter">
                <i className="fab fa-twitter"></i> Twitter
                <input
                    type="text"
                    id="twitter"
                    name="twitter"
                    placeholder="Twitter"
                    onChange={(e) => setSocialMedia({ ...socialMedia, twitter: e.target.value })}
                    value={socialMedia.twitter}
                />
                <small>The creator's Twitter handle (without the @)</small>
            </label>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            <button type="submit" style={{ height: '40px' }}>Submit</button>
        </form>
    );
}

export default AddCreator;
