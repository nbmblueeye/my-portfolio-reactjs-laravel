import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import axiosClient from '../../../axiosClient';
import MyExcerpt from '../../../components/MyExcerpt';
import PageLoading from '../../../components/PageLoading';
import Pagination from '../../../components/Pagination';

const MyBlogs = () => {

  const [myBlock, setMyBlock]     = useState({});
  const [posts, setPosts]         = useState([]);
  const [postItems, setPostItems] = useState([]);
  const [latests, setLatest]      = useState([]);
  const [loading, setLoading]     = useState(false);
  const initPost = useRef(true);

  useEffect(() =>{
    if(initPost.current){
      getMyBlock();
      getMyPost();
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
    return () => initPost.current = false;
  }, []);

  const getMyBlock = async() => {
    setLoading(true);
    await axiosClient.get('/my-blocks')
    .then(res =>{
      if(res && res.status == 200){
        let { myBlock, posts, latests } = res.data;
        if(myBlock){
          setMyBlock(myBlock);
        }
        if(posts){
          setPostItems(posts);
          setPosts(posts.data);
        }
        if(latests){
          setLatest(latests);
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

  const getMyPost = async(link) => {
    let url = link ? link :'/my-posts';
    await axiosClient.get(url)
    .then(res =>{
      if(res && res.status == 200){
        let { posts } = res.data;
        if(posts){
          setPostItems(posts);
          setPosts(posts.data);
        }
      }    
    })
    .catch(error => {
        console.log(error);
    })
  }

  let content = "";
  if(loading){
    content = <PageLoading/>          
  }else{
    content = (
      <>
        <div className="container-lg">
          <div className="my_portfolio_section my-block-header">
            {
              myBlock.image ?
                <div className="my-block-header-box">
                  <div className="information">                            
                    <h4 className='title'>{myBlock.title}</h4>
                    <h5 className='sub_title'>{myBlock.sub_title}</h5>
                    <p className='description'>{myBlock.description}</p>
                  </div> 
                  <img src={`${import.meta.env.VITE_API_BASE_URL}/images/myblocks/${myBlock.image}`} loading="lazy" alt="header_blog_image" /> 
                </div>
              :
              <div className="my-block-header-no-image-box">
                <h5>No Header Image Available</h5>
              </div>
            }     
          </div>      
        </div>
        <div className="container">
          <div className="my-block-body">
            <div className="row g-5">
              <div className="col-12 col-md-3">
                <div className="my_portfolio_section side_bar">
                  <ul className='side_bar_item'>
                    <h5 className='side_bar_title title'>Latest News</h5>
                    {
                      latests.length > 0 ?
                      latests.map((latest, index) => (
                       
                          <li className='side_bar_item_card my-portfolio-border-bottom-color' key={index}>
                            <Link to={`/my-blogs/${latest.slug}`}>
                              <div className="header">
                                <div className="thumbnail">
                                  {
                                    latest.thumbnail ?
                                    <img src={`${import.meta.env.VITE_API_BASE_URL}/images/thumbnails/${latest.thumbnail}`} alt="thumbnail" loading="lazy"/> 
                                    :
                                    <img src={`${import.meta.env.VITE_API_BASE_URL}/images/no-image.png`} alt="thumbnail" loading="lazy"/>
                                  }
                                  
                                </div>
                              </div>
                              <div className="information">                            
                                <h6 className='title'>{latest.title}</h6>
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
              <div className="col-12 col-md-9">
                <div className="my_portfolio_section content">
                  {
                    posts.length > 0 ?
                    posts.map((post, index) => (
                      <div className="page-item-box my-portfolio-border-bottom-color" key={index}> 
                        <div className="thumbnail">
                          <Link to={`/my-blogs/${post.slug}`}>
                            <img src={`${import.meta.env.VITE_API_BASE_URL}/images/thumbnails/${post.thumbnail}`} alt="thumbnail" loading="lazy"/>
                          </Link>
                        </div>
                        <div className="information">
                          <Link to={`/my-blogs/${post.slug}`}>                            
                            <h4 className='title'>{post.title}</h4>
                          </Link>
                          <MyExcerpt data={post.description} length={250}/>
                        </div> 
                      </div>
                    ))
                    :
                    <div className="my-block-body-no-image-box">
                      <h5>There're no Post Available</h5>
                    </div>
                  }
                  {
                    postItems.total > postItems.per_page &&
                    <div className="d-flex justify-content-end mt-5 me-5">
                        <Pagination items={postItems}  onPaginate={getMyPost}/> 
                    </div>
                  }
                </div>
              </div>
            </div> 
          </div>
        </div>
      </>
    )
  }
  return (
    <>
      {content}
    </>
  )
}

export default MyBlogs