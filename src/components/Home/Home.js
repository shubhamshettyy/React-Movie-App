import React,{Component} from 'react';
import {API_URL,API_KEY,IMAGE_BASE_URL,BACKDROP_SIZE,POSTER_SIZE} from '../../config';
import HeroImage from '../elements/HeroImage/HeroImage';
import SearchBar from '../elements/SearchBar/SearchBar';
import FourColGird from '../elements/FourColGrid/FourColGrid';
import MovieThumb from '../elements/MovieThumb/MovieThumb';
import LoadMoreBtn from '../elements/LoadMoreBtn/LoadMoreBtn';
import Spinner from '../elements/Spinner/Spinner';
import './Home.css';

class Home extends Component{
    state={
        movies:[],
        heroImage:null,
        loading:false,
        currentPage:0,
        totalPages:0,
        search:''
    }

    componentDidMount(){

        if(localStorage.getItem('Homestate')){
            const state = JSON.parse(localStorage.getItem('Homestate'));
            this.setState({...state});
        }
        else{
            this.setState({ loading: true });
            const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
            this.fetchItems(endpoint);
        }

        
    }

    searchItems=(searchText)=>{
        let endpoint='';
        this.setState({
            movies: [],
            loading: true,
            search: searchText
        })

        if(searchText===''){
            endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
        }
        else{
            endpoint =`${API_URL}search/movie?api_key=${API_KEY}&language=en-US&query=${searchText}`;
            console.log(endpoint);
        }
        this.fetchItems(endpoint);
    }

    loadMoreItems=()=>{
        let endpoint='';
        this.setState({loading:true});
        if(this.state.search===''){
            endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${this.state.currentPage+1}`;
            console.log(endpoint);
        }
        else{
            endpoint = `${API_URL}search/movie?api_key=${API_KEY}&language=en-US&query=${this.state.search}&page=${this.state.currentPage + 1}`;
            console.log(endpoint);
        }
        this.fetchItems(endpoint);
    }

    fetchItems=(endpoint)=>{
        console.log(endpoint);
        fetch(endpoint)
        .then(res=>res.json())
        .then(res=>{
            console.log(res)
            this.setState({
                movies:[...this.state.movies,...res.results],
                heroImage:this.state.heroImage || res.results[4],
                loading:false,
                currentPage:res.page,
                totalPages:res.total_pages
            },()=>{
                if(this.state.seacrh===''){
                    localStorage.setItem('Homestate', JSON.stringify(this.state));
                }
            } )
        });
    }


    render(){
        let heroImage=null;
        if (this.state.heroImage){
            heroImage = 
            (<div>
                <HeroImage
                    image={IMAGE_BASE_URL + BACKDROP_SIZE + this.state.heroImage.backdrop_path}
                    title={this.state.heroImage.original_title}
                    text={this.state.heroImage.overview}
                />
                <SearchBar callback={this.searchItems} />
            </div>)
        }
        return(
            <div className="rmdb-home">
                {heroImage}
                <div className="rmdb-home-grid">
                    <FourColGird 
                    header={this.state.search?'Search Result':'Popular Movies'}
                    loading={this.state.loading}>
                        {this.state.movies.map((element,i)=>{
                            return(
                                <MovieThumb key={i}
                                clickable 
                                image={element.poster_path?`${IMAGE_BASE_URL}${POSTER_SIZE}${element.poster_path}`:'./images/no_image.jpg'}
                                movieId={element.id}
                                movieName={element.original_title}
                                />
                            )
                        })}
                    </FourColGird>
                    {this.state.loading ? <Spinner /> : null}
                    {(this.state.currentPage<=this.state.totalPages && !this.state.loading)?
                        <LoadMoreBtn clicked={this.loadMoreItems} text="Load More" />:null}
                </div>
                
                
                
            </div>
        );
    }
}

export default Home;