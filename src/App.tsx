import '@picocss/pico';
import './App.css';

import { useEffect, useState } from 'react';

import supabase from './client';
import ContentCreatorComponent from './components/ContentCreator';

import type { ContentCreator } from './types';

function App() {
  const [creators, setCreators] = useState<ContentCreator[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getCreators = async () => {
      const { data: creators, error } = await supabase
        .from('creators')
        .select('*')
        .order('id', { ascending: true })
        .limit(5);

      if (error) console.log('error', error);
      else setCreators(creators);
      setLoading(false);
    };

    getCreators();
  }, []);

  return (
    <>
      <div className='main_splash'>
        <h1 id='creatorverse_title'>Creatorverse</h1>

        <div className="view_add_buttons">
          <a href="/creators">
            <button className='splash_button'>
              View All Creators
            </button>
          </a>
          <a href="/add">
            <button className='splash_button'>
              Add Creator
            </button>
          </a>
        </div>
      </div>

      {loading ?
        <h1 aria-busy="true" className='loading'>
          Loading...
        </h1> :
        <div aria-busy="false" className='container creators'>
          {creators.map((creator) => (
            <ContentCreatorComponent
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
    </>
  );
}

export default App
