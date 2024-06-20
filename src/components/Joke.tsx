import  './joke.scss'

const Joke = () => {
    const data ={
        id: 1,
        joke: 'What do you call a fake noodle? An impasta!',
        rating: 2 
    }
  return (
    <div className='joke'>
        <h4 className='id'>{data.id}</h4> 
        <p className='data'>{data.joke}</p> 
       <p className='rating'>{data.rating}</p> 
    </div>
  )
}
 
export default Joke