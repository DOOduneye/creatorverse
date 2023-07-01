type ContentCreatorProps = {
    id: number;
    name: string;
    description: string;
    image: string;
    social_media: {
        youtube?: string;
        instagram?: string;
        twitter?: string;
    }
}

const SocialMedia = {
    youtube: ['fa-youtube', 'https://www.youtube.com/@'],
    instagram: ['fa-instagram', 'https://www.instagram.com/'],
    twitter: ['fa-twitter', 'https://twitter.com/@'],
}

const ContentCreatorComponent: React.FC<ContentCreatorProps> = ({ id, name, description, image, social_media }) => {
    return (
        <>
            <div className='card' style={{ backgroundImage: `linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(0, 0, 0, 0.987)), url(${image})` }}>
                <span className='creator_title_group'>
                    <h2 className='creator_title'>
                        {name}
                    </h2>

                    <a href={`/creators/${id}`} className='attribute_icon'>
                        <i className='fa-solid fa-circle-info'></i>
                    </a>
                    <a href={`creators/edit/${id}`} className='attribute_icon'>
                        <i className="fa-solid fa-pen"></i>
                    </a>
                </span>
                <span className='brand_group'>
                    {social_media?.youtube && <a href={`${SocialMedia.youtube[1]}${social_media.youtube}`} target="_blank"><i className={`fab ${SocialMedia.youtube[0]} brand_icon`}></i></a>}
                    {social_media?.instagram && <a href={`${SocialMedia.instagram[1]}${social_media.instagram}`} target="_blank"><i className={`fab ${SocialMedia.instagram[0]} brand_icon`}></i></a>}
                    {social_media?.twitter && <a href={`${SocialMedia.twitter[1]}${social_media.twitter}`} target="_blank"><i className={`fab ${SocialMedia.twitter[0]} brand_icon`}></i></a>}
                </span>
                <p className="description">{description}</p>
            </div>
        </>
    );
}

export default ContentCreatorComponent;