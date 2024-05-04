'use client';
import { useState } from 'react';
import Markdown from 'markdown-to-jsx';
import { Editor as NovelEditor } from 'novel-lightweight';

export default function Home() {

  const [ data, setData ] = useState( "" );
  const [ saveStatus, setSaveStatus ] = useState( "Saved" );

  return (
    <>

      { data && <Markdown children={ data } /> }

      <div className="relative w-full max-w-screen-lg">

        <div className="top-5 right-5 z-10 absolute bg-stone-100 mb-5 px-2 py-1 rounded-lg text-sm text-stone-400">
          { saveStatus }
        </div>

        <NovelEditor
          onUpdate={ () => {
            setSaveStatus( "Unsaved" );
          } }
          onDebouncedUpdate={ ( editor ) => {
            console.log( 'Editor contenido' );
            console.log( editor?.storage.markdown.getMarkdown() );
            setData( editor?.storage.markdown.getMarkdown() );
            setSaveStatus( "Saving..." );
            // Simulate a delay in saving.
            setTimeout( () => {
              setSaveStatus( "Saved" );
            }, 500 );
          } }
          // eslint-disable-next-line no-unused-vars
          handleImageUpload={ ( file ) => {
            return new Promise( ( resolve ) => {
              setTimeout( () => {
                resolve( `https://offthreadr.com/community-orange.png` );
              }, 2000 );
            } );
          } }
        />

      </div>

    </>
  );
}
