import { useEffect, useState } from "react";
import supabase from "../client";
import ContentCreator from "../components/ContentCreator";

type ContentCreator = {
    id: number;
    createdAt: string;
    name: string;
    description: string;
    image: string;
    social_media: {
        youtube?: string;
        instagram?: string;
        twitter?: string;
    }
}

const ShowCreators = () => {
    const [creators, setCreators] = useState<ContentCreator[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const getCreators = async () => {
            const { data: creators, error } = await supabase
                .from('creators')
                .select('*')
                .order('id', { ascending: true })

            if (error) throw new Error(error.message);
            else setCreators(creators);
            setLoading(false);
        };

        getCreators();
    }, []);



    return (
        <div className="container">
            {loading ?
                <h1 aria-busy="true" style={{ textAlign: 'center', fontSize: '32px', color: '#646cff', paddingTop: 10 }}>
                    Loading...
                </h1> :
                <div aria-busy="false" className='container creators'>
                    {creators.map((creator) => (
                        <ContentCreator
                            key={creator.id}
                            id={creator.id}
                            name={creator.name}
                            description={creator.description}
                            image={creator.image}
                            social_media={creator.social_media}
                        />
                    ))}
                </div>
            }
        </div>
    )
}

export default ShowCreators;