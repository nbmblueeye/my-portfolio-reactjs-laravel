import React, { useEffect, useRef } from 'react';

const MyCKEditor = ({description, setDescription, mode }) => {

    const product_descriptionRef = useRef();
    const ckEditorRef = useRef(true);
  
    useEffect(() => {
        
        if(ckEditorRef.current){
          ClassicEditor
          .create( product_descriptionRef.current, {
              ckfinder:{
                uploadUrl: `${import.meta.env.VITE_API_BASE_URL}/api/ckeditor/upload`
              },
              image: {
                resizeOptions: [
                    {
                        name: 'resizeImage:original',
                        value: null,
                        icon: 'original'
                    },
                    {
                        name: 'resizeImage:50',
                        value: '50',
                        icon: 'medium'
                    },
                    {
                        name: 'resizeImage:75',
                        value: '75',
                        icon: 'large'
                    }
                  ],
                toolbar: [
                  'resizeImage:50',
                  'resizeImage:75',
                  'resizeImage:original',
                  'imageTextAlternative',
                  'toggleImageCaption',
                  'imageStyle:inline',
                  'imageStyle:block',
                  'imageStyle:side',
                  'linkImage',
                ],
              },
              removePlugins: ["MediaEmbedToolbar"],
          } )
          .then( editor => {
            editor.model.document.on("change", () =>{
              setDescription(editor.getData());
            })
            if(mode == "updateData"){
              editor.setData(description);
            }
          } )
          .catch( error => {
            console.error( 'Oops, something went wrong!' );
            console.error( error );
          } );
        }
        return () => ckEditorRef.current = false;
    },[])

  return (
    <>
        <textarea id="product_description" name="product_description" rows="10" ref={product_descriptionRef}/>
    </>
  )
}

export default MyCKEditor