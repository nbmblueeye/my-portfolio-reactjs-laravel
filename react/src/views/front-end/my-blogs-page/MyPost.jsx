import React, { useEffect, useState, useRef } from 'react'
import { useParams } from 'react-router-dom';
import axiosClient from '../../../axiosClient';
import { Link } from 'react-router-dom';
import parse from "html-react-parser";
import PageLoading from '../../../components/PageLoading';
import Comment from '../../../components/front-end/comments/Comment';
import CommentContext from '../../../context/front-end/CommentContext';

const MyPost = () => {

  const { post_slug } = useParams();
  const [post, setPost] = useState("");
  const [mostViews, setMostViews] = useState([]);
  const [loading, setLoading]     = useState(false);
  const initPost = useRef(true);


  useEffect(() =>{

    if(initPost.current){
      getMyPost();
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }

    return () => initPost.current = false;
  }, []);

  const getMyPost = async() => {
    setLoading(true);
    await axiosClient.get(`/my-posts/${post_slug}`)
    .then(res =>{
      if(res && res.status == 200){
        let { post, postViews } = res.data;
        if(post){
          setPost(post);
          addView(post);
        }
        if(postViews.length > 0){
          setMostViews(postViews);
        }
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      }    
    })
    .catch(error => {
        console.log(error);
        setTimeout(() => {
          setLoading(false);
        }, 1000);
    })
  }

  const setViews = (name) => {
    const d = new Date();
    d.setTime(d.getTime() + (2*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = `viewed=${name};` + expires + ";path=/";
  }

  const getView = (view) => {
      let name = view + "=";
      let decodeCookies = decodeURIComponent(document.cookie);
      const coos = decodeCookies.split(";");
      for (let index = 0; index < coos.length; index++) { 
        let c = coos[index];
        if(c.charAt(0) == " "){
          c = c.substring(1);
        }
        if(c.indexOf(name) == 0){
          return c.substring(name.length,c.length);
        }
      }
      return false; 
  }

  const addView = async(data) => {
    if(getView("viewed") != `My-Portfolio-Post-${data.id}`){
      await axiosClient.get(`/add/view/${post_slug}`)
      .then(res => {
        if(res.status == 201){
          setViews(data.id ? `My-Portfolio-Post-${data.id}` : "My-Portfolio-Post");
        } 
      })
      .catch(({response}) => { 
        if(response){
          console.log(response);
        }
      })
    }else{
      return false;
    }
  }

  let content = "";
  if(loading){
    content = <PageLoading/>          
  }else{
    content = (
        <div className="row g-5">
          <div className="col-12 col-md-9">
              <div className="my_portfolio_section content">
                <div className="post_top_bar">
                  <div className="breadcrumb">
                    <nav aria-label="breadcrumb">
                      <ol className="breadcrumb">
                        <li className="breadcrumb-item"> <Link to={`/my-blogs`}>My-Blog</Link></li>
                        <li className="breadcrumb-item active" aria-current="page">{post.title}</li>
                      </ol>
                    </nav>
                  </div>
                  <div className="post_time">{post.created_at}</div>
                </div>
                {
                  post.thumbnail &&
                  <div className="thumbnail">
                    <img src={`${import.meta.env.VITE_API_BASE_URL}/images/thumbnails/${post.thumbnail}`} alt="thumbnail" loading="lazy"/>
                  </div>
                }
                
                <div className="information">
                    {post.description && parse(post.description)}
                </div>
              </div>
              <div className='my_portfolio_section comment'>
                <CommentContext>
                  <Comment post_id={post.id}/>
                </CommentContext>
              </div>
          </div>
          <div className="col-12 col-md-3 mb-3">
              <div className="my_portfolio_section side_bar">
                <ul className='side_bar_item'>
                  <h5 className='side_bar_title title'>Most Views</h5>
                  {
                    mostViews.length > 0 ?
                    mostViews.map((mostView, index) => (
                        <li className='side_bar_item_card my-portfolio-border-bottom-color' key={index}>
                          <Link to={`/my-blogs/${mostView.slug}`}>
                            <div className="header">
                              <div className="thumbnail">
                                {
                                  mostView.thumbnail ?
                                  <img src={`${import.meta.env.VITE_API_BASE_URL}/images/thumbnails/${mostView.thumbnail}`} alt="thumbnail" loading="lazy"/> 
                                  :
                                  <img src={`${import.meta.env.VITE_API_BASE_URL}/images/no-image.png`} alt="thumbnail" loading="lazy"/>
                                }
                                
                              </div>
                              <p className="views muted">Viewed: {mostView.post_view_count}</p>
                            </div>
                            <div className="information">                            
                              <h6 className='title'>{mostView.title}</h6>
                            </div> 
                          </Link>
                        </li>
                      )
                    )
                    :
                    (
                      <div>
                        <h5>There are No Information</h5>
                      </div>
                    )
                  }
                </ul>
              </div>
          </div>
        </div>
      
    )
  }   
  return (
    <div className="post_detail_page">
      <div className="container" >
        {content}
      </div>
    </div>
   
  )
}

export default MyPost
