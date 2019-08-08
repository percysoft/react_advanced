import React, { useEffect, useRef, useState }from 'react'
import { Article, ImgWrapper, Img, Button } from './styles'
import { MdFavoriteBorder, MdFavorite} from 'react-icons/md'

const DEFAULT_IMAGE = 'https://res.cloudinary.com/midudev/image/upload/w_300/q_80/v1560262103/dogs.png';

const useLocalStorage = (key, initialValue) => {
  const [storedValue, setValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item !== null ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });
  const setLocalStorage = value => {
    try{
      window.localStorage.setItem(key, JSON.stringify(value))
      setValue(value)
    } catch (e) {
      console.error(e)
    }
  }

  return [ storedValue, setLocalStorage ]
}


export const PhotoCard = ({id, likes= 0, src = DEFAULT_IMAGE}) => {

  const element = useRef(null);
  const [show, setShow] = useState(false);
  const key = `like-${id}`;
  
  const [ liked, setLiked ] = useLocalStorage(key, false)
  
  useEffect(() => {
    import('intersection-observer')
    .then(() => {
      const observer = new window.IntersectionObserver((entries)=> {
        const { isIntersecting } = entries[0]
        if(isIntersecting) {
          setShow(true)
          observer.disconnect()
        }
      })
      observer.observe(element.current)
    })
  },[element])

  const Icon = liked ? MdFavorite : MdFavoriteBorder;

  const addLike = () => {
    console.log('aa')
    setLiked(!liked)
  }

  return(
    <Article ref={element}>
    {
      show && 
      <React.Fragment>
        <a href={`/detail/${id}`}>
          <ImgWrapper>
            <Img src={src} />
          </ImgWrapper>
        </a>
        <Button
          onClick={() => setLiked(!liked)}
          type="button"
        >
          <Icon  size='32px'/> {liked} likes!
        </Button>
      </React.Fragment>
    }
    </Article>
  )
}
