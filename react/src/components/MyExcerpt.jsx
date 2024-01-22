import React, { useMemo } from 'react';


const MyExcerpt = ({ data, length }) => {

  const setExcerpt = () => {
     
      let excerpt = "";
      let posStart = data.indexOf("<p");
      let posEnd = data.indexOf("</p>");
      let htmlText = data.substring(posStart, posEnd);
      if(htmlText.length > length){
        let newHtmlText = htmlText.substring(0, length);
        excerpt = newHtmlText + " ... . .</p>"
      }else{
        excerpt = htmlText + " ... . .</p>";
      }
      return excerpt;
  }

  let excerpt = useMemo(() => setExcerpt(),[data])

  return (
    <>    
       <div
        dangerouslySetInnerHTML={{__html: excerpt}}
      />
    </>
  )
}

export default MyExcerpt