import { useEffect, useState } from "react";
import supabase from "../client";
import { useParams } from "react-router-dom";

const EditCreator = () => {
    const { id } = useParams<{ id: string }>();
    const [name, setName] = useState("");
    const [image, setImage] = useState("");
    const [description, setDescription] = useState("");
    const [socialMedia, setSocialMedia] = useState({
        youtube: "",
        instagram: "",
        twitter: "",
    });
    const [error, setError] = useState("");
    const [modal, setModal] = useState(false);

    useEffect(() => {
        const getCreator = async () => {
            const { data: creatorData, error } = await supabase
                .from('creators')
                .select('*')
                .eq('id', id)
                .single();

            if (error) {
                console.log('error', error);
            } else {
                setName(creatorData.name);
                setImage(creatorData.image);
                setDescription(creatorData.description);
                setSocialMedia({
                    youtube: creatorData.social_media?.youtube || "",
                    instagram: creatorData.social_media?.instagram || "",
                    twitter: creatorData.social_media?.twitter || "",
                });
            }
        };

        getCreator();
    }, [id]);

    const handleSubmit = (e: any) => {
        e.preventDefault();

        if (e.nativeEvent.submitter.value === "submit") {
            if (!name || !image || !description) {
                setError("Please fill in all required fields.");
                return;
            }

            if (!socialMedia.youtube && !socialMedia.instagram && !socialMedia.twitter) {
                setError("Please provide at least one social media link.");
                return;
            }

            setError("");

            const addCreator = async () => {
                const { data: _, error } = await supabase
                    .from("creators")
                    .update({
                        name,
                        image,
                        description,
                        social_media: socialMedia,
                    })
                    .eq('id', id);

                if (error) throw new Error(error.message);
                else window.location.href = "/";
            };

            addCreator();
        } else if (e.nativeEvent.submitter.value === "delete") {
            setModal(true);
        }
    };

    const deleteCreator = async () => {
        const { error } = await supabase
            .from("creators")
            .delete()
            .eq('id', id);

        if (error) throw new Error(error.message);
        else window.location.href = "/";
    }

    return (
        <>
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

                <div className="grid" style={{ display: 'flex' }}>
                    <button type="submit" style={{ height: '40px' }} value="submit">Submit</button>
                    <button type="submit" style={{ height: '40px' }} className="secondary" value="delete">Delete</button>
                </div>
            </form>

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

    );

}

export default EditCreator;